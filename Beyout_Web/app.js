// Beyout Smart Home Application Logic
const TELEGRAM_CHAT_ID = '8641170921';
const TELEGRAM_BOT_TOKEN = '8811745328:AAFC-kFEk2jChMzCEYyg2lMyzUa4lFn7BUQ';
let currentLanguage = (typeof localStorage !== 'undefined' && localStorage.getItem('beyout_lang')) ? localStorage.getItem('beyout_lang') : 'ar';
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
    const smartCard = document.getElementById('select-card-lumora');
    if (typeof chooseFormTrack === 'function') {
        chooseFormTrack('smart_home_b2c', smartCard);
    }
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

// Portfolio Gallery & Filtering + Catalog Navigation + Service Track Selection
function swapProjectImg(mainImgId, thumbEl) {
    const mainImg = document.getElementById(mainImgId);
    if (mainImg && thumbEl && thumbEl.src) {
        mainImg.src = thumbEl.src;
        const parentThumbs = thumbEl.parentElement;
        if (parentThumbs) {
            parentThumbs.querySelectorAll('img').forEach(img => img.classList.remove('active'));
        }
        thumbEl.classList.add('active');
    }
}

function filterPortfolio(category, btnEl) {
    document.querySelectorAll('.port-filter-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    document.querySelectorAll('.project-card').forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function scrollCatalog(direction) {
    const container = document.querySelector('.products-scroll-container');
    if (!container) return;
    const isRtl = document.documentElement.dir === 'rtl';
    const scrollAmount = 680 * direction * (isRtl ? -1 : 1);
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function jumpToCategory(catId, btnEl) {
    document.querySelectorAll('.cat-jump-pill').forEach(pill => pill.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const container = document.querySelector('.products-scroll-container');
    const targetHeader = document.getElementById(catId);
    if (container && targetHeader) {
        const groupEl = targetHeader.closest('.category-group') || targetHeader;
        const containerRect = container.getBoundingClientRect();
        const groupRect = groupEl.getBoundingClientRect();
        const offset = groupRect.left - containerRect.left + container.scrollLeft;
        container.scrollTo({ left: offset, behavior: 'smooth' });
    }
}

function chooseFormTrack(trackCode, cardEl) {
    selectedFormProduct = trackCode;
    const hiddenInput = document.getElementById('target_product_input');
    if (hiddenInput) hiddenInput.value = trackCode;

    document.querySelectorAll('.three-tracks-grid .select-card').forEach(c => c.classList.remove('selected'));
    if (cardEl) cardEl.classList.add('selected');
}

function selectServiceTrack(serviceKey) {
    const serviceNamesAr = {
        lc_data_fiber: 'أنظمة شبكات المعلومات والألياف الضوئية (Data & Fiber)',
        lc_cctv: 'أنظمة كاميرات المراقبة الأمنية (CCTV)',
        lc_fire_alarm: 'أنظمة إنذار الحريق المعتمدة (Fire Alarm)',
        lc_access_control: 'أنظمة التحكم في الدخول والحضور والانصراف (Access Control)',
        lc_sound_pa: 'الأنظمة الصوتية والإذاعة الداخلية واستدعاء الممرضات (Sound & Nurse Call)',
        lc_telephone_pbx: 'أنظمة السنترالات والاتصالات والإنتركم (IP-PBX & Intercom)',
        lc_queuing: 'أنظمة نداء العملاء والشاشات الرقمية (Queuing & Digital Signage)',
        lc_security_gates: 'البوابات الأمنية وأجهزة التفتيش والحواجز (Security Gates & X-Ray)'
    };
    const serviceNamesEn = {
        lc_data_fiber: 'Data Networks & Fiber Optic Systems',
        lc_cctv: 'CCTV Video Surveillance Systems',
        lc_fire_alarm: 'Addressable & Conventional Fire Alarm Systems',
        lc_access_control: 'Access Control & Time Attendance Systems',
        lc_sound_pa: 'Sound, Voice Evacuation & Nurse Call Systems',
        lc_telephone_pbx: 'IP-PBX Telephone & Intercom Systems',
        lc_queuing: 'Queue Management & Digital Signage Systems',
        lc_security_gates: 'Security Gates, X-Ray & Car Barriers'
    };

    const lcCard = document.getElementById('select-card-lc');
    chooseFormTrack('light_current_b2b', lcCard);

    const notesField = document.getElementById('cust_notes');
    if (notesField) {
        const srvName = (currentLanguage === 'ar') ? (serviceNamesAr[serviceKey] || serviceKey) : (serviceNamesEn[serviceKey] || serviceKey);
        notesField.value = (currentLanguage === 'ar')
            ? `أرغب في طلب مقايسة فنية / استشارة بخصوص: ${srvName}`
            : `I would like to request a technical quotation / consultation for: ${srvName}`;
    }
    nextStep(2);
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
    fetch("https://formsubmit.co/ajax/info@beyouttech.com", {
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
    const ownerPhone = "201064334334";
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
    document.querySelectorAll('.nav-links a:not(.nav-dropdown-trigger)').forEach(link => {
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
    
    document.body.className = `theme-beyout lang-${lang} ${lang === 'ar' ? 'rtl' : 'ltr'}`;
    if (typeof applySiteLanguage === 'function') applySiteLanguage(lang);
    
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
        "nav_dashboard": "لوحة التحكم",
        "live_dash_subtitle": "لوحة التحكم الأمنية للعملاء",
        "live_dash_title": "شاشة مراقبة حية لمشروعاتك (Construction Site Dashboard)",
        "live_dash_desc": "تحكم وتابع جميع مواقعك الإنشائية ومصانعك من شاشة تحكم موحدة ذكية تجمع تحليلات البث والتنبيهات الفورية.",
        "live_dash_panel_title": "موقع الإنشاءات الغربي - لوحة التحكم الأمنية",
        "live_dash_cam_active": "CAM 02 - منطقة العمل الرئيسية",
        "live_dash_log_no_helmet": "مخالفة أمنية: عامل بدون خوذة سلامة - منطقة العمل الرئيسية",
        "live_dash_log_truck": "مرور مركبة مصرحة: شاحنة نقل - البوابة الغربية",
        "sec_title_15": "مجمعات سكنية (كمبوند)",
        "sec_feat_15_1": "🎯 رصد تسلق الأسوار",
        "sec_feat_15_2": "🎯 التعرف على لوحات السيارات",
        "sec_feat_15_3": "🎯 تسكع مريب في الممرات",
        "sec_feat_15_4": "🎯 أمان منطقة المسابح",
        "sec_feat_15_5": "🎯 رصد دخان أو حريق",
        "dash_cameras_title": "القنوات النشطة",
        "dash_stats_title": "تحليلات النظام",
        "dash_cpu": "المعالج",
        "dash_fps": "الإطارات",
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
        
        "beyout_page_title": "بيوت تك | مقاولات التيار الخفيف والأنظمة الذكية",
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
        
        "footer_about_text_beyout": "شركة بيوت تك للمقاولات وأنظمة التيار الخفيف (Light Current) والحلول الذكية المتكاملة.",
        "footer_links_title": "روابط سريعة",
        "footer_copyright": "&copy; 2026 شركة بيوت تك للمقاولات وأنظمة التيار الخفيف (Beyout Tech). جميع الحقوق محفوظة.", "footer_address_val": "42 شارع أنقرة، شيراتون، القاهرة، مصر"
    },
    en: {
        "nav_dashboard": "Control Panel",
        "live_dash_subtitle": "Customer Security Console",
        "live_dash_title": "Live Smart Monitoring Dashboard for Your Projects",
        "live_dash_desc": "Monitor and manage all your construction sites and factories from a unified intelligent screen aggregating stream analytics and real-time alerts.",
        "live_dash_panel_title": "WEST-PORT CONSTRUCTION SITE - SECURITY CONSOLE",
        "live_dash_cam_active": "CAM 02 - Main Work Area",
        "live_dash_log_no_helmet": "Violation: Worker not wearing safety helmet - Main Work Area",
        "live_dash_log_truck": "Authorized Truck Entry - West Gate",
        "sec_title_15": "Residential Compounds",
        "sec_feat_15_1": "🎯 Fence Climbing Detection",
        "sec_feat_15_2": "🎯 License Plate Recognition",
        "sec_feat_15_3": "🎯 Suspicious Loitering",
        "sec_feat_15_4": "🎯 Pool Area Safety",
        "sec_feat_15_5": "🎯 Smoke & Fire Detection",
        "dash_cameras_title": "Active Channels",
        "dash_stats_title": "System Analytics",
        "dash_cpu": "CPU",
        "dash_fps": "FPS",
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
        
        "beyout_page_title": "Beyout Tech | Light Current & Smart Systems",
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
        
        "footer_about_text_beyout": "Beyout Tech for Contracting, Light Current Systems & Smart Automation Solutions.",
        "footer_links_title": "Quick Links",
        "footer_copyright": "&copy; 2026 Beyout Tech (Light Current & Contracting). All Rights Reserved.", "footer_address_val": "42 Ankara St., Sheraton, Cairo, Egypt"
    }
};


// Enterprise Light Current & Portfolio Translations (v3.0.0)
Object.assign(translations.ar, {
    "nav_home": "الرئيسية",
    "nav_about_us": "من نحن",
    "nav_lc_services": "أنظمة التيار الخفيف",
    "nav_lvmv": "الجهد المنخفض والمتوسط",
    "nav_solutions": "السمارت هوم",
    "nav_packages": "باقات بيوت سمارت هوم",
    "nav_products": "المنتجات",
    "nav_portfolio": "سابقة الأعمال",
    "nav_clients": "عملاؤنا",
    "nav_contact": "اطلب مقايسة",
    "beyout_page_title": "بيوت تك | مقاولات أنظمة التيار الخفيف والهندسة الكهربائية والحلول الذكية",
    "hero_kicker": "مقاولات التيار الخفيف • البنية التحتية • الأنظمة الأمنية • المباني الذكية",
    "beyout_hero_title": "شريكك الهندسي المتكامل لأنظمة التيار الخفيف والمقاولات الذكية",
    "beyout_hero_subtitle": "نُصمم وننفذ منظومات التيار الخفيف المتكاملة للمشروعات القومية، الصناعية، الإدارية، والسكنية بمعايير عالمية: من شبكات الألياف الضوئية والداتا، كاميرات المراقبة، إنذار الحريق، الصوتيات، والبوابات الأمنية، إلى شبكات الجهد المتوسط والمنخفض وأتمتة المباني والبيوت الذكية (BMS & Smart Home).",
    "btn_explore_lc": "استكشف أنظمة التيار الخفيف",
    "btn_view_portfolio": "<i class=\"fas fa-briefcase\"></i> سابقة الأعمال والمشروعات",
    "btn_smarthome_pkgs": "باقات السمارت هوم <i class=\"fas fa-arrow-left\"></i>",
    "hero_cert_1": "اختبارات قياسية معتمدة (Fluke & OTDR)",
    "hero_cert_2": "أعلى معايير السلامة والجودة الهندسية",
    "hero_cert_3": "توريد وتركيب وصيانة شاملة (Turnkey)",
    "mosaic_tag_1": "مشروعات قومية وبنية تحتية",
    "mosaic_title_1": "شبكات ألياف ضوئية وتيار خفيف بمعايير عالمية",
    "mosaic_mini_1": "شبكات الداتا والفايبر",
    "mosaic_mini_2": "إنذار الحريق والأمن",
    "mosaic_mini_3": "أتمتة المباني والسمارت هوم",
    "stat_lbl_1": "عميل ومشروع منفذ بنجاح",
    "stat_lbl_2": "كابلات ألياف ضوئية وشبكات داتا",
    "stat_lbl_3": "محول وموزع جهد منخفض ومتوسط",
    "stat_lbl_4": "اعتمادية واختبارات قياسية (Fluke & OTDR)",
    "about_sec_subtitle": "الهوية المؤسسية • من نحن",
    "about_sec_title": "الحل الهندسي المتكامل (One-Stop-Shop) للمقاولات والتيار الخفيف",
    "about_sec_desc": "نحن شركة هندسية متكاملة متخصصة في أنظمة التيار الخفيف، الأنظمة الأمنية، الشبكات الكهربائية، والمقاولات. بفضل سنوات من الخبرة الميدانية وفريق هندسي وفني عالي الكفاءة، نُنفذ المشروعات الكبرى والمتوسطة والصغيرة من مرحلة الدراسة والتصميم وحتى التوريد والتركيب والاختبار والتسليم النهائي.",
    "vm_about_title": "من نحن (About Us)",
    "vm_about_desc": "وجهة هندسية شاملة تجمع بين مقاولات التيار الخفيف، الأنظمة الأمنية المتطورة، أتمتة المباني، وشبكات القوى الكهربائية، لتلبية كافة احتياجات المنشآت بأعلى درجات الأمان والاعتمادية.",
    "vm_vision_title": "رؤيتنا (Our Vision)",
    "vm_vision_desc": "الريادة في تقديم أعلى مستويات الهندسة الكهربائية وحلول التيار الخفيف والأمن المتكامل والإنشاءات، لحماية عملائنا وممتلكاتهم وتعزيز استدامة وكفاءة المباني بأحدث التقنيات العالمية.",
    "vm_mission_title": "رسالتنا وهدفنا (Our Mission & Goal)",
    "vm_mission_desc": "تقديم خدمات هندسية استثنائية وحلول متكاملة تتجاوز توقعات عملائنا وبناء شراكات طويلة الأمد، مع الالتزام الصارم بتسليم المشروعات في الموعد المحدد، وضمن الميزانية، وبأعلى معايير الجودة.",
    "vm_safety_title": "أولويتنا القصوى: السلامة (Safety First)",
    "vm_safety_desc": "الأولوية رقم واحد في كافة مواقعنا هي ضمان سلامة المهندسين والفنيين والجمهور والمنشآت، مع تطبيق صارم لمعايير السلامة المهنية (HSE) والاختبارات القياسية المعتمدة.",
    "industries_strip_title": "القطاعات الحيوية التي نخدمها بحلول التيار الخفيف:",
    "ind_1": "القطاع التجاري والإداري والبنوك",
    "ind_2": "المصانع والمدن الصناعية",
    "ind_3": "المستشفيات والرعاية الصحية",
    "ind_4": "الجامعات والمؤسسات التعليمية",
    "ind_5": "الفنادق والمنتجعات السياحية",
    "ind_6": "المجمعات السكنية والفلل الذكية",
    "lc_sec_subtitle": "خدمات وحلول التيار الخفيف المتكاملة (Light Current Systems)",
    "lc_sec_title": "منظومة هندسية شاملة لأنظمة التيار الخفيف والاتصالات والأمن",
    "lc_sec_desc": "نُعزز الكفاءة التشغيلية والراحة والتأمين الشامل لمباني ومشروعات عملائنا عبر دمج وأتمتة كافة أنظمة الجهد المنخفض والتيار الخفيف بحلول قابلة للتوسع وعالية الجدوى الاقتصادية.",
    "lc_srv1_title": "أنظمة شبكات المعلومات والألياف الضوئية",
    "lc_srv1_desc": "تأسيس وبناء البنية التحتية لشبكات الاتصالات ونقل البيانات فائقة السرعة للمباني والمشروعات القومية.",
    "lc_srv1_b1": "كابلات النحاس UTP Cat6 / Cat6a والباتش كورد (سحب، تيرمينيشن، واختبار Fluke Test).",
    "lc_srv1_b2": "كابلات الألياف الضوئية Fiber Optic ومشتملاتها (سحب، لحام Splicing، واختبار OTDR).",
    "lc_srv1_b3": "توريد كابلات التحكم الصناعي RS485 وتنظيم وتقفيل كبائن الراكات Racks والمسارات.",
    "lc_srv2_title": "أنظمة كاميرات المراقبة الأمنية (CCTV)",
    "lc_srv2_desc": "حلول مراقبة مرئية متكاملة لتأمين وحماية كافة المواقع والمنشآت الحيوية والصناعية والتجارية على مدار الساعة.",
    "lc_srv2_b1": "توريد وتركيب كاميرات المراقبة الشبكية IP Cameras والتناظرية والحرارية والمتحركة PTZ.",
    "lc_srv2_b2": "تجهيز غرف المراقبة المركزية Control Rooms وأجهزة التسجيل الشبكي NVR وشاشات العرض.",
    "lc_srv2_b3": "تحليلات الفيديو الذكية ورصد التسلل وحماية الأسوار المحيطية للمحطات والمصانع والكمبوندات.",
    "lc_srv3_title": "أنظمة إنذار الحريق المعتمدة",
    "lc_srv3_desc": "منظومات إنذار مبكر متكاملة لحماية الأرواح والممتلكات والتنبيه الفوري في حالات الحريق أو الدخان.",
    "lc_srv3_b1": "لوحات تحكم إنذار الحريق المعنونة (Addressable) والتقليدية (Conventional) المعتمدة.",
    "lc_srv3_b2": "حساسات دخان (Smoke Detectors)، حساسات حرارة (Heat Detectors)، وكواسر يدوية وسراين.",
    "lc_srv3_b3": "وحدات المراقبة والتحكم (Control & Monitor Modules) للربط مع المصاعد والتكييف والإخلاء.",
    "lc_srv4_title": "التحكم في الدخول والحضور والانصراف",
    "lc_srv4_desc": "أنظمة ذكية لإدارة حركة الدخول والخروج للموظفين والزوار وتأمين الأبواب والمنشآت الحساسة.",
    "lc_srv4_b1": "أجهزة الحضور والانصراف بالبصمة والوجه والكارت لحساب التأخيرات والإجازات والورديات بدقة.",
    "lc_srv4_b2": "أنظمة التحكم في الأبواب (Access Doors) والكوالين المغناطيسية والكهربائية للبنوك والفنادق والشركات.",
    "lc_srv4_b3": "برامج إدارة مركزية متكاملة للربط مع قواعد بيانات الموارد البشرية والأمن.",
    "lc_srv5_title": "الأنظمة الصوتية والإخلاء واستدعاء الممرضات",
    "lc_srv5_desc": "حلول صوتية احترافية للمولات والهيئات والشركات والمستشفيات مع ربط كامل بأنظمة الطوارئ.",
    "lc_srv5_b1": "أنظمة الإذاعة الداخلية والصوتيات المركزية (PA Systems) للمولات التجارية والجامعات والمباني الإدارية.",
    "lc_srv5_b2": "أنظمة الإخلاء الصوتي التلقائي في حالات الحريق أو الإنذار لتوجيه الأفراد بأمان.",
    "lc_srv5_b3": "أنظمة استدعاء الممرضات (Nurse Call Systems) المتكاملة للمستشفيات والمراكز الطبية.",
    "lc_srv6_title": "أنظمة السنترالات والاتصالات والإنتركم",
    "lc_srv6_desc": "شبكات اتصالات صوتية ومرئية مستقلة ومدمجة عبر بروتوكول الإنترنت (IP) للمباني والمجمعات السكنية والإدارية.",
    "lc_srv6_b1": "السنترالات الشبكية والرقمية (IP-PBX) وأنظمة الاتصالات الموحدة للشركات والفنادق.",
    "lc_srv6_b2": "تجهيز مراكز الاتصال وخدمة العملاء (Call Centers) بأحدث تقنيات الـ VoIP والملتميديا.",
    "lc_srv6_b3": "أنظمة الإنتركم الصوتي والمرئي (Talkback / Door Phone) للمباني والكمبوندات السكنية.",
    "lc_srv7_title": "أنظمة نداء العملاء والشاشات الرقمية",
    "lc_srv7_desc": "أنظمة تنظيم الطوابير واستدعاء العملاء بأحدث التصميمات العصرية للمراكز الخدمية والبنوك والمستشفيات.",
    "lc_srv7_b1": "منصات سحب التذاكر التفاعلية (Touch Kiosks) وشاشات العرض الرئيسية والفرعية ولوحات النداء.",
    "lc_srv7_b2": "أنظمة الشاشات الإعلانية والمعلوماتية الرقمية (Digital Signage & Visualization Modules).",
    "lc_srv7_b3": "وحدات مراقبة الأداء وإصدار التقارير الإحصائية الشاملة (Full Reporting & Monitoring).",
    "lc_srv8_title": "البوابات الأمنية وأجهزة التفتيش والحواجز",
    "lc_srv8_desc": "أجهزة تفتيش وتأمين عالية الدقة للمواقع الحيوية، المحطات، المطارات، الفنادق، والمقرات الكبرى.",
    "lc_srv8_b1": "بوابات كشف المعادن للأفراد (Walk-Through Metal Detectors) عالية الحساسية.",
    "lc_srv8_b2": "أجهزة فحص وتفتيش الحقائب والطرود بالأشعة السينية (X-Ray Baggage Inspection).",
    "lc_srv8_b3": "بوابات ومصدات السيارات الأوتوماتيكية (Car Barriers) وأنظمة تأمين الأسوار ضد التسلل.",
    "lc_srv9_title": "أتمتة المباني والبيوت الذكية (Smart Home & BMS)",
    "lc_srv9_desc": "قطاعنا المتخصص في تحويل المنازل والفلل والمباني الإدارية إلى منظومات ذكية متكاملة توفر الطاقة وترتقي بالرفاهية والأمان.",
    "lc_srv9_b1": "تحكم ذكي في الإضاءة، التكييفات، الستائر الكهربائية، والأقفال الذكية بالبصمة وتطبيق الموبايل.",
    "lc_srv9_b2": "منظومة حساسات الأمان (تسريب الغاز، المياه، الدخان، والحركة) والربط مع الأوامر الصوتية.",
    "lc_srv9_b3": "أنظمة إدارة المباني (BMS) وترشيد استهلاك الطاقة للمنشآت التجارية والسكنية.",
    "lc_req_quote_btn": "اطلب مقايسة فنية <i class=\"fas fa-arrow-left\"></i>",
    "lc_explore_smart_btn": "تصفح باقات ومنتجات السمارت هوم <i class=\"fas fa-arrow-down\"></i>",
    "lvmv_sec_subtitle": "هندسة القوى الكهربائية والمقاولات المتكاملة (LV & MV Electrical Engineering)",
    "lvmv_sec_title": "شبكات الجهد المنخفض والمتوسط ومقاولات البنية التحتية",
    "lvmv_sec_desc": "نُقدم خدمات هندسية ومقاولات متكاملة لشبكات الجهد المنخفض (LV) والجهد المتوسط (MV)، تشمل سحب الكابلات الأرضية والهوائية، عمل النهايات والوصلات، وتوريد وتركيب المحولات والموزعات وأعمدة الإنارة.",
    "lvmv_c1_title": "سحب كابلات الجهد المتوسط (MV Pulling)",
    "lvmv_c1_desc": "مد وسحب كابلات الجهد المتوسط الأرضية والهوائية للمشروعات القومية والمدن الجديدة وشبكات التوزيع المعتمدة.",
    "lvmv_c2_title": "سحب كابلات الجهد المنخفض (LV Pulling)",
    "lvmv_c2_desc": "تأسيس وسحب شبكات كابلات الجهد المنخفض باستخدام أحدث معدات السحب الهيدروليكية لتغذية المباني والمجمعات.",
    "lvmv_c3_title": "توريد وتركيب المحولات والموزعات",
    "lvmv_c3_desc": "إحلال وتجديد وتوريد وتركيب محولات القدرة الكهربائية ولوحات التوزيع والموزعات الرئيسية (Distributors & Transformers).",
    "lvmv_c4_title": "نهايات ووصلات الكابلات وأعمدة الإنارة",
    "lvmv_c4_desc": "تنفيذ علب النهايات والوصلات (Terminating Ends & Joints) لكابلات الجهد المتوسط والمنخفض، وتركيب وإحلال أعمدة الإنارة.",
    "const_strip_title": "<i class=\"fas fa-compass-drafting\"></i> منظومة إدارة المشروعات والمقاولات المتكاملة (Turnkey Contracting Services)",
    "const_strip_desc": "ندير مشروعك من الفكرة وحتى التسليم والتشغيل والصيانة وفق أعلى المعايير الهندسية:",
    "const_s1_t": "خدمات ما قبل التنفيذ (Pre-Construction)",
    "const_s1_d": "معاينة المواقع، إعداد الميزانيات والمقايسات والجداول الزمنية، واستخراج التصاريح والموافقات.",
    "const_s2_t": "التصميم والهندسة (Design & Engineering)",
    "const_s2_d": "تقديم الرسومات الهندسية والمعمارية والمخططات التنفيذية (Shop Drawings) لكافة الأنظمة.",
    "const_s3_t": "إدارة المشروعات (Project Management)",
    "const_s3_d": "الإشراف الكامل على التخطيط والتنفيذ ومراقبة الجودة والسلامة من البداية وحتى التسليم.",
    "const_s4_t": "الإنشاءات والمباني (Building Construction)",
    "const_s4_d": "أعمال الحفر، الأساسات، الهياكل الخرسانية، مد المرافق، والتشطيبات الداخلية والخارجية.",
    "const_s5_t": "المقاولات التخصصية (Specialty MEP)",
    "const_s5_d": "تنفيذ الأعمال التخصصية الدقيقة من كهرباء، تيار خفيف، ميكانيكا وسباكة، وتكييف مركزي (HVAC).",
    "const_s6_t": "الصيانة والدعم الفني (Maintenance & Repair)",
    "const_s6_d": "عقود صيانة دورية ووقائية وإصلاح شامل لضمان استمرارية عمل الأنظمة والمنشآت بكفاءة.",
    "smarthome_division_badge": "🏠 قطاع أتمتة المنازل والمباني الذكية (أحد قطاعات التيار الخفيف)",
    "catalog_sec_subtitle": "كتالوج الأجهزة والمنتجات الذكية",
    "catalog_sec_title": "تصفح منتجات وأجهزة بيوت الذكية حسب الفئة",
    "catalog_sec_desc": "اسحب يميناً ويساراً لتصفح الفئات والمنتجات بشكل مستمر، أو اضغط على الفئة للانتقال إليها مباشرة.",
    "port_sec_subtitle": "سابقة الأعمال والمشروعات القومية (+1,000 عميل ومشروع)",
    "port_sec_title": "مشروعات هندسية كبرى نفخر بتنفيذها على أرض الواقع",
    "port_sec_desc": "سجل حافل من الإنجازات الموثقة في تنفيذ مشروعات التيار الخفيف، الأنظمة الأمنية، شبكات الألياف الضوئية، ومقاولات البنية التحتية الكهربائية في مختلف محافظات مصر.",
    "port_flt_all": "جميع المشروعات (7)",
    "port_flt_sec": "أنظمة أمنية وتيار خفيف",
    "port_flt_fiber": "ألياف ضوئية وشبكات داتا",
    "port_flt_lvmv": "بنية تحتية وجهد متوسط ومنخفض",
    "proj1_cat": "أنظمة أمنية وبوابات تفتيش",
    "proj1_loc": "العريش - شمال سيناء",
    "proj1_title": "تأمين محطة محولات المساعيد (العريش - سيناء)",
    "proj1_desc": "توريد وتركيب منظومة تأمين ومراقبة متكاملة لمحطة محولات المساعيد تشمل كاميرات مراقبة شبكية، نظام حماية الأسوار من التسلل، بوابات السيارات، وأجهزة التفتيش بالأشعة والمعادن.",
    "proj1_m1": "35 كاميرا مراقبة IP",
    "proj1_m2": "حماية سور بطول 450 متر",
    "proj1_m3": "بوابات سيارات ومعادن + X-Ray",
    "proj2_cat": "ألياف ضوئية - مشروعات قومية",
    "proj2_loc": "العاصمة الإدارية الجديدة - القاهرة",
    "proj2_title": "مد ولحام كابلات الألياف الضوئية – القطار الكهربائي الخفيف (LRT)",
    "proj2_desc": "سحب ومد كابلات الألياف الضوئية لمسار مشروع القطار الكهربائي الخفيف بالعاصمة الإدارية الجديدة مع تنفيذ كافة أعمال اللحام والتجريح والاختبارات القياسية المعتمدة.",
    "proj2_m1": "سحب 220 كم كابلات فايبر 4 Core",
    "proj2_m2": "لحام وتجريح 7,000 فرعة (Core)",
    "proj2_m3": "اختبارات OTDR شاملة",
    "proj3_cat": "أنظمة نداء العملاء - حياة كريمة",
    "proj3_loc": "أشمون - محافظة المنوفية",
    "proj3_title": "أنظمة نداء العملاء بمجمعات خدمات المواطنين – مبادرة حياة كريمة",
    "proj3_desc": "توريد وتركيب وتشغيل أنظمة استدعاء وترتيب العملاء الرقمية المتكاملة لعدد 14 مبنى من مجمعات خدمات المواطنين ضمن المبادرة الرئاسية حياة كريمة.",
    "proj3_m1": "14 مجمع خدمات مواطنين",
    "proj3_m2": "19 شاشة عرض لكل مبنى (266 شاشة)",
    "proj3_m3": "جهاز Kiosk ولوحات تحكم لكل مبنى",
    "proj4_cat": "إنذار حريق معنون - حياة كريمة",
    "proj4_loc": "أشمون - محافظة المنوفية",
    "proj4_title": "أنظمة إنذار الحريق بمجمعات خدمات المواطنين – مبادرة حياة كريمة",
    "proj4_desc": "توريد وتركيب منظومة إنذار حريق معنونة (Addressable Fire Alarm) متكاملة لتأمين 14 مبنى من مجمعات خدمات المواطنين ضد أخطار الحريق.",
    "proj4_m1": "14 مبنى (لوحة معنونة لكل مبنى)",
    "proj4_m2": "41 حساس دخان + 3 حرارة لكل مبنى",
    "proj4_m3": "5 سرينة + وحدة مراقبة وتحكم لكل مبنى",
    "proj5_cat": "شبكات داتا وراكات - حياة كريمة",
    "proj5_loc": "أشمون - محافظة المنوفية",
    "proj5_title": "شبكات الداتا بمجمعات الخدمات الزراعية – مبادرة حياة كريمة",
    "proj5_desc": "توريد وتأسيس البنية التحتية لشبكات المعلومات والاتصالات لعدد 14 مجمع خدمات زراعية وبيطرية شاملة الراكات والسويتشات ونقاط الداتا واختبارات الفلوك.",
    "proj5_m1": "14 مبنى (راك + 3 سويتش لكل مبنى)",
    "proj5_m2": "45 مخرج داتا Cat6a لكل مبنى",
    "proj5_m3": "تيرمينيشن واختبار Fluke Test",
    "proj6_cat": "بنية تحتية وجهد متوسط ومنخفض",
    "proj6_loc": "إدفو - محافظة أسوان",
    "proj6_title": "إحلال وتجديد البنية التحتية والأعمال الكهربائية (إدفو - أسوان)",
    "proj6_desc": "مشروع ضخم لإحلال وتجديد شبكات الكهرباء والمحولات والكابلات الأرضية والهوائية والموزعات وأعمدة الإنارة وعمل النهايات والوصلات بمركز إدفو.",
    "proj6_m1": "360 محول قدرة + 2 موزع رئيسي",
    "proj6_m2": "33 كم كابلات MV + 45 كم كابلات LV",
    "proj6_m3": "1,230 عمود إنارة + النهايات والوصلات",
    "proj7_cat": "بنية تحتية وجهد متوسط ومنخفض",
    "proj7_loc": "المراغة - محافظة سوهاج",
    "proj7_title": "إحلال وتجديد البنية التحتية والأعمال الكهربائية (المراغة - سوهاج)",
    "proj7_desc": "إحلال وتجديد شامل للمحولات والكابلات الأرضية والهوائية والموزعات وأعمدة الإنارة العامة، بالإضافة إلى أعمال الصيانة والتجهيزات الفنية للفروع والمنشآت.",
    "proj7_m1": "65 محول قدرة + 1 موزع رئيسي",
    "proj7_m2": "18 كم كابلات MV + 22 كم كابلات LV",
    "proj7_m3": "720 عمود إنارة + النهايات والوصلات",
    "clients_sec_subtitle": "شركاء النجاح والثقة (Our Valued Clients)",
    "clients_sec_title": "نفخر بثقة كبرى الشركات والمؤسسات في مصر",
    "clients_sec_desc": "شراكات استراتيجية ناجحة مع نخبة من رواد قطاع المقاولات، الطاقة، البنية التحتية، والمؤسسات الكبرى.",
    "client_name_1": "السويدي إليكتريك (Elsewedy Electric)",
    "client_name_2": "الخرافي ناشيونال (Kharafi National)",
    "client_name_3": "مدكور للمشروعات (Madkour)",
    "client_name_4": "مجموعة التوكل (GTCI - Altawakol Group)",
    "client_name_5": "مؤسسة أهل مصر (Ahl Masr)",
    "client_name_6": "كومباك جلاس (Compac Glass)",
    "client_name_7": "إنبلوم (Enblom)",
    "client_name_8": "فري إير (Free Air)",
    "form_section_title": "اطلب مقايسة فنية أو استشارة هندسية مجانية",
    "form_section_subtitle": "سواء كنت تبحث عن مقاول تيار خفيف لمشروعك، أعمال شبكات وكهرباء، أو باقة سمارت هوم لمنزلك، فريقنا الهندسي جاهز للتواصل معك فوراً",
    "form_step1_lbl": "القطاع المطلوب",
    "form_step1_title_beyout": "اختر القطاع الهندسي أو الخدمة المطلوبة:",
    "form_track1_title": "مقاولات وأنظمة التيار الخفيف (Light Current)",
    "form_track1_desc": "شبكات داتا وفايبر، كاميرات مراقبة، إنذار حريق، صوتيات، سنترالات، نداء عملاء، وبوابات أمنية.",
    "form_track2_title": "شبكات الجهد المنخفض والمتوسط والمقاولات",
    "form_track2_desc": "سحب كابلات LV/MV، توريد وتركيب محولات وموزعات، أعمدة إنارة، وصيانة منشآت.",
    "form_track3_title": "بيوت سمارت هوم (Smart Home & BMS)",
    "form_product_lumora_desc": "باقات أتمتة المنازل والفلل والشقق الفاخرة والمكاتب الذكية.",
    "form_lbl_name": "الاسم بالكامل / اسم الشركة ",
    "form_step3_title": "حدد الموعد المناسب للمعاينة أو المكالمة الاستشارية",
    "form_lbl_notes_beyout": "تفاصيل المشروع أو الأنظمة والباقات المطلوبة:",
    "form_btn_submit": "إرسال الطلب وتأكيد الموعد 🚀",
    "form_success_desc_beyout": "تم تسجيل طلبك بنجاح لدى الإدارة الهندسية بشركة بيوت تك.",
    "form_success_whatsapp": "سيتواصل معك مهندسونا عبر واتساب وهاتف رقم ",
    "form_success_whatsapp_sub": " لمناقشة كافة التفاصيل الفنية والمالية.",
    "form_success_reset_btn": "إرسال طلب جديد",
    "footer_about_text_beyout": "شركة بيوت تك للمقاولات وأنظمة التيار الخفيف (Light Current)، الهندسة الكهربائية (LV/MV)، والحلول الذكية المتكاملة (Smart Home & BMS).",
    "footer_addr_lbl": "المقر الرئيسي:",
    "footer_address_val": "42 شارع أنقرة، شيراتون، القاهرة، مصر",
    "footer_links_title": "الأقسام والقطاعات الهندسية",
    "footer_social_title": "تواصل معنا وتابعنا",
    "footer_cert_box_title": "اعتمادات واختبارات قياسية",
    "footer_cert_box_desc": "جميع مشروعات الشبكات والألياف الضوئية والأنظمة الأمنية يتم تسليمها باختبارات Fluke & OTDR المعتمدة.",
    "footer_copyright": "© 2026 شركة بيوت تك للمقاولات وأنظمة التيار الخفيف والحلول الذكية (Beyout Tech). جميع الحقوق محفوظة."
});
Object.assign(translations.en, {
    "nav_home": "Home",
    "nav_about_us": "About Us",
    "nav_lc_services": "Light Current",
    "nav_lvmv": "LV & MV Works",
    "nav_solutions": "Smart Home",
    "nav_packages": "Smart Home Packages",
    "nav_products": "Products",
    "nav_portfolio": "Portfolio",
    "nav_clients": "Our Clients",
    "nav_contact": "Request Quote",
    "beyout_page_title": "Beyout Tech | Light Current Contracting, Electrical Engineering & Smart Systems",
    "hero_kicker": "Light Current Contracting • Infrastructure • Security Systems • Smart Buildings",
    "beyout_hero_title": "Your Integrated Engineering Partner for Light Current & Smart Infrastructure",
    "beyout_hero_subtitle": "We design, supply, and execute world-class Light Current systems for national, industrial, corporate, and residential projects: from Fiber Optics & Data Networks, CCTV Surveillance, Fire Alarm, Public Address, and Security Gates, to LV/MV Electrical Networks & Building Automation (BMS & Smart Home).",
    "btn_explore_lc": "Explore Light Current Systems",
    "btn_view_portfolio": "<i class=\"fas fa-briefcase\"></i> View Portfolio & Projects",
    "btn_smarthome_pkgs": "Smart Home Packages <i class=\"fas fa-arrow-right\"></i>",
    "hero_cert_1": "Certified Testing (Fluke & OTDR)",
    "hero_cert_2": "Highest HSE & Engineering Quality",
    "hero_cert_3": "Turnkey Supply, Installation & Maintenance",
    "mosaic_tag_1": "National & Infrastructure Projects",
    "mosaic_title_1": "World-Class Fiber Optic & Light Current Systems",
    "mosaic_mini_1": "Data & Fiber Networks",
    "mosaic_mini_2": "Fire Alarm & Security",
    "mosaic_mini_3": "Smart Home & BMS",
    "stat_lbl_1": "Clients & Delivered Projects",
    "stat_lbl_2": "Fiber Optic & Data Cabling",
    "stat_lbl_3": "LV & MV Transformers & Distributors",
    "stat_lbl_4": "Certified Testing (Fluke & OTDR)",
    "about_sec_subtitle": "CORPORATE IDENTITY • ABOUT US",
    "about_sec_title": "Your All-In-One Engineering Partner for Contracting & Light Current",
    "about_sec_desc": "We are an integrated engineering solution provider for construction, security, light current, and electrical engineering services. With years of field experience and a highly skilled team, we deliver projects of every scale from start to finish.",
    "vm_about_title": "About Us",
    "vm_about_desc": "A one-stop-shop combining Light Current contracting, advanced security systems, building automation, and electrical power networks while ensuring top safety and reliability.",
    "vm_vision_title": "Our Vision",
    "vm_vision_desc": "Providing the highest quality electrical engineering, industry-leading security, mechanical, and construction solutions utilizing cutting-edge sustainable technology.",
    "vm_mission_title": "Our Mission & Goal",
    "vm_mission_desc": "Delivering exceptional engineering services and integral solutions that exceed expectations on time, within budget, and with the highest level of quality and safety.",
    "vm_safety_title": "Our Priority is Safety",
    "vm_safety_desc": "The number one priority for Beyout Tech is ensuring the safety of workers, clients, and facilities while delivering high-quality, certified engineering services.",
    "industries_strip_title": "Key Industries We Serve with Light Current Solutions:",
    "ind_1": "Commercial, Corporate & Banking",
    "ind_2": "Industrial Plants & Factories",
    "ind_3": "Healthcare & Hospitals",
    "ind_4": "Universities & Education",
    "ind_5": "Hospitality, Hotels & Resorts",
    "ind_6": "Residential Compounds & Smart Villas",
    "lc_sec_subtitle": "LIGHT CURRENT ENGINEERING SERVICES",
    "lc_sec_title": "Comprehensive Light Current, Telecom & Security Ecosystem",
    "lc_sec_desc": "Enhancing operational efficiency, comfort, and security across buildings by integrating and automating low-voltage systems with scalable, cost-effective solutions.",
    "lc_srv1_title": "Data Networks & Fiber Optic Systems",
    "lc_srv1_desc": "End-to-end passive and active network infrastructure for enterprise buildings and national projects.",
    "lc_srv1_b1": "UTP Cabling (Cat6 / Cat6a), Patch cords & accessories (Pulling, Termination & Fluke Testing).",
    "lc_srv1_b2": "Fiber Optical Cabling, Patch cords & accessories (Pulling, Splicing & OTDR Testing).",
    "lc_srv1_b3": "RS485 Cabling supply, Server Racks & Pipes organization and structured handling.",
    "lc_srv2_title": "Surveillance Systems (CCTV)",
    "lc_srv2_desc": "Advanced IP and AI video surveillance systems to secure and monitor all facilities 24/7.",
    "lc_srv2_b1": "Supply and installation of IP, HD, Thermal, and PTZ security surveillance cameras.",
    "lc_srv2_b2": "Central Control Rooms, NVR storage servers, and video wall monitoring solutions.",
    "lc_srv2_b3": "Smart perimeter intrusion detection for substations, factories, and residential compounds.",
    "lc_srv3_title": "Certified Fire Alarm Systems",
    "lc_srv3_desc": "Complete early-warning life safety systems to alert occupants and protect properties from fire hazards.",
    "lc_srv3_b1": "Addressable and Conventional Fire Alarm Control Panels.",
    "lc_srv3_b2": "Smoke detectors, heat detectors, manual call points, and alarm sirens.",
    "lc_srv3_b3": "Control and Monitor Modules integrated with elevators, HVAC, and voice evacuation.",
    "lc_srv4_title": "Access Control & Time Attendance",
    "lc_srv4_desc": "Smart biometric and card access solutions for employee attendance and high-security doors.",
    "lc_srv4_b1": "Fingerprint, Face ID, and Card attendance devices tracking shifts, delays, and vacations.",
    "lc_srv4_b2": "Door Access Control systems for hotels, banks, server rooms, and corporate offices.",
    "lc_srv4_b3": "Centralized management software integrated with HR and security databases.",
    "lc_srv5_title": "Sound, PA & Nurse Call Systems",
    "lc_srv5_desc": "Professional audio, public address, emergency voice evacuation, and hospital nurse call solutions.",
    "lc_srv5_b1": "Public Address (PA) and commercial audio systems for malls, universities, and offices.",
    "lc_srv5_b2": "Automated Voice Evacuation systems linked to fire alarm panels for safe emergency egress.",
    "lc_srv5_b3": "Advanced Nurse Call Systems for hospitals and medical centers.",
    "lc_srv6_title": "Telephone, IP-PBX & Intercom Systems",
    "lc_srv6_desc": "Standalone and IP-converged voice and video communication networks for buildings and compounds.",
    "lc_srv6_b1": "IP-PBX telephone systems and unified communications over IP networks.",
    "lc_srv6_b2": "Complete Call Center technologies for voice and multimedia session delivery.",
    "lc_srv6_b3": "Talkback and Video Door Phone (Intercom) systems for residential and office buildings.",
    "lc_srv7_title": "Queuing & Digital Signage Systems",
    "lc_srv7_desc": "Modern queue management and digital signage solutions for service centers, banks, and hospitals.",
    "lc_srv7_b1": "Interactive ticket dispensing Kiosks, counter displays, and customer call monitors.",
    "lc_srv7_b2": "Digital Signage, customer identification, and interactive visualization modules.",
    "lc_srv7_b3": "Full Reporting and real-time performance monitoring modules.",
    "lc_srv8_title": "Security Gates, X-Ray & Barriers",
    "lc_srv8_desc": "High-security inspection and access screening systems for airports, hotels, substations, and headquarters.",
    "lc_srv8_b1": "High-sensitivity Walk-Through Metal Detector security gates.",
    "lc_srv8_b2": "X-Ray baggage and parcel inspection scanners.",
    "lc_srv8_b3": "Automatic Car Barriers, bollards, and perimeter intrusion detection systems.",
    "lc_srv9_title": "Smart Home & Building Automation (BMS)",
    "lc_srv9_desc": "Our specialized division transforming villas, apartments, and offices into intelligent, energy-efficient spaces.",
    "lc_srv9_b1": "Smart lighting, AC, motorized curtains, and biometric smart door locks via mobile app.",
    "lc_srv9_b2": "Safety sensors (Gas, Water leak, Smoke, Motion) and voice control integration (Alexa/Siri).",
    "lc_srv9_b3": "Building Management Systems (BMS) and energy management solutions.",
    "lc_req_quote_btn": "Request Technical Quote <i class=\"fas fa-arrow-right\"></i>",
    "lc_explore_smart_btn": "Explore Smart Home Packages & Catalog <i class=\"fas fa-arrow-down\"></i>",
    "lvmv_sec_subtitle": "LOW & MEDIUM VOLTAGE ELECTRICAL ENGINEERING",
    "lvmv_sec_title": "LV & MV Power Networks & Infrastructure Contracting",
    "lvmv_sec_desc": "Comprehensive electrical engineering services including pulling ground and aerial cables, terminating ends and joints, transformers and distributors setup, and lighting poles renovation.",
    "lvmv_c1_title": "Medium Voltage Cable Pulling (MV Pulling)",
    "lvmv_c1_desc": "Ground and aerial MV cable pulling and installation for national infrastructure and power networks.",
    "lvmv_c2_title": "Low Voltage Cable Pulling (LV Pulling)",
    "lvmv_c2_desc": "LV cable pulling and distribution networks feeding residential, commercial, and industrial facilities.",
    "lvmv_c3_title": "Distributors & Transformers Setup",
    "lvmv_c3_desc": "Supply, installation, replacement, and renovation of electrical power transformers and main distributors.",
    "lvmv_c4_title": "Cable Ends, Joints & Lighting Poles",
    "lvmv_c4_desc": "Terminating MV/LV cable ends and joints, plus installation and renovation of street lighting poles.",
    "const_strip_title": "<i class=\"fas fa-compass-drafting\"></i> Turnkey Construction & Engineering Project Lifecycle",
    "const_strip_desc": "Overseeing your project from initial assessment and design to construction, testing, and maintenance:",
    "const_s1_t": "Pre-Construction Services",
    "const_s1_d": "Conducting site assessments, creating budgets and schedules, and obtaining necessary permits.",
    "const_s2_t": "Design & Engineering Services",
    "const_s2_d": "Providing architectural, electrical, and shop drawing engineering services.",
    "const_s3_t": "Project Management",
    "const_s3_d": "Overseeing planning, design, quality control, and execution from start to finish.",
    "const_s4_t": "Building Construction",
    "const_s4_d": "Excavation, pouring foundations, structural framing, utilities installation, and interior/exterior finishing.",
    "const_s5_t": "Specialty MEP Contracting",
    "const_s5_d": "Dedicated electrical, light current, plumbing, HVAC, and specialty engineering works.",
    "const_s6_t": "Maintenance & Repair Services",
    "const_s6_d": "Performing routine preventive maintenance and repairs on existing systems and facilities.",
    "smarthome_division_badge": "🏠 Smart Home & Building Automation Division (Part of Our Light Current Ecosystem)",
    "catalog_sec_subtitle": "SMART HOME & LIGHT CURRENT PRODUCT CATALOG",
    "catalog_sec_title": "Browse Beyout Smart Devices by Category",
    "catalog_sec_desc": "Swipe horizontally to explore all product categories, or click any category pill below to jump directly.",
    "port_sec_subtitle": "PROVEN TRACK RECORD & PORTFOLIO (+1,000 CLIENTS)",
    "port_sec_title": "Major National & Engineering Projects Delivered",
    "port_sec_desc": "A documented track record of executing Light Current, Security, Fiber Optic, and Electrical Infrastructure projects across Egypt.",
    "port_flt_all": "All Projects (7)",
    "port_flt_sec": "Security & Light Current",
    "port_flt_fiber": "Fiber Optics & Data",
    "port_flt_lvmv": "LV & MV Infrastructure",
    "proj1_cat": "Security & Inspection Systems",
    "proj1_loc": "Arish - North Sinai",
    "proj1_title": "Security Systems for Almassed Sub-Station (Arish - Sinai)",
    "proj1_desc": "Supply and installation of 35 IP cameras and perimeter intrusion system for the 450m substation wall, plus car barriers, metal detector gates, and X-Ray scanner.",
    "proj1_m1": "35 IP Surveillance Cameras",
    "proj1_m2": "450m Perimeter Intrusion System",
    "proj1_m3": "Car Barrier, Metal Gate & X-Ray",
    "proj2_cat": "Fiber Optics - National Projects",
    "proj2_loc": "New Administrative Capital - Cairo",
    "proj2_title": "Pulling & Termination of Fiber Optic Cable – LRT Train",
    "proj2_desc": "Pulling approximately 220 km of 4-core fiber optic cable with complete splicing and termination of ~7,000 cores and certified OTDR testing.",
    "proj2_m1": "220 KM 4-Core Fiber Pulling",
    "proj2_m2": "7,000 Cores Terminated & Spliced",
    "proj2_m3": "Full Certified OTDR Testing",
    "proj3_cat": "Queue Systems - Haya Karima",
    "proj3_loc": "Ashmoun - Menoufia",
    "proj3_title": "Queue System in Citizen Service Centers – Haya Karima",
    "proj3_desc": "Supply and installation of complete queue management systems for 14 citizen service center buildings, each equipped with 19 monitors, 1 kiosk, and counter keypads.",
    "proj3_m1": "14 Citizen Service Buildings",
    "proj3_m2": "19 Monitors per Building (266 Total)",
    "proj3_m3": "1 Kiosk & Keypads per Building",
    "proj4_cat": "Addressable Fire Alarm - Haya Karima",
    "proj4_loc": "Ashmoun - Menoufia",
    "proj4_title": "Fire Alarm System in Citizen Service Centers – Haya Karima",
    "proj4_desc": "Supply and installation of addressable fire alarm systems for 14 citizen service center buildings with full detection and control coverage.",
    "proj4_m1": "14 Buildings (Addressable Panel each)",
    "proj4_m2": "41 Smoke + 3 Heat Detectors / Bldg",
    "proj4_m3": "5 Sirens + 1 Control Monitor Module / Bldg",
    "proj5_cat": "Data Networks - Haya Karima",
    "proj5_loc": "Ashmoun - Menoufia",
    "proj5_title": "Data System in Agricultural Service Centers – Haya Karima",
    "proj5_desc": "Supply and installation of structured data cabling systems for 14 agricultural service center buildings including racks, switches, termination, and Fluke testing.",
    "proj5_m1": "14 Buildings (1 Rack + 3 Switches each)",
    "proj5_m2": "45 Cat6a Endpoints per Building",
    "proj5_m3": "Full Termination & Fluke Testing",
    "proj6_cat": "LV & MV Electrical Infrastructure",
    "proj6_loc": "Edfu - Aswan",
    "proj6_title": "Replacing & Renovation of Electrical Infrastructure (Edfu, Aswan)",
    "proj6_desc": "Replacing and renewing transformers, ground and aerial cables, lighting poles, distributors, and cable ends and joints across Edfu.",
    "proj6_m1": "360 Transformers + 2 Distributors",
    "proj6_m2": "33 KM MV Cable + 45 KM LV Cable",
    "proj6_m3": "1,230 Lighting Poles + Ends & Joints",
    "proj7_cat": "LV & MV Electrical Infrastructure",
    "proj7_loc": "Maragha - Sohag",
    "proj7_title": "Replacing & Renovation of Electrical Infrastructure (Maragha, Sohag)",
    "proj7_desc": "Replacing and renewing transformers, ground and aerial cables, lighting poles, distributors, and making ends and connectors in Maragha.",
    "proj7_m1": "65 Transformers + 1 Distributor",
    "proj7_m2": "18 KM MV Cable + 22 KM LV Cable",
    "proj7_m3": "720 Lighting Poles + Ends & Joints",
    "clients_sec_subtitle": "OUR VALUED CLIENTS & PARTNERS",
    "clients_sec_title": "Trusted by Leading Corporations & Institutions in Egypt",
    "clients_sec_desc": "Proudly partnering with top industry leaders in construction, energy, infrastructure, and public projects.",
    "client_name_1": "Elsewedy Electric",
    "client_name_2": "Kharafi National",
    "client_name_3": "Madkour Group",
    "client_name_4": "GTCI - Altawakol Group",
    "client_name_5": "Ahl Masr Foundation",
    "client_name_6": "Compac Glass",
    "client_name_7": "Enblom",
    "client_name_8": "Free Air",
    "form_section_title": "Request a Technical Quotation or Free Engineering Consultation",
    "form_section_subtitle": "Whether you need a Light Current contractor for a major project, LV/MV works, or a Smart Home package, our engineering team is ready to assist.",
    "form_step1_lbl": "Service Sector",
    "form_step1_title_beyout": "Select the Required Engineering Sector or Service:",
    "form_track1_title": "Light Current Systems & Contracting (B2B)",
    "form_track1_desc": "Data & Fiber networks, CCTV, Fire Alarm, Sound/PA, IP-PBX, Queuing, and Security Gates.",
    "form_track2_title": "LV & MV Electrical Networks & Contracting",
    "form_track2_desc": "LV/MV cable pulling, transformers & distributors setup, lighting poles, and facility maintenance.",
    "form_track3_title": "Beyout Smart Home & BMS (B2C)",
    "form_product_lumora_desc": "Complete smart automation packages for villas, apartments, offices, and warehouses.",
    "form_lbl_name": "Full Name / Company Name ",
    "form_step3_title": "Schedule Your Consultation Call or Site Survey",
    "form_lbl_notes_beyout": "Project Scope, Required Systems, or Package Details:",
    "form_btn_submit": "Submit Request & Confirm Schedule 🚀",
    "form_success_desc_beyout": "Your request has been registered with Beyout Tech's Engineering Department.",
    "form_success_whatsapp": "Our engineers will reach out via WhatsApp and phone at ",
    "form_success_whatsapp_sub": " to discuss all technical and financial details.",
    "form_success_reset_btn": "Submit Another Request",
    "footer_about_text_beyout": "Beyout Tech for Contracting, Light Current Systems, Electrical Engineering (LV/MV), and Smart Automation Solutions (Smart Home & BMS).",
    "footer_addr_lbl": "Head Office:",
    "footer_address_val": "42 Ankara St., Sheraton, Cairo, Egypt",
    "footer_links_title": "Engineering Divisions & Links",
    "footer_social_title": "Connect With Us",
    "footer_cert_box_title": "Certified Engineering Standards",
    "footer_cert_box_desc": "All fiber optic, data network, and security projects are delivered with certified Fluke & OTDR testing.",
    "footer_copyright": "© 2026 Beyout Tech (Light Current, Electrical Engineering & Smart Systems). All Rights Reserved."
});



/* ==========================================================================
   BEYOUT TECH v4.0.0 — INTERACTIVE SIMULATORS, CALCULATORS & MULTI-PAGE LOGIC
   ========================================================================== */

// 1. Mobile Menu & Language Toggle Helpers
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function toggleLanguage() {
    const htmlEl = document.documentElement;
    const currentLang = htmlEl.getAttribute('lang') === 'en' ? 'en' : 'ar';
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    applySiteLanguage(nextLang);
}

function updateBrochureLinksForLanguage(lang) {
    const targetPdf = lang === 'en'
        ? 'portfolio_assets/Beyout_Tech_Company_Profile_EN.pdf?v=4.4.0'
        : 'portfolio_assets/Beyout_Tech_Company_Profile.pdf?v=4.4.0';
    document.querySelectorAll('a[href*="Beyout_Tech_Company_Profile"]').forEach(link => {
        link.setAttribute('href', targetPdf);
    });
}

function applySiteLanguage(lang) {
    currentLanguage = lang;
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('rtl', lang === 'ar');
    document.body.classList.toggle('ltr', lang === 'en');
    localStorage.setItem('beyout_lang', lang);

    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = lang === 'ar' ? 'EN' : 'عربي';
    }

    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        const val = el.getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');
        if (val) el.textContent = val;
    });

    updateBrochureLinksForLanguage(lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const activeLang = (document.documentElement.getAttribute('lang') === 'en' || localStorage.getItem('beyout_lang') === 'en') ? 'en' : 'ar';
    updateBrochureLinksForLanguage(activeLang);
});

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="Beyout_Tech_Company_Profile"]');
    if (link) {
        const isEn = document.documentElement.getAttribute('lang') === 'en' || document.body.classList.contains('ltr');
        const targetPdf = isEn
            ? 'portfolio_assets/Beyout_Tech_Company_Profile_EN.pdf?v=4.4.0'
            : 'portfolio_assets/Beyout_Tech_Company_Profile.pdf?v=4.4.0';
        link.setAttribute('href', targetPdf);
    }
});

