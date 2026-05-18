# Handoff: Pulsing — Landing Page

## Overview

Single-page institucional para **Pulsing**, agência de performance e branding. Objetivo: causar impressão imediata de autoridade, inovação, alta tecnologia e foco em resultados. Estética **dark tech luxury** com peça 3D em destaque no hero, glassmorphism, glow vermelho e tipografia editorial.

---

## About the Design Files

Os arquivos `index.html`, `styles.css`, `app.jsx` e `tweaks-panel.jsx` neste bundle são **referências de design criadas em HTML** — protótipos demonstrando aparência e comportamento pretendidos, **não código de produção para ser copiado diretamente**.

A tarefa é **recriar este design no stack-alvo solicitado pelo cliente** (React + TypeScript + Vite + TailwindCSS + Framer Motion + React Icons, com Atomic Design), aplicando padrões estabelecidos: componentização limpa, hooks reutilizáveis, tipagem forte, animações performáticas, lazy loading, SEO básico e acessibilidade.

O Babel inline + React puro do protótipo deve ser **descartado** — sirva-se dele apenas para entender layout, comportamento, copy, tokens e tempos.

---

## Fidelity

**High-fidelity (hifi).** Mockup pixel-perfeito com cores finais, tipografia, espaçamentos, animações e interações definitivas. Reproduza fielmente; substitua apenas a infraestrutura técnica.

---

## Target Stack

```
react           ^18
typescript      ^5
vite            ^5
tailwindcss     ^3
framer-motion   ^11
react-icons     ^5
```

### Folder structure (Atomic Design)

