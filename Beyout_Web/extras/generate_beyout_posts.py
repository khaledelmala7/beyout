import os
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

# Paths
brain_dir = r"C:\Users\kga\.gemini\antigravity\brain\7be42dd2-84a4-4639-b62f-1450137a1db5"
assets_dir = r"d:\Ai\social\assets"
output_html = r"d:\Ai\social\beyout_content_calendar.html"
output_md = r"d:\Ai\social\beyout_content_calendar.md"

if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)

# Define 30 unique Beyout Smart Home posts (B2C)
beyout_posts = [
    {
        "day": 1,
        "topic": "توفير استهلاك التكييف الذكي",
        "prompt": "Modern smart home AC thermostat panel on a dark luxury wall, gold accents, energy saving, 30 percent discount, high-end design",
        "caption": "التكييف شغال طول الصيف وفاتورة الكهرباء صدمة؟ 💸 مع نظام بيوت الذكي، التكييف بيعدل حرارته تلقائياً حسب الجو الخارجي وحركتك في الأوضة عشان يوفرلك لحد 30% من استهلاك الكهرباء!"
    },
    {
        "day": 2,
        "topic": "التحكم بلمسة واحدة من السرير",
        "prompt": "Cozy luxury bedroom at night, warm gold lighting, smart bedside glass touch switch with glowing icons, cinematic photography",
        "caption": "مكسل تقوم من السرير تطفي النور؟ 🛌 مع أنظمة بيوت الذكية، تقدر تطفي وتتحكم في كل أجهزة وإضاءة البيت بلمسة واحدة من موبايلك أو مفتاحك الزجاجي جنب السرير."
    },
    {
        "day": 3,
        "topic": "مستشعر تسريب الغاز الذكي",
        "prompt": "Sleek gas leak detector mounted in a high-end luxury kitchen, digital valve shutting off automatically, safety system check",
        "caption": "الأمان أولاً! 🔐 مستشعر الغاز الذكي من بيوت مش بس بينبهك لو حصل تسريب، ده بيقفل محبس الغاز الرئيسي تلقائياً ويبعتلك إشعار عاجل على موبايلك لإنقاذ الموقف."
    },
    {
        "day": 4,
        "topic": "إضاءة الممرات التلقائية ليلاً",
        "prompt": "Elegant villa hallway corridor at night, floor LED lights turning on automatically, warm soft golden glow, inviting luxury home",
        "caption": "بتصحى بالليل والظلام بيضايقك؟ 🚶‍♂️ مع بيوت، مستشعرات الحركة الذكية بتنور ممرات البيت بالإضاءة الهادئة تلقائياً بمجرد حركتك، وبتطفي بعدها عشان توفر الطاقة."
    },
    {
        "day": 5,
        "topic": "فتح بوابة الفيلا بالهاتف",
        "prompt": "Luxury automated smart entrance gate of a modern villa opening, glowing warm lights, evening mood, smart home key app overlay",
        "caption": "ليه تنزل من العربية تفتح البوابة؟ 🚗 بلمسة واحدة من شاشة موبايلك، بوابة الفيلا بتفتح لوحدها بمجرد اقترابك، وترجع تقفل لتأمين البيت."
    },
    {
        "day": 6,
        "topic": "وضع السينما المنزلية (Cinema Mode)",
        "prompt": "Luxury home cinema theater room with blue ambient LED lighting, large screen showing movie, electric curtains sliding closed",
        "caption": "حول صالتك لسينما حقيقية! 🍿🎬 بضغطة زر واحدة على موبايلك من بيوت، الستائر بتتقفل، الإضاءة بتهدأ وتتحول لألوان دافئة، والساوند سيستم بيشتغل تلقائياً لعرض فيلمك المفضّل."
    },
    {
        "day": 7,
        "topic": "مستشعر تسريب المياه والفيضان",
        "prompt": "Modern bathroom marble floor, a compact smart water leak detector sensor, automatic check, clean high-end plumbing hardware",
        "caption": "احمِ بيتك من الغرق وتلف الأثاث! 💧 مستشعر المياه الذكي من بيوت بيكتشف أي تسريب تحت الغسالة أو في الحمام وبيقفل المحبس الرئيسي للبيت فوراً مع تنبيهك."
    },
    {
        "day": 8,
        "topic": "أتمتة الستائر الذكية مع الشمس",
        "prompt": "Modern penthouse tall glass windows, motorized white sheer curtains opening to let in bright morning sunlight, warm rays",
        "caption": "اصحى على نور ربنا الطبيعي ☀️ الستائر الذكية من بيوت بتفتح تلقائياً مع شروق الشمس عشان تصحيك بهدوء، وتقفل بالليل لحفظ الخصوصية بدون أي تدخل منك."
    },
    {
        "day": 9,
        "topic": "وضع السفر ومحاكاة الوجود",
        "prompt": "A modern smart villa exterior at night, lights in different rooms turning on randomly to simulate occupancy, safe neighborhood",
        "caption": "مسافر ومش عايز حد يحس بغيابك؟ ✈️🔒 وضع السفر الذكي من بيوت بيقوم بتشغيل وإطفاء أنوار غرف مختلفة بشكل عشوائي عشان يبان إن البيت فيه حركة ويحمي فيلتك من اللصوص."
    },
    {
        "day": 10,
        "topic": "التحكم في فيلتك وأنت مسافر برا مصر",
        "prompt": "A hand holding a smartphone showing a smart home green control dashboard, set against an airplane window flying over clouds",
        "caption": "بيتك تحت عينك من أي مكان في العالم! 🌍 حتى لو كنت مسافر خارج مصر، تقدر تطمن على فيلتك مع تطبيق بيوت الذكي، وتتحكم في ري الحديقة بضغطة زر."
    },
    {
        "day": 11,
        "topic": "نظام ري الحديقة الذكي",
        "prompt": "Lush green backyard landscape of a villa, automated lawn sprinklers spraying water mist, soil humidity sensor system, sunset",
        "caption": "وفر مياه وحافظ على حديقتك! 🌿 رشاشات المياه الذكية بتشتغل تلقائياً في المواعيد المحددة وبتفصل لوحدها لو التربة رطبة أو الجو ممطر عشان توفر المياه."
    },
    {
        "day": 12,
        "topic": "المفاتيح الزجاجية الذكية الفاخرة",
        "prompt": "Close-up of a sleek glass touch smart home light switch on a luxury gray marble wall, glowing blue icons, luxury design",
        "caption": "وداعاً للمفاتيح البلاستيكية القديمة! 💎 ارتقِ بديكور بيتك مع مفاتيح بيوت الزجاجية التي تعمل باللمس، وتتميز بتصميم زجاجي فاخر وإضاءة خافتة لتسهيل العثور عليها بالظلام."
    },
    {
        "day": 13,
        "topic": "تأمين غرف الأطفال والتحكم بالإضاءة",
        "prompt": "A warm cozy kids bedroom, study desk with lamp glowing white light for concentration, modern Scandinavian interior",
        "caption": "سهل على أولادك المذاكرة والنوم 📚 في وقت الدراسة، نظام بيوت بيظبط إضاءة غرفة الأطفال للون الأبيض المحفز للتركيز، ومع وقت النوم بتتحول لإضاءة دافئة هادئة."
    },
    {
        "day": 14,
        "topic": "رعاية كبار السن وحركة البيت",
        "prompt": "Warm luxury living room with elderly couple relaxing, discreet smart ceiling motion sensors with glowing indicators, care home",
        "caption": "اطمن على والديك طول الوقت 👴🧓 نظام بيوت بيكتشف لو مفيش أي حركة في البيت لفترة طويلة ويبعتلك تنبيه فوراً عشان تتصل بيهم وتتأكد إنهم بخير."
    },
    {
        "day": 15,
        "topic": "سيناريو وضع الترحيب (Welcome Home)",
        "prompt": "Entering a modern smart home doorway, warm lights turning on automatically, comfortable clean luxury interior vibe",
        "caption": "بيتك بيرحب بيك بطريقتك! 👋 بمجرد وصولك وفتح قفل الباب، بيشغل نظام بيوت وضع الترحيب: التكييف بيظبط الجو، الإضاءة بتنور، والموسيقى الهادئة بتشتغل تلقائياً."
    },
    {
        "day": 16,
        "topic": "توفير 30% من فواتير الكهرباء",
        "prompt": "A modern digital power meter showing low consumption green leaf icon, next to a sleek smart home display, high savings",
        "caption": "المنزل الذكي مش مجرد رفاهية.. هو استثمار بيوفرلك فلوسك! 💰 الحساسات الذكية من بيوت بتضمن إن مفيش لمبة أو تكييف يفضل شغال في مكان مفيش فيه حد."
    },
    {
        "day": 17,
        "topic": "التحكم في سخانات المياه الذكية",
        "prompt": "Luxury modern bathroom with smart control panel displaying hot water temperature schedule, steam, elegant design",
        "caption": "مياه دافئة جاهزة في وقتك المحدد 🛁 تقدر تظبط سخان المياه يشتغل قبل ما تصحى بنصف ساعة ويقفل لوحده عشان يوفر استهلاك الكهرباء ويكون جاهز دايماً."
    },
    {
        "day": 18,
        "topic": "قفل البوابة الذكي بالبصمة",
        "prompt": "Finger touching a sleek black biometric smart lock scanner on a massive wooden villa entrance door, glowing blue ring",
        "caption": "وداعاً لمشكلة ضياع المفاتيح! 🔑 افتح باب بيتك ببصمة صباعك، أو كود سري، أو من موبايلك، واعرف مين دخل البيت ووقت دخوله بالدقيقة مع أنظمة بيوت."
    },
    {
        "day": 19,
        "topic": "التحكم في الإضاءة الخارجية والديكور",
        "prompt": "Modern luxury villa exterior facade at night, architectural outdoor spot lighting on trees and pool area, high contrast",
        "caption": "برز جمال فيلتك بالليل! ✨ تحكّم في إضاءة اللاندسكيب والواجهة الخارجية بلمسة واحدة، أو اظبطها تنور تدريجياً أول ما الشمس تغيب وتطفي الصبح."
    },
    {
        "day": 20,
        "topic": "التحكم في فيلتك بدون تكسير حوائط",
        "prompt": "Hands holding a wireless Zigbee smart relay module next to a clean wall switch back box, simple smart upgrade concept",
        "caption": "تشطيب بيتك خلص وخايف من التكسير? 🛠️ أنظمة بيوت اللاسلكية بتركب مكان المفاتيح القديمة بدون أي تكسير في الحوائط أو تغيير في الديكور الحالي."
    },
    {
        "day": 21,
        "topic": "سيناريو الحفلات والضيوف",
        "prompt": "Modern spacious living room setup for a social gathering, dynamic colorful ambient party lights, sleek audio system",
        "caption": "استقبل ضيوفك بأجواء مبهرة! 🎉 وضع الحفلة من بيوت بيغير ألوان الإضاءة في الصالون لإضاءة ديناميكية تفاعلية وبيشغل الساوند سيستم ليناسب التجمعات العائلية."
    },
    {
        "day": 22,
        "topic": "أتمتة تهوية الجراج وسحب العوادم",
        "prompt": "Luxury modern garage with exhaust fans turning on automatically, green carbon monoxide detector level safe status",
        "caption": "جراج خالي من عوادم السيارات! 🚗 بمجرد دخول سيارتك الجراج، مستشعرات بيوت الذكية بتشغل الشفاطات تلقائياً لسحب العوادم وتأمين تنفسك."
    },
    {
        "day": 23,
        "topic": "التحكم الذكي في الروف والبرجولات",
        "prompt": "Rooftop deck with smart pergola shutters closing automatically under a dark rain cloud, luxury cozy terrace",
        "caption": "استمتع بالروف في كل الفصول! 🌦️ البرجولة الذكية بتقفل لوحدها بمجرد رصد مستشعرات المطر لأي قطرات مياه، وتفتح في الجو المشمس لتستمتع بالهواء."
    },
    {
        "day": 24,
        "topic": "التوافق مع براندات الأجهزة العالمية",
        "prompt": "Smart home hub screen displaying seamless integration with Apple Siri, Amazon Alexa, and Google Assistant logos working",
        "caption": "تحكم مرن يجمع أجهزتك المفضلة! 📱 نظام بيوت متوافق بالكامل مع كل الأنظمة العالمية (Apple, Google, Amazon) لتتحكم في بيتك بالطريقة اللي تريحك."
    },
    {
        "day": 25,
        "topic": "مراقبة الأطفال داخل فيلتك",
        "prompt": "A modern smart tablet in a kitchen showing camera feed of happy children playing in their room, safety metrics",
        "caption": "أولادك تحت عينك وفي أمان 👶 تقدر تشوف غرف ألعاب الأطفال وتطمن عليهم وهم بيلعبوا من شاشة مطبخك أو من موبايلك وأنت شغال في مكتبك."
    },
    {
        "day": 26,
        "topic": "توفير مياه المسبح والفلترة الذكية",
        "prompt": "Modern smart villa pool with automated clean water pump running, blue glowing lights at night, smart automation checks",
        "caption": "مسبح نظيف وموفر 🏊‍♂️ تحكم في مواعيد فلترة وتنظيف حمام السباحة أوتوماتيكياً في أوقات التعرفة المنخفضة للكهرباء ووفر تكاليف الصيانة اليومية."
    },
    {
        "day": 27,
        "topic": "جلسة فحص وتخطيط سمارت هوم مجانية",
        "prompt": "Smart home architect discussing villa automation layout plans with a happy client, high-end office meeting, blueprints",
        "caption": "بنصمم بيتك الذكي حسب احتياجك وميزانيتك! 📐 تواصل مع مهندسي بيوت دلوقتي واحصل على استشارة ومخطط ذكي مجاني لتشطيب فيلتك أو شقتك."
    },
    {
        "day": 28,
        "topic": "الضمان الشامل وخدمة ما بعد البيع لمدة 5 سنوات",
        "prompt": "Sleek warranty certificate document with gold stamp showing '5 Years Warranty' text on a clean modern desk setup",
        "caption": "استثمارك آمن ومضمون! 🛡️ كل مشاريع وأنظمة بيوت بتشمل ضمان شامل وحقيقي لمدة 5 سنوات على الأجهزة والتركيبات، مع خدمة دعم فني وصيانة سريعة."
    },
    {
        "day": 29,
        "topic": "التحكم الذكي في الستائر والأبواب الكهربائية",
        "prompt": "Modern living room, motor sliding curtains, sunrays shining through high windows, luxurious interior",
        "caption": "الرفاهية تبدأ بالتفاصيل! الستائر بتفتح تلقائياً عشان تدخّل نور الشمس لبيتك، وبتقفل بالليل عشان الخصوصية والأمان التام بلمسة واحدة."
    },
    {
        "day": 30,
        "topic": "زيادة قيمة العقار وتجهيز المستقبل",
        "prompt": "Beautiful smart home facade under blue sky with real estate evaluation value overlay checkmark, high value investment",
        "caption": "المنزل الذكي استثمار للمستقبل! 📈 الفلل المجهزة بأنظمة بيوت الذكية الكاملة بتتباع بأسعار أعلى وبتجذب المشترين أسرع لأنها جاهزة للمستقبل."
    }
]

