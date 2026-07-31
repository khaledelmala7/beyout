import re

INDEX_FILE = r'd:/Ai/social/vexora/index.html'
APP_FILE = r'd:/Ai/social/vexora/app.js'

deleted_indices = [8, 9, 14, 15, 19, 23, 25, 26, 27, 29, 32]
retained_indices = [i for i in range(1, 33) if i not in deleted_indices]

# --- APP.JS FIX ---
with open(APP_FILE, 'r', encoding='utf-8') as f:
    app_js = f.read()

# 1. Remove numbering from alert titles and remove "جديد"
for idx in range(1, 33):
    # Match title_alert_X: "X. Some Text"
    pattern_ar = r'(title_alert_' + str(idx) + r':\s*")' + str(idx) + r'\.\s*(.*?)"'
    def repl_ar(m):
        txt = m.group(2).replace('جديد', '').strip()
        return m.group(1) + txt + '"'
    app_js = re.sub(pattern_ar, repl_ar, app_js)
    
    pattern_en = r'("title_alert_' + str(idx) + r'":\s*")' + str(idx) + r'\.\s*(.*?)"'
    def repl_en(m):
        txt = m.group(2).replace('New', '').replace('new', '').strip()
        return m.group(1) + txt + '"'
    app_js = re.sub(pattern_en, repl_en, app_js)
    
    # Remove "جديد" / "New" from tags and descriptions
    for key_prefix in ["tag_alert_", "desc_alert_"]:
        pat1 = r'(' + key_prefix + str(idx) + r':\s*".*?)(\s*جديد\s*)(.*?")'
        app_js = re.sub(pat1, r'\g<1>\g<3>', app_js)
        pat2 = r'("' + key_prefix + str(idx) + r'":\s*".*?)(\s*New\s*)(.*?")'
        app_js = re.sub(pat2, r'\g<1>\g<3>', app_js)

# 2. Add alert counts to category titles
app_js = app_js.replace('"cat_title_1": "السلامة والصحة المهنية",', '"cat_title_1": "السلامة والصحة المهنية (8 تنبيهات)",')
app_js = app_js.replace('"cat_title_2": "الأمن والحماية",', '"cat_title_2": "الأمن والحماية (4 تنبيهات)",')
app_js = app_js.replace('"cat_title_3": "السلامة العامة وإدارة الحشود",', '"cat_title_3": "السلامة العامة وإدارة الحشود (4 تنبيهات)",')
app_js = app_js.replace('"cat_title_4": "مراقبة الحوادث والبيئة",', '"cat_title_4": "مراقبة الحوادث والبيئة (3 تنبيهات)",')
app_js = app_js.replace('"cat_title_5": "مراقبة العمليات والسلوكيات",', '"cat_title_5": "مراقبة العمليات والسلوكيات (2 تنبيهات)",')

app_js = app_js.replace('"cat_title_1": "HSE & Occupational Safety",', '"cat_title_1": "HSE & Occupational Safety (8 Alerts)",')
app_js = app_js.replace('"cat_title_2": "Security & Protection",', '"cat_title_2": "Security & Protection (4 Alerts)",')
app_js = app_js.replace('"cat_title_3": "Public Safety & Crowd Management",', '"cat_title_3": "Public Safety & Crowd Management (4 Alerts)",')
app_js = app_js.replace('"cat_title_4": "Incident & Environment Monitoring",', '"cat_title_4": "Incident & Environment Monitoring (3 Alerts)",')
app_js = app_js.replace('"cat_title_5": "Operations & Behavior Monitoring",', '"cat_title_5": "Operations & Behavior Monitoring (2 Alerts)",')

# 3. Update Hero Description
new_hero_ar = "القيمة: تحويل كاميرات المراقبة إلى عيون رقمية ذكية لا تنام.<br>الهدف: رصد المخالفات والحوادث لحظياً بدقة متناهية لمنع الأزمات.<br>الاستفادة: توفير الوقت والجهد، وتقليل الخسائر، ورفع الكفاءة الإنتاجية."
new_hero_en = "Value: Transform CCTV cameras into smart digital eyes.<br>Goal: Detect violations instantly to prevent crises.<br>Benefit: Save time, reduce losses, and raise efficiency."

app_js = re.sub(r'(hero_desc:\s*").*?(")', r'\g<1>' + new_hero_ar + r'\g<2>', app_js)
app_js = re.sub(r'("hero_desc":\s*").*?(")', r'\g<1>' + new_hero_en + r'\g<2>', app_js)

with open(APP_FILE, 'w', encoding='utf-8') as f:
    f.write(app_js)

