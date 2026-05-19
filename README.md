# Handoff: Pulsing — Landing Page (v2)

## Overview

Single-page institucional para **Pulsing**, agência de performance e branding. Objetivo: causar impressão imediata de autoridade, inovação, alta tecnologia e foco em resultados. Estética **dark tech luxury** com referências editoriais (Omnicom Group): wordmark gigante no hero, mix tipográfico sans + serif itálico, fundo animado com partículas e laptop com dashboard em destaque.

---

## About the Design Files

Os arquivos `index.html`, `styles.css`, `app.jsx` e `tweaks-panel.jsx` neste bundle são **referências de design criadas em HTML** — protótipos demonstrando aparência e comportamento pretendidos, **não código de produção para ser copiado diretamente**.

A tarefa é **recriar este design no stack-alvo** (React + TypeScript + Vite + TailwindCSS + Framer Motion + React Icons, com Atomic Design), aplicando padrões estabelecidos: componentização limpa, hooks reutilizáveis, tipagem forte, animações performáticas, lazy loading, SEO básico e acessibilidade.

O Babel inline + React puro do protótipo deve ser **descartado** — sirva-se dele apenas para entender layout, comportamento, copy, tokens e tempos.

---

## Fidelity

**High-fidelity (hifi).** Mockup pixel-perfeito com cores finais, tipografia, espaçamentos, animações e interações definitivas. Reproduza fielmente; substitua apenas a infraestrutura técnica.

---

## Target Stack (OBRIGATÓRIO)

```
react           ^18
typescript      ^5
vite            ^5
tailwindcss     ^3
framer-motion   ^11
react-icons     ^5
```

Performance: Lighthouse alto, lazy loading, animações GPU-friendly, código limpo, evitar bibliotecas pesadas, evitar re-renderizações desnecessárias.

### Folder structure (Atomic Design)

