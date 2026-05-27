/* -----------------------------
   Design tokens and reset
------------------------------ */
:root {
    color-scheme: dark;
    --bg: #08090d;
    --bg-soft: #0d1017;
    --surface: rgba(18, 22, 30, 0.72);
    --surface-strong: rgba(22, 27, 37, 0.92);
    --border: rgba(255, 255, 255, 0.12);
    --border-strong: rgba(255, 255, 255, 0.22);
    --text: #f4f7fb;
    --text-soft: #c8d0dc;
    --muted: #8b96a7;
    --accent: #66e3c4;
    --accent-2: #8ab4ff;
    --accent-3: #f4c95d;
    --shadow: 0 24px 70px rgba(0, 0, 0, 0.36);
    --shadow-soft: 0 14px 42px rgba(0, 0, 0, 0.24);
    --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --radius: 8px;
    --header-height: 76px;
    --max-width: 1180px;
    --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height);
}

body {
    min-height: 100vh;
    overflow-x: hidden;
    background:
        linear-gradient(180deg, rgba(102, 227, 196, 0.08), transparent 34rem),
        linear-gradient(125deg, rgba(138, 180, 255, 0.10), transparent 42%),
        var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    line-height: 1.7;
    letter-spacing: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: "cv02", "cv03", "cv04", "ss01";
}

body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 72px 72px;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 82%);
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 82%);
}

body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0.16;
    background-image:
        repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 3px);
    mix-blend-mode: overlay;
}

body.nav-open {
    overflow: hidden;
}

img {
    display: block;
    max-width: 100%;
}

a {
    color: inherit;
}

button,
a {
    -webkit-tap-highlight-color: transparent;
}

button {
    border: 0;
    font: inherit;
}

::selection {
    background: rgba(102, 227, 196, 0.28);
    color: var(--text);
}

.skip-link {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 100;
    transform: translateY(-150%);
    border-radius: var(--radius);
    background: var(--accent);
    color: #06100d;
    padding: 0.75rem 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: transform 180ms ease;
}

.skip-link:focus {
    transform: translateY(0);
}

:focus-visible {
    outline: 3px solid rgba(102, 227, 196, 0.72);
    outline-offset: 4px;
}

/* -----------------------------
   Header and navigation
------------------------------ */
.site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid transparent;
    background: rgba(8, 9, 13, 0.78);
    backdrop-filter: blur(18px);
    transition: border-color 220ms var(--ease-out), box-shadow 220ms var(--ease-out), background 220ms var(--ease-out);
}

.site-header.is-scrolled {
    border-color: var(--border);
    background: rgba(8, 9, 13, 0.92);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}

.nav {
    width: min(100%, var(--max-width));
    height: var(--header-height);
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    font-weight: 800;
}

.brand-mark {
    width: 2.6rem;
    height: 2.6rem;
    display: grid;
    place-items: center;
    border-radius: var(--radius);
    background: linear-gradient(135deg, var(--accent), var(--accent-3));
    color: #08110f;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    box-shadow: 0 12px 30px rgba(102, 227, 196, 0.20);
    transition: transform 220ms var(--ease-out), box-shadow 220ms var(--ease-out);
}

.brand:hover .brand-mark {
    transform: translateY(-1px);
    box-shadow: 0 16px 42px rgba(102, 227, 196, 0.28);
}

.brand-text {
    color: var(--text);
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.nav-list {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    list-style: none;
}

.nav-link {
    display: inline-flex;
    align-items: center;
    min-height: 2.55rem;
    border-radius: var(--radius);
    padding: 0 0.8rem;
    color: var(--text-soft);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 180ms var(--ease-out), color 180ms var(--ease-out), transform 180ms var(--ease-out);
}

.nav-link:hover,
.nav-link.is-active {
    background: rgba(255, 255, 255, 0.07);
    color: var(--text);
}

.nav-link:hover {
    transform: translateY(-1px);
}

.nav-toggle {
    position: relative;
    width: 2.75rem;
    height: 2.75rem;
    display: none;
    place-items: center;
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.07);
    color: var(--text);
    cursor: pointer;
}

.nav-toggle span {
    position: absolute;
    width: 1.2rem;
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transition: transform 200ms ease;
}

