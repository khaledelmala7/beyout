import fitz
import os
import re
import html
import concurrent.futures
from deep_translator import GoogleTranslator
import time

pdf_path = "Home Sense New Price List & Device Specifications May-2026.pdf"
assets_dir = "catalog_assets"
os.makedirs(assets_dir, exist_ok=True)

def refine_title(title):
    t = title.lower()
    
    # Switches
    if "light switch" in t:
        base = "مفتاح إضاءة سمارت"
        if "mini" in t: base = "مفتاح إضاءة ميني سمارت"
        if "concave" in t: base = "مفتاح إضاءة سمارت (تصميم مقعر)"
        
        if "1-gang" in t: return f"{base} - مفتاح واحد"
        if "2-gang" in t: return f"{base} - مفتاحين"
        if "3-gang" in t: return f"{base} - 3 مفاتيح"
        if "4-gang" in t: return f"{base} - 4 مفاتيح"
        if "5-gang" in t: return f"{base} - 5 مفاتيح"
        if "6-gang" in t: return f"{base} - 6 مفاتيح"
        return base
        
    if "curtain switch" in t:
        if "1-ch" in t: return "مفتاح ستائر سمارت - قناة واحدة"
        if "2-ch" in t: return "مفتاح ستائر سمارت - قناتين"
        return "مفتاح ستائر سمارت"
        
    if "dimmer switch" in t: return "مفتاح خافت للإضاءة (Dimmer) سمارت"
    if "boiler switch" in t: return "مفتاح تكييف وسخان سمارت"
    if "thermostat" in t: return "وحدة تحكم حراري (ثرموستات) سمارت"
    if "circuit breaker" in t: return "قاطع تيار كهربائي سمارت"
    
    # Sockets
    if "socket" in t or "plug" in t:
        if "all in one" in t:
            if "3-gang" in t and "2-usb" in t and "1-socket" in t: return "مقبس ذكي متكامل - 3 مفاتيح + 2 منفذ USB + مقبس واحد"
            if "3-gang" in t and "2-usb" in t and "2-socket" in t: return "مقبس ذكي متكامل - 3 مفاتيح + 2 منفذ USB + مقبسين"
            return "مقبس ذكي متكامل"
        if "pc frame" in t: return "مقبس جداري سمارت (بإطار PC)"
        return "مقبس جداري سمارت"
        
    # Curtains
    if "curtain motor" in t: return "موتور ستائر سمارت مع ريموت كنترول"
    if "curtain kit" in t: return "نظام ستائر سمارت متكامل"
    if "curtain system" in t: return "نظام ستائر سمارت"
    
    # Panels
    if "control panel" in t:
        base = "لوحة تحكم منزلية ذكية"
        if "10 inch pro" in t: return f"{base} - شاشة 10 بوصة Pro"
        if "10 inch" in t: return f"{base} - شاشة 10 بوصة"
        if "8 inch pro" in t: return f"{base} - شاشة 8 بوصة Pro"
        if "8 inch" in t: return f"{base} - شاشة 8 بوصة"
        if "7 inch" in t: return f"{base} - شاشة 7 بوصة"
        if "6 inch" in t: return f"{base} - شاشة 6 بوصة"
        if "4 inch" in t: return f"{base} - شاشة 4 بوصة"
        if "3.5 inch" in t: return f"{base} - شاشة 3.5 بوصة"
        return base
        
    # Gateways
    if "gateway hub" in t:
        if "wired" in t: return "وحدة تحكم مركزية (Gateway Hub) - سلكية"
        return "وحدة تحكم مركزية (Gateway Hub) - لاسلكية"
    if "repeater" in t: return "موسع نطاق (Repeater) سمارت"
    
    # Remotes
    if "ir remote" in t:
        if "temp" in t: return "جهاز تحكم عن بعد IR سمارت - مع مستشعر حرارة ورطوبة"
        if "rf" in t: return "جهاز تحكم عن بعد IR+RF سمارت"
        return "جهاز تحكم عن بعد IR سمارت"
        
    # Sensors
    if "presence detector" in t: return "مستشعر حضور بشري سمارت"
    if "motion sensor" in t: return "مستشعر حركة (PIR) سمارت"
    if "gas" in t and "detector" in t: return "كاشف تسرب غاز سمارت"
    if "smoke detector" in t: return "كاشف دخان سمارت"
    if "water leak" in t: return "مستشعر تسرب مياه سمارت"
    if "door & window" in t: return "مستشعر أبواب ونوافذ سمارت"
    if "valve controller" in t: return "متحكم صمام غاز/مياه سمارت"
    
    # Doorbells & Locks
    if "video doorbell" in t:
        if "intercom" in t: return "جرس فيديو وانتركم سمارت"
        return "جرس باب بالفيديو سمارت"
    if "door lock" in t:
        if "semi automatic" in t: return "قفل باب سمارت شبه أوتوماتيكي"
        return "قفل باب سمارت أوتوماتيكي بالكامل"
        
    return None # Fallback to translation if not matched

