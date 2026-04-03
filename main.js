// ─── 3D PARTICLE CANVAS ───
    (function(){
        const canvas = document.getElementById('hero-canvas');
        const ctx = canvas.getContext('2d');
        let W, H, particles = [], mouse = { x: W/2, y: H/2 };
        const COUNT = 90;

        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        });

        class Particle {
            constructor() { this.reset(true); }
            reset(init) {
                this.x = Math.random() * (W||window.innerWidth);
                this.y = init ? Math.random() * (H||window.innerHeight) : (H||window.innerHeight) + 10;
                this.z = Math.random() * 1.4 + 0.2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = -Math.random() * 0.4 - 0.1;
                this.life = 0;
                this.maxLife = Math.random() * 300 + 200;
                this.size = Math.random() * 2.2 * this.z + 0.5;
                this.r = Math.random() < 0.3 ? 255 : Math.random() * 60;
                this.g = Math.random() < 0.3 ? (Math.random()*30|0) : Math.random() * 60;
                this.b = Math.random() < 0.3 ? (Math.random()*30|0) : Math.random() * 80;
                this.connectable = Math.random() > 0.5;
            }
            update() {
                this.life++;
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx*dx+dy*dy);
                if (dist < 160) {
                    this.x += dx * 0.008;
                    this.y += dy * 0.008;
                } else {
                    this.x += this.vx;
                    this.y += this.vy;
                }
                if (this.life > this.maxLife || this.y < -20) this.reset(false);
            }
            draw() {
                const alpha = Math.min(this.life/40, 1) * Math.min((this.maxLife-this.life)/40,1);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
                ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${alpha * 0.85})`;
                ctx.fill();
            }
        }

        for(let i=0;i<COUNT;i++) particles.push(new Particle());

        function drawConnections() {
            const connParts = particles.filter(p=>p.connectable);
            for(let i=0;i<connParts.length;i++){
                for(let j=i+1;j<connParts.length;j++){
                    const dx = connParts[i].x - connParts[j].x;
                    const dy = connParts[i].y - connParts[j].y;
                    const d = Math.sqrt(dx*dx+dy*dy);
                    if(d<120){
                        const a = (1 - d/120) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(connParts[i].x, connParts[i].y);
                        ctx.lineTo(connParts[j].x, connParts[j].y);
                        ctx.strokeStyle = `rgba(255,26,26,${a})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        // Central glow
        function drawGlow() {
            const grd = ctx.createRadialGradient(W/2, H*0.55, 0, W/2, H*0.55, W*0.45);
            grd.addColorStop(0, 'rgba(255,26,26,0.12)');
            grd.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grd;
            ctx.fillRect(0,0,W,H);
        }

        function loop() {
            ctx.clearRect(0,0,W,H);
            drawGlow();
            drawConnections();
            particles.forEach(p=>{ p.update(); p.draw(); });
            requestAnimationFrame(loop);
        }
        loop();
    })();

    // ─── SCROLL REVEAL ───
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));

    // ─── NUMBER COUNTER ───
    const numEls = document.querySelectorAll('.number-item h3[data-target]');
    const numObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting && !e.target.dataset.done) {
                e.target.dataset.done = true;
                const target = +e.target.dataset.target;
                const suffix = e.target.dataset.suffix;
                let curr = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    curr = Math.min(curr + step, target);
                    e.target.textContent = curr + suffix;
                    if(curr >= target) clearInterval(timer);
                }, 20);
            }
        });
    }, { threshold: 0.5 });
    numEls.forEach(el => numObs.observe(el));

    // ─── SMOOTH SCROLL ───
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if(target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });