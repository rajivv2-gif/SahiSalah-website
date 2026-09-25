window.particlesJS = function(tag_id, params) {
    const container = document.getElementById(tag_id);
    if (!container) return;

    // Remove old contents if any
    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // let clicks pass through
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    let mouseX = -1000;
    let mouseY = -1000;

    const particles = [];
    const particleCount = 80;

    function resize() {
        let rect = container.getBoundingClientRect();
        width = rect.width || container.clientWidth || window.innerWidth;
        height = rect.height || container.clientHeight || window.innerHeight;
        
        if (height === 0) height = container.parentElement ? container.parentElement.clientHeight : window.innerHeight;
        if (width === 0) width = container.parentElement ? container.parentElement.clientWidth : window.innerWidth;

        canvas.width = width;
        canvas.height = height;
        
        // Only initialize particles once or when screen size increases drastically
        if (particles.length === 0) {
            initParticles();
        }
    }

    function initParticles() {
        particles.length = 0;
        // Generate particles based on screen size density
        const density = Math.floor((width * height) / 15000);
        const count = Math.min(Math.max(density, 40), 120);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1, // Increased radius from (0.5 - 2.0) to (1.0 - 3.0)
                color: Math.random() > 0.7 ? '#8b5cf6' : '#2563eb' // Changed to a slightly darker blue (#2563eb) for better contrast
            });
        }
    }

    window.addEventListener('resize', resize);
    
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
            if (canvas.width === 0 || canvas.height === 0) resize();
        });
        ro.observe(container);
    }
    
    resize();

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    function render() {
        ctx.clearRect(0, 0, width, height);

        const mouseRadius = 250; // Distance mouse affects particles
        const linkRadius = 100;  // Distance particles connect to each other

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Distance to mouse
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);

            // Base opacity is higher now, increases significantly when mouse is near
            let opacity = 0.35; // Increased base opacity from 0.1 to 0.35
            if (distToMouse < mouseRadius) {
                opacity = 0.35 + (0.65 * (1 - distToMouse / mouseRadius)); // Scales up to 1.0
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = opacity;
            ctx.fill();

            // Connect to nearby particles
            // Allow faint connections even without mouse, and strong connections near mouse
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const distBetween = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (distBetween < linkRadius) {
                    // Lines are visible if they are close, and get a huge boost from mouse proximity
                    let lineOpacity = (1 - distBetween / linkRadius) * 0.4; // Base line opacity 0.4
                    
                    if (distToMouse < mouseRadius) {
                        lineOpacity += (1 - distToMouse / mouseRadius) * 0.6; // Boost up to +0.6
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = Math.min(lineOpacity, 1.0);
                    ctx.lineWidth = 1.2; // Thicker lines
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(render);
    }
    
    render();
};
