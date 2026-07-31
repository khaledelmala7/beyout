import re
import os
import shutil

INDEX_FILE = r'd:/Ai/social/index.html'
APP_FILE = r'd:/Ai/social/app.js'

deleted_indices = [8, 9, 14, 15, 19, 23, 25, 26, 27, 29, 32]
retained_indices = [i for i in range(1, 33) if i not in deleted_indices]
new_index_map = {old: new for new, old in enumerate(retained_indices, start=1)}

with open(APP_FILE, 'r', encoding='utf-8') as f:
    app_js = f.read()

app_js = app_js.replace('"prod_3_price": "5,000 جنيه",', '"prod_3_price": "من 10,000 إلى 20,000 جنيه",')
app_js = app_js.replace('"prod_3_price": "5,000 EGP",', '"prod_3_price": "10,000 - 20,000 EGP",')

for old_idx in retained_indices:
    new_idx = new_index_map[old_idx]
    
    pattern_ar = r'(title_alert_' + str(old_idx) + r':\s*")' + str(old_idx) + r'\.\s*(.*?)"'
    def repl_ar(m):
        txt = m.group(2).replace('جديد', '').strip()
        return m.group(1) + str(new_idx) + '. ' + txt + '"'
    app_js = re.sub(pattern_ar, repl_ar, app_js)
    
    pattern_en = r'("title_alert_' + str(old_idx) + r'":\s*")' + str(old_idx) + r'\.\s*(.*?)"'
    def repl_en(m):
        txt = m.group(2).replace('New', '').replace('new', '').strip()
        return m.group(1) + str(new_idx) + '. ' + txt + '"'
    app_js = re.sub(pattern_en, repl_en, app_js)
    
    for key_prefix in ["tag_alert_", "desc_alert_"]:
        pat1 = r'(' + key_prefix + str(old_idx) + r':\s*".*?)(\s*جديد\s*)(.*?")'
        app_js = re.sub(pat1, r'\g<1>\g<3>', app_js)
        pat2 = r'("' + key_prefix + str(old_idx) + r'":\s*".*?)(\s*New\s*)(.*?")'
        app_js = re.sub(pat2, r'\g<1>\g<3>', app_js)

with open(APP_FILE, 'w', encoding='utf-8') as f:
    f.write(app_js)

with open(INDEX_FILE, 'r', encoding='utf-8') as f:
    index_html = f.read()

s_c = index_html.find('<!-- Trusted Clients Section -->')
e_c = index_html.find('<!-- Global Presence Section -->')
if s_c != -1 and e_c != -1: index_html = index_html[:s_c] + index_html[e_c:]

s_s = index_html.find('<!-- Success Stories Section -->')
e_s = index_html.find('<!-- Use Cases Section -->')
if s_s != -1 and e_s != -1: index_html = index_html[:s_s] + index_html[e_s:]

index_html = re.sub(r'<span class="badge"[^>]*>جديد</span>', '', index_html)
index_html = re.sub(r'<span class="badge"[^>]*>New</span>', '', index_html)
index_html = re.sub(r'<span class="badge"[^>]*>.*?tag_new.*?</span>', '', index_html)

for old_idx in reversed(deleted_indices):
    start_tag = f'<!-- Alert {old_idx} -->'
    end_tag = f'<!-- Alert {old_idx + 1} -->' if old_idx < 32 else '<!-- Pagination -->'
    s_pos = index_html.find(start_tag)
    e_pos = index_html.find(end_tag, s_pos) if old_idx < 32 else index_html.find('</section>', s_pos)
    if old_idx == 32:
        card_s = index_html.find('<div class="alert-item-card', s_pos)
        card_e = index_html.find('<!-- Use Cases', card_s)
        if card_s != -1: index_html = index_html[:card_s] + index_html[card_e:]
    elif s_pos != -1 and e_pos != -1:
        index_html = index_html[:s_pos] + index_html[e_pos:]

index_html = index_html.replace('32 تنبيهاً أمنياً', '21 تنبيهاً أمنياً')
index_html = index_html.replace('32 Security Alerts', '21 Security Alerts')

with open(INDEX_FILE, 'w', encoding='utf-8') as f:
    f.write(index_html)

shutil.copy(INDEX_FILE, r'd:/Ai/social/vexora/index.html')
shutil.copy(APP_FILE, r'd:/Ai/social/vexora/app.js')
print('DONE!')
