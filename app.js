// Beyout Smart Home Application Logic
const TELEGRAM_CHAT_ID = '8641170921';
const TELEGRAM_BOT_TOKEN = '8811745328:AAFC-kFEk2jChMzCEYyg2lMyzUa4lFn7BUQ';
let currentLanguage = 'ar';
let currentFormStep = 1;
let selectedFormProduct = 'lumora';
let acTemperature = 22;

// DOMContentLoaded Initializations
document.addEventListener('DOMContentLoaded', () => {
    selectedFormProduct = 'lumora';

    const dateInput = document.getElementById('demo_date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // Set initial language translations
    setLanguage(currentLanguage);
    updateProgressBar();
});

// Interactive Simulator functions
let heroLightOn = true;
let heroSprinklerOn = false;

function toggleMockLight() {
    heroLightOn = !heroLightOn;
    const roomNode = document.getElementById('hero-living-room');
    const statusText = document.getElementById('hero-light-status');
    const btnLight = document.getElementById('btn-hero-light');
    
    if (roomNode && statusText && btnLight) {
        if (heroLightOn) {
            roomNode.classList.add('glowing');
            statusText.textContent = (currentLanguage === 'ar') ? 'نشطة' : 'Active';
            btnLight.classList.add('active');
        } else {
            roomNode.classList.remove('glowing');
            statusText.textContent = (currentLanguage === 'ar') ? 'منطفئة' : 'Off';
            btnLight.classList.remove('active');
        }
    }
}

function toggleMockSprinkler() {
    heroSprinklerOn = !heroSprinklerOn;
    const roomNode = document.getElementById('hero-garden');
    const statusText = document.getElementById('hero-sprinkler-status');
    const btnSprinkler = document.getElementById('btn-hero-sprinkler');
    
    if (roomNode && statusText && btnSprinkler) {
        if (heroSprinklerOn) {
            roomNode.classList.add('active-sprinkler');
            statusText.textContent = (currentLanguage === 'ar') ? 'نشطة' : 'Active';
            btnSprinkler.classList.add('active-sprinkler');
        } else {
            roomNode.classList.remove('active-sprinkler');
            statusText.textContent = (currentLanguage === 'ar') ? 'منطفئة' : 'Off';
            btnSprinkler.classList.remove('active-sprinkler');
        }
    }
}

// Sandbox Simulator
function updateHouseSim() {
    const chkLight = document.getElementById('chk-living-light');
    const chkKitchen = document.getElementById('chk-kitchen-light');
    const chkAc = document.getElementById('chk-bedroom-ac');
    const chkSec = document.getElementById('chk-security-system');
    
    const glowLiving = document.getElementById('glow-living');
    const glowKitchen = document.getElementById('glow-kitchen');
    const glowBedroom = document.getElementById('glow-bedroom');
    const glowAcBedroom = document.getElementById('ac-glow-bedroom');
    const lampLightSvg = document.getElementById('svg-lamp-light');
    const lockBodySvg = document.getElementById('lock-body');
    const lockShackleSvg = document.getElementById('lock-shackle');
    const lockText = document.getElementById('lock-text');
    const feedbackMsg = document.getElementById('sim-feedback-lumora');
    
    let actions = [];

    if (chkLight) {
        if (chkLight.checked) {
            if (glowLiving) glowLiving.style.display = 'block';
            if (lampLightSvg) lampLightSvg.style.display = 'block';
            actions.push(currentLanguage === 'ar' ? 'إضاءة المعيشة' : 'Living light');
        } else {
            if (glowLiving) glowLiving.style.display = 'none';
            if (lampLightSvg) lampLightSvg.style.display = 'none';
        }
    }
    
    if (chkKitchen) {
        if (chkKitchen.checked) {
            if (glowKitchen) glowKitchen.style.display = 'block';
            actions.push(currentLanguage === 'ar' ? 'إضاءة المطبخ' : 'Kitchen light');
        } else {
            if (glowKitchen) glowKitchen.style.display = 'none';
        }
    }
    
    const acTempWrapper = document.getElementById('ac-temp-wrapper');
    if (chkAc) {
        if (chkAc.checked) {
            if (glowBedroom) glowBedroom.style.display = 'block';
            if (glowAcBedroom) glowAcBedroom.style.display = 'block';
            if (acTempWrapper) acTempWrapper.style.display = 'flex';
            actions.push(currentLanguage === 'ar' ? `التكييف (${acTemperature}°م)` : `AC (${acTemperature}°C)`);
        } else {
            if (glowBedroom) glowBedroom.style.display = 'none';
            if (glowAcBedroom) glowAcBedroom.style.display = 'none';
            if (acTempWrapper) acTempWrapper.style.display = 'none';
        }
    }
    
    if (chkSec) {
        if (chkSec.checked) {
            if (lockBodySvg) lockBodySvg.setAttribute('fill', '#10b981');
            if (lockShackleSvg) lockShackleSvg.setAttribute('stroke', '#10b981');
            if (lockText) {
                lockText.textContent = currentLanguage === 'ar' ? 'مغلقة ومؤمنة' : 'Locked & Secured';
                lockText.className = 'text-success';
            }
        } else {
            if (lockBodySvg) lockBodySvg.setAttribute('fill', '#ff453a');
            if (lockShackleSvg) lockShackleSvg.setAttribute('stroke', '#ff453a');
            if (lockText) {
                lockText.textContent = currentLanguage === 'ar' ? 'ملغية التأمين - الحديقة نشطة!' : 'Unlocked - Garden Active!';
                lockText.className = 'text-danger';
            }
            actions.push(currentLanguage === 'ar' ? 'إنذار الأمان' : 'Security alarm');
        }
    }
    
    if (feedbackMsg) {
        if (actions.length > 0) {
            feedbackMsg.textContent = (currentLanguage === 'ar') ? `الأنظمة النشطة حالياً: ${actions.join('، ')}` : `Active systems: ${actions.join(', ')}`;
        } else {
            feedbackMsg.textContent = (currentLanguage === 'ar') ? 'تم إطفاء جميع الأجهزة لتوفير الطاقة.' : 'All devices turned off to save energy.';
        }
    }
}

function changeAcTemp(offset) {
    acTemperature += offset;
    if (acTemperature < 16) acTemperature = 16;
    if (acTemperature > 30) acTemperature = 30;
    
    const tempNum = document.getElementById('ac-temp-num');
    if (tempNum) tempNum.textContent = acTemperature;
    updateHouseSim();
}

// Package Selection
function selectPackage(packageName) {
    const notesField = document.getElementById('cust_notes');
    if (notesField) {
        notesField.value = `أريد الاستفسار وحجز الباقة الذكية: ${packageName}`;
    }
    
    // Go to step 2 of form directly to register details
    nextStep(2);
    
    // Scroll smoothly to form section
    const demoSection = document.getElementById('demo-section');
    if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
}

// Form steps
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const nodes = document.querySelectorAll('.step-node');
    if (!progressBar) return;
    
    const percentage = ((currentFormStep - 1) / 3) * 100;
    progressBar.style.width = `calc(${percentage}% * 0.75 + 12.5%)`;
    
    nodes.forEach((node, index) => {
        const stepNum = index + 1;
        if (stepNum < currentFormStep) {
            node.className = 'step-node completed';
        } else if (stepNum === currentFormStep) {
            node.className = 'step-node active';
        } else {
            node.className = 'step-node';
        }
    });
}

