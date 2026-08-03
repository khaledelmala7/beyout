import json
import html
import os

with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

categories_dict = {}
for p in products:
    cat = p["category"]
    if cat not in categories_dict:
        categories_dict[cat] = []
    categories_dict[cat].append(p)

packages_data = [
    {
        "title_ar": "1. باقة الاستوديو (Studio Package)",
        "title_en": "Studio Apartment Package",
        "icon": "fa-bed",
        "target": "المساحات المفتوحة، الاستوديوهات السكنية والفندقية",
        "items": [
            {"code": "BY-GW-001", "name": "Smart Gateway Hub ZigBee 3.0", "qty": "1x", "location": "مركز الاستوديو / الصالة"},
            {"code": "BY-LK-001", "name": "Fully Automatic Smart Door Lock", "qty": "1x", "location": "باب الدخول الرئيسي"},
            {"code": "BY-DB-001", "name": "Smart Video Doorbell 1080P", "qty": "1x", "location": "خارج باب الدخول"},
            {"code": "BY-SW-002", "name": "Smart Light Switch 2-Gang", "qty": "2x", "location": "منطقة المعيشة والنوم"},
            {"code": "BY-CR-002", "name": "Smart Curtain Motor with Remote", "qty": "1x", "location": "نافذة الاستوديو الرئيسية"},
            {"code": "BY-SK-001", "name": "Smart Socket All-in-One", "qty": "1x", "location": "ركن المطبخ / التلفزيون"},
            {"code": "BY-SN-005", "name": "Smart Gas & Temp Detector", "qty": "1x", "location": "المطبخ التحضيري"},
            {"code": "BY-SN-008", "name": "Smart Water Leak Sensor", "qty": "1x", "location": "الحمام"}
        ]
    },
    {
        "title_ar": "2. باقة المحلات والمستودعات (Store & Warehouse)",
        "title_en": "Store & Warehouse Package",
        "icon": "fa-warehouse",
        "target": "المستودعات، المحلات التجارية، والمكاتب لحمايتها والتحكم المالي بكهربائها",
        "items": [
            {"code": "BY-GW-001", "name": "Smart Gateway Hub ZigBee 3.0 Wireless", "qty": "1x", "location": "مكتب الإدارة"},
            {"code": "BY-CB-001", "name": "Smart Circuit Breaker (63A)", "qty": "1x", "location": "لوحة الكهرباء الرئيسية (DB)"},
            {"code": "BY-SN-003", "name": "ZigBee PIR Motion Sensor", "qty": "2x", "location": "ممرات التخزين والمستودع"},
            {"code": "BY-SN-009", "name": "Smart Smoke Detector", "qty": "2x", "location": "سقف منطقة التخزين والمكتب"},
            {"code": "BY-SN-007", "name": "Smart Door & Window Sensor", "qty": "2x", "location": "أبواب وبوابات الطوارئ"},
            {"code": "BY-LK-001", "name": "Fully Automatic Smart Door Lock", "qty": "1x", "location": "الباب الرئيسي للمحل / المخزن"}
        ]
    },
    {
        "title_ar": "3. باقة شقة غرفتين وصالة (2-Bedroom Apartment)",
        "title_en": "2-Bedroom Apartment Package",
        "icon": "fa-building",
        "target": "الشقق السكنية الفندقية والعائلية (غرفتين وصالة)",
        "items": [
            {"code": "BY-GW-001", "name": "Smart Gateway Hub ZigBee 3.0", "qty": "1x", "location": "صالة المعيشة"},
            {"code": "BY-LK-003", "name": "Smart Door Lock (Fingerprint & App)", "qty": "1x", "location": "باب الشقة الرئيسي"},
            {"code": "BY-DB-001", "name": "Smart Video Doorbell 1080P", "qty": "1x", "location": "مدخل الشقة الخارجي"},
            {"code": "BY-SW-003", "name": "Smart Light Switch 3-Gang", "qty": "2x", "location": "صالة المعيشة والممر"},
            {"code": "BY-SW-002", "name": "Smart Light Switch 2-Gang", "qty": "4x", "location": "غرفتي النوم (2 لكل غرفة)"},
            {"code": "BY-CR-002", "name": "Smart Curtain Motor with Remote", "qty": "2x", "location": "صالة المعيشة والغرفة الرئيسية"},
            {"code": "BY-SK-001", "name": "Smart Socket All in one", "qty": "3x", "location": "الصالة وغرف النوم"},
            {"code": "BY-SN-005", "name": "Smart Gas & Temp Detector", "qty": "1x", "location": "المطبخ"},
            {"code": "BY-SN-008", "name": "Smart Water Leak Sensor", "qty": "2x", "location": "المطبخ والحمام الرئيسي"}
        ]
    },
    {
        "title_ar": "4. باقة شقة 3 غرف وصالة (3-Bedroom Apartment)",
        "title_en": "3-Bedroom Apartment Package",
        "icon": "fa-house-chimney",
        "target": "الشقق السكنية الكبيرة لجميع أفراد العائلة",
        "items": [
            {"code": "BY-CP-002", "name": "Smart Home Control Panel 4 Inch (Built in Alexa)", "qty": "1x", "location": "صالة الاستقبال الرئيسية"},
            {"code": "BY-GW-002", "name": "Smart Gateway Hub ZigBee Wired", "qty": "1x", "location": "كابينة الاتصالات / الصالة"},
            {"code": "BY-LK-005", "name": "3D Face Recognition Smart Door Lock", "qty": "1x", "location": "باب المدخل الرئيسي"},
            {"code": "BY-DB-005", "name": "Smart Video Doorbell Intercom LCD", "qty": "1x", "location": "خارج باب الشقة"},
            {"code": "BY-SW-007", "name": "Concave Metal Frame Smart Switches", "qty": "10x", "location": "الصالة وغرف النوم الثلاث والممرات"},
            {"code": "BY-SW-012", "name": "Smart Dimmer Switch", "qty": "2x", "location": "غرفة النوم الرئيسية والصالة"},
            {"code": "BY-CR-001", "name": "Smart Curtain Track System", "qty": "3x", "location": "الصالة وغرفة الماستر وغرفة الأطفال"},
            {"code": "BY-SN-001", "name": "Human Presence Detector (Radar)", "qty": "2x", "location": "صالة الاستقبال والممر الرئيسي"},
            {"code": "BY-SN-005", "name": "Smart Gas & Temp Detector", "qty": "1x", "location": "المطبخ"},
            {"code": "BY-SN-008", "name": "Smart Water Leak Sensor", "qty": "2x", "location": "المطبخ والحمام الرئيسي"}
        ]
    },
    {
        "title_ar": "5. باقة الشقة الدوبلكس - طابقين (Duplex Package)",
        "title_en": "Duplex Apartment Package",
        "icon": "fa-layer-group",
        "target": "الشقق الدوبلكس المكونة من دورين علوي وسفلي",
        "items": [
            {"code": "BY-CP-003", "name": "Smart Control Panel 4 Inch (Built-in Amplifier)", "qty": "2x", "location": "1 بالدور السفلي + 1 بالدور العلوي"},
            {"code": "BY-GW-002", "name": "Smart Gateway Hub ZigBee Wired", "qty": "1x", "location": "الدور السفلي (الرئيسي)"},
            {"code": "BY-LK-006", "name": "3D Face Recognition & Intercom Smart Lock", "qty": "1x", "location": "مدخل الدوبلكس الرئيسي"},
            {"code": "BY-DB-006", "name": "Smart Video Doorbell Intercom HD", "qty": "1x", "location": "خارج مدخل الدوبلكس"},
            {"code": "BY-SW-007", "name": "Concave Metal Frame Smart Switches", "qty": "14x", "location": "موزعة على الدورين والسلم الداخلي"},
            {"code": "BY-SN-003", "name": "ZigBee PIR Motion Sensor", "qty": "2x", "location": "السلم الداخلي لإضاءة الدَرَج تلقائياً"},
            {"code": "BY-CR-001", "name": "Smart Curtain Track System", "qty": "4x", "location": "ريسبشن السفلي وغرف النوم بالدور العلوي"},
            {"code": "BY-SK-001", "name": "Smart Socket All in one", "qty": "5x", "location": "الدورين السفلي والعلوي"},
            {"code": "BY-SN-005", "name": "Smart Gas & Water Valve Controller + Sensors", "qty": "2x", "location": "المطبخ وحمامات الدورين"},
            {"code": "BY-SN-009", "name": "Smart Smoke Detector", "qty": "3x", "location": "صالة السفلي، المطبخ، وصالة العلوي"}
        ]
    },
    {
        "title_ar": "6. الباقة الفاخرة للفلل والمنازل المتكاملة (Luxury Villa Package)",
        "title_en": "Luxury Villa Full Smart Package",
        "icon": "fa-gem",
        "target": "الفلل والقصور السكنية الفاخرة لأقصى درجات التحكم والرفاهية والأمان",
        "items": [
            {"code": "BY-CP-009", "name": "Smart Control Panel 10 Inch Pro (Built-in Amp)", "qty": "1x", "location": "الصالون الرئيسي بالفيلا"},
            {"code": "BY-CP-003", "name": "Smart Control Panel 4 Inch (Built-in Amp)", "qty": "4x", "location": "جناح الماستر والأجنحة الفرعية"},
            {"code": "BY-GW-003", "name": "Smart Gateway Hub (Apple HomeKit)", "qty": "2x", "location": "الدور الأرضي والدور الأول"},
            {"code": "BY-LK-006", "name": "Flagship 3D Face Recognition & Intercom Lock", "qty": "2x", "location": "بوابة الفيلا والمدخل الرئيسي"},
            {"code": "BY-DB-006", "name": "Smart Video Doorbell Intercom HD", "qty": "1x", "location": "البوابة الخارجية للفيلا"},
            {"code": "BY-SW-007", "name": "Luxury Concave Metal Frame Smart Switches", "qty": "22x", "location": "موزعة على كافة أرجاء الفيلا"},
            {"code": "BY-CR-001", "name": "Completed Curtain Track Systems", "qty": "7x", "location": "ريسبشن الفيلا وجميع غرف النوم"},
            {"code": "BY-SN-001", "name": "Human Presence Detectors (Radar)", "qty": "6x", "location": "الممرات الرئيسية وصالات المعيشة"},
            {"code": "BY-CB-001", "name": "Smart Circuit Breakers (63A)", "qty": "3x", "location": "لوحات الكهرباء الرئيسية لكل دور"},
            {"code": "BY-SN-005", "name": "Gas & Water Valve Controllers + All Sensors Suite", "qty": "4x", "location": "المطابخ، غرف الغسيل، والمضخات"}
        ]
    }
]

