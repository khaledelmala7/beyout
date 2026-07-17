// Vexora AI Security Application Logic
const TELEGRAM_CHAT_ID = '498398965';
const TELEGRAM_BOT_TOKEN = '8910847998:AAH-PJb4Rc3w2cflpVcVB08WSbb3Vx-Gtt8';
let currentLanguage = 'ar';
let currentFormStep = 1;
let selectedFormProduct = 'vexora';

document.addEventListener('DOMContentLoaded', () => {
    selectedFormProduct = 'vexora';

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
    
    setLanguage(currentLanguage);
    updateProgressBar();
});

// Interactive Sandbox for Vexora AI Video Analytics
function triggerVexoraScenario(scen) {
    const streamImg = document.getElementById('cam-stream-img');
    const detectBox = document.getElementById('mock-detection-box');
    const aiTargetCircle = document.getElementById('ai-target-circle');
    const aiTargetLine = document.getElementById('ai-target-line');
    const feedbackMsg = document.getElementById('sim-feedback-vexora');
    const logsContainer = document.getElementById('alert-logs');
    
    // De-activate all scenario buttons
    document.querySelectorAll('.simulator-controls .mock-btn').forEach(btn => btn.classList.remove('active'));
    
    const time = new Date().toTimeString().split(' ')[0];
    
    if (scen === 'clear') {
        document.getElementById('btn-scen-clear').classList.add('active');
        if (streamImg) streamImg.src = 'assets/vexora_safety_vest.jpg';
        if (detectBox) detectBox.style.display = 'none';
        if (aiTargetCircle) aiTargetCircle.style.display = 'none';
        if (aiTargetLine) aiTargetLine.style.display = 'none';
        if (feedbackMsg) feedbackMsg.textContent = (currentLanguage === 'ar') ? 'تم إرجاع الكاميرا للبث المباشر والوضع آمن.' : 'Camera feed reset to live normal view.';
        
    } else if (scen === 'intruder') {
        document.getElementById('btn-scen-intruder').classList.add('active');
        if (streamImg) streamImg.src = 'assets/vexora_perimeter_fence.jpg';
        if (detectBox) {
            detectBox.style.display = 'block';
            detectBox.className = 'camera-detection-box warning-box';
            detectBox.style.left = '40%'; detectBox.style.top = '30%'; detectBox.style.width = '20%'; detectBox.style.height = '50%';
        }
        if (aiTargetCircle) {
            aiTargetCircle.style.display = 'block';
            aiTargetCircle.style.left = '50%'; aiTargetCircle.style.top = '55%';
        }
        if (aiTargetLine) aiTargetLine.style.display = 'none';
        
        if (feedbackMsg) feedbackMsg.textContent = (currentLanguage === 'ar') ? '⚠️ إنذار: تم رصد جسم غريب يتسلق السياج الخارجي بعد ساعات العمل!' : '⚠️ Alert: Intruder detected climbing perimeter fence after hours!';
        
        if (logsContainer) {
            const logMsg = (currentLanguage === 'ar') ? '⚠️ رصد اختراق أمني - سياج المحيط الخارجي' : '⚠️ Intrusion detected - Perimeter fence area';
            logsContainer.innerHTML = `<div class="log-entry warning"><span class="time">${time}</span><span class="msg">${logMsg}</span></div>` + logsContainer.innerHTML;
        }
        
    } else if (scen === 'fire') {
        document.getElementById('btn-scen-fire').classList.add('active');
        if (streamImg) streamImg.src = 'assets/vexora_fire.jpg';
        if (detectBox) {
            detectBox.style.display = 'block';
            detectBox.className = 'camera-detection-box danger-box';
            detectBox.style.left = '30%'; detectBox.style.top = '20%'; detectBox.style.width = '40%'; detectBox.style.height = '60%';
        }
        if (aiTargetCircle) aiTargetCircle.style.display = 'none';
        if (aiTargetLine) aiTargetLine.style.display = 'none';
        
        if (feedbackMsg) feedbackMsg.textContent = (currentLanguage === 'ar') ? '🚨 حرج: رصد دخان ونيران مشتعلة في المنطقة المغطاة! تم إخطار الحماية المدنية.' : '🚨 Critical: Smoke and active fire detected! Fire department notified.';
        
        if (logsContainer) {
            const logMsg = (currentLanguage === 'ar') ? '🚨 إنذار حرج: خطر حريق/لهب نشط - مستودع ب' : '🚨 Critical alarm: Active fire/smoke - Warehouse B';
            logsContainer.innerHTML = `<div class="log-entry danger"><span class="time">${time}</span><span class="msg">${logMsg}</span></div>` + logsContainer.innerHTML;
        }
    }
}

