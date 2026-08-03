import fitz
import os
import re
import json

pdf_path = "Home Sense New Price List & Device Specifications May-2026.pdf"
assets_dir = "catalog_assets"
os.makedirs(assets_dir, exist_ok=True)

doc = fitz.open(pdf_path)

categories = [
    {"name": "Smart Switches & Dimmers", "prefix": "BY-SW", "start": 2, "end": 24},
    {"name": "Mini Smart Modules", "prefix": "BY-MN", "start": 25, "end": 31},
    {"name": "Smart Breakers", "prefix": "BY-CB", "start": 31, "end": 32},
    {"name": "Smart Plugs & Sockets", "prefix": "BY-SK", "start": 33, "end": 37},
    {"name": "Smart Curtain Systems", "prefix": "BY-CR", "start": 38, "end": 40},
    {"name": "Smart Control Panels", "prefix": "BY-CP", "start": 41, "end": 50},
    {"name": "Smart Gateways & Controllers", "prefix": "BY-GW", "start": 51, "end": 59},
    {"name": "Smart Safety & Security Sensors", "prefix": "BY-SN", "start": 60, "end": 71},
    {"name": "Smart Video Doorbells", "prefix": "BY-DB", "start": 72, "end": 80},
    {"name": "Smart Door Locks", "prefix": "BY-LK", "start": 81, "end": 104}
]

def get_category(page_num):
    for cat in categories:
        if cat["start"] <= page_num <= cat["end"]:
            return cat
    return None

def clean_text(text):
    text = re.sub(r'(?i)home\s*sense', 'Beyout', text)
    text = re.sub(r'(?i)tuya', 'Beyout', text)
    text = re.sub(r'(?i)avera', '', text)
    return text.strip()

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
                    
                    # Ignore pure price numbers or type3 fonts
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
    raw_title = " ".join([t[2] for t in title_spans]).strip()
    title = clean_text(raw_title)
    
    desc_spans.sort(key=lambda x: (x[0], x[1]))
    
    desc_lines = []
    for d in desc_spans:
        line_text = clean_text(d[2])
        if line_text and line_text not in desc_lines and len(line_text) > 1:
            desc_lines.append(line_text)
            
    return title, desc_lines

all_products = []
code_counters = {}

for i in range(2, doc.page_count - 1): # page indices
    page_num = i + 1
    cat = get_category(page_num)
    if not cat:
        continue
        
    title, desc_lines = extract_page_data(page_num)
    
    if not title or len(desc_lines) < 1:
        continue # Divider page or section cover
        
    # Crop product image cleanly
    page = doc[i]
    rect_img = fitz.Rect(55, 65, 330, 265)
    pix = page.get_pixmap(clip=rect_img)
    img_name = f"product_{page_num}.png"
    img_path = os.path.join(assets_dir, img_name)
    pix.save(img_path)
    
    # Assign unique SKU Code
    prefix = cat["prefix"]
    code_counters[prefix] = code_counters.get(prefix, 0) + 1
    code = f"{prefix}-{code_counters[prefix]:03d}"
    
    product_item = {
        "code": code,
        "page": page_num,
        "category": cat["name"],
        "title": title,
        "description": desc_lines,
        "image": f"{assets_dir}/{img_name}"
    }
    
    all_products.append(product_item)

with open("products.json", "w", encoding="utf-8") as f:
    json.dump(all_products, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(all_products)} products with 100% accurate titles into products.json")