html_content = """
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beyout Smart Solutions - Product Catalog & Installation Matrix 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@400;600;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-blue: #004c99; 
            --primary-green: #52a621;
            --bg-body: #f8fafc;
            --white: #ffffff;
            --text-dark: #0f172a;
            --text-gray: #64748b;
            --border-color: #e2e8f0;
            --shadow-sm: 0 2px 10px rgba(0,0,0,0.03);
            --shadow-md: 0 10px 25px rgba(0, 76, 153, 0.06);
            --shadow-hover: 0 20px 40px rgba(0, 76, 153, 0.12);
        }
        
        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-body);
            color: var(--text-dark);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

        /* HEADER */
        header {
            background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
            padding: 4rem 2rem 3rem;
            text-align: center;
            border-bottom: 1px solid var(--border-color);
        }

        .header-logo {
            max-width: 280px;
            height: auto;
            margin-bottom: 1.5rem;
        }

        header h1 {
            font-size: 2.8rem;
            font-weight: 800;
            color: var(--primary-blue);
            margin: 0;
            letter-spacing: -0.5px;
        }

        header h1 span {
            color: var(--primary-green);
        }

        header p {
            font-size: 1.15rem;
            color: var(--text-gray);
            margin: 0.8rem auto 0;
            max-width: 650px;
        }

        /* NAVIGATION TABS */
        .nav-container {
            position: sticky;
            top: 0;
            z-index: 100;
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border-color);
            padding: 1rem 0;
            overflow-x: auto;
            white-space: nowrap;
            box-shadow: var(--shadow-sm);
        }

        .nav-inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            gap: 0.8rem;
        }

        .nav-tab {
            display: inline-block;
            padding: 0.6rem 1.2rem;
            border-radius: 30px;
            background-color: #f1f5f9;
            color: var(--text-gray);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .nav-tab:hover, .nav-tab.active {
            background-color: var(--primary-blue);
            color: var(--white);
        }

        /* CONTAINER */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }

        /* SECTION HEADER */
        .section-header {
            margin: 4rem 0 2rem;
            padding-bottom: 0.8rem;
            border-bottom: 2px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .section-header h2 {
            font-size: 2rem;
            font-weight: 800;
            color: var(--primary-blue);
            margin: 0;
        }

        .section-header .count-badge {
            background-color: #e0f2fe;
            color: var(--primary-blue);
            font-size: 0.9rem;
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
        }

        /* GRID */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
            gap: 2rem;
        }

        /* CARD */
        .card {
            background: var(--white);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .card:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-hover);
            border-color: #cbd5e1;
        }

        .card-code {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background-color: var(--primary-blue);
            color: var(--white);
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.3rem 0.7rem;
            border-radius: 6px;
            z-index: 10;
            letter-spacing: 0.5px;
        }

        .img-container {
            width: 100%;
            height: 240px;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            border-bottom: 1px solid #f1f5f9;
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

        .content {
            padding: 1.8rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-dark);
            margin: 0 0 1.2rem 0;
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
            padding-left: 1.5rem;
            margin-bottom: 0.6rem;
            font-size: 0.9rem;
            color: var(--text-gray);
            line-height: 1.5;
        }

        .features li i {
            position: absolute;
            left: 0;
            top: 4px;
            color: var(--primary-green);
            font-size: 0.85rem;
        }

        /* BUNDLES SECTION */
        .bundles-section {
            margin-top: 6rem;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: var(--white);
            padding: 5rem 2rem;
            border-radius: 24px;
        }

        .bundles-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .bundles-header h2 {
            font-size: 2.8rem;
            font-weight: 800;
            margin: 0 0 1rem 0;
            font-family: 'Tajawal', sans-serif;
            color: #ffffff;
        }

        .bundles-header p {
            color: #94a3b8;
            font-size: 1.15rem;
            font-family: 'Tajawal', sans-serif;
            max-width: 800px;
            margin: 0 auto;
        }

        .bundles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 2.5rem;
        }

        .bundle-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .bundle-card:hover {
            transform: translateY(-8px);
            border-color: var(--primary-green);
            background: rgba(255, 255, 255, 0.08);
        }

        .bundle-icon {
            font-size: 2.5rem;
            color: var(--primary-green);
            margin-bottom: 1.5rem;
        }

        .bundle-title-ar {
            font-family: 'Tajawal', sans-serif;
            font-size: 1.6rem;
            font-weight: 800;
            margin: 0 0 0.3rem 0;
            color: #ffffff;
        }

        .bundle-title-en {
            font-size: 1rem;
            color: #94a3b8;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .bundle-target {
            font-family: 'Tajawal', sans-serif;
            font-size: 0.95rem;
            color: #cbd5e1;
            margin-bottom: 1.8rem;
            background: rgba(255,255,255,0.05);
            padding: 0.8rem 1rem;
            border-radius: 10px;
            border-right: 3px solid var(--primary-green);
        }

        /* MATRIX TABLE */
        .matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            font-size: 0.9rem;
        }

        .matrix-table th {
            text-align: left;
            padding: 0.6rem 0.8rem;
            background: rgba(255,255,255,0.1);
            color: #94a3b8;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .matrix-table td {
            padding: 0.8rem 0.8rem;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            color: #e2e8f0;
            vertical-align: middle;
        }

        .matrix-table tr:hover td {
            background: rgba(255,255,255,0.03);
        }

        .matrix-code {
            font-size: 0.75rem;
            background-color: var(--primary-blue);
            color: #fff;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-weight: 700;
            display: inline-block;
        }

        .matrix-location {
            font-family: 'Tajawal', sans-serif;
            color: #38bdf8;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .matrix-qty {
            font-weight: 700;
            color: var(--primary-green);
            text-align: center;
        }

        /* FOOTER */
        footer {
            text-align: center;
            padding: 3rem 2rem;
            color: var(--text-gray);
            margin-top: 4rem;
            border-top: 1px solid var(--border-color);
        }

        footer p {
            margin: 0;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>

<header>
    <img src="logo.png" alt="Beyout Logo" class="header-logo" onerror="this.style.display='none'">
    <h1>Beyout <span>Smart</span> Solutions</h1>
    <p>Official Product Catalog & Installation Placement Matrix (2026)</p>
</header>

<div class="nav-container">
    <div class="nav-inner">
        <a href="#all" class="nav-tab active">All Products</a>
"""

