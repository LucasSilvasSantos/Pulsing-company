/* global React, ReactDOM, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakColor */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

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

function useCountUp(target, isVisible, duration = 1600) {
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

function useInView(opts = { threshold: 0.3 }) {
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

/* ============================================================ */
/* Icons (original line icons)                                   */
/* ============================================================ */

const I = {
  Ads: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L21 4v16L3 12z" />
      <path d="M7 12v5l4 1" />
      <circle cx="3" cy="12" r="0.5" fill="currentColor" />
    </svg>
  ),
  Social: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7l8 0M16 8L13 16M8 8l3 8" />
    </svg>
  ),
  Brand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" opacity="0.4" />
    </svg>
  ),
  Seo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5L20 20" />
      <path d="M7 10h6M10 7v6" opacity="0.5" />
    </svg>
  ),
  Site: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="6.5" r="0.5" fill="currentColor" />
      <path d="M7 13l-2 2 2 2M11 13l-2 2 2 2M15 13l2 2-2 2" opacity="0.6" />
    </svg>
  ),
  Auto: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h8M6 8v8M18 8v8M8 18h8" />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowUR: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5L20 6" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3 7 7 .8-5.3 4.8 1.7 7L12 17.8 5.6 21.6l1.7-7L2 9.8 9 9z" />
    </svg>
  ),
  Whats: () => (
    <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
  ),
  IG: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  IN: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.45 4.46-2.45C21.4 7.75 22 10.5 22 14.05V24h-5v-8.84c0-2.1-.04-4.8-2.93-4.8-2.93 0-3.38 2.29-3.38 4.65V24h-5V8z"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  YT: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M3 7l9 6 9-6"/>
    </svg>
  ),
  Pin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
};

/* ============================================================ */
/* Section: Nav                                                  */
/* ============================================================ */

function Nav() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Serviços', '#services'],
    ['Diferenciais', '#diff'],
    ['Cases', '#cases'],
    ['Depoimentos', '#testi'],
    ['Contato', '#contact'],
  ];

  return (
    <nav className="nav" style={{ transform: hidden ? 'translate(-50%, -120%)' : 'translate(-50%, 0)' }}>
      <a className="brand" href="#top">
        <span className="mark"><span /></span>
        <span>Pulsing</span>
      </a>
      <div className="nav-links">
        {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
      </div>
      <a href="#contact" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
        Fale com a gente
        <span className="btn-arrow"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>
    </nav>
  );
}

/* ============================================================ */
/* Section: Hero                                                  */
/* ============================================================ */

