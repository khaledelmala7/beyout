import os
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

# Paths
brain_dir = r"C:\Users\kga\.gemini\antigravity\brain\7be42dd2-84a4-4639-b62f-1450137a1db5"
assets_dir = r"d:\Ai\social\assets"
output_html = r"d:\Ai\social\vexora_content_calendar.html"
output_md = r"d:\Ai\social\vexora_content_calendar.md"

if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)

# Define 30 unique Vexora B2B posts
vexora_posts = [
    {
        "day": 1,
        "topic": "رصد التسلل الليلي بالذكاء الاصطناعي",
        "prompt": "Security camera feed showing a warehouse depot yard at night, red target bounding box tracking an intruder, live alert",
        "caption": "احمِ بضائعك ومخازنك من السرقات! 🚨 نظام فيكسورا بيكتشف أي تسلل غريب في محيط منشأتك بالليل ويبعتلك تنبيه فوري وصور حية لمنع الجريمة فوراً."
    },
    {
        "day": 2,
        "topic": "الخريطة الحرارية للمحلات التجارية",
        "prompt": "Busy retail clothing store with overlay neon heatmap showing lines of shoppers and high traffic regions, visual analytics",
        "caption": "عايز تزود مبيعات محلك؟ 🗺️ فيكسورا بتحلل سلوك زوار محلك التجاري وتوضحلك الخريطة الحرارية (Heatmap) للأقسام الأكثر زيارة لتنظيم البضائع بذكاء."
    },
    {
        "day": 3,
        "topic": "كشف الدخان والحرائق فورياً بالكاميرات",
        "prompt": "Industrial warehouse factory corner with smoke plume rising, highlighted by a glowing alarm box overlay 'SMOKE 91%'",
        "caption": "سرعة الاستجابة بتنقذ ملايين! 🔥 الكاميرات الذكية من فيكسورا بترصد بداية انبعاث الدخان وتنبّه الأمن في ثوانٍ معدودة قبل انتشار الحريق ووصوله للمخازن."
    },
    {
        "day": 4,
        "topic": "رصد ارتداء خوذة السلامة للعمال",
        "prompt": "A factory site security camera tracking workers, drawing green boxes on safety helmets and red alert on worker without helmet",
        "caption": "حافظ على سلامة عمالك وامنع الغرامات! 👷‍♂️ نظام فيكسورا بيكتشف فوراً لو في عامل مش مرتدي خوذة السلامة أو الصديري الفسفوري ويرسل تنبيه للمشرف."
    },
    {
        "day": 5,
        "topic": "حساب عدد الزوار وقمم أوقات الذروة",
        "prompt": "Security analytics screen counting shoppers entering shopping mall entrance door, real time digital count charts",
        "caption": "اعرف أوقات ذروة عملك بالدقة! 📊 فيكسورا بتعد العملاء الداخلين والخارجين وتديلك تقارير يومية عشان تظبط فترات عمل موظفيك وتحسن خدمة العملاء."
    },
    {
        "day": 6,
        "topic": "حماية الأصول القيمة من النقل",
        "prompt": "A close up of a valuable crate in a warehouse, overlayed with a digital secure boundary box line, vault concept",
        "caption": "تأمين تام للأصول الهامة! 📦 تقدر ترسم مربع أمني حول بضاعة معينة أو خزنة، ولو تم تحريكها من مكانها بيشتغل إنذار فوري وتنبيه على موبايلك."
    },
    {
        "day": 7,
        "topic": "رصد التسكع والوقوف المشبوه خارج المنشأة",
        "prompt": "A security camera view of a dark alleyway next to a bank vault, red digital tracking showing a person loitering for too long",
        "caption": "امنع التهديدات قبل ما تبدأ! 🚶‍♂️ النظام بيرصد لو في شخص واقف في منطقة محظورة أو جنب السور الخارجي للشركة لفترة طويلة ويبعت تنبيه للأمن."
    },
    {
        "day": 8,
        "topic": "تتبع فترات بقاء الشاحنات بالمخازن",
        "prompt": "Loading bay of a modern logistics warehouse, digital timing overlay above trucks tracking loading duration in real time",
        "caption": "سرّع عمليات الشحن والتفريغ! 🚛 فيكسورا بتسجل وقت دخول وخروج كل شاحنة من بوابات المخازن وتديلك تقارير لتحسين سلاسل الإمداد وتقليل الهدر."
    },
    {
        "day": 9,
        "topic": "التعرف على لوحات السيارات المصرحة",
        "prompt": "Camera identifying license plate of a car at a gated corporate entrance barrier, license plate recognition software view",
        "caption": "بوابة ذكية تفتح أوتوماتيكياً! 🚗 الكاميرا بتتعرف على أرقام لوحات سيارات الموظفين والعملاء المصرحين وتفتح البوابة فوراً لتسهيل الدخول."
    },
    {
        "day": 10,
        "topic": "التحكم في طوابير الانتظار والـ Queues",
        "prompt": "A supermarket checkouts queue, camera analysis overlay highlighting red alert on queue of over 5 people, alert manager",
        "caption": "لا تدع عميلك يغضب من الانتظار! 🛒 فيكسورا بتراقب الطوابير وتنبّه مدير الفرع لو الطابور زاد عن 5 أشخاص لفتح كاشير إضافي فوراً."
    },
    {
        "day": 11,
        "topic": "الدمج مع كاميرات المراقبة الحالية للشركة",
        "prompt": "Cables and glowing digital data flows entering a network video recorder NVR in a server cabinet, smart system integration",
        "caption": "وفر تكاليف شراء كاميرات جديدة! 🔌 فيكسورا بتشتغل وتندمج مع شبكة الكاميرات الحالية لشركتك (سواء كانت IP أو Analog) وتحولها لكاميرات ذكية."
    },
    {
        "day": 12,
        "topic": "تأمين غرف السيرفرات والأجهزة الحساسة",
        "prompt": "Corporate server room with glowing lights, digital thermal check overlay showing normal temperature, high security access",
        "caption": "حماية قلب شركتك النابض 🖥️ أمن غرف السيرفرات والشبكات من الدخول غير المصرح ورصد أي تغيرات في شكل المعدات أو انبعاث الدخان فوراً."
    },
    {
        "day": 13,
        "topic": "مراقبة الصيدليات وصرف الأدوية الهامة",
        "prompt": "Pharmacy interior, security camera with virtual fence bounding box protecting medicine shelves, clean lighting",
        "caption": "منع الخسائر في الصيدليات 💊 فيكسورا بتراقب رفوف الأدوية والمستحضرات الثمينة وتنبهك لو تم سحب أو تحريك بضائع معينة خارج أوقات العمل."
    },
    {
        "day": 14,
        "topic": "رصد التسلل في جراجات الشركات والمولات",
        "prompt": "Empty underground parking lot at night, red digital target bounding box highlighting an intruder walking between cars",
        "caption": "تأمين تام لجراج السيارات 🚗 الكاميرا الذكية بترصد أي حركة مشبوهة أو شخص يتجول بين السيارات في أوقات متأخرة وتبعت تنبيه فوري للأمن."
    },
    {
        "day": 15,
        "topic": "تحليل سلوك زوار المطاعم وتوزيع الطاولات",
        "prompt": "Top-down view of a luxury busy restaurant lounge with digital heatmap tracking customer density at different tables",
        "caption": "طور خدمة عملاء مطعمك! 🍔 اعرف الطاولات الأكثر استخداماً والأوقات اللي بيكون فيها العميل محتاج انتظار عشان تنظم الخدمة وتزود المبيعات."
    },
    {
        "day": 16,
        "topic": "تأمين بوابات المستشفيات والعيادات",
        "prompt": "A modern hospital corridor with a face recognition digital scanning box overlay on a doctor entering a cleanroom door",
        "caption": "أمان تام للمناطق الطبية الحساسة 🏥 احمِ غرف العمليات والعناية المركزة والمستودعات الطبية من دخول الأشخاص غير المصرح لهم بالذكاء الاصطناعي."
    },
    {
        "day": 17,
        "topic": "رصد السرقة وشغب الزبائن في محلات التجزئة",
        "prompt": "Luxury retail store counter, camera overlay showing alert tag 'Alert - Shoplifting Suspicion' on screen, tech security",
        "caption": "امنع السرقات في محلك فورياً 🛍️ نظام فيكسورا بيرصد الحركات السريعة أو محاولات إخفاء البضائع ويرسل إشعار فوري لمدير المحل للتدخل الهادئ."
    },
    {
        "day": 18,
        "topic": "تأمين معارض السيارات الفاخرة",
        "prompt": "Luxury sports car showroom at night, digital virtual red barrier protect lines guarding cars, evening camera lens glow",
        "caption": "أقصى حماية لمعارض السيارات 🏎️ ارسم حدوداً افتراضية حول السيارات الفاخرة المعروضة، وسيتم تنبيهك فوراً لو اقترب أي شخص منها خارج أوقات العمل."
    },
    {
        "day": 19,
        "topic": "تأمين البنوك والمقرات الإدارية الكبرى",
        "prompt": "Corporate building lobby with bank vault entry door, face recognition scan verifying employees with green indicators",
        "caption": "أعلى مستويات الأمان لمقرات البنوك 🏦 تحليلات فيكسورا بتضمن عدم عبور أي شخص بوابات الدخول دون تصريح أو التعرف البصري الفوري."
    },
    {
        "day": 20,
        "topic": "إشراف ذكي على مستودعات البترول والغاز",
        "prompt": "Industrial gas refinery terminal at dusk, camera scanning pipes showing digital temperature reading and leakage checks",
        "caption": "سلامة كاملة في قطاع الطاقة والغاز ⛽ الكاميرات الحرارية والذكية بترصد أي تسريب للغازات أو ارتفاع خطر في درجات حرارة الأنابيب فوراً."
    },
    {
        "day": 21,
        "topic": "رصد عدم الالتزام بمسارات الحركة في المصانع",
        "prompt": "Industrial assembly floor with yellow paths, camera detecting a worker crossing safety boundary lines in red alert",
        "caption": "تقليل الحوادث الصناعية للمصانع 🏗️ فيكسورا بتنبّه لو خرج أحد العمال عن مسار الحركة المخصص أو دخل منطقة قريبة من الآلات الخطرة."
    },
    {
        "day": 22,
        "topic": "تقليل الإنذارات الكاذبة من الكاميرات",
        "prompt": "Security camera feed ignoring leaves blowing in the wind but focusing on a person climbing fence, clear AI difference",
        "caption": "وداعاً للإشعارات المزعجة والإنذارات الكاذبة! 🐱❌ نظام فيكسورا الذكي بيفرق بين حركة قطة أو شجرة بتتحرك وبين حركة إنسان حقيقي، وينبهك للتهديد الفعلي فقط."
    },
    {
        "day": 23,
        "topic": "تأمين مدارس الأطفال والمؤسسات التعليمية",
        "prompt": "A modern school campus entrance gates during morning hours, camera scanning visitors checking for security approval",
        "caption": "أولادنا في أمان تام بالمدارس 🏫 فيكسورا بتراقب بوابات المدارس وتكتشف فوراً لو في غرباء أو عربيات مريبة واقفة في محيط المدرسة لمنع المخاطر."
    },
    {
        "day": 24,
        "topic": "رصد سقوط الأشخاص المفاجئ والـ Fall Detection",
        "prompt": "Warehouse floor with a worker falling down, camera drawing red box with alarm message 'FALL DETECTED' on screen, security dashboard",
        "caption": "إنقاذ فوري للعمال في حالات الطوارئ! 🚑 لو تعرض عامل للسقوط أو الإغماء في المستودع، الكاميرا الذكية بترصد الحادث فوراً وتنبه الإسعاف والأمن."
    },
    {
        "day": 25,
        "topic": "مراقبة المخزون ونقص المنتجات بالرفوف",
        "prompt": "Supermarket shelf, camera analytics overlay showing empty spaces marked with red 'Out of Stock' text indicator",
        "caption": "رفوفك دايماً مليانة بضاعة! 🥫 فيكسورا بتراقب رفوف السوبرماركت والمحلات وتنبه الموظفين لو بضاعة معينة خلصت لإعادة ملئها لعدم خسارة أي بيعة."
    },
    {
        "day": 26,
        "topic": "أمان وحماية محطات الوقود والخدمة",
        "prompt": "Gas station at night, camera scanning license plates of cars at pump station, security overlays",
        "caption": "سلامة تامة لمحطات البنزين ⛽ فيكسورا بتراقب بوابات ومضخات البنزين وترصد أي تدخين أو مخاطر اشتعال وتتعرف على لوحات العربيات الهاربة بدون دفع."
    },
    {
        "day": 27,
        "topic": "تحليل تفاعل العملاء مع المنتجات المعروضة",
        "prompt": "Cosmetics store display counter, camera tracking shopper hands picking up products, displaying digital score logs",
        "caption": "اعرف إيه اللي بيعجب عميلك! 💄 فيكسورا بتقيس عدد المرات اللي العملاء بيمسكوا فيها منتج معين من على الرف، عشان تعرف مدى نجاح حملاتك التسويقية."
    },
    {
        "day": 28,
        "topic": "تأمين صالات الجيم ومراكز اللياقة",
        "prompt": "Modern luxury gym space with a security camera overlay checking capacity and active machines, safety checks",
        "caption": "إدارة ذكية للجيم والأندية 🏋️‍♂️ تابع الكثافة وعدد المشتركين داخل الصالة، وأمن الخزائن وممرات الدخول لمنع أي سرقات أو دخول غير مصرح."
    },
    {
        "day": 29,
        "topic": "حماية وتأمين محلات المجوهرات الثمينة",
        "prompt": "A luxury jewelry shop counter, camera tracking glass cases with a red virtual fence alert overlay triggered",
        "caption": "أقصى تأمين للذهب والمجوهرات 💎 فيكسورا بتراقب صالات معارض المجوهرات بدقة عالية وترصد أي حركة غريبة قريبة من الواجهات الثمينة وتنبّه الشرطة والأمن."
    },
    {
        "day": 30,
        "topic": "رصد دخول المناطق المحظورة بالشركات",
        "prompt": "Company secure door with red sign 'Authorized Personnel Only'. Camera drawing red target box on a person entering door",
        "caption": "حماية سرية البيانات والملفات 🔒 امنع الموظفين أو الغرباء من دخول الغرف المحظورة والأرشيف، واعرف فوراً بالدقيقة لو حد حاول يتجاوز الباب."
    }
]