for cat_name in categories_dict.keys():
    cat_id = cat_name.lower().replace(" ", "-").replace("&", "and")
    html_content += f'<a href="#{cat_id}" class="nav-tab">{html.escape(cat_name)}</a>\n'

html_content += """
        <a href="#packages" class="nav-tab" style="background-color: var(--primary-green); color: #fff;">Smart Packages & Installation Matrix (الباقات والماتريكس)</a>
    </div>
</div>

<div class="container" id="all">
"""

for cat_name, items in categories_dict.items():
    cat_id = cat_name.lower().replace(" ", "-").replace("&", "and")
    html_content += f"""
    <div class="section-header" id="{cat_id}">
        <h2>{html.escape(cat_name)}</h2>
        <span class="count-badge">{len(items)} Items</span>
    </div>
    <div class="grid">
"""
    for p in items:
        code_safe = html.escape(p["code"])
        title_safe = html.escape(p["title"])
        img_safe = html.escape(p["image"])
        
        lis = ""
        for line in p["description"]:
            lis += f"<li><i class='fas fa-check-circle'></i> {html.escape(line)}</li>\n"
            
        card = f"""
        <div class="card">
            <span class="card-code">{code_safe}</span>
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
    html_content += "</div>\n"

# Add Bundles & Matrix Section
html_content += """
    <div class="bundles-section" id="packages">
        <div class="bundles-header">
            <h2>باقات بيوت الذكية وماتريكس أماكن التركيب</h2>
            <p>Complete Smart Home Packages & Placement Matrix (مكان تركيب كل منتج بالضبط في العقار)</p>
        </div>
        <div class="bundles-grid">
