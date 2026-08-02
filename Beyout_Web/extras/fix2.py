import re
with open(r'd:\Ai\social\vexora\index.html', 'r', encoding='utf-8') as f: h = f.read()
h = re.sub(r'<span class="badge-new">.*?</span>', '', h)
with open(r'd:\Ai\social\vexora\index.html', 'w', encoding='utf-8') as f: f.write(h)