```
src/
├── assets/
│   ├── coins.png            # peça 3D do hero
│   └── logo.png
├── components/
│   ├── atoms/
│   │   ├── Button/          # Primary, Ghost (with magnetic hover)
│   │   ├── Eyebrow/         # mono label com pulse dot
│   │   ├── Logo/            # marca com mark + wordmark
│   │   └── Stars/           # rating SVG
│   ├── molecules/
│   │   ├── MetricStat/      # count-up number + label
│   │   ├── ServiceCard/     # card com hover 3D + spotlight
│   │   ├── CaseCard/        # card de portfolio + mini chart
│   │   ├── ValueCard/       # missão/visão/propósito
│   │   ├── TestimonialCard/
│   │   ├── ContactField/    # input + label + error
│   │   ├── SocialIcon/
│   │   └── Marquee/
│   ├── organisms/
│   │   ├── Nav/             # glass nav com auto-hide
│   │   ├── Hero/            # hero c/ 3D, parallax, métricas, marquee
│   │   ├── About/
│   │   ├── Services/
│   │   ├── Differentials/
│   │   ├── Cases/
│   │   ├── Testimonials/
│   │   ├── CTAFinal/
│   │   ├── Contact/
│   │   └── Footer/
│   └── templates/
│       └── LandingTemplate/ # composição do layout + backgrounds globais
├── hooks/
│   ├── useReveal.ts         # IntersectionObserver scroll-reveal
│   ├── useCountUp.ts        # animação numérica eased
│   ├── useInView.ts         # detecta visibilidade one-shot
│   ├── useMouseParallax.ts  # parallax 3D do hero
│   └── useScrollHide.ts     # esconde nav no scroll down
├── pages/
│   └── Home/
│       └── index.tsx
├── lib/
│   ├── motion.ts            # presets de Framer Motion (variants reutilizáveis)
│   └── seo.tsx              # <Seo /> wrapper
├── styles/
│   ├── globals.css          # @tailwind + custom CSS variables
│   └── fonts.css            # @import Google Fonts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

### Performance e build

- Vite com `build.target: 'esnext'`, code-splitting por rota
- `React.lazy` + `Suspense` para `Cases`, `Testimonials`, `Contact` (abaixo do fold)
- Imagens via `import` do Vite, `loading="lazy"` + `decoding="async"`
- Fontes Google via `<link rel="preconnect">` + `display=swap`
- `prefers-reduced-motion` respeitado em todas as animações

---

## Design Tokens

Adicione em `tailwind.config.ts` na chave `theme.extend`:

```ts
colors: {
  bg: {
    DEFAULT: '#000000',
    1: '#050505',
    2: '#0A0A0A',
    3: '#111111',
    4: '#1A1A1A',
    5: '#2A2A2A',
  },
  fg: {
    DEFAULT: '#F5F5F7',
    2: '#C2C2C8',
    3: '#8A8A92',
    4: '#56565C',
  },
  line: {
    DEFAULT: 'rgba(255,255,255,0.07)',
    2:       'rgba(255,255,255,0.12)',
  },
  accent: {
    DEFAULT: '#FF1A1A',     // vermelho principal
    deep:    '#C80000',
  },
},
fontFamily: {
  sans:    ['Inter', 'system-ui', 'sans-serif'],
  serif:   ['"Instrument Serif"', 'serif'],   // headlines italic
  mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
},
borderRadius: {
  card:    '14px',
  'card-lg': '22px',
  block:   '26px',
},
boxShadow: {
  'btn-red':       '0 0 0 1px rgba(255,255,255,.15) inset, 0 1px 0 rgba(255,255,255,.4) inset, 0 10px 30px -10px rgba(255,26,26,.7), 0 0 60px -10px rgba(255,26,26,.4)',
  'btn-red-hover': '0 0 0 1px rgba(255,255,255,.2)  inset, 0 1px 0 rgba(255,255,255,.5) inset, 0 14px 36px -10px rgba(255,26,26,.9), 0 0 80px -10px rgba(255,26,26,.7)',
  'card-hover':    '0 20px 40px -10px rgba(0,0,0,.8)',
  'toast':         '0 20px 40px -10px rgba(0,0,0,.8), 0 0 40px -10px rgba(255,26,26,.3)',
},
backdropBlur: {
  glass: '20px',
},
animation: {
  'pulse-dot':    'pulseDot 1.6s ease-in-out infinite',
  'glow-pulse':   'glowPulse 4.5s ease-in-out infinite',
  'float-y':      'floatY 6s ease-in-out infinite',
  'spin-slow':    'spin 20s linear infinite',
  'spin-slower':  'spin 60s linear infinite reverse',
  'spin-slowest': 'spin 90s linear infinite',
  'marquee':      'marquee 40s linear infinite',
},
keyframes: {
  pulseDot:  { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.4)', opacity: '.6' } },
  glowPulse: { '0%,100%': { transform: 'scale(1)', opacity: '.9' }, '50%': { transform: 'scale(1.08)', opacity: '1' } },
  floatY:    { '0%,100%': { transform: 'translateY(-8px)' }, '50%': { transform: 'translateY(8px)' } },
  marquee:   { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
},
```

### Spacing scale

Tailwind default + uso intensivo de `gap-3.5` (14px), `gap-4` (16px) entre cards.
Padding de seção: `py-[120px] px-6`. Container `max-w-[1280px] mx-auto`.

### Type scale

| Uso | Família | Tamanho | Peso | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Hero H1 | Inter | `clamp(44px, 6.5vw, 88px)` | 700 | -0.045em | 0.98 |
| Hero H1 em (itálico) | Instrument Serif | mesmo | 400 | -0.02em | — |
| Section H2 | Inter | `clamp(34px, 4.5vw, 56px)` | 600 | -0.035em | 1.02 |
| Section H2 em | Instrument Serif | mesmo | 400 | — | — |
| CTA Final H2 | Inter | `clamp(40px, 6vw, 78px)` | 600 | -0.045em | 1.0 |
| Card title (h3) | Inter | 20–22px | 500 | -0.02em | — |
| Body | Inter | 14–18px | 400 | -0.01em | 1.55 |
| Eyebrow | JetBrains Mono | 11px | 400 | 0.18em UPPERCASE | — |
| Metric value | Inter | 28px | 600 | -0.03em | — |
| Diff stat (huge) | Inter | 56px | 600 | -0.04em | 1.0 |
| Quote (testimonial) | Instrument Serif | `clamp(22px, 2.4vw, 30px)` | 400 | -0.01em | 1.3 |

### Effects globais

- **Glass card**: `bg-bg-2/60 border border-line backdrop-blur-glass`
- **Grid de fundo**: linhas 1px `rgba(255,255,255,.025)` em `80px × 80px`, máscara radial elíptica
- **Noise overlay**: SVG turbulência base 0.9, opacity 0.04, mix-blend overlay, `position: fixed`
- **Vignette**: radial-gradient do topo, escurecendo bordas
- **Acent glow**: `radial-gradient` em `rgba(255,26,26, α)` blur 40–60px

---

## Screens / Views

Há apenas uma view (`/`), composta pelas seções abaixo na ordem.

### 0. Backgrounds globais

Três camadas fixas (`position: fixed`, `pointer-events: none`):
1. **bg-grid** — z-index 0, máscara `radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)`
2. **bg-noise** — z-index 1, opacity 0.04
3. **bg-vignette** — z-index 1, `radial-gradient(ellipse 100% 80% at 50% 0%, transparent 30%, rgba(0,0,0,.6) 100%)`

Toggle da grade exposto via Tweaks (`showGrid`).

---

### 1. Nav (organism)

- **Posição**: `fixed top-5 left-1/2 -translate-x-1/2`, `max-width: 1240px`, `width: calc(100% - 32px)`, z-index 100.
- **Estilo**: `bg-bg-2/55 backdrop-blur-glass border border-line rounded-full`, padding `12px 14px 12px 22px`, sombra interna sutil + sombra externa.
- **Comportamento**: esconde com `translateY(-120%)` ao rolar para baixo após 200px; mostra ao rolar para cima. Use `useScrollHide` hook.
- **Conteúdo**:
  - Brand à esquerda: dot 28×28 com gradiente radial + ponto vermelho de 8px com glow.
  - Links centrais: Serviços, Diferenciais, Cases, Depoimentos, Contato. `text-fg-2` → `text-fg` no hover, padding `8px 14px`, rounded-full.
  - CTA à direita: "Fale com a gente" → variante Primary compacta (13px).
- **Mobile (< 820px)**: esconder links centrais.

---

### 2. Hero (organism)

- **Altura**: `min-h-screen`, padding `140px 24px 80px`.
- **Layout**: grid 2 colunas (`1.05fr 1fr`), gap 40px. Colapsa em 1 coluna < 980px.

#### Coluna esquerda

- Eyebrow: `"Performance · Branding · Crescimento"` (mono, com dot pulsante)
- H1: 3 variantes (controladas via tweak `headlineVariant`):
  - `pulse`: "Marketing que *pulsa* resultados."
  - `transform`: "Transformamos presença digital em *crescimento* real."
  - `dominate`: "Performance que *domina* seu mercado."
  - A palavra em itálico (`<em>`) usa Instrument Serif + gradiente `linear-gradient(180deg, #fff 0%, #ff5555 100%)` clipped no texto.
- Subheadline (`text-fg-2`, max-w 540px, line-height 1.55):
  > "Estratégia de aquisição, branding e automação para marcas que estão prontas para escalar. Operação enxuta, decisões orientadas por dado, autoridade construída no longo prazo."
- CTAs: Primary `"Solicitar orçamento"` + Ghost `"Ver cases"`.
- Metric strip: grid 3 colunas, gap 32px, padding-top 28px, border-top 1px line, max-w 560px.
  - **+312% — ROAS médio** (count-up)
  - **48+ — Marcas ativas**
  - **R$ 127M — Em mídia gerida**
  - O sinal `+`, `R$` e `%` em `text-accent` ou `text-fg-3` conforme indicado no `app.jsx`.

#### Coluna direita — Stage 3D

- Container `aspect-ratio: 1/1`, `perspective: 1400px`, grid place-items center.
- **Camadas (em ordem de z)**:
  1. **stage-glow** — `inset: 10%`, radial-gradient vermelho blur 40px, animação `glow-pulse` 4.5s.
  2. **stage-rings** — 3 anéis SVG/border concêntricos:
     - 60% width, dashed, rotação 30s
     - 78% width, solid mais sutil, rotação 60s reverse
     - 95% width, dashed, rotação 90s
  3. **coins-spinner** — wrapper que rotaciona 360° em 20s (rotateZ).
  4. **coins-wrap** dentro do spinner — anima floatY 6s (translateY -8px ↔ +8px).
  5. **coins-img** — `assets/coins.png`, `object-fit: contain`, dois `drop-shadow`:
     - `0 30px 60px rgba(0,0,0,.8)`
     - `0 0 80px rgba(255,26,26,.28)`
  6. **stage-labels** — 4 labels HUD (mono 10px UPPERCASE):
     - TL `Pulse 01 / Tráfego ativo` (com acento vermelho)
     - TR `Status / ● Live`
     - BL `Velocity / +4.8x`
     - BR `Sinal / 99.7%`
- **Parallax mouse**: `useMouseParallax` aplica em `coins-wrap`:
  ```
  rotateX(-dy * 14deg) rotateY(dx * 14deg) translate3d(dx*14px, dy*14px, 0)
  ```
  onde `dx, dy ∈ [-0.5, 0.5]` em relação ao centro do stage. Usar `requestAnimationFrame`, **não** `useState` (evitar re-renders).

#### Marquee (faixa inferior absoluta)

- `position: absolute; bottom: 0`, border top + bottom, padding 22px.
- Track duplicada, `animation: marquee 40s linear infinite` (translateX 0 → -50%).
- Conteúdo (mono UPPERCASE 12px, dots vermelhos 6px):
  `Performance Marketing · Branding Estratégico · Aquisição de Clientes · Automação · SEO Técnico · Growth · Mídia Programática`

---

### 3. About (organism)

- Section head:
  - Eyebrow: `"A empresa · Pulsing™"`
  - H2: "Uma operação enxuta *construída para escalar* marcas sérias."
  - Sub: "Não somos uma agência tradicional. Operamos como um time integrado de estratégia, mídia e dado — focado em mover métricas que importam."
- Grid 3 colunas (1 col < 880px), gap 14px.
- **ValueCard**:
  - Padding `28px 26px 30px`, rounded `card-lg`, glass.
  - Linha top: 1px gradient horizontal vermelho centralizado, opacity 0.4.
  - Header mono: `"01 — Princípio"` (com barra 30×1px).
  - H3 + parágrafo (text-fg-3).
  - No hover: `translateY(-3px)`, border-color → line-2, glow radial bottom-right aparece (opacity 0 → 1).
- **Conteúdo**:
  1. **Missão** — "Acelerar marcas que decidiram crescer com clareza, método e responsabilidade sobre o resultado."
  2. **Visão** — "Ser referência em performance e branding para empresas que enxergam marketing como ativo estratégico."
  3. **Propósito** — "Transformar investimento em mídia em crescimento sustentável — sem promessas vazias, com prova."

---

### 4. Services (organism)

- Section head:
  - Eyebrow: `"Serviços · 06 frentes"`
  - H2: "Tudo que sua marca precisa para crescer, *com método*."
  - Sub: "Operação integrada que conecta branding, mídia, conteúdo, tecnologia e dado — em um único squad acompanhando sua conta."
- Grid 3 colunas (2 < 980px, 1 < 640px), gap 14px.
- **ServiceCard**:
  - Padding 28px, rounded card-lg, glass, `min-height: 240px`, flex col space-between.
  - **Hover 3D**: rotateX/Y leve baseado na posição do cursor (±6deg). Spotlight radial 600px segue o cursor com `radial-gradient(... at var(--mx) var(--my), rgba(255,26,26,.12), transparent 40%)`.
  - Ícone 48×48 com border + bg gradiente; rotaciona -4deg + scale 1.05 no hover, color → accent.
  - Bottom row: `border-top: 1px line`, tag mono à esquerda, seta circular 30×30 à direita.
  - No hover, a seta vira vermelha sólida com glow e move 4px ↗.
- **Cards** (em ordem):

| # | Título | Descrição | Tag |
|---|---|---|---|
| 1 | Tráfego Pago | Gestão multicanal de mídia paga com foco em ROAS, CAC e payback. Meta, Google, TikTok, LinkedIn. | Aquisição |
| 2 | Social Media | Conteúdo estratégico, posicionamento e construção de comunidade orientada a autoridade. | Branding |
| 3 | Branding | Identidade, narrativa, posicionamento e arquitetura de marca para marcas em evolução. | Identidade |
| 4 | SEO Técnico | Otimização técnica, conteúdo de autoridade e link building orientado a intent comercial. | Crescimento |
| 5 | Criação de Sites | Sites e landing pages premium com foco em performance, conversão e SEO técnico. | Conversão |
| 6 | Automação | Funis de captação, nutrição e venda automatizados — CRM, e-mail, WhatsApp e analytics. | Escala |

Ícones: SVGs inline originais (24×24, stroke 1.6). Veja definições em `app.jsx` no objeto `I = { Ads, Social, Brand, Seo, Site, Auto }`. Reaproveite no novo projeto OU substitua por equivalentes de `react-icons` (linha consistente recomendada: `react-icons/fi` ou `react-icons/lu`).

---

### 5. Differentials (organism)

- Section head:
  - Eyebrow: `"Por que Pulsing · Diferenciais"`
  - H2: "Resultado não é sorte. *É método repetível.*"
  - Sub: "Tratamos sua conta como uma operação financeira. Tese clara, alocação intencional, mensuração rigorosa, ajuste contínuo."
- **Container externo (`diff-wrap`)**: rounded 26px, padding `60px 48px`, fundo duplo gradient + grade interna mascarada radial.
- Eyebrow interno: `"Snapshot · operação atual"`.
- **3 stats grandes** em grid 3×1 (gap 1px sobre bg line para criar linhas divisórias):
  - **+312% — ROAS médio em contas geridas** — "Performance auditável, sem black box. Você acompanha cada centavo investido e cada resultado gerado."
  - **48 — Marcas ativas na operação** — "Portfólio enxuto e selecionado. Tomamos poucos clientes por trimestre para garantir profundidade."
  - **4.8x — Velocidade média de execução** — "Ciclos curtos, decisões rápidas, operação ágil. Iteração semanal sobre cada hipótese."
- Números: 56px Inter 600, gradient text branco→vermelho.
- **6 features** em grid 2×3 abaixo, separadas por border-top:

| Título | Descrição |
|---|---|
| Estratégias personalizadas | Sem playbook genérico. Plano construído sobre o histórico, mercado e estágio da sua marca. |
| Foco em ROI mensurável | Definição clara de metas, atribuição correta e relatórios semanais com decisões objetivas. |
| Acompanhamento próximo | Squad dedicado, contato direto com estrategistas — sem camadas de gerência intermediária. |
| Tecnologia avançada | Stack moderna de tracking, atribuição multitouch, dashboards customizados e automação. |
| Decisões orientadas por dado | Hipóteses validadas com teste estatístico, não com achismo. Iteração baseada em evidência. |
| Crescimento escalável | Operação preparada para acompanhar o crescimento do seu investimento sem perda de eficiência. |

Cada feature: checkbox 28×28 com `<FiCheck />` vermelho, título + descrição.

---

### 6. Cases (organism)

- Section head:
  - Eyebrow: `"Cases · Resultados auditáveis"`
  - H2: "Operações reais. *Métricas reais.*"
  - Sub: "Recortes de contas em operação. Números aproximados, contexto preservado — disponíveis na íntegra mediante NDA."
- **Bento grid** 6 colunas, gap 14px:
  - 1 large (col-span-4, min-h 420px) + 4 small (col-span-2, min-h 320px). Colapsa para col-span-6 < 880px.
- **CaseCard**:
  - Bloco superior (case-art) `flex: 1`, fundo duplo: radial vermelho 20% inferior + linear `#1A1A1A → #050505`. Border-bottom 1px.
  - Label top-left (mono 10px), badge delta top-right (chip vermelho com border `rgba(255,26,26,.35)`, font mono).
  - Chart SVG 80% × 60% centralizado (mais detalhes em **Charts**).
  - Bloco inferior (meta) padding `22px 24px`: case cat + título h3 + segmento.
- **Cards** (em ordem):

| # | Tipo | Categoria | Título | Segmento | Delta | Chart |
|---|---|---|---|---|---|---|
| 1 | large | E-commerce · Moda | Aurea Atelier | Faturamento × ROAS — 8 meses | +418% receita | line "rise" |
| 2 | small | SaaS B2B | Nodal Systems | MQLs qualificados | +612% leads | bars |
| 3 | small | Health · Clínica | Vertice Clínico | Custo por consulta | -67% CAC | line "steady" |
| 4 | small | Educação · Cursos | Método Iberê | Receita orgânica | +228% receita | line "up" |
| 5 | small | Serviços · Premium | Studio Maré | Engajamento qualificado | +340% reach | bars |

**Charts (SVG)** — implementar como componentes:
- `<LineChart variant="up" | "steady" | "rise" />`: path simples + área preenchida com gradient `rgba(255,30,30,.4) → 0`, stroke vermelho 1.2px + halo blur 3px embaixo.
- `<BarChart />`: 12 barras (heights array: `[22, 30, 28, 42, 38, 56, 64, 60, 78, 72, 90, 86]`), as 4 últimas vermelhas, restante branco 25%.

---

### 7. Testimonials (organism)

- Section head:
  - Eyebrow: `"Prova social · O que dizem"`
  - H2: "Clientes que param de procurar agência *quando chegam aqui.*"
- Grid 2 colunas `1.1fr 1fr`, gap 16px. Stack < 980px.
- **Coluna esquerda — card principal** (rounded 24px, padding `44px 40px`, min-h 360px):
  - 5 estrelas (`<FiStar />` filled, 14px, vermelho)
  - Quote em Instrument Serif `clamp(22px, 2.4vw, 30px)`, com aspas curvas iniciais grandes em vermelho.
  - Avatar 44×44 com iniciais + nome + role.
- **Coluna direita — mini cards** clicáveis (passam a ser o ativo no clique):
  - Padding 22×24, rounded 18px, glass.
  - Quote truncado a 130 chars + "…", avatar 36×36 + meta.
  - State `active`: border vermelha leve.
- **Conteúdo**:

| # | Quote | Autor | Role | Iniciais |
|---|---|---|---|---|
| 1 (default ativo) | "A Pulsing reorganizou nossa operação de aquisição em 60 dias. Saímos de mídia reativa para um plano com tese, prova e roadmap — e o ROAS dobrou." | Helena Albuquerque | CMO · Aurea Atelier | HA |
| 2 | "Eles entregam o que prometem. Relatório semanal, decisões claras, sem teatro. É a primeira agência que sinto que joga do meu lado." | Rafael Cordeiro | CEO · Nodal Systems | RC |
| 3 | "Em três meses cortamos 40% do CAC e dobramos a base. Operação enxuta, time sênior, sem rotatividade." | Marina Toledo | Founder · Vertice Clínico | MT |
| 4 | "A diferença foi a profundidade do diagnóstico antes de ligar a mídia. Eles entenderam o produto, não só o canal." | Iberê Almeida | Diretor · Método Iberê | IA |

---

### 8. CTA Final (organism)

- Container rounded 28px, padding `90px 60px`, border `1px rgba(255,26,26,.25)`.
- Fundo: 3 camadas
  1. radial elíptica vermelha intensa partindo de 50% 100%
  2. radial elíptica vermelha sutil partindo de 50% 0%
  3. linear `#0A0A0A → #050505`
- Grade interna mascarada + glow vermelho enorme (600×400px blur 60px) emergindo do bottom, animado `glow-pulse`.
- Conteúdo (centered):
  - Eyebrow: `"Próximo passo"`
  - H2: "Sua marca está pronta para *pulsar?*" (italic em accent)
  - Sub (max-w 540px): "Diagnóstico gratuito de 30 minutos. Sem pitch, sem proposta forçada — só análise honesta do seu cenário atual e do que faria sentido fazer nos próximos 90 dias."
  - CTAs: Primary `"Solicitar diagnóstico"` + Ghost `"Ver cases primeiro"`. Primary com glow ainda mais intenso (`0 0 100px -10px rgba(255,26,26,.8)`).

---

### 9. Contact (organism)

- Section head:
  - Eyebrow: `"Contato · Fale com a operação"`
  - H2: "Vamos conversar sobre *onde sua marca pode chegar.*"
  - Sub: "Preencha o formulário ou fale direto pelo WhatsApp. Atendemos um número limitado de novas contas por trimestre."
- Grid 2 colunas (1 < 880px), gap 18px.

#### Formulário (esquerda)

- Card glass, padding 36px, rounded 24px.
- Campos (todos com label mono UPPERCASE 10.5px, `text-fg-3`):
  - Linha 1: `Nome` + `E-mail corporativo`
  - Linha 2: `Empresa` + `Investimento mensal` (`<select>` com 5 faixas: R$ 5–10k, R$ 10–30k, R$ 30–80k, R$ 80–200k, R$ 200k+)
  - Linha 3 (full): `Objetivo / contexto` (textarea, min-h 100px)
- Inputs: bg `rgba(255,255,255,.02)`, border line, rounded 12px, padding `14px 16px`.
- Focus: border `rgba(255,26,26,.5)`, box-shadow ring `rgba(255,26,26,.12)` 3px.
- **Validação client-side**:
  - Nome: obrigatório.
  - E-mail: obrigatório, regex `^[^@]+@[^@.]+\.[^@]+$`.
  - Objetivo: obrigatório.
  - Erro: borda vermelha + mensagem mono 11px vermelha abaixo do campo.
- Botão submit: Primary full-width, padding 16px, justify-center. Estado loading: texto "Enviando…", desabilita seta.
- Após sucesso (timeout 900ms simulado): reset form + toast.

#### Lateral (direita)

- **Botão WhatsApp** em destaque (não confundir com Primary):
  - Bg gradiente verde `linear-gradient(180deg, #1DD562, #128A3D)`, sombra verde.
  - Ícone WhatsApp em quadrado 36×36 com bg preto translúcido.
  - Texto principal "Conversa direta no WhatsApp" + sub mono "Resposta em até 1h útil".
  - Seta à direita.
- Card "Operação": email, horário, SLA.
  - `hello@pulsing.co` · `Seg–Sex · 09h–19h BRT` · `Resposta em até 24h úteis`
- Card "Encontre a Pulsing": 4 ícones sociais 40×40 (`FiInstagram`, `FiLinkedin`, `FiTwitter`/`X`, `FiYoutube`).

#### Toast

- `position: fixed`, bottom 24px, centralizado.
- Slide-up 20px + fade. Auto-some em 3s.
- Ícone check em círculo vermelho 22×22.
- Mensagens:
  - Form OK: "Mensagem enviada. Retornamos em até 24h úteis."
  - WhatsApp click: "Abrindo WhatsApp…"

---

### 10. Footer (organism)

- Border-top 1px line, padding `50px 24px 32px`.
- Flex justify-between, wrap, gap 20px:
  - Brand compacta com `"Pulsing™ · 2026"`
  - Meta mono: `"Marketing que pulsa resultados"`
  - Meta mono: `"hello@pulsing.co"`

---

## Interactions & Behavior

### Scroll reveal

Hook `useReveal()`:
- `IntersectionObserver` global, `threshold: 0.12`, `rootMargin: '0px 0px -60px 0px'`.
- Aplica classe `.is-visible` em `.reveal`.
- Transição: `opacity 0.9s + transform translateY(24px → 0)` com easing `cubic-bezier(.2,.7,.2,1)`.
- Suporta delays via `style={{ '--d': '120ms' }}` (CSS variable read via `transition-delay: var(--d, 0)`).
- One-shot: unobserve após visível.

### Count-up

Hook `useCountUp(target, isVisible, duration = 1600)`:
- `requestAnimationFrame` loop.
- Easing: `1 - (1 - p)^3` (ease-out cubic).
- Retorna número incremental para render.

### Mouse parallax (hero)

Hook `useMouseParallax(stageRef, targetRef, intensity = 14)`:
- Listener global `mousemove`.
- Calcula delta em relação ao centro do stage.
- Aplica via `requestAnimationFrame` (não state):
  ```ts
  target.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}px, ${ty}px, 0)`
  ```
- Lerp opcional para suavizar (0.1 factor).

### Auto-hide nav

Hook `useScrollHide(threshold = 200)`:
- Compara `scrollY` com `scrollY` anterior.
- Retorna `hidden: boolean`.

### Service card 3D hover

- `mousemove` no card calcula `(mx, my)` percentuais para CSS vars (spotlight) e `(dx, dy)` para rotate.
- `transform: translateY(-4px) rotateX(${-dy}deg) rotateY(${dx}deg)`.
- `mouseleave` reseta transform.
- Use `will-change: transform` no estado base.

### Glow pulse, float, marquee, spin

CSS-only (keyframes acima em design tokens). Sem JS.

### Magnetic button hover (Primary)

Opcional, mas premium: usar Framer Motion `whileHover={{ y: -1 }}` + `transition={{ type: 'spring', stiffness: 300 }}`. O glow no `box-shadow` intensifica via classe hover.

### Testimonial active state

`useState<number>(0)` no organism. Clicar em mini card seta `active` → re-render do main card e atualização de border do mini.

---

## State Management

Local state (useState) é suficiente. Não há roteamento, fetch ou auth.

| Componente | Estado | Tipo |
|---|---|---|
| `Nav` | hidden | `boolean` |
| `Hero` | (parallax via ref, sem state) | — |
| `Testimonials` | activeIndex | `number` |
| `Contact` | form, errors, loading | `{name, email, company, budget, goal}`, `Record<string,string>`, `boolean` |
| `App` | toast | `{ msg: string, show: boolean }` |

---

## Framer Motion conventions

Variants globais em `lib/motion.ts`:

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [.2, .7, .2, 1], delay: i * 0.06 },
  }),
}

export const fadeBlur = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9 } },
}
```

Use `whileInView` com `viewport={{ once: true, margin: '0px 0px -60px 0px' }}` no lugar do hook `useReveal` se preferir 100% Framer.

---

## Assets

| Arquivo | Origem | Uso |
|---|---|---|
| `assets/coins.png` | Fornecido pelo cliente (Rain Coins B.png) | Peça 3D central do hero |
| `assets/logo.png` | Fornecido pelo cliente | Favicon + (potencial) marca |

Ambos copiados nesta pasta.

**Recomendação**: gere variantes `@1x`, `@2x` para `coins.png` e considere AVIF/WebP via Vite plugin.

---

## SEO

Adicionar no `<head>` (use `react-helmet-async` ou metadata API):

```html
<title>Pulsing — Marketing que pulsa resultados</title>
<meta name="description" content="Pulsing é a agência de performance e branding que transforma presença digital em crescimento real. Tráfego pago, social media, SEO e automação de alto nível." />
<meta property="og:title" content="Pulsing — Marketing que pulsa resultados" />
<meta property="og:description" content="Performance, branding e crescimento escalável para marcas que querem dominar seu mercado." />
<meta property="og:type" content="website" />
<meta name="theme-color" content="#000000" />
<link rel="icon" type="image/png" href="/assets/logo.png" />
```

Estrutura semântica: use `<header>`, `<main>`, `<section>` com `aria-labelledby`, `<footer>`. H1 único no hero, H2 em cada seção.

---

## Accessibility checklist

- [ ] Contrast ratio mínimo 4.5:1 em texto pequeno (validar `--fg-3` sobre `--bg`)
- [ ] Focus visible em todos os elementos interativos (anel vermelho `box-shadow: 0 0 0 3px rgba(255,26,26,.4)`)
- [ ] Botões com `aria-label` quando só ícone
- [ ] Form com `<label>` associados a inputs
- [ ] Erros de form anunciados via `aria-live="polite"`
- [ ] `prefers-reduced-motion` desabilita parallax, glow pulse, float, marquee
- [ ] Toast com `role="status" aria-live="polite"`
- [ ] Imagem do hero com `alt="Pulsing — disco 3D representando pulso digital"`
- [ ] Skip link `<a href="#main">Pular para o conteúdo</a>`

---

## Performance checklist

- [ ] `loading="lazy"` em imagens abaixo do fold
- [ ] `decoding="async"` em todas imagens
- [ ] Code-split: `React.lazy` para Cases, Testimonials, Contact
- [ ] Fontes via `display=swap` + preconnect
- [ ] CSS crítico inline (Vite plugin opcional)
- [ ] Animações apenas em `transform` e `opacity`
- [ ] `will-change` somente no estado pré-animação, removido depois
- [ ] Throttle do mousemove parallax via rAF (não setState por frame)
- [ ] Lighthouse: Performance ≥ 90, A11y ≥ 95, SEO 100
- [ ] Bundle gz < 150KB (excluindo a imagem do hero)

---

## Files in this bundle

```
design_handoff_pulsing_landing/
├── README.md             ← este arquivo
├── index.html            ← protótipo de referência
├── styles.css            ← CSS final do protótipo (tokens e detalhes)
├── app.jsx               ← composição React (lógica e copy exatos)
├── tweaks-panel.jsx      ← painel de tweaks (NÃO portar — apenas para iteração)
└── assets/
    ├── coins.png
    └── logo.png
```

**Como usar**: abra `index.html` em um servidor local para ver o protótipo funcionando. Use-o como verdade visual e comportamental enquanto reconstrói no Vite + React + TS + Tailwind + Framer Motion seguindo a estrutura Atomic acima.

---

## Tweaks expostos no protótipo (informativo)

O protótipo expõe um painel "Tweaks" com 4 controles — **estes são para exploração visual, NÃO precisam virar funcionalidade no app real**:

- `accentHue` (slider 0–360°) — varia o matiz do acento via OKLab → sRGB
- `glowIntensity` (slider 0–1.2) — força do glow
- `showGrid` (toggle) — grade de fundo
- `headlineVariant` (radio) — versão da headline do hero

Adote a versão default (`accentHue: 8`, `glowIntensity: 0.7`, `showGrid: true`, `headlineVariant: 'pulse'`) como o design final, salvo orientação contrária do cliente.

---

## Open questions para o dev confirmar com o cliente

1. **Cases**: nomes de marca usados (Aurea Atelier, Nodal Systems, etc.) são placeholders. Substituir por cases reais com permissão.
2. **WhatsApp**: número real para o link `wa.me/`.
3. **E-mail**: `hello@pulsing.co` é placeholder.
4. **Sociais**: URLs reais das contas.
5. **i18n**: o protótipo é em pt-BR. Precisa multilíngue?
6. **Backend do form**: integração com qual provedor (Formspree, Resend, HubSpot, n8n, etc.)?
7. **Analytics**: GA4, Plausible, PostHog?
8. **Cookie banner**: LGPD precisa ser implementado?