"""

for pkg in packages_data:
    rows_html = ""
    for itm in pkg["items"]:
        rows_html += f"""
        <tr>
            <td><span class="matrix-code">{html.escape(itm['code'])}</span></td>
            <td>{html.escape(itm['name'])}</td>
            <td class="matrix-qty">{html.escape(itm['qty'])}</td>
            <td class="matrix-location">{html.escape(itm['location'])}</td>
        </tr>
"""
        
    pkg_card = f"""
        <div class="bundle-card">
            <div class="bundle-icon"><i class="fas {pkg['icon']}"></i></div>
            <h3 class="bundle-title-ar">{html.escape(pkg['title_ar'])}</h3>
            <div class="bundle-title-en">{html.escape(pkg['title_en'])}</div>
            <div class="bundle-target"><i class="fas fa-info-circle"></i> {html.escape(pkg['target'])}</div>
            
            <table class="matrix-table">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>موقع التركيب (Installation Area)</th>
                    </tr>
                </thead>
                <tbody>
                    {rows_html}
                </tbody>
            </table>
        </div>
"""
    html_content += pkg_card

html_content += """
        </div>
    </div>
</div>

<footer>
    <p>&copy; 2026 Beyout Smart Solutions. All Rights Reserved.</p>
</footer>

</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated complete English catalog with SKUs, Studio & Duplex Packages, and Installation Matrix at index.html")