```
src/
├── assets/
│   ├── laptop.webp          # MacBook com dashboard — peça-chave do hero/showcase
│   ├── coins.png            # legado (manter para fallback se solicitado)
│   └── logo.png
├── components/
│   ├── atoms/
│   │   ├── Button/          # Primary, Ghost, Link (underline)
│   │   ├── Eyebrow/         # mono label com pulse dot
│   │   ├── Logo/            # marca com mark + wordmark
│   │   ├── CapPill/         # pill de capacidade
│   │   └── Badge/           # chip pequeno com dot
│   ├── molecules/
│   │   ├── PlatformCell/    # célula do grid de 6 features
│   │   ├── GrowthStat/      # número grande + label
│   │   ├── NewsCard/        # card de notícia/case
│   │   ├── ShowcaseArt/     # card grande do showcase com o laptop
│   │   ├── ContactCol/      # coluna do "Stay Connected"
│   │   ├── PillForm/        # input pill + botão integrado
│   │   ├── SocialIcon/
│   │   └── Toast/
│   ├── organisms/
│   │   ├── Nav/                  # nav fixa com mudança no scroll
│   │   ├── Hero/                 # canvas particles + wordmark + laptop + headline
│   │   ├── ConnectedCapabilities/ # showcase grande + lista de capacidades
│   │   ├── PulseIntelligence/    # grid Omni-style 6 cards
│   │   ├── SustainedGrowth/      # investor block + stats
│   │   ├── News/                 # grid de cases/news
│   │   ├── CTAFinal/
│   │   ├── StayConnected/        # footer-merged contact
│   │   └── Footer/
│   └── templates/
│       └── LandingTemplate/
├── hooks/
│   ├── useReveal.ts         # IntersectionObserver scroll-reveal
│   ├── useCountUp.ts        # animação numérica eased
│   ├── useInView.ts         # detecta visibilidade one-shot
│   ├── useParticleField.ts  # canvas particle network do hero
│   └── useScrollState.ts    # detecta scrollY > threshold
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

- Vite com `build.target: 'esnext'`, code-splitting por rota.
- `React.lazy` + `Suspense` para `News`, `StayConnected` (abaixo do fold).
- Imagens via `import` do Vite, `loading="lazy"` + `decoding="async"`.
- `laptop.webp` deve ter variantes responsivas e ser **preload** no hero (`<link rel="preload" as="image" href="..." />`).
- Fontes Google via `<link rel="preconnect">` + `display=swap`.
- `prefers-reduced-motion` respeitado em todas as animações (parallax, particles, float, glow pulse).

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
    3:       'rgba(255,255,255,0.2)',
  },
  accent: {
    DEFAULT: '#FF1A1A',
    deep:    '#C80000',
  },
},
fontFamily: {
  sans:    ['Inter', 'system-ui', 'sans-serif'],          // 300–900
  serif:   ['"Instrument Serif"', 'serif'],               // 400 italic
  mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
},
borderRadius: {
  card:    '14px',
  'card-lg': '22px',
  block:   '32px',
},
boxShadow: {
  'btn-red':       '0 0 0 1px rgba(255,255,255,.15) inset, 0 1px 0 rgba(255,255,255,.4) inset, 0 10px 30px -10px rgba(255,26,26,.7), 0 0 60px -10px rgba(255,26,26,.4)',
  'btn-red-hover': '0 0 0 1px rgba(255,255,255,.2)  inset, 0 1px 0 rgba(255,255,255,.5) inset, 0 14px 36px -10px rgba(255,26,26,.9), 0 0 80px -10px rgba(255,26,26,.7)',
  'btn-red-cta':   '0 0 0 1px rgba(255,255,255,.15) inset, 0 1px 0 rgba(255,255,255,.4) inset, 0 14px 36px -10px rgba(255,26,26,.9), 0 0 100px -10px rgba(255,26,26,.8)',
  'card-hover':    '0 20px 40px -10px rgba(0,0,0,.8)',
  'toast':         '0 20px 40px -10px rgba(0,0,0,.8), 0 0 40px -10px rgba(255,26,26,.3)',
},
backdropBlur: {
  glass: '20px',
  nav:   '24px',
},
animation: {
  'pulse-dot':    'pulseDot 1.6s ease-in-out infinite',
  'laptop-float': 'laptopFloat 7s ease-in-out infinite',
  'showcase-float':'showcaseFloat 7s ease-in-out infinite',
  'drift-1':      'drift1 22s ease-in-out infinite',
  'drift-2':      'drift2 28s ease-in-out infinite',
  'drift-3':      'drift3 32s ease-in-out infinite',
  'cta-glow':     'ctaGlow 4s ease-in-out infinite',
},
keyframes: {
  pulseDot:  { '0%,100%': { transform: 'scale(1)', opacity: '1' }, '50%': { transform: 'scale(1.4)', opacity: '.6' } },
  laptopFloat: {
    '0%,100%': { transform: 'translateY(calc(-50% - 14px)) rotate(-2deg)' },
    '50%':     { transform: 'translateY(calc(-50% + 14px)) rotate(2deg)' },
  },
  showcaseFloat: {
    '0%,100%': { transform: 'translateY(-8px) rotate(-1.5deg)' },
    '50%':     { transform: 'translateY(8px) rotate(1.5deg)' },
  },
  drift1: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(40px,-30px)' } },
  drift2: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(-30px,40px)' } },
  drift3: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(30px,-20px)' } },
  ctaGlow:{ '0%,100%': { opacity: '.85' }, '50%': { opacity: '1' } },
},
```

### Spacing scale

Tailwind default. Container `max-w-[1320px] mx-auto`. Padding de seção: `py-[140px] px-7` (`py-[90px] px-5` no mobile).

### Type scale