function Hero({ headlineVariant }) {
  const stageRef = useRef(null);
  const coinsRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const coins = coinsRef.current;
    if (!stage || !coins) return;
    let rx = 0, ry = 0, tx = 0, ty = 0;
    let raf;
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      tx = dx * 14;
      ty = dy * 14;
      rx = -dy * 14;
      ry = dx * 14;
    };
    const tick = () => {
      coins.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}px, ${ty}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const [statsRef, statsInView] = useInView({ threshold: 0.3 });
  const m1 = useCountUp(312, statsInView);
  const m2 = useCountUp(48, statsInView);
  const m3 = useCountUp(127, statsInView);

  const headlines = {
    pulse: (<>Marketing que <em>pulsa</em> resultados.</>),
    transform: (<>Transformamos presença digital em <em>crescimento</em> real.</>),
    dominate: (<>Performance que <em>domina</em> seu mercado.</>),
  };

  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <div>
          <div className="reveal eyebrow" style={{ '--d': '0ms' }}>
            <span>Performance · Branding · Crescimento</span>
          </div>
          <h1 className="reveal" style={{ '--d': '120ms' }}>{headlines[headlineVariant] || headlines.pulse}</h1>
          <p className="sub reveal" style={{ '--d': '240ms' }}>
            Estratégia de aquisição, branding e automação para marcas que estão prontas para escalar.
            Operação enxuta, decisões orientadas por dado, autoridade construída no longo prazo.
          </p>
          <div className="ctas reveal" style={{ '--d': '360ms' }}>
            <a href="#contact" className="btn btn-primary">
              Solicitar orçamento
              <span className="btn-arrow"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </a>
            <a href="#cases" className="btn btn-ghost">
              Ver cases
            </a>
          </div>

          <div ref={statsRef} className="metric-strip reveal" style={{ '--d': '500ms' }}>
            <div className="metric">
              <div className="v"><span className="plus">+</span>{Math.round(m1)}<span style={{ color: 'var(--fg-3)' }}>%</span></div>
              <div className="l">ROAS médio</div>
            </div>
            <div className="metric">
              <div className="v">{Math.round(m2)}<span style={{ color: 'var(--fg-3)' }}>+</span></div>
              <div className="l">Marcas ativas</div>
            </div>
            <div className="metric">
              <div className="v"><span className="plus">R$</span>{Math.round(m3)}<span style={{ color: 'var(--fg-3)' }}>M</span></div>
              <div className="l">Em mídia gerida</div>
            </div>
          </div>
        </div>

        <div className="stage" ref={stageRef}>
          <div className="stage-glow" />
          <div className="stage-rings">
            <div className="ring" />
            <div className="ring" />
            <div className="ring" />
          </div>

          <div className="stage-label tl">
            Pulse&nbsp;01
            <span className="v">Tráfego <span className="accent">ativo</span></span>
          </div>
          <div className="stage-label tr">
            Status
            <span className="v"><span className="accent">●</span> Live</span>
          </div>
          <div className="stage-label bl">
            Velocity
            <span className="v">+4.8x</span>
          </div>
          <div className="stage-label br">
            Sinal
            <span className="v">99.7%</span>
          </div>

          <div className="coins-spinner">
            <div ref={coinsRef} className="coins-wrap">
              <img src="../assets/coins.png" alt="Pulsing 3D" className="coins-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-marquee container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 48px)' }}>
        <div className="track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              <span>Performance Marketing</span><span className="dot" />
              <span>Branding Estratégico</span><span className="dot" />
              <span>Aquisição de Clientes</span><span className="dot" />
              <span>Automação</span><span className="dot" />
              <span>SEO Técnico</span><span className="dot" />
              <span>Growth</span><span className="dot" />
              <span>Mídia Programática</span><span className="dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: About                                                */
/* ============================================================ */