print("Downloading 30 unique images for Beyout Smart Home...")

def download_image(post):
    day = post["day"]
    prompt = post["prompt"]
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=800&height=800&nologo=true&private=true"
    dest_path = os.path.join(assets_dir, f"beyout_day_{day}.jpg")
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
        print(f"Beyout Day {day} (Exists)")
        return
        
    time.sleep((day % 6) * 0.2)
    backoff = 2.0
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=12) as response:
                with open(dest_path, "wb") as f:
                    f.write(response.read())
            print(f"Beyout Day {day} -> Success")
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
    fallback_url = f"https://loremflickr.com/800/800/smarthome,modern?lock={day+200}"
    try:
        req = urllib.request.Request(fallback_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(dest_path, "wb") as f:
                f.write(response.read())
        print(f"Beyout Day {day} -> Fallback Success")
    except Exception as e:
        print(f"Beyout Day {day} -> Fail: {e}")

with ThreadPoolExecutor(max_workers=10) as executor:
    executor.map(download_image, beyout_posts)

# Compile HTML
html_cards = []
for p in beyout_posts:
    card_html = f"""
    <div class="card">
        <div class="card-header">
            <h3>📅 اليوم {p['day']} | بيوت (Beyout - سمارت هوم)</h3>
            <span class="platform-tag">فيسبوك + انستقرام + تيك توك</span>
        </div>
        <div class="card-body">
            <p><strong>الموضوع الأساسي:</strong> {p['topic']}</p>
            
            <div class="post-image-container">
                <img src="assets/beyout_day_{p['day']}.jpg" alt="Creative for {p['topic']}" class="post-creative-img">
            </div>

            <div class="caption-box">
                <strong>✍️ النص الإعلاني (Caption) - جاهز للنسخ:</strong>
                <div class="copy-text" id="text-day-{p['day']}">{p['caption']}</div>
                <button class="copy-btn-caption" onclick="copyText('text-day-{p['day']}')">نسخ الكابشن 📋</button>
            </div>
            <div class="hashtags">#بيوت #سمارت_هوم #منزل_ذكي #تكنولوجيا #مصر</div>
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
    <title>خطة محتوى السوشيال ميديا لـ 30 يوماً بالصور | شركة بيوت</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-primary: #0b0f19;
            --bg-secondary: #111827;
            --text-primary: #f5f5f7;
            --text-secondary: #9ca3af;
            --accent-color: #f59e0b;
            --accent-hover: #d97706;
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
            background: rgba(245, 158, 11, 0.1);
            color: var(--accent-color);
            border: 1px solid rgba(245, 158, 11, 0.2);
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
            .caption-box {{ border-right: 4px solid #f59e0b !important; background: #f8fafc !important; }}
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
            <h1>📅 خطة محتوى السوشيال ميديا لـ 30 يوماً | شركة بيوت (Beyout)</h1>
            <p>خطة تسويقية مصورة ومكتوبة بالكامل وموجهة للأفراد (B2C Smart Home) في مصر.</p>
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
brain_dst = os.path.join(brain_dir, "beyout_content_calendar.html")
with open(brain_dst, "w", encoding="utf-8") as f:
    f.write(html_template)

# Build MD file
md_cards = []
for p in beyout_posts:
    md_cards.append(f"""## 📅 اليوم {p['day']} | بيوت (Beyout Smart Home)
*   **المنصة المفضلة:** فيسبوك + انستجرام + تيك توك
*   **الموضوع الأساسي:** {p['topic']}
*   **التصميم المولد:** ![صورة الإعلان](assets/beyout_day_{p['day']}.jpg)
*   **النص الإعلاني / الكابشن (Copy):**
    {p['caption']}
*   **الهاشتاجات الموصى بها:** #بيوت #سمارت_هوم #منزل_ذكي #تكنولوجيا #مصر
---
""")

final_md = f"""# 📅 خطة محتوى السوشيال ميديا لشركة بيوت (سمارت هوم) لمدة شهر (30 يوماً بالصور)

---
""" + "\n".join(md_cards)

with open(output_md, "w", encoding="utf-8") as f:
    f.write(final_md)

print("Beyout 30-day content calendar generated and downloaded successfully!")