// B2B Sector click helper
function selectSector(sectorName) {
    const notesField = document.getElementById('cust_notes');
    if (notesField) {
        notesField.value = `أريد استشارة أمنية وتطبيق فيكسورا في نشاطنا: ${sectorName}`;
    }
    
    // Go to step 2 directly
    nextStep(2);
    
    // Scroll smoothly to form section
    const demoSection = document.getElementById('demo-section');
    if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
}

// Multi step form
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
    if (currentFormStep === 1) return true;
    
    if (currentFormStep === 2) {
        const nameInput = document.getElementById('cust_name');
        const emailInput = document.getElementById('cust_email');
        const phoneInput = document.getElementById('cust_phone');
        const companyInput = document.getElementById('company_name');
        
        if (!nameInput || !emailInput || !phoneInput || !companyInput) return false;
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const company = companyInput.value.trim();
        
        if (!name || !email || !phone || !company) {
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
            alert((currentLanguage === 'ar') ? 'الرجاء اختيار تاريخ ووقت حجز الديمو.' : 'Please select a date and time.');
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
    
    document.getElementById('success-user-name').textContent = name;
    document.getElementById('success-date').textContent = dateVal;
    document.getElementById('success-phone').textContent = phone;
    
    let timeLabel = timeVal;
    if (timeVal === 'morning') timeLabel = (currentLanguage === 'ar') ? 'الصباحية' : 'Morning';
    if (timeVal === 'afternoon') timeLabel = (currentLanguage === 'ar') ? 'بعد الظهر' : 'Afternoon';
    if (timeVal === 'evening') timeLabel = (currentLanguage === 'ar') ? 'المسائية' : 'Evening';
    document.getElementById('success-time').textContent = timeLabel;
    
    // Save lead
    const leadData = {
        name,
        email: document.getElementById('cust_email').value.trim(),
        phone,
        product: 'vexora',
        company: document.getElementById('company_name').value.trim(),
        date: dateVal,
        time: timeVal,
        notes: document.getElementById('cust_notes') ? document.getElementById('cust_notes').value.trim() : '',
        submittedAt: new Date().toISOString()
    };
    
    let existingLeads = JSON.parse(localStorage.getItem('vexora_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('vexora_leads', JSON.stringify(existingLeads));

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
    const ownerPhone = "201064334334";
    const msg = `مرحباً فيكسورا، أود حجز موعد ديمو:
الاسم: ${name}
الهاتف: ${phone}
الشركة: ${leadData.company || 'لا يوجد'}
التاريخ المفضل: ${dateVal}
الفترة: ${timeLabel}
ملاحظات: ${leadData.notes || 'لا يوجد'}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${ownerPhone}&text=${encodeURIComponent(msg)}`;
    window.location.href = whatsappUrl;

    // Send Telegram Notification
    if (typeof TELEGRAM_BOT_TOKEN !== 'undefined' && TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
        const telegramMsg = `🔔 *طلب حجز جديد (VEXORA)* 🔔\n\n` +
            `👤 *الاسم:* ${name}\n` +
            `📞 *الهاتف:* ${phone}\n` +
            `🏢 *الشركة:* ${leadData.company || 'لا يوجد'}\n` +
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
    
    document.body.className = `theme-vexora lang-${lang}`;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
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
        "nav_solutions": "الأنشطة",
        "nav_products": "المنتجات",
        "nav_blog": "المدونة",
        "nav_contact": "اتصل بنا",
        "nav_to_beyout": "بيوت للمنازل الذكية (B2C)",
        
        "vexora_page_title": "فيكسورا | أنظمة حماية وتحليل كاميرات المراقبة بالذكاء الاصطناعي",
        "vexora_hero_title": "عيون رقمية ذكية لا تنام لحماية أعمالك",
        "vexora_hero_subtitle": "تحليلات كاميرات المراقبة بالذكاء الاصطناعي لرصد التسلل والحرائق وتحسين الإنتاجية فوراً.",
        "btn_start_now": "ابدأ الآن",
        
        "sectors_subtitle": "الأنشطة والقطاعات",
        "sectors_title": "أين تعمل تحليلات فيكسورا بالذكاء الاصطناعي؟",
        "sectors_desc": "ندمج كاميرات المراقبة الحالية لشركتك مع الذكاء الاصطناعي لتأمين وإدارة أهم الأنشطة التجارية والاستثمارية.",
        
        "sec_title_schools": "المدارس والمؤسسات التعليمية",
        "sec_desc_schools": "حماية أمنية شاملة للطلاب وبوابات المدارس ضد الغرباء.",
        "sec_feat_schools_1": "🏫 تأمين بوابات المدارس ومحيطها الخارجي.",
        "sec_feat_schools_2": "🚶‍♂️ رصد تلقائي لأي حركة مريبة أو غرباء.",
        "sec_feat_schools_3": "📱 تنبيه فوري للإدارة والمسؤولين عند الطوارئ.",
        
        "sec_title_factories": "المصانع والمناطق الصناعية",
        "sec_desc_factories": "مراقبة الالتزام بمعايير السلامة المهنية وتجنب الحوادث.",
        "sec_feat_factories_1": "👷‍♂️ رصد ارتداء الخوذات وسترات الأمان فورياً.",
        "sec_feat_factories_2": "🔥 كشف فوري ومبكر للدخان والحرائق.",
        "sec_feat_factories_3": "🛡️ حماية خطوط الإنتاج والآلات والمواد الخام.",
        
        "sec_title_supermarkets": "السوبر ماركت ومحلات التجزئة",
        "sec_desc_supermarkets": "تحسين تجربة تسوق العملاء ومنع السرقات.",
        "sec_feat_supermarkets_1": "🥫 تنبيه فوري لوجود رفوف بضائع فارغة.",
        "sec_feat_supermarkets_2": "🚶‍♂️ مراقبة طوابير الكاشير لتفادي الازدحام.",
        "sec_feat_supermarkets_3": "🛡️ رصد سرقة الأصول أو التلاعب بالصندوق.",
        
        "sec_title_construction": "موقع العمل والمشاريع الإنشائية",
        "sec_desc_construction": "تأمين محيط العمل ومنع تسلل الغرباء ليلاً.",
        "sec_feat_construction_1": "🌙 تأمين كامل للموقع ضد الاختراقات الليلية.",
        "sec_feat_construction_2": "🚜 رصد وتتبع الآلات والمعدات الثقيلة.",
        "sec_feat_construction_3": "👷‍♂️ مراقبة التزام العمال بقواعد السلامة.",
        
        "sec_title_offices": "المباني الإدارية والشركات",
        "sec_desc_offices": "إدارة كاملة لحركة دخول الموظفين والزوار الذكية.",
        "sec_feat_offices_1": "🚪 التحكم الذكي بالبوابات والتكامل مع نظام حضور الموظفين.",
        "sec_feat_offices_2": "🔒 تأمين الغرف الحساسة والملفات ومخازن البيانات.",
        "sec_feat_offices_3": "📈 تقارير دورية بالزوار وحالة المبنى الأمنية.",
        
        "sec_title_malls": "المولات والمراكز التجارية",
        "sec_desc_malls": "تحليل كثافة المتسوقين وتأمين السيارات والأرواح.",
        "sec_feat_malls_1": "📈 الخرائط الحرارية لرصد الكثافة ومناطق الجذب.",
        "sec_feat_malls_2": "🚗 رصد لوحات السيارات وإدارة مواقف السيارات.",
        "sec_feat_malls_3": "🚨 كشف السلوكيات المريبة والتنبؤ بالجرائم قبل حدوثها.",
        
        "sec_cta_btn": "طلب استشارة مجانية",
        
        "sandbox_subtitle": "منطقة المحاكاة المتكاملة",
        "sandbox_title_vexora": "جرّب لوحة تحكم التحليل الأمني بنفسك",
        "sandbox_desc_vexora": "اختبر تحليلات فيكسورا ورصد المتسللين ومخاطر الحريق لحظياً على البث المباشر.",
        
        "vexora_cam_name": "CAM 01 - المستودع الرئيسي",
        "vexora_alert_logs_lbl": "سجل التنبيهات الأمنية",
        "vexora_log_vehicle": "مرور مركبة مصرحة - لوحة رقم 4829",
        
        "sandbox_vex_ctrl_title": "أدوات اختبار التحليل الذكي Vexora",
        "sandbox_vex_ctrl_desc": "تحكم بالكاميرا وقم بمحاكاة سيناريوهات حقيقية لرؤية رد فعل الذكاء الاصطناعي ورصد المخالفات.",
        "sandbox_vex_scen_clear": "الوضع الطبيعي (تصفير الكاميرا)",
        "sandbox_vex_scen_intruder": "محاكاة متسلل بعد ساعات العمل",
        "sandbox_vex_scen_fire": "محاكاة خطر حريق/دخان",
        "sandbox_vex_feedback_msg": "اضغط على السيناريوهات أعلاه لرؤية كيف يقوم الذكاء الاصطناعي بتحليل البث وتنبيه صاحب العمل.",
        
        "form_section_title": "ابدأ رحلتك معنا اليوم",
        "form_section_subtitle": "احجز نسختك التجريبية والمجانية (Demo) وسيتواصل معك مستشارونا فورياً",
        "form_step1_lbl": "المنتج المطلوب",
        "form_step2_lbl": "بياناتك",
        "form_step3_lbl": "التفاصيل والوقت",
        "form_step4_lbl": "تأكيد الطلب",
        "form_step1_title_vexora": "ترقية نظام الأمان لشركتك؟",
        
        "form_product_vexora_desc": "أنظمة حماية وتحليل كاميرات المراقبة بالذكاء الاصطناعي.",
        "form_btn_next": "التالي ←",
        "form_btn_prev": "→ السابق",
        "form_btn_submit": "تأكيد طلب ديمو الشركات 🚀",
        
        "form_step2_title": "أخبرنا بالمزيد عن شركتك لنتمكن من التواصل معك",
        "form_lbl_name": "الاسم بالكامل ",
        "form_lbl_email": "البريد الإلكتروني للعمل ",
        "form_lbl_phone": "رقم الهاتف / الواتساب ",
        "form_lbl_company": "اسم الشركة والنشاط ",
        
        "form_step3_title": "متى ترغب في عقد جلسة الاستشارة الأمنية (الديمو)؟",
        "form_lbl_date": "التاريخ المفضل ",
        "form_lbl_time": "الوقت المفضل للاتصال ",
        "form_time_choose": "اختر الوقت المناسب",
        "form_time_morning": "صباحاً (9:00 ص - 12:00 م)",
        "form_time_afternoon": "بعد الظهر (12:00 م - 4:00 م)",
        "form_time_evening": "مساءً (4:00 م - 8:00 م)",
        "form_lbl_notes_vexora": "أكبر تحدي أمني أو متطلبات خاصة تودون مناقشتها؟",
        
        "form_success_thanks": "شكراً لطلبك، ",
        "form_success_desc_vexora": "تم تسجيل طلبك بنجاح لحجز ديمو خاص بنظام فيكسورا الأمني للشركات.",
        "form_success_schedule": "موعدك المقترح: ",
        "form_success_period": " في الفترة الـ ",
        "form_success_whatsapp": "سنقوم بإرسال رسالة تأكيد على واتساب برقم ",
        "form_success_whatsapp_sub": " وتفاصيل الاجتماع خلال ساعة.",
        "form_success_reset_btn": "طلب حجز جديد",
        
        "footer_about_text_vexora": "مستشارك الأمني التكنولوجي الموثوق لتحليلات الفيديو الفورية وكاميرات المراقبة بالذكاء الاصطناعي.",
        "footer_links_title": "روابط سريعة",
        "footer_copyright_vexora": "&copy; 2026 شركة فيكسورا (Vexora). جميع الحقوق محفوظة."
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
        "nav_solutions": "Sectors",
        "nav_products": "Products",
        "nav_blog": "Blog",
        "nav_contact": "Contact Us",
        "nav_to_beyout": "Beyout Smart Home (B2C)",
        
        "vexora_page_title": "Vexora | AI Video Surveillance & Threat Detection",
        "vexora_hero_title": "Smart Digital Eyes That Never Sleep to Protect Your Business",
        "vexora_hero_subtitle": "AI video analytics to detect intrusion, fires, and optimize productivity instantly.",
        "btn_start_now": "Start Now",
        
        "sectors_subtitle": "Sectors & Activities",
        "sectors_title": "Where Does Vexora AI Video Analytics Work?",
        "sectors_desc": "We integrate your existing surveillance cameras with artificial intelligence to protect and manage key business and investment activities.",
        
        "sec_title_schools": "Schools & Educational Institutions",
        "sec_desc_schools": "Comprehensive security protection for students and school gates against intruders.",
        "sec_feat_schools_1": "🏫 Secure school gates and external perimeter.",
        "sec_feat_schools_2": "🚶‍♂️ Automatic detection of suspicious movement or strangers.",
        "sec_feat_schools_3": "📱 Immediate alert to administration in emergencies.",
        
        "sec_title_factories": "Factories & Industrial Zones",
        "sec_desc_factories": "Monitoring compliance with safety standards and preventing accidents.",
        "sec_feat_factories_1": "👷‍♂️ Detect hard hats and safety vest compliance instantly.",
        "sec_feat_factories_2": "🔥 Instant and early detection of smoke and fire.",
        "sec_feat_factories_3": "🛡️ Protect production lines, heavy machines, and raw materials.",
        
        "sec_title_supermarkets": "Supermarkets & Retail Stores",
        "sec_desc_supermarkets": "Enhancing customer shopping experience and preventing theft.",
        "sec_feat_supermarkets_1": "🥫 Instant alert for empty product shelves.",
        "sec_feat_supermarkets_2": "🚶‍♂️ Monitor checkout queues to prevent congestion.",
        "sec_feat_supermarkets_3": "🛡️ Detect asset theft or cash register tampering.",
        
        "sec_title_construction": "Construction Sites & Projects",
        "sec_desc_construction": "Secure the site perimeter and prevent intrusions after hours.",
        "sec_feat_construction_1": "🌙 Total protection against after-hours intrusion.",
        "sec_feat_construction_2": "🚜 Monitor and track heavy equipment and machinery.",
        "sec_feat_construction_3": "👷‍♂️ Ensure labor compliance with safety gear.",
        
        "sec_title_offices": "Office Buildings & Corporate Offices",
        "sec_desc_offices": "Smart management of employee and visitor access control.",
        "sec_feat_offices_1": "🚪 Smart access control gate integration with employee attendance.",
        "sec_feat_offices_2": "🔒 Secure sensitive rooms, archives, and servers.",
        "sec_feat_offices_3": "📈 Regular visitor reports and building security status.",
        
        "sec_title_malls": "Malls & Shopping Centers",
        "sec_desc_malls": "Analyze shopper densities and secure parking spaces.",
        "sec_feat_malls_1": "📈 Heatmaps to monitor occupancy and attraction zones.",
        "sec_feat_malls_2": "🚗 Automatic plate recognition and parking management.",
        "sec_feat_malls_3": "🚨 Detect suspicious behaviors and preempt potential theft.",
        
        "sec_cta_btn": "Request Free Consultation",
        
        "sandbox_subtitle": "Interactive Simulator Sandbox",
        "sandbox_title_vexora": "Try Out the Security Dashboard Yourself",
        "sandbox_desc_vexora": "Test Vexora's AI analytics. Track intruders and simulate fire hazards on a live camera feed.",
        
        "vexora_cam_name": "CAM 01 - Main Warehouse",
        "vexora_alert_logs_lbl": "Security Alert Log",
        "vexora_log_vehicle": "Authorized vehicle passed - Plate 4829",
        
        "sandbox_vex_ctrl_title": "Vexora Intelligent Analysis Tools",
        "sandbox_vex_ctrl_desc": "Simulate real-life scenarios to see the AI camera analytics respond in real-time.",
        "sandbox_vex_scen_clear": "Normal View (Reset Camera)",
        "sandbox_vex_scen_intruder": "Simulate Intruder After-Hours",
        "sandbox_vex_scen_fire": "Simulate Fire/Smoke Warning",
        "sandbox_vex_feedback_msg": "Click on the scenarios above to watch the AI analyze the stream and alert the business owner.",
        
        "form_section_title": "Start Your Journey With Us Today",
        "form_section_subtitle": "Book your free personalized Demo session and our consultants will reach out shortly",
        "form_step1_lbl": "Requested Product",
        "form_step2_lbl": "Contact Info",
        "form_step3_lbl": "Schedule & Notes",
        "form_step4_lbl": "Confirmation",
        "form_step1_title_vexora": "Upgrade security for your company?",
        
        "form_product_vexora_desc": "AI video analytics and security camera analysis.",
        "form_btn_next": "Next Step ←",
        "form_btn_prev": "→ Previous",
        "form_btn_submit": "Confirm Corporate Demo Request 🚀",
        
        "form_step2_title": "Tell us more about your company to get in touch",
        "form_lbl_name": "Full Name ",
        "form_lbl_email": "Work Email ",
        "form_lbl_phone": "Phone / WhatsApp Number ",
        "form_lbl_company": "Company Name & Field ",
        
        "form_step3_title": "When would you like to schedule the security demo?",
        "form_lbl_date": "Preferred Date ",
        "form_lbl_time": "Preferred Call Time ",
        "form_time_choose": "Choose a convenient time",
        "form_time_morning": "Morning (9:00 AM - 12:00 PM)",
        "form_time_afternoon": "Afternoon (12:00 PM - 4:00 PM)",
        "form_time_evening": "Evening (4:00 PM - 8:00 PM)",
        "form_lbl_notes_vexora": "What is your biggest security challenge or specific requirements?",
        
        "form_success_thanks": "Thank you for your request, ",
        "form_success_desc_vexora": "Your request has been registered successfully to book a demo for Vexora corporate security systems.",
        "form_success_schedule": "Your suggested date: ",
        "form_success_period": " during the ",
        "form_success_whatsapp": "We will send a confirmation message on WhatsApp and phone to ",
        "form_success_whatsapp_sub": " with meeting details within an hour.",
        "form_success_reset_btn": "Request a New Booking",
        
        "footer_about_text_vexora": "Your trusted security partner for real-time video analytics and AI camera surveillance.",
        "footer_links_title": "Quick Links",
        "footer_copyright_vexora": "&copy; 2026 Vexora. All Rights Reserved."
    }
};