function About() {
  const values = [
    {
      idx: '01',
      title: 'Missão',
      body: 'Acelerar marcas que decidiram crescer com clareza, método e responsabilidade sobre o resultado.',
    },
    {
      idx: '02',
      title: 'Visão',
      body: 'Ser referência em performance e branding para empresas que enxergam marketing como ativo estratégico.',
    },
    {
      idx: '03',
      title: 'Propósito',
      body: 'Transformar investimento em mídia em crescimento sustentável — sem promessas vazias, com prova.',
    },
  ];
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">A empresa · Pulsing™</div>
          <h2>Uma operação enxuta <em>construída para escalar</em> marcas sérias.</h2>
          <p>Não somos uma agência tradicional. Operamos como um time integrado de estratégia, mídia e dado — focado em mover métricas que importam.</p>
        </div>

        <div className="about-grid">
          {values.map((v, i) => (
            <div key={v.idx} className="value-card reveal" style={{ '--d': `${i * 100}ms` }}>
              <div className="idx">{v.idx} <span className="bar" /> Princípio</div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
              <div className="glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: Services                                             */
/* ============================================================ */

function ServiceCard({ icon, title, desc, tag, i }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty('--mx', mx + '%');
    ref.current.style.setProperty('--my', my + '%');
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 6;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 6;
    ref.current.style.transform = `translateY(-4px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="service-card reveal" style={{ '--d': `${i * 60}ms` }}>
      <div>
        <div className="service-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="row">
        <span className="tag">{tag}</span>
        <span className="arrow"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg></span>
      </div>
    </div>
  );
}

function Services() {
  const list = [
    { icon: <I.Ads />, title: 'Tráfego Pago', desc: 'Gestão multicanal de mídia paga com foco em ROAS, CAC e payback. Meta, Google, TikTok, LinkedIn.', tag: 'Aquisição' },
    { icon: <I.Social />, title: 'Social Media', desc: 'Conteúdo estratégico, posicionamento e construção de comunidade orientada a autoridade.', tag: 'Branding' },
    { icon: <I.Brand />, title: 'Branding', desc: 'Identidade, narrativa, posicionamento e arquitetura de marca para marcas em evolução.', tag: 'Identidade' },
    { icon: <I.Seo />, title: 'SEO Técnico', desc: 'Otimização técnica, conteúdo de autoridade e link building orientado a intent comercial.', tag: 'Crescimento' },
    { icon: <I.Site />, title: 'Criação de Sites', desc: 'Sites e landing pages premium com foco em performance, conversão e SEO técnico.', tag: 'Conversão' },
    { icon: <I.Auto />, title: 'Automação', desc: 'Funis de captação, nutrição e venda automatizados — CRM, e-mail, WhatsApp e analytics.', tag: 'Escala' },
  ];
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Serviços · 06 frentes</div>
          <h2>Tudo que sua marca precisa para crescer, <em>com método</em>.</h2>
          <p>Operação integrada que conecta branding, mídia, conteúdo, tecnologia e dado — em um único squad acompanhando sua conta.</p>
        </div>

        <div className="services-grid">
          {list.map((s, i) => <ServiceCard key={s.title} {...s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: Differentials                                        */
/* ============================================================ */

function Counter({ to, suffix = '', prefix = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const v = useCountUp(to, inView);
  return <span ref={ref}>{prefix}{Math.round(v)}{suffix}</span>;
}

function Differentials() {
  const stats = [
    { num: <Counter to={312} suffix="%" />, lbl: 'ROAS médio em contas geridas', desc: 'Performance auditável, sem black box. Você acompanha cada centavo investido e cada resultado gerado.' },
    { num: <Counter to={48} prefix="" />, lbl: 'Marcas ativas na operação', desc: 'Portfólio enxuto e selecionado. Tomamos poucos clientes por trimestre para garantir profundidade.' },
    { num: <><Counter to={4} suffix=".8" />x</>, lbl: 'Velocidade média de execução', desc: 'Ciclos curtos, decisões rápidas, operação ágil. Iteração semanal sobre cada hipótese.' },
  ];
  const feats = [
    { t: 'Estratégias personalizadas', d: 'Sem playbook genérico. Plano construído sobre o histórico, mercado e estágio da sua marca.' },
    { t: 'Foco em ROI mensurável', d: 'Definição clara de metas, atribuição correta e relatórios semanais com decisões objetivas.' },
    { t: 'Acompanhamento próximo', d: 'Squad dedicado, contato direto com estrategistas — sem camadas de gerência intermediária.' },
    { t: 'Tecnologia avançada', d: 'Stack moderna de tracking, atribuição multitouch, dashboards customizados e automação.' },
    { t: 'Decisões orientadas por dado', d: 'Hipóteses validadas com teste estatístico, não com achismo. Iteração baseada em evidência.' },
    { t: 'Crescimento escalável', d: 'Operação preparada para acompanhar o crescimento do seu investimento sem perda de eficiência.' },
  ];
  return (
    <section className="section" id="diff">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Por que Pulsing · Diferenciais</div>
          <h2>Resultado não é sorte. <em>É método repetível.</em></h2>
          <p>Tratamos sua conta como uma operação financeira. Tese clara, alocação intencional, mensuração rigorosa, ajuste contínuo.</p>
        </div>

        <div className="diff-wrap reveal">
          <div className="eyebrow">Snapshot · operação atual</div>
          <div className="diff-grid">
            {stats.map((s, i) => (
              <div key={i} className="diff-cell">
                <div className="num">{s.num}</div>
                <div className="lbl">{s.lbl}</div>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="diff-features">
            {feats.map((f, i) => (
              <div key={i} className="diff-feat reveal" style={{ '--d': `${i * 60}ms` }}>
                <div className="icn"><I.Check /></div>
                <div>
                  <div className="t">{f.t}</div>
                  <div className="d">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: Cases                                                */
/* ============================================================ */

function ChartLine({ variant = 'up' }) {
  // generate a deterministic up-trending path
  const paths = {
    up: 'M0 70 L15 65 L28 60 L40 55 L55 48 L70 38 L85 25 L100 12',
    steady: 'M0 60 L20 56 L35 52 L55 45 L70 38 L85 26 L100 14',
    rise: 'M0 78 L18 72 L32 68 L48 58 L64 44 L80 30 L100 10',
  };
  const d = paths[variant] || paths.up;
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none">
      <defs>
        <linearGradient id={'gradLine-' + variant} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,30,30,0.4)" />
          <stop offset="100%" stopColor="rgba(255,30,30,0)" />
        </linearGradient>
      </defs>
      <path d={d + ' L100 80 L0 80 Z'} fill={`url(#gradLine-${variant})`} opacity="0.7" />
      <path d={d} fill="none" stroke="#ff3030" strokeWidth="1.2" />
      <path d={d} fill="none" stroke="rgba(255,30,30,0.4)" strokeWidth="3" filter="blur(3px)" />
    </svg>
  );
}

function BarChart() {
  const bars = [22, 30, 28, 42, 38, 56, 64, 60, 78, 72, 90, 86];
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect key={i}
          x={i * 8 + 2} y={80 - h * 0.8}
          width={5.5} height={h * 0.8}
          fill={i > 7 ? '#ff3030' : 'rgba(255,255,255,0.25)'}
          rx="1"
        />
      ))}
    </svg>
  );
}