.nav-toggle span:first-child {
    transform: translateY(-0.24rem);
}

.nav-toggle span:last-child {
    transform: translateY(0.24rem);
}

.nav-toggle[aria-expanded="true"] span:first-child {
    transform: rotate(45deg);
}

.nav-toggle[aria-expanded="true"] span:last-child {
    transform: rotate(-45deg);
}

/* -----------------------------
   Buttons and common elements
------------------------------ */
.button {
    position: relative;
    overflow: hidden;
    min-height: 2.8rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: var(--radius);
    padding: 0 1rem;
    font-weight: 800;
    text-decoration: none;
    transition: transform 220ms var(--ease-out), border-color 220ms var(--ease-out), background 220ms var(--ease-out), box-shadow 220ms var(--ease-out);
}

.button::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 0 30%, rgba(255, 255, 255, 0.32) 46%, transparent 62% 100%);
    opacity: 0;
    transform: translateX(-75%);
    transition: opacity 220ms var(--ease-out), transform 580ms var(--ease-out);
}

.button:hover::before {
    opacity: 0.7;
    transform: translateX(75%);
}

.button:hover {
    transform: translateY(-2px);
}

.button:active {
    transform: translateY(0);
}

.button-small {
    min-height: 2.45rem;
    font-size: 0.9rem;
}

.button-primary {
    background: linear-gradient(135deg, var(--accent), #d7fff3);
    color: #06100d;
    box-shadow: 0 18px 45px rgba(102, 227, 196, 0.18);
}

.button-secondary {
    border-color: rgba(138, 180, 255, 0.34);
    background: rgba(138, 180, 255, 0.10);
    color: var(--text);
}

.button-outline {
    border-color: var(--border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text);
}

.button-outline:hover,
.button-secondary:hover {
    border-color: var(--border-strong);
    background: rgba(255, 255, 255, 0.08);
}

.text-link {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    color: var(--accent);
    font-weight: 800;
    text-decoration: none;
    transition: color 180ms var(--ease-out), transform 180ms var(--ease-out);
}

.text-link:hover {
    color: #d7fff3;
    transform: translateX(2px);
}

.glass-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.035)),
        var(--surface);
    box-shadow: var(--shadow);
    backdrop-filter: blur(18px);
    transform: translate3d(0, 0, 0);
    transition: transform 300ms var(--ease-out), border-color 300ms var(--ease-out), background 300ms var(--ease-out), box-shadow 300ms var(--ease-out);
}

.glass-card::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0;
    background:
        linear-gradient(120deg, rgba(102, 227, 196, 0.11), transparent 30%),
        linear-gradient(300deg, rgba(244, 201, 93, 0.08), transparent 34%);
    transition: opacity 300ms var(--ease-out);
}

.glass-card:hover {
    transform: translateY(-6px);
    border-color: rgba(102, 227, 196, 0.28);
    background:
        linear-gradient(180deg, rgba(102, 227, 196, 0.10), rgba(255, 255, 255, 0.035)),
        var(--surface-strong);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
}

.glass-card:hover::after {
    opacity: 1;
}

.section {
    width: min(100%, var(--max-width));
    margin: 0 auto;
    padding: 6.5rem 1.5rem;
    scroll-margin-top: var(--header-height);
}

.section-heading {
    max-width: 780px;
    margin-bottom: 2.5rem;
}

.eyebrow {
    margin-bottom: 0.65rem;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
}

h1,
h2,
h3 {
    line-height: 1.08;
    color: var(--text);
    letter-spacing: 0;
}

h2 {
    max-width: 850px;
    font-size: 2.65rem;
    text-wrap: balance;
}

h3 {
    font-size: 1.15rem;
    text-wrap: balance;
}

p {
    color: var(--text-soft);
    text-wrap: pretty;
}

.section-lede {
    margin-top: 1rem;
    max-width: 720px;
    font-size: 1.02rem;
}

/* -----------------------------
   Hero
------------------------------ */
.hero {
    position: relative;
    min-height: calc(88vh - var(--header-height));
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 3rem 1.5rem 2rem;
}

.hero::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
        linear-gradient(120deg, rgba(102, 227, 196, 0.14), transparent 34%),
        linear-gradient(250deg, rgba(244, 201, 93, 0.10), transparent 45%),
        linear-gradient(0deg, rgba(8, 9, 13, 0.15), rgba(8, 9, 13, 0.88));
}