print("Downloading 30 unique images for Vexora B2B Video Security...")

def download_image(post):
    day = post["day"]
    prompt = post["prompt"]
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=800&height=800&nologo=true&private=true"
    dest_path = os.path.join(assets_dir, f"vexora_day_{day}.jpg")
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
        print(f"Vexora Day {day} (Exists)")
        return
        
    time.sleep((day % 6) * 0.2)
    backoff = 2.0
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=12) as response:
                with open(dest_path, "wb") as f:
                    f.write(response.read())
            print(f"Vexora Day {day} -> Success")
            return
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(backoff)
                backoff *= 2.0
            else:
                break
        except Exception:
            time.sleep(1.0)
            
    # Fallback
    fallback_url = f"https://loremflickr.com/800/800/cctv,security?lock={day+500}"
    try:
        req = urllib.request.Request(fallback_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(dest_path, "wb") as f:
                f.write(response.read())
        print(f"Vexora Day {day} -> Fallback Success")
    except Exception as e:
        print(f"Vexora Day {day} -> Fail: {e}")

with ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(download_image, vexora_posts)

# Compile HTML
html_cards = []
for p in vexora_posts:
    p['caption'] += "\n\n🌐 لمعرفة المزيد، زوروا موقعنا: vexorame.com"
    card_html = f"""
    <div class="card">
        <div class="card-header">
            <h3>📅 اليوم {p['day']} | فيكسورا (Vexora - ذكاء اصطناعي أمني)</h3>
            <span class="platform-tag">لينكد إن + فيسبوك</span>
        </div>
        <div class="card-body">
            <p><strong>الموضوع الأساسي:</strong> {p['topic']}</p>
            
            <div class="post-image-container">
                <img src="assets/vexora_day_{p['day']}.jpg" alt="Creative for {p['topic']}" class="post-creative-img">
            </div>

            <div class="caption-box">
                <strong>✍️ النص الإعلاني (Caption) - جاهز للنسخ:</strong>
                <div class="copy-text" id="text-day-{p['day']}">{p['caption']}</div>
                <button class="copy-btn-caption" onclick="copyText('text-day-{p['day']}')">نسخ الكابشن 📋</button>
            </div>
            <div class="hashtags">#فيكسورا #ذكاء_اصطناعي #أمن_شركات #كاميرات_مراقبة #تأمين #مصر</div>
        </div>
    </div>
    """
    html_cards.append(card_html)

cards_joined = "\n".join(html_cards)

html_template = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>خطة محتوى السوشيال ميديا لـ 30 يوماً بالصور | شركة فيكسورا</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-primary: #0b0f19;
            --bg-secondary: #111827;
            --text-primary: #f5f5f7;
            --text-secondary: #9ca3af;
            --accent-color: #22d3ee;
            --accent-hover: #0891b2;
            --border-color: rgba(255, 255, 255, 0.08);
            --card-bg: rgba(255, 255, 255, 0.02);
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            background-color: var(--bg-primary);
            color: var(--text-primary);
            font-family: 'Cairo', sans-serif;
            padding: 40px 20px;
            line-height: 1.6;
        }}
        .container {{ max-width: 900px; margin: 0 auto; }}
        header {{
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid var(--border-color);
        }}
        header h1 {{ font-size: 30px; font-weight: 800; margin-bottom: 12px; color: #ffffff; }}
        header p {{ color: var(--text-secondary); font-size: 15px; }}
        .print-btn {{
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            padding: 12px 28px;
            border-radius: 99px;
            font-weight: 700;
            font-size: 14px;
            margin-top: 20px;
            cursor: pointer;
            border: none;
            transition: background 0.2s;
        }}
        .print-btn:hover {{ background-color: #059669; }}
        .card {{
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
            backdrop-filter: blur(12px);
            page-break-inside: avoid;
        }}
        .card-header {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--border-color);
        }}
        .card-header h3 {{ font-size: 18px; font-weight: 700; color: #ffffff; }}
        .platform-tag {{
            background: rgba(34, 211, 238, 0.1);
            color: var(--accent-color);
            border: 1px solid rgba(34, 211, 238, 0.2);
            padding: 4px 12px;
            border-radius: 99px;
            font-size: 11px;
            font-weight: 700;
        }}
        .post-image-container {{
            width: 100%;
            max-width: 420px;
            margin: 16px 0;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
        }}
        .post-creative-img {{ width: 100%; display: block; object-fit: cover; }}
        .caption-box {{
            background: rgba(255, 255, 255, 0.03);
            border-right: 4px solid var(--accent-color);
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 16px;
        }}
        .caption-box strong {{ display: block; font-size: 13px; color: #ffffff; margin-bottom: 8px; }}
        .copy-text {{ font-size: 13.5px; white-space: pre-wrap; color: #e5e7eb; margin-bottom: 8px; }}
        .copy-btn-caption {{
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 4px 10px;
            font-size: 11px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .copy-btn-caption:hover {{ background: rgba(255, 255, 255, 0.15); border-color: rgba(255, 255, 255, 0.3); }}
        .hashtags {{ font-size: 12px; color: #10b981; font-weight: 600; }}
        
        @media print {{
            body {{ background-color: #ffffff !important; color: #000000 !important; padding: 0 !important; }}
            .container {{ max-width: 100% !important; }}
            .print-btn, .copy-btn-caption {{ display: none !important; }}
            .card {{
                background: none !important;
                border: 1px solid #e5e7eb !important;
                color: #000000 !important;
                box-shadow: none !important;
                page-break-inside: avoid;
            }}
            .card-header h3 {{ color: #000000 !important; }}
            .platform-tag {{ border: 1px solid #cbd5e1 !important; color: #0f172a !important; background: none !important; }}
            .post-image-container {{ max-width: 300px !important; border: 1px solid #cbd5e1 !important; }}
            .caption-box {{ border-right: 4px solid #22d3ee !important; background: #f8fafc !important; }}
            .caption-box strong {{ color: #000000 !important; }}
            .copy-text {{ color: #1f2937 !important; }}
            .hashtags {{ color: #047857 !important; }}
        }}
    </style>
    <script>
        function copyText(elementId) {{
            var textElement = document.getElementById(elementId);
            var range = document.createRange();
            range.selectNode(textElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            try {{
                document.execCommand('copy');
                alert('تم النسخ بنجاح! 📋');
            }} catch (err) {{
                alert('فشل النسخ تلقائياً، يرجى النسخ يدوياً.');
            }}
            window.getSelection().removeAllRanges();
        }}
    </script>
</head>
<body>
    <div class="container">
        <header>
            <h1>📅 خطة محتوى السوشيال ميديا لـ 30 يوماً | شركة فيكسورا (Vexora)</h1>
            <p>خطة تسويقية مصورة ومكتوبة بالكامل وموجهة للشركات والأعمال (B2B AI Camera Security) في مصر.</p>
            <button class="print-btn" onclick="window.print()">🖨️ حفظ كملف PDF / طباعة الخطة</button>
        </header>
        <main>
            {cards_joined}
        </main>
    </div>
</body>
</html>
"""

with open(output_html, "w", encoding="utf-8") as f:
    f.write(html_template)

# Copy to brain dir
brain_dst = os.path.join(brain_dir, "vexora_content_calendar.html")
with open(brain_dst, "w", encoding="utf-8") as f:
    f.write(html_template)

# Build MD file
md_cards = []
for p in vexora_posts:
    md_cards.append(f"""## 📅 اليوم {p['day']} | فيكسورا (Vexora AI Security)
*   **المنصة المفضلة:** لينكد إن + فيسبوك
*   **الموضوع الأساسي:** {p['topic']}
*   **التصميم المولد:** ![صورة الإعلان](assets/vexora_day_{p['day']}.jpg)
*   **النص الإعلاني / الكابشن (Copy):**
    {p['caption']}
*   **الهاشتاجات الموصى بها:** #فيكسورا #ذكاء_اصطناعي #أمن_شركات #كاميرات_مراقبة #مصر
---
""")

final_md = f"""# 📅 خطة محتوى السوشيال ميديا لشركة فيكسورا (ذكاء اصطناعي أمني) لمدة شهر (30 يوماً بالصور)

---
""" + "\n".join(md_cards)

with open(output_md, "w", encoding="utf-8") as f:
    f.write(final_md)

print("Vexora 30-day content calendar generated and downloaded successfully!")