// 2. Hero Image Switcher & Lightbox
function switchSysHeroImg(btn, imgSrc) {
    const mainImg = document.getElementById('sys-main-preview');
    if (mainImg) mainImg.src = imgSrc;
    document.querySelectorAll('.sys-thumb-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function openLightbox(src, caption) {
    const modal = document.getElementById('img-lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (modal && img) {
        img.src = src;
        if (cap) cap.textContent = caption || '';
        modal.classList.add('open');
    }
}

function closeLightbox() {
    const modal = document.getElementById('img-lightbox');
    if (modal) modal.classList.remove('open');
}

function highlightTopoStep(card) {
    document.querySelectorAll('.topo-step-card').forEach(c => c.classList.remove('active-step'));
    if (card) card.classList.add('active-step');
}

// 3. LC-01: Data & Fiber Network Calculator
function calcDataFiber() {
    const ptsEl = document.getElementById('df-points');
    const bldgsEl = document.getElementById('df-bldgs');
    const catEl = document.getElementById('df-cat');
    if (!ptsEl || !bldgsEl) return;

    const pts = parseInt(ptsEl.value, 10) || 90;
    const bldgs = parseInt(bldgsEl.value, 10) || 3;
    const cat = catEl ? catEl.value : 'Cat6a (10 Gbps)';

    document.getElementById('df-points-val').textContent = pts;
    document.getElementById('df-bldgs-val').textContent = bldgs;

    const switches24 = Math.ceil(pts / 22);
    const patchPanels = Math.ceil(pts / 24);
    const racks = Math.max(1, bldgs);
    const cableBoxes = Math.ceil((pts * 55) / 305);
    const fiberCores = bldgs * 12;

    const outRacks = document.getElementById('df-out-racks');
    const outSw = document.getElementById('df-out-switches');
    const outCables = document.getElementById('df-out-cables');
    const outFiber = document.getElementById('df-out-fiber');
    const outSum = document.getElementById('df-out-summary');

    if (outRacks) outRacks.textContent = `${racks}x Rack + ${patchPanels} Patch Panel`;
    if (outSw) outSw.textContent = `${switches24}x Switch 24-Port PoE`;
    if (outCables) outCables.textContent = `${cableBoxes} رول كابل (${pts} مخرج)`;
    if (outFiber) outFiber.textContent = `${fiberCores} Core لحام + OTDR`;
    if (outSum) {
        outSum.textContent = `المواصفة المختارة: ${cat} — تشمل توريد وسحب الكابلات، تقفيل ${patchPanels} باتش بانل، لحام ${fiberCores} فرعة فايبر، وإصدار شهادة اختبار Fluke DSX-8000 & OTDR لعدد ${pts} نقطة.`;
    }
}

// 4. LC-02: CCTV Storage & NVR Calculator
function calcCctv() {
    const camsEl = document.getElementById('cctv-cams');
    const daysEl = document.getElementById('cctv-days');
    const resEl = document.getElementById('cctv-res');
    if (!camsEl || !daysEl) return;

    const cams = parseInt(camsEl.value, 10) || 32;
    const days = parseInt(daysEl.value, 10) || 30;
    const resMp = resEl ? parseInt(resEl.value, 10) : 4;

    document.getElementById('cctv-cams-val').textContent = cams;
    document.getElementById('cctv-days-val').textContent = days;

    // Approx bitrate with H.265+
    const mbpsPerCam = resMp === 8 ? 6.0 : (resMp === 4 ? 3.2 : 1.8);
    const totalBandwidth = (cams * mbpsPerCam).toFixed(1);
    const totalTB = Math.max(2, Math.ceil((cams * mbpsPerCam * 86400 * days) / (8 * 1024 * 1024) * 0.65));
    const nvrCh = cams <= 8 ? 8 : (cams <= 16 ? 16 : (cams <= 32 ? 32 : (cams <= 64 ? 64 : 128)));
    const poeSwitches = Math.ceil(cams / 16);

    const outNvr = document.getElementById('cctv-out-nvr');
    const outHdd = document.getElementById('cctv-out-hdd');
    const outBw = document.getElementById('cctv-out-bw');
    const outPoe = document.getElementById('cctv-out-poe');
    const outSum = document.getElementById('cctv-out-summary');

    if (outNvr) outNvr.textContent = `NVR ${nvrCh} Channels 4K`;
    if (outHdd) outHdd.textContent = `${totalTB} TB Surveillance HDD`;
    if (outBw) outBw.textContent = `${totalBandwidth} Mbps (H.265+)`;
    if (outPoe) outPoe.textContent = `${poeSwitches}x PoE Switch`;
    if (outSum) {
        outSum.textContent = `المنظومة تشمل ${cams} كاميرا بدقة ${resMp}MP مع تسجيل مستمر لمدة ${days} يوم بمساحة تخزينية ${totalTB} تيرابايت وتجهيز غرفة المراقبة المركزية.`;
    }
}

// 5. LC-03: Fire Alarm Loop Configurator & Simulator
function calcFireAlarm() {
    const floorsEl = document.getElementById('fa-floors');
    const roomsEl = document.getElementById('fa-rooms');
    if (!floorsEl || !roomsEl) return;

    const floors = parseInt(floorsEl.value, 10) || 4;
    const roomsPerFloor = parseInt(roomsEl.value, 10) || 12;

    document.getElementById('fa-floors-val').textContent = floors;
    document.getElementById('fa-rooms-val').textContent = roomsPerFloor;

    const totalSmoke = floors * roomsPerFloor;
    const totalHeat = floors * 2;
    const totalMcp = floors * 2;
    const totalSirens = floors * 3;
    const totalDevices = totalSmoke + totalHeat + totalMcp + totalSirens;
    const loops = Math.max(1, Math.ceil(totalDevices / 125));

    const oPanel = document.getElementById('fa-out-panel');
    const oSmoke = document.getElementById('fa-out-smoke');
    const oHeat = document.getElementById('fa-out-heat');
    const oSiren = document.getElementById('fa-out-siren');

    if (oPanel) oPanel.textContent = `Addressable Panel (${loops} Loop)`;
    if (oSmoke) oSmoke.textContent = `${totalSmoke} كاشف دخان`;
    if (oHeat) oHeat.textContent = `${totalHeat} كاشف حرارة`;
    if (oSiren) oSiren.textContent = `${totalSirens} سارينة + ${totalMcp} كاسر`;
}

function simFireAlarm(mode) {
    const statusBox = document.getElementById('fa-sim-status');
    if (!statusBox) return;
    if (mode === 'test') {
        statusBox.innerHTML = '🚨 <strong>حالة اختبار الحريق نشطة (ALARM TEST):</strong> تم رصد دخان في الدور الثاني (غرفة السيرفرات Address #02-14) — تم إطلاق السارينة، فصل التكييف HVAC، وإنزال المصاعد للدور الأرضي تلقائياً!';
        statusBox.style.borderColor = '#ef4444';
        statusBox.style.background = 'rgba(239, 68, 68, 0.15)';
    } else {
        statusBox.innerHTML = '✅ <strong>حالة النظام طبيعية (NORMAL STANDBY):</strong> جميع الحساسات المعنونة متصلة باللوحة الرئيسية وتعمل بكفاءة 100% وفق كود NFPA 72.';
        statusBox.style.borderColor = '#10b981';
        statusBox.style.background = 'rgba(16, 185, 129, 0.12)';
    }
}

// 6. LC-04: Access Control & Biometrics Sizer
function calcAccessControl() {
    const doorsEl = document.getElementById('ac-doors');
    const empEl = document.getElementById('ac-emp');
    const typeEl = document.getElementById('ac-type');
    if (!doorsEl || !empEl) return;

    const doors = parseInt(doorsEl.value, 10) || 8;
    const emp = parseInt(empEl.value, 10) || 150;
    const type = typeEl ? typeEl.value : 'Face + Fingerprint';

    document.getElementById('ac-doors-val').textContent = doors;
    document.getElementById('ac-emp-val').textContent = emp;

    const controllers = Math.ceil(doors / 4);
    const timeTerminals = Math.max(1, Math.ceil(emp / 120));

    const oCtrl = document.getElementById('ac-out-ctrl');
    const oLocks = document.getElementById('ac-out-locks');
    const oAtt = document.getElementById('ac-out-att');
    const oCards = document.getElementById('ac-out-cards');
    const oSum = document.getElementById('ac-out-summary');

    if (oCtrl) oCtrl.textContent = `${controllers}x لوحة تحكم 4-Door`;
    if (oLocks) oLocks.textContent = `${doors}x كالون EM Lock + قارئ`;
    if (oAtt) oAtt.textContent = `${timeTerminals}x جهاز حضور وانصراف`;
    if (oCards) oCards.textContent = `${emp} كارت / بصمة مشفرة`;
    if (oSum) {
        oSum.textContent = `التقنية المختارة: ${type} — تشمل تأمين ${doors} باب بكوالين مغناطيسية وحساسات فتح الباب وربطها ببرنامج الموارد البشرية والفتح التلقائي مع إنذار الحريق.`;
    }
}

// 7. LC-05: Sound, PA & Nurse Call Simulator
function calcSoundPa() {
    const areaEl = document.getElementById('pa-area');
    const zonesEl = document.getElementById('pa-zones');
    const modeEl = document.getElementById('pa-mode');
    if (!areaEl || !zonesEl) return;

    const area = parseInt(areaEl.value, 10) || 1200;
    const zones = parseInt(zonesEl.value, 10) || 4;
    const mode = modeEl ? modeEl.value : 'PA & Voice Evacuation';

    document.getElementById('pa-area-val').textContent = area;
    document.getElementById('pa-zones-val').textContent = zones;

    const speakers = Math.ceil(area / 25);
    const wattage = speakers * 6;
    const ampPower = Math.ceil((wattage * 1.35) / 120) * 120;

    const oSpk = document.getElementById('pa-out-spk');
    const oAmp = document.getElementById('pa-out-amp');
    const oMic = document.getElementById('pa-out-mic');
    const oNurse = document.getElementById('pa-out-nurse');
    const oSum = document.getElementById('pa-out-summary');

    if (oSpk) oSpk.textContent = `${speakers} سماعة سقفية/حائطية`;
    if (oAmp) oAmp.textContent = `${ampPower}W Matrix Amplifier`;
    if (oMic) oMic.textContent = `${zones} Zones + Paging Mic`;
    if (oNurse) oNurse.textContent = mode.includes('Nurse') ? `${zones * 8} نقاط استدعاء ممرضات` : `ربط إخلاء صوتي تلقائي`;
    if (oSum) {
        oSum.textContent = `النظام: ${mode} — يغطي مساحة ${area} م² موزعة على ${zones} مناطق صوتية مستقلة بقدرة إجمالية ${ampPower} وات.`;
    }
}

// 8. LC-06: IP-PBX & Intercom Sizer
function calcPbx() {
    const extEl = document.getElementById('pbx-ext');
    const aptsEl = document.getElementById('pbx-apts');
    const typeEl = document.getElementById('pbx-type');
    if (!extEl || !aptsEl) return;

    const ext = parseInt(extEl.value, 10) || 40;
    const apts = parseInt(aptsEl.value, 10) || 20;
    const type = typeEl ? typeEl.value : 'IP-PBX + Video Intercom';

    document.getElementById('pbx-ext-val').textContent = ext;
    document.getElementById('pbx-apts-val').textContent = apts;

    const pbxModel = ext <= 50 ? 'IP-PBX 60 Users' : (ext <= 150 ? 'IP-PBX 200 Users' : 'Enterprise PBX 500+');
    const poeSw = Math.ceil((ext + apts) / 24);

    const oSrv = document.getElementById('pbx-out-srv');
    const oPhones = document.getElementById('pbx-out-phones');
    const oIntercom = document.getElementById('pbx-out-intercom');
    const oSw = document.getElementById('pbx-out-sw');
    const oSum = document.getElementById('pbx-out-summary');

    if (oSrv) oSrv.textContent = pbxModel;
    if (oPhones) oPhones.textContent = `${ext} عدة تليفون IP HD`;
    if (oIntercom) oIntercom.textContent = `${apts} شاشة داخلية + لوحة باب`;
    if (oSw) oSw.textContent = `${poeSw}x سويتش PoE للربط`;
    if (oSum) {
        oSum.textContent = `المنظومة (${type}) تدعم الربط الصوتي والمرئي الكامل، الرد الآلي IVR، وتسجيل المكالمات.`;
    }
}

// 9. LC-07: Live Interactive Queue Ticket & Display Simulator
let currentQueueTicket = 104;
function issueQueueTicket(servicePrefix, serviceName) {
    currentQueueTicket++;
    const code = `${servicePrefix}-${currentQueueTicket}`;
    const numEl = document.getElementById('q-sim-ticket-num');
    const srvEl = document.getElementById('q-sim-ticket-srv');
    const winEl = document.getElementById('q-sim-window');
    const waitEl = document.getElementById('q-sim-wait');

    if (numEl) numEl.textContent = code;
    if (srvEl) srvEl.textContent = serviceName;
    if (winEl) winEl.textContent = `شباك رقم ${(currentQueueTicket % 6) + 1}`;
    if (waitEl) waitEl.textContent = `تم إصدار التذكرة ${code} بنجاح — يظهر النداء الآن على الشاشة الرئيسية وشاشة الشباك الفرعية مع نداء صوتي آلي باللغتين.`;
}

// 10. LC-08: Security Gates & Checkpoint Configurator
function calcSecurityGates() {
    const lanesEl = document.getElementById('sg-lanes');
    const fenceEl = document.getElementById('sg-fence');
    const levelEl = document.getElementById('sg-level');
    if (!lanesEl || !fenceEl) return;

    const lanes = parseInt(lanesEl.value, 10) || 2;
    const fence = parseInt(fenceEl.value, 10) || 450;
    const level = levelEl ? levelEl.value : 'High Security';

    document.getElementById('sg-lanes-val').textContent = lanes;
    document.getElementById('sg-fence-val').textContent = fence;

    const oGates = document.getElementById('sg-out-gates');
    const oXray = document.getElementById('sg-out-xray');
    const oBarriers = document.getElementById('sg-out-barriers');
    const oFence = document.getElementById('sg-out-fence');
    const oSum = document.getElementById('sg-out-summary');

    if (oGates) oGates.textContent = `${lanes}x بوابة كشف معادن 33-Zone`;
    if (oXray) oXray.textContent = `${Math.ceil(lanes / 2)}x جهاز X-Ray لفحص الحقائب`;
    if (oBarriers) oBarriers.textContent = `${lanes}x حاجز سيارات + قارئ لوحات`;
    if (oFence) oFence.textContent = `${fence} متر تأمين أسوار ضد التسلل`;
    if (oSum) {
        oSum.textContent = `مستوى التأمين (${level}): يحاكي منظومة تأمين محطة محولات المساعيد بالعريش (${fence}م أسوار + بوابات أفراد ومركبات + أجهزة تفتيش بالأشعة).`;
    }
}

// 11. LV/MV Electrical Grid Sizer
function calcLvMv() {
    const transEl = document.getElementById('lv-trans');
    const mvKmEl = document.getElementById('lv-mvkm');
    const lvKmEl = document.getElementById('lv-lvkm');
    const typeEl = document.getElementById('lv-type');
    if (!transEl || !mvKmEl || !lvKmEl) return;

    const trans = parseInt(transEl.value, 10) || 12;
    const mvKm = parseInt(mvKmEl.value, 10) || 8;
    const lvKm = parseInt(lvKmEl.value, 10) || 15;
    const type = typeEl ? typeEl.value : 'شبكة 11kV / 0.4kV';

    document.getElementById('lv-trans-val').textContent = trans;
    document.getElementById('lv-mvkm-val').textContent = mvKm;
    document.getElementById('lv-lvkm-val').textContent = lvKm;

    const dist = Math.max(1, Math.ceil(trans / 40));
    const totalKm = mvKm + lvKm;
    const joints = (trans * 4) + (mvKm * 3) + (lvKm * 2);
    const poles = lvKm * 25;

    const oDist = document.getElementById('lv-out-dist');
    const oCables = document.getElementById('lv-out-cables');
    const oJoints = document.getElementById('lv-out-joints');
    const oPoles = document.getElementById('lv-out-poles');
    const oSum = document.getElementById('lv-out-summary');

    if (oDist) oDist.textContent = `${dist} موزع + ${trans} محول`;
    if (oCables) oCables.textContent = `${totalKm} كم (${mvKm} MV + ${lvKm} LV)`;
    if (oJoints) oJoints.textContent = `${joints} علبة نهاية ولحام`;
    if (oPoles) oPoles.textContent = `${poles} عمود إنارة + لوحات`;
    if (oSum) {
        oSum.textContent = `نطاق التنفيذ: ${type} — يشمل أعمال الحفر، مد ${mvKm} كم جهد متوسط و${lvKm} كم جهد منخفض، تركيب ${trans} محول، واختبارات العزل Megger & Hi-Pot.`;
    }
}

// 12. LC-09: Smart Villa Interactive Sandbox
function applySmartScene(scene, btn) {
    document.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const badge = document.getElementById('villa-scene-badge');
    const pwr = document.getElementById('villa-power-val');
    const tmp = document.getElementById('villa-temp-val');
    const sec = document.getElementById('villa-sec-val');
    const log = document.getElementById('villa-live-log');

    const states = {
        welcome: {
            badge: 'وضع الاستقبال النهاري',
            pwr: '1.4 kW',
            tmp: '22°C',
            sec: 'مؤمّن 100%',
            log: '☀️ تم تفعيل وضع الاستقبال: فتح الستائر 100%، ضبط التكييف على 22°C، تشغيل الإضاءة الترحيبية وموسيقى الاستقبال الهادئة.',
            devs: { lights: true, ac: true, curtains: true, lock: true, audio: true, cctv: true }
        },
        cinema: {
            badge: 'وضع السينما المسائي',
            pwr: '0.9 kW',
            tmp: '21°C',
            sec: 'مؤمّن 100%',
            log: '🎬 تم تفعيل وضع السينما: إغلاق الستائر بالكامل، خفض الإضاءة إلى 15% Ambient، وتوجيه النظام الصوتي المحيطي لشاشة العرض.',
            devs: { lights: true, ac: true, curtains: false, lock: true, audio: true, cctv: true }
        },
        away: {
            badge: 'وضع المغادرة والتأمين الشامل',
            pwr: '0.2 kW',
            tmp: '26°C Eco',
            sec: 'حراسة مشددة',
            log: '🛡️ تم تفعيل وضع المغادرة: إغلاق كافة الإضاءات والتكييفات والستائر، قفل الأبواب بالبصمة، وتفعيل إنذار الحركة وكاميرات الأسوار.',
            devs: { lights: false, ac: false, curtains: false, lock: true, audio: false, cctv: true }
        },
        eco: {
            badge: 'وضع توفير الطاقة الذكي',
            pwr: '0.6 kW (-45%)',
            tmp: '24°C Auto',
            sec: 'مؤمّن 100%',
            log: '🌿 تم تفعيل وضع توفير الطاقة: ضبط التكييف تلقائياً على 24°C والاستفادة من الإضاءة الطبيعية لتقليل استهلاك الكهرباء بنسبة 45%.',
            devs: { lights: false, ac: true, curtains: true, lock: true, audio: false, cctv: true }
        }
    };

    const st = states[scene] || states.welcome;
    if (badge) badge.textContent = st.badge;
    if (pwr) pwr.textContent = st.pwr;
    if (tmp) tmp.textContent = st.tmp;
    if (sec) sec.textContent = st.sec;
    if (log) log.textContent = st.log;

    Object.keys(st.devs).forEach(k => {
        const card = document.getElementById('vdev-' + k);
        if (card) {
            card.classList.toggle('active', st.devs[k]);
        }
    });
}

function toggleVillaDevice(devKey) {
    const card = document.getElementById('vdev-' + devKey);
    if (!card) return;
    card.classList.toggle('active');
    const isOn = card.classList.contains('active');
    const statusEl = document.getElementById('vdev-' + devKey + '-status');
    if (statusEl) {
        statusEl.textContent = isOn ? 'نشط ويعمل الآن (ON)' : 'متوقف مؤقتاً (STANDBY)';
    }
}

// 13. Projects Filter Page
function filterProjectsPage(cat, btn) {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.project-full-case').forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// 14. Enterprise Multi-System BOQ Form Submission
function collectBoqMessage() {
    const checked = Array.from(document.querySelectorAll('input[name="boq_systems"]:checked')).map(i => i.value);
    const systemsStr = checked.length ? checked.join(' + ') : 'لم يتم تحديد نظام بعينه (استشارة عامة)';
    const projType = (document.getElementById('boq-proj-type') || {}).value || '';
    const projStage = (document.getElementById('boq-proj-stage') || {}).value || '';
    const loc = (document.getElementById('boq-location') || {}).value || '';
    const name = (document.getElementById('boq-name') || {}).value || '';
    const company = (document.getElementById('boq-company') || {}).value || '';
    const phone = (document.getElementById('boq-phone') || {}).value || '';
    const notes = (document.getElementById('boq-notes') || {}).value || '';

    return `مرحباً الإدارة الهندسية بشركة بيوت تك (Beyout Tech)،
أرغب في طلب مقايسة فنية / عرض سعر رسمي:
• الاسم: ${name} ${company ? '(' + company + ')' : ''}
• رقم التواصل: ${phone}
• الأنظمة المطلوبة: ${systemsStr}
• نوع المشروع: ${projType}
• حالة المشروع: ${projStage}
• الموقع: ${loc}
• ملاحظات فنية: ${notes || 'لا توجد'}`;
}

function submitEnterpriseBoq(e) {
    e.preventDefault();
    const msg = collectBoqMessage();
    const waUrl = `https://wa.me/201064334334?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
}

function submitEnterpriseBoqEmail() {
    const msg = collectBoqMessage();
    const mailUrl = `mailto:info@beyouttech.com?subject=${encodeURIComponent('طلب مقايسة فنية وعرض سعر - Beyout Tech')}&body=${encodeURIComponent(msg)}`;
    window.location.href = mailUrl;
}

function submitQuickContact(e) {
    e.preventDefault();
    const name = (document.getElementById('q-name') || {}).value || '';
    const phone = (document.getElementById('q-phone') || {}).value || '';
    const dept = (document.getElementById('q-dept') || {}).value || '';
    const msg = (document.getElementById('q-msg') || {}).value || '';
    const text = `مرحباً بيوت تك، رسالة جديدة من الموقع:
• الاسم: ${name}
• الهاتف: ${phone}
• القسم: ${dept}
• الرسالة: ${msg}`;
    window.open(`https://wa.me/201064334334?text=${encodeURIComponent(text)}`, '_blank');
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Pre-check system on quote.html if ?system=... is in URL
    const params = new URLSearchParams(window.location.search);
    const sysParam = params.get('system');
    if (sysParam) {
        const chk = document.querySelector(`input[data-sysid="${sysParam}"]`);
        if (chk) chk.checked = true;
    }

    // Apply saved language if English was chosen
    const savedLang = localStorage.getItem('beyout_lang');
    if (savedLang === 'en') {
        applySiteLanguage('en');
    }
});


// Exact Match Functions for systems_data.py Simulators
function calcDataFiber() {
    const pts = parseInt((document.getElementById('df-points') || {}).value, 10) || 90;
    const bldgs = parseInt((document.getElementById('df-bldgs') || {}).value, 10) || 3;
    const cat = (document.getElementById('df-cat') || {}).value || 'Cat6a';

    if (document.getElementById('df-points-val')) document.getElementById('df-points-val').textContent = pts;
    if (document.getElementById('df-bldgs-val')) document.getElementById('df-bldgs-val').textContent = bldgs;

    const racks = Math.max(1, bldgs);
    const sw24 = Math.ceil(pts / 22);
    const patch = Math.ceil(pts / 24);
    const rolls = Math.ceil((pts * 55) / 305);
    const cores = bldgs * 8;

    if (document.getElementById('df-out-racks')) document.getElementById('df-out-racks').textContent = `${racks}x Rack 27U/42U`;
    if (document.getElementById('df-out-switches')) document.getElementById('df-out-switches').textContent = `${sw24}x Switch 24P PoE`;
    if (document.getElementById('df-out-patch')) document.getElementById('df-out-patch').textContent = `${patch}x Patch Panel 24P`;
    if (document.getElementById('df-out-cables')) document.getElementById('df-out-cables').textContent = `${rolls} رول كابل (${rolls * 305}م)`;
    if (document.getElementById('df-out-fiber')) document.getElementById('df-out-fiber').textContent = `${cores} Core لحام + OTDR`;
    if (document.getElementById('df-out-summary')) {
        document.getElementById('df-out-summary').textContent = `التكوين المقترح (${cat}): يشمل سحب وتأريج ${pts} مخرج داتا، تجميع ${racks} راك، لحام ${cores} فرعة فايبر، وتسليم تقارير اختبار Fluke & OTDR المعتمدة.`;
    }
}

function calcCctv() {
    const cams = parseInt((document.getElementById('cctv-count') || {}).value, 10) || 32;
    const days = parseInt((document.getElementById('cctv-days') || {}).value, 10) || 30;
    const res = parseInt((document.getElementById('cctv-res') || {}).value, 10) || 4;

    if (document.getElementById('cctv-count-val')) document.getElementById('cctv-count-val').textContent = cams;
    if (document.getElementById('cctv-days-val')) document.getElementById('cctv-days-val').textContent = days;

    const mbps = res === 8 ? 6 : (res === 5 ? 4 : (res === 4 ? 3 : 1.8));
    const bw = (cams * mbps).toFixed(0);
    const tb = Math.max(4, Math.ceil((cams * mbps * 86400 * days) / (8 * 1024 * 1024) * 0.65));
    const hdds = Math.ceil(tb / 8);
    const nvrCh = cams <= 16 ? 16 : (cams <= 32 ? 32 : (cams <= 64 ? 64 : 128));
    const poe = Math.ceil(cams / 16);

    if (document.getElementById('cctv-out-nvr')) document.getElementById('cctv-out-nvr').textContent = `1x NVR ${nvrCh}-Ch 4K`;
    if (document.getElementById('cctv-out-tb')) document.getElementById('cctv-out-tb').textContent = `${tb} TB Storage`;
    if (document.getElementById('cctv-out-hdd')) document.getElementById('cctv-out-hdd').textContent = `${hdds}x HDD 8TB Enterprise`;
    if (document.getElementById('cctv-out-bw')) document.getElementById('cctv-out-bw').textContent = `${bw} Mbps`;
    if (document.getElementById('cctv-out-poe')) document.getElementById('cctv-out-poe').textContent = `${poe}x PoE Switch`;
    if (document.getElementById('cctv-out-summary')) {
        document.getElementById('cctv-out-summary').textContent = `المنظومة تدعم ${cams} كاميرا مراقبة بدقة ${res}MP مع تسجيل مستمر 24/7 لمدة ${days} يوم بضغط ذكي H.265+ ومساحة إجمالية ${tb} تيرابايت.`;
    }
}

function simFireAlarm() {
    const area = parseInt((document.getElementById('fa-area') || {}).value, 10) || 1200;
    const floors = parseInt((document.getElementById('fa-floors') || {}).value, 10) || 3;
    const type = (document.getElementById('fa-type') || {}).value || 'Addressable';

    if (document.getElementById('fa-area-val')) document.getElementById('fa-area-val').textContent = area;
    if (document.getElementById('fa-floors-val')) document.getElementById('fa-floors-val').textContent = floors;

    const smoke = Math.ceil((area * floors) / 45);
    const heat = floors * 3;
    const siren = floors * 4;
    const mcp = floors * 2;
    const mod = floors * 2;
    const loops = Math.max(1, Math.ceil((smoke + heat + siren + mcp + mod) / 125));

    if (document.getElementById('fa-out-panel')) document.getElementById('fa-out-panel').textContent = `${loops}-Loop Panel`;
    if (document.getElementById('fa-out-smoke')) document.getElementById('fa-out-smoke').textContent = `${smoke} Smoke`;
    if (document.getElementById('fa-out-heat')) document.getElementById('fa-out-heat').textContent = `${heat} Heat`;
    if (document.getElementById('fa-out-siren')) document.getElementById('fa-out-siren').textContent = `${siren} Sirens`;
    if (document.getElementById('fa-out-mcp')) document.getElementById('fa-out-mcp').textContent = `${mcp} Break Glass`;
    if (document.getElementById('fa-out-mod')) document.getElementById('fa-out-mod').textContent = `${mod} Modules`;
    if (document.getElementById('fa-out-summary')) {
        document.getElementById('fa-out-summary').textContent = `التكوين (${type}): يغطي ${floors} طوابق بمساحة إجمالية ${area * floors} م² شامل لوحة الإنذار، ${smoke} حساس دخان، ${heat} حساس حرارة، ووحدات الربط مع المصاعد والتكييف.`;
    }
}

function simAccessZone() {
    const emp = parseInt((document.getElementById('ac-emp') || {}).value, 10) || 150;
    const doors = parseInt((document.getElementById('ac-doors') || {}).value, 10) || 8;
    const fac = (document.getElementById('ac-facility') || {}).value || 'مقر إداري';

    if (document.getElementById('ac-emp-val')) document.getElementById('ac-emp-val').textContent = emp;
    if (document.getElementById('ac-doors-val')) document.getElementById('ac-doors-val').textContent = doors;

    const terms = Math.max(1, Math.ceil(emp / 100));
    const ctrls = Math.ceil(doors / 4);

    if (document.getElementById('ac-out-term')) document.getElementById('ac-out-term').textContent = `${terms}x AI Face/Bio`;
    if (document.getElementById('ac-out-ctrl')) document.getElementById('ac-out-ctrl').textContent = `${ctrls}x 4-Door Panel`;
    if (document.getElementById('ac-out-locks')) document.getElementById('ac-out-locks').textContent = `${doors}x EM Locks`;
    if (document.getElementById('ac-out-exit')) document.getElementById('ac-out-exit').textContent = `${doors}x Touchless Exit`;
    if (document.getElementById('ac-out-cards')) document.getElementById('ac-out-cards').textContent = `${emp}x RFID Cards`;
    if (document.getElementById('ac-out-summary')) {
        document.getElementById('ac-out-summary').textContent = `منظومة متكاملة لـ (${fac}) تشمل ${terms} جهاز بصمة وجه وحضور وانصراف، وتأمين ${doors} أبواب بكوالين مغناطيسية مربوطة بنظام إنذار الحريق.`;
    }
}

function simSoundZone() {
    const type = (document.getElementById('snd-type') || {}).value || 'pa';
    const size = parseInt((document.getElementById('snd-size') || {}).value, 10) || 35;
    const zones = parseInt((document.getElementById('snd-zones') || {}).value, 10) || 4;

    if (document.getElementById('snd-size-val')) document.getElementById('snd-size-val').textContent = size;
    if (document.getElementById('snd-zones-val')) document.getElementById('snd-zones-val').textContent = zones;

    if (type === 'nurse') {
        if (document.getElementById('snd-out-spk')) document.getElementById('snd-out-spk').textContent = `${size}x Bed Unit`;
        if (document.getElementById('snd-lbl-1')) document.getElementById('snd-lbl-1').textContent = 'وحدات استدعاء سرير';
        if (document.getElementById('snd-out-amp')) document.getElementById('snd-out-amp').textContent = `${size}x Pull Cord`;
        if (document.getElementById('snd-lbl-2')) document.getElementById('snd-lbl-2').textContent = 'شدادات طوارئ حمام';
        if (document.getElementById('snd-out-mic')) document.getElementById('snd-out-mic').textContent = `${zones}x Master Console`;
        if (document.getElementById('snd-lbl-3')) document.getElementById('snd-lbl-3').textContent = 'لوحات كاونتر التمريض';
        if (document.getElementById('snd-out-evac')) document.getElementById('snd-out-evac').textContent = `${size}x Over-Door LED`;
        if (document.getElementById('snd-lbl-4')) document.getElementById('snd-lbl-4').textContent = 'لمبات بيان أعلى الغرف';
        if (document.getElementById('snd-out-zones')) document.getElementById('snd-out-zones').textContent = `${zones} أقسام طبية`;
        if (document.getElementById('snd-out-summary')) {
            document.getElementById('snd-out-summary').textContent = `منظومة استدعاء ممرضات رقمية (Nurse Call) تغطي ${size} غرفة/سرير موزعة على ${zones} أقسام تمريض شاملة شدادات الحمام ولمبات البيان.`;
        }
    } else {
        const watts = size * 6;
        const ampW = Math.ceil((watts * 1.3) / 120) * 120;
        if (document.getElementById('snd-out-spk')) document.getElementById('snd-out-spk').textContent = `${size}x Speakers 6W`;
        if (document.getElementById('snd-lbl-1')) document.getElementById('snd-lbl-1').textContent = 'سماعات سقفية وحائطية';
        if (document.getElementById('snd-out-amp')) document.getElementById('snd-out-amp').textContent = `${ampW}W Amplifier`;
        if (document.getElementById('snd-lbl-2')) document.getElementById('snd-lbl-2').textContent = 'مكبر صوت مركزي';
        if (document.getElementById('snd-out-mic')) document.getElementById('snd-out-mic').textContent = `2x Paging Mic`;
        if (document.getElementById('snd-lbl-3')) document.getElementById('snd-lbl-3').textContent = 'ميكروفون نداء مناطق';
        if (document.getElementById('snd-out-evac')) document.getElementById('snd-out-evac').textContent = `EN54 Voice Evac`;
        if (document.getElementById('snd-lbl-4')) document.getElementById('snd-lbl-4').textContent = 'وحدة رسائل الإخلاء';
        if (document.getElementById('snd-out-zones')) document.getElementById('snd-out-zones').textContent = `${zones} Zones`;
        if (document.getElementById('snd-out-summary')) {
            document.getElementById('snd-out-summary').textContent = `نظام إذاعة داخلية وإخلاء صوتي يضم ${size} سماعة موزعة على ${zones} مناطق مستقلة بقدرة تكبير إجمالية ${ampW} وات.`;
        }
    }
}

function calcPbx() {
    const ext = parseInt((document.getElementById('pbx-ext') || {}).value, 10) || 50;
    const br = parseInt((document.getElementById('pbx-br') || {}).value, 10) || 2;
    const mode = (document.getElementById('pbx-mode') || {}).value || 'IP-PBX';

    if (document.getElementById('pbx-ext-val')) document.getElementById('pbx-ext-val').textContent = ext;
    if (document.getElementById('pbx-br-val')) document.getElementById('pbx-br-val').textContent = br;

    const core = ext <= 100 ? '1x IP-PBX 100U' : (ext <= 300 ? '1x IP-PBX 300U' : 'Enterprise PBX 500U');
    const calls = Math.max(15, Math.ceil(ext * 0.4));
    const sw = Math.ceil(ext / 22);

    if (document.getElementById('pbx-out-core')) document.getElementById('pbx-out-core').textContent = core;
    if (document.getElementById('pbx-out-calls')) document.getElementById('pbx-out-calls').textContent = `${calls} مكالمة متزامنة`;
    if (document.getElementById('pbx-out-phones')) document.getElementById('pbx-out-phones').textContent = `${ext}x IP Phones`;
    if (document.getElementById('pbx-out-sw')) document.getElementById('pbx-out-sw').textContent = `${sw}x PoE Switch`;
    if (document.getElementById('pbx-out-gw')) document.getElementById('pbx-out-gw').textContent = `${br}x VoIP Gateway`;
    if (document.getElementById('pbx-out-summary')) {
        document.getElementById('pbx-out-summary').textContent = `النظام (${mode}): يربط ${ext} تحويلة داخلية عبر ${br} فروع/مباني مع دعم الرد الآلي IVR وتسجيل المكالمات والإنتركم.`;
    }
}

let qTicketCounter = 101;
let qWaitingCount = 3;
let lastIssuedPrefix = 'A';
let lastIssuedSrv = 'خدمات المواطنين والشهر العقاري';

function issueQueueTicket(prefix, srvName) {
    qTicketCounter++;
    qWaitingCount++;
    lastIssuedPrefix = prefix;
    lastIssuedSrv = srvName;
    const code = `${prefix}-${qTicketCounter}`;
    const counterNum = ((qTicketCounter % 8) + 1).toString().padStart(2, '0');

    if (document.getElementById('q-live-ticket')) document.getElementById('q-live-ticket').textContent = code;
    if (document.getElementById('q-live-counter')) document.getElementById('q-live-counter').textContent = `⬅ التوجه إلى شباك رقم (${counterNum})`;
    if (document.getElementById('q-live-srv')) document.getElementById('q-live-srv').textContent = srvName;
    if (document.getElementById('q-live-wait')) document.getElementById('q-live-wait').textContent = `${qWaitingCount} عملاء`;
    if (document.getElementById('q-live-voice')) {
        document.getElementById('q-live-voice').textContent = `🖨️ تم طباعة التذكرة رقم (${code}) — الخدمة: ${srvName}. اضغط "نداء العميل التالي" لاستدعائها على الشاشة.`;
    }
}

function callNextQueueTicket() {
    if (qWaitingCount > 1) qWaitingCount--;
    const code = `${lastIssuedPrefix}-${qTicketCounter}`;
    const counterNum = ((qTicketCounter % 8) + 1).toString().padStart(2, '0');
    if (document.getElementById('q-live-ticket')) document.getElementById('q-live-ticket').textContent = code;
    if (document.getElementById('q-live-counter')) document.getElementById('q-live-counter').textContent = `🔔 الآن على شباك رقم (${counterNum})`;
    if (document.getElementById('q-live-wait')) document.getElementById('q-live-wait').textContent = `${qWaitingCount} عملاء`;
    if (document.getElementById('q-live-voice')) {
        document.getElementById('q-live-voice').textContent = `🔊 النداء الصوتي الآلي: "العميل رقم ${code} (${lastIssuedSrv})، برجاء التوجه إلى شباك رقم ${parseInt(counterNum, 10)}".`;
    }
}

function simSecurityGate() {
    const ped = parseInt((document.getElementById('sg-ped') || {}).value, 10) || 2;
    const car = parseInt((document.getElementById('sg-car') || {}).value, 10) || 2;
    const wall = parseInt((document.getElementById('sg-wall') || {}).value, 10) || 450;

    if (document.getElementById('sg-ped-val')) document.getElementById('sg-ped-val').textContent = ped;
    if (document.getElementById('sg-car-val')) document.getElementById('sg-car-val').textContent = car;
    if (document.getElementById('sg-wall-val')) document.getElementById('sg-wall-val').textContent = wall;

    if (document.getElementById('sg-out-metal')) document.getElementById('sg-out-metal').textContent = `${ped}x Metal Gate`;
    if (document.getElementById('sg-out-xray')) document.getElementById('sg-out-xray').textContent = `${ped}x X-Ray Scanner`;
    if (document.getElementById('sg-out-barrier')) document.getElementById('sg-out-barrier').textContent = `${car}x Car Barrier`;
    if (document.getElementById('sg-out-fence')) document.getElementById('sg-out-fence').textContent = `${wall}m PIDS`;
    if (document.getElementById('sg-out-hand')) document.getElementById('sg-out-hand').textContent = `${ped * 2}x Hand-Held`;
    if (document.getElementById('sg-out-summary')) {
        document.getElementById('sg-out-summary').textContent = `منظومة تأمين متكاملة تشمل ${ped} بوابة كشف معادن وأجهزة X-Ray، ${car} بوابة سيارات أوتوماتيكية، وتأمين سور بطول ${wall} متر ضد التسلل.`;
    }
}


// v4.1.0 Mobile Navigation & Dropdown Fix
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
    if (menuToggle) {
        menuToggle.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navLinks && navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Allow tapping "أنظمة التيار الخفيف" on mobile to expand/collapse the 9 systems list
    const dropTrigger = document.querySelector('.nav-dropdown-trigger');
    const dropWrap = document.querySelector('.nav-dropdown-wrap');
    if (dropTrigger && dropWrap) {
        dropTrigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 1180) {
                e.preventDefault();
                e.stopPropagation();
                dropWrap.classList.toggle('open-mobile');
            }
        });
    }
});


// Override selectPackage for Multi-Page Architecture (redirects to quote.html with package prefilled)
function selectPackage(packageName) {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    window.location.href = `quote.html?system=sys-smart-home&pkg=${encodeURIComponent(packageName)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pkgParam = params.get('pkg');
    if (pkgParam) {
        const notesEl = document.getElementById('boq-notes');
        if (notesEl) {
            notesEl.value = `أرغب في طلب عرض سعر وحجز باقة السمارت هوم: (${pkgParam})`;
        }
        const typeEl = document.getElementById('boq-proj-type');
        if (typeEl) {
            typeEl.value = 'فيلا سكنية / قصر / شقة فاخرة (Smart Home)';
        }
    }
});
