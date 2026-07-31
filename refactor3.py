import re

INDEX_FILE = r'd:/Ai/social/vexora/index.html'
APP_FILE = r'd:/Ai/social/vexora/app.js'

deleted_indices = [8, 9, 14, 15, 19, 23, 25, 26, 27, 29, 32]
retained_indices = [i for i in range(1, 33) if i not in deleted_indices]
new_index_map = {old: new for new, old in enumerate(retained_indices, start=1)}

# --- APP.JS FIX ---
with open(APP_FILE, 'r', encoding='utf-8') as f:
    app_js = f.read()

# Update prices just in case
app_js = app_js.replace('"prod_3_price": "5,000 جنيه",', '"prod_3_price": "من 10,000 إلى 20,000 جنيه",')
app_js = app_js.replace('"prod_3_price": "5,000 EGP",', '"prod_3_price": "10,000 - 20,000 EGP",')

for old_idx in retained_indices:
    new_idx = new_index_map[old_idx]
    
    # Arabic Title
    pattern_ar = r'(title_alert_' + str(old_idx) + r':\s*")' + str(old_idx) + r'\.\s*(.*?)"'
    def repl_ar(m):
        txt = m.group(2).replace('جديد', '').strip()
        return m.group(1) + str(new_idx) + '. ' + txt + '"'
    app_js = re.sub(pattern_ar, repl_ar, app_js)
    
    # English Title
    pattern_en = r'("title_alert_' + str(old_idx) + r'":\s*")' + str(old_idx) + r'\.\s*(.*?)"'
    def repl_en(m):
        txt = m.group(2).replace('New', '').replace('new', '').strip()
        return m.group(1) + str(new_idx) + '. ' + txt + '"'
    app_js = re.sub(pattern_en, repl_en, app_js)
    
    # Tags & Descriptions (remove "جديد" / "New")
    for key_prefix in ["tag_alert_", "desc_alert_"]:
        pat1 = r'(' + key_prefix + str(old_idx) + r':\s*".*?)(\s*جديد\s*)(.*?")'
        app_js = re.sub(pat1, r'\g<1>\g<3>', app_js)
        pat2 = r'("' + key_prefix + str(old_idx) + r'":\s*".*?)(\s*New\s*)(.*?")'
        app_js = re.sub(pat2, r'\g<1>\g<3>', app_js)

with open(APP_FILE, 'w', encoding='utf-8') as f:
    f.write(app_js)


# --- INDEX.HTML FIX ---
with open(INDEX_FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_mode = None  # None, 'alert', 'section'
skip_depth = 0
skip_tag = ''

implementation_steps_html = """
    <!-- Implementation Steps Section -->
    <section class="packages-section-wrapper" id="implementation-steps" style="background: var(--bg-dark); border-top: 1px solid rgba(255,255,255,0.05); padding: 60px 0;">
        <div class="container">
            <div class="section-header text-center">
                <span class="section-subtitle">خطوات العمل</span>
                <h2 class="section-title">خطوات التنفيذ والاشتراك</h2>
                <p class="section-desc max-w-600">نضمن لك تجربة سلسة واختباراً عملياً للنظام قبل تفعيل التعاقد لضمان كفاءة التنبيهات.</p>
            </div>
            <div class="packages-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
                <!-- Step 1 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">1. الزيارة وعرض النظام</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">الذهاب إلى العميل لعمل عرض (Demo) لرؤية النظام على أرض الواقع، وتحديد عدد الكاميرات المطلوبة وطريقة دفع الاشتراك (شهري أو ربع سنوي).</p>
                </div>
                <!-- Step 2 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">2. الإعداد والتجربة المجانية</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">إعداد سيرفر للعمل على كاميرا واحدة بعدد 3 تنبيهات لفترة 15 يوم، لكي يجرب العميل النظام بشكل فعلي ويتعلم نموذج الذكاء الاصطناعي على بيئة العمل.</p>
                </div>
                <!-- Step 3 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">3. تفعيل التعاقد</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">انتظار قرار العميل بالاستمرار من عدمه، وفي حالة الاستمرار يتم تفعيل العقد الذي تم إبرامه مبدئياً في بداية الـ 15 يوم.</p>
                </div>
                <!-- Step 4 -->
                <div class="package-card glass-card" style="padding: 30px; text-align: right;">
                    <h3 style="color: var(--primary); font-size: 24px; margin-bottom: 15px;">4. التنفيذ المرحلي للمشاريع الكبيرة</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; font-size: 15px;">في حال كان عدد الكاميرات كبيراً (أكثر من 6 كاميرات مثلاً)، يتم التنسيق لتنفيذ المشروع على مراحل متتالية بالاتفاق مع العميل.</p>
                </div>
            </div>
        </div>
    </section>
"""

i = 0
while i < len(lines):
    line = lines[i]
    
    # Detect start of deleted alert
    alert_match = re.search(r'<!-- Alert (\d+) -->', line)
    if alert_match and int(alert_match.group(1)) in deleted_indices and not skip_mode:
        skip_mode = 'alert'
        skip_depth = 0
        skip_tag = 'div'
        # look forward for the first <div
        pass
    
    # Detect start of deleted sections
    elif '<section id="products-section"' in line and not skip_mode:
        skip_mode = 'products'
        skip_depth = 0
        skip_tag = 'section'
    elif '<section id="trusted-clients"' in line and not skip_mode:
        skip_mode = 'clients'
        skip_depth = 0
        skip_tag = 'section'
    elif '<section id="success-stories"' in line and not skip_mode:
        skip_mode = 'stories'
        skip_depth = 0
        skip_tag = 'section'
        
    if skip_mode:
        # count tags to find closing
        # a bit rudimentary, but we just count '<tag' and '</tag'
        # actually, for alerts we just count <div and </div
        opens = len(re.findall(f'<{skip_tag}', line))
        closes = len(re.findall(f'</{skip_tag}', line))
        
        # some tags might be like <div ... > or <section ...>
        skip_depth += opens
        skip_depth -= closes
        
        if skip_depth <= 0 and opens == 0 and closes > 0:
            # We reached the end of the block
            if skip_mode == 'products':
                new_lines.append(implementation_steps_html)
            skip_mode = None
    else:
        new_lines.append(line)
        
    i += 1

index_html = "".join(new_lines)

# Strip ALL badges with "جديد" or "New" or tag_new
index_html = re.sub(r'<span class="badge"[^>]*>جديد</span>', '', index_html)
index_html = re.sub(r'<span class="badge-new"[^>]*>.*?</span>', '', index_html)
index_html = re.sub(r'<span class="badge"[^>]*>New</span>', '', index_html)
index_html = re.sub(r'<span class="badge"[^>]*>\s*<span[^>]*data-i18n="tag_new"[^>]*>.*?</span>\s*</span>', '', index_html)
index_html = re.sub(r'<span class="badge" data-i18n="tag_new">.*?</span>', '', index_html)
index_html = index_html.replace('<span class="badge">جديد</span>', '')

# Update headers and titles from 32 to 21
index_html = index_html.replace('32 تنبيهاً أمنياً', '21 تنبيهاً أمنياً')
index_html = index_html.replace('32 Security Alerts', '21 Security Alerts')
index_html = index_html.replace('(32 تنبيهاً)', '(21 تنبيهاً)')
index_html = index_html.replace('26 Alerts', '21 Alerts')
index_html = index_html.replace('26 Unique Screenshots', '21 Unique Screenshots')

with open(INDEX_FILE, 'w', encoding='utf-8') as f:
    f.write(index_html)

print("DONE!")
