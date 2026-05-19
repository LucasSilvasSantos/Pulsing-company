/* global React, ReactDOM, TweaksPanel, TweakSection, TweakSlider, TweakToggle */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================ */
/* Hooks                                                         */
/* ============================================================ */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useInView(opts = { threshold: 0.35 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, isVisible, duration = 1800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, isVisible, duration]);
  return v;
}

/* ============================================================ */
/* Icons                                                         */
/* ============================================================ */

const I = {
  Arrow: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  ArrowUR: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>),
  Check: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>),
  // Platform icons (Omni-style abstract glyphs)
  Orchestration: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="4" r="1.6" />
      <circle cx="20" cy="4" r="1.6" />
      <circle cx="4" cy="20" r="1.6" />
      <circle cx="20" cy="20" r="1.6" />
      <path d="M5.2 5.2L10 10M18.8 5.2L14 10M5.2 18.8L10 14M18.8 18.8L14 14" opacity="0.7" />
    </svg>
  ),
  Production: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="6" height="12" rx="1" />
      <rect x="11" y="3" width="6" height="15" rx="1" opacity="0.8" />
      <rect x="19" y="9" width="2.5" height="9" rx="1" opacity="0.5" />
      <path d="M3 21h18" opacity="0.5" />
    </svg>
  ),
  Predictive: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18l5-5 4 3 7-8" />
      <circle cx="3" cy="18" r="1.4" fill="currentColor" />
      <circle cx="8" cy="13" r="1.4" fill="currentColor" />
      <circle cx="12" cy="16" r="1.4" fill="currentColor" />
      <circle cx="19" cy="8" r="1.4" fill="currentColor" />
      <path d="M16 5h5v5" opacity="0.7" />
    </svg>
  ),
  Backbone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v14c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" opacity="0.6" />
    </svg>
  ),
  Outcome: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" opacity="0.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" opacity="0.5" />
    </svg>
  ),
  Localized: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 3 4 5.6 4 9s-1.5 6-4 9c-2.5-3-4-5.6-4-9s1.5-6 4-9z" opacity="0.8" />
    </svg>
  ),
  // Socials
  IG: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>),
  IN: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.45 4.46-2.45C21.4 7.75 22 10.5 22 14.05V24h-5v-8.84c0-2.1-.04-4.8-2.93-4.8-2.93 0-3.38 2.29-3.38 4.65V24h-5V8z"/></svg>),
  X: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>),
  YT: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>),
  Whats: () => (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>),
  ScrollDown: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>),
};

/* ============================================================ */
/* Hero canvas — particle field                                  */
/* ============================================================ */