function Cases() {
  const list = [
    {
      cls: 'large', cat: 'E-commerce · Moda',
      title: 'Aurea Atelier',
      seg: 'Faturamento × ROAS — 8 meses',
      delta: '+418% receita',
      chart: <ChartLine variant="rise" />,
    },
    {
      cls: 'small', cat: 'SaaS B2B',
      title: 'Nodal Systems',
      seg: 'MQLs qualificados',
      delta: '+612% leads',
      chart: <BarChart />,
    },
    {
      cls: 'small', cat: 'Health · Clínica',
      title: 'Vertice Clínico',
      seg: 'Custo por consulta',
      delta: '-67% CAC',
      chart: <ChartLine variant="steady" />,
    },
    {
      cls: 'small', cat: 'Educação · Cursos',
      title: 'Método Iberê',
      seg: 'Receita orgânica',
      delta: '+228% receita',
      chart: <ChartLine variant="up" />,
    },
    {
      cls: 'small', cat: 'Serviços · Premium',
      title: 'Studio Maré',
      seg: 'Engajamento qualificado',
      delta: '+340% reach',
      chart: <BarChart />,
    },
  ];
  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Cases · Resultados auditáveis</div>
          <h2>Operações reais. <em>Métricas reais.</em></h2>
          <p>Recortes de contas em operação. Números aproximados, contexto preservado — disponíveis na íntegra mediante NDA.</p>
        </div>
        <div className="cases-grid">
          {list.map((c, i) => (
            <div key={c.title} className={`case-card ${c.cls} reveal`} style={{ '--d': `${i * 70}ms` }}>
              <div className="case-art">
                <div className="label">{c.cat}</div>
                <div className="delta">{c.delta}</div>
                <div className="chart">{c.chart}</div>
              </div>
              <div className="case-meta">
                <div className="cat">Case · {String(i + 1).padStart(2, '0')}</div>
                <h3>{c.title}</h3>
                <div className="seg">{c.seg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: Testimonials                                         */
/* ============================================================ */

function Testimonials() {
  const items = [
    {
      quote: 'A Pulsing reorganizou nossa operação de aquisição em 60 dias. Saímos de mídia reativa para um plano com tese, prova e roadmap — e o ROAS dobrou.',
      name: 'Helena Albuquerque', role: 'CMO · Aurea Atelier', initials: 'HA',
    },
    {
      quote: 'Eles entregam o que prometem. Relatório semanal, decisões claras, sem teatro. É a primeira agência que sinto que joga do meu lado.',
      name: 'Rafael Cordeiro', role: 'CEO · Nodal Systems', initials: 'RC',
    },
    {
      quote: 'Em três meses cortamos 40% do CAC e dobramos a base. Operação enxuta, time sênior, sem rotatividade.',
      name: 'Marina Toledo', role: 'Founder · Vertice Clínico', initials: 'MT',
    },
    {
      quote: 'A diferença foi a profundidade do diagnóstico antes de ligar a mídia. Eles entenderam o produto, não só o canal.',
      name: 'Iberê Almeida', role: 'Diretor · Método Iberê', initials: 'IA',
    },
  ];
  const [active, setActive] = useState(0);
  const main = items[active];

  return (
    <section className="section" id="testi">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Prova social · O que dizem</div>
          <h2>Clientes que param de procurar agência <em>quando chegam aqui.</em></h2>
        </div>

        <div className="testi-wrap">
          <div className="testi-card reveal">
            <div className="testi-stars">
              {[0,1,2,3,4].map((i) => <I.Star key={i} />)}
            </div>
            <div className="testi-quote">{main.quote}</div>
            <div className="testi-author">
              <div className="testi-avatar">{main.initials}</div>
              <div>
                <div className="name">{main.name}</div>
                <div className="role">{main.role}</div>
              </div>
            </div>
          </div>
          <div className="testi-side reveal" style={{ '--d': '120ms' }}>
            {items.map((t, i) => i !== active && (
              <div key={i} className={`testi-mini ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
                <p>{t.quote.length > 130 ? t.quote.slice(0, 130) + '…' : t.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ width: 36, height: 36, fontSize: 12 }}>{t.initials}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: CTA Final                                            */
/* ============================================================ */

function CTAFinal() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <div className="cta-final reveal">
          <div className="eyebrow" style={{ position: 'relative', marginBottom: 22 }}>Próximo passo</div>
          <h2>Sua marca está pronta para <em>pulsar?</em></h2>
          <p>Diagnóstico gratuito de 30 minutos. Sem pitch, sem proposta forçada — só análise honesta do seu cenário atual e do que faria sentido fazer nos próximos 90 dias.</p>
          <div className="ctas">
            <a href="#contact" className="btn btn-primary">
              Solicitar diagnóstico
              <span className="btn-arrow"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </a>
            <a href="#cases" className="btn btn-ghost">Ver cases primeiro</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Section: Contact                                              */
/* ============================================================ */

function Contact({ onToast }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: 'R$ 10k – R$ 30k', goal: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Informe seu nome';
    if (!form.email.trim()) errs.email = 'Informe seu e-mail';
    else if (!/^[^@]+@[^@.]+\.[^@]+$/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.goal.trim()) errs.goal = 'Conte um pouco sobre o objetivo';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', company: '', budget: 'R$ 10k – R$ 30k', goal: '' });
      onToast('Mensagem enviada. Retornamos em até 24h úteis.');
    }, 900);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Contato · Fale com a operação</div>
          <h2>Vamos conversar sobre <em>onde sua marca pode chegar.</em></h2>
          <p>Preencha o formulário ou fale direto pelo WhatsApp. Atendemos um número limitado de novas contas por trimestre.</p>
        </div>

        <div className="contact-grid">
          <form className="contact-form reveal" onSubmit={submit} noValidate>
            <div className="field-row">
              <div className="field">
                <label>Nome</label>
                <input
                  className={errors.name ? 'invalid' : ''}
                  value={form.name} onChange={set('name')}
                  placeholder="Como podemos te chamar?" />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>
              <div className="field">
                <label>E-mail corporativo</label>
                <input
                  className={errors.email ? 'invalid' : ''}
                  value={form.email} onChange={set('email')}
                  placeholder="voce@empresa.com" />
                {errors.email && <div className="err">{errors.email}</div>}
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Empresa</label>
                <input value={form.company} onChange={set('company')} placeholder="Razão social ou marca" />
              </div>
              <div className="field">
                <label>Investimento mensal</label>
                <select value={form.budget} onChange={set('budget')}>
                  <option>R$ 5k – R$ 10k</option>
                  <option>R$ 10k – R$ 30k</option>
                  <option>R$ 30k – R$ 80k</option>
                  <option>R$ 80k – R$ 200k</option>
                  <option>R$ 200k+</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Objetivo / contexto</label>
              <textarea
                className={errors.goal ? 'invalid' : ''}
                value={form.goal} onChange={set('goal')}
                placeholder="Em uma frase: o que você precisa resolver?" />
              {errors.goal && <div className="err">{errors.goal}</div>}
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
              {loading ? 'Enviando…' : 'Enviar mensagem'}
              {!loading && <span className="btn-arrow"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>}
            </button>
          </form>

          <div className="contact-side reveal" style={{ '--d': '120ms' }}>
            <a className="wa-btn" href="#" onClick={(e) => { e.preventDefault(); onToast('Abrindo WhatsApp…'); }}>
              <div className="ico"><I.Whats /></div>
              <div style={{ flex: 1 }}>
                <div>Conversa direta no WhatsApp</div>
                <div className="sub">Resposta em até 1h útil</div>
              </div>
              <I.Arrow />
            </a>
            <div className="contact-card">
              <h3>Operação</h3>
              <p>Brasil · atendimento remoto em todo o país.</p>
              <div className="row"><span className="l">E-mail</span><span className="v">hello@pulsing.co</span></div>
              <div className="row"><span className="l">Horário</span><span className="v">Seg–Sex · 09h–19h BRT</span></div>
              <div className="row"><span className="l">SLA</span><span className="v">Resposta em até 24h úteis</span></div>
            </div>
            <div className="contact-card">
              <h3>Encontre a Pulsing</h3>
              <p>Acompanhe bastidores, cases e estudos sobre crescimento.</p>
              <div className="socials">
                <a href="#" aria-label="Instagram"><I.IG /></a>
                <a href="#" aria-label="LinkedIn"><I.IN /></a>
                <a href="#" aria-label="X"><I.X /></a>
                <a href="#" aria-label="YouTube"><I.YT /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* Footer                                                         */
/* ============================================================ */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="brand" href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>
          <span className="mark" style={{ width: 24, height: 24, borderRadius: 7, background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #050505 70%)', border: '1px solid rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px rgba(255,26,26,0.9)' }} />
          </span>
          Pulsing™ · 2026
        </a>
        <div className="footer-meta">Marketing que pulsa resultados</div>
        <div className="footer-meta">hello@pulsing.co</div>
      </div>
    </footer>
  );
}

/* ============================================================ */
/* Toast                                                         */
/* ============================================================ */

function Toast({ msg, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`}>
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

  // Apply tweaks to CSS
  useEffect(() => {
    const root = document.documentElement;
    // hue -> compute accent rgb from oklch-ish
    const h = t.accentHue;
    const sat = 0.27;
    const light = 0.62;
    const hRad = h * Math.PI / 180;
    // Approx OKLCH to RGB
    const a = sat * Math.cos(hRad);
    const b = sat * Math.sin(hRad);
    // Use OKLab to linear sRGB
    const l = light;
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
    const L = l_ * l_ * l_;
    const M = m_ * m_ * m_;
    const S = s_ * s_ * s_;
    let r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
    let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
    let bb = -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S;
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
    document.body.style.setProperty('--show-grid', t.showGrid ? '1' : '0');
  }, [t.accentHue, t.glowIntensity, t.showGrid]);

  return (
    <>
      {t.showGrid && <div className="bg-grid" />}
      <div className="bg-noise" />
      <div className="bg-vignette" />

      <Nav />
      <Hero headlineVariant={t.headlineVariant} />
      <About />
      <Services />
      <Differentials />
      <Cases />
      <Testimonials />
      <CTAFinal />
      <Contact onToast={showToast} />
      <Footer />

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
          <TweakToggle
            label="Grade de fundo"
            value={t.showGrid}
            onChange={(v) => setTweak('showGrid', v)}
          />
        </TweakSection>
        <TweakSection label="Headline do hero">
          <TweakRadio
            label="Versão"
            value={t.headlineVariant}
            options={[
              { value: 'pulse', label: 'Pulsa' },
              { value: 'transform', label: 'Transforma' },
              { value: 'dominate', label: 'Domina' },
            ]}
            onChange={(v) => setTweak('headlineVariant', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