.hero-market-grid {
    position: absolute;
    inset: 0;
    z-index: -1;
    opacity: 0.42;
    background-image:
        linear-gradient(115deg, transparent 0 48%, rgba(102, 227, 196, 0.18) 49%, transparent 51%),
        linear-gradient(65deg, transparent 0 55%, rgba(138, 180, 255, 0.16) 56%, transparent 58%);
    background-size: 460px 280px, 360px 220px;
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.95), transparent 86%);
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.95), transparent 86%);
    animation: market-grid-drift 28s linear infinite;
}

.hero-shell {
    width: min(100%, var(--max-width));
    margin: 0 auto;
    text-align: center;
}

.portrait-frame {
    width: 4.25rem;
    height: 4.25rem;
    margin: 0 auto 0.9rem;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 50%;
    background:
        linear-gradient(135deg, rgba(102, 227, 196, 0.36), rgba(244, 201, 93, 0.28)),
        rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 52px rgba(0, 0, 0, 0.36);
}

.portrait-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.portrait-frame.is-missing::before {
    content: "YS";
    color: #07100d;
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 700;
}

.hero-kicker {
    margin-bottom: 0.65rem;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 600;
    text-transform: uppercase;
}

.hero h1 {
    font-size: 4.05rem;
    font-weight: 800;
    text-wrap: balance;
}

.hero-title {
    max-width: 960px;
    margin: 0.9rem auto 0;
    color: var(--text);
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1.45;
}

.hero-copy {
    max-width: 930px;
    margin: 0.85rem auto 0;
    font-size: 1rem;
}

.hero-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin: 1.15rem auto 0;
}

.hero-tags span {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    border: 1px solid rgba(102, 227, 196, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.045);
    color: var(--text-soft);
    padding: 0.28rem 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
}

.hero-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 1.45rem;
}

.metric-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
    text-align: left;
}

.highlight-band {
    position: relative;
    z-index: 4;
    width: min(100%, var(--max-width));
    margin: -1.75rem auto 0;
    padding: 0 1.5rem 2rem;
}

.highlight-band .metric-strip {
    margin-top: 0;
}

.metric-strip > div {
    min-height: 4.85rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: rgba(14, 17, 24, 0.72);
    padding: 0.75rem 0.85rem;
    backdrop-filter: blur(16px);
    box-shadow: var(--shadow-soft);
    transition: border-color 220ms var(--ease-out), transform 220ms var(--ease-out), background 220ms var(--ease-out);
}

.metric-strip > div:hover {
    transform: translateY(-3px);
    border-color: rgba(102, 227, 196, 0.24);
    background: rgba(18, 23, 31, 0.88);
}

.metric-strip dt {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 600;
}

.metric-strip dd {
    margin-top: 0.45rem;
    color: var(--text);
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.25;
}

/* -----------------------------
   About
------------------------------ */
.about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
    gap: 2rem;
    align-items: start;
}

.about {
    padding-top: 2rem;
}

.about-copy {
    max-width: 760px;
    font-size: 1.04rem;
}

.about-copy p + p {
    margin-top: 1.1rem;
}

.focus-list {
    display: grid;
    gap: 0.8rem;
}

.focus-item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.9rem;
    align-items: start;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.045);
    padding: 1rem;
}

.focus-number {
    color: var(--accent-3);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
}

/* -----------------------------
   Timeline
------------------------------ */
.timeline {
    position: relative;
    display: grid;
    gap: 1.2rem;
}

.timeline::before {
    content: "";
    position: absolute;
    top: 1.2rem;
    bottom: 1.2rem;
    left: 1.32rem;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent), rgba(138, 180, 255, 0.22), transparent);
}

.timeline-item {
    position: relative;
    padding: 1.4rem 1.4rem 1.4rem 4rem;
}

.timeline-marker {
    position: absolute;
    top: 1.8rem;
    left: 1rem;
    width: 0.68rem;
    height: 0.68rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 6px rgba(102, 227, 196, 0.10);
}

.timeline-meta {
    margin-bottom: 0.55rem;
    color: var(--accent-2);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 600;
}

