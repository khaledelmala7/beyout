import fitz
import os
import re
import html
from deep_translator import GoogleTranslator

pdf_path = "Home Sense New Price List & Device Specifications May-2026.pdf"
assets_dir = "catalog_assets"
os.makedirs(assets_dir, exist_ok=True)

doc = fitz.open(pdf_path)
translator = GoogleTranslator(source='auto', target='ar')

def clean_text(text):
    text = re.sub(r'(?i)home\s*sense', 'Fixora', text)
    text = re.sub(r'(?i)tuya', 'Fixora Smart', text)
    text = re.sub(r'(?i)avera', '', text)
    return text.strip()

products = []

print("Processing pages...")
for i in range(2, doc.page_count - 1): # skip last page if it's "Contact Us"
    page = doc[i]
    
    # 1. Extract image
    rect_img = fitz.Rect(40, 60, 360, 360)
    pix = page.get_pixmap(clip=rect_img)
    img_name = f"img_{i}.png"
    img_path = os.path.join(assets_dir, img_name)
    pix.save(img_path)
    
    # 2. Extract text
    rect_text = fitz.Rect(360, 60, 720, 420)
    text = page.get_text("text", clip=rect_text)
    
    # Also grab the title which is usually large. Actually, get_text gets everything in rect.
    text = clean_text(text)
    
    if len(text) < 10:
        continue # skip empty or mostly empty pages
        
    lines = text.split('\n')
    title = lines[0] if lines else "منتج ذكي"
    desc_lines = lines[1:]
    
    # Translate
    try:
        title_ar = translator.translate(title)
        desc_ar_lines = []
        for line in desc_lines:
            line = line.strip()
            if line:
                # filter out raw prices if they are just numbers, but maybe keep them?
                if re.match(r'^\d+$', line): continue
                tr = translator.translate(line)
                if tr:
                    desc_ar_lines.append(tr)
        
        products.append({
            'image': f'{assets_dir}/{img_name}',
            'title': title_ar,
            'desc': desc_ar_lines
        })
        print(f"Processed page {i}: {title_ar}")
    except Exception as e:
        print(f"Failed to translate page {i}: {e}")

# Now build HTML
html_content = """
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>كتالوج منتجات بيفكسورا - Fixora Smart Home</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #d4af37; /* Gold */
            --bg-dark: #0f1115;
            --card-bg: rgba(25, 28, 36, 0.8);
            --text-light: #e0e0e0;
            --text-muted: #a0a0a0;
        }
        body {
            font-family: 'Cairo', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-light);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            background-image: radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.05), transparent 25%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.05), transparent 25%);
        }
        header {
            text-align: center;
            padding: 4rem 2rem;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }
        header h1 {
            font-size: 3.5rem;
            font-weight: 900;
            color: var(--primary);
            margin: 0;
            text-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            letter-spacing: 2px;
        }
        header p {
            font-size: 1.2rem;
            color: var(--text-muted);
            margin-top: 1rem;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2.5rem;
        }
        .card {
            background: var(--card-bg);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(10px);
            position: relative;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 4px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.15);
            border-color: rgba(212, 175, 55, 0.3);
        }
        .card:hover::before {
            opacity: 1;
        }
        .img-container {
            width: 100%;
            height: 280px;
            background-color: #fff; /* keep white to blend with product renders */
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .img-container img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            transition: transform 0.5s ease;
        }
        .card:hover .img-container img {
            transform: scale(1.08);
        }
        .content {
            padding: 2rem;
        }
        .title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0 0 1rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.8rem;
        }
        .features {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .features li {
            position: relative;
            padding-right: 1.5rem;
            margin-bottom: 0.6rem;
            font-size: 0.95rem;
            color: var(--text-light);
        }
        .features li::before {
            content: '✦';
            position: absolute;
            right: 0;
            color: var(--primary);
            font-size: 0.8rem;
            top: 4px;
        }
        footer {
            text-align: center;
            padding: 3rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 3rem;
            color: var(--text-muted);
        }
    </style>
</head>
<body>

<header>
    <h1>Fixora</h1>
    <p>حلول المنازل الذكية المبتكرة - لحياة أكثر رفاهية وأماناً</p>
</header>

<div class="container">
    <div class="grid">
"""

for p in products:
    title_safe = html.escape(p['title'])
    img_safe = html.escape(p['image'])
    
    lis = ""
    for line in p['desc']:
        lis += f"<li>{html.escape(line)}</li>\n"
        
    card = f"""
        <div class="card">
            <div class="img-container">
                <img src="{img_safe}" alt="{title_safe}" loading="lazy">
            </div>
            <div class="content">
                <h3 class="title">{title_safe}</h3>
                <ul class="features">
                    {lis}
                </ul>
            </div>
        </div>
"""
    html_content += card

html_content += """
    </div>
</div>

<footer>
    <p>&copy; 2026 بيفكسورا - Fixora. جميع الحقوق محفوظة.</p>
</footer>

</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Catalog generated successfully at index.html")