| Uso | Família | Tamanho | Peso | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Hero H1 | Inter | `clamp(40px, 6.4vw, 96px)` | 600 | -0.045em | 0.98 |
| Hero H1 em (itálico) | Instrument Serif | mesmo | 400 italic | -0.02em | — |
| Wordmark (background) | Inter | `clamp(80px, 22vw, 320px)` | 800 | -0.07em | 0.85 UPPERCASE |
| Section H2 | Inter | `clamp(36px, 5vw, 64px)` | 600 | -0.04em | 1.02 |
| Section H2 em | Instrument Serif | mesmo | 400 italic | — | — |
| Showcase h3 | Inter | `clamp(28px, 3.4vw, 44px)` | 600 | -0.035em | 1.04 |
| CTA Final H2 | Inter | `clamp(40px, 6vw, 84px)` | 600 | -0.045em | 1.0 |
| Stay Connected H2 | Inter | `clamp(36px, 4.8vw, 56px)` | 600 | -0.04em | 1.02 |
| Platform cell h4 | Inter | 20px | 500 | -0.025em | 1.15 |
| Body | Inter | 14–19px | 400 | -0.01em | 1.55 |
| Eyebrow | JetBrains Mono | 11px | 400 | 0.2em UPPERCASE | — |
| Growth stat value | Inter | `clamp(40px, 5vw, 60px)` | 500 | -0.04em | 1.0 |
| News h3 | Inter | 19px | 500 | -0.02em | 1.25 |
| Cap pill | Inter | 13.5px | 400 | -0.005em | — |

### Effects globais

- **Eyebrow**: dot vermelho 6px com pulse (`animate-pulse-dot`) à esquerda, mono UPPERCASE, gap 12px.
- **Italic emphasis**: palavras-chave em headlines usam Instrument Serif italic, peso 400, `color: var(--fg-2)` (cinza claro) ou gradient branco→vermelho clipped.
- **Glass card**: `bg-bg-2/60 border border-line backdrop-blur-glass`.
- **Grade interna em wraps**: linhas 1px `rgba(255,255,255,0.025–0.04)` em 40–60px, máscara radial.
- **Red glow**: `radial-gradient(ellipse, rgba(255,26,26,α), transparent 60%)` + `filter: blur(40–80px)`.

---

## Sections / Views

Uma única página (`/`), composta pelas seções abaixo na ordem.

### 1. Nav (organism)

- **Posição**: `fixed top-0 left-0 right-0`, z-index 100, padding `22px 32px` (default), `16px 32px` (scrolled).
- **State**: transparente no topo, vira glass (`bg-bg-1/75 backdrop-blur-nav border-b border-line`) após `scrollY > 24`. Use `useScrollState`.
- **nav-inner**: `max-w-[1320px] mx-auto flex items-center justify-between`.
- **Brand**: dot 28×28 com gradient radial escuro + ponto vermelho 8px com glow, texto "Pulsing" sans 600 16px.
- **Links centrais**: Sobre, Plataforma, Crescimento, Cases, Contato — `text-fg-2`→`text-fg`, padding `8px 16px`, rounded-full, hover bg branca 5%.
- **CTA direita**: "Fale com a gente" — Primary compacto (10px×18px, 13px).
- **Mobile (<820px)**: esconder links centrais; padding `18px 20px` / `14px 20px`.

---

### 2. Hero (organism)

- **Altura**: `min-h-screen`, padding `120px 28px 60px`, `position: relative; overflow: hidden; isolation: isolate;`.
- **Layout**: flex column. Conteúdo central, pills no rodapé (mt-auto), meta absoluto no canto inferior.

#### 2a. hero-bg (absolute inset-0, z-0)

5 camadas:

1. **Canvas de partículas** (`<HeroCanvas density={t.particleDensity} />`):
   - 80 × density partículas (default density=1).
   - Cada partícula: `{x, y, vx ∈ ±0.15, vy ∈ ±0.15, r ∈ [0.3,1.7], hue: 25% chance "red" senão "white", a ∈ [0.2, 0.8]}`.
   - Loop rAF: move, wrap nas bordas, conecta pares < √14000 com linha de opacidade decrescente (vermelha se um dos dois for vermelho), depois desenha cada ponto como círculo preenchido.
   - DPR ≤ 2. Resize listener.
2. **3 glows** (`div.glow-1/2/3`): radial-gradients vermelhos blur 80px, animação drift (translate suave 22/28/32s).
3. **Laptop background**: `<img src="/assets/laptop.webp" />`
   - `position: absolute; right: -10vmin; top: 50%; width: 80vmin; height: auto;`
   - `opacity: 0.55`
   - `filter: drop-shadow(0 30px 60px rgba(0,0,0,.6)) drop-shadow(0 0 80px rgba(255,26,26,.35))`
   - `animation: laptopFloat 7s ease-in-out infinite` (translateY ±14px + rotate ±2°).
