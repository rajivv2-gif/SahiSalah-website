// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // Live UI Update for Budget Slider
    const budgetSlider = document.getElementById('calc-budget');
    const budgetVal = document.getElementById('budget-val');

    budgetSlider.addEventListener('input', function () {
        budgetVal.innerHTML = `₹ ${this.value} Lacs`;
    });

    // 1. Interactive Custom Typewriter Effect
    const texts = ["India vs UK?", "India vs Germany?", "Canada vs USA?", "India & Abroad?"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    const typewriterElement = document.getElementById('typewriter');

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typewriterElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // pause at the end
        } else {
            setTimeout(type, 100);
        }
    }());

    // 2. Scroll Reveal Animations (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const exposeElements = () => {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', exposeElements);
    exposeElements(); // Trigger on load

    // 3. Floating Particles Background Configuration
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#f97316" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#3b82f6", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});

// Modal Control Functions
const videoModal = document.getElementById('videoModal');
const ytIframe = document.getElementById('yt-iframe');

function openModal(videoUrl) {
    if (videoModal && ytIframe) {
        videoModal.style.display = 'block';
        ytIframe.src = videoUrl;
    }
}

function closeModal() {
    if (videoModal && ytIframe) {
        videoModal.style.display = 'none';
        ytIframe.src = ''; // Stops the video
    }
}

window.onclick = function (event) {
    if (event.target == videoModal) {
        closeModal();
    }
}

// Banner Control
function closeBanner() {
    const banner = document.getElementById('announcement-banner');
    if (banner) {
        banner.style.display = 'none';
    }
}

// Calculate ROI Function
function calculateROI() {
    // Get values
    const degree = document.getElementById('calc-degree').value;
    const field = document.getElementById('calc-field').value;
    const budget = parseInt(document.getElementById('calc-budget').value, 10);

    // UI Elements
    const resultsCard = document.getElementById('calc-results');
    const waitingCard = document.getElementById('calc-waiting');

    // Data Placeholders
    let targetCountry = "";
    let targetDesc = "";
    let totalCost = 0;
    let expectedSalary = 0;
    let roiTimeline = "";
    let loanNeeded = 0;

    // Core Logic Based on Indian Middle Class Budgeting Realities
    if (budget <= 12) {
        // Low budget - Push for EU / Public Unis
        targetCountry = "🇩🇪 Germany or 🇮🇹 Italy (Public Uni)";
        targetDesc = "Focus on 100% tuition fee waivers. You only need to show blocked accounts for living expenses.";
        totalCost = degree === 'masters' ? 11 : 14;
        expectedSalary = 45; // Lacs INR equivalent
        roiTimeline = "approx 1.5 years";
    } else if (budget > 12 && budget <= 30) {
        // Mid Budget - UK / Ireland / France
        targetCountry = "🇬🇧 UK or 🇮🇪 Ireland";
        targetDesc = "Excellent 1-year Master's programs limiting living costs, with 2-year post-study work rights.";
        totalCost = degree === 'masters' ? 25 : 45;
        expectedSalary = 40;
        roiTimeline = "approx 2 to 2.5 years";
    } else {
        // High Budget - US / Australia / Canada
        targetCountry = "🇺🇸 USA or 🇦🇺 Australia";
        targetDesc = "Premium destinations with high upfront costs but massive STEM graduate salaries and OPT extensions.";
        totalCost = degree === 'masters' ? 45 : 80;
        expectedSalary = 75;
        roiTimeline = "approx 3 years";
    }

    // STEM vs Arts adjustments
    if (field === 'arts' || field === 'business') {
        expectedSalary *= 0.8; // Reduce salary expectation slightly
        roiTimeline = budget <= 12 ? "approx 2 years" : "approx 3.5 years";
    }

    // Loan Calculation
    loanNeeded = totalCost - budget;
    if (loanNeeded < 0) loanNeeded = 0;

    // Inject into UI
    document.getElementById('result-country').innerText = targetCountry;
    document.getElementById('result-country-desc').innerText = targetDesc;

    // Animate numbers (simple instantaneous update for now)
    document.getElementById('result-cost').innerText = `₹ ${totalCost} Lacs`;
    document.getElementById('result-loan').innerText = loanNeeded > 0 ? `₹ ${loanNeeded} Lacs` : `None needed! 🎉`;
    document.getElementById('result-roi-text').innerHTML = `At an expected starting salary of <strong>₹${expectedSalary}L/yr</strong>, it will take you <strong>${roiTimeline}</strong> to recover your investment.`;

    // Toggle UI State with a slight delay for dramatic effect
    waitingCard.innerHTML = `<div class="waiting-icon"><i class="fa-solid fa-spinner fa-spin"></i></div><h3>Analyzing data...</h3>`;

    setTimeout(() => {
        waitingCard.style.display = 'none';
        resultsCard.style.display = 'block';

        // Ensure standard waiting card text is reset if they calculate again
        waitingCard.innerHTML = `<div class="waiting-icon"><i class="fa-solid fa-calculator"></i></div><h3>Enter details to see your magic roadmap!</h3>`;
    }, 800);
}

// --- ROADMAP TIMELINE LOGIC ---
window.addEventListener('scroll', () => {
    const container = document.querySelector('.timeline-container');
    if (!container) return;

    const progress = document.getElementById('timelineProgress');
    const dots = document.querySelectorAll('.timeline-dot');

    // Get container dimensions relative to viewport
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top;
    const containerHeight = rect.height;

    // Trigger point: when the top of the container hits the middle of the screen
    const windowH = window.innerHeight;
    const triggerPoint = windowH / 2;

    // Calculate how far we've scrolled past the trigger point
    let scrollPercentage = 0;

    if (containerTop < triggerPoint) {
        let pixelsPast = triggerPoint - containerTop;
        scrollPercentage = (pixelsPast / containerHeight) * 100;
    }

    // Clamp between 0 and 100
    scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));
    progress.style.height = scrollPercentage + '%';

    // Make dots glow when the line reaches them
    dots.forEach(dot => {
        const dotTop = dot.offsetTop;
        const linePixelHeight = (scrollPercentage / 100) * containerHeight;

        if (linePixelHeight >= dotTop - 10) { // Small buffer for smoother visual activation
            dot.classList.add('glow');
        } else {
            dot.classList.remove('glow');
        }
    });
});
