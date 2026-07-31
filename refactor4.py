import re

INDEX_FILE = r'd:/Ai/social/vexora/index.html'

with open(INDEX_FILE, 'r', encoding='utf-8') as f:
    index_html = f.read()

def remove_section(html, section_id):
    start_id = html.find(f'id="{section_id}"')
    if start_id == -1: return html
    # backtrack to <section
    start_tag = html.rfind('<section', 0, start_id)
    if start_tag == -1: return html
    
    # find the closing </section>
    # To be safe, we just find the FIRST </section> after the start_id. 
    # Assuming there are no nested <section> inside the section.
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

# Replace products section
index_html = replace_section(index_html, 'products-section', implementation_steps_html)

# Remove other sections
index_html = remove_section(index_html, 'trusted-clients')
index_html = remove_section(index_html, 'success-stories')

# Also remove them from the navbar just to be clean
index_html = re.sub(r'<a href="#products-section".*?</a>', '', index_html)
index_html = re.sub(r'<a href="#trusted-clients".*?</a>', '', index_html)
index_html = re.sub(r'<a href="#success-stories".*?</a>', '', index_html)

# Add the new steps to navbar where products used to be
index_html = index_html.replace('<!-- Middle: Navigation Links -->\n            <nav class="nav-links">', '<!-- Middle: Navigation Links -->\n            <nav class="nav-links">\n                <a href="#implementation-steps" class="nav-link">خطوات التنفيذ</a>')

with open(INDEX_FILE, 'w', encoding='utf-8') as f:
    f.write(index_html)

print("DONE FIXING SECTIONS!")