4. **Grain**: SVG turbulência base 0.9, opacity 0.06, mix-blend overlay.
5. **Vignette**: duplo gradient — radial elíptico topo→bordas + linear topo→meio→fundo.

#### 2b. Wordmark gigante (controlado por tweak `showWordmark`)

- `position: absolute; bottom: 12vh; left: 0; right: 0; z-index: 1; pointer-events: none;`
- Texto: "PULSING" UPPERCASE
- Inter 800, `clamp(80px, 22vw, 320px)`, letter-spacing -0.07em, line-height 0.85.
- Color transparent + `background-clip: text` com gradient linear 180° branco 7%→branco 2%→transparent.
- `::after` mascara o rodapé com gradient para preto (fade-out).

#### 2c. Hero content (z-index 2, flex col, justify-center)

- **Eyebrow**: "Pulsing · Performance & Branding".
- **H1**: "A agência de *marketing* e *performance* construída para o próximo ciclo."
  - "marketing" — `em` Instrument Serif italic, color `var(--fg-2)`
  - "performance" — `em.accent` Instrument Serif italic com gradient branco→#ff5050 clipped.
- **Sub**: "Estratégia, mídia, dado e tecnologia em uma única operação — para marcas que decidiram transformar presença digital em crescimento real e mensurável."
- **CTAs**: Primary `"Solicitar orçamento"` + Ghost `"Ver cases"`.

#### 2d. cap-row (capability pills, mt-auto pt-15)

- 8 pills, gap 8px, flex-wrap, max-width container.
- Conteúdo: Tráfego Pago · Branding · Social Media · SEO · Criação de Sites · Automação · Conteúdo · Analytics.
- Pill: padding `10px 18px`, rounded-full, `bg-white/3 border border-line-2`, font 13.5px, hover → bg vermelho 12% + border vermelho 40% + translateY -2px.

#### 2e. hero-meta (absolute bottom-7 left/right-7)

- Flex justify-between, mono 11px UPPERCASE letter-spacing 0.18em.
- Esquerda: dot vermelho pulsante + "Operação ativa · 2026".
- Direita: "Role para baixo" + ícone chevron down.
- Esconder no mobile (<820px).

---

### 3. ConnectedCapabilities (organism, id="capabilities")

- Section padding default.
- Eyebrow: "Capacidades conectadas".
- H2: "Uma vantagem competitiva em *cada dimensão* do marketing moderno." (italic em "cada dimensão").
- Layout **showcase**: grid 1.15fr / 1fr, gap 24px. Stack <980px.

#### 3a. ShowcaseArt (coluna esquerda)

- Card `rounded-block` (32px), `min-h-[540px]`, border `1px solid var(--line)`, `overflow-hidden`.
- Background empilhado:
  - radial vermelho 30% partindo de 100% 50%
  - radial vermelho 15% partindo de 20% 100%
  - linear 135° `#1a1a1a → #050505 60%`
- `::before`: grade 60×60 com máscara radial 60%/70% center.
- **Badge top-left**: pill mono "Plataforma · Live" com dot vermelho pulsante, bg preto 50% + blur.
- **Corner-label top-right**: mono "Velocity" + valor sans 14px "+4.8×".
- **Imagem laptop**: `<img src="/assets/laptop.webp" className="coin" />`
  - `width: 92%; height: auto;`
  - `animation: showcaseFloat 7s ease-in-out infinite` (translateY ±8px + rotate ±1.5°)
  - drop-shadow forte + glow vermelho 30%.
- **Número fantasma bottom-left**: Inter 200, 100px, `color: rgba(255,255,255,0.08)` — "01".

#### 3b. showcase-text (coluna direita)

- Flex col justify-between.
- Eyebrow no-dot: "Operação integrada".
- H3: "Estratégia, mídia, dado e tecnologia *em um único squad.*" (italic em "em um único squad").
- 2 parágrafos curtos.
- **cap-list**: grid 2col, border-top 1px line, padding-top 22px. Cada item é `<a>` com flex justify-between + border-bottom 1px line, padding 10px 2px, fontSize 14.5px.
- Items: Tráfego Pago · Branding · Social Media · SEO Técnico · Criação de Sites · Automação · Conteúdo · Analytics.
- Hover: cor → accent, padding-left +6px, seta ↗ aparece (`opacity 0.5→1` + `translate +3px -3px`).