def pre_clean_desc(text):
    text = re.sub(r'(?i)home\s*sense', 'بيوت (Beyout)', text)
    text = re.sub(r'(?i)tuya', 'Beyout', text)
    text = re.sub(r'(?i)avera', '', text)
    return text.strip()

def post_clean_arabic(text):
    text = text.replace('واي فاي', 'Wi-Fi')
    text = text.replace('زيجبي', 'Zigbee')
    text = text.replace('عصابة', 'مفاتيح')
    return text

def translate_page(i):
    try:
        with fitz.open(pdf_path) as doc:
            page = doc[i]
            
            rect_img = fitz.Rect(60, 70, 320, 260)
            pix = page.get_pixmap(clip=rect_img)
            img_name = f"img_{i}.png"
            img_path = os.path.join(assets_dir, img_name)
            pix.save(img_path)
            
            rect_text = fitz.Rect(360, 60, 720, 420)
            text = page.get_text("text", clip=rect_text)
            
            if len(text.strip()) < 10:
                return None
                
            lines = text.split('\n')
            raw_title = lines[0] if lines else "منتج ذكي"
            
            # Map title or translate
            title_ar = refine_title(raw_title)
            translator = GoogleTranslator(source='auto', target='ar')
            
            if not title_ar:
                title_ar = translator.translate(raw_title)
                title_ar = post_clean_arabic(title_ar)
                
            desc_lines = [pre_clean_desc(l) for l in lines[1:] if l.strip() and not re.match(r'^[\d\.\s]+$', l.strip())]
            
            combined_desc = "\n".join(desc_lines)
            if combined_desc:
                desc_ar_combined = translator.translate(combined_desc)
                desc_ar_combined = post_clean_arabic(desc_ar_combined)
                desc_ar_lines = desc_ar_combined.split('\n')
            else:
                desc_ar_lines = []
                
            return {
                'page': i,
                'image': f'{assets_dir}/{img_name}',
                'title': title_ar,
                'desc': desc_ar_lines
            }
    except Exception as e:
        print(f"Error on page {i}: {e}", flush=True)
        return None

print("Starting multithreaded translation...", flush=True)
start_time = time.time()
products = []
with fitz.open(pdf_path) as main_doc:
    total_pages = main_doc.page_count

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    futures = [executor.submit(translate_page, i) for i in range(2, total_pages - 1)]
    for future in concurrent.futures.as_completed(futures):
        res = future.result()
        if res:
            products.append(res)
            print(f"Done page {res['page']}: {res['title']}", flush=True)

products.sort(key=lambda x: x['page'])

print(f"Finished translation in {time.time() - start_time:.2f} seconds. Generating HTML...", flush=True)

