// Beyout Application Interactive Logic

// Global state variables
let activeBrand = 'lumora';
let currentFormStep = 1;
let selectedFormProduct = '';
let acTemperature = 22;
let currentLanguage = 'ar';

// DOMContentLoaded Initializations
document.addEventListener('DOMContentLoaded', () => {
    // Set default values
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

// Brand Switcher (Hero Section)
function switchBrand(brand) {
    activeBrand = brand;
    
    // Update switch buttons active classes
    const btnLumora = document.getElementById('btn-lumora');
    const btnVexora = document.getElementById('btn-vexora');
    if (btnLumora && btnVexora) {
        if (brand === 'lumora') {
            btnLumora.classList.add('active');
            btnVexora.classList.remove('active');
        } else {
            btnVexora.classList.add('active');
            btnLumora.classList.remove('active');
        }
    }
    
    // Update visible text content
    const contentLumora = document.getElementById('content-lumora');
    const contentVexora = document.getElementById('content-vexora');
    if (contentLumora && contentVexora) {
        if (brand === 'lumora') {
            contentLumora.classList.add('active');
            contentVexora.classList.remove('active');
        } else {
            contentVexora.classList.add('active');
            contentLumora.classList.remove('active');
        }
    }
    
    // Update visual previews
    const visualLumora = document.getElementById('visual-lumora');
    const visualVexora = document.getElementById('visual-vexora');
    if (visualLumora && visualVexora) {
        if (brand === 'lumora') {
            visualLumora.classList.add('active');
            visualVexora.classList.remove('active');
        } else {
            visualVexora.classList.add('active');
            visualLumora.classList.remove('active');
        }
    }
    
    // Update mockup header title
    const headerTitle = document.getElementById('mockup-header-title');
    if (headerTitle) {
        if (brand === 'lumora') {
            headerTitle.textContent = 'لوحة تحكم لومورا للمنزل الذكي';
        } else {
            headerTitle.textContent = 'نظام رصد كاميرات فيكسورا الذكي';
        }
    }
    
    // Also toggle the sandbox simulator tab for consistency
    toggleSandboxSim(brand);
}

// Hero Simulator - Lumora Interactive Functions
let heroLightOn = true;
let heroSprinklerOn = false;

function toggleMockLight() {
    heroLightOn = !heroLightOn;
    const roomNode = document.getElementById('hero-living-room');
    const statusText = document.getElementById('hero-light-status');
    const btnLight = document.getElementById('btn-hero-light');
    
    if (heroLightOn) {
        roomNode.classList.add('glowing');
        statusText.textContent = 'نشطة';
        btnLight.classList.add('active');
    } else {
        roomNode.classList.remove('glowing');
        statusText.textContent = 'منطفئة';
        btnLight.classList.remove('active');
    }
}

function toggleMockSprinkler() {
    heroSprinklerOn = !heroSprinklerOn;
    const roomNode = document.getElementById('hero-garden');
    const statusText = document.getElementById('hero-sprinkler-status');
    const btnSprinkler = document.getElementById('btn-hero-sprinkler');
    
    if (heroSprinklerOn) {
        roomNode.classList.add('active-sprinkler');
        statusText.textContent = 'نشطة';
        btnSprinkler.classList.add('active-sprinkler');
    } else {
        roomNode.classList.remove('active-sprinkler');
        statusText.textContent = 'منطفئة';
        btnSprinkler.classList.remove('active-sprinkler');
    }
}

// Hero Simulator - Vexora Interactive Functions
function triggerHeroIncident() {
    const overlayBox = document.getElementById('hero-mock-detection-box');
    const logsContainer = document.getElementById('hero-alert-logs');
    const targetCircle = document.getElementById('hero-ai-target-circle');
    const targetLine = document.getElementById('hero-ai-target-line');
    
    // Toggle visual detection overlay
    overlayBox.style.display = 'block';
    targetCircle.style.display = 'block';
    targetLine.style.display = 'block';
    
    // Add warning log entry
    const time = new Date().toTimeString().split(' ')[0];
    const logHTML = `
        <div class="log-entry warning">
            <span class="time">${time}</span>
            <span class="msg">⚠️ رصد حركة مجهولة - بوابة رئيسية (اختراق)</span>
        </div>
    `;
    logsContainer.innerHTML = logHTML + logsContainer.innerHTML;
    
    // Auto reset warning after 4 seconds
    setTimeout(() => {
        overlayBox.style.display = 'none';
        targetCircle.style.display = 'none';
        targetLine.style.display = 'none';
    }, 4000);
}

// Sandbox Simulator Tabs switching
function toggleSandboxSim(brand) {
    const tabLumora = document.getElementById('tab-lumora-sim');
    const tabVexora = document.getElementById('tab-vexora-sim');
    const contentLumora = document.getElementById('sandbox-lumora');
    const contentVexora = document.getElementById('sandbox-vexora');
    
    if (brand === 'lumora') {
        tabLumora.classList.add('active');
        tabVexora.classList.remove('active');
        contentLumora.classList.add('active');
        contentVexora.classList.remove('active');
    } else {
        tabVexora.classList.add('active');
        tabLumora.classList.remove('active');
        contentVexora.classList.add('active');
        contentLumora.classList.remove('active');
    }
}

// Sandbox Simulator - Lumora Interactive Functions
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

    // Living room light
    if (chkLight.checked) {
        glowLiving.style.display = 'block';
        lampLightSvg.style.opacity = '0.8';
        actionsTaken.push('إضاءة المعيشة: تشغيل');
    } else {
        glowLiving.style.display = 'none';
        lampLightSvg.style.opacity = '0';
        actionsTaken.push('إضاءة المعيشة: إيقاف');
    }

    // Kitchen light
    if (chkKitchen.checked) {
        glowKitchen.style.display = 'block';
        actionsTaken.push('إضاءة المطبخ: تشغيل');
    } else {
        glowKitchen.style.display = 'none';
        actionsTaken.push('إضاءة المطبخ: إيقاف');
    }

    // Bedroom AC
    const acWrapper = document.getElementById('ac-temp-wrapper');
    if (chkAc.checked) {
        glowBedroom.style.display = 'block';
        glowAcBedroom.style.display = 'block';
        acWrapper.style.display = 'flex';
        actionsTaken.push(`مكيف النوم: تشغيل (${acTemperature}°م)`);
    } else {
        glowBedroom.style.display = 'none';
        glowAcBedroom.style.display = 'none';
        acWrapper.style.display = 'none';
        actionsTaken.push('مكيف النوم: إيقاف');
    }

    // Security locks
    if (chkSec.checked) {
        lockBodySvg.setAttribute('fill', '#10b981');
        lockShackleSvg.setAttribute('stroke', '#10b981');
        lockShackleSvg.setAttribute('d', 'M6 0v8h12v-8a6 6 0 0 0-12 0'); // Locked
        lockText.className = 'text-success';
        lockText.textContent = 'مغلقة ومؤمنة';
        
        // Hide water garden sprinkler visual
        document.getElementById('sprinkler-water-1').style.display = 'none';
        document.getElementById('sprinkler-water-2').style.display = 'none';
    } else {
        lockBodySvg.setAttribute('fill', '#ef4444');
        lockShackleSvg.setAttribute('stroke', '#ef4444');
        lockShackleSvg.setAttribute('d', 'M6 0v8h12v-8a6 6 0 0 0-12 0m12 0v-4'); // Unlocked path simulation
        lockText.className = 'text-danger';
        lockText.textContent = 'ملغية التأمين - الحديقة نشطة!';
        
        // Show water garden sprinkler visual (Sprinkler runs when lock is off)
        document.getElementById('sprinkler-water-1').style.display = 'block';
        document.getElementById('sprinkler-water-2').style.display = 'block';
        actionsTaken.push('أمان البوابة: إلغاء (رشاشات الحديقة تعمل)');
    }

    // Construct logs feedback message
    feedbackMsg.innerHTML = '⚡ <strong>تحديث حالة المنزل:</strong> ' + actionsTaken.slice(-2).join(' | ');
}

function changeAcTemp(delta) {
    acTemperature += delta;
    if (acTemperature < 16) acTemperature = 16;
    if (acTemperature > 30) acTemperature = 30;
    
    document.getElementById('ac-temp-num').textContent = acTemperature;
    
    const feedbackMsg = document.getElementById('sim-feedback-lumora');
    feedbackMsg.innerHTML = `❄️ تم ضبط درجة حرارة المكيف على <strong>${acTemperature}°م</strong>.`;
}

// Sandbox Simulator - Vexora Interactive Functions
function runVexoraScenario(scenario) {
    const alertBox = document.getElementById('camera-target');
    const fireBox = document.getElementById('camera-fire');
    const phoneAlert = document.getElementById('phone-alert');
    const phoneMsg = document.getElementById('phone-alert-msg');
    const feedbackMsg = document.getElementById('sim-feedback-vexora');
    
    // Update scenario buttons active classes
    document.getElementById('btn-scen-clear').classList.remove('active');
    document.getElementById('btn-scen-intruder').classList.remove('active');
    document.getElementById('btn-scen-fire').classList.remove('active');
    
    if (scenario === 'clear') {
        document.getElementById('btn-scen-clear').classList.add('active');
        
        alertBox.style.display = 'none';
        fireBox.style.display = 'none';
        phoneAlert.classList.remove('show');
        feedbackMsg.innerHTML = '🟢 النظام في وضع الاستعداد ورصد الأجسام النشط (الوضع طبيعي).';
    } 
    else if (scenario === 'intruder') {
        document.getElementById('btn-scen-intruder').classList.add('active');
        
        alertBox.style.display = 'block';
        fireBox.style.display = 'none';
        feedbackMsg.innerHTML = '🚨 رصد متسلل! تم تحديد هوية شخص مجهول بعد ساعات العمل.';
        
        setTimeout(() => {
            phoneMsg.innerHTML = '🚨 تنبيه أمني عاجل: رصد حركات تسلل مجهولة في منطقة خزانة الأصول. الكاميرا 02.';
            phoneAlert.classList.add('show');
        }, 500); // quick delay
    } 
    else if (scenario === 'fire') {
        document.getElementById('btn-scen-fire').classList.add('active');
        
        alertBox.style.display = 'none';
        fireBox.style.display = 'block';
        feedbackMsg.innerHTML = '🔥 رصد نيران ودخان! تم تفعيل بروتوكول السلامة ونظام الإنذار.';
        
        // Show fire alert notification
        setTimeout(() => {
            phoneMsg.innerHTML = '⚠️ إنذار حريق عاجل: رصد نيران ودخان تصاعدي في المستودع. تم إبلاغ الطوارئ تلقائياً!';
            phoneAlert.classList.add('show');
        }, 500);
    }
}

// Multi-Step Form Logic

function setFormProduct(product) {
    selectedFormProduct = product;
    
    // Clear select cards styling
    document.getElementById('select-card-lumora').classList.remove('selected');
    document.getElementById('select-card-vexora').classList.remove('selected');
    document.getElementById('select-card-both').classList.remove('selected');
    
    // Set checked state of radio buttons
    document.getElementById('radio-' + product).checked = true;
    
    // Style chosen card
    document.getElementById('select-card-' + product).classList.add('selected');
    
    // Update company field requirement
    updateCompanyFieldVisibility();
}

function updateCompanyFieldVisibility() {
    const companyGroup = document.getElementById('company-field-group');
    const companyInput = document.getElementById('company_name');
    
    if (selectedFormProduct === 'vexora' || selectedFormProduct === 'both') {
        companyGroup.style.display = 'flex';
        companyInput.required = true;
    } else {
        companyGroup.style.display = 'none';
        companyInput.required = false;
        companyInput.value = '';
    }
}

// Helper to select product and navigate to form step 1
function selectDemoProduct(product) {
    setFormProduct(product);
    
    // Scroll smoothly to form section
    document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' });
}

// Lead Magnets helper
function selectLeadMagnet(magnetName) {
    // Set text notes in step 3
    const notesField = document.getElementById('cust_notes');
    notesField.value = `أريد الاستفادة من العرض المجاني: ${magnetName}`;
    
    if (magnetName.includes('لومورا')) {
        setFormProduct('lumora');
    } else if (magnetName.includes('فيكسورا')) {
        setFormProduct('vexora');
    } else {
        setFormProduct('both');
    }
    
    // Scroll smoothly to form section
    document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' });
}

// Multi step transitions
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const nodes = document.querySelectorAll('.step-node');
    
    // Progress calculation (1 -> 0%, 2 -> 33%, 3 -> 66%, 4 -> 100%)
    const percentage = ((currentFormStep - 1) / 3) * 100;
    progressBar.style.width = `calc(${percentage}% * 0.75 + 12.5%)`; // adjusted to fit step circles
    
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
            alert('الرجاء اختيار المنتج المطلوب أولاً للمتابعة.');
            return false;
        }
        return true;
    }
    
    if (currentFormStep === 2) {
        const name = document.getElementById('cust_name').value.trim();
        const email = document.getElementById('cust_email').value.trim();
        const phone = document.getElementById('cust_phone').value.trim();
        const company = document.getElementById('company_name').value.trim();
        
        if (!name || !email || !phone) {
            alert('الرجاء تعبئة جميع الحقول المطلوبة المميزة بـ (*).');
            return false;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('الرجاء إدخال بريد إلكتروني صحيح.');
            return false;
        }
        
        if ((selectedFormProduct === 'vexora' || selectedFormProduct === 'both') && !company) {
            alert('الرجاء إدخال اسم الشركة لمتابعة طلب ديمو الأعمال.');
            return false;
        }
        
        return true;
    }
    
    if (currentFormStep === 3) {
        const dateVal = document.getElementById('demo_date').value;
        const timeVal = document.getElementById('demo_time').value;
        
        if (!dateVal || !timeVal) {
            alert('الرجاء اختيار تاريخ ووقت حجز الديمو.');
            return false;
        }
        return true;
    }
    
    return true;
}