---

### 4. PulseIntelligence (organism, id="platform")

- Container externo `.platform-wrap`: rounded-block, padding `80px 56px 56px`, border 1px line.
- Fundo: radial vermelho 10% partindo de topo + linear `#0a0a0a → #050505`.
- `::before`: grade 60×60 com máscara radial.
- **platform-head** (grid 1.4fr / 1fr, align end, mb 56px):
  - Esquerda: eyebrow "Pulse Intelligence" + H2 "A plataforma de *inteligência* de marketing da Pulsing."
  - Direita: parágrafo "Pulse une criatividade, mídia, dado e IA para que marcas cresçam com mais clareza, velocidade e impacto mensurável na era da influência."
- **platform-grid**: grid 3 colunas (2 <980px, 1 <600px), gap 1px sobre bg `--line`, border 1px line, rounded 18px, overflow hidden — cria linhas divisórias.
- **platform-cell**: padding `36px 30px 32px`, bg `#060606`, min-h 260px, flex col gap 18px. Hover: bg `#0c0c0c`, ícone vira vermelho, glow radial sobe do topo.
- **platform-icon**: 56×56, rounded 14px, border line-2, gradient sutil. Conteúdo SVG 26×26 stroke 1.5.

**6 células** (em ordem):

| # | Ícone | Título | Descrição |
|---|---|---|---|
| 1 | nó central conectado a 4 nós | Orquestração Central | Um único fluxo unificado, do briefing à entrega. |
| 2 | 3 barras verticais (alturas escalonadas) | Produção em Escala | Conteúdo personalizado com alcance incomparável. |
| 3 | linha em crescimento com pontos | Inteligência Preditiva | Antecipa o que vem a seguir — antes da concorrência. |
| 4 | banco de dados (cilindro com listras) | Backbone Unificado de Dados | Uma única fonte de verdade. Clareza para cada decisão. |
| 5 | alvo concêntrico com mira | Ativação Orientada a Resultado | Investimento em mídia conectado a resultados de negócio. |
| 6 | globo com meridianos | Otimização Localizada | Escala global. Precisão local. |

Use ícones equivalentes de `react-icons/lu` (Lucide) ou desenhe SVGs originais idênticos aos do protótipo (`I = {...}` em `app.jsx`).

---

### 5. SustainedGrowth (organism, id="growth")

- Layout `growth-wrap`: grid 1fr / 1.2fr, gap 60px, align center. Stack <980px.

#### 5a. Coluna esquerda

- Eyebrow: "Track record · Pulsing™".
- H2: "Um histórico de crescimento *sustentado.*" (italic em "sustentado").
- Parágrafo (max-w 460px): "Pulsing estabelece o padrão de liderança em performance e branding — construindo marcas mais fortes e entregando resultados auditáveis, ano após ano."
- Link com underline: "Ver cases completos ↗" (atom Button-Link).

#### 5b. Coluna direita — growth-stats

- 4 linhas, border-top + bottom 1px line, gap 1px sobre bg line (linhas divisórias).
- Cada `.growth-stat`: padding `28px 0`, grid `1fr 1.6fr` align baseline, gap 20px.
  - **Value** (esquerda): Inter 500, `clamp(40px, 5vw, 60px)`, letter-spacing -0.04em.
    - Background gradient `linear-gradient(180deg, #ffffff 0%, #ff3030 110%)` com `background-clip: text` (texto vermelho gradiente).
    - Prefix (R$) e Suffix (%, ×, M) em `font-size: 0.5em–0.55em`, opacity 0.7.
    - Count-up via `useCountUp` ao entrar na viewport (`useInView` threshold 0.4).
  - **Label** (direita): 15px text-fg-3 line-height 1.55.

**Stats** (em ordem):

