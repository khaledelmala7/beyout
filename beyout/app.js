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

const translations = {
    ar: {
        "sec_desc_gen": "تأمين وتحليل الأنشطة عبر كاميرات المراقبة.",
        "sec_title_1": "مواقع إنشائية",
        "sec_feat_1_1": "🎯 خوذة السلامة",
        "sec_feat_1_2": "🎯 السترة الواقية",
        "sec_feat_1_3": "🎯 القفازات",
        "sec_feat_1_4": "🎯 نظارة الأمان",
        "sec_feat_1_5": "🎯 حذاء السلامة",
        "sec_feat_1_6": "🎯 اقتحام منطقة الخطر",
        "sec_feat_1_7": "🎯 سقوط العامل",
        "sec_title_2": "مصانع (أغذية وصناعية)",
        "sec_feat_2_1": "🎯 الكمامة الواقية",
        "sec_feat_2_2": "🎯 القفازات",
        "sec_feat_2_3": "🎯 غطاء الرأس",
        "sec_feat_2_4": "🎯 النظافة العامة",
        "sec_feat_2_5": "🎯 اقتحام منطقة الخطر",
        "sec_feat_2_6": "🎯 اكتشاف حريق/دخان",
        "sec_title_3": "مدارس وجامعات",
        "sec_feat_3_1": "🎯 اقتحام الأسوار",
        "sec_feat_3_2": "🎯 تجمعات غير طبيعية",
        "sec_feat_3_3": "🎯 عنف أو مشاجرة",
        "sec_feat_3_4": "🎯 الركض في الممرات",
        "sec_title_4": "مستشفيات ورعاية صحية",
        "sec_feat_4_1": "🎯 الكمامة الواقية",
        "sec_feat_4_2": "🎯 تعقيم اليدين",
        "sec_feat_4_3": "🎯 الازدحام",
        "sec_feat_4_4": "🎯 سقوط مريض",
        "sec_feat_4_5": "🎯 أجسام مشبوهة",
        "sec_title_5": "مولات تجارية ومتاجر",
        "sec_feat_5_1": "🎯 السرقة المنظمة",
        "sec_feat_5_2": "🎯 الازدحام الشديد",
        "sec_feat_5_3": "🎯 حقيبة متروكة",
        "sec_feat_5_4": "🎯 عنف أو مشاجرة",
        "sec_title_6": "مباني إدارية وبنوك",
        "sec_feat_6_1": "🎯 تتبع / دخول غير مصرح",
        "sec_feat_6_2": "🎯 حقيبة متروكة",
        "sec_feat_6_3": "🎯 مشاجرات",
        "sec_feat_6_4": "🎯 دخول بعد الدوام",
        "sec_title_7": "مطارات ومحطات",
        "sec_feat_7_1": "🎯 حقيبة متروكة / جسم مشبوه",
        "sec_feat_7_2": "🎯 تجمعات غير طبيعية",
        "sec_feat_7_3": "🎯 أحداث شغب",
        "sec_feat_7_4": "🎯 تخطي الحواجز الأمنية",
        "sec_title_8": "مخازن ولوجستيات",
        "sec_feat_8_1": "🎯 السترة الواقية",
        "sec_feat_8_2": "🎯 الخوذة",
        "sec_feat_8_3": "🎯 اقتراب رافعة شوكية من الأفراد",
        "sec_feat_8_4": "🎯 مناطق التحميل والتنزيل",
        "sec_feat_8_5": "🎯 اكتشاف حريق/دخان",
        "sec_title_9": "فنادق ومنتجعات",
        "sec_feat_9_1": "🎯 دخول غير مصرح",
        "sec_feat_9_2": "🎯 حقيبة متروكة",
        "sec_feat_9_3": "🎯 أمان المسابح",
        "sec_feat_9_4": "🎯 التزام بزي الموظفين",
        "sec_feat_9_5": "🎯 اكتشاف حريق/دخان",
        "sec_title_10": "هايبر ماركت وسوبر ماركت",
        "sec_feat_10_1": "🎯 السرقة المنظمة",
        "sec_feat_10_2": "🎯 تكدس عند الكاشير",
        "sec_feat_10_3": "🎯 انسكاب سوائل على الأرض",
        "sec_feat_10_4": "🎯 حريق أو دخان",
        "sec_title_11": "مطاعم وكافيهات",
        "sec_feat_11_1": "🎯 النظافة العامة / تعقيم اليدين",
        "sec_feat_11_2": "🎯 غطاء الرأس / قفازات للطهاة",
        "sec_feat_11_3": "🎯 زي الموظفين",
        "sec_feat_11_4": "🎯 الازدحام",
        "sec_title_12": "مواقف السيارات",
        "sec_feat_12_1": "🎯 تسكع مريب حول السيارات",
        "sec_feat_12_2": "🎯 مشاجرات",
        "sec_feat_12_3": "🎯 حريق سيارة",
        "sec_feat_12_4": "🎯 دخول سيارات غير مصرحة",
        "sec_title_13": "متاحف ومعارض",
        "sec_feat_13_1": "🎯 لمس المعروضات / الاقتراب الشديد",
        "sec_feat_13_2": "🎯 حقيبة متروكة",
        "sec_feat_13_3": "🎯 الازدحام",
        "sec_feat_13_4": "🎯 دخول مناطق محظورة",
        "sec_title_14": "شوارع ومدن ذكية",
        "sec_feat_14_1": "🎯 ازدحام مروري / توقف مفاجئ",
        "sec_feat_14_2": "🎯 تخريب الممتلكات العامة",
        "sec_feat_14_3": "🎯 أحداث عنف أو شغب",
        "sec_feat_14_4": "🎯 تجمعات غير طبيعية",
        "nav_home": "الرئيسية",
        "nav_solutions": "الحلول",
        "nav_products": "المنتجات",
        "nav_blog": "المدونة",
        "nav_contact": "اتصل بنا",
        "nav_to_vexora": "فيكسورا للأمن (B2B)",
        
        "beyout_page_title": "بيوت | أنظمة المنازل الذكية الفاخرة",
        "beyout_hero_title": "عيش الذكاء والأناقة في منزلك",
        "beyout_hero_subtitle": "حلول بيوت الذكية المتكاملة لحياة عصرية مريحة.",
        "btn_start_now": "ابدأ الآن",
        
        "packages_subtitle": "باقات بيوت المخصصة",
        "packages_title": "اختر الباقة المناسبة لمساحة منزلك",
        "packages_desc": "نقدم حلولاً ذكية متكاملة تناسب جميع المساحات بأسعار مرنة وعروض مخصصة بعد الاستشارة.",
        
        "pkg_title_bodyguard": "باقة الحارس الشخصي (للمخازن)",
        "pkg_desc_bodyguard": "حلول تأمين ذكية متطورة للمخازن وأمن الأصول.",
        "pkg_feat_bodyguard_1": "🚶‍♂️ حساس حركة ذكي لرصد الحركة المشبوهة.",
        "pkg_feat_bodyguard_2": "🚨 سرينة إنذار قوية وصاخبة لردع المتسللين.",
        "pkg_feat_bodyguard_3": "📱 تنبيه فوري لحظي بالثواني على الموبايل.",
        "pkg_feat_bodyguard_4": "🛡️ تأمين كامل للمخازن والمستودعات.",
        
        "pkg_title_studio": "باقة الاستوديو",
        "pkg_desc_studio": "أتمتة وحلول ذكية مخصصة للاستوديوهات والمساحات المفتوحة.",
        "pkg_feat_studio_1": "💡 تحكم ذكي كامل بالإضاءة (ON/OFF).",
        "pkg_feat_studio_2": "💎 مفاتيح زجاجية ذكية تعمل باللمس.",
        "pkg_feat_studio_3": "🔒 مستشعر ذكي لتسريب الغاز الطبيعي.",
        "pkg_feat_studio_4": "📱 التحكم والمراقبة بالكامل عبر الموبايل.",
        
        "pkg_title_2room": "باقة شقة غرفتين",
        "pkg_desc_2room": "أتمتة ذكية متكاملة تناسب الشقق ذات الغرفتين وصالة.",
        "pkg_feat_2room_1": "💡 إضاءة ذكية لغرفتين نوم وصالة المعيشة.",
        "pkg_feat_2room_2": "❄️ تحكم ذكي بمكيف الهواء والتكييفات.",
        "pkg_feat_2room_3": "🚶‍♂️ مستشعرات حركة ذكية لإضاءة الممرات تلقائياً.",
        "pkg_feat_2room_4": "🔒 مستشعر أمان المطبخ وقفل الغاز الرئيسي.",
        
        "pkg_title_3room": "باقة شقة ثلاث غرف",
        "pkg_desc_3room": "تحكم شامل للشقق الكبيرة والعائلية لرفاهية لا تقاوم.",
        "pkg_feat_3room_1": "🛋️ تحكم كامل بالستائر الكهربائية والتكييفات.",
        "pkg_feat_3room_2": "🌈 إضاءة ديكورية تفاعلية مدمجة للريسبشن.",
        "pkg_feat_3room_3": "💧 نظام رصد تسريب المياه والفيضان الذكي.",
        "pkg_feat_3room_4": "🗣️ توافق كامل مع التحكم الصوتي (Alexa/Siri).",
        
        "pkg_title_duplex": "باقة شقة دوبلكس",
        "pkg_desc_duplex": "تحكم ذكي وأمان شامل متقاطع للشقق ذات الطابقين.",
        "pkg_feat_duplex_1": "🚪 تحكم ذكي ببوابات الشقة وقفل البصمة.",
        "pkg_feat_duplex_2": "🎬 تفعيل سيناريو وضع السينما والمسرح المنزلي.",
        "pkg_feat_duplex_3": "🔌 مقابس ذكية (Smart Plugs) لحماية الأجهزة.",
        "pkg_feat_duplex_4": "🛡️ تأمين شامل للمخارج والأدوار المتعددة.",
        
        "pkg_title_villa": "باقة فيلا (أرضي وأول وروف)",
        "pkg_desc_villa": "أتمتة متكاملة ثلاثية المستويات للفلل والقصور والحدائق.",
        "pkg_feat_villa_1": "🌿 نظام ري الحديقة واللاندسكيب الذكي.",
        "pkg_feat_villa_2": "🚗 تحكم تلقائي ببوابات الجراج والسيارات.",
        "pkg_feat_villa_3": "✈️ وضع السفر ومحاكاة الوجود للتأمين.",
        "pkg_feat_villa_4": "🏊‍♂️ تحكم ذكي بالطوابق الثلاثة (أرضي، أول، وروف).",
        
        "price_after_call": "الأسعار بعد الاتصال",
        "pkg_cta_btn_mock": "اختر الخطة",
        
        "sandbox_subtitle": "منطقة المحاكاة المتكاملة",
        "sandbox_title_beyout": "جرّب لوحة تحكم منزلك الذكي بنفسك",
        "sandbox_desc_beyout": "اختبر التفاعل الحقيقي وعش تجربة العميل. تحكم في إضاءة وتكييف وأبواب الفيلا الذكية.",
        "sandbox_house_living": "غرفة المعيشة",
        "sandbox_house_kitchen": "المطبخ",
        "sandbox_house_bedroom": "غرفة النوم الرئيسية",
        "sandbox_house_garden": "الحديقة والمدخل",
        "sandbox_ctrl_title": "أدوات التحكم بالمنزل الذكي",
        "sandbox_ctrl_desc": "اضغط على المفاتيح أدناه لمحاكاة إرسال أوامر التحكم بالمنزل وشاهد الاستجابة بالرسم التخطيطي.",
        "sandbox_ctrl_living_light": "إضاءة غرفة المعيشة",
        "sandbox_ctrl_kitchen_light": "إضاءة المطبخ",
        "sandbox_ctrl_bedroom_ac": "تكييف غرفة النوم (AC)",
        "sandbox_ctrl_ac_temp": "درجة حرارة المكيف: ",
        "sandbox_ctrl_security": "أمان قفل البوابة والحديقة",
        "sandbox_ctrl_security_status_lbl": "حالة البوابة: ",
        "sandbox_ctrl_secured_val": "مغلقة ومؤمنة",
        "sandbox_ctrl_unsecured_val": "ملغية التأمين - الحديقة نشطة!",
        "sandbox_ctrl_welcome_msg": "أهلاً بك! قم بتشغيل أو إطفاء الأجهزة لتجربة النظام الذكي.",
        
        "form_section_title": "ابدأ رحلتك معنا اليوم",
        "form_section_subtitle": "احجز نسختك التجريبية والمجانية (Demo) وسيتواصل معك مستشارونا فورياً",
        "form_step1_lbl": "المنتج المطلوب",
        "form_step2_lbl": "بياناتك",
        "form_step3_lbl": "التفاصيل والوقت",
        "form_step4_lbl": "تأكيد الطلب",
        "form_step1_title_beyout": "هل ترغب في ترقية منزلك بالكامل؟",
        
        "form_product_lumora_desc": "أنظمة التحكم الكاملة والمنازل الذكية الفاخرة.",
        "form_btn_next": "التالي ←",
        "form_btn_prev": "→ السابق",
        "form_btn_submit": "تأكيد طلب الديمو مجاناً 🚀",
        
        "form_step2_title": "أخبرنا بالمزيد عنك لنتمكن من التواصل معك",
        "form_lbl_name": "الاسم بالكامل ",
        "form_lbl_email": "البريد الإلكتروني ",
        "form_lbl_phone": "رقم الهاتف / الواتساب ",
        
        "form_step3_title": "متى ترغب في عقد جلسة العرض (الديمو)؟",
        "form_lbl_date": "التاريخ المفضل ",
        "form_lbl_time": "الوقت المفضل للاتصال ",
        "form_time_choose": "اختر الوقت المناسب",
        "form_time_morning": "صباحاً (9:00 ص - 12:00 م)",
        "form_time_afternoon": "بعد الظهر (12:00 م - 4:00 م)",
        "form_time_evening": "مساءً (4:00 م - 8:00 م)",
        "form_lbl_notes_beyout": "أكبر تحدي أو متطلبات معينة تود مناقشتها؟",
        
        "form_success_thanks": "شكراً لطلبك، ",
        "form_success_desc_beyout": "تم تسجيل طلبك بنجاح لحجز ديمو خاص بأنظمة بيوت الذكية.",
        "form_success_schedule": "موعدك المقترح: ",
        "form_success_period": " في الفترة الـ ",
        "form_success_whatsapp": "سنقوم بإرسال رسالة تأكيد على واتساب برقم ",
        "form_success_whatsapp_sub": " وتفاصيل الاجتماع خلال ساعة.",
        "form_success_reset_btn": "طلب حجز جديد",
        
        "footer_about_text_beyout": "مستشارك وشريكك التكنولوجي الموثوق لتصميم وبناء أنظمة التحكم والمنازل الذكية الفاخرة.",
        "footer_links_title": "روابط سريعة",
        "footer_copyright": "&copy; 2026 شركة بيوت (Beyout). جميع الحقوق محفوظة."
    },
    en: {
        "sec_desc_gen": "Securing and analyzing activities via surveillance cameras.",
        "sec_title_1": "Construction Sites",
        "sec_feat_1_1": "🎯 Safety Helmet Detection",
        "sec_feat_1_2": "🎯 Safety Vest Detection",
        "sec_feat_1_3": "🎯 Gloves Detection",
        "sec_feat_1_4": "🎯 Safety Goggles Detection",
        "sec_feat_1_5": "🎯 Safety Shoes Detection",
        "sec_feat_1_6": "🎯 Danger Zone Intrusion",
        "sec_feat_1_7": "🎯 Worker Fall Detection",
        "sec_title_2": "Factories (Food & Industrial)",
        "sec_feat_2_1": "🎯 Protective Mask Detection",
        "sec_feat_2_2": "🎯 Gloves Detection",
        "sec_feat_2_3": "🎯 Head Cover Detection",
        "sec_feat_2_4": "🎯 General Hygiene Monitoring",
        "sec_feat_2_5": "🎯 Danger Zone Intrusion",
        "sec_feat_2_6": "🎯 Fire & Smoke Detection",
        "sec_title_3": "Schools & Universities",
        "sec_feat_3_1": "🎯 Fence Climbing Detection",
        "sec_feat_3_2": "🎯 Unusual Crowd Gathering",
        "sec_feat_3_3": "🎯 Violence & Fight Detection",
        "sec_feat_3_4": "🎯 Running in Corridors",
        "sec_title_4": "Hospitals & Healthcare",
        "sec_feat_4_1": "🎯 Face Mask Compliance",
        "sec_feat_4_2": "🎯 Hand Sanitization Check",
        "sec_feat_4_3": "🎯 Crowd Detection",
        "sec_feat_4_4": "🎯 Patient Fall Detection",
        "sec_feat_4_5": "🎯 Suspicious Objects",
        "sec_title_5": "Malls & Retail Stores",
        "sec_feat_5_1": "🎯 Organized Theft Detection",
        "sec_feat_5_2": "🎯 Heavy Crowding",
        "sec_feat_5_3": "🎯 Abandoned Baggage",
        "sec_feat_5_4": "🎯 Violence & Fights",
        "sec_title_6": "Office Buildings & Banks",
        "sec_feat_6_1": "🎯 Tailgating / Unauthorized Entry",
        "sec_feat_6_2": "🎯 Abandoned Baggage",
        "sec_feat_6_3": "🎯 Fights Detection",
        "sec_feat_6_4": "🎯 After-hours Entry",
        "sec_title_7": "Airports & Stations",
        "sec_feat_7_1": "🎯 Left Luggage / Suspicious Object",
        "sec_feat_7_2": "🎯 Unusual Crowding",
        "sec_feat_7_3": "🎯 Commotion/Riot Detection",
        "sec_feat_7_4": "🎯 Barrier Crossing Detection",
        "sec_title_8": "Warehouses & Logistics",
        "sec_feat_8_1": "🎯 Safety Vest Compliance",
        "sec_feat_8_2": "🎯 Safety Helmet Compliance",
        "sec_feat_8_3": "🎯 Forklift Proximity Warning",
        "sec_feat_8_4": "🎯 Loading Zone Safety",
        "sec_feat_8_5": "🎯 Smoke & Fire Detection",
        "sec_title_9": "Hotels & Resorts",
        "sec_feat_9_1": "🎯 Unauthorized Access",
        "sec_feat_9_2": "🎯 Abandoned Luggage",
        "sec_feat_9_3": "🎯 Pool Area Security",
        "sec_feat_9_4": "🎯 Staff Uniform Compliance",
        "sec_feat_9_5": "🎯 Smoke & Fire Detection",
        "sec_title_10": "Hypermarkets & Supermarkets",
        "sec_feat_10_1": "🎯 Shoplifting Detection",
        "sec_feat_10_2": "🎯 Checkout Queue Crowding",
        "sec_feat_10_3": "🎯 Liquid Spills on Floor",
        "sec_feat_10_4": "🎯 Smoke & Fire Detection",
        "sec_title_11": "Restaurants & Cafes",
        "sec_feat_11_1": "🎯 Hygiene & Hand Sanitizing",
        "sec_feat_11_2": "🎯 Chef Hairnet & Gloves Compliance",
        "sec_feat_11_3": "🎯 Staff Uniform Compliance",
        "sec_feat_11_4": "🎯 Crowding Detection",
        "sec_title_12": "Parking Lots",
        "sec_feat_12_1": "🎯 Loitering Around Vehicles",
        "sec_feat_12_2": "🎯 Fights & Commotions",
        "sec_feat_12_3": "🎯 Vehicle Fire Detection",
        "sec_feat_12_4": "🎯 Unauthorized Vehicle Entry",
        "sec_title_13": "Museums & Exhibitions",
        "sec_feat_13_1": "🎯 Exhibit Touching / Proximity Alert",
        "sec_feat_13_2": "🎯 Abandoned Object",
        "sec_feat_13_3": "🎯 Crowd Detection",
        "sec_feat_13_4": "🎯 Restricted Area Entry",
        "sec_title_14": "Smart Streets & Cities",
        "sec_feat_14_1": "🎯 Traffic Jam / Sudden Stop",
        "sec_feat_14_2": "🎯 Public Property Vandalism",
        "sec_feat_14_3": "🎯 Violence or Riot Detection",
        "sec_feat_14_4": "🎯 Unusual Crowd Gathering",
        "nav_home": "Home",
        "nav_solutions": "Solutions",
        "nav_products": "Products",
        "nav_blog": "Blog",
        "nav_contact": "Contact Us",
        "nav_to_vexora": "Vexora Security (B2B)",
        
        "beyout_page_title": "Beyout | Luxury Smart Home Systems",
        "beyout_hero_title": "Live Intelligence & Elegance inside Your Home",
        "beyout_hero_subtitle": "Integrated Beyout smart solutions for a comfortable modern life.",
        "btn_start_now": "Start Now",
        
        "packages_subtitle": "Custom Beyout Packages",
        "packages_title": "Choose the Perfect Package for Your Home",
        "packages_desc": "We offer integrated smart solutions tailored to all property sizes with flexible pricing upon contact.",
        
        "pkg_title_bodyguard": "Bodyguard Package (for Warehouses)",
        "pkg_desc_bodyguard": "Intelligent high-security solutions for warehouses and asset protection.",
        "pkg_feat_bodyguard_1": "🚶‍♂️ Smart motion sensor to detect suspicious activity.",
        "pkg_feat_bodyguard_2": "🚨 Loud security alarm siren to deter intruders.",
        "pkg_feat_bodyguard_3": "📱 Instant real-time alerts sent to your mobile phone.",
        "pkg_feat_bodyguard_4": "🛡️ Total protection for warehouses and store rooms.",
        
        "pkg_title_studio": "Studio Package",
        "pkg_desc_studio": "Custom automation and smart controls for studios and open spaces.",
        "pkg_feat_studio_1": "💡 Smart light control (ON/OFF).",
        "pkg_feat_studio_2": "💎 Touch-sensitive luxury glass switch panels.",
        "pkg_feat_studio_3": "🔒 Smart natural gas leakage detector.",
        "pkg_feat_studio_4": "📱 Full system control and monitoring via mobile app.",
        
        "pkg_title_2room": "2-Room Apartment Package",
        "pkg_desc_2room": "Complete smart automation tailored to 2-bedroom apartments.",
        "pkg_feat_2room_1": "💡 Smart lighting for 2 bedrooms and the living room.",
        "pkg_feat_2room_2": "❄️ Smart control for air conditioning units.",
        "pkg_feat_2room_3": "🚶‍♂️ Motion sensors to automatically light up hallways.",
        "pkg_feat_2room_4": "🔒 Kitchen gas detector and main gas safety valve.",
        
        "pkg_title_3room": "3-Room Apartment Package",
        "pkg_desc_3room": "Comprehensive automation for large apartments and families.",
        "pkg_feat_3room_1": "🛋️ Full control for smart motorized curtains and AC.",
        "pkg_feat_3room_2": "🌈 Decorative interactive accent lights for the reception.",
        "pkg_feat_3room_3": "💧 Smart water leak and flood detection system.",
        "pkg_feat_3room_4": "🗣️ Voice assistant compatibility (Alexa/Siri).",
        
        "pkg_title_duplex": "Duplex Apartment Package",
        "pkg_desc_duplex": "Smart automation and multi-level security for duplexes.",
        "pkg_feat_duplex_1": "🚪 Smart locks with biometric fingerprint access.",
        "pkg_feat_duplex_2": "🎬 Custom home cinema and theater preset scene.",
        "pkg_feat_duplex_3": "🔌 Smart plugs to protect appliances and manage load.",
        "pkg_feat_duplex_4": "🛡️ Total security for multi-level access points.",
        
        "pkg_title_villa": "Villa Package (Ground, First & Roof)",
        "pkg_desc_villa": "Three-level complete automation for villas, gardens, and pools.",
        "pkg_feat_villa_1": "🌿 Smart landscape and garden irrigation system.",
        "pkg_feat_villa_2": "🚗 Automatic control for garage and entrance gates.",
        "pkg_feat_villa_3": "✈️ Travel mode and presence simulation for deterrence.",
        "pkg_feat_villa_4": "🏊‍♂️ Smart control for pool filtering and all three levels.",
        
        "price_after_call": "Pricing Upon Consultation",
        "pkg_cta_btn_mock": "Choose Plan",
        
        "sandbox_subtitle": "Interactive Simulator Sandbox",
        "sandbox_title_beyout": "Try Out the Smart Home Dashboard Yourself",
        "sandbox_desc_beyout": "Test real interactions and live the customer experience. Control the lighting, AC, and doors of the smart villa.",
        "sandbox_house_living": "Living Room",
        "sandbox_house_kitchen": "Kitchen",
        "sandbox_house_bedroom": "Master Bedroom",
        "sandbox_house_garden": "Garden & Entrance",
        "sandbox_ctrl_title": "Smart Home Control Tools",
        "sandbox_ctrl_desc": "Toggle the switches below to simulate sending smart home commands and watch the immediate visual feedback.",
        "sandbox_ctrl_living_light": "Living Room Light",
        "sandbox_ctrl_kitchen_light": "Kitchen Light",
        "sandbox_ctrl_bedroom_ac": "Master Bedroom AC",
        "sandbox_ctrl_ac_temp": "AC Temp: ",
        "sandbox_ctrl_security": "Gate & Garden Security",
        "sandbox_ctrl_security_status_lbl": "Gate Status: ",
        "sandbox_ctrl_secured_val": "Locked & Secured",
        "sandbox_ctrl_unsecured_val": "Unlocked - Garden Active!",
        "sandbox_ctrl_welcome_msg": "Welcome! Toggle devices to experience the smart system.",
        
        "form_section_title": "Start Your Journey With Us Today",
        "form_section_subtitle": "Book your free personalized Demo session and our consultants will reach out shortly",
        "form_step1_lbl": "Requested Product",
        "form_step2_lbl": "Contact Info",
        "form_step3_lbl": "Schedule & Notes",
        "form_step4_lbl": "Confirmation",
        "form_step1_title_beyout": "Would you like to upgrade your home to a smart home?",
        
        "form_product_lumora_desc": "Complete smart home control and luxury automation systems.",
        "form_btn_next": "Next Step ←",
        "form_btn_prev": "→ Previous",
        "form_btn_submit": "Confirm Free Demo Request 🚀",
        
        "form_step2_title": "Tell us more about yourself to get in touch",
        "form_lbl_name": "Full Name ",
        "form_lbl_email": "Email Address ",
        "form_lbl_phone": "Phone / WhatsApp Number ",
        
        "form_step3_title": "When would you like to schedule the Demo session?",
        "form_lbl_date": "Preferred Date ",
        "form_lbl_time": "Preferred Call Time ",
        "form_time_choose": "Choose a convenient time",
        "form_time_morning": "Morning (9:00 AM - 12:00 PM)",
        "form_time_afternoon": "Afternoon (12:00 PM - 4:00 PM)",
        "form_time_evening": "Evening (4:00 PM - 8:00 PM)",
        "form_lbl_notes_beyout": "What is your biggest challenge or specific requirements?",
        
        "form_success_thanks": "Thank you for your request, ",
        "form_success_desc_beyout": "Your request has been registered successfully to book a demo for Beyout smart systems.",
        "form_success_schedule": "Your suggested date: ",
        "form_success_period": " during the ",
        "form_success_whatsapp": "We will send a confirmation message on WhatsApp and phone to ",
        "form_success_whatsapp_sub": " with meeting details within an hour.",
        "form_success_reset_btn": "Request a New Booking",
        
        "footer_about_text_beyout": "Your trusted technology partner and consultant for smart home control and luxury automation.",
        "footer_links_title": "Quick Links",
        "footer_copyright": "&copy; 2026 Beyout. All Rights Reserved."
    }
};