.clean-list {
    display: grid;
    gap: 0.7rem;
    margin: 1rem 0;
    padding-left: 1.1rem;
    color: var(--text-soft);
}

.compact-list {
    gap: 0.45rem;
}

.clean-list li::marker {
    color: var(--accent);
}

/* -----------------------------
   Projects and competitions
------------------------------ */
.project-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;
}

.project-card {
    min-height: 23rem;
    grid-column: span 3;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.35rem;
}

.project-card-large {
    grid-column: span 6;
    min-height: 20rem;
}

.project-card::before,
.competition-card::before,
.education-card::before,
.skill-panel::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
    opacity: 0.72;
}

.project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.1rem;
    color: var(--accent-2);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
}

.project-card h3 {
    margin-bottom: 0.85rem;
    font-size: 1.45rem;
}

.project-card p {
    max-width: 68ch;
}

.project-visual {
    position: relative;
    min-height: 8rem;
    margin-top: 1.25rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: var(--radius);
    background:
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        rgba(5, 8, 12, 0.34);
    background-size: 24px 24px;
}

.visual-graph::before,
.visual-graph::after {
    content: "";
    position: absolute;
    inset: 22% 12%;
    border-top: 1px solid rgba(102, 227, 196, 0.36);
    border-right: 1px solid rgba(138, 180, 255, 0.24);
    transform: skew(-17deg);
}

.visual-graph::after {
    inset: 42% 18% 18% 10%;
    border-color: rgba(244, 201, 93, 0.28);
    transform: skew(19deg);
}

.visual-graph span {
    position: absolute;
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 24px rgba(102, 227, 196, 0.42);
}

.visual-graph span:nth-child(1) { top: 24%; left: 12%; }
.visual-graph span:nth-child(2) { top: 18%; left: 42%; }
.visual-graph span:nth-child(3) { top: 34%; left: 72%; }
.visual-graph span:nth-child(4) { top: 62%; left: 26%; background: var(--accent-2); }
.visual-graph span:nth-child(5) { top: 58%; left: 56%; background: var(--accent-3); }
.visual-graph span:nth-child(6) { top: 70%; left: 82%; background: var(--accent-2); }

.visual-market {
    display: flex;
    align-items: end;
    gap: 0.55rem;
    padding: 1rem;
}

.visual-market span {
    flex: 1;
    height: var(--bar);
    min-height: 1.8rem;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(180deg, var(--accent), rgba(138, 180, 255, 0.22));
    box-shadow: 0 -8px 28px rgba(102, 227, 196, 0.16);
}

.visual-survival::before {
    content: "";
    position: absolute;
    inset: 1.25rem;
    background:
        linear-gradient(90deg, var(--accent) 0 22%, transparent 22% 28%, var(--accent-2) 28% 48%, transparent 48% 56%, var(--accent-3) 56% 74%, transparent 74% 82%, rgba(255, 255, 255, 0.46) 82% 100%);
    height: 2px;
    top: 50%;
}

.visual-survival span {
    position: absolute;
    width: 2px;
    background: rgba(255, 255, 255, 0.34);
}

.visual-survival span:nth-child(1) { height: 46%; left: 22%; top: 28%; }
.visual-survival span:nth-child(2) { height: 34%; left: 48%; top: 36%; }
.visual-survival span:nth-child(3) { height: 52%; left: 74%; top: 24%; }
.visual-survival span:nth-child(4) { height: 24%; left: 82%; top: 42%; }

.card-footer {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
}

.tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag-row span,
.skill-tags span {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.055);
    color: var(--text-soft);
    padding: 0.35rem 0.6rem;
    font-size: 0.84rem;
    font-weight: 700;
}

.competition-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.competition-card {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 11rem 1fr;
    gap: 1.5rem;
    padding: 1.4rem;
}

.competition-aside {
    display: grid;
    align-content: start;
    gap: 0.45rem;
    border-right: 1px solid var(--border);
    padding-right: 1.2rem;
}

.competition-aside span {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
}

.competition-aside strong {
    color: var(--accent-3);
    font-size: 1.55rem;
    line-height: 1.1;
}

/* -----------------------------
   Skills and education
------------------------------ */
.skills-layout,
.education-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.skill-panel,
.education-card {
    position: relative;
    overflow: hidden;
    padding: 1.35rem;
}