html_content = """
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>كتالوج منتجات بيوت - Beyout Smart Solutions</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-blue: #004c99; 
            --primary-green: #52a621;
            --bg-body: #f4f6f9;
            --white: #ffffff;
            --text-dark: #2d3748;
            --text-gray: #64748b;
            --border-color: #e2e8f0;
            --shadow-subtle: 0 4px 20px rgba(0, 76, 153, 0.05);
            --shadow-hover: 0 15px 35px rgba(0, 76, 153, 0.1);
        }
        
        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Tajawal', sans-serif;
            background-color: var(--bg-body);
            color: var(--text-dark);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #e2e8f0; 
        }
        ::-webkit-scrollbar-thumb {
            background: var(--primary-blue); 
            border-radius: 4px;
        }

        /* HEADER */
        header {
            background-color: var(--white);
            padding: 4rem 2rem;
            text-align: center;
            border-bottom: 1px solid var(--border-color);
            position: relative;
        }
        
        .logo-container {
            margin-bottom: 2rem;
        }

        .header-logo {
            max-width: 320px;
            height: auto;
        }

        header h1 {
            font-size: 2.8rem;
            font-weight: 800;
            color: var(--primary-blue);
            margin: 0;
        }

        header p {
            font-size: 1.2rem;
            color: var(--text-gray);
            margin: 1rem auto 0;
            max-width: 600px;
            font-weight: 400;
        }

        /* LAYOUT */
        .container {
            max-width: 1350px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2.5rem;
        }

        /* CARD */
        .card {
            background: var(--white);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: var(--shadow-subtle);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-hover);
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 4px;
            background: linear-gradient(90deg, var(--primary-blue), var(--primary-green));
        }

        /* IMAGE */
        .img-container {
            width: 100%;
            height: 260px;
            background-color: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            border-bottom: 1px solid #f8fafc;
        }

        .img-container img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.4s ease;
        }

        .card:hover .img-container img {
            transform: scale(1.05);
        }

        /* CONTENT */
        .content {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .title {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary-blue);
            margin: 0 0 1.5rem 0;
            line-height: 1.4;
        }

        .features {
            list-style: none;
            padding: 0;
            margin: 0;
            flex-grow: 1;
        }

        .features li {
            position: relative;
            padding-right: 1.8rem;
            margin-bottom: 0.8rem;
            font-size: 0.95rem;
            color: var(--text-gray);
        }

        .features li i {
            position: absolute;
            right: 0;
            top: 5px;
            color: var(--primary-green);
            font-size: 0.9rem;
        }

        /* BUTTON */
        .btn-container {
            margin-top: 2rem;
            text-align: center;
        }

        .btn {
            display: inline-block;
            width: 100%;
            padding: 0.9rem 1.5rem;
            background-color: var(--white);
            color: var(--primary-blue);
            border: 1.5px solid var(--primary-blue);
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background-color: var(--primary-blue);
            color: var(--white);
        }

        /* FOOTER */
        footer {
            background-color: #0f172a;
            color: var(--white);
            text-align: center;
            padding: 3rem 2rem;
            margin-top: 2rem;
        }

        footer p {
            margin: 0;
            opacity: 0.8;
            font-size: 1rem;
        }
    </style>
</head>
<body>

<header>
    <div class="logo-container">
        <!-- يتم تحميل لوجو بيوت من الملف المحلي -->
        <img src="logo.png" alt="Beyout Logo" class="header-logo">
    </div>
    <h1>أحدث إصدارات <span>Beyout</span></h1>
    <p>حلول المنازل الذكية الفاخرة للارتقاء بأسلوب حياتك</p>
</header>

<div class="container">
    <div class="grid">
"""

for p in products:
    title_safe = html.escape(p['title'])
    img_safe = html.escape(p['image'])
    
    lis = ""
    for line in p['desc']:
        lis += f"<li><i class='fas fa-check-circle'></i> {html.escape(line)}</li>\n"
        
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
                <div class="btn-container">
                    <a href="#" class="btn">عرض التفاصيل</a>
                </div>
            </div>
        </div>
"""
    html_content += card

html_content += """
    </div>
</div>

<footer>
    <p>&copy; 2026 شركة بيوت للحلول الذكية (Beyout Smart Solutions). جميع الحقوق محفوظة.</p>
</footer>

</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Catalog generated successfully at index.html", flush=True)
