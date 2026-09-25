class SahiHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="announcement-banner" class="announcement-banner">
            <div class="ticker-wrap">
                <div class="ticker">
                    <div class="ticker-item"><span class="pulse-dot"></span> <strong>Breaking:</strong> Germany confirms zero tuition fees for Winter Intake.</div>
                    <div class="ticker-item"><span class="pulse-dot"></span> <strong>Update:</strong> UK visa processing times reduced to 3 weeks. Apply now!</div>
                    <div class="ticker-item"><span class="pulse-dot"></span> <strong>Deadline:</strong> Last 5 seats for Free Profile Evaluation this week.</div>
                </div>
            </div>
            <button class="close-banner" onclick="document.getElementById('announcement-banner').style.display='none'"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="brand-logo">
                    <i class="fa-solid fa-graduation-cap"></i> Sahi<span>Salah</span>
                </a>
                <ul class="nav-links">
                    <li><a href="index.html" class="nav-home">Home</a></li>
                    <li><a href="india-colleges.html" class="nav-india">Study in India</a></li>
                    <li><a href="scholarships.html" class="nav-scholarships">Scholarships & EMI</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle nav-services">Services & Programs <i class="fa-solid fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="parents-guide.html" style="font-weight: bold; color: var(--secondary);">Parent's Guide</a></li>
                            <li><a href="career-counseling.html">Career Counseling</a></li>
                            <li><a href="free-career-counseling.html">Free Counseling Session</a></li>
                            <li><a href="career-guidance.html">Career Guidance</a></li>
                            <li><a href="mba-admission.html">MBA Admissions</a></li>
                            <li><a href="pgdm-admission.html">PGDM Admissions</a></li>
                            <li><a href="online-mba.html">Online MBA</a></li>
                            <li><a href="working-professionals.html">For Professionals</a></li>
                            <li><a href="student-support.html">Student Support</a></li>
                            <li><a href="admissions-open.html">Admissions Open</a></li>
                            <li><a href="assessments.html">Specialized Tests</a></li>
                        </ul>
                    </li>
                    <li><a href="reviews.html" class="nav-reviews">Reviews</a></li>
                    <li><a href="blog.html" class="nav-blog">Blogs</a></li>
                    <li><a href="contact.html" class="nav-contact">Contact</a></li>
                </ul>
                <a href="https://wa.me/918882289261" class="btn-primary" target="_blank">
                    <i class="fa-brands fa-whatsapp"></i> Chat with Mentor
                </a>
            </div>
        </nav>
        `;

        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const selectors = {
            'india-colleges.html': '.nav-india',
            'scholarships.html': '.nav-scholarships',
            'blog.html': '.nav-blog',
            'reviews.html': '.nav-reviews',
            'contact.html': '.nav-contact',
            'index.html': '.nav-home'
        };

        let highlighted = false;
        for (const [key, selector] of Object.entries(selectors)) {
            if (currentPath === key) {
                const el = this.querySelector(selector);
                if (el) el.classList.add('active-link');
                highlighted = true;
                break;
            }
        }

        if (!highlighted) {
            if (currentPath.includes('mba-admission') || currentPath.includes('online-mba') || 
                currentPath.includes('career-counseling') || currentPath.includes('student-support') || 
                currentPath.includes('admissions-open') || currentPath.includes('assessments') ||
                currentPath.includes('free-career-counseling') || currentPath.includes('career-guidance') ||
                currentPath.includes('working-professionals') || currentPath.includes('pgdm-admission') ||
                currentPath.includes('parents-guide')) {
                const el = this.querySelector('.nav-services');
                if (el) el.classList.add('active-link');
            } else if (currentPath === '') {
                const el = this.querySelector('.nav-home');
                if (el) el.classList.add('active-link');
            }
        }
    }
}

class SahiFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .social-links a:hover {
                color: #60a5fa !important;
                transform: translateY(-3px);
            }
            .footer-col h4 {
                font-family: 'Outfit', sans-serif;
                font-size: 1.2rem;
                margin-bottom: 20px;
                color: white;
                position: relative;
                padding-bottom: 8px;
            }
            .footer-col h4::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 40px;
                height: 2px;
                background: var(--secondary);
            }
            .footer-col ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .footer-col ul li {
                margin-bottom: 12px;
            }
            .footer-col ul li a {
                color: #94a3b8;
                font-size: 0.95rem;
                transition: all 0.2s ease;
            }
            .footer-col ul li a:hover {
                color: var(--secondary);
                padding-left: 5px;
            }
            .whatsapp-helpline-pill {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(37, 211, 102, 0.15);
                color: #25d366 !important;
                border: 1px solid rgba(37, 211, 102, 0.35);
                padding: 8px 16px;
                border-radius: 999px;
                font-weight: 700;
                font-size: 0.9rem;
                text-decoration: none;
                margin-top: 10px;
                transition: all 0.3s ease;
            }
            .whatsapp-helpline-pill:hover {
                background: #25d366;
                color: #ffffff !important;
                box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35);
                transform: translateY(-2px);
            }
            .live-pulse-dot {
                width: 8px;
                height: 8px;
                background: #25d366;
                border-radius: 50%;
                display: inline-block;
                animation: pulseLive 1.5s infinite;
            }
            @keyframes pulseLive {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
                70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(37, 211, 102, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
            }
        </style>
        <footer>
            <div class="footer-container">
                <div class="footer-brand" style="flex: 1 1 300px; min-width: 250px;">
                    <h3>Sahi <span>Salah</span></h3>
                    <p style="margin-bottom: 12px; color: #cbd5e1; font-size: 0.95rem;">Decoding career &amp; admission possibilities with 100% data transparency.</p>
                    <p style="font-size: 0.88rem; line-height: 1.5; color: #94a3b8;"><i class="fa-solid fa-location-dot" style="color: var(--secondary);"></i> SS Complex, Near TVs Showroom Modipuram Bypass, Meerut 250001</p>
                    
                    <a href="https://wa.me/918882289261?text=Hi%20Sahi%20Salah,%20I%20need%20admission%20guidance" target="_blank" class="whatsapp-helpline-pill">
                        <span class="live-pulse-dot"></span>
                        <i class="fa-brands fa-whatsapp"></i> WhatsApp Helpline: +91 88822 89261
                    </a>

                    <div class="social-links" style="margin-top: 18px; display: flex; gap: 14px;">
                        <a href="https://facebook.com" target="_blank" title="Facebook" style="color: #94a3b8; font-size: 1.4rem; transition: all 0.3s; display: inline-block;"><i class="fa-brands fa-facebook"></i></a>
                        <a href="https://instagram.com" target="_blank" title="Instagram" style="color: #94a3b8; font-size: 1.4rem; transition: all 0.3s; display: inline-block;"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://linkedin.com" target="_blank" title="LinkedIn" style="color: #94a3b8; font-size: 1.4rem; transition: all 0.3s; display: inline-block;"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="https://youtube.com" target="_blank" title="YouTube" style="color: #94a3b8; font-size: 1.4rem; transition: all 0.3s; display: inline-block;"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
                <div class="footer-col" style="flex: 1 1 200px; min-width: 180px;">
                    <h4>Programs</h4>
                    <ul>
                        <li><a href="india-colleges.html">Study in India</a></li>
                        <li><a href="mba-admission.html">MBA Admissions 2026</a></li>
                        <li><a href="pgdm-admission.html">PGDM Admissions</a></li>
                        <li><a href="online-mba.html">Online MBA Degrees</a></li>
                        <li><a href="scholarships.html">Scholarships &amp; EMI</a></li>
                        <li><a href="working-professionals.html">For Working Professionals</a></li>
                    </ul>
                </div>
                <div class="footer-col" style="flex: 1 1 200px; min-width: 180px;">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="parents-guide.html" style="font-weight: bold; color: var(--secondary);">Parent's Guide</a></li>
                        <li><a href="career-counseling.html">Career Counseling</a></li>
                        <li><a href="free-career-counseling.html">Free Career Counseling</a></li>
                        <li><a href="career-guidance.html">Career Guidance</a></li>
                        <li><a href="student-support.html">Student Support</a></li>
                        <li><a href="admissions-open.html">Admissions Open 2026</a></li>
                        <li><a href="assessments.html">Career &amp; Aptitude Tests</a></li>
                    </ul>
                </div>
                <div class="footer-col" style="flex: 1 1 200px; min-width: 180px;">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="reviews.html">Student Success Stories</a></li>
                        <li><a href="blog.html">Blogs &amp; Career Articles</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="apply.html" style="color: #60a5fa; font-weight: 600;"><i class="fa-solid fa-paper-plane"></i> Apply for Mentorship</a></li>
                    </ul>
                </div>
            </div>
            <div style="max-width: 1200px; margin: 35px auto 0 auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 15px; color: #64748b; font-size: 0.85rem; align-items: center;">
                <p>&copy; 2026 <strong>Sahi Salah</strong> (StudyIndia). All rights reserved.</p>
                <p><i class="fa-solid fa-shield-halved" style="color: var(--secondary);"></i> 100% Transparent Counseling &bull; Zero Hidden Agent Fees.</p>
            </div>
        </footer>
        `;
    }
}