function validateCurrentStep() {
    if (currentFormStep === 1) {
        return true;
    }
    
    if (currentFormStep === 2) {
        const nameInput = document.getElementById('cust_name');
        const emailInput = document.getElementById('cust_email');
        const phoneInput = document.getElementById('cust_phone');
        
        if (!nameInput || !emailInput || !phoneInput) return false;
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (!name || !email || !phone) {
            alert((currentLanguage === 'ar') ? 'الرجاء تعبئة جميع الحقول المطلوبة المميزة بـ (*).' : 'Please fill all required fields marked with (*).');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert((currentLanguage === 'ar') ? 'الرجاء إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.');
            return false;
        }
        
        return true;
    }
    
    if (currentFormStep === 3) {
        const dateInput = document.getElementById('demo_date');
        const timeSelect = document.getElementById('demo_time');
        
        if (!dateInput || !timeSelect) return false;
        
        const dateVal = dateInput.value;
        const timeVal = timeSelect.value;
        
        if (!dateVal || !timeVal) {
            alert((currentLanguage === 'ar') ? 'الرجاء اختيار تاريخ ووقت حجز الديمو.' : 'Please select a date and time for the demo booking.');
            return false;
        }
        return true;
    }
    return true;
}

function nextStep(stepNum) {
    if (!validateCurrentStep()) return;
    
    const activeStep = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (activeStep) activeStep.classList.remove('active');
    
    currentFormStep = stepNum;
    const nextStepEl = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (nextStepEl) nextStepEl.classList.add('active');
    
    updateProgressBar();
}

function prevStep(stepNum) {
    const activeStep = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (activeStep) activeStep.classList.remove('active');
    
    currentFormStep = stepNum;
    const prevStepEl = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (prevStepEl) prevStepEl.classList.add('active');
    
    updateProgressBar();
}

function handleFormSubmit(event) {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    
    const name = document.getElementById('cust_name').value.trim();
    const phone = document.getElementById('cust_phone').value.trim();
    const dateVal = document.getElementById('demo_date').value;
    const timeVal = document.getElementById('demo_time').value;
    
    // Set values in success screen
    document.getElementById('success-user-name').textContent = name;
    document.getElementById('success-date').textContent = dateVal;
    document.getElementById('success-phone').textContent = phone;
    
    let timeLabel = timeVal;
    if (timeVal === 'morning') timeLabel = (currentLanguage === 'ar') ? 'الصباحية' : 'Morning';
    if (timeVal === 'afternoon') timeLabel = (currentLanguage === 'ar') ? 'بعد الظهر' : 'Afternoon';
    if (timeVal === 'evening') timeLabel = (currentLanguage === 'ar') ? 'المسائية' : 'Evening';
    document.getElementById('success-time').textContent = timeLabel;
    
    // Save locally
    const leadData = {
        name,
        email: document.getElementById('cust_email').value.trim(),
        phone,
        product: 'lumora',
        date: dateVal,
        time: timeVal,
        notes: document.getElementById('cust_notes') ? document.getElementById('cust_notes').value.trim() : '',
        submittedAt: new Date().toISOString()
    };
    
    let existingLeads = JSON.parse(localStorage.getItem('beyout_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('beyout_leads', JSON.stringify(existingLeads));

    // Submit form data to FormSubmit (free email form provider)
    fetch("https://formsubmit.co/ajax/khaledelmala7@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(leadData)
    })
    .then(() => console.log("Lead captured by FormSubmit successfully"))
    .catch((error) => console.error("Error submitting to FormSubmit:", error));

    // Redirect to WhatsApp with pre-filled details to the owner
    const ownerPhone = "201100400082";
    const msg = `مرحباً بيوت، أود حجز موعد استشارة:
الاسم: ${name}
الهاتف: ${phone}
التاريخ المفضل: ${dateVal}
الفترة: ${timeLabel}
ملاحظات: ${leadData.notes || 'لا يوجد'}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${ownerPhone}&text=${encodeURIComponent(msg)}`;
    window.location.href = whatsappUrl;

    // Send Telegram Notification
    if (typeof TELEGRAM_BOT_TOKEN !== 'undefined' && TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
        const telegramMsg = `🔔 *طلب حجز جديد (BEYOUT)* 🔔\n\n` +
            `👤 *الاسم:* ${name}\n` +
            `📞 *الهاتف:* ${phone}\n` +
            `📅 *التاريخ:* ${dateVal}\n` +
            `🕒 *الفترة:* ${timeLabel}\n` +
            `📝 *ملاحظات:* ${leadData.notes || 'لا يوجد'}`;

        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMsg,
                parse_mode: "Markdown"
            })
        })
        .then(() => console.log("Telegram notification sent successfully"))
        .catch((error) => console.error("Error sending Telegram notification:", error));
    }

    // Show step 4
    nextStep(4);
}

function resetForm() {
    const formEl = document.getElementById('demoForm');
    if (formEl) formEl.reset();
    
    const activeStep = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (activeStep) activeStep.classList.remove('active');
    
    currentFormStep = 1;
    const firstStepEl = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (firstStepEl) firstStepEl.classList.add('active');
    
    updateProgressBar();
}

// Translations logic
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(currentLanguage);
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle-btn');
    if (navLinks) navLinks.classList.toggle('active');
    if (menuToggle) menuToggle.classList.toggle('open');
}

// Close menu when clicking on any nav link
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.getElementById('menu-toggle-btn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('open');
            }
        });
    });
});

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    
    document.body.className = `theme-beyout lang-${lang}`;
    
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
        const placeholder = el.getAttribute('data-placeholder-' + lang);
        if (placeholder) {
            el.placeholder = placeholder;
        }
    });
    
    // Update switch text
    const langBtnText = document.getElementById('lang-switch-text');
    if (langBtnText) {
        langBtnText.textContent = lang === 'ar' ? 'English' : 'العربية';
    }
}


// 100% Pure Arabic & English Translation Dictionaries

// 100% Pure Arabic & English Dictionaries (Zero Mixed Words)

// 100% Comprehensive Bilingual Translation Dictionaries (Pure AR & Pure EN)