function nextStep(stepNum) {
    if (!validateCurrentStep()) return;
    
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.remove('active');
    
    // Show next step
    currentFormStep = stepNum;
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.add('active');
    
    updateProgressBar();
}

function prevStep(stepNum) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.remove('active');
    
    // Show previous step
    currentFormStep = stepNum;
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.add('active');
    
    updateProgressBar();
}

// Form Submission handling
function handleFormSubmit(event) {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    
    // Fetch values to populate success step
    const name = document.getElementById('cust_name').value.trim();
    const phone = document.getElementById('cust_phone').value.trim();
    const dateVal = document.getElementById('demo_date').value;
    const timeVal = document.getElementById('demo_time').value;
    
    // Formulate brand text
    let brandText = '';
    if (selectedFormProduct === 'lumora') brandText = 'لومورا (Lumora)';
    else if (selectedFormProduct === 'vexora') brandText = 'فيكسورا (Vexora)';
    else brandText = 'لومورا وفيكسورا معاً (بيوت المتكاملة)';
    
    // Map time options to readable text
    let timeText = '';
    if (timeVal === 'morning') timeText = 'الصباحية (9:00 ص - 12:00 م)';
    else if (timeVal === 'afternoon') timeText = 'بعد الظهر (12:00 م - 4:00 م)';
    else timeText = 'المسائية (4:00 م - 8:00 م)';
    
    // Populating success screen
    document.getElementById('success-user-name').textContent = name;
    document.getElementById('success-product').textContent = brandText;
    document.getElementById('success-date').textContent = dateVal;
    document.getElementById('success-time').textContent = timeText;
    document.getElementById('success-phone').textContent = phone;
    
    // Transition to success step (Step 4)
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.remove('active');
    currentFormStep = 4;
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.add('active');
    updateProgressBar();
    
    // Save data to localStorage (Lead Capture Simulation)
    const leadData = {
        name,
        email: document.getElementById('cust_email').value.trim(),
        phone,
        product: selectedFormProduct,
        company: document.getElementById('company_name').value.trim(),
        date: dateVal,
        time: timeVal,
        notes: document.getElementById('cust_notes').value.trim(),
        submittedAt: new Date().toISOString()
    };
    
    let existingLeads = JSON.parse(localStorage.getItem('beyout_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('beyout_leads', JSON.stringify(existingLeads));

    // Send data to Netlify Forms via AJAX for real backend capture
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

// Reset form to start a new submission
function resetForm() {
    // Reset all form inputs
    document.getElementById('demoForm').reset();
    
    // Clear selection
    selectedFormProduct = '';
    document.getElementById('select-card-lumora').classList.remove('selected');
    document.getElementById('select-card-vexora').classList.remove('selected');
    document.getElementById('select-card-both').classList.remove('selected');
    
    // Go to step 1
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.remove('active');
    currentFormStep = 1;
    document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.add('active');
    
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
    
    // Toggle class on body for directional styling if needed
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
    
    // Toggle language button text
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
        langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    }
}

const translations = {
    ar: {
        "hero_switch_lumora": "LUMORA | لومورا (أفراد)",
        "hero_switch_vexora": "VEXORA | فيكسورا (شركات)",
        "lumora_hero_title": "منزلك ينبض بالحياة مع <span class=\"highlight-lumora\">LUMORA</span>",
        "lumora_hero_desc": "تحكّم في الإضاءة، التكييف، الأجهزة، والأمان بلمسة واحدة أو بأوامرك الصوتية. تجربة معيشية استثنائية توفر لك الراحة، التوفير، والأمان الكامل أينما كنت.",
        "hero_benefits_lumora_1": "توفير حتى 30% من استهلاك الطاقة ذكياً.",
        "hero_benefits_lumora_2": "سيناريوهات ذكية مخصصة لأسلوب حياتك اليومي.",
        "hero_benefits_lumora_3": "حماية متطورة وتنبيهات فورية عند حدوث أي طارئ.",
        "hero_cta_lumora": "احجز ديمو منزلك الذكي",
        "hero_secondary_lumora": "جرّب لوحة التحكم مجاناً",
        "vexora_hero_title": "أمن أعمالك بذكاء خارق مع <span class=\"highlight-vexora\">VEXORA</span>",
        "vexora_hero_desc": "حوّل كاميرات المراقبة العادية إلى نظام أمان ذكي يكتشف التهديدات، الحرائق، التسلل، ويحلل حركة الزوار فورياً مع إرسال إشعارات لحظية لإنقاذ الموقف قبل فوات الأوان.",
        "hero_benefits_vexora_1": "رصد فوري للتسلل، سرقة الأصول، وتواجد الغرباء.",
        "hero_benefits_vexora_2": "إشعارات تنبيه فورية على الموبايل واللوحة الإلكترونية.",
        "hero_benefits_vexora_3": "تحليلات ذكية لزيارات العملاء وأوقات الذروة.",
        "hero_cta_vexora": "اطلب ديمو نظام الشركات",
        "hero_secondary_vexora": "شاهد محاكاة الكاميرا الحية",
        "nav_about": "من نحن",
        "nav_lumora_title": "لومورا",
        "nav_lumora_badge": "أفراد",
        "nav_vexora_title": "فيكسورا",
        "nav_vexora_badge": "شركات",
        "nav_demo": "حجز ديمو",
        "nav_btn_demo": "طلب ديمو مجاني",
        "hero_title": "شركة بيوت للحلول الذكية",
        "hero_subtitle": "Smart Living. Intelligent Business. (عيش بذكاء، وأدر أعمالك بذكاء)",
        "hero_desc": "نحن نربط التكنولوجيا بحياتك اليومية وأعمالك التجارية. اختر أحد برانداتنا أدناه لتكتشف تفاصيل الحلول والمحاكيات التفاعلية لكل منها.",
        "lumora_badge": "أنظمة المنازل الذكية B2C",
        "lumora_title": "لومورا | لأسلوب حياة ذكي ومريح",
        "lumora_desc": "عوّل منزلك العادي إلى بيئة تفاعلية تفهم احتياجاتك وتوفر طاقتك. تحكّم في الإضاءة، التكييف، الأجهزة، والأمان بلمسة واحدة أو عبر الأوامر الصوتية.",
        "lumora_point_1": "توفير حتى 30% من استهلاك الكهرباء بنظام التكييف الذكي.",
        "lumora_point_2": "سيناريوهات يومية مؤتمتة (وضع النوم، وضع السفر، وضع الترحيب).",
        "lumora_point_3": "حماية تامة بفضل المستشعرات والإنذار المبكر للأعطال والحرائق.",
        "lumora_btn_explore": "تصفح المحاكي التفاعلي",
        "lumora_btn_demo": "طلب ديمو لومورا",
        "vexora_badge": "تحليلات الكاميرات والذكاء الاصطناعي B2B",
        "vexora_title": "فيكسورا | أمن أعمالك بذكاء خارق",
        "vexora_desc": "قم بترقية كاميرات المراقبة الحالية لشركتك إلى نظام أمان رقمي فوري يكتشف التسلل، الحرائق، وسرقة الأصول مع إرسال إشعارات لحظية لإنقاذ الموقف فوراً.",
        "vexora_point_1": "رصد فوري متطور للتسلل وتواجد الغرباء بعد ساعات العمل.",
        "vexora_point_2": "تنبيهات فورية على الهاتف والبريد مع تحديد ذكي للأخطار.",
        "vexora_point_3": "تحليلات حركة الزوار (Heatmaps) وأوقات الذروة للمحلات.",
        "vexora_btn_explore": "شاهد الكاميرا الحية",
        "vexora_btn_demo": "طلب ديمو الشركات",
        "lumora_showcase_title": "عيش الرفاهية الكاملة في منزلك الذكي",
        "lumora_showcase_desc": "نظام لومورا يمنحك راحة البال والتحكم الكامل. لا داعي للقلق بشأن نسيان الإنارة أو التكييف قيد العمل، حيث تقوم المستشعرات الذكية بضبط كل شيء تلقائياً بناءً على تواجدك في الغرفة.",
        "lumora_magnet_title": "كتيب \"توفير الطاقة في المنزل الذكي\"",
        "lumora_magnet_desc": "احصل على دليلك المجاني لتكتشف كيف توفر 30% من فواتير الكهرباء.",
        "lumora_magnet_btn": "تحميل الكتيب مجاناً ←",
        "lumora_mockup_title": "لوحة تحكم لومورا للمنزل الذكي",
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
        "vexora_showcase_desc": "نظام فيكسورا يقوم بمراقبة وتحليل الفيديوهات الصادرة من كاميراتك الحالية فورياً. يتعرف النظام على الأنشطة المشبوهة، الغرباء المتسللين، وحتى تصاعد الدخان، ويرسل تنبيهاً أمنياً لجوالك وجوال مسؤولي الأمن فوراً.",
        "vexora_magnet_title": "جلسة فحص وتقييم أمني مجاني لكاميراتك",
        "vexora_magnet_desc": "دع مهندسينا يراجعون نظام حمايتك الحالي ويقدمون لك خطة ترقية مجانية.",
        "vexora_magnet_btn": "احجز الجلسة المجانية الآن ←",
        "sandbox_subtitle": "منطقة المحاكاة المتكاملة",
        "sandbox_title": "جرّب لوحات التحكم الكاملة بنفسك",
        "sandbox_desc": "اختبر التفاعل الحقيقي وعش تجربة العميل. تحكم في فيلا لومورا الذكية أو اختبر سيناريوهات كاميرا فيكسورا الأمنية.",
        "sandbox_tab_lumora": "لوحة تحكم لومورا الذكية",
        "sandbox_tab_vexora": "كاميرات فيكسورا الذكية للشركات",
        "sandbox_house_living": "غرفة المعيشة",
        "sandbox_house_kitchen": "المطبخ",
        "sandbox_house_bedroom": "غرفة النوم الرئيسية",
        "sandbox_house_garden": "الحديقة والمدخل",
        "sandbox_ctrl_title": "أدوات التحكم بالمنزل الذكي",
        "sandbox_ctrl_desc": "اضغط على المفاتيح أدناه لمحاكاة إرسال أوامر التحكم بالمنزل وشاهد الاستجابة الفورية بالرسم التخطيطي.",
        "sandbox_ctrl_living_light": "إضاءة غرفة المعيشة",
        "sandbox_ctrl_kitchen_light": "إضاءة المطبخ",
        "sandbox_ctrl_bedroom_ac": "تكييف غرفة النوم (AC)",
        "sandbox_ctrl_ac_temp": "درجة حرارة المكيف: ",
        "sandbox_ctrl_security": "أمان قفل البوابة والحديقة",
        "sandbox_ctrl_security_status_lbl": "حالة البوابة: ",
        "sandbox_ctrl_secured_val": "مغلقة ومؤمنة",
        "sandbox_ctrl_unsecured_val": "ملغية التأمين - الحديقة نشطة!",
        "sandbox_ctrl_welcome_msg": "أهلاً بك في لومورا! قم بتشغيل أو إطفاء الأجهزة لتجربة النظام الذكي.",
        "sandbox_vex_ctrl_title": "أدوات اختبار التحليل الذكي Vexora",
        "sandbox_vex_ctrl_desc": "تحكم بالكاميرا وقم بمحاكاة سيناريوهات حقيقية لرؤية رد فعل الذكاء الاصطناعي وكيفية رصد المخالفات فورياً.",
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
        "form_step1_title": "ما هي الحلول التي تود تجربتها والتعرف عليها؟",
        "form_product_lumora_desc": "للأفراد والمنازل الذكية والشقق والفلل.",
        "form_product_vexora_desc": "للشركات والمصانع ومراقبة وتحليل الفيديوهات بالكاميرات.",
        "form_product_both_desc": "حلول متكاملة للمنازل والأعمال معاً.",
        "form_product_both_badge": "بيوت المتكاملة",
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
        "form_lbl_notes": "أكبر تحدي أو متطلبات معينة تود مناقشتها؟",
        "form_success_thanks": "شكراً لطلبك، ",
        "form_success_desc": "تم تسجيل طلبك بنجاح لحجز ديمو خاص بمنتجات ",
        "form_success_schedule": "موعدك المقترح: ",
        "form_success_period": " في الفترة الـ ",
        "form_success_whatsapp": "سنقوم بإرسال رسالة تأكيد على واتساب وهاتفك برقم ",
        "form_success_whatsapp_sub": " وتفاصيل الاجتماع الافتراضي خلال ساعة واحدة.",
        "form_success_reset_btn": "طلب حجز جديد",
        "footer_about_text": "مستشارك وشريكك التكنولوجي الموثوق لتصميم وبناء أنظمة التحكم الذكية وتحليلات الفيديو الأمنية.",
        "footer_links_title": "روابط سريعة",
        "footer_link_lumora": "لومورا للمنازل الذكية",
        "footer_link_vexora": "فيكسورا لتحليل الفيديو",
        "footer_link_demo": "حجز موعد ديمو",
        "footer_social_title": "تابعنا على شبكاتنا الاجتماعية",
        "footer_copyright": "جميع الحقوق محفوظة. شركة بيوت 2026 &copy;"
    },
    en: {
        "hero_switch_lumora": "LUMORA | B2C Smart Home",
        "hero_switch_vexora": "VEXORA | B2B Camera Analytics",
        "lumora_hero_title": "Your home comes alive with <span class=\"highlight-lumora\">LUMORA</span>",
        "lumora_hero_desc": "Control lighting, AC, appliances, and security with a single touch or voice commands. An exceptional living experience that brings comfort, savings, and complete safety wherever you are.",
        "hero_benefits_lumora_1": "Save up to 30% of energy consumption smartly.",
        "hero_benefits_lumora_2": "Custom smart scenarios for your daily life.",
        "hero_benefits_lumora_3": "Advanced protection and instant alerts for emergencies.",
        "hero_cta_lumora": "Book Your Smart Home Demo",
        "hero_secondary_lumora": "Try Out Dashboard for Free",
        "vexora_hero_title": "Secure your business with super intelligence with <span class=\"highlight-vexora\">VEXORA</span>",
        "vexora_hero_desc": "Turn standard security cameras into an intelligent security system that detects threats, fires, intrusion, and analyzes visitor traffic in real time with instant notifications to save the day.",
        "hero_benefits_vexora_1": "Real-time detection of intrusion, asset theft, and strangers.",
        "hero_benefits_vexora_2": "Instant alert notifications on mobile and dashboard.",
        "hero_benefits_vexora_3": "Intelligent analytics for client visits and store peak times.",
        "hero_cta_vexora": "Request B2B Demo",
        "hero_secondary_vexora": "Watch Live Camera Simulation",
        "nav_about": "About Us",
        "nav_lumora_title": "Lumora",
        "nav_lumora_badge": "B2C",
        "nav_vexora_title": "Vexora",
        "nav_vexora_badge": "B2B",
        "nav_demo": "Book Demo",
        "nav_btn_demo": "Request Free Demo",
        "hero_title": "Beyout Smart Solutions",
        "hero_subtitle": "Smart Living. Intelligent Business.",
        "hero_desc": "We connect technology with your daily life and commercial business. Choose one of our brands below to discover details, solutions, and interactive simulators.",
        "lumora_badge": "B2C Smart Home Systems",
        "lumora_title": "Lumora | For a Smart & Cozy Lifestyle",
        "lumora_desc": "Transform your ordinary home into an interactive environment that understands your needs and saves energy. Control lighting, AC, appliances, and security with a single touch or voice commands.",
        "lumora_point_1": "Save up to 30% on electricity consumption with smart AC management.",
        "lumora_point_2": "Automated daily scenarios (Sleep mode, Travel mode, Welcome home mode).",
        "lumora_point_3": "Total protection with smart sensors and early warning for fire or faults.",
        "lumora_btn_explore": "Explore Simulator",
        "lumora_btn_demo": "Request Lumora Demo",
        "vexora_badge": "B2B AI Video Analytics",
        "vexora_title": "Vexora | Secure Your Business with AI",
        "vexora_desc": "Upgrade your business security cameras to a real-time digital defense system. Detect trespassers, fires, and asset theft with instant phone alerts to save the day.",
        "vexora_point_1": "Advanced real-time detection of intruders and strangers after hours.",
        "vexora_point_2": "Instant alerts on phone and email with smart hazard identification.",
        "vexora_point_3": "Customer foot traffic analytics (heatmaps) and store peak times.",
        "vexora_btn_explore": "Watch Live Feed",
        "vexora_btn_demo": "Request B2B Demo",
        "lumora_showcase_title": "Live in Ultimate Luxury inside Your Smart Home",
        "lumora_showcase_desc": "Lumora system gives you peace of mind and absolute control. No need to worry about forgetting the lights or AC on; smart sensors adjust everything automatically based on room occupancy.",
        "lumora_magnet_title": "eBook: \"Energy Saving in Smart Homes\"",
        "lumora_magnet_desc": "Get your free guide to discover how to save up to 30% on electricity bills.",
        "lumora_magnet_btn": "Download Guide for Free ←",
        "lumora_mockup_title": "Lumora Smart Home Dashboard",
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
        "vexora_showcase_desc": "Vexora monitors and analyzes live video feeds from your existing security cameras. The system automatically identifies suspicious movements, trespassers, and smoke, alerting you instantly.",
        "vexora_magnet_title": "Free Camera Security Audit & Assessment",
        "vexora_magnet_desc": "Let our engineers audit your current surveillance system and offer a free upgrade plan.",
        "vexora_magnet_btn": "Book Free Audit Session ←",
        "sandbox_subtitle": "Integrated Simulator Sandbox",
        "sandbox_title": "Try Out the Live Control Panels Yourself",
        "sandbox_desc": "Test real interactions and live the customer experience. Control Lumora's smart villa or simulate Vexora's AI security camera scenarios.",
        "sandbox_tab_lumora": "Lumora Smart Control Panel",
        "sandbox_tab_vexora": "Vexora Intelligent Camera Simulator",
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
        "sandbox_ctrl_welcome_msg": "Welcome to Lumora! Toggle devices to experience the smart system.",
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
        "form_step1_title": "Which solutions would you like to experience and explore?",
        "form_product_lumora_desc": "For individuals, smart apartments, and villas.",
        "form_product_vexora_desc": "For businesses, factories, and smart retail camera analysis.",
        "form_product_both_desc": "Complete integrated solutions for home and business.",
        "form_product_both_badge": "Beyout Combined",
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
        "form_lbl_notes": "What is your biggest challenge or specific requirements?",
        "form_success_thanks": "Thank you for your request, ",
        "form_success_desc": "Your request has been registered successfully to book a demo for ",
        "form_success_schedule": "Your suggested date: ",
        "form_success_period": " during the ",
        "form_success_whatsapp": "We will send a confirmation message on WhatsApp and phone to ",
        "form_success_whatsapp_sub": " with virtual meeting details within an hour.",
        "form_success_reset_btn": "Request a New Booking",
        "footer_about_text": "Your trusted technology partner and consultant for smart home control systems and AI video analytics.",
        "footer_links_title": "Quick Links",
        "footer_link_lumora": "Lumora Smart Homes",
        "footer_link_vexora": "Vexora Video Analytics",
        "footer_link_demo": "Book a Demo Session",
        "footer_social_title": "Follow Us on Social Media",
        "footer_copyright": "&copy; 2026 Beyout Smart Solutions. All Rights Reserved."
    }
};