class SahiLeadModal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div id="mascot-cta" class="mascot-container" onclick="openLeadForm()">
        <div class="speech-bubble">
            <span class="typing-dots">•••</span>
        </div>
        <div class="mascot-text curved-text-wrapper" style="display:none;">
            <svg viewBox="0 0 140 140">
                <path id="mascot-curve" d="M 70, 70 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="transparent" />
                <text>
                    <textPath href="#mascot-curve" startOffset="0%">
                        Hi! 👋 Want a free profile evaluation? 8882289261 
                    </textPath>
                </text>
            </svg>
        </div>
        <div class="mascot-avatar pulse-avatar">
            <img src="mascot.png" alt="AI Mentor Mascot">
        </div>
    </div>

    <!-- Lead Generation Profile Evaluator Quiz -->
    <div id="leadModal" class="modal">
        <div class="form-modal quiz-modal">
            <span class="close-modal" onclick="closeLeadForm()">&times;</span>
            <div class="form-wrapper" id="quiz-wrapper">

                <!-- Step 1: Academics -->
                <div class="quiz-step" id="quiz-step-1">
                    <h3>Step 1: <span class="gradient-text">Academic Profile</span></h3>
                    <p>What is your 12th or Graduation Percentage?</p>
                    <div class="quiz-options">
                        <button class="quiz-btn" onclick="nextQuizStep(1, 'Below 60%')">Below 60%</button>
                        <button class="quiz-btn" onclick="nextQuizStep(1, '60% - 75%')">60% - 75%</button>
                        <button class="quiz-btn" onclick="nextQuizStep(1, '75% - 90%')">75% - 90%</button>
                        <button class="quiz-btn" onclick="nextQuizStep(1, 'Above 90%')">Above 90%</button>
                    </div>
                </div>

                <!-- Step 2: Budget -->
                <div class="quiz-step" id="quiz-step-2" style="display:none;">
                    <h3>Step 2: <span class="gradient-text">Budget</span></h3>
                    <p>What is your family's overall budget for your degree?</p>
                    <div class="quiz-options">
                        <button class="quiz-btn" onclick="nextQuizStep(2, 'Under ₹10 Lacs')">Under ₹10 Lacs</button>
                        <button class="quiz-btn" onclick="nextQuizStep(2, '₹10L - ₹20L')">₹10 Lacs - ₹20 Lacs</button>
                        <button class="quiz-btn" onclick="nextQuizStep(2, '₹20L - ₹40L')">₹20 Lacs - ₹40 Lacs</button>
                        <button class="quiz-btn" onclick="nextQuizStep(2, '₹40L+')">₹40 Lacs+ (Premium)</button>
                    </div>
                </div>

                <!-- Step 3: Calculating -->
                <div class="quiz-step" id="quiz-step-3" style="display:none; text-align: center;">
                    <h3><span class="gradient-text">Analyzing Profile...</span></h3>
                    <p>Our AI Mentor is scanning 15,000+ top institutions.</p>
                    <div class="loader-bar-container mt-4">
                        <div class="loader-bar" id="quiz-loader"></div>
                    </div>
                    <p class="mt-3 text-muted" id="loader-text">Matching eligibility criteria...</p>
                </div>

                <!-- Step 4: Final Capture -->
                <div class="quiz-step" id="quiz-step-4" style="display:none;">
                    <h3><span class="text-green">Match Found!</span> 🎉</h3>
                    <p>We found <strong>14 Top Colleges</strong> matching your exact profile. Enter your details to send
                        the matches to your WhatsApp!</p>
                    <form id="google-sheet-form" onsubmit="submitForm(event)">
                        <input type="hidden" id="quizScore" name="score" value="">
                        <input type="hidden" id="quizBudget" name="budget" value="">

                        <div class="form-group">
                            <input type="text" id="leadName" name="leadName" placeholder="Full Name" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="leadPhone" name="leadPhone" placeholder="WhatsApp Number" required>
                        </div>
                        <div class="form-group">
                            <select id="leadTarget" name="stream" required>
                                <option value="">Preferred Study Option</option>
                                <option value="BTech">Engineering / Tech</option>
                                <option value="MBA">MBA / Management</option>
                                <option value="Medical">Medical / MBBS</option>
                                <option value="Abroad">Study Abroad (UK/EU)</option>
                            </select>
                        </div>
                        <button type="submit" id="submitBtn" class="btn-primary w-100">Unlock Matches Now <i
                                class="fa-solid fa-unlock"></i></button>
                        <p id="form-message" class="secure-note" style="display:none; color: green; font-weight:bold;">
                            Success! Matches sent via WhatsApp.</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
        `;

        // Periodic mascot wiggle animation
        const mascot = this.querySelector('.mascot-container');
        if (mascot) {
            setInterval(() => {
                mascot.classList.add('mascot-wiggle-active');
                setTimeout(() => {
                    mascot.classList.remove('mascot-wiggle-active');
                }, 1200);
            }, 12000);
        }
    }
}

customElements.define('sahi-header', SahiHeader);
customElements.define('sahi-footer', SahiFooter);
customElements.define('sahi-lead-modal', SahiLeadModal);

class RoadmapLeadModal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div id="roadmapModal" class="modal">
        <div class="form-modal quiz-modal">
            <span class="close-modal" onclick="closeRoadmapForm()">&times;</span>
            <div class="form-wrapper">
                <!-- Loading Step -->
                <div id="roadmap-step-1" style="text-align: center;">
                    <h3><span class="gradient-text">Analyzing Profile...</span></h3>
                    <p>Matching your profile with top institutions...</p>
                    <div class="loader-bar-container mt-4">
                        <div class="loader-bar" id="roadmap-loader"></div>
                    </div>
                    <p class="mt-3 text-muted" id="rm-loader-text">Cross-referencing budget and score...</p>
                </div>

                <!-- Final Step -->
                <div id="roadmap-step-2" style="display:none;">
                    <h3><span class="text-green">Roadmap Ready!</span> 🗺️</h3>
                    <p>We've generated a personalized roadmap based on your exact profile. Enter your WhatsApp number to receive it instantly.</p>
                    <form id="roadmap-form" onsubmit="submitRoadmap(event)">
                        <input type="hidden" id="rm-hidden-stream" name="stream" value="">
                        <input type="hidden" id="rm-hidden-score" name="score" value="">
                        <input type="hidden" id="rm-hidden-budget" name="budget" value="">
                        <input type="hidden" id="rm-hidden-goal" name="goal" value="">
                        <input type="hidden" id="rm-hidden-location" name="location" value="">

                        <div class="form-group">
                            <input type="text" id="rmName" name="leadName" placeholder="Full Name" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="rmPhone" name="leadPhone" placeholder="WhatsApp Number" required>
                        </div>
                        <button type="submit" id="rmSubmitBtn" class="btn-primary w-100">Send My Free Roadmap <i class="fa-brands fa-whatsapp"></i></button>
                        <p id="rm-form-message" class="secure-note" style="display:none; color: green; font-weight:bold;">
                            Success! Your roadmap is on its way.</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('roadmap-lead-modal', RoadmapLeadModal);

class ExitIntentModal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div id="exitIntentModal" class="modal">
        <div class="form-modal exit-intent-modal-content">
            <span class="close-modal" onclick="closeExitIntentForm()">&times;</span>
            <div class="form-wrapper">
                <div class="exit-intent-header" style="text-align: center; margin-bottom: 20px;">
                    <span class="exit-intent-badge"><i class="fa-solid fa-gift"></i> Special Offer</span>
                    <h3 style="font-size: 1.8rem; margin: 15px 0 5px 0; font-family: 'Outfit'; line-height: 1.2;">Wait! Before You Leave...</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Get a Free <strong>Career Roadmap PDF</strong> to guide your education journey.</p>
                </div>
                <div class="exit-intent-body">
                    <div class="roadmap-preview-card">
                        <div class="roadmap-preview-icon">
                            <i class="fa-solid fa-file-pdf"></i>
                        </div>
                        <div class="roadmap-preview-text">
                            <strong>Complete Career Guide 2026</strong>
                            <span>Includes placement insights, budget planning, and transparent college comparisons.</span>
                        </div>
                    </div>
                    <form id="exit-intent-form" onsubmit="submitExitIntentForm(event)">
                        <div class="form-group">
                            <input type="text" id="exitName" name="leadName" placeholder="Full Name" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="exitPhone" name="leadPhone" placeholder="WhatsApp Number" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="exitEmail" name="email" placeholder="Email Address" required>
                        </div>
                        <button type="submit" id="exitSubmitBtn" class="btn-primary w-100" style="margin-top: 10px;">Get Free Roadmap PDF <i class="fa-solid fa-download"></i></button>
                        <p id="exit-form-message" class="secure-note" style="display:none; color: var(--accent); font-weight:bold;">
                            Success! PDF downloaded. Check WhatsApp for custom help.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('exit-intent-modal', ExitIntentModal);

class SahiLeadMagnets extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<section class="lead-magnets-section reveal" id="lead-magnets-hub">
    <div class="container">
        <div class="section-header">
            <h2>Free Expert-Curated <span class="gradient-text">Resource Center</span></h2>
            <p>Get instant access to research-backed decision tools designed for your specific journey.</p>
        </div>
        <div class="magnets-grid">
            <!-- Students -->
            <div class="magnet-card student-card">
                <div class="magnet-card-header">
                    <div class="magnet-card-icon"><i class="fa-solid fa-user-graduate"></i></div>
                    <h3>For Students</h3>
                    <p>Navigate your career options and compare top universities transparently.</p>
                </div>
                <div class="magnet-downloads">
                    <button class="btn-download" onclick="openMagnetForm('Career Planning Guide', 'Career_Planning_Guide.pdf')">
                        <i class="fa-solid fa-file-pdf font-red"></i>
                        <div class="download-text">
                            <strong>Career Planning Guide</strong>
                            <span>Step-by-step stream alignment roadmap</span>
                        </div>
                        <i class="fa-solid fa-circle-arrow-down dl-icon"></i>
                    </button>
                    <button class="btn-download" onclick="openMagnetForm('University Comparison PDF', 'University_Comparison_Guide.pdf')">
                        <i class="fa-solid fa-file-pdf font-red"></i>
                        <div class="download-text">
                            <strong>University Comparison PDF</strong>
                            <span>ROI vs Admission difficulty matrix</span>
                        </div>
                        <i class="fa-solid fa-circle-arrow-down dl-icon"></i>
                    </button>
                </div>
            </div>

            <!-- Professionals -->
            <div class="magnet-card professional-card">
                <div class="magnet-card-header">
                    <div class="magnet-card-icon"><i class="fa-solid fa-briefcase"></i></div>
                    <h3>For Professionals</h3>
                    <p>Evaluate career growth vectors and financial returns on your degree.</p>
                </div>
                <div class="magnet-downloads">
                    <button class="btn-download" onclick="openMagnetForm('MBA ROI Calculator', 'MBA_ROI_Calculator.pdf')">
                        <i class="fa-solid fa-calculator font-blue"></i>
                        <div class="download-text">
                            <strong>MBA ROI Calculator</strong>
                            <span>Calculate tuition offset & payback timeline</span>
                        </div>
                        <i class="fa-solid fa-circle-arrow-down dl-icon"></i>
                    </button>
                    <button class="btn-download" onclick="openMagnetForm('Salary Growth Guide', 'Salary_Growth_Guide.pdf')">
                        <i class="fa-solid fa-file-pdf font-red"></i>
                        <div class="download-text">
                            <strong>Salary Growth Guide</strong>
                            <span>Pre-MBA vs Post-MBA earning projection</span>
                        </div>
                        <i class="fa-solid fa-circle-arrow-down dl-icon"></i>
                    </button>
                </div>
            </div>

            <!-- Parents -->
            <div class="magnet-card parent-card">
                <div class="magnet-card-header">
                    <div class="magnet-card-icon"><i class="fa-solid fa-users"></i></div>
                    <h3>For Parents</h3>
                    <p>Make safe, financially stable, and verified admission choices.</p>
                </div>
                <div class="magnet-downloads">
                    <button class="btn-download" onclick="openMagnetForm('Career Decision Checklist', 'Career_Decision_Checklist.pdf')">
                        <i class="fa-solid fa-circle-check font-green"></i>
                        <div class="download-text">
                            <strong>Career Decision Checklist</strong>
                            <span>Evaluate safety, recognition, & funding options</span>
                        </div>
                        <i class="fa-solid fa-circle-arrow-down dl-icon"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<div id="magnetModal" class="modal">
    <div class="form-modal magnet-modal-content">
        <span class="close-modal" onclick="closeMagnetForm()">&times;</span>
        <div class="form-wrapper">
            <div class="magnet-header" style="text-align: center; margin-bottom: 20px;">
                <span class="magnet-badge"><i class="fa-solid fa-download"></i> Free Resource</span>
                <h3 id="magnetModalTitle" style="font-size: 1.6rem; margin: 15px 0 5px 0; font-family: 'Outfit';">Download Guide</h3>
                <p id="magnetModalSubtitle" style="color: var(--text-muted); font-size: 0.95rem;">Enter your details to receive the PDF instantly.</p>
            </div>
            <form id="magnet-form" onsubmit="submitMagnetForm(event)">
                <input type="hidden" id="magnetHiddenSource" name="stream" value="">
                <input type="hidden" id="magnetHiddenFile" value="">
                <div class="form-group">
                    <input type="text" id="magnetName" name="leadName" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" id="magnetPhone" name="leadPhone" placeholder="WhatsApp Number" required>
                </div>
                <div class="form-group">
                    <input type="email" id="magnetEmail" name="email" placeholder="Email Address" required>
                </div>
                <button type="submit" id="magnetSubmitBtn" class="btn-primary w-100" style="margin-top: 10px;">Download Now <i class="fa-solid fa-download"></i></button>
                <p id="magnet-form-message" class="secure-note" style="display:none; color: var(--accent); font-weight:bold;">
                    Success! Preparing your download...
                </p>
            </form>
        </div>
    </div>
</div>
        `;
    }
}