| Valor | Label |
|---|---|
| 312% | ROAS médio em contas geridas |
| 48 | Marcas ativas na operação |
| R$ 127M | Em mídia gerida nos últimos 12 meses |
| 4.8× | Velocidade média de execução vs. mercado |

---

### 6. News (organism, id="news")

- Section-head em flex row align-end justify-between:
  - Esquerda: eyebrow "Cases · O que está acontecendo" + H2 "Operações reais. *Métricas reais.*"
  - Direita: link "Ver todos os cases ↗".
- **news-grid**: grid 3 colunas (1 <980px), gap 18px.

#### NewsCard

- `flex col`, rounded-card-lg, border 1px line, bg `--bg-2`, min-h 480px, cursor pointer.
- Hover: translateY -4px, border line-2.
- **art** (top, aspect-ratio 5/3): bg radial vermelho 25% partindo bottom + linear `#1a1a1a → #050505`. `::before` grade 30×30 mascarada.
- **delta** (top-right do art): chip mono "+418% receita" (etc), bg `rgba(255,26,26,.12)`, border `rgba(255,26,26,.35)`, color accent.
- **art-content**: centraliza um chart SVG (line "up", line "rise" com ponto final, ou bars).
- **news-meta** (padding 24×26×28): gap 12px col.
  - **news-date**: mono 11px UPPERCASE com linha 22×1px à esquerda. Ex.: "— 14 Maio · 2026 · E-commerce · Moda".
  - **h3**: 19px sans 500.
  - **excerpt**: 14px text-fg-3.
  - **read**: "Ler case completo →" — Inline 13px font-weight 500. Hover → color accent, gap 8→12px.

**3 cards** (default):

| # | Data | Categoria | Título | Excerpt | Delta | Chart |
|---|---|---|---|---|---|---|
| 1 | 14 Maio · 2026 | E-commerce · Moda | Aurea Atelier escala 4,2× a receita em 8 meses de operação. | Reposicionamento de marca + reestruturação de mídia paga em 4 canais. Operação saiu de mídia reativa para um plano com tese e prova. | +418% receita | line "rise" |
| 2 | 07 Maio · 2026 | SaaS B2B | Nodal Systems multiplica MQLs com funil orientado a intent. | Conteúdo de autoridade + SEO técnico + automação de nutrição. Em 6 meses, leads qualificados saltaram mais de 6×. | +612% leads | bars |
| 3 | 28 Abril · 2026 | Health · Clínica | Vertice Clínico corta CAC em 67% e dobra a base de pacientes. | Funil de consulta otimizado, mídia regionalizada e atribuição multitouch. Operação enxuta com time sênior dedicado. | −67% CAC | line "up" |

**Charts (SVG)** — implementar como componentes:
- `<ChartUp />`: path em ascensão suave, área preenchida gradient vermelho→transparente, stroke vermelho 1.2px.
- `<ChartRise />`: como Up mas mais agressivo + círculo vermelho 3px no ponto final.
- `<ChartBars />`: 12 barras (`[22, 30, 28, 42, 38, 56, 64, 60, 78, 72, 90, 86]`), 4 últimas vermelhas, restante branco 25%.

---

### 7. CTAFinal (organism)

- Container rounded-block, padding `100px 60px` (`64px 28px` <720px), border 1px `rgba(255,26,26,.25)`.
- Fundo empilhado:
  - radial vermelho 40% partindo de 50% 100%
  - radial vermelho 12% partindo de 50% 0%
  - linear `#0a0a0a → #050505`
- `::before`: grade 40×40 com máscara radial.
- `::after`: glow vermelho 700×450px blur 70px no rodapé central, animação `ctaGlow` 4s (opacity 0.85↔1).
- **Eyebrow**: "Próximo passo".
- **H2**: "Sua marca está pronta para *pulsar?*" (italic em "pulsar?", color accent).
- **Sub** (max-w 560px): "Diagnóstico gratuito de 30 minutos. Sem pitch, sem proposta forçada — só análise honesta do seu cenário atual e do que faria sentido nos próximos 90 dias."
- **CTAs**: Primary `"Solicitar diagnóstico"` (extra-glow `shadow-btn-red-cta`, padding `17px 30px`) + Ghost `"Ver cases primeiro"`.

