import fitz
import re

doc = fitz.open('Home Sense New Price List & Device Specifications May-2026.pdf')

def extract_page_data(page_num):
    page = doc[page_num - 1]
    blocks = page.get_text('dict')['blocks']
    
    title_spans = []
    desc_spans = []
    
    for b in blocks:
        if 'lines' in b:
            for l in b['lines']:
                for s in l['spans']:
                    txt = s['text'].strip()
                    if not txt:
                        continue
                    
                    size = s['size']
                    font = s['font']
                    
                    if re.match(r'^\d{3,6}$', txt) or 'Type3' in font:
                        continue
                    
                    if txt in ["PRICE LIST", "Tuya Smart Switch", "Tuya Smart Circuit Breaker", "Tuya Smart Plug & Wall Socket", "Tuya Smart Curtain System", "Smart Multi Function Control Panel", "Smart Control Devices", "Smart Safety & Security Device", "Tuya Wi-Fi Video Doorbell", "Tuya Smart Door Locks"]:
                        continue
                        
                    if (size >= 15.5 or "ExtraBold" in font) and round(s['bbox'][1]) < 220:
                        title_spans.append((s['bbox'][1], s['bbox'][0], txt))
                    else:
                        if not txt.startswith("Video Surveillance:") and not txt.startswith("Video intercom:"):
                            desc_spans.append((s['bbox'][1], s['bbox'][0], txt))
                            
    title_spans.sort(key=lambda x: (x[0], x[1]))
    title = " ".join([t[2] for t in title_spans]).strip()
    
    desc_spans.sort(key=lambda x: (x[0], x[1]))
    
    desc_lines = []
    for d in desc_spans:
        line_text = d[2]
        if line_text and line_text not in desc_lines and len(line_text) > 1:
            desc_lines.append(line_text)
            
    return title, desc_lines

empty_titles = []
for p in range(3, doc.page_count):
    t, d = extract_page_data(p)
    if not t and len(d) > 2:
        empty_titles.append((p, d[:2]))
    else:
        print(f"Page {p:3d} | Title: '{t[:45]}...' | Specs count: {len(d)}")

if empty_titles:
    print(f"\n[WARNING] Pages with missing titles: {empty_titles}")
else:
    print("\n[SUCCESS] All pages extracted titles cleanly!")