customElements.define('sahi-lead-magnets', SahiLeadMagnets);

class UrgencyAlertWidget extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div id="urgencyAlertWidget" class="urgency-widget-card" style="display: none;">
        <button class="urgency-widget-close" onclick="dismissUrgencyWidget(event)">&times;</button>
        <div class="urgency-widget-content">
            <!-- Message 1 -->
            <div class="urgency-message active" id="urgency-msg-1">
                <div class="urgency-icon icon-red"><i class="fa-solid fa-hourglass-half"></i></div>
                <div class="urgency-text">
                    <strong>Admissions Closing</strong>
                    <span>June 30 deadline for upcoming intake.</span>
                </div>
            </div>
            <!-- Message 2 -->
            <div class="urgency-message" id="urgency-msg-2" style="display: none;">
                <div class="urgency-icon icon-orange"><i class="fa-solid fa-circle-exclamation"></i></div>
                <div class="urgency-text">
                    <strong>Limited Seats Available</strong>
                    <span>Only 5 counseling slots left today.</span>
                </div>
            </div>
            <!-- Message 3 -->
            <div class="urgency-message" id="urgency-msg-3" style="display: none;">
                <div class="urgency-icon icon-green"><i class="fa-solid fa-award"></i></div>
                <div class="urgency-text">
                    <strong>Scholarships Active</strong>
                    <span>Applications for up to 100% funding open.</span>
                </div>
            </div>
        </div>
        <div class="urgency-widget-progress-bar">
            <div class="urgency-widget-progress" id="urgencyProgress"></div>
        </div>
    </div>
        `;
    }
}

customElements.define('urgency-alert-widget', UrgencyAlertWidget);