---

### 8. StayConnected (organism, id="connected")

- Section `.connected`: padding `100px 28px 60px`, border-top 1px line.
- **H2**: "Vamos *conversar.*" (italic em "conversar").
- **connected-grid**: grid 4 colunas `1.2fr 1fr 1fr 1fr`, gap 40px. `1fr 1fr` <980px. `1fr` <600px.

#### Coluna 1 — Nova conta

- h4 mono: "Nova conta".
- sub 13px text-fg-3: "Conte em uma linha o que você precisa resolver. Respondemos em até 24h úteis."
- **PillForm**: container pill `bg-white/4 border line-2 rounded-full padding 6px`, focus-within → border vermelho. Input transparente sem border. Botão Primary compacto (10×16, 13px) à direita.
- Validação: regex `^[^@]+@[^@.]+\.[^@]+$`. Sucesso: reset + toast "Recebido. Retornamos em até 24h úteis."

#### Coluna 2 — Contato

- h4 "Contato".
- 3 links: `hello@pulsing.co` · `novosnegocios@pulsing.co` · "WhatsApp ↗".

#### Coluna 3 — Operação

- h4 "Operação".
- 3 spans: "Brasil · remoto" · "Seg–Sex · 09h–19h BRT" · "SLA · 24h úteis".

#### Coluna 4 — Siga a Pulsing

- h4 "Siga a Pulsing".
- 5 ícones sociais 40×40 rounded 12px (Instagram, LinkedIn, X, YouTube, WhatsApp).
- Hover: color accent, border-color `rgba(255,26,26,.4)`, translateY -2px, bg `rgba(255,26,26,.08)`.

#### footer-bar (mt-80px, border-top, pt-28)

- Flex justify-between wrap gap-18:
  - Brand compacto: dot 22×22 + "Pulsing™ · 2026"
  - meta mono: "Marketing que pulsa resultados"
  - Links mono: "Privacidade · Termos · Cookies"

---

## Interactions & Behavior

### useReveal()

- IntersectionObserver global, `threshold: 0.12`, `rootMargin: '0px 0px -60px 0px'`.
- Aplica classe `.is-visible` em `.reveal`.
- Transição: `opacity 0.9s + transform translateY(28px → 0)` com `cubic-bezier(.2,.7,.2,1)`.
- Delay via CSS variable `--d`: `<div className="reveal" style={{ '--d': '120ms' }}>`.

### useCountUp(target, isVisible, duration=1800)

- rAF loop, easing `1 - (1 - p)^3`.

### useParticleField (canvas hero)

Ver descrição em **Hero / 2a**. Configurar DPR cap em 2; resize listener; cleanup ao desmontar.

### useScrollState(threshold=24)

- Listener passivo, retorna `boolean`.

### Nav state change

Aplica classe `.scrolled` ao passar `scrollY > 24`. Transição suave em background, backdrop-filter, padding, border.

### Toast

`position: fixed; bottom: 24px;` centralizado. Slide-up 20px + fade. Auto-some em 3s.

### Tweaks (opcional na produção)

O protótipo expõe 4 controles. **NÃO portar para produção** — adote os defaults:
- `accentHue: 0` (vermelho puro)
- `glowIntensity: 1.2`
- `showWordmark: true`
- `particleDensity: 1`

---

## Framer Motion presets

Em `lib/motion.ts`:

```ts
export const ease = [0.2, 0.7, 0.2, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.06 },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease } },
}
```

Use `whileInView` com `viewport={{ once: true, margin: '0px 0px -60px 0px' }}` no lugar do hook `useReveal` se preferir Framer 100%.

---

## Assets

| Arquivo | Origem | Uso |
|---|---|---|
| `assets/laptop.webp` | Fornecido pelo cliente (Laptop - grafico.webp) | Hero (fundo grande, opacidade 55%) + Showcase Connected Capabilities |
| `assets/coins.png` | Fornecido pelo cliente | Reserva (não usado na versão final, manter no projeto) |
| `assets/logo.png` | Fornecido pelo cliente | Favicon + (potencial) marca |