.skill-panel h3,
.education-card h3 {
    margin-bottom: 0.85rem;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.skill-tags span {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 420ms ease, transform 420ms ease, border-color 180ms ease, color 180ms ease;
    transition-delay: var(--delay, 0ms);
}

.skill-tags span.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.skill-tags span:hover {
    border-color: rgba(102, 227, 196, 0.36);
    color: var(--text);
}

.degree {
    margin-bottom: 0.75rem;
    color: var(--text);
    font-weight: 800;
}

.education-card .tag-row {
    margin-top: 1rem;
}

/* -----------------------------
   Contact and footer
------------------------------ */
.contact {
    padding-bottom: 5rem;
}

.contact-panel {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 2rem;
    align-items: center;
    padding: 2rem;
}

.contact-panel h2 {
    font-size: 2rem;
}

.contact-panel p:last-child {
    margin-top: 0.75rem;
}

.contact-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.7rem;
}

.site-footer {
    border-top: 1px solid var(--border);
    padding: 2rem 1.5rem;
    text-align: center;
}

.site-footer p {
    color: var(--muted);
    font-size: 0.92rem;
}

/* -----------------------------
   Resume page
------------------------------ */
.resume-page {
    background:
        linear-gradient(180deg, rgba(102, 227, 196, 0.07), transparent 24rem),
        linear-gradient(135deg, rgba(138, 180, 255, 0.08), transparent 46%),
        var(--bg);
}

.resume-nav {
    opacity: 1;
    pointer-events: auto;
}

.resume-shell {
    width: min(100%, 980px);
    margin: 0 auto;
    padding: 4rem 1.5rem 5rem;
}

.resume-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 2rem;
    align-items: end;
    padding: 2rem;
}

.resume-hero h1 {
    font-size: 3rem;
}

.resume-subtitle {
    margin-top: 0.7rem;
    color: var(--text);
    font-weight: 700;
}

.resume-links {
    display: grid;
    gap: 0.45rem;
    justify-items: end;
    color: var(--text-soft);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 600;
}

.resume-links a {
    color: var(--accent);
    text-decoration: none;
}

.resume-links a:hover {
    color: #d7fff3;
}

.resume-section {
    margin-top: 1rem;
    padding: 1.5rem;
}

.resume-section h2 {
    margin-bottom: 1rem;
    font-size: 1.55rem;
}

.resume-entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.7rem 1rem;
    padding-top: 1rem;
}

.resume-entry + .resume-entry {
    margin-top: 1rem;
    border-top: 1px solid var(--border);
}

.resume-entry h3 {
    font-size: 1.05rem;
}

.resume-entry > span {
    color: var(--accent-2);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
}

.resume-entry .clean-list {
    grid-column: 1 / -1;
    margin-bottom: 0;
}

.resume-skill-grid {
    display: grid;
    gap: 0.75rem;
}

.resume-skill-grid strong {
    color: var(--text);
}

/* -----------------------------
   Scroll reveal animations
------------------------------ */
[data-reveal] {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 640ms ease, transform 640ms ease;
    transition-delay: var(--reveal-delay, 0ms);
}

[data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
}

@keyframes market-grid-drift {
    from {
        background-position: 0 0, 0 0;
    }

    to {
        background-position: 460px 280px, -360px 220px;
    }
}

/* -----------------------------
   Responsive layout
------------------------------ */
@media (max-width: 980px) {
    .nav-toggle {
        display: grid;
    }

    .nav-menu {
        position: fixed;
        top: calc(var(--header-height) + 0.75rem);
        left: 1rem;
        right: 1rem;
        display: grid;
        gap: 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: rgba(12, 15, 21, 0.97);
        padding: 1rem;
        box-shadow: var(--shadow);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-0.75rem);
        transition: opacity 180ms ease, transform 180ms ease;
    }

    .nav-menu.is-open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    .resume-nav {
        position: static;
        display: flex;
        width: auto;
        border: 0;
        background: transparent;
        padding: 0;
        box-shadow: none;
        opacity: 1;
        pointer-events: auto;
        transform: none;
    }

    .nav-list {
        display: grid;
        gap: 0.2rem;
    }

    .nav-link,
    .nav-menu .button {
        width: 100%;
        justify-content: flex-start;
    }

    .resume-nav .button {
        width: auto;
        justify-content: center;
    }

    .hero h1 {
        font-size: 3.75rem;
    }

    h2 {
        font-size: 2.15rem;
    }

    .metric-strip,
    .about-grid,
    .competition-grid,
    .skills-layout,
    .education-grid,
    .contact-panel,
    .resume-hero,
    .resume-entry {
        grid-template-columns: 1fr;
    }

    .highlight-band .metric-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .project-card,
    .project-card-large {
        grid-column: 1 / -1;
    }

    .competition-card {
        grid-template-columns: 1fr;
    }

    .competition-aside {
        border-right: 0;
        border-bottom: 1px solid var(--border);
        padding-right: 0;
        padding-bottom: 1rem;
    }

    .contact-actions {
        justify-content: flex-start;
    }

    .resume-links {
        justify-items: start;
    }
}