function HeroCanvas({ density = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, w, h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const N = Math.floor(80 * density);
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.3,
      hue: Math.random() < 0.25 ? 'red' : 'white',
      a: Math.random() * 0.6 + 0.2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      // Connections
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = dx*dx + dy*dy;
          if (d < 14000) {
            const alpha = (1 - d / 14000) * 0.18;
            const col = (p.hue === 'red' || q.hue === 'red') ? `rgba(255, 60, 60, ${alpha})` : `rgba(255,255,255,${alpha * 0.6})`;
            ctx.strokeStyle = col;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle = p.hue === 'red' ? `rgba(255,30,30,${p.a})` : `rgba(255,255,255,${p.a * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [density]);
  return <canvas ref={ref} />;
}

/* ============================================================ */
/* Nav                                                           */
/* ============================================================ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Sobre', '#capabilities'],
    ['Plataforma', '#platform'],
    ['Crescimento', '#growth'],
    ['Cases', '#news'],
    ['Contato', '#connected'],
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href="#top">
          <span className="mark"><span /></span>
          <span>Pulsing</span>
        </a>
        <div className="nav-links">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </div>
        <a href="#connected" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
          Fale com a gente
          <span className="btn-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </a>
      </div>
    </nav>
  );
}

/* ============================================================ */
/* Hero                                                          */
/* ============================================================ */

function Hero({ showWordmark, particleDensity }) {
  const capabilities = ['Tráfego Pago', 'Branding', 'Social Media', 'SEO', 'Criação de Sites', 'Automação', 'Conteúdo', 'Analytics'];

  return (
    <section id="top" className="hero">
      <div className="hero-bg">
        <HeroCanvas density={particleDensity} />
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />
        <img src="assets/laptop.webp" alt="" className="coins-bg" aria-hidden="true" />
        <div className="grain" />
        <div className="vignette" />
      </div>

      {showWordmark && <div className="wordmark" aria-hidden="true">PULSING</div>}

      <div className="hero-content">
        <div className="reveal eyebrow" style={{ '--d': '0ms' }}>
          <span>Pulsing · Performance &amp; Branding</span>
        </div>
        <h1 className="reveal" style={{ '--d': '120ms' }}>
          A agência de <em>marketing</em> e <em className="accent">performance</em> construída para o próximo ciclo.
        </h1>
        <p className="sub reveal" style={{ '--d': '240ms' }}>
          Estratégia, mídia, dado e tecnologia em uma única operação — para marcas que decidiram
          transformar presença digital em crescimento real e mensurável.
        </p>
        <div className="reveal" style={{ '--d': '360ms', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#connected" className="btn btn-primary">
            Solicitar orçamento
            <span className="btn-arrow"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </a>
          <a href="#news" className="btn btn-ghost">Ver cases</a>
        </div>
      </div>

      <div className="cap-row reveal" style={{ '--d': '520ms' }}>
        {capabilities.map((c) => (
          <a href="#platform" key={c} className="cap-pill">{c}</a>
        ))}
      </div>

      <div className="hero-meta">
        <div className="live"><span className="dot" /> <span>Operação ativa · 2026</span></div>
        <div className="scroll"><span>Role para baixo</span> <I.ScrollDown /></div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Connected Capabilities                                        */
/* ============================================================ */

function ConnectedCapabilities() {
  const caps = [
    'Tráfego Pago', 'Branding',
    'Social Media', 'SEO Técnico',
    'Criação de Sites', 'Automação',
    'Conteúdo', 'Analytics',
  ];
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 14 }}>Capacidades conectadas</div>
        <h2 className="section-head h2 reveal" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 64px', maxWidth: 880, textWrap: 'balance' }}>
          Uma vantagem competitiva em <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>cada dimensão</em> do marketing moderno.
        </h2>

        <div className="showcase">
          <div className="showcase-art reveal">
            <div className="badge">
              <span className="dot" /> Plataforma · Live
            </div>
            <div className="corner-label">
              Velocity
              <span className="v">+4.8×</span>
            </div>
            <img src="assets/laptop.webp" alt="Dashboard de performance — Pulsing" className="coin" />
            <div className="num">01</div>
          </div>

          <div className="showcase-text reveal" style={{ '--d': '120ms' }}>
            <div>
              <div className="eyebrow no-dot" style={{ marginBottom: 14 }}>Operação integrada</div>
              <h3>Estratégia, mídia, dado e tecnologia <em>em um único squad.</em></h3>
              <p>
                Não somos uma agência tradicional. Operamos como um time integrado de estratégia, mídia, conteúdo e dado —
                acoplado ao seu negócio, com tese clara, decisões rápidas e prova mensurável.
              </p>
              <p>
                Portfólio enxuto, atendimento sênior direto, ciclos curtos de iteração e acompanhamento próximo da operação real.
              </p>
            </div>

            <div className="cap-list">
              {caps.map((c) => (
                <a key={c} href="#platform">
                  <span>{c}</span>
                  <span className="arr"><I.ArrowUR /></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Pulse Intelligence (Omni-style grid)                          */
/* ============================================================ */

function PulseIntelligence() {
  const cells = [
    { icon: <I.Orchestration />, title: 'Orquestração Central', desc: 'Um único fluxo unificado, do briefing à entrega.' },
    { icon: <I.Production />, title: 'Produção em Escala', desc: 'Conteúdo personalizado com alcance incomparável.' },
    { icon: <I.Predictive />, title: 'Inteligência Preditiva', desc: 'Antecipa o que vem a seguir — antes da concorrência.' },
    { icon: <I.Backbone />, title: 'Backbone Unificado de Dados', desc: 'Uma única fonte de verdade. Clareza para cada decisão.' },
    { icon: <I.Outcome />, title: 'Ativação Orientada a Resultado', desc: 'Investimento em mídia conectado a resultados de negócio.' },
    { icon: <I.Localized />, title: 'Otimização Localizada', desc: 'Escala global. Precisão local.' },
  ];

  return (
    <section className="section" id="platform">
      <div className="container">
        <div className="platform-wrap reveal">
          <div className="platform-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Pulse Intelligence</div>
              <h2>
                A plataforma de <em>inteligência</em> de marketing da Pulsing.
              </h2>
            </div>
            <p>
              Pulse une criatividade, mídia, dado e IA para que marcas cresçam com mais clareza,
              velocidade e impacto mensurável na era da influência.
            </p>
          </div>

          <div className="platform-grid">
            {cells.map((c, i) => (
              <div key={c.title} className="platform-cell reveal" style={{ '--d': `${i * 60}ms` }}>
                <div className="platform-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p className="desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Sustained Growth (Investor)                                   */
/* ============================================================ */

function GrowthStat({ value, suffix = '', prefix = '', decimals = 0, label }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const v = useCountUp(value, inView);
  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v);
  return (
    <div ref={ref} className="growth-stat reveal">
      <div className="v">
        {prefix && <span className="small">{prefix}</span>}
        <span>{display}</span>
        {suffix && <span className="unit">{suffix}</span>}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}

function SustainedGrowth() {
  return (
    <section className="section" id="growth">
      <div className="container">
        <div className="growth-wrap">
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom: 14 }}>Track record · Pulsing™</div>
            <h2 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 24px', textWrap: 'balance' }}>
              Um histórico de crescimento <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>sustentado.</em>
            </h2>
            <p style={{ color: 'var(--fg-3)', fontSize: 17, lineHeight: 1.6, margin: '0 0 32px', maxWidth: 460 }}>
              Pulsing estabelece o padrão de liderança em performance e branding —
              construindo marcas mais fortes e entregando resultados auditáveis, ano após ano.
            </p>
            <a href="#news" className="btn-link">
              Ver cases completos <I.ArrowUR />
            </a>
          </div>

          <div className="growth-stats reveal" style={{ '--d': '120ms' }}>
            <GrowthStat value={312} suffix="%" label="ROAS médio em contas geridas" />
            <GrowthStat value={48} label="Marcas ativas na operação" />
            <GrowthStat value={127} prefix="R$" suffix="M" label="Em mídia gerida nos últimos 12 meses" />
            <GrowthStat value={4} decimals={1} suffix="×" label="Velocidade média de execução vs. mercado" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* News / Cases                                                  */
/* ============================================================ */

function ChartUp() {
  return (
    <svg className="chart-card" viewBox="0 0 100 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,30,30,.4)" />
          <stop offset="100%" stopColor="rgba(255,30,30,0)" />
        </linearGradient>
      </defs>
      <path d="M0 50 L18 46 L34 40 L50 30 L68 18 L86 10 L100 4 L100 60 L0 60 Z" fill="url(#gu)" />
      <path d="M0 50 L18 46 L34 40 L50 30 L68 18 L86 10 L100 4" fill="none" stroke="#ff3030" strokeWidth="1.2" />
    </svg>
  );
}
function ChartBars() {
  const bars = [22, 30, 28, 42, 38, 56, 64, 60, 78, 72, 90, 86];
  return (
    <svg className="chart-card" viewBox="0 0 100 60" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect key={i}
          x={i * 8 + 2} y={60 - h * 0.6}
          width={5.5} height={h * 0.6}
          fill={i > 7 ? '#ff3030' : 'rgba(255,255,255,0.25)'}
          rx="1" />
      ))}
    </svg>
  );
}
function ChartRise() {
  return (
    <svg className="chart-card" viewBox="0 0 100 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,30,30,.45)" />
          <stop offset="100%" stopColor="rgba(255,30,30,0)" />
        </linearGradient>
      </defs>
      <path d="M0 56 L20 52 L36 48 L52 38 L68 22 L100 4 L100 60 L0 60 Z" fill="url(#gr)" />
      <path d="M0 56 L20 52 L36 48 L52 38 L68 22 L100 4" fill="none" stroke="#ff3030" strokeWidth="1.2" />
      <circle cx="100" cy="4" r="3" fill="#ff3030" />
    </svg>
  );
}

function News() {
  const items = [
    {
      date: '14 Maio · 2026',
      cat: 'E-commerce · Moda',
      title: 'Aurea Atelier escala 4,2× a receita em 8 meses de operação.',
      excerpt: 'Reposicionamento de marca + reestruturação de mídia paga em 4 canais. Operação saiu de mídia reativa para um plano com tese e prova.',
      delta: '+418% receita',
      chart: <ChartRise />,
    },
    {
      date: '07 Maio · 2026',
      cat: 'SaaS B2B',
      title: 'Nodal Systems multiplica MQLs com funil orientado a intent.',
      excerpt: 'Conteúdo de autoridade + SEO técnico + automação de nutrição. Em 6 meses, leads qualificados saltaram mais de 6×.',
      delta: '+612% leads',
      chart: <ChartBars />,
    },
    {
      date: '28 Abril · 2026',
      cat: 'Health · Clínica',
      title: 'Vertice Clínico corta CAC em 67% e dobra a base de pacientes.',
      excerpt: 'Funil de consulta otimizado, mídia regionalizada e atribuição multitouch. Operação enxuta com time sênior dedicado.',
      delta: '−67% CAC',
      chart: <ChartUp />,
    },
  ];
  return (
    <section className="section" id="news">
      <div className="container">
        <div className="section-head reveal" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', maxWidth: '100%', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Cases · O que está acontecendo</div>
            <h2 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '8px 0 0', textWrap: 'balance' }}>
              Operações reais. <em style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>Métricas reais.</em>
            </h2>
          </div>
          <a href="#" className="btn-link">Ver todos os cases <I.ArrowUR /></a>
        </div>

        <div className="news-grid">
          {items.map((n, i) => (
            <article key={i} className="news-card reveal" style={{ '--d': `${i * 80}ms` }}>
              <div className="art">
                <div className="delta">{n.delta}</div>
                <div className="art-content">{n.chart}</div>
              </div>
              <div className="news-meta">
                <div className="news-date">{n.date} · {n.cat}</div>
                <h3>{n.title}</h3>
                <p className="excerpt">{n.excerpt}</p>
                <div className="read">Ler case completo <I.Arrow /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* CTA Final                                                     */
/* ============================================================ */

function CTAFinal() {
  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="cta-final reveal">
          <div className="eyebrow" style={{ position: 'relative', marginBottom: 22 }}>Próximo passo</div>
          <h2>Sua marca está pronta para <em>pulsar?</em></h2>
          <p>
            Diagnóstico gratuito de 30 minutos. Sem pitch, sem proposta forçada — só análise honesta
            do seu cenário atual e do que faria sentido nos próximos 90 dias.
          </p>
          <div className="ctas">
            <a href="#connected" className="btn btn-primary">
              Solicitar diagnóstico
              <span className="btn-arrow"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </a>
            <a href="#news" className="btn btn-ghost">Ver cases primeiro</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Stay Connected (footer/contact merged)                        */
/* ============================================================ */

function StayConnected({ onToast }) {
  const [email, setEmail] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^@]+@[^@.]+\.[^@]+$/.test(email)) {
      onToast('E-mail inválido. Tente novamente.');
      return;
    }
    setEmail('');
    onToast('Recebido. Retornamos em até 24h úteis.');
  };

  return (
    <section className="connected" id="connected">
      <div className="container" style={{ maxWidth: 'var(--max)' }}>
        <h2 className="reveal">Vamos <em>conversar</em>.</h2>

        <div className="connected-grid">
          <div className="col reveal">
            <h4>Nova conta</h4>
            <span className="sub">Conte em uma linha o que você precisa resolver. Respondemos em até 24h úteis.</span>
            <form className="connected-form" onSubmit={submit}>
              <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit">Enviar <I.Arrow /></button>
            </form>
          </div>

          <div className="col reveal" style={{ '--d': '60ms' }}>
            <h4>Contato</h4>
            <a href="mailto:hello@pulsing.co">hello@pulsing.co</a>
            <a href="mailto:novosnegocios@pulsing.co">novosnegocios@pulsing.co</a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onToast('Abrindo WhatsApp…'); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)' }}
            >
              WhatsApp <I.ArrowUR />
            </a>
          </div>

          <div className="col reveal" style={{ '--d': '120ms' }}>
            <h4>Operação</h4>
            <span>Brasil · remoto</span>
            <span style={{ color: 'var(--fg-2)' }}>Seg–Sex · 09h–19h BRT</span>
            <span style={{ color: 'var(--fg-2)' }}>SLA · 24h úteis</span>
          </div>

          <div className="col reveal" style={{ '--d': '180ms' }}>
            <h4>Siga a Pulsing</h4>
            <div className="socials">
              <a href="#" aria-label="Instagram"><I.IG /></a>
              <a href="#" aria-label="LinkedIn"><I.IN /></a>
              <a href="#" aria-label="X"><I.X /></a>
              <a href="#" aria-label="YouTube"><I.YT /></a>
              <a href="#" aria-label="WhatsApp" onClick={(e) => { e.preventDefault(); onToast('Abrindo WhatsApp…'); }}><I.Whats /></a>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <a className="brand" href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #050505 70%)', border: '1px solid rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px rgba(255,26,26,0.9)' }} />
            </span>
            Pulsing™ · 2026
          </a>
          <div className="meta">Marketing que pulsa resultados</div>
          <div className="links">
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Toast                                                         */
/* ============================================================ */

function Toast({ msg, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      <div className="ico"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M4 12l5 5L20 6"/></svg></div>
      <span>{msg}</span>
    </div>
  );
}

/* ============================================================ */
/* App                                                           */
/* ============================================================ */

function App() {
  useReveal();
  const defaults = window.PULSING_TWEAKS_DEFAULTS;
  const [t, setT] = useState(defaults);
  const [toast, setToast] = useState({ msg: '', show: false });

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast((s) => ({ ...s, show: false })), 3000);
  }, []);

  const setTweak = useCallback((keyOrObj, value) => {
    const edits = typeof keyOrObj === 'object' ? keyOrObj : { [keyOrObj]: value };
    setT((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const h = t.accentHue;
    const sat = 0.27;
    const light = 0.62;
    const hRad = h * Math.PI / 180;
    const a = sat * Math.cos(hRad);
    const b = sat * Math.sin(hRad);
    const l = light;
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
    const L = l_ * l_ * l_;
    const M = m_ * m_ * m_;
    const S = s_ * s_ * s_;
    const r =  4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
    const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
    const bb = -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S;
    const toS = (x) => {
      x = Math.max(0, Math.min(1, x));
      return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1/2.4) - 0.055;
    };
    const R = Math.round(toS(r) * 255);
    const G = Math.round(toS(g) * 255);
    const B = Math.round(toS(bb) * 255);
    root.style.setProperty('--accent', `rgb(${R}, ${G}, ${B})`);
    root.style.setProperty('--accent-glow', `${R}, ${G}, ${B}`);
    root.style.setProperty('--glow-strength', t.glowIntensity);
  }, [t.accentHue, t.glowIntensity]);

  return (
    <>
      <Nav />
      <Hero showWordmark={t.showWordmark} particleDensity={t.particleDensity} />
      <ConnectedCapabilities />
      <PulseIntelligence />
      <SustainedGrowth />
      <News />
      <CTAFinal />
      <StayConnected onToast={showToast} />

      <Toast msg={toast.msg} show={toast.show} />

      <TweaksPanel title="Tweaks · Pulsing">
        <TweakSection label="Aparência">
          <TweakSlider
            label="Matiz do acento"
            value={t.accentHue}
            min={0} max={360} step={1}
            onChange={(v) => setTweak('accentHue', v)}
            unit="°"
          />
          <TweakSlider
            label="Intensidade do glow"
            value={t.glowIntensity}
            min={0} max={1.2} step={0.05}
            onChange={(v) => setTweak('glowIntensity', v)}
          />
        </TweakSection>
        <TweakSection label="Hero">
          <TweakToggle
            label="Wordmark gigante"
            value={t.showWordmark}
            onChange={(v) => setTweak('showWordmark', v)}
          />
          <TweakSlider
            label="Densidade de partículas"
            value={t.particleDensity}
            min={0} max={2} step={0.1}
            onChange={(v) => setTweak('particleDensity', v)}
            unit="×"
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