**Recomendação**: gere variantes responsivas do `laptop.webp` via Vite + plugin (`vite-imagetools`) e use `<picture>` com srcset. Faça `<link rel="preload" as="image" />` no `<head>` para o laptop.

---

## SEO

```tsx
<Seo
  title="Pulsing — A agência de marketing e performance construída para o próximo ciclo"
  description="Pulsing é a agência de marketing e performance que constrói marcas para o próximo ciclo. Estratégia, mídia, dado e tecnologia em uma única operação."
  ogImage="/og.png"            // exportar 1200×630 a partir do hero
  themeColor="#000000"
/>
```

Estrutura semântica: `<header>`, `<main>`, `<section aria-labelledby="...">`, `<footer>`. H1 único no hero, H2 em cada seção.

---

## Accessibility checklist

- [ ] Contrast ratio mínimo 4.5:1 (validar `--fg-3` sobre `--bg`).
- [ ] Focus visible em todos elementos interativos (anel vermelho `box-shadow: 0 0 0 3px rgba(255,26,26,.4)`).
- [ ] Botões só-ícone com `aria-label`.
- [ ] Form com `<label>` associado, erros via `aria-live="polite"`.
- [ ] `prefers-reduced-motion` desabilita: canvas particles, parallax do laptop, drift glows, float, pulse-dot, marquee.
- [ ] Toast com `role="status" aria-live="polite"`.
- [ ] Imagem `<img alt="Dashboard de performance — Pulsing">` no showcase. `alt=""` (decorativo) no hero.
- [ ] Skip link `<a href="#main">Pular para o conteúdo</a>`.

---

## Performance checklist

- [ ] `loading="lazy"` em imagens abaixo do fold.
- [ ] `decoding="async"` em todas as imagens.
- [ ] Preload do `laptop.webp` no `<head>`.
- [ ] Code-split com `React.lazy` para `News`, `StayConnected`.
- [ ] Fontes via `display=swap` + preconnect.
- [ ] CSS crítico inline (Vite plugin opcional).
- [ ] Animações apenas em `transform` e `opacity`.
- [ ] `will-change: transform` no estado pré-animação.
- [ ] Canvas com DPR cap em 2, pausa quando offscreen (IntersectionObserver).
- [ ] Lighthouse: Performance ≥ 90, A11y ≥ 95, SEO 100.
- [ ] Bundle gz < 180KB (sem imagens).

---

## Files in this bundle

```
design_handoff_pulsing_landing/
├── README.md             ← este arquivo
├── index.html            ← protótipo de referência (v2)
├── styles.css            ← CSS final do protótipo (tokens e detalhes)
├── app.jsx               ← composição React (lógica e copy exatos)
├── tweaks-panel.jsx      ← painel de tweaks (NÃO portar)
├── archive/              ← v1 anterior (para comparação histórica, NÃO usar)
│   ├── Pulsing v1.html
│   ├── styles-v1.css
│   └── app-v1.jsx
└── assets/
    ├── laptop.webp       ← MacBook com dashboard, peça-chave
    ├── coins.png         ← legado
    └── logo.png
```

**Como usar**: abra `index.html` em um servidor local para ver o protótipo funcionando. Use-o como verdade visual e comportamental enquanto reconstrói no Vite + React + TS + Tailwind + Framer Motion seguindo a estrutura Atomic acima.

---

## Open questions para o dev confirmar com o cliente

1. **Cases**: nomes (Aurea Atelier, Nodal Systems, etc.) são placeholders. Substituir por cases reais com permissão.
2. **WhatsApp**: número real para o link `wa.me/`.
3. **E-mails**: `hello@pulsing.co` e `novosnegocios@pulsing.co` são placeholders.
4. **Sociais**: URLs reais.
5. **i18n**: o protótipo é em pt-BR. Precisa multilíngue?
6. **Backend do form**: integração com qual provedor (Formspree, Resend, HubSpot, n8n, etc.)?
7. **Analytics**: GA4, Plausible, PostHog?
8. **Cookie banner**: LGPD precisa ser implementado?
9. **Dashboard do laptop**: a imagem mostra Google Ads — manter genérico ou produzir versão custom com o branding Pulsing?
