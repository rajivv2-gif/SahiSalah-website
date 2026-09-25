// --- MARKETING & CONVERSION TRACKING PIXELS ---
const GA4_TRACKING_ID = "G-HQWR1DZZ19";      // Google Analytics 4 Measurement ID
const GOOGLE_ADS_ID = "AW-XXXXXXXXXX";        // Google Ads Conversion ID (Replace with actual ID)
const META_PIXEL_ID = "1470970177685076";      // Meta Pixel ID

// 1. Inject Google Tag (gtag.js) for GA4 and Google Ads
if (GA4_TRACKING_ID) {
    const gadsScript = document.createElement('script');
    gadsScript.async = true;
    gadsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_TRACKING_ID;
    document.head.appendChild(gadsScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA4_TRACKING_ID);

    if (GOOGLE_ADS_ID && GOOGLE_ADS_ID !== "AW-XXXXXXXXXX") {
        gtag('config', GOOGLE_ADS_ID);
    }
}

// 2. Inject Meta Pixel
if (META_PIXEL_ID && META_PIXEL_ID !== "XXXXXXXXXXXXXXX") {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
}

// Global Conversion Tracker helper
window.trackLeadConversion = function (leadSource) {
    console.log('[Tracking] Lead captured from source: ' + leadSource);
    
    // GA4 Event
    if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
            'event_category': 'Leads',
            'event_label': leadSource
        });
    }

    // Google Ads Event
    if (typeof gtag === 'function' && GOOGLE_ADS_ID && GOOGLE_ADS_ID !== "AW-XXXXXXXXXX") {
        gtag('event', 'conversion', {
            'send_to': GOOGLE_ADS_ID
        });
    }

    // Meta Pixel Event
    if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
            content_name: leadSource
        });
    }
};

// --- SHARED MASCOT & LEAD FORM LOGIC ---


