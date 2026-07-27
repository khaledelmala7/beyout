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

// Interactive Scenarios for Vexora Control Panel Dashboard
function triggerVexoraScenario(scen) {
    const streamImg = document.getElementById('cam-stream-img');
    const mockBox1 = document.getElementById('mock-box-1');
    const mockBox2 = document.getElementById('mock-box-2');
    const mockLabel1 = document.getElementById('mock-label-1');
    const mockLabel2 = document.getElementById('mock-label-2');
    const feedbackMsg = document.getElementById('sim-feedback-vexora');
    const logsContainer = document.getElementById('alert-logs');
    const cpuVal = document.getElementById('val-cpu');
    const fpsVal = document.getElementById('val-fps');
    
    // De-activate all buttons
    document.querySelectorAll('.simulator-controls-bar .mock-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.cam-channels-list .channel-item').forEach(ch => ch.classList.remove('active'));
    
    const time = new Date().toTimeString().split(' ')[0];
    
    if (scen === 'clear') {
        const btn = document.getElementById('btn-scen-clear');
        if (btn) btn.classList.add('active');
        const ch = document.getElementById('chan-cam-1');
        if (ch) ch.classList.add('active');
        
        if (streamImg) streamImg.src = 'assets/sec_construction.jpg';
        if (mockBox1) { mockBox1.style.display = 'block'; mockBox1.className = 'camera-detection-box warning-box'; mockBox1.style.top = '15%'; mockBox1.style.left = '30%'; mockBox1.style.width = '14%'; mockBox1.style.height = '25%'; }
        if (mockLabel1) { mockLabel1.style.background = '#ffd60a'; mockLabel1.style.color = '#000'; mockLabel1.textContent = 'HELMET: OK ✅'; }
        if (mockBox2) { mockBox2.style.display = 'none'; }
        
        if (feedbackMsg) feedbackMsg.textContent = '✅ البث يعمل بالوضع الطبيعي المستقر. الكاميرا رصدت الالتزام بالخوذة.';
        if (cpuVal) cpuVal.textContent = '14%';
        if (fpsVal) fpsVal.textContent = '30 FPS';
        
    } else if (scen === 'ppe') {
        const btn = document.getElementById('btn-scen-ppe');
        if (btn) btn.classList.add('active');
        const ch = document.getElementById('chan-cam-1');
        if (ch) ch.classList.add('active');
        
        if (streamImg) streamImg.src = 'assets/sec_construction.jpg';
        if (mockBox1) { mockBox1.style.display = 'block'; mockBox1.className = 'camera-detection-box warning-box'; mockBox1.style.top = '15%'; mockBox1.style.left = '30%'; mockBox1.style.width = '14%'; mockBox1.style.height = '25%'; }
        if (mockLabel1) { mockLabel1.style.background = '#ffd60a'; mockLabel1.style.color = '#000'; mockLabel1.textContent = 'HELMET: OK ✅'; }
        if (mockBox2) { mockBox2.style.display = 'block'; mockBox2.className = 'camera-detection-box danger-box'; mockBox2.style.top = '35%'; mockBox2.style.left = '58%'; mockBox2.style.width = '16%'; mockBox2.style.height = '32%'; }
        if (mockLabel2) { mockLabel2.style.background = '#ff453a'; mockLabel2.style.color = '#fff'; mockLabel2.textContent = 'NO HELMET! ⚠️'; }
        
        if (feedbackMsg) feedbackMsg.textContent = '⚠️ إنذار سلامة: تم رصد عامل بدون خوذة حماية في منطقة العمل!';
        if (logsContainer) {
            logsContainer.innerHTML = `<div class="log-entry danger"><span class="time">${time}</span><span class="msg">⚠️ مخالفة سلامة: عامل بدون خوذة أمان - منطقة العمل الرئيسية</span></div>` + logsContainer.innerHTML;
        }
        if (cpuVal) cpuVal.textContent = '22%';
        if (fpsVal) fpsVal.textContent = '30 FPS';

    } else if (scen === 'intruder') {
        const btn = document.getElementById('btn-scen-intruder');
        if (btn) btn.classList.add('active');
        const ch = document.getElementById('chan-cam-2');
        if (ch) ch.classList.add('active');
        
        if (streamImg) streamImg.src = 'assets/vexora_perimeter_fence.jpg';
        if (mockBox1) { mockBox1.style.display = 'block'; mockBox1.className = 'camera-detection-box danger-box'; mockBox1.style.top = '35%'; mockBox1.style.left = '40%'; mockBox1.style.width = '25%'; mockBox1.style.height = '50%'; }
        if (mockLabel1) { mockLabel1.style.background = '#ff453a'; mockLabel1.style.color = '#fff'; mockLabel1.textContent = 'INTRUDER DETECTED! 🚨'; }
        if (mockBox2) { mockBox2.style.display = 'none'; }
        
        if (feedbackMsg) feedbackMsg.textContent = '🚨 إنذار أمني حرج: تم رصد متسلل يتسلق السياج الخارجي بعد أوقات العمل!';
        if (logsContainer) {
            logsContainer.innerHTML = `<div class="log-entry danger"><span class="time">${time}</span><span class="msg">🚨 خرق أمني: رصد جسم متسلل يتسلق السياج الخارجي - القناة 02</span></div>` + logsContainer.innerHTML;
        }
        if (cpuVal) cpuVal.textContent = '26%';
        if (fpsVal) fpsVal.textContent = '29 FPS';

    } else if (scen === 'fire') {
        const btn = document.getElementById('btn-scen-fire');
        if (btn) btn.classList.add('active');
        const ch = document.getElementById('chan-cam-3');
        if (ch) ch.classList.add('active');
        
        if (streamImg) streamImg.src = 'assets/vexora_fire.jpg';
        if (mockBox1) { mockBox1.style.display = 'block'; mockBox1.className = 'camera-detection-box danger-box'; mockBox1.style.top = '15%'; mockBox1.style.left = '15%'; mockBox1.style.width = '70%'; mockBox1.style.height = '70%'; }
        if (mockLabel1) { mockLabel1.style.background = '#ff453a'; mockLabel1.style.color = '#fff'; mockLabel1.textContent = 'FIRE & SMOKE ALARM! 🔥'; }
        if (mockBox2) { mockBox2.style.display = 'none'; }
        
        if (feedbackMsg) feedbackMsg.textContent = '🔥 إنذار حريق مبكر: تم رصد أدخنة ونيران مشتعلة بالمستودع وتم إرسال إشعارات الطوارئ!';
        if (logsContainer) {
            logsContainer.innerHTML = `<div class="log-entry danger"><span class="time">${time}</span><span class="msg">🔥 إنذار حظر حريق: تم كشف أدخنة ونيران - مستودع المواد B</span></div>` + logsContainer.innerHTML;
        }
        if (cpuVal) cpuVal.textContent = '28%';
        if (fpsVal) fpsVal.textContent = '30 FPS';

    } else if (scen === 'lpr') {
        const btn = document.getElementById('btn-scen-lpr');
        if (btn) btn.classList.add('active');
        const ch = document.getElementById('chan-cam-4');
        if (ch) ch.classList.add('active');
        
        if (streamImg) streamImg.src = 'assets/sec_parking.jpg';
        if (mockBox1) { mockBox1.style.display = 'block'; mockBox1.className = 'camera-detection-box warning-box'; mockBox1.style.top = '40%'; mockBox1.style.left = '35%'; mockBox1.style.width = '30%'; mockBox1.style.height = '35%'; }
        if (mockLabel1) { mockLabel1.style.background = '#34c759'; mockLabel1.style.color = '#fff'; mockLabel1.textContent = 'LPR: [أ ب ج 1 2 3 4] GATE OPEN ✅'; }
        if (mockBox2) { mockBox2.style.display = 'none'; }
        
        if (feedbackMsg) feedbackMsg.textContent = '🚗 قراءة لوحة LPR: تم التعرف على لوحة السيارة المصرح لها وفتح البوابة تلقائياً.';
        if (logsContainer) {
            logsContainer.innerHTML = `<div class="log-entry info"><span class="time">${time}</span><span class="msg">🚗 بوابة السيارات: قراءة لوحة [أ ب ج 1 2 3 4] وفتح البوابة للمالك</span></div>` + logsContainer.innerHTML;
        }
        if (cpuVal) cpuVal.textContent = '19%';
        if (fpsVal) fpsVal.textContent = '30 FPS';
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


// 100% Pure Arabic & English Translation Dictionaries
const translations = {
    ar: {
        "nav_products": "المنتجات والأنظمة",
        "nav_solutions": "التنبيهات الذكية",
        "nav_dashboard": "لوحة التحكم",
        "nav_trusted": "عملاءنا",
        "nav_stories": "قصص نجاح",
        "btn_start_now": "ابدأ التجربة المجانية",
        
        "products_subtitle": "حلول ومنتجات فيكسورا",
        "products_title": "منتجات الأنظمة وسيرفرات الذكاء الاصطناعي",
        "products_desc": "اختر الباقة والمنتج المناسب لبنية كاميرات مراقبة منشأتك مع تركيب ومكفول بـ 15 يوماً تجربة مجانية.",
        "prod_1_badge": "معالجة محلية",
        "prod_1_title": "السيرفر المحلي (On-Premise AI Server)",
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
        "tag_touching": "لمس المعروضات 🛑"
    },
    en: {
        "nav_products": "Products & Systems",
        "nav_solutions": "AI Alerts",
        "nav_dashboard": "Control Panel",
        "nav_trusted": "Trusted Clients",
        "nav_stories": "Success Stories",
        "btn_start_now": "Start Free Trial",
        
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
        "tag_touching": "OBJECT TOUCHING ALERT 🛑"
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