@media (max-width: 620px) {
    :root {
        --header-height: 68px;
    }

    .nav {
        padding: 0 1rem;
    }

    .brand-text {
        display: none;
    }

    .resume-nav {
        gap: 0.5rem;
    }

    .resume-nav .button {
        min-height: 2.35rem;
        padding: 0 0.7rem;
        font-size: 0.78rem;
    }

    .hero {
        min-height: auto;
        padding: 3.25rem 1rem 2.45rem;
    }

    .hero h1 {
        font-size: 2.75rem;
    }

    .hero-title {
        font-size: 1.06rem;
    }

    .hero-copy {
        font-size: 0.96rem;
    }

    .portrait-frame {
        width: 3.85rem;
        height: 3.85rem;
    }

    .hero-tags {
        gap: 0.45rem;
    }

    .hero-tags span {
        font-size: 0.68rem;
        padding: 0.25rem 0.55rem;
    }

    .hero-actions,
    .contact-actions {
        display: grid;
        grid-template-columns: 1fr;
    }

    .button {
        width: 100%;
    }

    .highlight-band {
        margin-top: -1.5rem;
        padding: 0 1rem 1rem;
    }

    .highlight-band .metric-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.65rem;
        margin-top: 0;
    }

    .highlight-band .metric-strip > div {
        min-height: 4.4rem;
        padding: 0.65rem;
    }

    .highlight-band .metric-strip dt {
        font-size: 0.68rem;
    }

    .highlight-band .metric-strip dd {
        font-size: 0.92rem;
    }

    .section {
        padding: 4.5rem 1rem;
    }

    h2 {
        font-size: 1.85rem;
    }

    .timeline::before {
        left: 0.62rem;
    }

    .timeline-item {
        padding: 1.25rem 1rem 1.25rem 2.25rem;
    }

    .timeline-marker {
        left: 0.3rem;
    }

    .project-card {
        min-height: auto;
    }

    .project-visual {
        min-height: 6.5rem;
    }

    .contact-panel {
        padding: 1.25rem;
    }

    .resume-shell {
        padding: 2rem 1rem 4rem;
    }

    .resume-hero,
    .resume-section {
        padding: 1.25rem;
    }

    .resume-hero h1 {
        font-size: 2.35rem;
    }
}

@media print {
    :root {
        color-scheme: light;
    }

    body,
    .resume-page {
        background: #ffffff;
        color: #101217;
    }

    body::before,
    body::after,
    .site-header,
    .skip-link {
        display: none;
    }

    .resume-shell {
        width: 100%;
        padding: 0;
    }

    .glass-card,
    .resume-section,
    .resume-hero {
        border: 0;
        background: #ffffff;
        box-shadow: none;
        break-inside: avoid;
    }

    .resume-section {
        margin-top: 0.6rem;
        padding: 0.35rem 0;
    }

    .resume-hero {
        padding: 0 0 0.4rem;
        border-bottom: 1px solid #d8dde7;
    }

    h1,
    h2,
    h3,
    p,
    li,
    .resume-subtitle,
    .resume-skill-grid strong {
        color: #101217;
    }

    .clean-list {
        color: #2f3744;
    }

    a {
        color: #101217;
        text-decoration: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
    }

    [data-reveal],
    .skill-tags span {
        opacity: 1;
        transform: none;
    }

    .hero-market-grid {
        animation: none;
    }
}
