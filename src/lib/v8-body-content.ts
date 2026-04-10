export const v8BodyHtml = `

<nav id="mainnav">
  <a class="nlogo" href="#">
    <div class="nlogo-mark"><img loading="eager" src="/images/logo.webp" alt="Renewable Ireland" style="display:block;height:56px;width:auto"></div>
    <div class="nbrand" style="color:var(--white)">Renewable Ireland<span style="color:rgba(255,255,255,.7)">SEAI Registered Partner</span></div>
  </a>
  <ul class="nlinks">
    <li><a href="#get-started">Get Started</a></li>
    <li><a href="#calculator">Calculator</a></li>
    <li><a href="#grants">SEAI Grants</a></li>
    <li><a href="#areas">Counties</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#" onclick="openPortal();return false">Track Project</a></li>
    <li><a class="ncta" href="#get-started">Free Quote</a></li>
  </ul>
</nav>

<section class="hero">
  <div class="hero-left">
    <div class="hero-tag">SEAI Registered · Serving All of Ireland</div>
    <h1>Cut your<br>energy bills.<br><span class="lime">Power your</span><br><span class="earth">home with</span><br>Renewable Ireland.</h1>
    <p class="hero-sub">From first call to live panels in 4–5 weeks.</p>
    <div class="hero-actions">
      <a class="btn-p" href="#get-started">See your savings <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      <a class="btn-o" href="#how-it-works">How it works</a>
    </div>
    <div class="hero-trust">
      <div class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>SEAI Certified</div>
      <div class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>200+ Installs</div>
      <div class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>Live Tracking</div>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-logo-wrap"><img loading="lazy" src="/images/hero-solar.webp" alt="Solar panel installation on Irish home" alt="Ireland map" style="width:100%;height:auto;object-fit:contain;display:block;filter:drop-shadow(0 8px 32px rgba(0,0,0,0.18)) drop-shadow(0 2px 8px rgba(0,0,0,0.10))"></div>
    <div class="hero-stats">
      <div class="hstat"><div class="hstat-val"><em>€</em>1,240</div><div class="hstat-lbl">Average Saving/Year</div></div>
      <div class="hstat"><div class="hstat-val"><em>€</em>1,800</div><div class="hstat-lbl">Max SEAI Grant</div></div>
      <div class="hstat"><div class="hstat-val">5<em style="color:var(--lime-dk);font-style:normal;font-size:13px;letter-spacing:1px;margin-left:5px">★★★★★</em></div><div class="hstat-lbl">Google Rating</div></div>
      <div class="hstat"><div class="hstat-val">1<em style="font-size:16px"> day</em></div><div class="hstat-lbl">Installation</div></div>
    </div>
  </div>
</section>

<!-- TRUST STRIP -->
<div class="tstrip">
  <div class="tsi">
    <div class="tsi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div>
    <div class="tsi-text"><strong>SEAI Registered</strong><span>Grant eligible</span></div>
  </div>
  <div class="tsi">
    <a href="https://g.page/r/CRenewableIreland/review" target="_blank" rel="noopener" aria-label="Read our Google Reviews" style="display:flex;align-items:center;text-decoration:none"><div class="tsi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg></div></a>
    <div class="tsi-text"><strong>5-Star Rated</strong><span>87 Google reviews</span></div>
  </div>
  <div class="tsi">
    <div class="tsi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg></div>
    <div class="tsi-text"><strong>1-Day Install</strong><span>Live same day</span></div>
  </div>
  <div class="tsi">
    <div class="tsi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"/></svg></div>
    <div class="tsi-text"><strong>Live Tracking</strong><span>Real-time portal</span></div>
  </div>
  <div class="tsi">
    <div class="tsi-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg></div>
    <div class="tsi-text"><strong>All of Ireland</strong><span>Local installers</span></div>
  </div>
</div>

<!-- TRUST LOGOS ROW -->
<div class="tlogos">
  <span class="tlogos-label">Certified &amp; trusted by</span>
  <div class="tlogos-track">
    <div class="tlogos-inner">
    <!-- Solis -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="20" r="9" fill="#E8311A"/>
        <circle cx="16" cy="20" r="5" fill="white"/>
        <text x="34" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="22" fill="#E8311A">Solis</text>
      </svg>
    </div>
    <!-- SolaX -->
    <div class="tlogo-item">
      <svg height="36" viewBox="0 0 130 48" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" font-family="Arial Black,sans-serif" font-weight="900" font-size="28" letter-spacing="-1"><tspan fill="#231815">SOLA</tspan><tspan fill="#F5A800">X</tspan></text>
        <text x="2" y="44" font-family="Arial,sans-serif" font-weight="700" font-size="11" fill="#231815" letter-spacing="3">POWER</text>
      </svg>
    </div>
    <!-- myenergi -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 145 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="#1A1A1A">my</text>
        <text x="30" y="28" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="#00B140">energi</text>
      </svg>
    </div>
    <!-- Sigenergy -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial Black,sans-serif" font-weight="900" font-size="22" fill="#1B2D5B">Sigenergy</text>
      </svg>
    </div>
    <!-- Renusol -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 175 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="24"><tspan fill="#E8311A">renu</tspan><tspan fill="#1A1A1A">sol</tspan></text>
      </svg>
    </div>
    <!-- Ohme -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="24" fill="#00C896">Ohme</text>
      </svg>
    </div>
    <!-- AIKO -->
    <div class="tlogo-item">
      <svg height="36" viewBox="0 0 120 44" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="22" letter-spacing="1" fill="#1A1A1A">AIKO</text>
        <rect x="92" y="4" width="12" height="12" fill="#FF6B00" opacity="0.9"/>
        <rect x="100" y="12" width="12" height="12" fill="#FF6B00" opacity="0.6"/>
      </svg>
    </div>
    <!-- Trina Solar -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,4 28,28 4,28" fill="#E8002A"/>
        <text x="38" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="20" fill="#1A1A1A">Trina</text>
        <text x="93" y="28" font-family="Arial,sans-serif" font-weight="400" font-size="20" fill="#E8002A">Solar</text>
      </svg>
    </div>
    <!-- Jinko Solar -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="900" font-size="21" fill="#005BAA">Jinko</text>
        <text x="68" y="28" font-family="Arial,sans-serif" font-weight="400" font-size="21" fill="#F7A800">Solar</text>
      </svg>
    </div>
    <!-- Solis -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="20" r="9" fill="#E8311A"/>
        <circle cx="16" cy="20" r="5" fill="white"/>
        <text x="34" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="22" fill="#E8311A">Solis</text>
      </svg>
    </div>
    <!-- SolaX -->
    <div class="tlogo-item">
      <svg height="36" viewBox="0 0 130 48" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" font-family="Arial Black,sans-serif" font-weight="900" font-size="28" letter-spacing="-1"><tspan fill="#231815">SOLA</tspan><tspan fill="#F5A800">X</tspan></text>
        <text x="2" y="44" font-family="Arial,sans-serif" font-weight="700" font-size="11" fill="#231815" letter-spacing="3">POWER</text>
      </svg>
    </div>
    <!-- myenergi -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 145 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="#1A1A1A">my</text>
        <text x="30" y="28" font-family="Arial,sans-serif" font-weight="900" font-size="20" fill="#00B140">energi</text>
      </svg>
    </div>
    <!-- Sigenergy -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial Black,sans-serif" font-weight="900" font-size="22" fill="#1B2D5B">Sigenergy</text>
      </svg>
    </div>
    <!-- Renusol -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 175 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="24"><tspan fill="#E8311A">renu</tspan><tspan fill="#1A1A1A">sol</tspan></text>
      </svg>
    </div>
    <!-- Ohme -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="24" fill="#00C896">Ohme</text>
      </svg>
    </div>
    <!-- AIKO -->
    <div class="tlogo-item">
      <svg height="36" viewBox="0 0 120 44" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="22" letter-spacing="1" fill="#1A1A1A">AIKO</text>
        <rect x="92" y="4" width="12" height="12" fill="#FF6B00" opacity="0.9"/>
        <rect x="100" y="12" width="12" height="12" fill="#FF6B00" opacity="0.6"/>
      </svg>
    </div>
    <!-- Trina Solar -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,4 28,28 4,28" fill="#E8002A"/>
        <text x="38" y="28" font-family="Arial,sans-serif" font-weight="800" font-size="20" fill="#1A1A1A">Trina</text>
        <text x="93" y="28" font-family="Arial,sans-serif" font-weight="400" font-size="20" fill="#E8002A">Solar</text>
      </svg>
    </div>
    <!-- Jinko Solar -->
    <div class="tlogo-item">
      <svg height="32" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="28" font-family="Arial,sans-serif" font-weight="900" font-size="21" fill="#005BAA">Jinko</text>
        <text x="68" y="28" font-family="Arial,sans-serif" font-weight="400" font-size="21" fill="#F7A800">Solar</text>
      </svg>
    </div>
    </div>
  </div>
</div>

<!-- WIDGET -->
<div class="wsec" id="get-started">
  <div class="wgrid">
    <div class="rev">
      <div class="stag" style="color:rgba(255,255,255,.4);margin-bottom:12px"><span style="background:rgba(255,255,255,.08);border-radius:var(--pill);padding:4px 12px;letter-spacing:.08em">★ Start your solar journey</span></div>
      <h2 style="font-size:clamp(32px,3.8vw,52px);font-weight:800;letter-spacing:-.02em;line-height:.95;color:var(--white);text-transform:uppercase;margin-bottom:16px">Two ways in.<br>One platform<br><span style="color:var(--lime)">all the way through.</span></h2>
      <p style="font-size:15px;color:rgba(255,255,255,.55);max-width:420px;line-height:1.75;margin-bottom:24px">Upload your electricity bill for an AI-powered estimate — or fill in the quick form. Either way you go straight into your project portal.</p>
      <div class="jrny">
        <div class="ji"><div class="jdot jd-done">✓</div><div><div class="jtitle">Instant quote in 30 seconds</div><div class="jsub">Upload your bill — we'll show your savings immediately</div></div><div class="jchk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg></div></div>
        <div class="ji"><div class="jdot jd-done">✓</div><div><div class="jtitle">Fixed price the next day</div><div class="jsub">SEAI grant deducted — no hidden costs, ever</div></div><div class="jchk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg></div></div>
        <div class="ji"><div class="jdot jd-act">3</div><div><div class="jtitle">Book your survey when it suits</div><div class="jsub">Choose a day that works for you — we come to you</div></div></div>
        <div class="ji"><div class="jdot jd-pend">4</div><div><div class="jtitle">Installed in a single day</div><div class="jsub">Panels live — generating from day one</div></div></div>
        <div class="ji"><div class="jdot jd-pend">5</div><div><div class="jtitle">Track everything in your portal</div><div class="jsub">Live updates from quote to aftercare</div></div></div>
      </div>

      <!-- COMMITMENT CTA STACK -->
      <div class="commit-stack">
        <a class="commit-btn cb-high" href="#get-started" onclick="scrollToId('get-started')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
          <span class="commit-label">Get my free estimate →</span>
        </a>
        <a class="commit-btn cb-med" href="https://cal.com/renewableireland/15min" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6.75 3v1.5M17.25 3v1.5M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
          <span class="commit-label">Book a call with a solar advisor</span>
        </a>
      </div>

    </div>
    <div class="rev">
      <div class="wcard">
        <!-- RETURNING VISITOR BANNER -->
        <div id="rv-banner">
          <div class="rv-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg></div>
          <div class="rv-text"><strong id="rv-name">Welcome back!</strong><span id="rv-sub">Your estimate is ready — sliders restored to your last visit.</span></div>
          <button class="rv-dismiss" onclick="this.parentElement.classList.remove('on')" title="Dismiss">✕</button>
        </div>
        <div class="whead">
          <div class="whead-logo"><img loading="lazy" src="/images/logo.webp" alt="Renewable Ireland Logo" width="48" height="48" style="display:block;object-fit:contain"></div>
          <div><div class="wtitle">Get your solar quote</div><div class="wsub2">Connects to your project portal</div></div>
          <div class="wpill">Secure</div>
        </div>
        <div class="wtabs">
          <button class="wtab on" id="wtab-upload" onclick="switchMode('upload')">
            <div class="wrec">Fastest</div>
            <div class="wtab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg></div>
            <div class="wtab-lbl">Upload my bill</div>
            <div class="wtab-sub">Upload for estimate</div>
          </button>
          <button class="wtab" id="wtab-manual" onclick="switchMode('manual')">
            <div class="wtab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg></div>
            <div class="wtab-lbl">Fill in details</div>
            <div class="wtab-sub">Traditional form</div>
          </button>
        </div>
        <div class="wpane on" id="wpane-upload">
          <div class="upzone" id="dropzone" ondrop="handleDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onchange="handleFile(this.files[0])">
            <div class="upicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg></div>
            <div class="uptitle">Drop your electricity bill here</div>
            <div class="upsub">We'll estimate your savings based on your home — upload to get started.</div>
            <div class="uptypes"><span class="uptype">PDF</span><span class="uptype">JPG</span><span class="uptype">PNG</span></div>
          </div>
          <div class="fprev" id="fprev">
            <div class="fpi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg></div>
            <div><div class="fpname" id="fpname">bill.pdf</div><div class="fpsize" id="fpsize">Analysing...</div></div>
            <button class="fprem" onclick="removeFile()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
          <div class="ai-progress" id="ai-prog"><div class="ai-progress-fill"></div></div>
          <div class="aipanel" id="aipanel">
            <div class="aihead"><div class="aidot"></div><span class="ailbl">Estimate Complete</span></div>
            <div class="aigrid">
              <div class="aiitem"><div class="aival">€2,400</div><div class="ailbl2">Annual spend</div></div>
              <div class="aiitem"><div class="aival lime">€1,080</div><div class="ailbl2">Est. saving/yr</div></div>
              <div class="aiitem"><div class="aival lime">€1,800</div><div class="ailbl2">SEAI grant</div></div>
              <div class="aiitem"><div class="aival">4.4 yrs</div><div class="ailbl2">Payback</div></div>
            </div>
          </div>
          <div class="ffields" style="margin-top:14px">
            <div class="fgrid">
              <div class="ff"><label class="fl">Your name</label><input class="fi" id="up-name" type="text" placeholder="e.g. Séan Murphy" autocomplete="name"></div>
              <div class="ff"><label class="fl">Phone</label><input class="fi" id="up-phone" type="tel" placeholder="087 000 0000" autocomplete="tel"></div>
            </div>
            <div class="ff"><label class="fl">County</label><select class="fs" id="up-county"><option value="">Select county</option><option>Carlow</option><option>Wexford</option><option>Kilkenny</option><option>Wicklow</option><option>Kildare</option><option>Dublin</option><option>Meath</option><option>Laois</option></select></div>
          </div>
          <button class="wsub-btn" id="up-submit-btn" onclick="submitBillUpload(this)">Send to my project portal <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
          <div class="wreas"><div class="wr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>No obligation</div><div class="wr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>GDPR secure</div><div class="wr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>Bill deleted after analysis</div></div>
        </div>
        <div class="wpane" id="wpane-manual">
          <div class="ffields">
            <div class="fgrid">
              <div class="ff"><label class="fl">Name</label><input class="fi" type="text" placeholder="Séan"></div>
              <div class="ff"><label class="fl">Phone</label><input class="fi" type="tel" placeholder="087 000 0000"></div>
            </div>
            <div class="fgrid">
              <div class="ff"><label class="fl">County</label><select class="fs"><option value="">Select</option><option>Carlow</option><option>Wexford</option><option>Kilkenny</option><option>Wicklow</option><option>Kildare</option><option>Dublin</option></select></div>
              <div class="ff"><label class="fl">House type</label><select class="fs"><option>Detached</option><option>Semi-detached</option><option>Bungalow</option><option>Farmhouse</option></select></div>
            </div>
            <div class="ff"><label class="fl">Annual electricity spend</label><select class="fs"><option>Under €1,500</option><option selected>€1,500–€2,500</option><option>€2,500–€4,000</option><option>Over €4,000</option></select></div>
            <div class="ff"><label class="fl">Roof orientation</label><select class="fs"><option>South / South-west (ideal)</option><option>East or West facing</option><option>Flat roof</option><option>Not sure</option></select></div>
          </div>
          <div class="qe"><div><div class="qev lime">€1,080</div><div class="qelbl">Est. saving/yr</div></div><div><div class="qev earth">€1,800</div><div class="qelbl">SEAI grant</div></div><div><div class="qev">4.4 yrs</div><div class="qelbl">Payback</div></div></div>
          <button class="wsub-btn" onclick="var b=this;btnLoad(b,'Opening portal…');setTimeout(function(){btnReset(b);openPortal();},400)">Get my exact quote <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
          <div class="wreas"><div class="wr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>No obligation</div><div class="wr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>GDPR secure</div></div>
        </div>
      </div>
      <!-- PRICE GUARANTEE BADGE -->
      <div class="pguar" onclick="document.getElementById('pmatch-modal').classList.add('on')" role="button" tabindex="0" aria-label="Price match guarantee - click to submit a competitor quote" style="margin-top:12px">
        <div class="pguar-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div>
        <div>
          <div class="pguar-title">Price match guarantee</div>
          <div class="pguar-sub">Found a lower like-for-like quote? We'll match it — or beat it.</div>
        </div>
        <div class="pguar-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg></div>
      </div>
    </div>
  </div>
</div>

<!-- PORTAL MODAL -->
<!-- LEAD GATE (shown before portal) -->
<style>
#portal-gate{position:fixed;inset:0;z-index:700;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px}
#portal-gate.on{display:flex}
.pg-modal{background:var(--white);border:var(--bd);border-radius:var(--rlg);box-shadow:var(--shxl);max-width:480px;width:100%;overflow:hidden;animation:pgpop .3s cubic-bezier(.16,1,.3,1)}
@keyframes pgpop{from{opacity:0;transform:scale(.9) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
.pg-head{background:var(--black);padding:20px 24px;display:flex;align-items:center;gap:12px;border-bottom:3px solid var(--lime)}
.pg-head-logo{width:36px;height:36px;object-fit:contain;flex-shrink:0}
.pg-head-text strong{display:block;font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;color:var(--white);text-transform:uppercase;letter-spacing:.02em}
.pg-head-text span{font-size:10px;color:rgba(255,255,255,.5);font-weight:600;text-transform:uppercase;letter-spacing:.07em}
.pg-close-btn{margin-left:auto;background:rgba(255,255,255,.1);border:none;width:26px;height:26px;border-radius:50%;cursor:pointer;color:rgba(255,255,255,.5);font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .15s}
.pg-close-btn:hover{background:rgba(255,255,255,.2);color:var(--white)}
.pg-body{padding:24px}
.pg-pitch{margin-bottom:20px}
.pg-pitch h3{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;text-transform:uppercase;color:var(--black);line-height:1.05;margin-bottom:6px}
.pg-pitch h3 em{font-style:normal;color:var(--lime-dk)}
.pg-pitch p{font-size:12px;color:var(--gray);line-height:1.6}
.pg-perks{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:18px}
.pg-perk{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--gray)}
.pg-perk svg{width:13px;height:13px;color:var(--lime-dk);flex-shrink:0}
.pg-fields{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.pg-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pg-field label{display:block;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--hint);margin-bottom:4px}
.pg-field input,.pg-field select{width:100%;border:var(--bd);border-radius:9px;padding:10px 13px;font-size:13px;font-family:'Barlow',sans-serif;color:var(--black);background:var(--off);outline:none;transition:border-color .15s,box-shadow .15s}
.pg-field input:focus,.pg-field select:focus{border-color:var(--lime-dk);box-shadow:2px 2px 0 var(--lime-dk)}
.pg-error{background:#fee;border:1.5px solid #c00;border-radius:8px;padding:8px 12px;font-size:11px;color:#c00;font-weight:600;margin-bottom:10px;display:none}
.pg-submit{width:100%;background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:var(--pill);padding:13px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;box-shadow:var(--sh);transition:all .15s;display:flex;align-items:center;justify-content:center;gap:8px}
.pg-submit:hover{transform:translate(-2px,-2px);box-shadow:var(--shlg)}
.pg-privacy{font-size:10px;color:var(--hint);text-align:center;margin-top:8px;line-height:1.5}
/* Success state */
#gate-success{display:none;text-align:center;padding:10px 0}
.gs-icon{width:52px;height:52px;background:var(--lime);border:2.5px solid var(--black);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;box-shadow:var(--sh)}
.gs-icon svg{width:26px;height:26px;color:var(--black)}
.gs-title{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;text-transform:uppercase;color:var(--black);margin-bottom:6px;line-height:1}
.gs-sub{font-size:12px;color:var(--gray);margin-bottom:16px;line-height:1.6}
.gs-link-box{background:var(--off);border:var(--bd);border-radius:9px;padding:12px 14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.gs-url{font-size:11px;color:var(--gray);word-break:break-all;font-family:monospace}
#gate-copy-link{background:var(--black);color:var(--white);border:none;border-radius:var(--pill);padding:6px 14px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;white-space:nowrap;transition:all .15s}
#gate-copy-link:hover{background:var(--lime-dk)}
.gs-note{font-size:10px;color:var(--hint);text-align:center}
</style>

<div id="portal-gate" onclick="if(event.target===this)closeGate()">
  <div class="pg-modal">
    <div class="pg-head">
      <img loading="lazy" class="pg-head-logo" src="/images/logo.webp" alt="Renewable Ireland Logo" alt="Renewable Ireland logo" style="display:block;height:40px;width:auto;object-fit:contain">
      <div class="pg-head-text">
        <strong>Your Project Portal</strong>
        <span>Renewable Ireland · Free to access</span>
      </div>
      <button class="pg-close-btn" onclick="closeGate()">✕</button>
    </div>
    <div class="pg-body">
      <div id="portal-gate-form-state">
        <div id="gate-form-wrap">
          <div class="pg-pitch">
            <h3>Get your <em>personalised</em><br>solar report</h3>
            <p>We'll send your full savings estimate, SEAI grant amount, and a unique link to your project dashboard — free, no obligation, no spam.</p>
          </div>
          <div class="pg-perks">
            <div class="pg-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>Unique portal link</div>
            <div class="pg-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>Full savings report</div>
            <div class="pg-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>SEAI grant details</div>
            <div class="pg-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>No obligation</div>
          </div>
          <div class="pg-fields">
            <div id="gate-error" class="pg-error">Please enter your name and email to continue.</div>
            <div class="pg-row">
              <div class="pg-field"><label>Your name *</label><input id="gate-name" type="text" placeholder="e.g. Séan Murphy"></div>
              <div class="pg-field"><label>Email *</label><input id="gate-email" type="email" placeholder="you@example.com" onblur="var v=this.value.trim();this.style.borderColor=v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'#c00':''"></div>
            </div>
            <div class="pg-row">
              <div class="pg-field"><label>Phone</label><input id="gate-phone" type="tel" placeholder="087 000 0000"></div>
              <div class="pg-field"><label>County</label>
                <select id="gate-county">
                  <option value="">Select county</option>
                  <optgroup label="Leinster"><option>Carlow</option><option>Dublin</option><option>Kildare</option><option>Kilkenny</option><option>Laois</option><option>Longford</option><option>Louth</option><option>Meath</option><option>Offaly</option><option>Westmeath</option><option>Wexford</option><option>Wicklow</option></optgroup>
                  <optgroup label="Munster"><option>Clare</option><option>Cork</option><option>Kerry</option><option>Limerick</option><option>Tipperary</option><option>Waterford</option></optgroup>
                  <optgroup label="Connacht"><option>Galway</option><option>Leitrim</option><option>Mayo</option><option>Roscommon</option><option>Sligo</option></optgroup>
                  <optgroup label="Ulster"><option>Cavan</option><option>Donegal</option><option>Monaghan</option></optgroup>
                </select>
              </div>
            </div>
          </div>
          <button class="pg-submit" onclick="submitGate()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
            Create my free portal
          </button>
          <p class="pg-privacy">🔒 GDPR secure · No spam · We never sell your data</p>
        </div>

        <div id="gate-success">
          <div class="gs-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg></div>
          <div class="gs-title">Portal created, <span id="gate-user-name"></span>! 🎉</div>
          <div class="gs-sub">Your unique portal link is ready. Bookmark it — you can return any time to track your project, view documents, and monitor your savings.</div>
          <div class="gs-link-box">
            <span class="gs-url" id="gate-portal-url"></span>
            <button id="gate-copy-link" onclick="copyPortalLink()">Copy link</button>
          </div>
          <p class="gs-note">Ref: <strong id="gate-portal-id"></strong> · Opening your dashboard now…</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="portal-ov" id="portal-overlay" onclick="closePortalOut(event)">
  <div class="pmodal">
    <div class="pbar">
      <div class="pbar-logo"><img loading="lazy" src="/images/logo.webp" alt="Renewable Ireland Logo" width="30" height="36" style="display:block;object-fit:contain"></div>
      <div><div class="ptitle">Renewable Ireland Portal</div><div class="psub">Séan Murphy · Carlow · Project dashboard</div></div>
      <button class="pclose" onclick="closePortal()">✕</button>
    </div>
    <div class="pbody">
      <div class="pside">
        <div class="pnav-sec">My Project</div>
        <div class="pnav on" onclick="switchTab('tracker')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>Project Tracker</div>
        <div class="pnav" onclick="switchTab('docs')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>Documents</div>
        <div class="pnav" onclick="switchTab('messages')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>Messages</div>
        <div class="pnav-sep"></div>
        <div class="pnav-sec">Savings</div>
        <div class="pnav" onclick="switchTab('savings')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"/></svg>Savings Forecast</div>
      </div>
      <div class="pcontent">
        <div id="tab-tracker">
          <div class="ptrack-head"><div class="pth-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg></div><div><div class="pth-name">Séan Murphy — Carlow</div><div class="pth-detail">5.4kWp · South-facing · 4-bed detached</div></div><div class="pth-status">Grant in progress</div></div>
          <div class="progcard"><div class="progtop"><span class="proglbl">Overall Progress</span><span class="progpct">60% complete</span></div><div class="progbar"><div class="progfill" id="progfill"></div></div>
            <div class="milelist">
              <div class="mili"><div class="milidot md-done">✓</div><div><div class="milititle">Enquiry received</div><div class="milisub">Bill uploaded &amp; analysed by AI</div></div><div class="milidate">Mar 24</div></div>
              <div class="mili"><div class="milidot md-done">✓</div><div><div class="milititle">Site survey completed</div><div class="milisub">South-facing, excellent orientation</div></div><div class="milidate">Mar 25</div></div>
              <div class="mili"><div class="milidot md-done">✓</div><div><div class="milititle">Fixed quote accepted</div><div class="milisub">€9,200 total · €7,400 after €1,800 grant</div></div><div class="milidate">Mar 26</div></div>
              <div class="mili"><div class="milidot md-act">→</div><div><div class="milititle">SEAI grant application submitted</div><div class="milisub">Ref: SEAI-2025-CR-40821 · 5–7 days</div></div><div class="milidate">In progress</div></div>
              <div class="mili"><div class="milidot md-pend">5</div><div><div class="milititle">Installation day</div><div class="milisub">Scheduled: Thursday 10 April</div></div><div class="milidate">Apr 10</div></div>
              <div class="mili"><div class="milidot md-pend">6</div><div><div class="milititle">System live — start saving</div><div class="milisub">Smart export tariff activated</div></div><div class="milidate">TBC</div></div>
            </div>
          </div>
          <div class="metgrid"><div class="metcard"><div class="metval lime">€1,214</div><div class="metlbl">Est. saving/year</div></div><div class="metcard"><div class="metval earth">€1,800</div><div class="metlbl">SEAI grant</div></div><div class="metcard"><div class="metval">6.4 yrs</div><div class="metlbl">Payback period</div></div></div>
        </div>
        <div id="tab-docs" style="display:none">
          <div class="doccard"><div class="doctitle">Your documents</div>
            <div class="doci"><div class="docico lime"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div><div class="docname">Fixed price quote — signed</div><div class="docdet">€9,200 incl. VAT</div></div><div class="docbadge db-done">Signed</div></div>
            <div class="doci"><div class="docico earth"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div><div class="docname">SEAI grant application</div><div class="docdet">Ref: SEAI-2025-CR-40821</div></div><div class="docbadge db-prog">Submitted</div></div>
            <div class="doci"><div class="docico lime"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div><div class="docname">Site survey report</div><div class="docdet">Mar 25, 2025</div></div><div class="docbadge db-done">Complete</div></div>
            <div class="doci"><div class="docico gray"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg></div><div><div class="docname">Installation completion cert.</div><div class="docdet">Ready after install</div></div><div class="docbadge db-wait">Pending</div></div>
          </div>
        </div>
        <div id="tab-messages" style="display:none">
          <div class="chatcard"><div class="chattitle">Messages with your project team</div>
            <div class="chatmsg"><div class="cmav team">RI</div><div class="cmbub team">Hi Séan! SEAI application submitted — ref SEAI-2025-CR-40821. Approval expected in 5–7 days. Install booked for April 10th.</div></div>
            <div class="chatmsg me"><div class="cmav user">SM</div><div class="cmbub user">Great, anything I need to do before the install?</div></div>
            <div class="chatmsg"><div class="cmav team">RI</div><div class="cmbub team">Nothing from you — we handle everything. Just ensure access to the attic and main fuse board on the day.</div></div>
            <div class="chatrow"><input class="chatinp" type="text" placeholder="Ask your project team anything..."><button class="chatsend">Send</button></div>
          </div>
        </div>
        <div id="tab-savings" style="display:none">
          <div class="metgrid" style="margin-bottom:12px"><div class="metcard"><div class="metval lime">€1,214</div><div class="metlbl">Year 1 saving</div></div><div class="metcard"><div class="metval earth">€1,800</div><div class="metlbl">SEAI grant</div></div><div class="metcard"><div class="metval">€22,200</div><div class="metlbl">25-year saving</div></div></div>
          <div class="doccard"><div class="doctitle">Monthly generation estimate</div>
            <div class="doci"><div class="docico lime"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg></div><div><div class="docname">Summer (Jun–Aug)</div><div class="docdet">~520 kWh/month</div></div><div class="docbadge db-done">€78/mo</div></div>
            <div class="doci"><div class="docico earth"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg></div><div><div class="docname">Spring / Autumn</div><div class="docdet">~320 kWh/month</div></div><div class="docbadge db-prog">€48/mo</div></div>
            <div class="doci"><div class="docico gray"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg></div><div><div class="docname">Winter (Dec–Feb)</div><div class="docdet">~140 kWh/month</div></div><div class="docbadge db-wait">€21/mo</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- PROCESS -->
<section class="sec sec-lime" style="border-top:var(--bd);border-bottom:var(--bd);padding:60px 64px">
  <div class="stag ea rev">Simple process</div>
  <h2 class="stitle rev">From first call to<br><em><span style="color:#C4855A">live panels</span></em> in 4–5 weeks.</h2>
  <div class="procgrid">
    <div class="procstep rev"><div class="procnum">1</div><h3>Free assessment</h3><p>Tell us your county, house type, and electricity usage. No pressure, no obligation.</p></div>
    <div class="procstep rev"><div class="procnum">2</div><h3>Fixed quote</h3><p>Local SEAI-certified assessor visits. Fixed price within 24 hours — €1,800 grant deducted.</p></div>
    <div class="procstep rev"><div class="procnum">3</div><h3>We do the paperwork</h3><p>We submit your SEAI application, arrange network notification, coordinate your smart meter.</p></div>
    <div class="procstep rev"><div class="procnum">4</div><h3>1-day installation</h3><p>Installed in a single day. Generating your own electricity from day one.</p></div>
  </div>
</section>


<!-- GRANTS -->
<section class="sec sec-black" id="grants" style="border-bottom:var(--bd)">
  <div class="stag lt rev">SEAI Grants 2025</div>
  <h2 class="stitle lt rev">The government pays<br><em>up to <span style="color:#C4855A">€1,800</span></em> of your install.</h2>
  <div class="grantgrid">
    <div class="rev">
      <p class="ssub lt" style="margin-bottom:20px">The SEAI Solar PV grant is available to any homeowner in Ireland. We handle the application — you just collect the money.</p>
      <!-- PRICE FRAME -->
    <div class="price-frame">
      <div class="pf-before" id="pf-before">€11,000 before SEAI grant</div>
      <div class="pf-after" id="pf-after">€9,200 <span style="font-size:14px;color:rgba(255,255,255,.4);font-weight:400">you pay after grant</span></div>
      <div class="pf-monthly" id="pf-monthly">That's €77/month over 10 years — less than most electricity bills.</div>
      <div class="pf-note">Fixed price. No hidden costs. SEAI grant deducted before you pay a penny.</div>
    </div>
    <div class="gnote">We are SEAI-registered. Only registered installers can access these grants. Always verify your installer before signing anything.</div>
      <button class="btn-lime" style="margin-top:20px" onclick="scrollToId('get-started')">Apply through us — free <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
    </div>
    <div class="rev">
      <div class="gcards">
        <div class="gc"><div class="ga">€1,400</div><div class="gd">Up to 2kWp · 1–2 bed homes</div></div>
        <div class="gc"><div class="ga">€1,600</div><div class="gd">Up to 3kWp · 2–3 bed homes</div></div>
        <div class="gc"><div class="ga">€1,800</div><div class="gd">Up to 4kWp · 3–4 bed homes</div></div>
        <div class="gc" style="border-color:#C4855A;box-shadow:0 0 0 1px #C4855A"><div class="ga" style="color:#C4855A">€1,800</div><div class="gd">4kWp+ · Maximum available</div></div>
      </div>
    </div>
  </div>
</section>


<!-- MANIFESTO -->
<section style="background:var(--black);border-bottom:var(--bd)">

  <!-- Full-width headline -->
  <div style="padding:40px 64px 36px;border-bottom:1px solid rgba(255,255,255,.07)">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(40px,5.5vw,80px);font-weight:800;color:var(--white);line-height:.95;text-transform:uppercase;letter-spacing:-.02em">
      The grid is a subscription<br>
      <span style="color:var(--lime)">you never signed up for.</span><br>
      <span style="text-decoration:line-through;opacity:.25;font-size:clamp(40px,5vw,80px)">Cancel it.</span>
    </div>
  </div>

  <!-- 2-column body -->
  <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(255,255,255,.07)">
    <div style="padding:48px 56px 48px 64px;border-right:1px solid rgba(255,255,255,.07)">
      <p style="font-size:22px;color:rgba(255,255,255,.9);line-height:1.6;margin-bottom:24px;font-weight:500">Renewable Ireland cuts your bills, locks in your savings, and puts you back in control.</p>
      <p style="font-size:16px;color:rgba(255,255,255,.45);line-height:1.8;margin-bottom:24px">For decades, energy companies have treated your home like a recurring revenue stream. It's time to flip the script.</p>
      <p style="font-size:16px;color:rgba(255,255,255,.45);line-height:1.8;margin-bottom:28px">Solar isn't just good for the environment. It's the single highest-return investment an Irish homeowner can make. Over 20 years, the average household hands <strong style="color:var(--white)">€30,000 to the grid.</strong></p>
      <p style="font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;color:#C4855A;text-transform:uppercase;letter-spacing:.02em">We help you keep it.</p>
    </div>
    <div style="padding:48px 64px 48px 56px">
      <p style="font-size:16px;color:rgba(255,255,255,.45);line-height:1.8;margin-bottom:28px">At Renewable Ireland, we don't just install panels. We help you build energy independence. From your first question to your first live watt, we manage the SEAI grant, deliver exceptional installations, and provide full aftercare — all tracked in real time through your personal project portal.</p>
      <p style="font-size:16px;color:rgba(255,255,255,.45);line-height:1.8;margin-bottom:32px">Join hundreds of Irish families who now own their power.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;border:1px solid rgba(255,255,255,.08);border-radius:var(--r);overflow:hidden">
        <div style="padding:20px;border-right:1px solid rgba(255,255,255,.08)">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:4px">200+</div>
          <div style="font-size:11px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;font-weight:700">Installs completed</div>
        </div>
        <div style="padding:20px">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:4px">€1,240</div>
          <div style="font-size:11px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;font-weight:700">Avg saving / year</div>
        </div>
        <div style="padding:20px;border-top:1px solid rgba(255,255,255,.08);border-right:1px solid rgba(255,255,255,.08)">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:var(--white);line-height:1;margin-bottom:4px">4.9★</div>
          <div style="font-size:11px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;font-weight:700">Google rating</div>
        </div>
        <div style="padding:20px;border-top:1px solid rgba(255,255,255,.08);background:rgba(109,201,58,.06)">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:4px">1 day</div>
          <div style="font-size:11px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;font-weight:700">Installation time</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Promise bar -->
  <div style="padding:24px 64px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:clamp(16px,2vw,24px);font-weight:800;text-transform:uppercase;line-height:1.2;color:var(--white)">
      No hidden costs. No fine print.
      <span style="color:var(--lime)"> No more bills.</span><span style="color:#C4855A"> That's our promise.</span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <span style="display:flex;align-items:center;gap:6px;background:rgba(109,201,58,.1);border:1.5px solid rgba(109,201,58,.25);border-radius:var(--pill);padding:6px 12px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.06em"><span style="width:5px;height:5px;border-radius:50%;background:var(--lime);flex-shrink:0;display:inline-block"></span>SEAI Certified</span>
      <span style="display:flex;align-items:center;gap:6px;background:rgba(109,201,58,.1);border:1.5px solid rgba(109,201,58,.25);border-radius:var(--pill);padding:6px 12px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.06em"><span style="width:5px;height:5px;border-radius:50%;background:var(--lime);flex-shrink:0;display:inline-block"></span>200+ Installs</span>
      <span style="display:flex;align-items:center;gap:6px;background:rgba(109,201,58,.1);border:1.5px solid rgba(109,201,58,.25);border-radius:var(--pill);padding:6px 12px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.06em"><span style="width:5px;height:5px;border-radius:50%;background:var(--lime);flex-shrink:0;display:inline-block"></span>Live Portal</span>
      <button class="btn-p" style="font-size:13px;padding:11px 22px;white-space:nowrap" onclick="scrollToId('get-started')">Cancel the grid →</button>
    </div>
  </div>

</section>
<!-- CALCULATOR -->
<!-- UNIFIED CALCULATOR ─────────────────────────────────────── -->
<section id="calculator" style="background:var(--black);border-bottom:var(--bd);padding:0">

  <style>
    /* ── Unified calc layout ── */
    .ucalc{display:grid;grid-template-columns:400px 1fr;height:700px}
    .ucalc-left{padding:52px 48px;border-right:3px solid var(--lime);display:flex;flex-direction:column;gap:0}
    .ucalc-right{display:flex;flex-direction:column;overflow:hidden}
    .ucalc-head{padding:24px 40px 18px;border-bottom:1px solid rgba(255,255,255,.06)}
    .ucalc-chart-area{flex:1;padding:0 40px 32px;display:flex;flex-direction:column;overflow:hidden}

    /* Left panel — section label */
    .ucalc-tag{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:20px;display:flex;align-items:center;gap:10px}
    .ucalc-tag::before{content:'';width:16px;height:2px;background:var(--lime);border-radius:2px;display:inline-block}

    /* Sliders */
    .ucalc-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
    .ucalc-label span{font-size:18px;color:var(--lime);text-transform:none;letter-spacing:0;font-weight:800}
    .ucalc-slider{width:100%;height:4px;accent-color:var(--lime);cursor:pointer;margin-bottom:28px}
    .ucalc-select{width:100%;padding:12px 14px;border:1.5px solid rgba(109,201,58,.3);border-radius:9px;background:rgba(255,255,255,.04);color:var(--white);font-family:'Barlow',sans-serif;font-size:14px;cursor:pointer;margin-bottom:28px;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='rgba(109,201,58,0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;transition:border-color .15s}
    .ucalc-select:focus{outline:none;border-color:var(--lime)}
    .ucalc-select option{background:#1a1a1a;color:var(--white)}

    /* Key numbers — 4-grid in left panel */
    .ucalc-nums{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(109,201,58,.15);border:2px solid rgba(109,201,58,.4);border-radius:var(--r);overflow:hidden;margin-top:8px;margin-bottom:24px}
    .ucalc-num{background:rgba(0,0,0,.6);padding:18px 18px 14px}
    .ucalc-num-val{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;line-height:1;color:var(--white);margin-bottom:4px}
    .ucalc-num-val.lime{color:var(--lime)}
    .ucalc-num-val.earth{color:#d4a96a}
    .ucalc-num-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.35);font-weight:700;font-family:'Barlow Condensed',sans-serif}

    /* CTA in left panel */
    .ucalc-cta{background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:var(--pill);padding:12px 18px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;cursor:pointer;width:100%;display:flex;align-items:center;justify-content:center;gap:7px;box-shadow:var(--sh);text-transform:uppercase;letter-spacing:.05em;text-decoration:none;transition:all .15s;margin-top:auto}
    .ucalc-cta:hover{transform:translate(-2px,-2px);box-shadow:var(--shlg)}

    /* Right panel — chart */
    .ucalc-chart-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(20px,2vw,28px);font-weight:800;text-transform:uppercase;color:var(--white);line-height:.95;letter-spacing:-.02em}
    .ucalc-chart-title em{font-style:normal;color:var(--lime)}
    .ucalc-chart-sub{font-size:12px;color:rgba(255,255,255,.35);margin-top:6px;line-height:1.5}
    .ucalc-view-btns{display:flex;gap:6px;margin-left:auto}
    .ucalc-vbtn{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:6px 14px;border-radius:var(--pill);border:1.5px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.4);cursor:pointer;transition:all .15s}
    .ucalc-vbtn.on{background:var(--lime);color:var(--black);border-color:var(--lime)}
    .ucalc-chart-wrap{flex:1;position:relative;min-height:300px}
    #ucalc-svg{width:100%;height:100%;display:block;position:absolute;inset:0}

    /* Stat bar above chart */
    .ucalc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.07);border-radius:var(--r);overflow:hidden;margin-bottom:20px}
    .ucalc-stat{padding:14px 18px;background:rgba(255,255,255,.02)}
    .ucalc-stat-val{font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:800;color:var(--white);line-height:1;margin-bottom:3px}
    .ucalc-stat-val.lime{color:var(--lime)}
    .ucalc-stat-val.earth{color:#d4a96a}
    .ucalc-stat-lbl{font-size:9px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;font-weight:700;font-family:'Barlow Condensed',sans-serif}

    /* Year labels */
    .ucalc-yr-labels{display:flex;justify-content:space-between;padding:6px 0 0;font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,.2);letter-spacing:.04em;text-transform:uppercase}

    @media(max-width:900px){
      .ucalc{grid-template-columns:1fr;height:auto}
      .ucalc-left{padding:28px 20px 24px;border-right:none;border-left:none;border-top:3px solid var(--lime);border-bottom:1px solid rgba(255,255,255,.08)}
      .ucalc-label{font-size:9px;margin-bottom:6px}
      .ucalc-label span{font-size:16px}
      .ucalc-slider{margin-bottom:20px}
      .ucalc-nums{margin-top:4px;margin-bottom:16px}
      .ucalc-num{padding:12px 14px}
      .ucalc-num-val{font-size:24px}
      .ucalc-cta{padding:11px 14px;font-size:12px}
      .ucalc-head{padding:20px 20px 14px}
      .ucalc-chart-area{padding:0 20px 24px}
      .ucalc-chart-wrap{min-height:220px}
      .ucalc-stats{grid-template-columns:1fr 1fr;margin-bottom:10px}
      .ucalc-stat{padding:10px 12px}
      .ucalc-stat-val{font-size:18px}
    }
  </style>

  <div class="ucalc">

    <!-- LEFT: Controls -->
    <div class="ucalc-left">
      <div class="ucalc-tag">Savings Calculator</div>

      <div class="ucalc-label">County<span id="u-county-lbl"></span></div>
      <select class="ucalc-select" id="cc" onchange="ucalcRun()">
        <optgroup label="Connacht"><option value="galway">Galway</option><option value="leitrim">Leitrim</option><option value="mayo">Mayo</option><option value="roscommon">Roscommon</option><option value="sligo">Sligo</option></optgroup>
        <optgroup label="Leinster"><option value="carlow">Carlow</option><option value="dublin" selected>Dublin</option><option value="kildare">Kildare</option><option value="kilkenny">Kilkenny</option><option value="laois">Laois</option><option value="longford">Longford</option><option value="louth">Louth</option><option value="meath">Meath</option><option value="offaly">Offaly</option><option value="westmeath">Westmeath</option><option value="wexford">Wexford</option><option value="wicklow">Wicklow</option></optgroup>
        <optgroup label="Munster"><option value="clare">Clare</option><option value="cork">Cork</option><option value="kerry">Kerry</option><option value="limerick">Limerick</option><option value="tipperary">Tipperary</option><option value="waterford">Waterford</option></optgroup>
        <optgroup label="Ulster (Republic)"><option value="cavan">Cavan</option><option value="donegal">Donegal</option><option value="monaghan">Monaghan</option></optgroup>
        <optgroup label="Northern Ireland"><option value="antrim">Antrim</option><option value="armagh">Armagh</option><option value="belfast">Belfast</option><option value="derry">Derry</option><option value="down">Down</option><option value="fermanagh">Fermanagh</option><option value="tyrone">Tyrone</option></optgroup>
      </select>

      <div class="ucalc-label">House size <span id="u-hs-lbl">3-bed</span></div>
      <input class="ucalc-slider" type="range" min="1" max="4" value="2" step="1" id="hs" oninput="ucalcRun()">

      <div class="ucalc-label">Annual electricity spend <span id="u-sp-lbl">€2,400</span></div>
      <input class="ucalc-slider" type="range" min="1200" max="4800" value="2400" step="100" id="sp" oninput="ucalcRun()">

      <!-- Key numbers -->
      <div class="ucalc-nums">
        <div class="ucalc-num"><div class="ucalc-num-val lime" id="rs">€1,080</div><div class="ucalc-num-lbl">Saves / year</div></div>
        <div class="ucalc-num"><div class="ucalc-num-val earth" id="rg">€1,800</div><div class="ucalc-num-lbl">SEAI grant</div></div>
        <div class="ucalc-num"><div class="ucalc-num-val" id="rp">4.4 yrs</div><div class="ucalc-num-lbl">Payback</div></div>
        <div class="ucalc-num"><div class="ucalc-num-val lime" id="r25">€22,200</div><div class="ucalc-num-lbl">25-yr return</div></div>
      </div>

      <a class="ucalc-cta" href="#get-started" onclick="scrollToId('get-started')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4.5 12.75l6 6 9-13.5"/></svg>
        Get my free quote
      </a>
    </div>

    <!-- RIGHT: Chart -->
    <div class="ucalc-right">
      <div class="ucalc-head" style="display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap">
        <div>
          <div class="ucalc-chart-title">Your money,<br><em>year by year.</em></div>

        </div>

      </div>

      <div class="ucalc-chart-area">
        <!-- Stats strip -->
        <div class="ucalc-stats" style="margin-top:14px;margin-bottom:14px">
          <div class="ucalc-stat"><div class="ucalc-stat-val lime" id="roit-saving">€1,080</div><div class="ucalc-stat-lbl">Saving / yr</div></div>
          <div class="ucalc-stat"><div class="ucalc-stat-val earth" id="roit-cost">€4,800</div><div class="ucalc-stat-lbl">Net cost</div></div>
          <div class="ucalc-stat"><div class="ucalc-stat-val" id="roit-payback">4.4 yrs</div><div class="ucalc-stat-lbl">Payback</div></div>
          <div class="ucalc-stat"><div class="ucalc-stat-val lime" id="roit-25yr">€22,200</div><div class="ucalc-stat-lbl">25-yr return</div></div>
        </div>

        <!-- Chart -->
        <div class="ucalc-chart-wrap" id="roi-chart-wrap">
          <svg id="roi-svg" style="width:100%;height:100%;display:block;position:absolute;inset:0" viewBox="0 0 900 300" preserveAspectRatio="none"></svg>
          <div class="roi-tooltip" id="roi-tooltip">
            <div class="roi-tt-yr" id="roi-tt-yr">Year 1</div>
            <div class="roi-tt-val" id="roi-tt-val">€1,080</div>
            <div class="roi-tt-lbl" id="roi-tt-lbl">Annual saving</div>
            <div class="roi-tt-arrow"></div>
          </div>
        </div>

        <!-- Year axis -->
        <div class="ucalc-yr-labels" id="roi-yr-labels"></div>
      </div>
    </div>

  </div>
</section>


<!-- MAP -->

<!-- TESTIMONIALS -->
<section class="sec sec-white" style="border-bottom:var(--bd)">
  <div class="stag rev">Real Irish customers</div>
  <h2 class="stitle rev">Numbers <em>don't lie.</em></h2>
  <div class="testgrid">
    <div class="testcard rev"><div class="tq">Our electricity bill dropped from €280 a month to under €90. Best money we ever spent on this house.</div><div class="ta"><div class="tav">SM</div><div><div class="tan">Séan Murphy</div><div class="tad">Carlow · 5.4kW</div><div class="tsav">Saves €1,140/yr</div></div></div></div>
    <div class="testcard rev"><div class="tq">The SEAI grant saved us €1,800 and they did all the paperwork. Completely painless. Done in one day.</div><div class="ta"><div class="tav">MB</div><div><div class="tan">Mary Brennan</div><div class="tad">Wexford · 4.2kW</div><div class="tsav">Saves €890/yr</div></div></div></div>
    <div class="testcard rev"><div class="tq">No sales pressure. Just honest facts. That's why I went with them over three other quotes.</div><div class="ta"><div class="tav">TO</div><div><div class="tan">Tom O'Brien</div><div class="tad">Kilkenny · 6.6kW</div><div class="tsav">Saves €1,380/yr</div></div></div></div>
  </div>
</section>


<!-- ROOF ESTIMATOR -->
<section id="roof-estimator" style="background:var(--black);border-bottom:var(--bd);padding:0;overflow:hidden">

  <style>
    /* ── Roof Estimator unified layout ── */
    .re2{display:grid;grid-template-columns:1fr 420px;height:680px}
    .re2-map{position:relative;overflow:hidden;background:#0d1a0a}
    .re2-map iframe{position:absolute;inset:0;width:100%;height:100%;border:none}
    .re2-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:linear-gradient(135deg,#0f1f0b 0%,#0a130a 100%)}
    .re2-placeholder svg{width:56px;height:56px;color:var(--lime);opacity:.3}
    .re2-placeholder p{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.1em;text-align:center;line-height:1.8}
    .re2-badge{position:absolute;top:14px;right:14px;background:var(--lime);color:var(--black);border:2px solid var(--black);border-radius:var(--pill);padding:4px 12px;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;display:none}
    .re2-badge.on{display:block}
    .re2-overlay{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,.92) 0%,transparent 100%);padding:20px 20px 16px}
    .re2-ov-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .re2-ov-item .v{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:2px}
    .re2-ov-item .l{font-size:9px;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,.4);font-weight:700;font-family:'Barlow Condensed',sans-serif}
    .re2-suit{margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,.08)}
    .re2-suit-row{display:flex;justify-content:space-between;margin-bottom:5px}
    .re2-suit-row span{font-size:9px;font-weight:700;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.06em;font-family:'Barlow Condensed',sans-serif}
    .re2-suit-row strong{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:var(--lime)}
    .re2-suit-track{height:4px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden}
    .re2-suit-fill{height:100%;background:linear-gradient(90deg,var(--lime-dk),var(--lime));border-radius:4px;transition:width .8s cubic-bezier(.16,1,.3,1);width:0}

    /* Right panel */
    .re2-panel{display:flex;flex-direction:column;border-left:3px solid var(--lime);padding:40px 36px;overflow-y:auto}
    .re2-tag{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:16px;display:flex;align-items:center;gap:10px}
    .re2-tag::before{content:'';width:16px;height:2px;background:var(--lime);border-radius:2px}
    .re2-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(24px,2.5vw,36px);font-weight:800;text-transform:uppercase;color:var(--white);line-height:.95;letter-spacing:-.02em;margin-bottom:6px}
    .re2-title em{font-style:normal;color:#C4855A}
    .re2-sub{font-size:12px;color:rgba(255,255,255,.35);line-height:1.6;margin-bottom:24px}

    /* Search row */
    .re2-search{display:flex;gap:8px;margin-bottom:16px}
    .re2-input{flex:1;padding:12px 14px;border:1.5px solid rgba(109,201,58,.3);border-radius:10px;background:rgba(255,255,255,.04);color:var(--white);font-size:13px;font-family:'Barlow',sans-serif}
    .re2-input::placeholder{color:rgba(255,255,255,.25)}
    .re2-input:focus{outline:none;border-color:var(--lime)}
    .re2-btn{padding:12px 18px;background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:10px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;white-space:nowrap;flex-shrink:0;display:flex;align-items:center;gap:6px;box-shadow:var(--sh);transition:all .15s}
    .re2-btn:hover{transform:translate(-1px,-1px);box-shadow:var(--shlg)}

    /* Results grid */
    .re2-res{display:none;margin-top:4px}
    .re2-res.on{display:block}
    .re2-res-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(109,201,58,.15);border:2px solid rgba(109,201,58,.35);border-radius:var(--r);overflow:hidden;margin-bottom:16px}
    .re2-res-item{background:rgba(0,0,0,.6);padding:14px 16px}
    .re2-res-val{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;line-height:1;color:var(--white);margin-bottom:3px}
    .re2-res-val.lime{color:var(--lime)}
    .re2-res-val.earth{color:#d4a96a}
    .re2-res-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,.35);font-weight:700;font-family:'Barlow Condensed',sans-serif}

    /* Suitability in panel */
    .re2-panel-suit{margin-bottom:16px}
    .re2-panel-suit-row{display:flex;justify-content:space-between;margin-bottom:6px}
    .re2-panel-suit-row span{font-size:10px;font-weight:700;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.07em;font-family:'Barlow Condensed',sans-serif}
    .re2-panel-suit-row strong{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;color:var(--lime)}
    .re2-panel-suit-track{height:5px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden}
    .re2-panel-suit-fill{height:100%;background:linear-gradient(90deg,var(--lime-dk),var(--lime));border-radius:4px;transition:width .9s cubic-bezier(.16,1,.3,1);width:0}

    /* What you'll get list */
    .re2-tips{margin-top:4px;padding:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:var(--r)}
    .re2-tips-title{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.2);margin-bottom:10px}
    .re2-tips li{display:flex;align-items:center;gap:9px;font-size:11px;color:rgba(255,255,255,.35);line-height:1.5;margin-bottom:6px;list-style:none}
    .re2-tips li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--lime);opacity:.6;flex-shrink:0}

    /* CTAs */
    .re2-cta-survey{display:block;width:100%;padding:13px;background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:var(--pill);font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;text-align:center;text-decoration:none;box-shadow:var(--sh);transition:all .15s;margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:7px}
    .re2-cta-survey:hover{transform:translate(-2px,-2px);box-shadow:var(--shlg)}
    .re2-cta-wa{display:flex;align-items:center;justify-content:center;gap:7px;font-size:12px;color:rgba(255,255,255,.45);text-decoration:none;padding:8px;transition:color .15s}
    .re2-cta-wa:hover{color:var(--lime)}
    .re2-loading{display:none;align-items:center;gap:10px;padding:14px 0;font-size:12px;color:rgba(255,255,255,.4)}
    .re2-loading.on{display:flex}
    .re2-spin{width:18px;height:18px;border:2px solid rgba(255,255,255,.1);border-top-color:var(--lime);border-radius:50%;animation:spin .8s linear infinite;flex-shrink:0}

    @media(max-width:900px){
      .re2{grid-template-columns:1fr;height:auto}
      .re2-map{height:55vw;min-height:260px}
      .re2-panel{padding:28px 20px;border-left:none;border-top:3px solid var(--lime)}
    }
  </style>

  <div class="re2">

    <!-- LEFT: Satellite map -->
    <div class="re2-map">
      <div class="re2-placeholder" id="re-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/><path d="M15.75 9.75 12 13.5l-1.5-1.5"/></svg>
        <p>Enter your address<br>to see satellite view</p>
      </div>
      <iframe id="re-iframe" style="display:none;width:100%;height:100%;border:0;position:absolute;inset:0" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="re2-badge" id="re-badge">✦ AI Estimated</div>
      <div class="re-panel-count" id="re-panels"></div>
      <!-- Stats overlay at bottom of map -->
      <div class="re2-overlay" id="re-overlay" style="display:none">
        <div class="re2-ov-grid">
          <div class="re2-ov-item"><div class="v" id="rov-kwp">—</div><div class="l">System kWp</div></div>
          <div class="re2-ov-item"><div class="v" id="rov-panels">—</div><div class="l">Panels</div></div>
          <div class="re2-ov-item"><div class="v" id="rov-save">—</div><div class="l">Save/yr</div></div>
          <div class="re2-ov-item"><div class="v" id="rov-grant">—</div><div class="l">SEAI Grant</div></div>
        </div>
        <div class="re2-suit">
          <div class="re2-suit-row"><span>Roof Suitability</span><strong id="rov-suit-label">—</strong></div>
          <div class="re2-suit-track"><div class="re2-suit-fill" id="rov-suit-fill"></div></div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Form + results -->
    <div class="re2-panel">
      <div class="re2-tag">Roof Estimator</div>
      <div class="re2-title">See <em>your roof</em><br>from space</div>
      <div class="re2-sub">Enter your eircode and see your rooftop with estimated panel placement and savings.</div>

      <!-- Address search -->
      <div class="re2-search">
        <input class="re2-input" id="re-address" type="text" placeholder="Eircode — e.g. D01 X2P3" onkeydown="if(event.key==='Enter')reEstimate()">
        <button class="re2-btn" onclick="reEstimate()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
          Estimate
        </button>
      </div>

      <!-- Loading -->
      <div class="re2-loading" id="re-loading"><div class="re2-spin"></div>Locating your roof…</div>

      <!-- Hidden fields (still used by JS) -->
      <div class="re-fields-hidden" id="re-fields-wrap" style="display:none">
        <div class="re-fields">
          <div class="re-field"><label>Roof orientation <span class="re-auto-badge" id="badge-orient" style="display:none">✦ Auto-filled</span></label><select id="re-orient" onchange="this.dataset.userSet='1';document.getElementById('badge-orient').style.display='none';reRecalc()"><option value="south">South / SW (ideal)</option><option value="east">East or West</option><option value="flat">Flat roof</option><option value="north">North facing</option></select></div>
          <div class="re-field"><label>House type <span class="re-auto-badge" id="badge-house" style="display:none">✦ Auto-filled</span></label><select id="re-house" onchange="document.getElementById('badge-house').style.display='none';reRecalc()"><option value="detached">Detached</option><option value="semi">Semi-detached</option><option value="bungalow">Bungalow</option><option value="terraced">Terraced</option></select></div>
          <div class="re-field"><label>Annual bill (€) <span class="re-auto-badge" id="badge-bill" style="display:none">✦ From your bill</span></label><input id="re-bill" type="number" min="500" max="8000" value="2200" onchange="document.getElementById('badge-bill').style.display='none';reRecalc()" placeholder="e.g. 2200"></div>
          <div class="re-field"><label>County <span class="re-auto-badge" id="badge-county" style="display:none">✦ Auto-filled</span></label><select id="re-county" onchange="document.getElementById('badge-county').style.display='none';reRecalc()"><optgroup label="Leinster"><option value="carlow" selected>Carlow</option><option value="dublin">Dublin</option><option value="kildare">Kildare</option><option value="kilkenny">Kilkenny</option><option value="laois">Laois</option><option value="longford">Longford</option><option value="louth">Louth</option><option value="meath">Meath</option><option value="offaly">Offaly</option><option value="westmeath">Westmeath</option><option value="wexford">Wexford</option><option value="wicklow">Wicklow</option></optgroup><optgroup label="Munster"><option value="clare">Clare</option><option value="cork">Cork</option><option value="kerry">Kerry</option><option value="limerick">Limerick</option><option value="tipperary">Tipperary</option><option value="waterford">Waterford</option></optgroup><optgroup label="Connacht"><option value="galway">Galway</option><option value="leitrim">Leitrim</option><option value="mayo">Mayo</option><option value="roscommon">Roscommon</option><option value="sligo">Sligo</option></optgroup><optgroup label="Ulster (ROI)"><option value="cavan">Cavan</option><option value="donegal">Donegal</option><option value="monaghan">Monaghan</option></optgroup><optgroup label="Northern Ireland"><option value="antrim">Antrim</option><option value="armagh">Armagh</option><option value="belfast">Belfast</option><option value="derry">Derry</option><option value="down">Down</option><option value="fermanagh">Fermanagh</option><option value="tyrone">Tyrone</option></optgroup></select></div>
        </div>
      </div>

      <!-- Results -->
      <div class="re2-res" id="re-results">
        <div class="re2-res-grid">
          <div class="re2-res-item"><div class="re2-res-val" id="rr-kwp">4.8 kWp</div><div class="re2-res-lbl">System size</div></div>
          <div class="re2-res-item"><div class="re2-res-val" id="rr-panels">12 panels</div><div class="re2-res-lbl">Panels needed</div></div>
          <div class="re2-res-item"><div class="re2-res-val lime" id="rr-save">€1,144</div><div class="re2-res-lbl">Saving / year</div></div>
          <div class="re2-res-item"><div class="re2-res-val earth" id="rr-grant">€1,800</div><div class="re2-res-lbl">SEAI grant</div></div>
          <div class="re2-res-item"><div class="re2-res-val" id="rr-payback">5.8 yrs</div><div class="re2-res-lbl">Payback period</div></div>
          <div class="re2-res-item"><div class="re2-res-val lime" id="rr-25yr">€22,800</div><div class="re2-res-lbl">25-yr return</div></div>
        </div>
        <div class="re2-panel-suit">
          <div class="re2-panel-suit-row"><span>Roof suitability</span><strong id="rr-suit-label">Very Good — 82%</strong></div>
          <div class="re2-panel-suit-track"><div class="re2-panel-suit-fill" id="rr-suit-fill"></div></div>
        </div>
        <a class="re2-cta-survey" href="https://cal.com/renewableireland/15min" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6.75 3v1.5M17.25 3v1.5M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
          Pick a survey time
        </a>
        <a class="re2-cta-wa" id="wa-smart-cta" href="https://wa.me/353873958424" target="_blank" rel="noopener">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Send estimate to WhatsApp
        </a>
      </div>

      <!-- Pre-search tips -->
      <div class="re2-tips" id="re-placeholder-tips">
        <div class="re2-tips-title">What you'll get</div>
        <ul style="margin:0;padding:0">
          <li>Satellite view of your roof at 19× zoom</li>
          <li>Estimated panel count &amp; system size</li>
          <li>Annual saving based on your electricity bill</li>
          <li>SEAI grant amount &amp; payback period</li>
          <li>Roof suitability score</li>
        </ul>
      </div>

    </div>
  </div>
</section>


<!-- IF YOU DO NOTHING -->
<section class="donothing-sec">
  <div class="dn-inner">
    <div class="stag lt" style="justify-content:center">The honest numbers</div>
    <h2 class="stitle lt" style="margin-top:8px">What does <em>doing nothing</em> cost?</h2>
    <p class="ssub lt" style="margin:12px auto 0;text-align:center;max-width:480px">Irish electricity rises ~3%/yr. Over 20 years, the difference is significant.</p>
    <div class="dn-grid" style="position:relative">
      <div class="dn-card bad">
        <div class="dn-tag bad">Stay on grid</div>
        <div class="dn-cost bad" id="dn-grid">€38,400</div>
        <div class="dn-desc">20 years of bills at current rates, rising 3% each year.</div>
      </div>
      <div class="dn-vs">vs</div>
      <div class="dn-card good">
        <div class="dn-tag good">Go solar</div>
        <div class="dn-cost good" id="dn-solar">€13,900</div>
        <div class="dn-desc">Install after SEAI grant, plus minimal grid top-up.</div>
      </div>
    </div>
    <div class="dn-saving">
      <div class="dn-saving-val" id="dn-diff">€24,500</div>
      <div class="dn-saving-lbl">saved over 20 years<br>by going solar today</div>
    </div>
  </div>
</section>


<!-- FAQ -->
<section class="sec sec-white" id="faq" style="border-top:var(--bd);border-bottom:var(--bd)">
  <div class="stag rev">Questions Answered</div>
  <h2 class="stitle rev">What every Irish<br>homeowner <em>asks.</em></h2>
  <div class="faqwrap">
    <div class="rev">
      <div class="fi3"><div class="fq" onclick="tf(this)">Do I need planning permission?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg></div><div class="fa3">In most cases, no. Solar PV panels are exempt from planning permission in Ireland under standard residential installation criteria. We confirm during your free survey.</div></div>
      <div class="fi3"><div class="fq" onclick="tf(this)">How much will panels produce in Ireland?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg></div><div class="fa3">A typical 4kWp system in Ireland produces 3,400–3,800 kWh per year — around 85% of the average Irish household's consumption. Modern panels generate 10–25% of peak output even under heavy cloud.</div></div>
      <div class="fi3"><div class="fq" onclick="tf(this)">How long does installation take?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg></div><div class="fa3">The install is one day. From first contact to live panels is typically 10–14 days — survey, quote, SEAI application and installation. You track every step in your portal.</div></div>
      <div class="fi3"><div class="fq" onclick="tf(this)">Can I sell electricity back to the grid?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg></div><div class="fa3">Yes. All major Irish suppliers now offer a Clean Export Guarantee tariff. You need a smart meter — we arrange this as part of installation. Most customers earn €200–400/year from export.</div></div>
      <div class="fi3"><div class="fq" onclick="tf(this)">What warranty do I get?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg></div><div class="fa3">25-year performance warranty on panels. 10-year warranty on the inverter. 5-year workmanship warranty on our installation. All documented in your portal.</div></div>
      <div class="fi3"><div class="fq" onclick="tf(this)">Is my roof suitable?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg></div><div class="fa3">South, south-west and south-east facing roofs are ideal. East and west can work. Flat roofs are fine with mounting frames. We'll tell you honestly if solar isn't right — we'd rather lose the sale.</div></div>
    </div>
    <div class="faqsb rev">
      <h3>Still have questions?</h3>
      <p>Talk to a real person — no sales pitch, no pressure. Honest answers about whether solar is right for your home.</p>
      <a class="wabtn" href="https://wa.me/353873958424"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Chat on WhatsApp</a>
      <a class="callbtn" href="tel:+353873958424"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>Call: 087 395 8424</a>
    </div>
  </div>
</section>


<!-- WARRANTY TIMELINE -->
<section class="warranty-sec">
  <div style="max-width:860px;margin:0 auto">
    <div class="stag ea">Peace of mind</div>
    <h2 class="stitle">You're covered<br>for <em>25 years.</em></h2>
    <p class="ssub" style="margin-top:12px">Every component, every year — documented in your portal.</p>
    <div class="wtl">
      <div class="wtl-bar">
        <div class="wtl-seg s5"><span class="wtl-seg-lbl">Workmanship</span><span class="wtl-seg-yr">5 yrs</span></div>
        <div class="wtl-seg s10" style="border-left:var(--bd)"><span class="wtl-seg-lbl">Inverter</span><span class="wtl-seg-yr">10 yrs</span></div>
        <div class="wtl-seg s25" style="border-left:var(--bd)"><span class="wtl-seg-lbl">Panel performance</span><span class="wtl-seg-yr">25 yrs</span></div>
      </div>
      <div class="wtl-items">
        <div class="wtl-item">
          <div class="wtl-item-yr">5 yr</div>
          <div class="wtl-item-name">Workmanship warranty</div>
          <div class="wtl-item-desc">Full cover on our installation — fixings, roof penetrations, cable management, and mounting system.</div>
        </div>
        <div class="wtl-item">
          <div class="wtl-item-yr">10 yr</div>
          <div class="wtl-item-name">Inverter warranty</div>
          <div class="wtl-item-desc">Full replacement on the inverter — the brain of your system that converts DC to usable AC power.</div>
        </div>
        <div class="wtl-item">
          <div class="wtl-item-yr">25 yr</div>
          <div class="wtl-item-name">Panel performance</div>
          <div class="wtl-item-desc">Panels guaranteed to produce at least 80% of rated output at year 25. Industry-standard linear degradation.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHY US -->
<section class="sec sec-white" id="how-it-works" style="border-top:var(--bd);border-bottom:var(--bd)">
  <div class="stag rev" style="color:var(--earth);border-color:var(--earth)">Why Renewable Ireland</div>
  <h2 class="stitle rev">Why homeowners<br>choose <em><span style="color:#C4855A">Renewable</span> Ireland.</em></h2>
  <div class="whygrid">
    <div class="whycard rev"><div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div><h3>Vetted local installers</h3><p>Every installer is SEAI-registered, insured, 5+ years trading. We turn away 70% of applicants.</p></div>
    <div class="whycard rev"><div class="wi" style="background:#C4855A"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--black)"><path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"/></svg></div><h3>We handle the SEAI grant</h3><p>Most people leave €1,800 on the table. We manage every step. You collect the money.</p></div>
    <div class="whycard rev"><div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3"/></svg></div><h3>Track your project live</h3><p>Log into your portal at any time. See exactly where your project is — grant to install.</p></div>
    <div class="whycard rev"><div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg></div><h3>Works on cloudy days</h3><p>Modern PV panels generate on overcast Irish days. Specified for Irish conditions.</p></div>
    <div class="whycard rev"><div class="wi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg></div><h3>Smart export ready</h3><p>Sell surplus electricity back to the grid — earn an extra €200–400/year.</p></div>
    <div class="whycard rev" style="border-color:var(--lime-dk);box-shadow:4px 4px 0 var(--lime-dk)"><div class="wi" style="background:#C4855A"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3"/></svg></div><h3>Fixed price — guaranteed</h3><p>What we quote is what you pay. Average install is €9,200 after SEAI grant.</p></div>
  </div>
</section>




    <style>
.county-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto}
.county-card{position:relative;display:flex;align-items:center;background:var(--white);border:var(--bd);border-radius:var(--r);box-shadow:var(--sh);text-decoration:none;overflow:hidden;transition:all .2s ease}
.county-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.12);border-color:var(--card-accent,#a3e635)}
.county-card:hover .cc-accent{width:6px}
.county-card:hover .cc-arrow{opacity:1;transform:translateX(0)}
.county-card:hover .cc-name{color:var(--card-accent,#a3e635)}
.cc-accent{width:4px;min-height:100%;transition:width .2s ease;flex-shrink:0}
.cc-body{display:flex;flex-direction:column;padding:14px 12px;gap:2px;flex:1;min-width:0}
.cc-prov{font-family:var(--font-display);font-size:9px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:.08em}
.cc-name{font-family:var(--font-display);font-size:14px;font-weight:800;color:var(--black);text-transform:uppercase;letter-spacing:-.01em;transition:color .2s}
.cc-meta{font-family:var(--font-body);font-size:11px;color:var(--gray);font-weight:500}
.cc-payback{font-family:var(--font-body);font-size:10px;color:#16a34a;font-weight:700}
.cc-badge{position:absolute;top:8px;right:8px;font-family:var(--font-display);font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:var(--off);color:var(--gray);text-transform:uppercase;letter-spacing:.05em}
.cc-arrow{opacity:0;transform:translateX(-4px);transition:all .2s;color:var(--card-accent,#a3e635);flex-shrink:0;margin-right:12px}
.cg-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;padding:0 4px}
.cg-stats{display:flex;gap:24px}
.cg-stat{text-align:left}
.cg-stat-val{font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--black);line-height:1}
.cg-stat-label{font-size:11px;color:var(--gray);font-weight:500;margin-top:2px}
@media(max-width:769px){.county-grid{grid-template-columns:repeat(2,1fr);gap:8px}.cg-header{flex-direction:column;align-items:flex-start;gap:16px}.cg-stats{gap:16px}}
@media(max-width:480px){.county-grid{grid-template-columns:repeat(2,1fr);gap:6px}.cc-body{padding:10px 8px}.cc-name{font-size:12px}.cc-meta{font-size:10px}}
  </style>

  <div id="areas" style="padding:80px 0 60px;background:var(--white);border-top:var(--bd)">
    <div style="max-width:1200px;margin:0 auto;padding:0 24px">
      <div class="cg-header">
        <div>
          <div style="font-family:var(--font-display);font-size:10px;font-weight:700;color:var(--accent-hover);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Local Expertise Across Ireland</div>
          <h2 style="font-family:var(--font-display);font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;color:var(--black);margin:0 0 8px;letter-spacing:-.02em;text-transform:uppercase">Solar Panels in Your Area</h2>
          <p style="color:var(--gray);font-size:.95rem;max-width:480px;line-height:1.7;margin:0">Click your county below for local pricing, grants, and installation details.</p>
        </div>
        <div class="cg-stats">
          <div class="cg-stat"><div class="cg-stat-val">32</div><div class="cg-stat-label">Counties Covered</div></div>
          <div class="cg-stat"><div class="cg-stat-val">5–7yr</div><div class="cg-stat-label">Avg Payback</div></div>
          <div class="cg-stat"><div class="cg-stat-val">€1,800</div><div class="cg-stat-label">SEAI Solar PV Grant</div></div>
        </div>
      </div>
      <div class="county-grid">
        <a href="/counties/carlow" class="county-card" style="--card-accent:#aeea00">
          <div class="cc-accent" style="background:#aeea00"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Carlow</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/dublin" class="county-card" style="--card-accent:#c8ff00">
          <div class="cc-accent" style="background:#c8ff00"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Dublin</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/kildare" class="county-card" style="--card-accent:#69f0ae">
          <div class="cc-accent" style="background:#69f0ae"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Kildare</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/kilkenny" class="county-card" style="--card-accent:#ffd600">
          <div class="cc-accent" style="background:#ffd600"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Kilkenny</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/laois" class="county-card" style="--card-accent:#dce775">
          <div class="cc-accent" style="background:#dce775"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Laois</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/longford" class="county-card" style="--card-accent:#aed581">
          <div class="cc-accent" style="background:#aed581"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Longford</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/louth" class="county-card" style="--card-accent:#18ffff">
          <div class="cc-accent" style="background:#18ffff"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Louth</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/meath" class="county-card" style="--card-accent:#b2ff59">
          <div class="cc-accent" style="background:#b2ff59"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Meath</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/offaly" class="county-card" style="--card-accent:#c5e1a5">
          <div class="cc-accent" style="background:#c5e1a5"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Offaly</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/westmeath" class="county-card" style="--card-accent:#64dd17">
          <div class="cc-accent" style="background:#64dd17"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Westmeath</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/wexford" class="county-card" style="--card-accent:#00e5ff">
          <div class="cc-accent" style="background:#00e5ff"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Wexford</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/wicklow" class="county-card" style="--card-accent:#1de9b6">
          <div class="cc-accent" style="background:#1de9b6"></div>
          <div class="cc-body">
            <span class="cc-prov">Leinster</span>
            <span class="cc-name">Wicklow</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/clare" class="county-card" style="--card-accent:#ff6d00">
          <div class="cc-accent" style="background:#ff6d00"></div>
          <div class="cc-body">
            <span class="cc-prov">Munster</span>
            <span class="cc-name">Clare</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/cork" class="county-card" style="--card-accent:#00c853">
          <div class="cc-accent" style="background:#00c853"></div>
          <div class="cc-body">
            <span class="cc-prov">Munster</span>
            <span class="cc-name">Cork</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/kerry" class="county-card" style="--card-accent:#00bfa5">
          <div class="cc-accent" style="background:#00bfa5"></div>
          <div class="cc-body">
            <span class="cc-prov">Munster</span>
            <span class="cc-name">Kerry</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/limerick" class="county-card" style="--card-accent:#76ff03">
          <div class="cc-accent" style="background:#76ff03"></div>
          <div class="cc-body">
            <span class="cc-prov">Munster</span>
            <span class="cc-name">Limerick</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/tipperary" class="county-card" style="--card-accent:#ffab00">
          <div class="cc-accent" style="background:#ffab00"></div>
          <div class="cc-body">
            <span class="cc-prov">Munster</span>
            <span class="cc-name">Tipperary</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/waterford" class="county-card" style="--card-accent:#00e676">
          <div class="cc-accent" style="background:#00e676"></div>
          <div class="cc-body">
            <span class="cc-prov">Munster</span>
            <span class="cc-name">Waterford</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/galway" class="county-card" style="--card-accent:#00bfa5">
          <div class="cc-accent" style="background:#00bfa5"></div>
          <div class="cc-body">
            <span class="cc-prov">Connacht</span>
            <span class="cc-name">Galway</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/leitrim" class="county-card" style="--card-accent:#7cb342">
          <div class="cc-accent" style="background:#7cb342"></div>
          <div class="cc-body">
            <span class="cc-prov">Connacht</span>
            <span class="cc-name">Leitrim</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/mayo" class="county-card" style="--card-accent:#26a69a">
          <div class="cc-accent" style="background:#26a69a"></div>
          <div class="cc-body">
            <span class="cc-prov">Connacht</span>
            <span class="cc-name">Mayo</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/roscommon" class="county-card" style="--card-accent:#8bc34a">
          <div class="cc-accent" style="background:#8bc34a"></div>
          <div class="cc-body">
            <span class="cc-prov">Connacht</span>
            <span class="cc-name">Roscommon</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/sligo" class="county-card" style="--card-accent:#4db6ac">
          <div class="cc-accent" style="background:#4db6ac"></div>
          <div class="cc-body">
            <span class="cc-prov">Connacht</span>
            <span class="cc-name">Sligo</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/antrim" class="county-card" style="--card-accent:#448aff">
          <div class="cc-accent" style="background:#448aff"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Antrim</span>
            <span class="cc-meta">£6,000 – £9,000</span>
            <span class="cc-payback">6–8 years payback</span>
          </div>
          <span class="cc-badge">MCS</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/armagh" class="county-card" style="--card-accent:#536dfe">
          <div class="cc-accent" style="background:#536dfe"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Armagh</span>
            <span class="cc-meta">£6,000 – £9,000</span>
            <span class="cc-payback">6–8 years payback</span>
          </div>
          <span class="cc-badge">MCS</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/cavan" class="county-card" style="--card-accent:#9ccc65">
          <div class="cc-accent" style="background:#9ccc65"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Cavan</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/donegal" class="county-card" style="--card-accent:#00c853">
          <div class="cc-accent" style="background:#00c853"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Donegal</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/down" class="county-card" style="--card-accent:#2979ff">
          <div class="cc-accent" style="background:#2979ff"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Down</span>
            <span class="cc-meta">£6,000 – £9,000</span>
            <span class="cc-payback">6–8 years payback</span>
          </div>
          <span class="cc-badge">MCS</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/fermanagh" class="county-card" style="--card-accent:#304ffe">
          <div class="cc-accent" style="background:#304ffe"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Fermanagh</span>
            <span class="cc-meta">£6,000 – £9,000</span>
            <span class="cc-payback">6–8 years payback</span>
          </div>
          <span class="cc-badge">MCS</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/londonderry" class="county-card" style="--card-accent:#2962ff">
          <div class="cc-accent" style="background:#2962ff"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Derry</span>
            <span class="cc-meta">£6,000 – £9,000</span>
            <span class="cc-payback">6–8 years payback</span>
          </div>
          <span class="cc-badge">MCS</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/monaghan" class="county-card" style="--card-accent:#4db6ac">
          <div class="cc-accent" style="background:#4db6ac"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Monaghan</span>
            <span class="cc-meta">€4,500 – €6,500</span>
            <span class="cc-payback">5–7 years payback</span>
          </div>
          <span class="cc-badge">SEAI</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
        <a href="/counties/tyrone" class="county-card" style="--card-accent:#E10600">
          <div class="cc-accent" style="background:#E10600"></div>
          <div class="cc-body">
            <span class="cc-prov">Ulster</span>
            <span class="cc-name">Tyrone</span>
            <span class="cc-meta">£6,000 – £9,000</span>
            <span class="cc-payback">6–8 years payback</span>
          </div>
          <span class="cc-badge">MCS</span>
          <svg class="cc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>

<footer style="border-top:3px solid #C4855A">
  <div class="fb-bottom"><span>© Renewable Ireland 2025 · SEAI Registered Partner</span><span>Privacy · Terms</span></div>

  <!-- Google Reviews footer link -->
  <div style="border-top:1px solid rgba(255,255,255,.08);margin-top:32px;padding-top:24px;text-align:center">
    <a href="https://g.page/r/CRenewableIreland/review" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:var(--pill);padding:10px 20px;transition:border-color .15s" aria-label="Read our Google Reviews">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      <span style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.06em">Read our Google Reviews</span>
      <span style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;color:var(--lime)">4.9 ★</span>
    </a>
  </div>
</footer>

<!-- FLOATING SAVE BAR -->
<div id="save-bar" role="status" aria-live="polite">
  <div class="sb-text">
    <strong>Still thinking? Your saved estimate:</strong>
    <span>Saving <span class="sb-est" id="sb-saving">€1,080</span>/yr · SEAI grant <span class="sb-est" id="sb-grant">€1,800</span> · Payback <span id=sb-payback">4.4 yrs</span></span>
  </div>
  <a href="https://cal.com/renewableireland/15min" class="btn-lime" style="white-space:nowrap;padding:10px 18px;font-size:12px" target="_blank" rel="noopener">Book a call <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
  <button class="sb-dismiss" onclick="document.getElementById('save-bar').classList.remove('on');sessionStorage.setItem('sb-dismissed','1')" aria-label="Dismiss">✕</button>
</div>

<!-- PDF EMAIL MODAL -->
<div id="pdf-email-modal" style="position:fixed;inset:0;z-index:800;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px" onclick="if(event.target===this)this.classList.remove('on')">
  <div style="background:var(--white);border:var(--bd);border-radius:var(--rlg);max-width:400px;width:100%;overflow:hidden;box-shadow:var(--shxl)">
    <div style="background:var(--black);padding:18px 22px;border-bottom:3px solid var(--lime)">
      <div style="font-family:Barlow Condensed,sans-serif;font-size:16px;font-weight:800;color:var(--white);text-transform:uppercase">Send me the PDF summary</div>
      <div style="font-size:10px;color:rgba(255,255,255,.4);margin-top:2px">Your estimate, the SEAI grant guide, and installation timeline</div>
    </div>
    <div style="padding:22px">
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px">
        <div><label style="font-family:Barlow Condensed,sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--hint);display:block;margin-bottom:4px">Your name</label><input type="text" placeholder="Séan Murphy" style="width:100%;border:var(--bd);border-radius:9px;padding:9px 12px;font-size:13px;font-family:Barlow,sans-serif;background:var(--off);outline:none"></div>
        <div><label style="font-family:Barlow Condensed,sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--hint);display:block;margin-bottom:4px">Email address</label><input type="email" placeholder="sean@example.ie" id="pdf-email-input" style="width:100%;border:var(--bd);border-radius:9px;padding:9px 12px;font-size:13px;font-family:Barlow,sans-serif;background:var(--off);outline:none"></div>
      </div>
      <button onclick="submitPdfEmail()" style="width:100%;background:var(--black);color:var(--white);border:2.5px solid var(--black);border-radius:var(--pill);padding:12px;font-family:Barlow Condensed,sans-serif;font-size:13px;font-weight:700;cursor:pointer;box-shadow:var(--sh);text-transform:uppercase;letter-spacing:.04em">Send my PDF →</button>
      <div style="font-size:10px;color:var(--hint);text-align:center;margin-top:8px">No spam. Unsubscribe any time.</div>
    </div>
  </div>
</div>

<div class="mobcta"><a href="#get-started">Get your free solar quote →</a></div>




<!-- ── GDPR COOKIE BANNER ─────────────────────────────────────────── -->
<style>
#gdpr-banner{position:fixed;bottom:0;left:0;right:0;z-index:500;background:var(--black);border-top:3px solid var(--lime);padding:16px 40px;display:flex;align-items:center;justify-content:space-between;gap:20px;transform:translateY(100%);transition:transform .4s cubic-bezier(.16,1,.3,1)}
#gdpr-banner.on{transform:translateY(0)}
.gdpr-text{font-size:12px;color:rgba(255,255,255,.65);line-height:1.6;max-width:680px}
.gdpr-text strong{color:var(--white);font-family:'Barlow Condensed',sans-serif;font-size:13px;letter-spacing:.02em;text-transform:uppercase}
.gdpr-text a{color:var(--lime);text-decoration:underline}
.gdpr-btns{display:flex;gap:10px;flex-shrink:0}
.gdpr-accept{background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:var(--pill);padding:10px 22px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;box-shadow:var(--sh);transition:all .15s;white-space:nowrap}
.gdpr-accept:hover{transform:translate(-2px,-2px);box-shadow:var(--shlg)}
.gdpr-decline{background:transparent;color:rgba(255,255,255,.45);border:2px solid rgba(255,255,255,.2);border-radius:var(--pill);padding:10px 18px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;transition:all .15s;white-space:nowrap}
.gdpr-decline:hover{color:var(--white);border-color:rgba(255,255,255,.5)}

/* ── EXIT INTENT POPUP ───────────────────────────────────────────── */
#exit-overlay{position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px}
#exit-overlay.on{display:flex}
#exit-popup{background:var(--black);border:var(--bd);border-radius:var(--rlg);box-shadow:var(--shxl);max-width:480px;width:100%;overflow:hidden;animation:exitpop .3s cubic-bezier(.16,1,.3,1)}
@keyframes exitpop{from{opacity:0;transform:scale(.92) translateY(-20px)}to{opacity:1;transform:scale(1) translateY(0)}}
.exit-head{background:var(--black);padding:24px 26px 20px;position:relative;border-bottom:1.5px solid rgba(255,255,255,.1)}
.exit-head-tag{display:inline-flex;align-items:center;gap:6px;background:var(--lime);color:var(--black);border-radius:var(--pill);padding:3px 12px;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}
.exit-head h2{font-family:'Barlow Condensed',sans-serif;font-size:clamp(22px,4vw,30px);font-weight:800;text-transform:uppercase;line-height:1;color:var(--white);margin-bottom:6px}
.exit-head h2 span{color:var(--lime)}
.exit-head p{font-size:13px;color:rgba(255,255,255,.45);line-height:1.5}
.exit-logo-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.exit-close{position:absolute;top:14px;right:16px;background:rgba(255,255,255,.08);border:none;width:28px;height:28px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(255,255,255,.6);transition:background .15s}
.exit-close:hover{background:rgba(255,255,255,.15);color:var(--white)}
.exit-body{padding:20px 26px 24px}

.exit-perk{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--gray)}
.exit-perk svg{width:16px;height:16px;color:var(--lime-dk);flex-shrink:0}

.exit-cta-main{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:var(--pill);padding:14px 20px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;text-decoration:none;transition:all .15s;box-shadow:var(--sh);width:100%}
.exit-cta-main:hover{transform:translate(-2px,-2px);box-shadow:var(--shlg)}
.exit-cta-sec{font-size:11px;color:rgba(255,255,255,.3);cursor:pointer;text-decoration:underline;white-space:nowrap;background:none;border:none;font-family:'Barlow',sans-serif;display:block;text-align:center;margin-top:10px}
.exit-cta-sec:hover{color:rgba(255,255,255,.6)}





/* ── CALC TOOLTIP HINTS ─────────────────────────────────── */
.cres-item{position:relative}
.chint{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;border:1.5px solid rgba(255,255,255,.3);font-size:8px;font-weight:800;color:rgba(255,255,255,.45);cursor:pointer;font-family:'Barlow Condensed',sans-serif;vertical-align:middle;margin-left:4px;flex-shrink:0;transition:all .15s;position:relative}
.chint:hover{background:var(--lime);border-color:var(--lime-dk);color:var(--black)}
.chint-pop{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:var(--white);border:var(--bd);border-radius:10px;padding:10px 13px;font-size:11px;color:var(--gray);line-height:1.55;width:200px;box-shadow:var(--sh);z-index:50;pointer-events:none;opacity:0;transition:opacity .15s}
.chint-pop::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:var(--black)}
.chint:hover .chint-pop,.chint:focus .chint-pop{opacity:1;pointer-events:auto}
.rl{display:flex;align-items:center;gap:0}

/* ── PRICE FRAMING ───────────────────────────────────────── */
.price-frame{background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.15);border-radius:var(--r);padding:14px 18px;margin-bottom:12px}
.pf-before{font-family:'Barlow Condensed',sans-serif;font-size:13px;color:rgba(255,255,255,.35);text-decoration:line-through;letter-spacing:.02em}
.pf-after{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;color:var(--lime);line-height:1;margin:3px 0}
.pf-note{font-size:11px;color:rgba(255,255,255,.5);line-height:1.5}
.pf-monthly{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:var(--earth);margin-top:5px}

/* ── IF YOU DO NOTHING ───────────────────────────────────── */
.donothing-sec{background:var(--black);border-bottom:var(--bd);padding:64px}
.dn-inner{max-width:800px;margin:0 auto;text-align:center}
.dn-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:32px auto 0}
.dn-card{border:2.5px solid rgba(255,255,255,.12);border-radius:var(--rlg);padding:22px 20px;position:relative}
.dn-card.bad{border-color:rgba(196,133,90,.4);background:rgba(196,133,90,.05)}
.dn-card.good{border-color:rgba(109,201,58,.4);background:rgba(109,201,58,.05)}
.dn-tag{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;padding:3px 10px;border-radius:var(--pill);border:1.5px solid;margin-bottom:12px;display:inline-block;white-space:nowrap}
.dn-tag.bad{color:var(--earth);border-color:var(--earth)}
.dn-tag.good{color:var(--lime);border-color:var(--lime-dk)}
.dn-cost{font-family:'Barlow Condensed',sans-serif;font-size:clamp(28px,5vw,48px);font-weight:800;line-height:1;margin-bottom:8px;white-space:nowrap}
.dn-cost.bad{color:var(--earth)}
.dn-cost.good{color:var(--lime)}
.dn-desc{font-size:12px;color:rgba(255,255,255,.45);line-height:1.6}
.dn-vs{display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;color:rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:.1em;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:32px;height:32px;border:1.5px solid rgba(255,255,255,.12);border-radius:50%;background:var(--black);z-index:2}
.dn-saving{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:16px;padding:16px 20px;background:rgba(109,201,58,.08);border:1.5px solid rgba(109,201,58,.2);border-radius:var(--r)}
.dn-saving-val{font-family:'Barlow Condensed',sans-serif;font-size:clamp(22px,5vw,32px);font-weight:800;color:var(--lime);white-space:nowrap}
.dn-saving-lbl{font-size:12px;color:rgba(255,255,255,.5);line-height:1.45;text-align:left}

/* ── WARRANTY TIMELINE ───────────────────────────────────── */
.warranty-sec{background:var(--off);border-bottom:var(--bd);padding:72px 64px}
.wtl{max-width:860px;margin:36px auto 0;position:relative}
.wtl-bar{height:44px;display:grid;grid-template-columns:20fr 40fr 100fr;border-radius:var(--r);overflow:hidden;border:var(--bd);box-shadow:var(--sh)}
.wtl-seg{display:flex;align-items:center;padding:0 14px;position:relative}
.wtl-seg.s5{background:var(--lime)}
.wtl-seg.s10{background:var(--lime-mid)}
.wtl-seg.s25{background:var(--lime-lt)}
.wtl-seg-lbl{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;color:var(--black);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.wtl-seg-yr{font-size:10px;color:rgba(0,0,0,.5);margin-left:4px}
.wtl-items{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:20px}
.wtl-item{background:var(--white);border:var(--bd);border-radius:var(--r);padding:16px;box-shadow:2px 2px 0 #111}
.wtl-item-yr{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;color:var(--black);line-height:1;margin-bottom:4px}
.wtl-item-name{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--gray);margin-bottom:5px}
.wtl-item-desc{font-size:11px;color:var(--hint);line-height:1.55}

50%{opacity:.4}}
.scarcity-text{flex:1;font-size:12px;color:rgba(255,255,255,.65);line-height:1.5}
.scarcity-text strong{font-family:'Barlow Condensed',sans-serif;font-size:13px;color:var(--white);display:block;margin-bottom:2px}
.sc-track{height:5px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-top:5px}
.sc-fill{height:100%;background:#ff9f43;border-radius:3px;width:47%}

/* ── COMMITMENT CTA STACK ────────────────────────────────── */
.commit-stack{display:flex;flex-direction:column;gap:8px;margin:24px 0}
.commit-btn{display:flex;align-items:center;gap:10px;border-radius:var(--pill);padding:13px 20px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;transition:all .15s;border:2.5px solid var(--black);text-transform:uppercase;letter-spacing:.04em;width:100%}
.commit-btn svg{width:15px;height:15px;flex-shrink:0}
.commit-label{flex:1;text-align:left}
.commit-level{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.55;margin-left:auto;white-space:nowrap}
.cb-high{background:var(--lime);color:var(--black);box-shadow:var(--sh)}
.cb-high:hover{transform:translate(-2px,-2px);box-shadow:var(--shlg)}
.cb-med{background:var(--white);color:var(--black);box-shadow:2px 2px 0 #111}
.cb-med:hover{transform:translate(-2px,-2px);box-shadow:var(--sh)}
.cb-low{background:var(--off);color:var(--black)}
.cb-low:hover{background:var(--lime-lt)}
.cb-zero{background:transparent;color:var(--black);border-color:rgba(0,0,0,.25)}
.cb-zero:hover{background:rgba(0,0,0,.04)}

/* ── FLOATING SAVE BAR ───────────────────────────────────── */
#save-bar{position:fixed;bottom:0;left:0;right:0;z-index:96;background:var(--white);border-top:var(--bd);padding:10px 52px;display:flex;align-items:center;gap:16px;transform:translateY(100%);transition:transform .4s cubic-bezier(.16,1,.3,1);box-shadow:0 -4px 24px rgba(0,0,0,.08)}
#save-bar.on{transform:translateY(0)}
.sb-text{flex:1;font-size:13px;color:var(--gray)}
.sb-text strong{font-family:'Barlow Condensed',sans-serif;font-size:15px;color:var(--black);font-weight:800;text-transform:uppercase;letter-spacing:.02em;display:block;margin-bottom:1px}
.sb-est{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:var(--lime-dk)}
.sb-dismiss{background:none;border:none;cursor:pointer;color:var(--hint);font-size:18px;padding:4px;flex-shrink:0}

/* ── PROGRESSIVE DISCLOSURE ──────────────────────────────── */
.re-fields-hidden{overflow:hidden;max-height:0;transition:max-height .4s cubic-bezier(.16,1,.3,1),opacity .3s ease;opacity:0}
.re-fields-hidden.revealed{max-height:500px;opacity:1}

/* ── EXIT GUIDE OFFER ────────────────────────────────────── */
.exit-guide{display:none;flex-direction:column;gap:12px}
.exit-guide.on{display:flex}
.egc-icon{width:48px;height:48px;background:var(--lime);border:2.5px solid var(--black);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:2px 2px 0 var(--black)}
.egc-icon svg{width:22px;height:22px;color:var(--black)}
.egc-title{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;color:var(--white);text-transform:uppercase;margin-bottom:4px}
.egc-sub{font-size:11px;color:rgba(255,255,255,.5);line-height:1.5;margin-bottom:14px}
.egc-chapters{display:flex;flex-direction:column;gap:5px;margin-bottom:14px;text-align:left}
.egc-ch{display:flex;align-items:center;gap:7px;font-size:11px;color:rgba(255,255,255,.6)}
.egc-ch::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--lime);flex-shrink:0}
.egc-input{display:flex;gap:7px}
.egc-email{flex:1;padding:9px 12px;border:2.5px solid rgba(255,255,255,.2);border-radius:var(--pill);background:rgba(255,255,255,.07);font-family:'Barlow',sans-serif;font-size:12px;color:var(--white);outline:none}
.egc-email::placeholder{color:rgba(255,255,255,.3)}
.egc-email:focus{border-color:var(--lime)}
.egc-dl{background:var(--lime);color:var(--black);border:2.5px solid var(--black);border-radius:var(--pill);padding:9px 16px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s;text-transform:uppercase}
.egc-dl:hover{transform:translate(-1px,-1px);box-shadow:2px 2px 0 var(--black)}
.exit-or{font-size:10px;color:rgba(255,255,255,.25);text-align:center;text-transform:uppercase;letter-spacing:.06em;margin:4px 0}


/* ── LOADING STATES ─────────────────────────────────────────────────────────── */

.btn-loading .btn-spin{display:inline-block}
.btn-loading 
.btn-spin{display:none;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:currentColor;border-radius:50%;animation:spin .65s linear infinite;flex-shrink:0;vertical-align:middle}
.btn-spin.dark{border-color:rgba(0,0,0,.2);border-top-color:var(--black)}
@keyframes spin{to{transform:rotate(360deg)}}
button:disabled,
button:disabled:hover,.btn-disabled:hover{transform:none!important;box-shadow:var(--sh)!important}
/* wsub-btn loading */
.wsub-btn.loading{pointer-events:none;opacity:.75}
.wsub-btn.loading .btn-spin{display:inline-block}
/* pg-submit loading */
.pg-submit.loading{pointer-events:none;opacity:.75}
.pg-submit.loading .btn-spin{display:inline-block}
/* re-estimate button */
.re-estimate-btn.loading{pointer-events:none;opacity:.75}
.re-estimate-btn.loading .btn-spin{display:inline-block}
/* inline feedback messages */

.btn-feedback
.btn-feedback.err{display:block;color:var(--earth)}
/* AI upload loading overlay on dropzone */
.upzone.analysing{pointer-events:none}
.upzone.analysing .upicon{background:var(--gray-lt)}
.ai-progress{height:3px;background:var(--gray-lt);border-radius:2px;overflow:hidden;margin-top:8px;display:none}
.ai-progress.on{display:block}
.ai-progress-fill{height:100%;background:var(--lime);border-radius:2px;width:0;transition:width 1.6s cubic-bezier(.4,0,.2,1)}
</style>

<!-- GDPR Banner -->
<div id="gdpr-banner">
  <div class="gdpr-text">
    <strong>We use cookies 🍪</strong><br>
    We use essential cookies to make this site work, and optional analytics cookies to understand how visitors use it. We never sell your data. See our <a href="#">Privacy Policy</a>.
  </div>
  <div class="gdpr-btns">
    <button class="gdpr-decline" onclick="gdprDecline()">Essential only</button>
    <button class="gdpr-accept" onclick="gdprAccept()">Accept all</button>
  </div>
</div>

<!-- Exit Intent Popup -->
<div id="exit-overlay" onclick="exitClose(event)">
  <div id="exit-popup">
    <div class="exit-head">
      <button class="exit-close" onclick="exitDismiss()" aria-label="Close">&#x2715;</button>
      <div class="exit-head-tag">&#x26A1; Before you go</div>
      <h2>Get your free<br>solar <span>estimate.</span></h2>
      <p>No email required. See your savings in 30 seconds.</p>
    </div>
    <div class="exit-body">
      <div class="exit-guide on" id="exit-guide-panel">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
          <div style="background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;text-align:center"><div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:var(--lime);line-height:1;margin-bottom:3px">&#x20AC;1,080</div><div style="font-size:9px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Avg saving/yr</div></div>
          <div style="background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;text-align:center"><div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:#d4a96a;line-height:1;margin-bottom:3px">&#x20AC;1,800</div><div style="font-size:9px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.06em;font-weight:700">SEAI grant</div></div>
          <div style="background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;text-align:center"><div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;color:var(--white);line-height:1;margin-bottom:3px">4.4 yrs</div><div style="font-size:9px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.06em;font-weight:700">Payback</div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:18px">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.55)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6DC93A" stroke-width="3"><path d="M4.5 12.75l6 6 9-13.5"/></svg>Free site survey</div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.55)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6DC93A" stroke-width="3"><path d="M4.5 12.75l6 6 9-13.5"/></svg>SEAI grant handled</div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.55)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6DC93A" stroke-width="3"><path d="M4.5 12.75l6 6 9-13.5"/></svg>Installed in 1 day</div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.55)"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6DC93A" stroke-width="3"><path d="M4.5 12.75l6 6 9-13.5"/></svg>No obligation</div>
        </div>
        <a class="exit-cta-main" href="#get-started" onclick="exitDismiss()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
          Get my free estimate
        </a>
        <button class="exit-cta-sec" onclick="exitDismiss()">No thanks, I'll stay on full bills</button>
      </div>
    </div>
  </div>
</div>

<!-- PRICE MATCH MODAL -->
<div id="pmatch-modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" onclick="if(event.target===this)closePmatch()">
  <div class="pm-box">
    <div class="pm-head">
      <div>
        <div class="pm-head-txt">
          <strong id="pm-title">Price match guarantee</strong>
          <span>We'll match or beat any like-for-like quote</span>
        </div>
      </div>
      <button class="pm-close" onclick="closePmatch()" aria-label="Close">✕</button>
    </div>
    <div class="pm-body">
      <div id="pm-form-wrap">
        <p>Share the competitor's quote and we'll come back to you within 2 hours with our best price — or we'll beat it by €150.</p>
        <div class="pm-fields">
          <div class="pm-field">
            <label for="pm-name">Your name</label>
            <input id="pm-name" type="text" placeholder="Séan Murphy">
          </div>
          <div class="pm-field">
            <label for="pm-phone">Phone number</label>
            <input id="pm-phone" type="tel" placeholder="087 000 0000">
          </div>
          <div class="pm-field">
            <label for="pm-company">Competitor company</label>
            <input id="pm-company" type="text" placeholder="e.g. SolarCo Ireland">
          </div>
          <div class="pm-field">
            <label for="pm-price">Their quoted price (€)</label>
            <input id="pm-price" type="number" placeholder="e.g. 9800">
          </div>
          <div class="pm-field">
            <label for="pm-details">System details (panels, kWp, inclusions)</label>
            <textarea id="pm-details" placeholder="e.g. 12 panels, 4.8kWp, inverter included, 10yr warranty…"></textarea>
          </div>
        </div>
        <button class="pm-submit" onclick="submitPmatch()">Send my quote for matching <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline;vertical-align:middle;margin-left:4px"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      </div>
      <div class="pm-success" id="pm-success">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
        <strong>Quote received — we're on it!</strong>
        <p>We'll be in touch within 2 hours with our best price. If we can't beat it, we'll tell you honestly.</p>
      </div>
    </div>
  </div>
</div>


<!-- ── SOLARPILOT MODAL ──────────────────────────────────────────────────────── -->
<div id="sp-modal" style="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.82);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:0">
  <div id="sp-modal-inner" style="position:relative;width:100%;height:100%;max-width:1100px;max-height:90vh;background:#111;border:1.5px solid rgba(109,201,58,.3);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;margin:auto;top:50%;transform:translateY(-50%)">
    <!-- Header bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:8px;height:8px;border-radius:50%;background:var(--lime);animation:sp-pulse 2s ease-in-out infinite"></div>
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.08em">SolarPilot — Your Quote</span>
      </div>
      <button onclick="closeSolarPilot()" style="background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.1);border-radius:50%;width:32px;height:32px;cursor:pointer;color:rgba(255,255,255,.5);font-size:16px;display:flex;align-items:center;justify-content:center;transition:all .15s" aria-label="Close">&times;</button>
    </div>
    <!-- Loading state (shown while iframe loads) -->
    <div id="sp-loading" style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:16px;padding:40px">
      <div style="width:44px;height:44px;border:3px solid rgba(109,201,58,.2);border-top-color:var(--lime);border-radius:50%;animation:sp-spin 0.8s linear infinite"></div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.06em" id="sp-loading-text">Sending your bill…</div>
      <div style="font-size:12px;color:rgba(255,255,255,.3)" id="sp-loading-sub">Uploading to SolarPilot — this takes a few seconds</div>
    </div>
    <!-- iframe (hidden until loaded) -->
    <iframe id="sp-iframe" style="display:none;flex:1;width:100%;border:0" allowfullscreen></iframe>
    <!-- Error state -->
    <div id="sp-error" style="display:none;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:16px;padding:40px;text-align:center">
      <div style="font-size:32px">⚠️</div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:var(--white)">Couldn't connect to SolarPilot</div>
      <div style="font-size:13px;color:rgba(255,255,255,.4);max-width:360px;line-height:1.6" id="sp-error-msg">Your bill was uploaded but we couldn't open your portal. We'll be in touch shortly.</div>
      <button onclick="closeSolarPilot()" style="margin-top:8px;padding:12px 28px;background:var(--lime);color:var(--black);border:2px solid var(--black);border-radius:var(--pill);font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;cursor:pointer;text-transform:uppercase;letter-spacing:.05em">Close</button>
    </div>
  </div>
</div>
<!-- Custom Cursor elements now live in layout.tsx body (outside PPR S:0 boundary) -->
<style>
@keyframes sp-spin { to { transform: rotate(360deg); } }
@keyframes sp-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
</style>
`;