# --- INDEX.HTML FIX ---
with open(INDEX_FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_mode = False
skip_depth = 0
skip_tag = ''

i = 0
while i < len(lines):
    line = lines[i]
    
    alert_match = re.search(r'<!-- Alert (\d+) -->', line)
    if alert_match and int(alert_match.group(1)) in deleted_indices and not skip_mode:
        skip_mode = True
        skip_depth = 0
        skip_tag = 'div'
    
    if skip_mode:
        opens = len(re.findall(f'<{skip_tag}', line))
        closes = len(re.findall(f'</{skip_tag}', line))
        skip_depth += opens
        skip_depth -= closes
        if skip_depth <= 0 and opens == 0 and closes > 0:
            skip_mode = False
    else:
        new_lines.append(line)
        
    i += 1

index_html = "".join(new_lines)

# Helper to completely remove sections
def remove_section(html, section_id):
    start_id = html.find(f'id="{section_id}"')
    if start_id == -1: return html
    start_tag = html.rfind('<section', 0, start_id)
    if start_tag == -1: return html
    end_tag = html.find('</section>', start_id)
    if end_tag != -1:
        end_tag += len('</section>')
        return html[:start_tag] + html[end_tag:]
    return html

def replace_section(html, section_id, replacement):
    start_id = html.find(f'id="{section_id}"')
    if start_id == -1: return html
    start_tag = html.rfind('<section', 0, start_id)
    if start_tag == -1: return html
    end_tag = html.find('</section>', start_id)
    if end_tag != -1:
        end_tag += len('</section>')
        return html[:start_tag] + replacement + html[end_tag:]
    return html

implementation_steps_html = """
    <!-- Implementation Steps Section -->
    <section class="packages-section-wrapper" id="implementation-steps" style="background: var(--bg-dark); border-top: 1px solid rgba(255,255,255,0.05); padding: 60px 0;">
        <div class="container">
            <div class="section-header text-center" style="margin-bottom: 50px;">
                <span class="section-subtitle">خطوات العمل</span>
                <h2 class="section-title">خطوات التنفيذ والاشتراك</h2>
                <p class="section-desc max-w-600">نضمن لك تجربة سلسة واختباراً عملياً للنظام قبل تفعيل التعاقد لضمان كفاءة التنبيهات.</p>
            </div>
            <div class="packages-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <!-- Step 1 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">1. الزيارة وعرض النظام</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">الذهاب إلى العميل لعمل عرض (Demo) لرؤية النظام على أرض الواقع، وتحديد عدد الكاميرات المطلوبة وطريقة دفع الاشتراك (شهري أو ربع سنوي).</p>
                </div>
                <!-- Step 2 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">2. الإعداد والتجربة المجانية</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">إعداد سيرفر للعمل على كاميرا واحدة بعدد 3 تنبيهات لفترة 15 يوم، لكي يجرب العميل النظام بشكل فعلي ويتعلم نموذج الذكاء الاصطناعي.</p>
                </div>
                <!-- Step 3 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">3. تفعيل التعاقد</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">انتظار قرار العميل بالاستمرار من عدمه، وفي حالة الاستمرار يتم تفعيل العقد الذي تم إبرامه مبدئياً في بداية الـ 15 يوم.</p>
                </div>
                <!-- Step 4 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">4. التنفيذ المرحلي</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">في حال كان عدد الكاميرات كبيراً (أكثر من 6 كاميرات مثلاً)، يتم التنسيق لتنفيذ المشروع على مراحل متتالية بالاتفاق مع العميل.</p>
                </div>
            </div>
        </div>
    </section>
"""

# Apply section changes
index_html = replace_section(index_html, 'products-section', implementation_steps_html)
index_html = remove_section(index_html, 'dashboard-section')
index_html = remove_section(index_html, 'trusted-clients')
index_html = remove_section(index_html, 'success-stories')

# Nav links
index_html = re.sub(r'<a href="#products-section".*?</a>', '', index_html)
index_html = re.sub(r'<a href="#dashboard-section".*?</a>', '', index_html)
index_html = re.sub(r'<a href="#trusted-clients".*?</a>', '', index_html)
index_html = re.sub(r'<a href="#success-stories".*?</a>', '', index_html)

# Add Implementation Steps to nav
index_html = index_html.replace('<!-- Middle: Navigation Links -->\n            <nav class="nav-links">', '<!-- Middle: Navigation Links -->\n            <nav class="nav-links">\n                <a href="#implementation-steps" class="nav-link">خطوات التنفيذ</a>')

# Badges and cleanups
index_html = re.sub(r'<span class="badge"[^>]*>جديد</span>', '', index_html)
index_html = re.sub(r'<span class="badge-new"[^>]*>.*?</span>', '', index_html)
index_html = re.sub(r'<span class="badge"[^>]*>New</span>', '', index_html)
index_html = re.sub(r'<span class="badge"[^>]*>\s*<span[^>]*data-i18n="tag_new"[^>]*>.*?</span>\s*</span>', '', index_html)
index_html = re.sub(r'<span class="badge" data-i18n="tag_new">.*?</span>', '', index_html)
index_html = index_html.replace('<span class="badge">جديد</span>', '')

# Replace counts
index_html = re.sub(r'32\s*تنبيهاً أمنياً', '21 تنبيهاً أمنياً', index_html)
index_html = re.sub(r'26\s*تنبيهاً أمنياً', '21 تنبيهاً أمنياً', index_html)
index_html = re.sub(r'32\s*Security Alerts', '21 Security Alerts', index_html)
index_html = re.sub(r'26\s*Security Alerts', '21 Security Alerts', index_html)
index_html = index_html.replace('(32 تنبيهاً)', '(21 تنبيهاً)')
index_html = index_html.replace('(26 تنبيهاً)', '(21 تنبيهاً)')
index_html = index_html.replace('26 Alerts', '21 Alerts')
index_html = index_html.replace('32 Alerts', '21 Alerts')
index_html = index_html.replace('26 Unique Screenshots', '21 Unique Screenshots')
index_html = index_html.replace('32 Unique Screenshots', '21 Unique Screenshots')
index_html = index_html.replace('العدد الاجمالي وهو 26', 'العدد الاجمالي وهو 21')

with open(INDEX_FILE, 'w', encoding='utf-8') as f:
    f.write(index_html)

print("DONE REFACTOR 5!")