document.addEventListener('DOMContentLoaded', () => {
    // Mascot Greeting Animation
    setTimeout(() => {
        const bubble = document.querySelector('.speech-bubble');
        if (bubble) {
            bubble.classList.add('active'); // Fade in bubble

            // Simulate typing for 2 seconds
            setTimeout(() => {
                const bubble = document.querySelector('.speech-bubble');
                const text = document.querySelector('.mascot-text');
                if (bubble) bubble.style.display = 'none';
                if (text) text.style.display = 'block';
            }, 2000);
        }
    }, 3000); // Wait 3 seconds after page load before showing Mascot CTA

    // Lead Form Controls (Quiz Evaluator)
    const leadModal = document.getElementById('leadModal');

    window.openLeadForm = function () {
        if (leadModal) {
            leadModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Reset Quiz State
            const s1 = document.getElementById('quiz-step-1');
            const s2 = document.getElementById('quiz-step-2');
            const s3 = document.getElementById('quiz-step-3');
            const s4 = document.getElementById('quiz-step-4');

            if (s1) s1.style.display = 'block';
            if (s2) s2.style.display = 'none';
            if (s3) s3.style.display = 'none';
            if (s4) s4.style.display = 'none';

            const loader = document.getElementById('quiz-loader');
            const text = document.getElementById('loader-text');
            if (loader) loader.style.width = '0%';
            if (text) text.innerText = 'Matching eligibility criteria...';
        }
    }

    window.closeLeadForm = function () {
        if (leadModal) {
            leadModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // restore scrolling
        }
    }

    // Quiz Navigation Logic
    let currentScore = "";
    let currentBudget = "";

    window.nextQuizStep = function (stepNum, val) {
        if (stepNum === 1) {
            currentScore = val;
            document.getElementById('quiz-step-1').style.display = 'none';
            document.getElementById('quiz-step-2').style.display = 'block';
        } else if (stepNum === 2) {
            currentBudget = val;

            // Store hidden values for Google Form
            document.getElementById('quizScore').value = currentScore;
            document.getElementById('quizBudget').value = currentBudget;

            document.getElementById('quiz-step-2').style.display = 'none';
            document.getElementById('quiz-step-3').style.display = 'block';

            // Start AI Loader Simulation
            startFakeLoader();
        }
    }

    function startFakeLoader() {
        let loader = document.getElementById('quiz-loader');
        let text = document.getElementById('loader-text');
        let width = 0;

        let interval = setInterval(() => {
            width += 2;
            loader.style.width = width + '%';

            if (width === 30) text.innerText = 'Checking budget constraints...';
            if (width === 60) text.innerText = 'Finding scholarship matches...';
            if (width === 90) text.innerText = 'Finalizing top institutions...';

            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('quiz-step-3').style.display = 'none';
                    document.getElementById('quiz-step-4').style.display = 'block';
                }, 500);
            }
        }, 30); // 30ms * 50 steps = 1.5 seconds loading time
    }

    // Close lead modal if clicking outside
    window.addEventListener('click', function (event) {
        if (event.target == leadModal) {
            closeLeadForm();
        }
    });

    // Google Sheets Form Fetch Submission Action
    window.submitForm = function (event) {
        event.preventDefault(); // Stop page reload

        const btn = document.getElementById('submitBtn');
        const msg = document.getElementById('form-message');
        const form = document.getElementById('google-sheet-form');

        // Validation
        const phoneInput = document.getElementById('leadPhone').value.trim();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput)) {
            alert("Please enter a valid 10-digit WhatsApp number.");
            return;
        }

        // Replace this URL with your actual deployed Google Apps Script Web App URL!
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmQ_6M7ZsS2bpmn8vFoXyg64ndzYpuCBioX79y2IfxwY7f5todpQ6CzajV-Z6DCsWV/exec";

        // UI Loading State
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;
        btn.disabled = true;

        // Collect Form Data as URL parameters so Google Apps Script can parse it
        const formData = new URLSearchParams(new FormData(form));

        // Fetch API to POST data to Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Essential for Google Apps Script Web Apps avoiding CORS
            body: formData
        })
            .then(() => {
                // Trigger Lead Tracking Conversion
                if (typeof window.trackLeadConversion === 'function') {
                    window.trackLeadConversion('Evaluator Quiz');
                }

                // With no-cors, we can't read the exact json response, 
                // but a resolved promise means the network request completed.
                btn.style.display = 'none';
                msg.style.display = 'block';

                // Close modal after 3 seconds
                setTimeout(() => {
                    if (typeof closeLeadForm === "function") {
                        closeLeadForm();
                    }
                    // Reset for future
                    btn.style.display = 'block';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    msg.style.display = 'none';
                    form.reset();
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = `Error. Try Again!`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    }

    // Scroll to Top Button Logic
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Roadmap Form Controls
    const roadmapModal = document.getElementById('roadmapModal');

    window.openRoadmapForm = function () {
        // Get dropdown elements
        const streamSelect = document.getElementById('hero-stream');
        const scoreSelect = document.getElementById('hero-score');
        const budgetSelect = document.getElementById('hero-budget');
        const goalSelect = document.getElementById('hero-goal');
        const locationSelect = document.getElementById('hero-location');

        let isValid = true;

        // Validation Helper
        const validateSelect = (selectElem) => {
            if (selectElem && !selectElem.value) {
                const parent = selectElem.parentElement;
                parent.classList.add('shake-error');
                // Remove class after animation completes so it can be re-triggered
                setTimeout(() => parent.classList.remove('shake-error'), 500);
                isValid = false;
            }
        };

        // Enforce required fields
        validateSelect(streamSelect);
        validateSelect(scoreSelect);
        validateSelect(budgetSelect);

        // If validation fails, stop form from opening
        if (!isValid) return;

        if (roadmapModal) {
            roadmapModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Get values from Hero Search Widget
            const stream = streamSelect ? streamSelect.value : '';
            const score = scoreSelect ? scoreSelect.value : '';
            const budget = budgetSelect ? budgetSelect.value : '';
            const goal = goalSelect ? goalSelect.value : '';
            const location = locationSelect ? locationSelect.value : '';

            // Set hidden values for the final form
            document.getElementById('rm-hidden-stream').value = stream || 'Not Specified';
            document.getElementById('rm-hidden-score').value = score || 'Not Specified';
            document.getElementById('rm-hidden-budget').value = budget || 'Not Specified';
            document.getElementById('rm-hidden-goal').value = goal || 'Not Specified';
            document.getElementById('rm-hidden-location').value = location || 'Not Specified';

            // Reset UI
            document.getElementById('roadmap-step-1').style.display = 'block';
            document.getElementById('roadmap-step-2').style.display = 'none';

            const loader = document.getElementById('roadmap-loader');
            const text = document.getElementById('rm-loader-text');
            if (loader) loader.style.width = '0%';
            if (text) text.innerText = 'Cross-referencing budget and score...';

            startRoadmapLoader();
        }
    }

    window.closeRoadmapForm = function () {
        if (roadmapModal) {
            roadmapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    function startRoadmapLoader() {
        let loader = document.getElementById('roadmap-loader');
        let text = document.getElementById('rm-loader-text');
        let width = 0;

        let interval = setInterval(() => {
            width += 2;
            loader.style.width = width + '%';

            if (width === 30) text.innerText = 'Analyzing target career paths...';
            if (width === 60) text.innerText = 'Filtering premium locations...';
            if (width === 90) text.innerText = 'Finalizing your roadmap...';

            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('roadmap-step-1').style.display = 'none';
                    document.getElementById('roadmap-step-2').style.display = 'block';
                }, 500);
            }
        }, 30); // 1.5 seconds loading
    }

    window.addEventListener('click', function (event) {
        if (event.target == roadmapModal) {
            closeRoadmapForm();
        }
    });

    window.submitRoadmap = function (event) {
        event.preventDefault();

        const btn = document.getElementById('rmSubmitBtn');
        const msg = document.getElementById('rm-form-message');
        const form = document.getElementById('roadmap-form');

        const phoneInput = document.getElementById('rmPhone').value.trim();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput)) {
            alert("Please enter a valid 10-digit WhatsApp number.");
            return;
        }

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmQ_6M7ZsS2bpmn8vFoXyg64ndzYpuCBioX79y2IfxwY7f5todpQ6CzajV-Z6DCsWV/exec";

        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;
        btn.disabled = true;

        const formData = new URLSearchParams(new FormData(form));

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
            .then(() => {
                // Trigger Lead Tracking Conversion
                if (typeof window.trackLeadConversion === 'function') {
                    window.trackLeadConversion('Roadmap Generator');
                }

                btn.style.display = 'none';
                msg.style.display = 'block';

                setTimeout(() => {
                    closeRoadmapForm();
                    btn.style.display = 'block';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    msg.style.display = 'none';
                    form.reset();
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = `Error. Try Again!`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    };

    // Share Link Widget Logic
    window.copyRoadmapLink = function () {
        const url = window.location.origin + window.location.pathname + '#roadmap-generator';
        navigator.clipboard.writeText(url).then(() => {
            const btn = document.querySelector('[onclick="copyRoadmapLink()"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check text-green" style="margin-right: 5px;"></i> Copied Link!';
            btn.style.color = '#10b981'; // Green text
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.color = '#1e293b';
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy link. Please manually copy: ' + url);
        });
    };

    // Video Modal Logic
    document.body.insertAdjacentHTML('beforeend', `
        <div id="videoModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center; backdrop-filter: blur(5px);">
            <div style="background:white; border-radius:15px; width:90%; max-width:650px; max-height:90vh; overflow-y:auto; position:relative; animation: slideUp 0.3s ease-out;">
                <button onclick="closeVideoModal()" style="position:absolute; top:15px; right:15px; background:rgba(0,0,0,0.7); color:white; border:none; width:35px; height:35px; border-radius:50%; cursor:pointer; z-index:20; display:flex; justify-content:center; align-items:center; transition:0.3s;"><i class="fa-solid fa-times"></i></button>
                <div style="position:relative; width:100%; padding-top:56.25%; background:#000;">
                    <!-- YouTube Video Embed -->
                    <iframe id="collegeVideoFrame" src="https://www.youtube.com/embed/ScMzIvxBSi4?si=kXnqzG-uG2aXvJ9g" title="College Representative Message" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:1;"></iframe>
                </div>
                <div style="padding:25px;">
                    <h3 id="videoModalTitle" style="font-size:1.6rem; margin-bottom:15px; font-family:'Outfit';">College Name</h3>
                    <h4 style="color:var(--primary-light); margin-bottom:15px; font-size:1.05rem;">Why Choose Us? (USPs)</h4>
                    <ul id="videoModalUSPs" style="list-style:none; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                        <!-- Dynamic USPs -->
                    </ul>
                    <button class="btn-primary" style="margin-top:25px; width:100%; justify-content:center; padding:15px;" onclick="closeVideoModal(); openLeadForm();">Apply Now & Get Brochure <i class="fa-solid fa-arrow-right ml-2"></i></button>
                </div>
            </div>
        </div>
        <style>
            @keyframes slideUp { from { transform: translateY(50px); opacity:0; } to { transform: translateY(0); opacity:1; } }
            .college-cover .play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: rgba(0,0,0,0.4); border: 2px solid white; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; opacity: 0; transition: all 0.3s; z-index: 5; backdrop-filter: blur(4px); }
            .college-cover:hover .play-btn { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            .college-cover .play-btn:hover { background: var(--secondary); border-color: var(--secondary); box-shadow: 0 0 20px var(--secondary); }
        </style>
    `);

    window.openVideoModal = function (name) {
        document.getElementById('videoModalTitle').innerText = name + ' - Campus Tour & Insights';

        // Mock USPs based on the name just for demo
        const usps = [
            '<i class="fa-solid fa-check-circle" style="margin-right:8px; color:#16a34a;"></i> 100% Placement Assistance',
            '<i class="fa-solid fa-check-circle" style="margin-right:8px; color:#16a34a;"></i> Fortune 500 Alumni Network',
            '<i class="fa-solid fa-check-circle" style="margin-right:8px; color:#16a34a;"></i> State-of-the-Art Facilities',
            '<i class="fa-solid fa-check-circle" style="margin-right:8px; color:#16a34a;"></i> Global Immersion Programs'
        ];

        document.getElementById('videoModalUSPs').innerHTML = usps.map(u => `<li><span style="font-size:0.95rem;">${u}</span></li>`).join('');
        document.getElementById('videoModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    window.closeVideoModal = function () {
        document.getElementById('videoModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        // Stop YouTube video from playing in background when closed
        const iframe = document.getElementById('collegeVideoFrame');
        if (iframe) {
            const src = iframe.src;
            iframe.src = src;
        }
    }

    // Dynamic Text Rotator Logic
    document.body.insertAdjacentHTML('beforeend', `
        <style>
            .text-rotator { display: inline-grid; vertical-align: bottom; overflow: hidden; padding: 0 5px; text-align: center; }
            .rotate-word { grid-area: 1 / 1; opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.4s ease; width: 100%; justify-self: center; }
            .rotate-word.active { opacity: 1; visibility: visible; transform: translateY(0); }
            .rotate-word.out { opacity: 0; visibility: hidden; transform: translateY(-20px); }
        </style>
    `);

    const rotators = document.querySelectorAll('.text-rotator');
    rotators.forEach(rotator => {
        const words = rotator.querySelectorAll('.rotate-word');
        let currentIndex = 0;
        if (words.length > 1) {
            setInterval(() => {
                words[currentIndex].classList.remove('active', 'in');
                words[currentIndex].classList.add('out');

                currentIndex = (currentIndex + 1) % words.length;

                words[currentIndex].classList.remove('out');
                words[currentIndex].classList.add('active', 'in');
            }, 2500);
        }
    });

    // 3. Register Service Worker for PWA / offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('[Service Worker] Registered successfully with scope:', reg.scope))
                .catch(err => console.error('[Service Worker] Registration failed:', err));
        });
    }

    // --- EXIT-INTENT POPUP LOGIC ---

    // Dynamically insert exit-intent-modal to the page if it doesn't exist
    if (!document.querySelector('exit-intent-modal')) {
        const exitIntentEl = document.createElement('exit-intent-modal');
        document.body.appendChild(exitIntentEl);
    }

    const exitModal = document.getElementById('exitIntentModal');

    window.openExitIntentForm = function () {
        if (exitModal) {
            exitModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeExitIntentForm = function () {
        if (exitModal) {
            exitModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Close exit modal if clicking outside
    window.addEventListener('click', function (event) {
        if (event.target == exitModal) {
            closeExitIntentForm();
        }
    });

    // Handle form submission
    window.submitExitIntentForm = function (event) {
        event.preventDefault();

        const btn = document.getElementById('exitSubmitBtn');
        const msg = document.getElementById('exit-form-message');
        const form = document.getElementById('exit-intent-form');

        // Validation
        const phoneInput = document.getElementById('exitPhone').value.trim();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput)) {
            alert("Please enter a valid 10-digit WhatsApp number.");
            return;
        }

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmQ_6M7ZsS2bpmn8vFoXyg64ndzYpuCBioX79y2IfxwY7f5todpQ6CzajV-Z6DCsWV/exec";

        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Downloading...`;
        btn.disabled = true;

        const formData = new URLSearchParams(new FormData(form));

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
            .then(() => {
                // Trigger Lead Tracking Conversion
                if (typeof window.trackLeadConversion === 'function') {
                    window.trackLeadConversion('Exit-Intent Popup');
                }

                btn.style.display = 'none';
                msg.style.display = 'block';

                // Trigger PDF download
                const link = document.createElement('a');
                link.href = 'Career_Roadmap_Sahi_Salah.pdf';
                link.download = 'Career_Roadmap_Sahi_Salah.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Set session storage to prevent showing it again
                sessionStorage.setItem('exitIntentShown', 'true');

                setTimeout(() => {
                    closeExitIntentForm();
                    btn.style.display = 'block';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    msg.style.display = 'none';
                    form.reset();
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = `Error. Try Again!`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    };

    // Exit Intent Trigger Logic
    let exitIntentTriggered = false;

    // 1. Desktop Trigger: Mouse leaves viewport from top
    document.addEventListener('mouseleave', function (e) {
        if (e.clientY < 20 && !exitIntentTriggered && !sessionStorage.getItem('exitIntentShown')) {
            exitIntentTriggered = true;
            sessionStorage.setItem('exitIntentShown', 'true');
            openExitIntentForm();
        }
    });

    // 2. Mobile Trigger Fallbacks:
    // A: Inactivity trigger (25 seconds of inactivity)
    let mobileTimer;
    function resetMobileTimer() {
        if (sessionStorage.getItem('exitIntentShown') || exitIntentTriggered) return;
        clearTimeout(mobileTimer);
        mobileTimer = setTimeout(() => {
            if (window.innerWidth < 768 && !exitIntentTriggered) {
                exitIntentTriggered = true;
                sessionStorage.setItem('exitIntentShown', 'true');
                openExitIntentForm();
            }
        }, 25000); // 25 seconds
    }

    // Listen to touch/scroll/click events to reset mobile timer
    if (window.innerWidth < 768) {
        document.addEventListener('scroll', resetMobileTimer, { passive: true });
        document.addEventListener('touchstart', resetMobileTimer, { passive: true });
        document.addEventListener('click', resetMobileTimer, { passive: true });
        resetMobileTimer();
    }

    // --- LEAD MAGNETS HANDLERS ---
    const magnetModal = document.getElementById('magnetModal');

    window.openMagnetForm = function (guideName, fileName) {
        if (magnetModal) {
            document.getElementById('magnetModalTitle').innerText = 'Download "' + guideName + '"';
            document.getElementById('magnetHiddenSource').value = 'Lead Magnet - ' + guideName;
            document.getElementById('magnetHiddenFile').value = fileName;
            magnetModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeMagnetForm = function () {
        if (magnetModal) {
            magnetModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Close magnet modal if clicking outside
    window.addEventListener('click', function (event) {
        if (event.target == magnetModal) {
            closeMagnetForm();
        }
    });

    window.submitMagnetForm = function (event) {
        event.preventDefault();

        const btn = document.getElementById('magnetSubmitBtn');
        const msg = document.getElementById('magnet-form-message');
        const form = document.getElementById('magnet-form');
        const fileName = document.getElementById('magnetHiddenFile').value;

        // Validation
        const phoneInput = document.getElementById('magnetPhone').value.trim();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput)) {
            alert("Please enter a valid 10-digit WhatsApp number.");
            return;
        }

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmQ_6M7ZsS2bpmn8vFoXyg64ndzYpuCBioX79y2IfxwY7f5todpQ6CzajV-Z6DCsWV/exec";

        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Preparing...`;
        btn.disabled = true;

        const formData = new URLSearchParams(new FormData(form));

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
            .then(() => {
                // Trigger Lead Tracking Conversion
                if (typeof window.trackLeadConversion === 'function') {
                    const magnetSource = document.getElementById('magnetHiddenSource') ? document.getElementById('magnetHiddenSource').value : 'Lead Magnet';
                    window.trackLeadConversion(magnetSource);
                }

                btn.style.display = 'none';
                msg.style.display = 'block';

                // Trigger PDF download
                const link = document.createElement('a');
                link.href = fileName;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    closeMagnetForm();
                    btn.style.display = 'block';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    msg.style.display = 'none';
                    form.reset();
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = `Error. Try Again!`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    };

    // --- STICKY URGENCY ALERT LOGIC ---

    // Dynamically insert urgency-alert-widget if it doesn't exist
    if (!document.querySelector('urgency-alert-widget')) {
        const urgencyEl = document.createElement('urgency-alert-widget');
        document.body.appendChild(urgencyEl);
    }

    const urgencyWidget = document.getElementById('urgencyAlertWidget');
    let urgencyRotationInterval;

    if (urgencyWidget && !sessionStorage.getItem('urgencyWidgetDismissed')) {
        // Show after a 4-second delay for smooth page introduction
        setTimeout(() => {
            if (sessionStorage.getItem('urgencyWidgetDismissed')) return;
            urgencyWidget.style.display = 'block';
            urgencyWidget.classList.add('slide-in');
            startUrgencyRotation();
        }, 4000);
    }

    window.dismissUrgencyWidget = function (event) {
        if (event) event.stopPropagation();
        if (urgencyWidget) {
            urgencyWidget.classList.remove('slide-in');
            urgencyWidget.classList.add('slide-out');
            clearInterval(urgencyRotationInterval);
            sessionStorage.setItem('urgencyWidgetDismissed', 'true');
            setTimeout(() => {
                urgencyWidget.style.display = 'none';
            }, 500); // Wait for slide-out animation to finish
        }
    };

    function startUrgencyRotation() {
        const messages = [
            document.getElementById('urgency-msg-1'),
            document.getElementById('urgency-msg-2'),
            document.getElementById('urgency-msg-3')
        ];
        const progressBar = document.getElementById('urgencyProgress');
        let currentMsgIndex = 0;

        // Function to animate progress bar
        function resetProgressBar() {
            if (!progressBar) return;
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            // Force reflow
            void progressBar.offsetWidth;
            progressBar.style.transition = 'width 7000ms linear';
            progressBar.style.width = '100%';
        }

        resetProgressBar();

        urgencyRotationInterval = setInterval(() => {
            if (sessionStorage.getItem('urgencyWidgetDismissed')) {
                clearInterval(urgencyRotationInterval);
                return;
            }

            // Fade out current message
            const currentMsg = messages[currentMsgIndex];
            if (currentMsg) {
                currentMsg.style.opacity = '0';
                setTimeout(() => {
                    currentMsg.style.display = 'none';
                    
                    // Increment and show next message
                    currentMsgIndex = (currentMsgIndex + 1) % messages.length;
                    const nextMsg = messages[currentMsgIndex];
                    if (nextMsg) {
                        nextMsg.style.display = 'flex';
                        nextMsg.style.opacity = '0';
                        // Force reflow
                        void nextMsg.offsetWidth;
                        nextMsg.style.opacity = '1';
                    }
                }, 300); // Transition timing match
            }

        resetProgressBar();
        }, 7000); // Rotate every 7 seconds
    }

    // --- PARENT GUIDE LEAD FORM HANDLER ---
    window.submitParentLeadForm = function (event) {
        event.preventDefault();

        const btn = document.getElementById('parentSubmitBtn');
        const msg = document.getElementById('parent-form-message');
        const form = document.getElementById('parent-lead-form');

        // Validation
        const phoneInput = document.getElementById('parentPhone').value.trim();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput)) {
            alert("Please enter a valid 10-digit WhatsApp number.");
            return;
        }

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmQ_6M7ZsS2bpmn8vFoXyg64ndzYpuCBioX79y2IfxwY7f5todpQ6CzajV-Z6DCsWV/exec";

        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Scheduling...`;
        btn.disabled = true;

        // Collect Form Data and append stream/source as Parent Page
        const formData = new URLSearchParams(new FormData(form));
        formData.append('stream', 'Parent Guide Session');

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
            .then(() => {
                // Trigger Lead Tracking Conversion
                if (typeof window.trackLeadConversion === 'function') {
                    window.trackLeadConversion('Parent Counseling Session');
                }

                btn.style.display = 'none';
                msg.style.display = 'block';

                setTimeout(() => {
                    btn.style.display = 'block';
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    msg.style.display = 'none';
                    form.reset();
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = `Error. Try Again!`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    };

});