// 100% Comprehensive Bilingual Translation Engine (Pure AR / Pure EN)
const translations = {
    ar: {
        catalog_title: "كتالوج التنبيهات الذكية (32 تنبيهاً أمنياً بالصور)",
        title_alert_27: "27. انسداد ممرات الطوارئ",
        tag_alert_27: "انسداد مخرج الطوارئ! 🚨",
        desc_alert_27: "رصد تخزين المعدات أو وضع العوائق أمام أبواب وممرات الإخلاء والطوارئ.",
        title_alert_28: "28. رصد التدخين",
        tag_alert_28: "رصد تدخين بـ منطقة محظورة 🚬",
        desc_alert_28: "اكتشاف السجائر وشعلة النار بالمستودعات والمناطق المحظورة قابلية الاشتعال.",
        title_alert_29: "29. التواجد بعد الدوام",
        tag_alert_29: "تواجد بعد ساعات العمل 🌙",
        desc_alert_29: "رصد التواجد البشري ليلاً في المكاتب والمباني بعد إغلاق ساعات العمل الرسمية.",
        title_alert_30: "30. طوابير الكاشير الطويلة",
        tag_alert_30: "طابور طويل وازدحام الخدمة ⏳",
        desc_alert_30: "التنبيه عند زيادة طابور المحاسبة والخدمة عن 5 أشخاص لفتح مسار خدمة جديد.",
        title_alert_31: "31. استخدام الهاتف المحمول",
        tag_alert_31: "استخدام الهاتف أثناء العمل 📱",
        desc_alert_31: "كشف انشغال العمالة بالجوال أثناء تشغيل الآلات الخطرة أو مواقع الانتباه.",
        title_alert_32: "32. الرفوف الفارغة ونفاد المخزون",
        tag_alert_32: "رف فارغ - نفاد المخزون 📦",
        desc_alert_32: "تنبيه عمال التعبئة فور خلو الرفوف من السلع لسرعة إعادة التموين بالمتجر.",

        desc_alert_26: "رصد الاقتراب الشديد أو اللمس للتحف والمعروضات الحساسة بالمعارض والمتاحف.",
        story_1_challenge: "التحدي: مخاطر عدم الالتزام بمعدات الوقاية وتسلل الغرباء في موقع إنشائي ضخم يضم 400 عامل.",
        story_1_solution: "الحل: تفعيل تنبيهات فيكسورا لرصد الخوذة، السترة الواقية، القفازات، واقتحام مناطق الخطر على 40 كاميرات حالية.",
        story_1_stat_1_lbl: "التزام بمعدات السلامة",
        story_1_stat_2_lbl: "حوادث موقع جسيمة",
        story_1_stat_3_lbl: "توافق مع الخصوصية (GDPR)",
        story_2_challenge: "التحدي: كثرة حوادث اقتراب الرافعات الشوكية من العمال والتسلل الليلي لسرقة البضائع المخزنة.",
        story_2_solution: "الحل: ربط تنبيهات فيكسورا لاقتراب الرافعات الشوكية ورصد تسلق الأسوار بـ 50 كاميرات دون استبدال.",
        story_2_stat_1_lbl: "انخفاض الحوادث الوشيكة",
        story_2_stat_2_lbl: "محاولات تسلل تم منعها",
        story_2_stat_3_lbl: "تكلفة شراء كاميرات جديدة",
        story_3_loc: "🇩🇪 برلين، ألمانيا",
        story_3_title: "مستشفى شاريته الجامعي (أقسام الطوارئ)",
        story_3_challenge: "التحدي: رصد سقوط المرضى كبار السن فوراً والتحقق من التزام الأطقم بالتعقيم والكمامات بالمنطقة المعقمة.",
        story_3_solution: "الحل: ربط ذكاء فيكسورا لتنبيهات السقوط والكمامات وتخطي أجهزة تعقيم الأيدي بالبث الداخلي للمستشفى.",
        story_3_stat_1_lbl: "حالة سقوط تم إنقاذها فوراً",
        story_3_stat_2_lbl: "التزام بالتعقيم والنظافة",
        story_3_stat_3_lbl: "معالجة محلية وسرية",
        dash_active_count: "5/5 مفعلة",
        dash_rule_1: "القفازات الوقائية",
        dash_rule_2: "نظارات الحماية",
        dash_rule_3: "غطاء الشعر",
        dash_rule_4: "النظافة العامة والتعقيم",
        dash_rule_5: "الكمامات الوقائية",
        filter_all_cams: "كل الكاميرات",
        filter_all_violations: "جميع أنواع المخالفات",
        table_entry_gate: "المدخل الرئيسي",
        viol_no_gloves: "عدم ارتداء القفازات",
        viol_no_goggles: "عدم ارتداء النظارة",
        viol_no_mask: "عدم ارتداء الكمامة",
        footer_vexora_title: "فيكسورا - منصة الذكاء الاصطناعي الأمني",
        footer_b2b: "حلول الأمن الذكي للمنشآت",

        live_badge: "مباشر 🔴",
        catalog_title: "كتالوج التنبيهات الذكية (26 تنبيهاً أمنياً بالصور)",
        catalog_badge: "فئات التنبيهات الخمس الكبرى لنظام فيكسورا",
        catalog_desc: "استعرض كافة أنواع التنبيهات المتاحة بالنظام، مقسمة في 5 فئات رئيسية، مع لقطة شاشة توضيحية ووصف كامل لكل تنبيه.",
        trusted_badge: "الشركاء الدوليون والعملاء العالميّون",
        trusted_title: "مؤسسات عالمية تعتمد على تقنيات الذكاء الاصطناعي الأمني",
        trusted_desc: "حلولنا الأمنيّة مطبّقة وموثوقة لدى كبرى الشركات والمؤسسات الصناعية والبنية التحتية حول العالم.",
        client_1_name: "إنشاءات بالفور بيتي",
        client_1_country: "المملكة المتحدة",
        client_1_sector: "البنية التحتية والإنشاءات",
        client_2_name: "سيمنس هيلثينيرز",
        client_2_country: "ألمانيا",
        client_2_sector: "البنية التحتية للمستشفيات",
        client_3_name: "مراكز توزيع أمازون",
        client_3_country: "الولايات المتحدة الأمريكية",
        client_3_sector: "المستودعات واللوجستيات",
        client_4_name: "فينشي لإدارة المرافق",
        client_4_country: "فرنسا",
        client_4_sector: "إدارة المنشآت والمرافق",
        client_5_name: "مصانع تجميع بي إم دبليو",
        client_5_country: "ألمانيا",
        client_5_sector: "التصنيع والخطوط الصناعية",
        client_6_name: "منافذ تيسكو للتجزئة",
        client_6_country: "المملكة المتحدة",
        client_6_sector: "التجزئة وسلاسل الإمداد",
        stories_badge: "قصص نجاح عالمية",
        stories_title: "تأثير حقيقي وميداني لدى كبرى الشركات العالمية",
        stories_desc: "نتائج موثقة أثبتت كفاءة التنبيهات المبكرة في حماية الأرواح وخفض التكاليف وتأمين المنشآت.",
        story_1_loc: "لندن، المملكة المتحدة",
        story_1_title: "موقع إنشاءات بالفور بيتي (مشروع بقيمة 120 مليون جنيه إسترليني)",
        story_1_challenge: "التحدي: مخاطر عدم الالتزام بمعدات الوقاية الشخصية وتسلل الغرباء في موقع إنشائي ضخم يضم 400 عامل.",
        story_1_solution: "الحل: تفعيل تنبيهات فيكسورا لرصد الخوذة، السترة الواقية، القفازات، واقتحام مناطق الخطر على 40 كاميرات حالية.",
        story_1_stat_1_val: "+98%",
        story_1_stat_1_lbl: "التزام بمعدات السلامة",
        story_1_stat_2_val: "صفر",
        story_1_stat_2_lbl: "حوادث موقع جسيمة",
        story_1_stat_3_val: "100%",
        story_1_stat_3_lbl: "توافق مع الخصوصية",
        story_2_loc: "تكساس، الولايات المتحدة الأمريكية",
        story_2_title: "مركز لوجستيات وتوزيع أمازون (مساحة 60,000 متر مربع)",
        story_2_challenge: "التحدي: كثرة حوادث اقتراب الرافعات الشوكية من العمال والتسلل الليلي لسرقة البضائع المخزنة.",
        story_2_solution: "الحل: ربط نظام فيكسورا لرصد اقتراب الرافعات، التسكع المريب، والأمتعة المتروكة مع إطلاق صافرات إنذار تلقائية.",
        story_2_stat_1_val: "85%",
        story_2_stat_1_lbl: "انخفاض حوادث الرافعات",
        story_2_stat_2_val: "100%",
        story_2_stat_2_lbl: "إحباط سرقات ليلية",
        story_2_stat_3_val: "< 1.2 ثانية",
        story_2_stat_3_lbl: "زمن الاستجابة للإنذار",

        catalog_title: "كتالوج التنبيهات الذكية (26 تنبيهاً أمنياً بالصور)",
        catalog_badge: "فئات التنبيهات الخمس الكبرى لنظام فيكسورا",
        catalog_desc: "استعرض كافة أنواع التنبيهات المتاحة بالنظام، مقسمة في 5 فئات رئيسية، مع لقطة شاشة توضيحية ووصف كامل لكل تنبيه.",
        cat_pill_1: "الفئة الأولى 👷‍♂️",
        cat_sub_1: "تستهدف هذه الفئة حماية الأرواح، وتأمين بيئة العمل، والتزام طاقم العمل بالمعايير الوقائية والصحية.",
        cat_pill_2: "الفئة الثانية 🔒",
        cat_sub_2: "مخصصة لحماية الممتلكات والمنشآت من الاختراق، والسرقة، والتهديدات الخارجية.",
        cat_pill_3: "الفئة الثالثة 👨‍稳‍👧‍👦",
        cat_sub_3: "مخصصة للسيطرة على الأماكن العامة والممرات وتجنب الأزمات البشرية والتدافع.",
        cat_pill_4: "الفئة الرابعة ⚠️",
        cat_sub_4: "فئة الإنذار المبكر للأزمات البيئية أو الحوادث المفاجئة التي تتطلب تدخلاً عاجلاً.",
        cat_pill_5: "الفئة الخامسة ⚙️",
        cat_sub_5: "تختص بضمان سير العمليات اليومية بأمان ومنع السلوكيات الخاطئة بداخل المنشأة.",
        desc_alert_1: "كشف عدم ارتداء خوذة الرأس بالمواقع الإنشائية وتنبيه المشرف فورياً لحماية الأرواح.",
        desc_alert_2: "التحقق من ارتداء السترة الفسفورية المضيئة في بيئات العمل ذات الرؤية المنخفضة.",
        desc_alert_3: "رصد الالتزام بقفازات العمل المخصصة أو القفازات الطبية بالمصانع والمختبرات.",
        desc_alert_4: "التأكد من ارتداء نظارات حماية العين أثناء عمليات القطع واللحام والمواد الكيميائية.",
        desc_alert_5: "رصد التزام العمال بارتداء أحذية الأمان المقاومة للانزلاق والصدمات.",
        desc_alert_6: "التأكد من ارتداء الكمامات بالقطاعات الصحية والمستشفيات ومصانع الأغذية.",
        desc_alert_7: "رصد الالتزام بتغطية الشعر في خطوط إنتاج الأغذية والمطابخ والمختبرات.",
        desc_alert_8: "التأكد من التزام طاقم العمل بالزي الرسمي والتنفيذي المعتمد للشركة.",
        desc_alert_9: "كشف تخطي أجهزة تعقيم الأيدي قبل الدخول للغرف المعقمة والعمليات.",
        desc_alert_10: "رصد تسلق الأسوار واختراق الحدود الخارجية للمنشأة في أوقات الحظر.",
        desc_alert_11: "كشف دخول الأفراد لغرف الأرشيف، السيرفرات، وخزائن المواد الحساسة.",
        desc_alert_12: "رصد التقاط الأشياء المريب وإخفاء المنتجات في المتاجر والمستودعات.",
        desc_alert_13: "رصد الحقائب والأجسام المتروكة لفترات طويلة في الأماكن العامة والمطارات.",
        desc_alert_14: "كشف وقوف أفراد لفترات مريبة وحركات غير مبررة حول محيط المنشأة.",
        desc_alert_15: "رصد محاولات التخريب، رش الجدران، والعبث بالأسوار والأبواب الخارجية.",
        desc_alert_16: "رصد التجمعات الكبيرة والتدافع عند البوابات والممرات وإرسال تحذيرات الإخلاء.",
        desc_alert_17: "كشف الشغب والعنف الجسدي والاشتباكات بالصوت والصورة بشكل لحظي.",
        desc_alert_18: "رصد الركض المريب في الممرات الداخلية للمدارس، المستشفيات، والمباني.",
        desc_alert_19: "كشف التكدس المفاجئ للسيارات أو التوقفات المعطلة لحركة السير داخل المجمعات.",
        desc_alert_20: "الإنذار المبكر بمجرد ظهور ألسنة لهب أو أدخنة قبل وصولها للمستشعرات العادية.",
        desc_alert_21: "رصد سقوط المرضى أو العمال على الأرض وإطلاق نداء استغاثة فورية للطوارئ.",
        desc_alert_22: "كشف انسكاب السوائل والمواد الخطرة على الأرضيات لمنع انزلاق الأفراد والمصانع.",
        desc_alert_23: "رصد الأمان وحالات الغرق وعدم الحركة في المسابح والمنتجعات السياحية.",
        desc_alert_24: "رصد تناول الأطعمة والمشروبات في غير الأماكن المخصصة مثل خطوط الإنتاج المعقمة.",
        desc_alert_25: "إنذار مبكر عند اقتراب الرافعات الشوكية بشكل خطر من مسارات المشاة والعمال.",
        desc_alert_26: "رصد لمس المعروضات الأثرية بالمتاحف أو القطع الحساسة بالمستودعات.",

        "nav_products": "المنتجات والأنظمة",
        "nav_solutions": "التنبيهات الذكية",
        "nav_dashboard": "لوحة التحكم",
        "nav_trusted": "عملاءنا",
        "nav_stories": "قصص نجاح",
        "btn_start_now": "ابدأ التجربة المجانية",
        
        "hero_title": "نظام الذكاء الاصطناعي الأمني فيكسورا",
        "hero_desc": "تحويل كاميرات المراقبة التقليدية إلى منظومة أمنية ذكية ترصد المخاطر والتسلل ومخالفات السلامة لحظياً.",
        "hero_badge": "منظومة المراقبة الذكية المتقدمة",
        "btn_request_demo": "حجز معاينة تجريبية (15 يوماً)",
        "btn_view_dashboard": "استعراض لوحة التحكم الحية",
        
        "products_subtitle": "حلول ومنتجات فيكسورا",
        "products_title": "منتجات الأنظمة وسيرفرات الذكاء الاصطناعي",
        "products_desc": "اختر الباقة والمنتج المناسب لبنية كاميرات مراقبة منشأتك مع تركيب ومكفول بـ 15 يوماً تجربة مجانية.",
        "prod_1_badge": "معالجة محلية",
        "prod_1_title": "السيرفر المحلي الذكي",
        "prod_1_desc": "سيرفر معالجة محلية يدعم حتى 6 كاميرات مراقبة بدون نقل بيانات للسحابة لضمان السرية والسرعة.",
        "prod_1_price": "20,000 جنيه",
        "prod_1_fee": "تدفع مرة واحدة لشراء وتملّك السيرفر",
        "prod_1_btn": "طلب السيرفر الآن",
        
        "prod_2_badge": "الباقة الأكثر طلباً ⭐",
        "prod_2_title": "الاشتراك الشهري للتنبيهات",
        "prod_2_desc": "تفعيل الذكاء الاصطناعي لكاميرا واحدة ورقم هاتف للتنبيهات الفورية مع الخرائط الحرارية.",
        "prod_2_price": "8,000 جنيه / شهرياً",
        "prod_2_fee": "كل كاميرا إضافية +1,500 ج.م | رقم هاتف +1,000 ج.م",
        "prod_2_btn": "اشترك الآن (15 يوماً تجربة)",
        
        "prod_3_badge": "تخصيص كامل",
        "prod_3_title": "التنبيهات المخصصة",
        "prod_3_desc": "تطوير وتدريب نموذج ذكاء اصطناعي مخصص لسيناريو فريد خاص بنشاطك التجاري.",
        "prod_3_price": "5,000 جنيه",
        "prod_3_fee": "رسوم إعداد وتدريب لمرة واحدة فقط",
        "prod_3_btn": "طلب تنبيه مخصص",
        
        "alerts_subtitle": "كتالوج التنبيهات الذكية (26 تنبيهاً أمنياً بالصور)",
        "alerts_title": "فئات التنبيهات الخمس الكبرى لنظام فيكسورا",
        "alerts_desc": "استعرض كافة أنواع التنبيهات المتاحة بالنظام، مقسمة في 5 فئات رئيسية، مع لقطة شاشة توضيحية ووصف كامل لكل تنبيه.",
        
        "cat_title_1": "الفئة الأولى: السلامة والصحة المهنية",
        "cat_desc_1": "تستهدف هذه الفئة حماية الأرواح، وتأمين بيئة العمل، والتزام طاقم العمل بالمعايير الوقائية والصحية.",
        "cat_title_2": "الفئة الثانية: الأمن والحماية",
        "cat_desc_2": "مخصصة لحماية الممتلكات والمنشآت من الاختراق، والسرقة، والتهديدات الخارجية.",
        "cat_title_3": "الفئة الثالثة: السلامة العامة وإدارة الحشود",
        "cat_desc_3": "مخصصة للسيطرة على الأماكن العامة والممرات وتجنب الأزمات البشرية والتدافع.",
        "cat_title_4": "الفئة الرابعة: مراقبة الحوادث والبيئة",
        "cat_desc_4": "فئة الإنذار المبكر للأزمات البيئية أو الحوادث المفاجئة التي تتطلب تدخلاً عاجلاً.",
        "cat_title_5": "الفئة الخامسة: مراقبة العمليات والسلوكيات",
        "cat_desc_5": "تختص بضمان سير العمليات اليومية بأمان ومنع السلوكيات الخاطئة بداخل المنشأة.",
        
        "tag_helmet": "لم يتم ارتداء الخوذة! ⚠️",
        "tag_vest": "السترة: متوافق ✅",
        "tag_gloves": "القفازات: متوافق ✅",
        "tag_goggles": "النظارة: غير متوافق ⚠️",
        "tag_shoes": "حذاء الأمان: متوافق ✅",
        "tag_mask": "الكمامة: متوافق ✅",
        "tag_hairnet": "غطاء الشعر: متوافق ✅",
        "tag_uniform": "الزي الموحد: متوافق ✅",
        "tag_hygiene": "تجاوز جهاز التعقيم ⚠️",
        "tag_intrusion": "اختراق السياج الخارجي 🚨",
        "tag_unauthorized": "منطقة غير مصرح بها ⛔",
        "tag_theft": "حركة سرقة مريبة 🚨",
        "tag_baggage": "حقيبة متروكة ⚠️",
        "tag_loitering": "تنبيه تسكع مريب (5 دقائق) ⚠️",
        "tag_vandalism": "رصد تخريب بالموقع 🚨",
        "tag_crowd": "تكدس وازدحام شديد ⚠️",
        "tag_violence": "رصد مشاجرة واشتباك 🚨",
        "tag_running": "رصد ركض سريع مريب ⚠️",
        "tag_traffic": "تكدس مروري بالمدخل 🚗",
        "tag_fire": "إنذار مبكر حريق ودخان 🔥",
        "tag_fall": "رصد سقوط مفاجئ 🚑",
        "tag_spill": "انسكاب سوائل على الأرض 💧",
        "tag_drowning": "خطر غرق بالمسبح 🏊",
        "tag_eating": "مخالفة تناول طعام 🚫",
        "tag_forklift": "اقتراب رافعة شوكية ⚠️",
        "tag_touching": "لمس المعروضات 🛑",
        
        "title_alert_1": "1. رصد خوذة السلامة",
        "title_alert_2": "2. رصد السترة الواقية",
        "title_alert_3": "3. رصد قفازات العمل",
        "title_alert_4": "4. رصد نظارات الحماية",
        "title_alert_5": "5. رصد حذاء الأمان",
        "title_alert_6": "6. الكمامات الوقائية",
        "title_alert_7": "7. غطاء الشعر",
        "title_alert_8": "8. الزي الموحد",
        "title_alert_9": "9. النظافة العامة والتعقيم",
        "title_alert_10": "10. تسلل الأفراد والأسوار",
        "title_alert_11": "11. دخول مناطق غير مصرح بها",
        "title_alert_12": "12. حركات السرقة",
        "title_alert_13": "13. الأجسام المتروكة",
        "title_alert_14": "14. التسكع المريب",
        "title_alert_15": "15. تخريب الممتلكات",
        "title_alert_16": "16. التكدس والازدحام",
        "title_alert_17": "17. المشاجرات والعنف",
        "title_alert_18": "18. الركض السريع",
        "title_alert_19": "19. التكدس المروري",
        "title_alert_20": "20. الأدخنة والحرائق",
        "title_alert_21": "21. السقوط المفاجئ",
        "title_alert_22": "22. انسكاب السوائل",
        "title_alert_23": "23. حالات الغرق",
        "title_alert_24": "24. تناول الطعام",
        "title_alert_25": "25. الرافعات الشوكية",
        "title_alert_26": "26. لمس المعروضات",

        "dash_sec_subtitle": "شاشة التحكم الحية والتفاعلية",
        "dash_sec_title": "منصة فيكسورا للسلامة الذكية",
        "dash_sec_desc": "لوحة تحكم حية ومباشرة تعكس النظام الفعلي المعمول به بالمنشآت مع بث مباشر وسجل التنبيهات الفوري.",
        "dash_brand_title": "الموقع الرئيسي - المنشأة الاستثمارية",
        "dash_brand_sub": "منصة التحكم والمراقبة الذكية | فيكسورا",
        "dash_status_badge": "أمن وتشغيلي 🟢",
        "dash_license_warning": "⚠️ تنبيه: ترخيص تجريبي نشط (15 يوماً تجربة مجانية). النظام يعمل بالطاقة القصوى لحماية المنشأة.",
        "dash_lbl_alltime": "كل الوقت / اليوم",
        "dash_lbl_top_violation": "أعلى مخالفة",
        "dash_chart_title": "معدل تكرار المخالفات 📈",
        "dash_tab_main": "المدخل الرئيسي",
        "dash_tab_top": "المدخل العلوي",
        "dash_enabled_alerts_title": "التنبيهات المفعّلة",
        "dash_stream_cam_name": "📹 كاميرا المدخل الرئيسي",
        "dash_people_count_lbl": "الأشخاص الآن (المدخل الرئيسي):",
        "dash_scen_label": "🕹️ تجربة سيناريو الرصد:",
        "dash_scen_reset": "تصفير البث",
        "dash_scen_gloves": "⚠️ عدم ارتداء القفازات",
        "dash_scen_intruder": "🚨 اختراق البوابة",
        "dash_scen_fire": "🔥 إنذار دخان",
        "dash_recent_violations_title": "سجل المخالفات الحديثة (18)",
        "tbl_col_time": "الوقت",
        "tbl_col_cam": "الكاميرا",
        "tbl_col_type": "نوع المخالفة",
        "tbl_col_person": "شخص",
        "tag_secure_stream": "بث آمن ومشفّر 🟢",
        "tag_danger_zone": "منطقة خطر ⚠️",
        "dash_stream_meta": "كاميرا: 01 | المنفذ: 5000 | الدقة: 640x480"
    },
    en: {
        catalog_title: "Smart Alerts Catalog (32 Visual Security Alerts)",
        title_alert_27: "27. Emergency Exit Blocked",
        tag_alert_27: "Emergency Exit Blocked! 🚨",
        desc_alert_27: "Detects stored equipment or obstacles blocking emergency exit doors and evacuation corridors.",
        title_alert_28: "28. Smoking Detection",
        tag_alert_28: "Smoking Detected in Prohibited Area 🚬",
        desc_alert_28: "Detects active smoking and flames in flammable storage zones and prohibited areas.",
        title_alert_29: "29. Presence After Hours",
        tag_alert_29: "Presence After Working Hours 🌙",
        desc_alert_29: "Detects human presence in offices and buildings during non-operational nighttime hours.",
        title_alert_30: "30. Long Checkout Queue",
        tag_alert_30: "Long Queue & Service Bottleneck ⏳",
        desc_alert_30: "Alerts store management when checkout lines exceed threshold to open extra counters.",
        title_alert_31: "31. Mobile Phone Usage",
        tag_alert_31: "Mobile Phone Usage at Work 📱",
        desc_alert_31: "Detects worker distraction with mobile devices while operating heavy machinery.",
        title_alert_32: "32. Empty Shelves / Out of Stock",
        tag_alert_32: "Empty Shelf - Out of Stock 📦",
        desc_alert_32: "Alerts floor staff when retail display shelves run out of stock for rapid restocking.",

        desc_alert_26: "Detects extreme proximity or touching of sensitive museum artifacts and exhibits.",
        story_1_challenge: "Challenge: PPE non-compliance hazards and unauthorized intrusion across a massive construction site with 400 workers.",
        story_1_solution: "Solution: Activation of Vexora AI alerts for hardhat, safety vest, gloves, and zone intrusion across 40 existing cameras.",
        story_1_stat_1_lbl: "Safety Gear Compliance",
        story_1_stat_2_lbl: "Severe Site Accidents",
        story_1_stat_3_lbl: "Privacy Compliance (GDPR)",
        story_2_challenge: "Challenge: Frequent forklift pedestrian proximity hazards and nighttime warehouse theft attempts.",
        story_2_solution: "Solution: Integration of Vexora forklift warnings and fence intrusion alerts across 50 existing cameras without hardware replacement.",
        story_2_stat_1_lbl: "Reduction in Near-Miss Incidents",
        story_2_stat_2_lbl: "Prevented Intrusion Attempts",
        story_2_stat_3_lbl: "New Camera Hardware Cost",
        story_3_loc: "🇩🇪 Berlin, Germany",
        story_3_title: "Charité University Hospital (Emergency Wards)",
        story_3_challenge: "Challenge: Immediate elderly patient fall detection and enforcing staff hygiene and mask compliance in sterile wards.",
        story_3_solution: "Solution: Integration of Vexora fall detection, mask alerts, and hand sanitization monitoring into internal hospital feeds.",
        story_3_stat_1_lbl: "Fall Incidents Immediately Rescued",
        story_3_stat_2_lbl: "Sanitization & Hygiene Compliance",
        story_3_stat_3_lbl: "Local Confidential Processing",
        dash_active_count: "5/5 Active",
        dash_rule_1: "Protective Gloves",
        dash_rule_2: "Safety Goggles",
        dash_rule_3: "Hairnet Compliance",
        dash_rule_4: "General Hygiene & Sanitization",
        dash_rule_5: "Protective Face Masks",
        filter_all_cams: "All Cameras",
        filter_all_violations: "All Violation Types",
        table_entry_gate: "Main Entrance",
        viol_no_gloves: "Missing Gloves",
        viol_no_goggles: "Missing Goggles",
        viol_no_mask: "Missing Face Mask",
        footer_vexora_title: "Vexora - Security AI Platform",
        footer_b2b: "Enterprise Smart Security Solutions",

        live_badge: "LIVE 🔴",
        catalog_title: "Smart Alerts Catalog (26 Visual Security Alerts)",
        catalog_badge: "Vexora System 5 Major Alert Categories",
        catalog_desc: "Explore all available system alerts across 5 major categories, complete with visual snapshots and full descriptions.",
        trusted_badge: "Global Partners & International Clients",
        trusted_title: "Global Enterprises Powered by Security AI",
        trusted_desc: "Our security solutions are deployed and trusted by top global enterprises, industrial hubs, and infrastructure facilities worldwide.",
        client_1_name: "Balfour Beatty Construction",
        client_1_country: "United Kingdom",
        client_1_sector: "Infrastructure & Construction",
        client_2_name: "Siemens Healthineers",
        client_2_country: "Germany",
        client_2_sector: "Healthcare & Hospital Facilities",
        client_3_name: "Amazon Distribution Hubs",
        client_3_country: "United States",
        client_3_sector: "Warehousing & Logistics",
        client_4_name: "Vinci Facilities Management",
        client_4_country: "France",
        client_4_sector: "Facilities & Asset Management",
        client_5_name: "BMW Assembly Plants",
        client_5_country: "Germany",
        client_5_sector: "Automotive & Industrial Lines",
        client_6_name: "Tesco Retail Outlets",
        client_6_country: "United Kingdom",
        client_6_sector: "Retail & Supply Chain",
        stories_badge: "Global Success Stories",
        stories_title: "Proven Real-World Field Impact",
        stories_desc: "Documented results proving early alert efficiency in saving lives, cutting costs, and securing facilities.",
        story_1_loc: "London, United Kingdom",
        story_1_title: "Balfour Beatty Construction Site (£120M Project)",
        story_1_challenge: "Challenge: PPE non-compliance hazards and unauthorized intrusion across a massive construction site with 400 workers.",
        story_1_solution: "Solution: Deployment of Vexora AI alerts for hardhat, vest, gloves, and zone intrusion across 40 existing CCTV cameras.",
        story_1_stat_1_val: "+98%",
        story_1_stat_1_lbl: "Safety Gear Compliance",
        story_1_stat_2_val: "Zero",
        story_1_stat_2_lbl: "Severe Site Accidents",
        story_1_stat_3_val: "100%",
        story_1_stat_3_lbl: "Privacy Compliance (GDPR)",
        story_2_loc: "Texas, United States",
        story_2_title: "Amazon Fulfillment & Distribution Hub (60,000 m²)",
        story_2_challenge: "Challenge: Frequent forklift pedestrian proximity hazards and nighttime warehouse theft attempts.",
        story_2_solution: "Solution: Integration of Vexora forklift warnings, loitering alerts, and automated siren triggers.",
        story_2_stat_1_val: "85%",
        story_2_stat_1_lbl: "Reduction in Forklift Hazards",
        story_2_stat_2_val: "100%",
        story_2_stat_2_lbl: "Night Theft Attempt Prevention",
        story_2_stat_3_val: "< 1.2 sec",
        story_2_stat_3_lbl: "Alert Response Latency",

        catalog_title: "Smart Alerts Catalog (26 Visual Security Alerts)",
        catalog_badge: "Vexora System 5 Major Alert Categories",
        catalog_desc: "Explore all available system alerts across 5 major categories, complete with visual snapshots and full descriptions.",
        cat_pill_1: "Category 1 👷‍♂️",
        cat_sub_1: "Protects worker lives, secures the workplace, and enforces safety and health standards.",
        cat_pill_2: "Category 2 🔒",
        cat_sub_2: "Dedicated to securing property and facilities against intrusion, theft, and perimeter threats.",
        cat_pill_3: "Category 3 👨‍👧‍👦",
        cat_sub_3: "Designed for public areas, corridor monitoring, and preventing crowd surges or chaos.",
        cat_pill_4: "Category 4 ⚠️",
        cat_sub_4: "Early warning system for environmental hazards or sudden emergency incidents requiring immediate response.",
        cat_pill_5: "Category 5 ⚙️",
        cat_sub_5: "Ensures daily operational compliance and prevents hazardous behavior within facilities.",
        desc_alert_1: "Detects missing hardhats on construction sites and alerts supervisors immediately.",
        desc_alert_2: "Verifies high-visibility safety vest compliance in low-light industrial work environments.",
        desc_alert_3: "Monitors protective or medical glove usage in factories and laboratory settings.",
        desc_alert_4: "Ensures safety goggles are worn during cutting, welding, and chemical handling.",
        desc_alert_5: "Monitors worker compliance with slip-resistant and steel-toe protective footwear.",
        desc_alert_6: "Checks face mask compliance in healthcare, hospital, and food manufacturing zones.",
        desc_alert_7: "Ensures hairnet compliance along food production lines, kitchens, and labs.",
        desc_alert_8: "Verifies authorized corporate uniform and workwear compliance for employees.",
        desc_alert_9: "Detects bypassed hand sanitization stations prior to entering sterile rooms.",
        desc_alert_10: "Detects fence climbing and perimeter boundary breaches during restricted hours.",
        desc_alert_11: "Detects unauthorized entry into server rooms, archive vaults, and restricted areas.",
        desc_alert_12: "Monitors shoplifting, suspicious item picking, and product concealment.",
        desc_alert_13: "Flags unattended luggage and abandoned objects in public terminals and airports.",
        desc_alert_14: "Detects suspicious loitering and prolonged unauthorized presence near facility perimeters.",
        desc_alert_15: "Detects property vandalism, graffiti spraying, and tampering with exterior doors.",
        desc_alert_16: "Monitors dangerous crowd density, surging at gates, and triggers evacuation warnings.",
        desc_alert_17: "Detects physical violence, fights, and brawls in real-time with visual overlays.",
        desc_alert_18: "Flags fast running in indoor hallways of schools, hospitals, and corporate offices.",
        desc_alert_19: "Detects sudden vehicle traffic bottlenecks and lane blockages in facility driveways.",
        desc_alert_20: "Triggers early warning for flame or smoke visual signatures before traditional sensors.",
        desc_alert_21: "Detects sudden human fall incidents and immediately dispatches emergency assistance.",
        desc_alert_22: "Detects floor liquid spills and hazardous fluid leaks to prevent slip hazards.",
        desc_alert_23: "Monitors pool safety, swimmer distress, and drowning risks at resorts and pools.",
        desc_alert_24: "Detects prohibited eating or drinking in cleanrooms and assembly lines.",
        desc_alert_25: "Provides early proximity warnings when forklifts approach worker pedestrian paths.",
        desc_alert_26: "Detects unauthorized touching of museum artifacts or sensitive inventory items.",

        "nav_products": "Products & Systems",
        "nav_solutions": "AI Alerts",
        "nav_dashboard": "Control Panel",
        "nav_trusted": "Trusted Clients",
        "nav_stories": "Success Stories",
        "btn_start_now": "Start Free Trial",
        
        "hero_title": "Vexora AI Security System",
        "hero_desc": "Transform standard CCTV cameras into an intelligent security system detecting threats, intrusion, and HSE violations in real time.",
        "hero_badge": "Advanced AI Surveillance Platform",
        "btn_request_demo": "Book 15-Day Free Trial",
        "btn_view_dashboard": "View Live Dashboard Demo",
        
        "products_subtitle": "Vexora Solutions & Hardware",
        "products_title": "AI Systems & On-Premise Servers",
        "products_desc": "Select the ideal server and AI package for your facility with 15-day free trial included.",
        "prod_1_badge": "Local Processing",
        "prod_1_title": "On-Premise AI Server",
        "prod_1_desc": "Local processing AI server supporting up to 6 IP cameras with zero cloud latency.",
        "prod_1_price": "20,000 EGP",
        "prod_1_fee": "One-time hardware purchase fee",
        "prod_1_btn": "Order Server Now",
        
        "prod_2_badge": "Most Popular ⭐",
        "prod_2_title": "Camera AI Subscription",
        "prod_2_desc": "Activate real-time AI video analytics for 1 camera & 1 alert phone line.",
        "prod_2_price": "8,000 EGP / month",
        "prod_2_fee": "Additional camera +1,500 EGP/mo | Phone +1,000 EGP/mo",
        "prod_2_btn": "Subscribe Now (15-Day Trial)",
        
        "prod_3_badge": "Full Customization",
        "prod_3_title": "Custom AI Alerts",
        "prod_3_desc": "Train custom AI models for unique industrial and operational scenarios.",
        "prod_3_price": "5,000 EGP",
        "prod_3_fee": "One-time AI model training fee",
        "prod_3_btn": "Request Custom Alert",
        
        "alerts_subtitle": "Smart Alerts Catalog (26 AI Alerts with Screenshots)",
        "alerts_title": "Vexora 5 Major Alert Categories",
        "alerts_desc": "Explore all available system alerts divided into 5 main operational security categories.",
        
        "cat_title_1": "Category 1: HSE & Personal Protection Equipment",
        "cat_desc_1": "Protecting lives, securing work environments, and ensuring staff safety compliance.",
        "cat_title_2": "Category 2: Facility Security & Perimeter Protection",
        "cat_desc_2": "Securing perimeter fences, restricting unauthorized access, and detecting theft.",
        "cat_title_3": "Category 3: Public Safety & Crowd Management",
        "cat_desc_3": "Managing public spaces, controlling crowd density, and detecting violence.",
        "cat_title_4": "Category 4: Incident & Environmental Monitoring",
        "cat_desc_4": "Early detection of smoke, fire hazards, human falls, and liquid spills.",
        "cat_title_5": "Category 5: Operations & Behavioral Safety",
        "cat_desc_5": "Ensuring smooth operational workflows, forklift safety, and prohibited actions.",
        
        "tag_helmet": "NO HELMET DETECTED! ⚠️",
        "tag_vest": "VEST: COMPLIANT ✅",
        "tag_gloves": "GLOVES: DETECTED ✅",
        "tag_goggles": "GOGGLES MISSING ⚠️",
        "tag_shoes": "SAFETY SHOES ✅",
        "tag_mask": "PROTECTIVE MASK ✅",
        "tag_hairnet": "HAIRNET: VERIFIED ✅",
        "tag_uniform": "OFFICIAL UNIFORM ✅",
        "tag_hygiene": "SANITY BYPASS ALERT ⚠️",
        "tag_intrusion": "FENCE INTRUSION 🚨",
        "tag_unauthorized": "UNAUTHORIZED ZONE ⛔",
        "tag_theft": "THEFT SUSPECTED 🚨",
        "tag_baggage": "ABANDONED BAGGAGE ⚠️",
        "tag_loitering": "LOITERING ALERT (5 MIN) ⚠️",
        "tag_vandalism": "VANDALISM DETECTED 🚨",
        "tag_crowd": "HIGH CROWD DENSITY ⚠️",
        "tag_violence": "VIOLENCE / FIGHT DETECTED 🚨",
        "tag_running": "FAST RUNNING DETECTED ⚠️",
        "tag_traffic": "TRAFFIC CONGESTION 🚗",
        "tag_fire": "EARLY SMOKE & FIRE 🔥",
        "tag_fall": "HUMAN FALL DETECTED 🚑",
        "tag_spill": "LIQUID SPILL ON FLOOR 💧",
        "tag_drowning": "POOL DROWNING HAZARD 🏊",
        "tag_eating": "PROHIBITED EATING 🚫",
        "tag_forklift": "FORKLIFT PROXIMITY ALERT ⚠️",
        "tag_touching": "OBJECT TOUCHING ALERT 🛑",
        
        "title_alert_1": "1. Safety Helmet Detection",
        "title_alert_2": "2. Safety Vest Detection",
        "title_alert_3": "3. Safety Gloves Detection",
        "title_alert_4": "4. Protective Goggles Detection",
        "title_alert_5": "5. Safety Shoes Detection",
        "title_alert_6": "6. Protective Face Mask",
        "title_alert_7": "7. Hygienic Hairnet Check",
        "title_alert_8": "8. Official Uniform Check",
        "title_alert_9": "9. Sanitization & Hygiene Bypass",
        "title_alert_10": "10. Perimeter Fence Intrusion",
        "title_alert_11": "11. Unauthorized Area Entry",
        "title_alert_12": "12. Theft & Shoplifting Motion",
        "title_alert_13": "13. Abandoned Unattended Baggage",
        "title_alert_14": "14. Suspicious Loitering Alert",
        "title_alert_15": "15. Facility Vandalism Detection",
        "title_alert_16": "16. High Crowd Density Warning",
        "title_alert_17": "17. Violence & Fight Detection",
        "title_alert_18": "18. Fast Running in Hallway",
        "title_alert_19": "19. Traffic Congestion Alert",
        "title_alert_20": "20. Early Smoke & Fire Alarm",
        "title_alert_21": "21. Human Fall Detection",
        "title_alert_22": "22. Floor Liquid Spill Hazard",
        "title_alert_23": "23. Pool Drowning Alert",
        "title_alert_24": "24. Prohibited Eating on Line",
        "title_alert_25": "25. Forklift Proximity Warning",
        "title_alert_26": "26. Museum Object Touching",

        "dash_sec_subtitle": "Interactive Security SOC Console",
        "dash_sec_title": "VEXORA SMART SAFETY DASHBOARD",
        "dash_sec_desc": "Live monitoring dashboard reflecting the real Vexora system console with real-time video stream.",
        "dash_brand_title": "Main Investment Facility",
        "dash_brand_sub": "VEXORA ENTERPRISE CONSOLE | SMART SAFETY DASHBOARD",
        "dash_status_badge": "SECURE & ACTIVE 🟢",
        "dash_license_warning": "⚠️ Notice: Active 15-Day Trial License. System running at peak capacity.",
        "dash_lbl_alltime": "All-Time / Today",
        "dash_lbl_top_violation": "Peak Violation",
        "dash_chart_title": "Violation Frequency Rate 📈",
        "dash_tab_main": "Main Gate",
        "dash_tab_top": "Upper Gate",
        "dash_enabled_alerts_title": "Active Enabled Alerts",
        "dash_stream_cam_name": "📹 Main Entrance Camera",
        "dash_people_count_lbl": "Current People (Main Gate):",
        "dash_scen_label": "🕹️ Test AI Scenario:",
        "dash_scen_reset": "Reset Feed",
        "dash_scen_gloves": "⚠️ Gloves Violation",
        "dash_scen_intruder": "🚨 Gate Breach",
        "dash_scen_fire": "🔥 Smoke Alarm",
        "dash_recent_violations_title": "Recent Violations Log (18)",
        "tbl_col_time": "Time",
        "tbl_col_cam": "Camera",
        "tbl_col_type": "Violation Type",
        "tbl_col_person": "Person ID",
        "tag_secure_stream": "SECURE STREAM 🟢",
        "tag_danger_zone": "DANGER ZONE ⚠️",
        "dash_stream_meta": "CAM: 01 | PORT: 5000 | RES: 640x480"
    }
};

function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    
    document.body.className = `theme-vexora lang-${lang}`;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    const langBtnText = document.getElementById('lang-switch-text');
    if (langBtnText) langBtnText.textContent = lang === 'ar' ? 'English' : 'العربية';
    
    const langBtnDash = document.getElementById('lang-switch-text-dash');
    if (langBtnDash) langBtnDash.textContent = lang === 'ar' ? 'English' : 'العربية';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(currentLanguage);
}
