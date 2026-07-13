// Beyout & Vexora Application Interactive Logic

// Global state variables
let activeBrand = 'lumora';
let currentFormStep = 1;
let selectedFormProduct = '';
let acTemperature = 22;
let currentLanguage = 'ar';

// DOMContentLoaded Initializations
document.addEventListener('DOMContentLoaded', () => {
    // Determine product based on page body class
    if (document.body.classList.contains('theme-beyout')) {
        selectedFormProduct = 'lumora'; // smart home product internal variable
    } else if (document.body.classList.contains('theme-vexora')) {
        selectedFormProduct = 'vexora'; // security analytics B2B
    }

    const dateInput = document.getElementById('demo_date');
    if (dateInput) {
        // Set tomorrow's date as default minimum date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // Set company details requirement initially hidden/shown based on product
    updateCompanyFieldVisibility();
    
    // Set initial language translations
    setLanguage(currentLanguage);
});

// Hero Simulator - Smart Home (Beyout) Interactive Functions
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

// Hero Simulator - Vexora Interactive Functions
function triggerHeroIncident() {
    const overlayBox = document.getElementById('hero-mock-detection-box');
    const logsContainer = document.getElementById('hero-alert-logs');
    const targetCircle = document.getElementById('hero-ai-target-circle');
    const targetLine = document.getElementById('hero-ai-target-line');
    
    if (overlayBox && targetCircle && targetLine) {
        // Toggle visual detection overlay
        overlayBox.style.display = 'block';
        targetCircle.style.display = 'block';
        targetLine.style.display = 'block';
        
        // Add warning log entry if logs container exists
        if (logsContainer) {
            const time = new Date().toTimeString().split(' ')[0];
            const msgText = (currentLanguage === 'ar') ? '⚠️ رصد حركة مجهولة - بوابة رئيسية (اختراق)' : '⚠️ Unknown movement detected - Main gate (intrusion)';
            const logHTML = `
                <div class="log-entry warning">
                    <span class="time">${time}</span>
                    <span class="msg">${msgText}</span>
                </div>
            `;
            logsContainer.innerHTML = logHTML + logsContainer.innerHTML;
        }
        
        // Auto reset warning after 4 seconds
        setTimeout(() => {
            overlayBox.style.display = 'none';
            targetCircle.style.display = 'none';
            targetLine.style.display = 'none';
        }, 4000);
    }
}

// Sandbox Simulator - Smart Home (Beyout) Interactive Functions
function updateHouseSim() {
    const chkLight = document.getElementById('chk-living-light');
    const chkKitchen = document.getElementById('chk-kitchen-light');
    const chkAc = document.getElementById('chk-bedroom-ac');
    const chkSec = document.getElementById('chk-security-system');
    
    // DOM elements
    const glowLiving = document.getElementById('glow-living');
    const glowKitchen = document.getElementById('glow-kitchen');
    const glowBedroom = document.getElementById('glow-bedroom');
    const glowAcBedroom = document.getElementById('ac-glow-bedroom');
    const lampLightSvg = document.getElementById('svg-lamp-light');
    
    const lockBodySvg = document.getElementById('lock-body');
    const lockShackleSvg = document.getElementById('lock-shackle');
    const lockText = document.getElementById('lock-text');
    
    const feedbackMsg = document.getElementById('sim-feedback-lumora');
    
    let actionsTaken = [];
    if (!chkLight || !chkKitchen || !chkAc || !chkSec) return;

    // Living room light
    if (chkLight.checked) {
        if (glowLiving) glowLiving.style.display = 'block';
        if (lampLightSvg) lampLightSvg.style.opacity = '0.8';
        actionsTaken.push((currentLanguage === 'ar') ? 'إضاءة المعيشة: تشغيل' : 'Living light: On');
    } else {
        if (glowLiving) glowLiving.style.display = 'none';
        if (lampLightSvg) lampLightSvg.style.opacity = '0';
        actionsTaken.push((currentLanguage === 'ar') ? 'إضاءة المعيشة: إيقاف' : 'Living light: Off');
    }

    // Kitchen light
    if (chkKitchen.checked) {
        if (glowKitchen) glowKitchen.style.display = 'block';
        actionsTaken.push((currentLanguage === 'ar') ? 'إضاءة المطبخ: تشغيل' : 'Kitchen light: On');
    } else {
        if (glowKitchen) glowKitchen.style.display = 'none';
        actionsTaken.push((currentLanguage === 'ar') ? 'إضاءة المطبخ: إيقاف' : 'Kitchen light: Off');
    }

    // Bedroom AC
    const acWrapper = document.getElementById('ac-temp-wrapper');
    if (chkAc.checked) {
        if (glowBedroom) glowBedroom.style.display = 'block';
        if (glowAcBedroom) glowAcBedroom.style.display = 'block';
        if (acWrapper) acWrapper.style.display = 'flex';
        actionsTaken.push((currentLanguage === 'ar') ? `مكيف النوم: تشغيل (${acTemperature}°م)` : `Bedroom AC: On (${acTemperature}°C)`);
    } else {
        if (glowBedroom) glowBedroom.style.display = 'none';
        if (glowAcBedroom) glowAcBedroom.style.display = 'none';
        if (acWrapper) acWrapper.style.display = 'none';
        actionsTaken.push((currentLanguage === 'ar') ? 'مكيف النوم: إيقاف' : 'Bedroom AC: Off');
    }

    // Security locks
    if (chkSec.checked) {
        if (lockBodySvg) lockBodySvg.setAttribute('fill', '#10b981');
        if (lockShackleSvg) {
            lockShackleSvg.setAttribute('stroke', '#10b981');
            lockShackleSvg.setAttribute('d', 'M6 0v8h12v-8a6 6 0 0 0-12 0'); // Locked
        }
        if (lockText) {
            lockText.className = 'text-success';
            lockText.textContent = (currentLanguage === 'ar') ? 'مغلقة ومؤمنة' : 'Locked & Secured';
        }
        
        // Hide water garden sprinkler visual
        const sp1 = document.getElementById('sprinkler-water-1');
        const sp2 = document.getElementById('sprinkler-water-2');
        if (sp1) sp1.style.display = 'none';
        if (sp2) sp2.style.display = 'none';
    } else {
        if (lockBodySvg) lockBodySvg.setAttribute('fill', '#ef4444');
        if (lockShackleSvg) {
            lockShackleSvg.setAttribute('stroke', '#ef4444');
            lockShackleSvg.setAttribute('d', 'M6 0v8h12v-8a6 6 0 0 0-12 0m12 0v-4'); // Unlocked path
        }
        if (lockText) {
            lockText.className = 'text-danger';
            lockText.textContent = (currentLanguage === 'ar') ? 'ملغية التأمين - الحديقة نشطة!' : 'Unlocked - Garden active!';
        }
        
        // Show water garden sprinkler visual
        const sp1 = document.getElementById('sprinkler-water-1');
        const sp2 = document.getElementById('sprinkler-water-2');
        if (sp1) sp1.style.display = 'block';
        if (sp2) sp2.style.display = 'block';
        actionsTaken.push((currentLanguage === 'ar') ? 'أمان البوابة: إلغاء (رشاشات الحديقة تعمل)' : 'Gate security: Off (Garden sprinklers active)');
    }

    // Construct logs feedback message
    if (feedbackMsg) {
        const titleText = (currentLanguage === 'ar') ? '⚡ <strong>تحديث حالة المنزل:</strong> ' : '⚡ <strong>Home Status Update:</strong> ';
        feedbackMsg.innerHTML = titleText + actionsTaken.slice(-2).join(' | ');
    }
}

function changeAcTemp(delta) {
    acTemperature += delta;
    if (acTemperature < 16) acTemperature = 16;
    if (acTemperature > 30) acTemperature = 30;
    
    const acNum = document.getElementById('ac-temp-num');
    if (acNum) acNum.textContent = acTemperature;
    
    const feedbackMsg = document.getElementById('sim-feedback-lumora');
    if (feedbackMsg) {
        if (currentLanguage === 'ar') {
            feedbackMsg.innerHTML = `❄️ تم ضبط درجة حرارة المكيف على <strong>${acTemperature}°م</strong>.`;
        } else {
            feedbackMsg.innerHTML = `❄️ AC temperature set to <strong>${acTemperature}°C</strong>.`;
        }
    }
}

// Sandbox Simulator - Vexora Interactive Functions
function runVexoraScenario(scenario) {
    const alertBox = document.getElementById('camera-target');
    const fireBox = document.getElementById('camera-fire');
    const phoneAlert = document.getElementById('phone-alert');
    const phoneMsg = document.getElementById('phone-alert-msg');
    const feedbackMsg = document.getElementById('sim-feedback-vexora');
    
    // Update scenario buttons active classes
    const btnClear = document.getElementById('btn-scen-clear');
    const btnIntruder = document.getElementById('btn-scen-intruder');
    const btnFire = document.getElementById('btn-scen-fire');
    
    if (btnClear) btnClear.classList.remove('active');
    if (btnIntruder) btnIntruder.classList.remove('active');
    if (btnFire) btnFire.classList.remove('active');
    
    if (scenario === 'clear') {
        if (btnClear) btnClear.classList.add('active');
        if (alertBox) alertBox.style.display = 'none';
        if (fireBox) fireBox.style.display = 'none';
        if (phoneAlert) phoneAlert.classList.remove('show');
        if (feedbackMsg) {
            feedbackMsg.innerHTML = (currentLanguage === 'ar') ? '🟢 النظام في وضع الاستعداد ورصد الأجسام النشط (الوضع طبيعي).' : '🟢 System standby. Object detection active (Normal status).';
        }
    } 
    else if (scenario === 'intruder') {
        if (btnIntruder) btnIntruder.classList.add('active');
        if (alertBox) alertBox.style.display = 'block';
        if (fireBox) fireBox.style.display = 'none';
        if (feedbackMsg) {
            feedbackMsg.innerHTML = (currentLanguage === 'ar') ? '🚨 رصد متسلل! تم تحديد هوية شخص مجهول بعد ساعات العمل.' : '🚨 Intruder spotted! Unidentified person tracked after working hours.';
        }
        
        setTimeout(() => {
            if (phoneMsg && phoneAlert) {
                phoneMsg.innerHTML = (currentLanguage === 'ar') ? '🚨 تنبيه أمني عاجل: رصد حركات تسلل مجهولة في منطقة خزانة الأصول. الكاميرا 02.' : '🚨 Security Alert: Intruder spotted near asset safe area. Camera 02.';
                phoneAlert.classList.add('show');
            }
        }, 500);
    } 
    else if (scenario === 'fire') {
        if (btnFire) btnFire.classList.add('active');
        if (alertBox) alertBox.style.display = 'none';
        if (fireBox) fireBox.style.display = 'block';
        if (feedbackMsg) {
            feedbackMsg.innerHTML = (currentLanguage === 'ar') ? '🔥 رصد نيران ودخان! تم تفعيل بروتوكول السلامة ونظام الإنذار.' : '🔥 Fire & smoke detected! Safety protocol activated and alarm triggered.';
        }
        
        setTimeout(() => {
            if (phoneMsg && phoneAlert) {
                phoneMsg.innerHTML = (currentLanguage === 'ar') ? '⚠️ إنذار حريق عاجل: رصد نيران ودخان تصاعدي في المستودع. تم إبلاغ الطوارئ تلقائياً!' : '⚠️ Fire Alarm: Heavy smoke detected in warehouse. Emergencies alerted!';
                phoneAlert.classList.add('show');
            }
        }, 500);
    }
}

// Multi-Step Form Logic
function setFormProduct(product) {
    selectedFormProduct = product;
    
    // Clear select cards styling
    const cardLumora = document.getElementById('select-card-lumora');
    const cardVexora = document.getElementById('select-card-vexora');
    
    if (cardLumora) cardLumora.classList.remove('selected');
    if (cardVexora) cardVexora.classList.remove('selected');
    
    // Style chosen card
    const targetCard = document.getElementById('select-card-' + product);
    if (targetCard) targetCard.classList.add('selected');
    
    // Update company field requirement
    updateCompanyFieldVisibility();
}

function updateCompanyFieldVisibility() {
    const companyGroup = document.getElementById('company-field-group');
    const companyInput = document.getElementById('company_name');
    
    if (companyGroup && companyInput) {
        if (selectedFormProduct === 'vexora') {
            companyGroup.style.display = 'flex';
            companyInput.required = true;
        } else {
            companyGroup.style.display = 'none';
            companyInput.required = false;
            companyInput.value = '';
        }
    }
}

// Lead Magnets helper
function selectLeadMagnet(magnetName) {
    const notesField = document.getElementById('cust_notes');
    if (notesField) {
        notesField.value = `أريد الاستفادة من العرض المجاني: ${magnetName}`;
    }
    
    if (magnetName.includes('بيوت')) {
        setFormProduct('lumora');
    } else if (magnetName.includes('فيكسورا')) {
        setFormProduct('vexora');
    }
    
    // Scroll smoothly to form section
    const demoSection = document.getElementById('demo-section');
    if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
}

// Multi step transitions
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
        if (!selectedFormProduct) {
            alert((currentLanguage === 'ar') ? 'الرجاء اختيار المنتج المطلوب أولاً للمتابعة.' : 'Please select the product to proceed.');
            return false;
        }
        return true;
    }
    
    if (currentFormStep === 2) {
        const nameInput = document.getElementById('cust_name');
        const emailInput = document.getElementById('cust_email');
        const phoneInput = document.getElementById('cust_phone');
        const companyInput = document.getElementById('company_name');
        
        if (!nameInput || !emailInput || !phoneInput) return false;
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const company = companyInput ? companyInput.value.trim() : '';
        
        if (!name || !email || !phone) {
            alert((currentLanguage === 'ar') ? 'الرجاء تعبئة جميع الحقول المطلوبة المميزة بـ (*).' : 'Please fill all required fields marked with (*).');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert((currentLanguage === 'ar') ? 'الرجاء إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.');
            return false;
        }
        
        if (selectedFormProduct === 'vexora' && !company) {
            alert((currentLanguage === 'ar') ? 'الرجاء إدخال اسم الشركة لمتابعة طلب ديمو الأعمال.' : 'Please enter your company name to proceed with B2B demo request.');
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

// Form Submission handling
function handleFormSubmit(event) {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    
    const name = document.getElementById('cust_name').value.trim();
    const phone = document.getElementById('cust_phone').value.trim();
    const dateVal = document.getElementById('demo_date').value;
    const timeVal = document.getElementById('demo_time').value;
    
    // Formulate brand text
    let brandText = '';
    if (selectedFormProduct === 'lumora') {
        brandText = (currentLanguage === 'ar') ? 'بيوت للمنازل الذكية (Beyout)' : 'Beyout Smart Home';
    } else {
        brandText = (currentLanguage === 'ar') ? 'فيكسورا لحماية الكاميرات (Vexora)' : 'Vexora Security Analytics';
    }
    
    // Map time options to readable text
    let timeText = '';
    if (timeVal === 'morning') {
        timeText = (currentLanguage === 'ar') ? 'الصباحية (9:00 ص - 12:00 م)' : 'Morning (9:00 AM - 12:00 PM)';
    } else if (timeVal === 'afternoon') {
        timeText = (currentLanguage === 'ar') ? 'بعد الظهر (12:00 م - 4:00 م)' : 'Afternoon (12:00 PM - 4:00 PM)';
    } else {
        timeText = (currentLanguage === 'ar') ? 'المسائية (4:00 م - 8:00 م)' : 'Evening (4:00 PM - 8:00 PM)';
    }
    
    // Populating success screen
    const succUser = document.getElementById('success-user-name');
    const succProd = document.getElementById('success-product');
    const succDate = document.getElementById('success-date');
    const succTime = document.getElementById('success-time');
    const succPhone = document.getElementById('success-phone');
    
    if (succUser) succUser.textContent = name;
    if (succProd) succProd.textContent = brandText;
    if (succDate) succDate.textContent = dateVal;
    if (succTime) succTime.textContent = timeText;
    if (succPhone) succPhone.textContent = phone;
    
    // Transition to success step (Step 4)
    const activeStep = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (activeStep) activeStep.classList.remove('active');
    
    currentFormStep = 4;
    const nextStepEl = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (nextStepEl) nextStepEl.classList.add('active');
    
    updateProgressBar();
    
    // Save data to localStorage
    const leadData = {
        name,
        email: document.getElementById('cust_email').value.trim(),
        phone,
        product: selectedFormProduct,
        company: document.getElementById('company_name') ? document.getElementById('company_name').value.trim() : '',
        date: dateVal,
        time: timeVal,
        notes: document.getElementById('cust_notes') ? document.getElementById('cust_notes').value.trim() : '',
        submittedAt: new Date().toISOString()
    };
    
    let existingLeads = JSON.parse(localStorage.getItem('beyout_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('beyout_leads', JSON.stringify(existingLeads));

    // Send data to Netlify Forms
    const formElement = document.getElementById('demoForm');
    const formData = new FormData(formElement);
    formData.set('target_product', selectedFormProduct);
    
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => console.log("Lead captured by Netlify Forms successfully"))
    .catch((error) => console.error("Error submitting to Netlify Forms:", error));
}

// Reset form
function resetForm() {
    const formEl = document.getElementById('demoForm');
    if (formEl) formEl.reset();
    
    // Go to step 1
    const activeStep = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (activeStep) activeStep.classList.remove('active');
    
    currentFormStep = 1;
    const firstStepEl = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    if (firstStepEl) firstStepEl.classList.add('active');
    
    updateProgressBar();
    updateCompanyFieldVisibility();
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
    
    // Toggle class on body for directional styling
    const pageTheme = document.body.classList.contains('theme-vexora') ? 'theme-vexora' : 'theme-beyout';
    document.body.className = `${pageTheme} lang-${lang}`;
    
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
    
    // Toggle language button text
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
        langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    }
}

const translations = {
    ar: {
        "nav_about": "من نحن",
        "nav_features": "المميزات",
        "nav_features_vex": "تحليل الفيديو",
        "nav_simulator": "المحاكاة التفاعلية",
        "nav_simulator_vex": "كاميرات البث المباشر",
        "nav_demo": "حجز ديمو",
        "nav_to_vexora": "فيكسورا للأمن (B2B)",
        "nav_to_beyout": "بيوت للمنازل الذكية (B2C)",
        "nav_btn_demo": "طلب ديمو مجاني",
        
        "beyout_page_title": "بيوت | حلول المنازل الذكية الفاخرة",
        "beyout_hero_title": "شركة بيوت للمنازل الذكية",
        "beyout_hero_subtitle": "مستقبل الفخامة والتحكم والرفاهية الكاملة",
        "beyout_banner_title": "بيوت | لأسلوب حياة ذكي ومريح",
        "beyout_banner_desc": "حوّل منزلك العادي إلى بيئة تفاعلية تفهم احتياجاتك وتوفر طاقتك. تحكّم في الأجهزة والتكييف والأمان بلمسة واحدة أو بالصوت.",
        
        "vexora_page_title": "فيكسورا | أنظمة حماية وتحليل كاميرات المراقبة بالذكاء الاصطناعي",
        "vexora_hero_title_page": "أنظمة فيكسورا للتحليل الأمني",
        "vexora_hero_subtitle_page": "الذكاء الاصطناعي الأقوى لحماية منشآتك وحساب حركة زوارك",
        "vexora_banner_title": "فيكسورا | أمن أعمالك بذكاء خارق",
        "vexora_banner_desc": "قم بترقية كاميرات المراقبة الحالية لشركتك إلى نظام أمان رقمي فوري يكتشف التسلل والحرائق وسرقة الأصول لحظياً.",
        
        "lumora_btn_explore": "تصفح المحاكي التفاعلي",
        "lumora_btn_demo": "طلب ديمو مجاني",
        "vexora_btn_explore": "شاهد الكاميرا الحية",
        "vexora_btn_demo": "طلب ديمو الشركات",
        
        "lumora_showcase_title": "عيش الرفاهية الكاملة في منزلك الذكي",
        "lumora_showcase_desc": "نظام بيوت يمنحك راحة البال والتحكم الكامل. لا داعي للقلق بشأن نسيان الإنارة أو التكييف قيد العمل، حيث تقوم المستشعرات الذكية بضبط كل شيء تلقائياً.",
        "lumora_magnet_title": "كتيب \"توفير الطاقة في المنزل الذكي\"",
        "lumora_magnet_desc": "احصل على دليلك المجاني لتكتشف كيف توفر 30% من فواتير الكهرباء.",
        "lumora_magnet_btn": "تحميل الكتيب مجاناً ←",
        
        "lumora_mockup_title": "لوحة تحكم بيوت للمنزل الذكي",
        "lumora_stat_status_lbl": "الحالة العامة",
        "lumora_stat_status_val": "مؤمن بالكامل",
        "lumora_stat_temp_lbl": "درجة الحرارة",
        "lumora_stat_energy_lbl": "توفير الطاقة",
        "lumora_room_living": "غرفة المعيشة",
        "lumora_status_light": "الإضاءة:",
        "lumora_status_active": "نشطة",
        "lumora_status_inactive": "منطفئة",
        "lumora_room_garden": "الحديقة الخارجية",
        "lumora_status_sprinklers": "الرشاشات:",
        "lumora_btn_light_toggle": "تغيير إضاءة المعيشة",
        "lumora_btn_sprinkler_toggle": "تشغيل الرشاشات",
        
        "vexora_mockup_title": "نظام رصد كاميرات فيكسورا الذكي",
        "vexora_cam_name": "CAM 01 - المستودع الرئيسي",
        "vexora_alert_logs_lbl": "سجل التنبيهات الأمنية",
        "vexora_log_vehicle": "مرور مركبة مصرحة - لوحة رقم 4829",
        "vexora_btn_incident_toggle": "محاكاة اختراق أمني (تنبيه)",
        "vexora_showcase_title": "عيون رقمية لا تنام لحماية منشآتك",
        "vexora_showcase_desc": "نظام فيكسورا يقوم بمراقبة وتحليل الفيديوهات الصادرة من كاميراتك الحالية فورياً. يتعرف النظام على الأنشطة المشبوهة، الغرباء المتسللين، والحرائق، ويرسل تنبيهاً أمنياً لجوالك.",
        "vexora_magnet_title": "جلسة فحص وتقييم أمني مجاني لكاميراتك",
        "vexora_magnet_desc": "دع مهندسينا يراجعون نظام حمايتك الحالي ويقدمون لك خطة ترقية مجانية.",
        "vexora_magnet_btn": "احجز الجلسة المجانية الآن ←",
        
        "sandbox_subtitle": "منطقة المحاكاة المتكاملة",
        "sandbox_title_beyout": "جرّب لوحة تحكم منزلك الذكي بنفسك",
        "sandbox_title_vexora": "جرّب لوحة تحكم التحليل الأمني بنفسك",
        "sandbox_desc_beyout": "اختبر التفاعل الحقيقي وعش تجربة العميل. تحكم في إضاءة وتكييف وأبواب الفيلا الذكية.",
        "sandbox_desc_vexora": "اختبر تحليلات فيكسورا ورصد المتسللين ومخاطر الحريق لحظياً على البث المباشر.",
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
        "form_step1_title_beyout": "هل ترغب في ترقية منزلك بالكامل؟",
        "form_step1_title_vexora": "ترقية نظام الأمان لشركتك؟",
        
        "form_product_lumora_desc": "أنظمة التحكم الكاملة والمنازل الذكية الفاخرة.",
        "form_product_vexora_desc": "للشركات والمصانع ومراقبة وتحليل الكاميرات بالذكاء الاصطناعي.",
        "form_btn_next": "التالي ←",
        "form_btn_prev": "→ السابق",
        "form_btn_submit": "تأكيد طلب الديمو مجاناً 🚀",
        
        "form_step2_title": "أخبرنا بالمزيد عنك لنتمكن من التواصل معك",
        "form_lbl_name": "الاسم بالكامل ",
        "form_lbl_email": "البريد الإلكتروني ",
        "form_lbl_phone": "رقم الهاتف / الواتساب ",
        "form_lbl_company": "اسم الشركة والنشاط ",
        
        "form_step3_title": "متى ترغب في عقد جلسة العرض (الديمو)؟",
        "form_lbl_date": "التاريخ المفضل ",
        "form_lbl_time": "الوقت المفضل للاتصال ",
        "form_time_choose": "اختر الوقت المناسب",
        "form_time_morning": "صباحاً (9:00 ص - 12:00 م)",
        "form_time_afternoon": "بعد الظهر (12:00 م - 4:00 م)",
        "form_time_evening": "مساءً (4:00 م - 8:00 م)",
        "form_lbl_notes_beyout": "أكبر تحدي أو متطلبات معينة تود مناقشتها؟",
        "form_lbl_notes_vexora": "أكبر تحدي أو متطلبات معينة تود مناقشتها؟",
        
        "form_success_thanks": "شكراً لطلبك، ",
        "form_success_desc_beyout": "تم تسجيل طلبك بنجاح لحجز ديمو خاص بأنظمة بيوت الذكية.",
        "form_success_desc_vexora": "تم تسجيل طلبك بنجاح لحجز ديمو خاص بنظام فيكسورا الأمني.",
        "form_success_schedule": "موعدك المقترح: ",
        "form_success_period": " في الفترة الـ ",
        "form_success_whatsapp": "سنقوم بإرسال رسالة تأكيد على واتساب برقم ",
        "form_success_whatsapp_sub": " وتفاصيل الاجتماع خلال ساعة.",
        "form_success_reset_btn": "طلب حجز جديد",
        
        "footer_about_text_beyout": "مستشارك وشريكك التكنولوجي الموثوق لتصميم وبناء أنظمة التحكم والمنازل الذكية الفاخرة.",
        "footer_about_text_vexora": "مستشارك الأمني التكنولوجي الموثوق لتحليلات الفيديو الفورية وكاميرات المراقبة بالذكاء الاصطناعي.",
        "footer_links_title": "روابط سريعة",
        "footer_copyright": "جميع الحقوق محفوظة. شركة بيوت 2026 &copy;",
        "footer_copyright_vexora": "جميع الحقوق محفوظة. شركة فيكسورا 2026 &copy;"
    },
    en: {
        "nav_about": "About Us",
        "nav_features": "Features",
        "nav_features_vex": "Video Analytics",
        "nav_simulator": "Simulator Sandbox",
        "nav_simulator_vex": "Live Security Camera",
        "nav_demo": "Book Demo",
        "nav_to_vexora": "Vexora Security (B2B)",
        "nav_to_beyout": "Beyout Smart Home (B2C)",
        "nav_btn_demo": "Request Free Demo",
        
        "beyout_page_title": "Beyout | Luxury Smart Home Solutions",
        "beyout_hero_title": "Beyout Smart Home",
        "beyout_hero_subtitle": "The Future of Luxury, Control & Comfort",
        "beyout_banner_title": "Beyout | For a Smart & Cozy Lifestyle",
        "beyout_banner_desc": "Transform your ordinary home into an interactive environment that understands your needs and saves energy. Control devices, AC, and security with a single touch or voice.",
        
        "vexora_page_title": "Vexora | AI Video Surveillance & Threat Detection",
        "vexora_hero_title_page": "Vexora Security Systems",
        "vexora_hero_subtitle_page": "Super Intelligent Video Analytics for Business Protection",
        "vexora_banner_title": "Vexora | Secure Your Business with AI",
        "vexora_banner_desc": "Upgrade your business security cameras to a real-time digital defense system. Detect trespassers, fires, and asset theft in real time.",
        
        "lumora_btn_explore": "Explore Simulator",
        "lumora_btn_demo": "Request Free Demo",
        "vexora_btn_explore": "Watch Live Feed",
        "vexora_btn_demo": "Request B2B Demo",
        
        "lumora_showcase_title": "Live in Ultimate Luxury inside Your Smart Home",
        "lumora_showcase_desc": "Beyout system gives you peace of mind and absolute control. No need to worry about forgetting the lights or AC on; smart sensors adjust everything automatically.",
        "lumora_magnet_title": "eBook: \"Energy Saving in Smart Homes\"",
        "lumora_magnet_desc": "Get your free guide to discover how to save up to 30% on electricity bills.",
        "lumora_magnet_btn": "Download Guide for Free ←",
        
        "lumora_mockup_title": "Beyout Smart Home Dashboard",
        "lumora_stat_status_lbl": "System Status",
        "lumora_stat_status_val": "Fully Secured",
        "lumora_stat_temp_lbl": "Temperature",
        "lumora_stat_energy_lbl": "Energy Saved",
        "lumora_room_living": "Living Room",
        "lumora_status_light": "Lighting:",
        "lumora_status_active": "Active",
        "lumora_status_inactive": "Off",
        "lumora_room_garden": "Outdoor Garden",
        "lumora_status_sprinklers": "Sprinklers:",
        "lumora_btn_light_toggle": "Toggle Living Room Light",
        "lumora_btn_sprinkler_toggle": "Toggle Garden Sprinklers",
        
        "vexora_mockup_title": "Vexora Intelligent Surveillance",
        "vexora_cam_name": "CAM 01 - Main Warehouse",
        "vexora_alert_logs_lbl": "Security Alert Log",
        "vexora_log_vehicle": "Authorized vehicle passed - Plate 4829",
        "vexora_btn_incident_toggle": "Simulate Security Intrusion",
        "vexora_showcase_title": "Digital Eyes That Never Sleep to Protect Your Assets",
        "vexora_showcase_desc": "Vexora monitors and analyzes live video feeds from your existing security cameras. The system automatically identifies suspicious movements, trespassers, and fire, alerting you instantly.",
        "vexora_magnet_title": "Free Camera Security Audit & Assessment",
        "vexora_magnet_desc": "Let our engineers audit your current surveillance system and offer a free upgrade plan.",
        "vexora_magnet_btn": "Book Free Audit Session ←",
        
        "sandbox_subtitle": "Interactive Simulator Sandbox",
        "sandbox_title_beyout": "Try Out the Smart Home Dashboard Yourself",
        "sandbox_title_vexora": "Try Out the Security Dashboard Yourself",
        "sandbox_desc_beyout": "Test real interactions and live the customer experience. Control the lighting, AC, and doors of the smart villa.",
        "sandbox_desc_vexora": "Test Vexora's AI analytics. Track intruders and simulate fire hazards on a live camera feed.",
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
        "form_step1_title_beyout": "Would you like to upgrade your home to a smart home?",
        "form_step1_title_vexora": "Upgrade security for your company?",
        
        "form_product_lumora_desc": "Complete smart home control and luxury automation systems.",
        "form_product_vexora_desc": "For businesses, factories, and smart retail camera analysis.",
        "form_btn_next": "Next Step ←",
        "form_btn_prev": "→ Previous",
        "form_btn_submit": "Confirm Free Demo Request 🚀",
        
        "form_step2_title": "Tell us more about yourself to get in touch",
        "form_lbl_name": "Full Name ",
        "form_lbl_email": "Email Address ",
        "form_lbl_phone": "Phone / WhatsApp Number ",
        "form_lbl_company": "Company Name & Field ",
        
        "form_step3_title": "When would you like to schedule the Demo session?",
        "form_lbl_date": "Preferred Date ",
        "form_lbl_time": "Preferred Call Time ",
        "form_time_choose": "Choose a convenient time",
        "form_time_morning": "Morning (9:00 AM - 12:00 PM)",
        "form_time_afternoon": "Afternoon (12:00 PM - 4:00 PM)",
        "form_time_evening": "Evening (4:00 PM - 8:00 PM)",
        "form_lbl_notes_beyout": "What is your biggest challenge or specific requirements?",
        "form_lbl_notes_vexora": "What is your biggest challenge or specific requirements?",
        
        "form_success_thanks": "Thank you for your request, ",
        "form_success_desc_beyout": "Your request has been registered successfully to book a demo for Beyout smart systems.",
        "form_success_desc_vexora": "Your request has been registered successfully to book a demo for Vexora security systems.",
        "form_success_schedule": "Your suggested date: ",
        "form_success_period": " during the ",
        "form_success_whatsapp": "We will send a confirmation message on WhatsApp and phone to ",
        "form_success_whatsapp_sub": " with meeting details within an hour.",
        "form_success_reset_btn": "Request a New Booking",
        
        "footer_about_text_beyout": "Your trusted technology partner and consultant for smart home control and luxury automation.",
        "footer_about_text_vexora": "Your trusted security partner for real-time video analytics and AI camera surveillance.",
        "footer_links_title": "Quick Links",
        "footer_copyright": "&copy; 2026 Beyout. All Rights Reserved.",
        "footer_copyright_vexora": "&copy; 2026 Vexora. All Rights Reserved."
    }
};
