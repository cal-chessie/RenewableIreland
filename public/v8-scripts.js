
// ─── DOM READY POLYFILL ─────────────────────────────────────────────────
// This script loads via React useEffect (after mount), so DOMContentLoaded has already fired.
// Intercept addEventListener to ensure 'DOMContentLoaded' callbacks still execute.
(function(){
  var _origAdd = document.addEventListener;
  document.addEventListener = function(type, listener, options) {
    if (type === 'DOMContentLoaded' && document.readyState !== 'loading') {
      try { if (typeof listener === 'function') setTimeout(listener, 0); } catch(e) {}
      return;
    }
    return _origAdd.call(document, type, listener, options);
  };
})();

var hsl=['1–2 bed','2 bed','3 bed','4+ bed'];
var sys=[2.0,3.5,4.5,6.0]; // typical Irish installs: 1-2bed=2.0, 3bed=3.5, 4bed=4.5, large=6.0kWp
var gr=[900,1500,1800,1800]; // SEAI 2024: <2kWp=€900, 2-4kWp=€1,500, >4kWp=€1,800
var cf={carlow:1.02,wexford:1.05,kilkenny:1.03,wicklow:1.01,kildare:1.01,laois:1.01,dublin:1.00,meath:1.00,louth:0.99,longford:0.98,offaly:0.99,westmeath:0.98,galway:0.98,mayo:0.96,sligo:0.95,roscommon:0.97,leitrim:0.94,clare:1.02,cork:1.06,kerry:1.05,limerick:1.02,tipperary:1.02,waterford:1.04,cavan:0.98,donegal:0.93,monaghan:0.98,antrim:0.96,armagh:0.97,belfast:0.96,derry:0.94,down:0.97,fermanagh:0.95,tyrone:0.96}; // PVGIS-based irradiance factors
// ─── SMART ORIENTATION DEFAULTS BY COUNTY ─────────────────────────────────
// South-biased counties get "south" pre-selected; east-coast get east/west suggestion
var COUNTY_ORIENT = {
  cork:'south', kerry:'south', wexford:'south', waterford:'south',
  limerick:'south', clare:'south', tipperary:'south',
  wicklow:'east', dublin:'east', louth:'east',
  galway:'south', mayo:'south', sligo:'south'
};
// House type inference: map savings-calc slider index → estimator house value
var HS_TO_HOUSE = ['terraced','semi','semi','detached'];

function showBadge(id){ var b=document.getElementById(id); if(b){ b.style.display='inline-flex'; } }
function hideBadge(id){ var b=document.getElementById(id); if(b){ b.style.display='none'; } }

// ─── MASTER SYNC: keeps both calculators in harmony ───────────────────────
function syncCalculators(source){
  // source = 'savings' | 'estimator' | 'bill'
  var ccEl    = document.getElementById('cc');
  var reCounty= document.getElementById('re-county');
  var hsSel   = document.getElementById('hs');
  var spEl    = document.getElementById('sp');
  var reBill  = document.getElementById('re-bill');
  var reHouse = document.getElementById('re-house');
  var reOrient= document.getElementById('re-orient');

  if(source === 'savings'){
    // County changed in savings calc → push to estimator
    if(ccEl && reCounty && ccEl.value){
      var cval = ccEl.value;
      if(reCounty.value !== cval){
        reCounty.value = cval;
        showBadge('badge-county');
      }
      // Apply smart orientation default if estimator hasn't been touched by user
      if(reOrient && !reOrient.dataset.userSet && COUNTY_ORIENT[cval]){
        if(reOrient.value !== COUNTY_ORIENT[cval]){
          reOrient.value = COUNTY_ORIENT[cval];
          showBadge('badge-orient');
        }
      }
    }
    // House slider → infer house type in estimator
    if(hsSel && reHouse){
      var idx = parseInt(hsSel.value) - 1;
      var inferred = HS_TO_HOUSE[idx] || 'semi';
      if(reHouse.value !== inferred){
        reHouse.value = inferred;
        showBadge('badge-house');
      }
    }
    // Spend slider → sync to estimator bill field
    if(spEl && reBill){
      var sv = parseInt(spEl.value);
      if(parseInt(reBill.value) !== sv){
        reBill.value = sv;
        showBadge('badge-bill');
      }
    }
  }

  if(source === 'estimator'){
    // County changed in estimator → push to savings calc
    if(reCounty && ccEl){
      ccEl.value = reCounty.value;
    }
    // Mark orientation as user-set so auto-fill won't overwrite it
    if(reOrient) reOrient.dataset.userSet = '1';
    // Bill → push back to savings slider (clamp to slider range 1200–4800)
    if(reBill && spEl){
      var bv = parseInt(reBill.value)||2200;
      spEl.value = Math.max(1200, Math.min(4800, Math.round(bv/100)*100));
    }
    // House → push to savings slider
    if(reHouse && hsSel){
      var hmap = {terraced:1, cottage:1, semi:2, bungalow:3, detached:4, farmhouse:4};
      hsSel.value = hmap[reHouse.value] || 2;
    }
  }

  if(source === 'bill'){
    // Bill AI analysis → pre-fill both calculators
    var spend = parseInt(reBill ? reBill.value : 2200) || 2200;
    if(spEl){
      spEl.value = Math.max(1200, Math.min(4800, Math.round(spend/100)*100));
    }
    // Infer house type from spend level
    var inferredHouse = spend >= 3200 ? 'detached' : spend >= 2400 ? 'semi' : spend >= 1800 ? 'semi' : 'terraced';
    if(reHouse && reHouse.value !== inferredHouse){
      reHouse.value = inferredHouse;
      showBadge('badge-house');
    }
    var hmap2 = {terraced:1, cottage:1, semi:2, bungalow:3, detached:4, farmhouse:4};
    if(hsSel) hsSel.value = hmap2[inferredHouse] || 2;
    if(reBill) showBadge('badge-bill');
  }
}


// ── BUTTON LOADING STATE UTILITIES ───────────────────────────────────────────
function btnLoad(btn, loadText){
  if(!btn || btn._loading) return;
  btn._loading = true;
  btn._origHTML = btn.innerHTML;
  btn._origDisabled = btn.disabled;
  btn.disabled = true;
  var spinCls = (btn.classList.contains('pg-submit') || btn.classList.contains('wsub-btn') || btn.classList.contains('btn-lime') || btn.classList.contains('btn-p')) ? 'btn-spin dark' : 'btn-spin';
  var _sp=document.createElement('span'); _sp.className=spinCls;
  var _lt=document.createElement('span'); _lt.textContent=loadText||'Sending…'; _lt.style.marginLeft='6px';
  btn.innerHTML=''; btn.appendChild(_sp); btn.appendChild(_lt);
  btn.classList.add('loading');
}
function btnReset(btn){
  if(!btn || !btn._loading) return;
  btn.disabled = btn._origDisabled || false;
  btn.innerHTML = btn._origHTML || btn.innerHTML;
  btn.classList.remove('loading');
  btn._loading = false;
}
function btnSuccess(btn, text, delay){
  if(!btn) return;
  btn.disabled = true;
  var spinCls = 'btn-spin dark';
  var _sv = document.createElement('span');
  _sv.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align:middle;margin-right:5px"><path d="M4.5 12.75l6 6 9-13.5"/></svg>';
  var _st = document.createElement('span');
  _st.textContent = text || 'Done!';
  btn.innerHTML = ''; btn.appendChild(_sv); btn.appendChild(_st);
  btn.classList.remove('loading');
  btn.style.background = 'var(--lime-dk)';
  btn.style.color = 'var(--black)';
  if(delay) setTimeout(function(){ btnReset(btn); btn.style.background=''; btn.style.color=''; }, delay);
}
// ─────────────────────────────────────────────────────────────────────────────

// ── SMOOTH SCROLL WITH FIXED-NAV OFFSET ──────────────────────────────────────
var NAV_OFFSET = 72; // nav ~60px + 12px breathing room

function scrollToId(id) {
  var target = document.getElementById(id);
  if (!target) return;
  var nav = document.querySelector('nav');
  var navH = nav ? nav.getBoundingClientRect().height : NAV_OFFSET;
  var top = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

// Intercept all internal anchor clicks
document.addEventListener('click', function(e) {
  var anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  var hash = anchor.getAttribute('href');
  // Skip empty hashes, JS-only links, and links with their own onclick scroll logic
  if (!hash || hash === '#' || hash === '#0') return;
  var target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  scrollToId(target.id);
  // Update URL hash without jumping
  if (history.pushState) history.pushState(null, null, hash);
}, false);

// Handle page load with a hash in the URL
(function() {
  if (!window.location.hash) return;
  var id = window.location.hash.slice(1);
  setTimeout(function() { scrollToId(id); }, 120);
})();
// ─────────────────────────────────────────────────────────────────────────────

// ── Unified calculator entry point ─────────────────────────
function ucalcRun(){
  // Update display labels immediately (feels instant)
  var hsList = ['1–2 bed','2 bed','3 bed','4+ bed'];
  var hsEl = document.getElementById('hs');
  var spEl = document.getElementById('sp');
  var ccEl = document.getElementById('cc');
  var lbl = document.getElementById('u-hs-lbl');
  var slbl = document.getElementById('u-sp-lbl');
  var clbl = document.getElementById('u-county-lbl');
  if(hsEl && lbl) lbl.textContent = hsList[parseInt(hsEl.value)-1] || '3-bed';
  if(spEl && slbl) slbl.textContent = '€' + parseInt(spEl.value).toLocaleString();
  if(ccEl && clbl) clbl.textContent = ccEl.options[ccEl.selectedIndex].text;
  uc();
}

// Wire old ID aliases so existing code works
function ucalcSetView(v){
  roiView = v;
  var _uba=document.getElementById('ucalc-btn-annual'); if(_uba) _uba.classList.toggle('on', v==='annual');
  var _ubc=document.getElementById('ucalc-btn-cumulative'); if(_ubc) _ubc.classList.toggle('on', v==='cumulative');
  // also sync old buttons if they exist
  var ba = document.getElementById('roi-btn-annual');
  var bc = document.getElementById('roi-btn-cumulative');
  if(ba) ba.classList.toggle('on', v==='annual');
  if(bc) bc.classList.toggle('on', v==='cumulative');
  renderRoiChart();
}

function uc(){
  // Sync county label (ucalcRun wrapper also does this but uc can be called directly)
  var ccSyncEl=document.getElementById('cc');
  var clblSync=document.getElementById('u-county-lbl');
  if(ccSyncEl && clblSync && ccSyncEl.selectedIndex >= 0) clblSync.textContent=ccSyncEl.options[ccSyncEl.selectedIndex].text;
  var si=parseInt(document.getElementById('hs').value)-1;
  document.getElementById('hsv') && (document.getElementById('hsv').textContent=hsl[si]);
  var uhs=document.getElementById('u-hs-lbl'); if(uhs) uhs.textContent=hsl[si];
  var sp=parseInt(document.getElementById('sp').value);
  document.getElementById('spv') && (document.getElementById('spv').textContent='€'+sp.toLocaleString());
  var usp=document.getElementById('u-sp-lbl'); if(usp) usp.textContent='€'+sp.toLocaleString();
  var f=cf[document.getElementById('cc').value]||1;
  var sav=Math.round(sp*0.45*f); // SEAI: avg 4kWp saves ~45% of Irish electricity bill
  var grant=gr[si];
  var net=Math.round(sys[si]*1800)-grant;
  var pb=(net/sav).toFixed(1);
  var s25=Math.round(sav*25-net);
  ['rs','rg','rp','r25'].forEach(function(id){
    var el=document.getElementById(id);
    if(!el)return;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
    el.addEventListener('animationend',function(){el.classList.remove('pop');},{once:true});
  });
  document.getElementById('rs').textContent='€'+sav.toLocaleString();
  document.getElementById('rg').textContent='€'+grant.toLocaleString();
  document.getElementById('rp').textContent=pb+' yrs';
  document.getElementById('r25').textContent='€'+s25.toLocaleString();
  // Push changes to estimator
  syncCalculators('savings');
  // Also re-run estimator calc silently so its results stay fresh
  if(typeof reRecalc === 'function') reRecalc('silent');
  // Update ROI chart and save prefs
  renderRoiChart();
  saveCalcPrefs();
}
// ─── ROI TIMELINE ──────────────────────────────────────────────────────────
var roiView = 'cumulative'; // locked to cumulative

function setRoiView(v){
  roiView = v;
  var _rba=document.getElementById('roi-btn-annual'); if(_rba) _rba.classList.toggle('on', v==='annual');
  var _rbc=document.getElementById('roi-btn-cumulative'); if(_rbc) _rbc.classList.toggle('on', v==='cumulative');
  renderRoiChart();
}

// Legacy alias used by old toggle button reference
function toggleRoiView(){ setRoiView(roiView==='annual'?'cumulative':'annual'); }

function renderRoiChart(){
  var spEl  = document.getElementById('sp');
  var hsSel = document.getElementById('hs');
  var ccEl  = document.getElementById('cc');
  if(!spEl || !hsSel) return;

  var si    = parseInt(hsSel.value) - 1;
  var sp    = parseInt(spEl.value) || 2400;
  var f     = cf[ccEl ? ccEl.value : 'dublin'] || 1;
  var grant = gr[si];
  var sav   = Math.round(sp * 0.45 * f);
  var netCost = Math.round(sys[si] * 1800) - grant;

  // Build 25-year dataset
  var YEARS = 25;
  var data = [];
  var cum = -netCost;
  var beYear = null;
  for(var y = 1; y <= YEARS; y++){
    cum += sav;
    if(beYear === null && cum >= 0) beYear = y;
    data.push({ year: y, annual: sav, cumulative: cum });
  }

  // Update stats strip
  var el = document.getElementById('roit-saving');  if(el) el.textContent = '€'+sav.toLocaleString();
  el = document.getElementById('roit-cost');  if(el) el.textContent = '€'+netCost.toLocaleString();
  el = document.getElementById('roit-payback'); if(el) el.textContent = beYear ? beYear+' yrs' : (netCost/sav).toFixed(1)+' yrs';
  el = document.getElementById('roit-25yr');  if(el) el.textContent = '€'+data[YEARS-1].cumulative.toLocaleString();

  var svg = document.getElementById('roi-svg');
  if(!svg) return;
  svg.innerHTML = '';

  var W = 900, H = 300;
  var padL = 12, padR = 12, padT = 18, padB = 6;
  var chartW = W - padL - padR;
  var chartH = H - padT - padB;

  var vals = data.map(function(d){ return roiView==='annual' ? d.annual : d.cumulative; });
  var minV = Math.min.apply(null, vals);
  var maxV = Math.max.apply(null, vals);
  // Annual: always base from zero so bars have proper height
  if(roiView==='annual'){ minV = 0; }
  // For cumulative, extend min a bit so zero-line is visible
  if(roiView==='cumulative') minV = Math.min(minV, -netCost * 1.05);
  var range = maxV - minV || 1;

  function xOf(i){ return padL + (i / (YEARS - 1)) * chartW; }
  function yOf(v){ return padT + chartH - ((v - minV) / range) * chartH; }

  var NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs){
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs).forEach(function(k){ e.setAttribute(k, attrs[k]); });
    return e;
  }

  // ── Background profit zone (above zero) ──────────────────────────────────
  if(roiView === 'cumulative'){
    var zeroY = yOf(0);
    // Green zone above zero
    var profitZone = svgEl('rect', {
      x: padL, y: padT, width: chartW, height: Math.max(0, zeroY - padT),
      fill: 'rgba(109,201,58,0.06)', rx: '4'
    });
    svg.appendChild(profitZone);
    // Red zone below zero
    var debtH = Math.max(0, H - padB - zeroY);
    if(debtH > 0){
      var debtZone = svgEl('rect', {
        x: padL, y: zeroY, width: chartW, height: debtH,
        fill: 'rgba(196,133,90,0.08)', rx: '0'
      });
      svg.appendChild(debtZone);
    }
    // Zero line
    var zLine = svgEl('line', {
      x1: padL, y1: zeroY, x2: padL + chartW, y2: zeroY,
      stroke: 'rgba(255,255,255,0.25)', 'stroke-width': '1.5', 'stroke-dasharray': '4,3'
    });
    svg.appendChild(zLine);
    // "Debt" label
    var dLbl = svgEl('text', { x: padL+6, y: zeroY+11, fill: 'rgba(196,133,90,0.6)',
      'font-size': '8', 'font-family': 'Barlow Condensed, sans-serif',
      'font-weight': '700', 'text-transform': 'uppercase', 'letter-spacing': '1' });
    dLbl.textContent = 'INVESTMENT';
    svg.appendChild(dLbl);
    // "Profit" label
    var pLbl = svgEl('text', { x: padL+6, y: padT+12, fill: 'rgba(109,201,58,0.5)',
      'font-size': '8', 'font-family': 'Barlow Condensed, sans-serif',
      'font-weight': '700', 'letter-spacing': '1' });
    pLbl.textContent = 'PROFIT';
    svg.appendChild(pLbl);
  }

  // ── Grid lines ────────────────────────────────────────────────────────────
  [0.25, 0.5, 0.75].forEach(function(t){
    var gy = padT + t * chartH;
    var gl = svgEl('line', { x1: padL, y1: gy, x2: padL+chartW, y2: gy,
      stroke: 'rgba(255,255,255,0.06)', 'stroke-width': '1' });
    svg.appendChild(gl);
  });

  // ── Bars (annual view) ────────────────────────────────────────────────────
  if(roiView === 'annual'){
    var bW = chartW / YEARS * 0.62;
    data.forEach(function(d, i){
      var bx = padL + (i / YEARS) * chartW + (chartW / YEARS) * 0.19;
      var by = yOf(d.annual);
      var bottomY = yOf(0); // baseline
      var bh = bottomY - by;
      var isBreakeven = (d.year === beYear);
      var rect = svgEl('rect', {
        x: bx, y: by, width: bW, height: Math.max(2, bh),
        fill: isBreakeven ? '#C4855A' : '#6DC93A',
        rx: '3'
      });
      rect.dataset.year = d.year;
      rect.dataset.val = d.annual;
      rect.dataset.cum = d.cumulative;
      svg.appendChild(rect);
      // Invisible hover target
      var hit = svgEl('rect', {
        x: bx - 4, y: padT, width: bW + 8, height: chartH + padB,
        fill: 'transparent', cursor: 'crosshair'
      });
      hit.dataset.year  = d.year;
      hit.dataset.val   = d.annual;
      hit.dataset.cum   = d.cumulative;
      hit.dataset.bx    = bx + bW/2;
      hit.dataset.by    = by;
      hit.addEventListener('mouseenter', roiShowTip);
      hit.addEventListener('mouseleave', roiHideTip);
      hit.addEventListener('touchstart', roiShowTip, {passive:true});
      svg.appendChild(hit);
    });

    // Payback year label
    if(beYear){
      var beX = padL + ((beYear-1) / YEARS) * chartW + (chartW/YEARS)*0.5;
      var beLine = svgEl('line', { x1: beX, y1: padT-2, x2: beX, y2: padT+chartH+padB,
        stroke: '#C4855A', 'stroke-width': '1.5', 'stroke-dasharray': '3,2', opacity: '0.7' });
      svg.appendChild(beLine);
      var beTag = svgEl('text', { x: beX, y: padT-5, fill: '#C4855A',
        'font-size': '8', 'font-family': 'Barlow Condensed, sans-serif',
        'font-weight': '800', 'text-anchor': 'middle', 'letter-spacing': '.5' });
      beTag.textContent = 'PAID BACK';
      svg.appendChild(beTag);
    }
  }

  // ── Area + line (cumulative view) ─────────────────────────────────────────
  if(roiView === 'cumulative'){
    // Build path points
    var pts = data.map(function(d,i){ return [xOf(i), yOf(d.cumulative)]; });

    // Area fill
    var areaD = 'M '+pts[0][0]+' '+(H-padB)+' ';
    pts.forEach(function(p){ areaD += 'L '+p[0]+' '+p[1]+' '; });
    areaD += 'L '+pts[pts.length-1][0]+' '+(H-padB)+' Z';
    var area = svgEl('path', { d: areaD, fill: 'rgba(109,201,58,0.12)', stroke: 'none' });
    svg.appendChild(area);

    // Smoothed line using bezier curves
    var lineD = 'M '+pts[0][0]+' '+pts[0][1];
    for(var i=1;i<pts.length;i++){
      var cpx = (pts[i-1][0]+pts[i][0])/2;
      lineD += ' C '+cpx+' '+pts[i-1][1]+' '+cpx+' '+pts[i][1]+' '+pts[i][0]+' '+pts[i][1];
    }
    var path = svgEl('path', { d: lineD, fill: 'none', stroke: '#6DC93A',
      'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    // Animate the stroke
    var pathLen = 900; // approximate
    path.style.strokeDasharray = pathLen;
    path.style.strokeDashoffset = pathLen;
    path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)';
    svg.appendChild(path);
    setTimeout(function(){ path.style.strokeDashoffset = '0'; }, 80);

    // Dots + hit areas
    data.forEach(function(d,i){
      var px = pts[i][0], py = pts[i][1];
      var isProfit = d.cumulative >= 0;
      var isBreakeven = (d.year === beYear);
      // Visible dot
      var dot = svgEl('circle', { cx: px, cy: py, r: isBreakeven?'6':'3.5',
        fill: isBreakeven?'#C4855A':(isProfit?'#6DC93A':'rgba(255,255,255,0.3)'),
        stroke: isBreakeven?'#ffffff':'none', 'stroke-width': '2',
});
      svg.appendChild(dot);
      // Hit area
      var hit = svgEl('circle', { cx: px, cy: py, r: '14', fill: 'transparent', cursor: 'crosshair' });
      hit.dataset.year  = d.year;
      hit.dataset.val   = d.cumulative;
      hit.dataset.cum   = d.cumulative;
      hit.dataset.bx    = px;
      hit.dataset.by    = py;
      hit.addEventListener('mouseenter', roiShowTip);
      hit.addEventListener('mouseleave', roiHideTip);
      svg.appendChild(hit);
    });
  }

  // ── Year labels (outside SVG) ─────────────────────────────────────────────
  var labelsRow = document.getElementById('roi-yr-labels');
  if(labelsRow){
    labelsRow.innerHTML = '';
    data.forEach(function(d){
      var lbl = document.createElement('div');
      lbl.className = 'roi-yr-lbl';
      lbl.textContent = (d.year === 1 || d.year % 5 === 0) ? 'Yr '+d.year : '';
      labelsRow.appendChild(lbl);
    });
  }
}

function roiShowTip(e){
  var d = e.currentTarget.dataset;
  var wrap = document.getElementById('roi-chart-wrap');
  var tip  = document.getElementById('roi-tooltip');
  if(!wrap || !tip) return;
  var wRect = wrap.getBoundingClientRect();
  var svgRect = document.getElementById('roi-svg').getBoundingClientRect();
  var scaleX = svgRect.width / 900;
  var scaleY = svgRect.height / 300;
  var px = parseFloat(d.bx) * scaleX;
  var py = parseFloat(d.by) * scaleY;
  // Clamp horizontally so tooltip never overflows chart edges
  var tipW = tip.offsetWidth || 140;
  var clampedLeft = Math.max(tipW/2, Math.min(px, wRect.width - tipW/2));
  tip.style.left = clampedLeft + 'px';
  // Position above the point, but clamp so it never goes above chart top
  var tipAbove = py - 88;
  tip.style.top = Math.max(4, tipAbove) + 'px';
  var yr = parseInt(d.year);
  var val = parseFloat(d.val);
  var isCum = roiView === 'cumulative';
  document.getElementById('roi-tt-yr').textContent = 'Year ' + yr;
  var ttVal = document.getElementById('roi-tt-val');
  ttVal.textContent = (val < 0 ? '-€' : '€') + Math.abs(Math.round(val)).toLocaleString();
  ttVal.className = 'roi-tt-val ' + (val < 0 ? 'neg' : 'lime');
  document.getElementById('roi-tt-lbl').textContent = isCum
    ? (val < 0 ? 'Still in investment' : 'Cumulative profit')
    : 'Annual saving';
  tip.classList.add('on');
}
function roiHideTip(){ var t = document.getElementById('roi-tooltip'); if(t) t.classList.remove('on'); }

// ─── RETURNING VISITOR MEMORY ──────────────────────────────────────────────
var RI_STORAGE_KEY = 'ri-calc-prefs';

function saveCalcPrefs(){
  try {
    var ccEl  = document.getElementById('cc');
    var hsSel = document.getElementById('hs');
    var spEl  = document.getElementById('sp');
    var prefs = {
      county: ccEl  ? ccEl.value  : '',
      hs    : hsSel ? hsSel.value : '2',
      sp    : spEl  ? spEl.value  : '2400',
      ts    : Date.now()
    };
    localStorage.setItem(RI_STORAGE_KEY, JSON.stringify(prefs));
  } catch(e){}
}

function loadCalcPrefs(){
  try {
    var raw = localStorage.getItem(RI_STORAGE_KEY);
    if(!raw) return;
    var p;
    try { p = JSON.parse(raw); } catch(pe){ localStorage.removeItem(RI_STORAGE_KEY); return; }
    if(!p || typeof p !== 'object') return;
    // Only restore if less than 30 days old
    if(!p.ts || Date.now()-p.ts > 30*24*60*60*1000){ localStorage.removeItem(RI_STORAGE_KEY); return; }
    // Sanitise: only accept known-safe string values, no objects/arrays
    if(p.county && typeof p.county !== 'string') return;
    if(p.hs && typeof p.hs !== 'string') return;
    if(p.sp && typeof p.sp !== 'string') return;

    var ccEl  = document.getElementById('cc');
    var hsSel = document.getElementById('hs');
    var spEl  = document.getElementById('sp');

    if(ccEl  && p.county) ccEl.value  = p.county;
    if(hsSel && p.hs    ) hsSel.value = p.hs;
    if(spEl  && p.sp    ) spEl.value  = p.sp;
    uc(); // update display

    // Pre-fill name in quote form
    if(p.name){
      var nameEl = document.querySelector('#wpane-upload .fi[type="text"]');
      if(nameEl) nameEl.value = p.name;
    }

    // Show returning visitor banner
    var banner = document.getElementById('rv-banner');
    if(banner){
      var nameStr = p.name ? p.name.split(' ')[0] : '';
      if(nameStr) document.getElementById('rv-name').textContent = 'Welcome back, '+nameStr+'!';
      var county = p.county ? p.county.charAt(0).toUpperCase()+p.county.slice(1) : '';
      document.getElementById('rv-sub').textContent =
        'Sliders restored from your last visit'+(county?' · '+county+' estimate':'')+'.'
      banner.classList.add('on');
      // Auto-dismiss after 6 seconds
      setTimeout(function(){ banner.classList.remove('on'); }, 6000);
    }
  } catch(e){}
}

// Save prefs when user interacts with calculators
document.addEventListener('change', function(e){
  var t = e.target;
  if(t && (t.id==='cc'||t.id==='hs'||t.id==='sp'||t.classList.contains('fi'))){
    saveCalcPrefs();
  }
});
document.addEventListener('input', function(e){
  var t = e.target;
  if(t && (t.id==='hs'||t.id==='sp')) saveCalcPrefs();
});

// ─── VOICE INPUT ───────────────────────────────────────────────────────────
var voiceActive = false;
var voiceRecognition = null;



// ─── SMART WHATSAPP CTA ────────────────────────────────────────────────────
function updateWaSmartCta(){
  // Prefer roof-estimator results if available, fall back to savings calculator
  var reResultsOn = document.getElementById('re-results') &&
                    document.getElementById('re-results').classList.contains('on');

  var saving, grant, payback, kwp, county, addr;

  if(reResultsOn){
    // Pull from roof estimator results panel
    var kwpEl  = document.getElementById('rr-kwp');
    var saveEl = document.getElementById('rr-save');
    var payEl  = document.getElementById('rr-payback');
    var grantEl= document.getElementById('rr-grant');
    kwp     = kwpEl   ? kwpEl.textContent   : '';
    saving  = saveEl  ? saveEl.textContent  : '';
    payback = payEl   ? payEl.textContent   : '';
    grant   = grantEl ? grantEl.textContent : '';
  } else {
    // Fall back to main savings calculator
    var rsEl = document.getElementById('rs');
    var rgEl = document.getElementById('rg');
    var rpEl = document.getElementById('rp');
    saving  = rsEl ? rsEl.textContent : '';
    grant   = rgEl ? rgEl.textContent : '';
    payback = rpEl ? rpEl.textContent : '';
  }

  var countyEl = document.getElementById('re-county') || document.getElementById('cc');
  var addrEl   = document.getElementById('re-address');
  county = countyEl ? (countyEl.value.charAt(0).toUpperCase()+countyEl.value.slice(1)) : '';
  addr   = addrEl && addrEl.value ? addrEl.value : '';

  var msg = 'Hi! I just estimated my solar savings on your website.';
  if(addr)    msg += ' Address: '+addr+'.';
  else if(county) msg += ' County: '+county+'.';
  if(kwp)     msg += ' System size: '+kwp+'.';
  if(saving)  msg += ' Estimated saving: '+saving+'/yr.';
  if(grant)   msg += ' SEAI grant: '+grant+'.';
  if(payback) msg += ' Payback period: '+payback+'.';
  msg += " I'd love to get a proper quote.";

  var waBtn = document.getElementById('wa-smart-cta');
  if(waBtn) waBtn.href = 'https://wa.me/353873958424?text='+encodeURIComponent(msg);
}

// Init on load — called after all functions are defined
window.addEventListener('DOMContentLoaded', function(){
  loadCalcPrefs();
  ucalcRun(); // sync all labels after prefs loaded
  renderRoiChart();
  updateWaSmartCta();
  document.querySelectorAll('img:not([loading])').forEach(function(img, i){
    if(i > 0) img.setAttribute('loading','lazy');
  });
  // Mobile nav hamburger
  var navHam=document.querySelector('.nav-ham');
  var navMob=document.querySelector('.nav-mobile');
  if(navHam&&navMob){
    navHam.addEventListener('click',()=>{
      var open=navMob.classList.toggle('open');
      navHam.setAttribute('aria-expanded',open);
      document.body.style.overflow=open?'hidden':'';
    });
    navMob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      navMob.classList.remove('open');
      navHam.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }));
  }
});
function switchMode(m){
  ['upload','manual'].forEach(function(id){
    document.getElementById('wtab-'+id).classList.toggle('on',id===m);
    document.getElementById('wpane-'+id).classList.toggle('on',id===m);
  });
}
function handleDragOver(e){e.preventDefault();document.getElementById('dropzone').classList.add('over')}
function handleDragLeave(){document.getElementById('dropzone').classList.remove('over')}
function handleDrop(e){e.preventDefault();document.getElementById('dropzone').classList.remove('over');if(e.dataTransfer.files[0])processFile(e.dataTransfer.files[0])}
function handleFile(f){if(f)processFile(f)}
function processFile(f){
  // Validate file type and size before accepting
  var ALLOWED_TYPES = ['application/pdf','image/jpeg','image/jpg','image/png'];
  var MAX_SIZE_MB = 10;
  if(!f){ return; }
  if(ALLOWED_TYPES.indexOf(f.type) < 0){
    var dz = document.getElementById('dropzone');
    var sub = dz ? dz.querySelector('.upsub') : null;
    if(sub) sub.textContent = 'Invalid file type. Please upload a PDF, JPG or PNG.';
    return;
  }
  if(f.size > MAX_SIZE_MB * 1024 * 1024){
    var dz2 = document.getElementById('dropzone');
    var sub2 = dz2 ? dz2.querySelector('.upsub') : null;
    if(sub2) sub2.textContent = 'File too large (max ' + MAX_SIZE_MB + 'MB). Please try a smaller file.';
    return;
  }
  window._uploadedFile = f; // store for submitBillUpload
  document.getElementById('fpname').textContent=f.name;
  document.getElementById('fpsize').textContent='Estimating your savings…';
  document.getElementById('fprev').classList.add('on');
  // Disable drop zone and show AI progress bar
  var dz = document.getElementById('dropzone');
  if(dz){ dz.classList.add('analysing'); }
  var prog = document.getElementById('ai-prog');
  if(prog){ prog.classList.add('on'); setTimeout(function(){ var f2=prog.querySelector('.ai-progress-fill'); if(f2) f2.style.width='85%'; }, 60); }
  // Disable any upload-pane submit button during analysis
  var subBtn = document.querySelector('#wpane-upload .wsub-btn');
  if(subBtn) btnLoad(subBtn, 'Analysing…');
  // Estimate spend from house size slider + county factor (realistic SEAI averages)
  // SEAI 2024 avg: 1-2bed €1,600, 3bed €2,400, 4+bed €3,100
  var hsEl2 = document.getElementById('hs');
  var ccEl2 = document.getElementById('cc');
  var spEl2 = document.getElementById('sp');
  var baseBySize = [1600, 2100, 2400, 3100]; // per house size band
  var si2 = hsEl2 ? Math.max(0, parseInt(hsEl2.value)-1) : 1;
  var cf2 = (ccEl2 && typeof cf !== 'undefined') ? (cf[ccEl2.value] || 1.0) : 1.0;
  // If user has already moved the spend slider, use that — it's more accurate
  var userSp = spEl2 ? parseInt(spEl2.value) : 0;
  var simulatedSpend;
  if(userSp && userSp !== 2400) {
    // User has set their spend — use it directly with ±3% natural variance
    var variance = Math.round((Math.random() * 0.06 - 0.03) * userSp / 100) * 100;
    simulatedSpend = Math.round((userSp + variance) / 100) * 100;
  } else {
    // Use house-size baseline, adjusted for county irradiance / demand
    var base = baseBySize[si2];
    // Add ±5% realistic variance (different tariff plans, EV chargers, etc)
    var variance2 = Math.round((Math.random() * 0.10 - 0.05) * base / 100) * 100;
    simulatedSpend = Math.round((base * cf2 + variance2) / 100) * 100;
  }
  simulatedSpend = Math.max(1200, Math.min(5000, simulatedSpend)); // clamp to realistic range
  setTimeout(function(){
    document.getElementById('fpsize').textContent=(f.size/1024).toFixed(0)+' KB · Analysis complete';
    if(dz) dz.classList.remove('analysing');
    if(prog){ var f2=prog.querySelector('.ai-progress-fill'); if(f2) f2.style.width='100%'; setTimeout(function(){ prog.classList.remove('on'); if(f2) f2.style.width='0'; }, 400); }
    if(subBtn) btnReset(subBtn);
    document.getElementById('aipanel').classList.add('on');
    // Push extracted spend into estimator bill field
    var reBill = document.getElementById('re-bill');
    if(reBill){ reBill.value = simulatedSpend; }
    // Update AI panel display with the simulated data
    var aiAnnual = document.querySelector('.aiitem .aival:first-child') ||
                   document.querySelector('#aipanel .aiitem:first-child .aival');
    // Update the €2,340 figure dynamically
    var aiItems = document.querySelectorAll('#aipanel .aiitem .aival');
    if(aiItems[0]) aiItems[0].textContent = '€'+simulatedSpend.toLocaleString();
    var saving = Math.round(simulatedSpend * 0.45);
    if(aiItems[1]) aiItems[1].textContent = '€'+saving.toLocaleString();
    // Sync both calculators from bill data
    syncCalculators('bill');
    // Pre-fill county selector in quote form if estimator already has a county
    var reCounty = document.getElementById('re-county');
    var uploadCounty = document.querySelector('#wpane-upload .fs');
    if(reCounty && uploadCounty && reCounty.value){
      uploadCounty.value = reCounty.value.charAt(0).toUpperCase() + reCounty.value.slice(1);
    }
    // Trigger estimator recalc silently
    if(typeof reRecalc === 'function') reRecalc(false);
    // Trigger savings calc update
    uc();
  },1800);
}
function removeFile(){
  document.getElementById('fprev').classList.remove('on');
  document.getElementById('aipanel').classList.remove('on');
  window._uploadedFile = null;
}

// ── SolarPilot integration ────────────────────────────────────────────────────
function submitBillUpload(btn){
  var name   = (document.getElementById('up-name')||{}).value||'';
  var phone  = (document.getElementById('up-phone')||{}).value||'';
  var county = (document.getElementById('up-county')||{}).value||'';
  var file   = window._uploadedFile;

  // Validate inputs
  var phoneOk = !phone.trim() || /^[0-9\s\-+()]{7,20}$/.test(phone.trim());
  if(!name.trim() || !phoneOk){
    var el = document.getElementById('up-name');
    if(el && !name.trim()){ el.focus(); el.style.borderColor='#c00';
      setTimeout(function(){ el.style.borderColor=''; },1600); }
    var elp = document.getElementById('up-phone');
    if(elp && !phoneOk){ elp.style.borderColor='#c00';
      setTimeout(function(){ elp.style.borderColor=''; },1600); }
    return;
  }

  if(SOLARPILOT_API_URL && file){
    // ── Real path: POST bill to SolarPilot ──
    btnLoad(btn, 'Sending to SolarPilot…');
    openSolarPilotModal('Sending your bill…', 'Uploading to SolarPilot — this takes a few seconds');

    var fd = new FormData();
    fd.append('bill',    file);
    fd.append('name',    name.trim());
    fd.append('phone',   phone.trim());
    fd.append('county',  county);
    fd.append('spend',   document.getElementById('sp') ? document.getElementById('sp').value : '2400');
    fd.append('source',  'renewable-ireland-website');

    var _ctrl = new AbortController();
    var _timeout = setTimeout(function(){ _ctrl.abort(); }, 30000); // 30s timeout
    fetch(SOLARPILOT_API_URL, {
      method: 'POST',
      body: fd,
      credentials: 'omit',           // never send cookies cross-origin
      signal: _ctrl.signal
    }).then(function(r){ clearTimeout(_timeout); return r; })
      .then(function(r){
        if(!r.ok) throw new Error('HTTP '+r.status);
        return r.json();
      })
      .then(function(data){
        btnReset(btn);
        if(data.portal_url){
          // Validate portal_url is a safe absolute URL (must start with https://)
          var _pu = String(data.portal_url).trim();
          if(!/^https:\/\//.test(_pu)){ setSolarPilotError('Invalid portal URL received.'); return; }
          // If SOLARPILOT_APP_URL is set, enforce same origin
          if(SOLARPILOT_APP_URL && _pu.indexOf(SOLARPILOT_APP_URL) !== 0){
            console.warn('portal_url origin mismatch — expected', SOLARPILOT_APP_URL);
            setSolarPilotError('Portal URL origin mismatch. Please contact support.');
            return;
          }
          setSolarPilotFrame(_pu);
        } else if(SOLARPILOT_APP_URL){
          // Fallback: open the main app, pass lead data as query params
          var url = SOLARPILOT_APP_URL
            +'?name='+encodeURIComponent(name.trim())
            +'&phone='+encodeURIComponent(phone.trim())
            +'&county='+encodeURIComponent(county)
            +'&ref=ri-bill-upload';
          setSolarPilotFrame(url);
        } else {
          showSolarPilotSuccess(name.trim());
        }
      })
      .catch(function(err){
        console.warn('SolarPilot POST error:', err);
        btnReset(btn);
        setSolarPilotError('Upload failed — please call us on 087 395 8424.'); console.warn('SolarPilot error detail:', err.message);
      });

  } else if(SOLARPILOT_APP_URL){
    // ── No file or no API — open SolarPilot app directly ──
    btnLoad(btn, 'Opening SolarPilot…');
    openSolarPilotModal('Opening your portal…', 'Loading SolarPilot');
    var url = SOLARPILOT_APP_URL
      +'?name='+encodeURIComponent(name.trim())
      +'&phone='+encodeURIComponent(phone.trim())
      +'&county='+encodeURIComponent(county)
      +'&ref=ri-manual';
    setTimeout(function(){ setSolarPilotFrame(url); btnReset(btn); }, 400);

  } else {
    // ── Fallback: no SolarPilot configured — use existing portal gate ──
    btnLoad(btn, 'Opening portal…');
    setTimeout(function(){ btnReset(btn); openPortal(); }, 400);
  }
}

function openSolarPilotModal(loadText, loadSub){
  var modal = document.getElementById('sp-modal');
  if(!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Reset state
  var loading = document.getElementById('sp-loading');
  var iframe  = document.getElementById('sp-iframe');
  var error   = document.getElementById('sp-error');
  if(loading){ loading.style.display = 'flex'; }
  if(iframe){  iframe.style.display  = 'none'; iframe.src = ''; }
  if(error){   error.style.display   = 'none'; }
  var lt = document.getElementById('sp-loading-text');
  var ls = document.getElementById('sp-loading-sub');
  if(lt) lt.textContent = loadText || 'Loading…';
  if(ls) ls.textContent = loadSub  || '';
}

function setSolarPilotFrame(url){
  var loading = document.getElementById('sp-loading');
  var iframe  = document.getElementById('sp-iframe');
  if(!iframe) return;
  iframe.onload = function(){
    if(loading) loading.style.display = 'none';
    iframe.style.display = 'block';
  };
  iframe.src = url;
  // Safety timeout: if onload never fires (cross-origin block), show error
  setTimeout(function(){
    if(loading && loading.style.display !== 'none'){
      // iframe may be blocked — just hide loading and show frame anyway
      if(loading) loading.style.display = 'none';
      if(iframe)  iframe.style.display  = 'block';
    }
  }, 6000);
}

function showSolarPilotSuccess(name){
  // No portal URL in response — show a success message inside the modal
  var loading = document.getElementById('sp-loading');
  if(loading){
    var lt = document.getElementById('sp-loading-text');
    var ls = document.getElementById('sp-loading-sub');
    if(lt) lt.textContent = 'Bill received, ' + (name||'') + '!';
    if(ls) ls.textContent = 'Your solar advisor will call within 2 hours with your quote.';
    // Swap spinner for checkmark
    var spinner = loading.querySelector('div[style*="border"]');
    if(spinner){ spinner.style.border = 'none'; spinner.textContent = '✓';
      spinner.style.cssText = 'width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:36px;color:var(--lime)'; }
  }
}

function setSolarPilotError(msg){
  var loading = document.getElementById('sp-loading');
  var error   = document.getElementById('sp-error');
  var errMsg  = document.getElementById('sp-error-msg');
  if(loading) loading.style.display = 'none';
  if(errMsg)  errMsg.textContent = msg || 'Something went wrong. We\'ll be in touch.';
  if(error)   error.style.display = 'flex';
}

function closeSolarPilot(){
  var modal  = document.getElementById('sp-modal');
  var iframe = document.getElementById('sp-iframe');
  if(modal)  modal.style.display = 'none';
  if(iframe) iframe.src = '';
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('DOMContentLoaded', function(){
  var modal = document.getElementById('sp-modal');
  if(modal) modal.addEventListener('click', function(e){
    if(e.target === modal) closeSolarPilot();
  });
  // ESC key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeSolarPilot();
  });
});
function openPortal(){
  // Prevent double-click
  var allSub = document.querySelectorAll('.wsub-btn');
  allSub.forEach(function(b){ if(b._loading) return; });
  // Pre-fill from quote form if available
  var nameEl  = document.getElementById('re-address') || null;
  var nameVal = '';
  var phoneVal = '';
  var countyVal = '';

  // Try to grab from upload form
  var uploadName  = document.querySelector('#wpane-upload .fi[type="text"]');
  var uploadPhone = document.querySelector('#wpane-upload .fi[type="tel"]');
  var uploadCounty = document.querySelector('#wpane-upload .fs');
  if(uploadName)  nameVal   = uploadName.value  || '';
  if(uploadPhone) phoneVal  = uploadPhone.value || '';
  if(uploadCounty) countyVal = uploadCounty.value || '';

  // Pre-fill gate form
  if(nameVal)  { var gn = document.getElementById('gate-name');  if(gn) gn.value = nameVal; }
  if(phoneVal) { var gp = document.getElementById('gate-phone'); if(gp) gp.value = phoneVal; }
  if(countyVal){ var gc = document.getElementById('gate-county'); if(gc) gc.value = countyVal; }

  document.getElementById('portal-gate').classList.add('on');
  document.body.style.overflow='hidden';
}

function submitGate(){
  var name   = (document.getElementById('gate-name').value||'').trim();
  var email  = (document.getElementById('gate-email').value||'').trim();
  var phone  = (document.getElementById('gate-phone').value||'').trim();
  var county = (document.getElementById('gate-county').value||'').trim();

  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!name || !emailOk){
    document.getElementById('gate-error').style.display='block';
    if(!name)     document.getElementById('gate-name').style.borderColor='#c00';
    if(!emailOk)  document.getElementById('gate-email').style.borderColor='#c00';
    return;
  }
  document.getElementById('gate-name').style.borderColor='';
  document.getElementById('gate-email').style.borderColor='';
  document.getElementById('gate-error').style.display='none';
  var submitBtn = document.querySelector('.pg-submit');
  btnLoad(submitBtn, 'Opening your portal…');

  // Generate unique portal ID
  var portalId = 'RI-' + Math.random().toString(36).substr(2,5).toUpperCase() + '-' + Date.now().toString(36).toUpperCase().substr(-4);
  var portalUrl = window.location.origin + '/portal/' + portalId;

  // Show success state with link
  document.getElementById('gate-form-wrap').style.display='none';
  document.getElementById('gate-success').style.display='block';
  document.getElementById('gate-portal-id').textContent  = portalId;
  document.getElementById('gate-portal-url').textContent = portalUrl;
  document.getElementById('gate-copy-link').setAttribute('data-url', portalUrl);
  document.getElementById('gate-user-name').textContent  = name.split(' ')[0];

  // Simulate sending data to your CRM / backend
  // In production: replace with fetch('/api/leads', { method:'POST', body: JSON.stringify({name,email,phone,county,portalId}) })
  if(submitBtn) btnSuccess(submitBtn, 'Portal ready!');
  console.log('Lead captured:', {name, email, phone, county, portalId});

  // After 2s auto-open the demo portal
  setTimeout(function(){
    document.getElementById('portal-gate').classList.remove('on');
    document.getElementById('portal-gate-form-state').style.display='block';
    document.getElementById('gate-form-wrap').style.display='block';
    document.getElementById('gate-success').style.display='none';
    document.getElementById('portal-overlay').classList.add('on');
    document.body.style.overflow='hidden';
    setTimeout(function(){var f=document.getElementById('progfill');if(f)f.style.width='60%';},400);
  }, 2200);
}

function copyPortalLink(){
  var btn = document.getElementById('gate-copy-link');
  var url = btn.getAttribute('data-url') || window.location.href;
  navigator.clipboard && navigator.clipboard.writeText(url).then(function(){
    btn.textContent = '✓ Copied!';
    setTimeout(function(){btn.textContent='Copy link';},2000);
  });
}

function closeGate(){ document.getElementById('portal-gate').classList.remove('on'); document.body.style.overflow=''; }
function closePortal(){document.getElementById('portal-overlay').classList.remove('on');document.body.style.overflow='';}
function closePortalOut(e){if(e.target===document.getElementById('portal-overlay'))closePortal();}
function switchTab(t){
  ['tracker','docs','messages','savings'].forEach(function(id){
    var el=document.getElementById('tab-'+id);
    if(el)el.style.display=id===t?'block':'none';
  });
  document.querySelectorAll('.pnav').forEach(function(el){
    var oc=el.getAttribute('onclick')||'';
    el.classList.toggle('on',oc.indexOf("'"+t+"'")>=0);
  });
}
function tf(el){
  var item=el.closest('.fi3');
  var open=item.classList.contains('open');
  document.querySelectorAll('.fi3.open').forEach(function(i){i.classList.remove('open');});
  if(!open)item.classList.add('open');
}
var leiIds=['cm-Meath','cm-Dublin','cm-Wicklow','cm-Kildare','cm-Westmeath','cm-Longford','cm-Offaly','cm-Laois','cm-Carlow','cm-Kilkenny','cm-Wexford','cm-Waterford','cm-Louth','cm-Cavan','cm-Monaghan'];
var activePath=null;
var origFills={};
document.querySelectorAll('.cty').forEach(function(p){origFills[p.id]=p.getAttribute('fill');});
function pickC(el){
  if(activePath)activePath.setAttribute('fill',origFills[activePath.id]||'#d4edbc');
  if(activePath===el){activePath=null;resetMap();return;}
  activePath=el;
  el.setAttribute('fill','#6ab347');
  var isL=leiIds.indexOf(el.id)>=0;
  document.getElementById('mp-name').textContent=el.dataset.n;
  document.getElementById('mp-sub').textContent=isL?'Ireland & NI · Active coverage':'Outside current coverage';
  document.getElementById('mp-count').textContent=el.dataset.i>0?el.dataset.i+'+':'—';
  document.getElementById('mp-save').textContent=el.dataset.s>0?'€'+parseInt(el.dataset.s).toLocaleString():'—';
  document.getElementById('mp-note-lei').style.display=isL?'block':'none';
  document.getElementById('mp-note-other').style.display=isL?'none':'block';
}
function resetMap(){
  document.getElementById('mp-name').textContent='Select a county';
  document.getElementById('mp-sub').textContent='Click the map to explore';
  document.getElementById('mp-count').textContent='—';
  document.getElementById('mp-save').textContent='—';
  document.getElementById('mp-note-lei').style.display='none';
  document.getElementById('mp-note-other').style.display='none';
}
window.addEventListener('scroll',function(){document.getElementById('mainnav').classList.toggle('shrunk',window.scrollY>50);});

(function(){
  if(window.matchMedia('(hover:none)').matches)return;
  var cur=document.getElementById('ricur');
  var tr=document.getElementById('ritrail');
  if(!cur||!tr)return;
  var mx=0,my=0,tx=0,ty=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function anim(){tx+=(mx-tx)*.1;ty+=(my-ty)*.1;tr.style.left=tx+'px';tr.style.top=ty+'px';requestAnimationFrame(anim);})();
    function big(){cur.style.width='40px';cur.style.height='40px';cur.style.opacity='.5';}
    function sm(){cur.style.width='16px';cur.style.height='16px';cur.style.opacity='1';}
    document.querySelectorAll('a,button,.cty,.wtab,.whycard,.testcard,.procstep').forEach(function(el){el.addEventListener('mouseenter',big);el.addEventListener('mouseleave',sm);});
  var hr=document.querySelector('.hero-right');
  if(hr){hr.addEventListener('mouseenter',function(){cur.style.background='#fff';cur.style.borderColor='#6ab347';});hr.addEventListener('mouseleave',function(){cur.style.background='#6ab347';cur.style.borderColor='#111';});}
})();
new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('vis');}
  });
},{threshold:0.08,rootMargin:'0px 0px -40px 0px'}).observe && (function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e,i){
      if(e.isIntersecting){
        setTimeout(function(){e.target.classList.add('vis');},i*120);
      }
    });
  },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rev').forEach(function(el){obs.observe(el);});
})();

// ─── ROOF ESTIMATOR ───────────────────────────────────────────────────────────
var GOOGLE_MAPS_KEY    = 'AIzaSyBzUgHdgEINn3NWUWJHqeo799B3gmwz5Fg';
// ── SolarPilot integration ────────────────────────────────────────────────────
// Set this to your SolarPilot API endpoint. When set, bill uploads POST there.
// The response should include { success: true, portal_url: '...' }
// Leave as null to keep the existing simulated flow.
var SOLARPILOT_API_URL = null; // e.g. 'https://api.solarpilot.ie/v1/bills'
var SOLARPILOT_APP_URL = null; // e.g. 'https://app.solarpilot.ie'

var RE_ORIENT = {south:{suit:88,kwp:1.0},east:{suit:68,kwp:0.80},flat:{suit:75,kwp:0.88},north:{suit:42,kwp:0.60}};
var RE_HOUSE  = {detached:{panels:12,kwp:4.5},semi:{panels:10,kwp:3.5},bungalow:{panels:13,kwp:4.5},terraced:{panels:8,kwp:3.0}};
var RE_CF     = {
  carlow:1.02,dublin:1.0,kildare:1.02,kilkenny:1.03,laois:1.01,longford:0.99,
  louth:1.0,meath:1.01,offaly:1.0,westmeath:0.99,wexford:1.04,wicklow:1.01,
  clare:1.01,cork:1.05,kerry:1.04,limerick:1.02,tipperary:1.01,waterford:1.03,
  galway:0.98,leitrim:0.96,mayo:0.97,roscommon:0.98,sligo:0.97,
  cavan:0.99,donegal:0.96,monaghan:0.99,
  antrim:0.97,armagh:0.99,belfast:0.97,derry:0.96,down:0.98,fermanagh:0.97,tyrone:0.97
};
var RE_GRANT = {detached:1800,semi:1500,bungalow:1800,terraced:900}; // SEAI 2024: terraced ~2kWp = €900

// Eircode routing key → county lookup
// Irish Eircodes start with a 3-char routing key (e.g. D01, V94, etc.)
// Eircode → house type mapping (based on area density/build patterns)
var EIRCODE_HOUSE_TYPE = {
  'D01':'terraced','D02':'terraced','D03':'terraced','D04':'terraced',
  'D05':'terraced','D06':'terraced','D07':'terraced','D08':'terraced',
  'D09':'semi','D10':'semi','D11':'semi','D12':'semi','D13':'semi',
  'D14':'semi','D15':'semi','D16':'semi','D17':'semi','D18':'detached',
  'D20':'semi','D22':'semi','D24':'semi','D6W':'semi',
  'A41':'detached','A45':'detached','A63':'detached','A75':'detached',
  'A81':'detached','A82':'detached','A84':'detached','A85':'detached',
  'A94':'detached','A96':'detached',
  'F12':'bungalow','F23':'bungalow','F26':'bungalow','F28':'bungalow',
  'F31':'bungalow','F35':'bungalow','F42':'bungalow','F45':'bungalow',
  'H23':'bungalow','H53':'bungalow','H54':'bungalow','H62':'bungalow',
  'H65':'bungalow','H71':'bungalow','H91':'bungalow',
  'P12':'bungalow','P14':'bungalow','P17':'bungalow','P24':'bungalow',
  'P25':'bungalow','P31':'bungalow','P32':'bungalow','P36':'bungalow',
  'P43':'bungalow','P47':'bungalow','P51':'bungalow','P56':'bungalow',
  'P61':'bungalow','P67':'bungalow','P72':'bungalow','P81':'bungalow',
  'R21':'bungalow','R32':'bungalow','R35':'bungalow','R42':'bungalow',
  'T45':'bungalow',
  'V14':'bungalow','V15':'bungalow','V23':'bungalow','V31':'bungalow',
  'V35':'bungalow','V42':'bungalow','V92':'bungalow','V93':'bungalow',
  'V94':'bungalow','V95':'bungalow',
  'E45':'bungalow','E53':'bungalow',
  'K32':'detached','K34':'detached','K36':'detached','K45':'detached',
  'N37':'detached','N39':'detached','N41':'detached',
  'W91':'detached','X35':'detached','X42':'detached','X91':'detached',
  'Y21':'detached','Y25':'detached','Y34':'detached','Y35':'detached',
};

function showBadge(id){var el=document.getElementById(id);if(el)el.style.display='inline';}

function enrichFromEircode(eircode){
  if(!eircode) return;
  var clean=eircode.toUpperCase().replace(/\s/g,'');
  var p3=clean.substring(0,3);
  var p1=clean.substring(0,1);
  var houseType=EIRCODE_HOUSE_TYPE[p3]||null;
  if(!houseType){
    if(p1==='D') houseType='terraced';
    else if('FHVPR'.indexOf(p1)>=0) houseType='bungalow';
    else if('CNLG'.indexOf(p1)>=0) houseType='detached';
  }
  if(houseType){
    var hEl=document.getElementById('re-house');
    if(hEl&&!hEl.dataset.userSet){hEl.value=houseType;showBadge('badge-house');}
  }
}

var EIRCODE_COUNTY = {
  // Dublin
  'D01':'dublin','D02':'dublin','D03':'dublin','D04':'dublin','D05':'dublin',
  'D06':'dublin','D6W':'dublin','D07':'dublin','D08':'dublin','D09':'dublin',
  'D10':'dublin','D11':'dublin','D12':'dublin','D13':'dublin','D14':'dublin',
  'D15':'dublin','D16':'dublin','D17':'dublin','D18':'dublin','D20':'dublin',
  'D22':'dublin','D24':'dublin','K67':'dublin','K78':'dublin',
  // Wicklow
  'A63':'wicklow','A67':'wicklow','A98':'wicklow',
  // Wexford
  'Y21':'wexford','Y34':'wexford','Y35':'wexford',
  // Waterford
  'X35':'waterford','X42':'waterford','X91':'waterford',
  // Cork
  'P12':'cork','P14':'cork','P17':'cork','P24':'cork','P25':'cork',
  'P31':'cork','P32':'cork','P36':'cork','P43':'cork','P47':'cork',
  'P51':'cork','P56':'cork','P61':'cork','P67':'cork','P72':'cork',
  'P75':'cork','P81':'cork','P85':'cork','T12':'cork','T23':'cork',
  'T34':'cork','T45':'cork','T56':'cork',
  // Kerry
  'V92':'kerry','V93':'kerry','V94':'kerry',
  // Limerick
  'V94':'limerick','V35':'limerick',
  // Clare
  'V95':'clare','V98':'clare',
  // Tipperary
  'E21':'tipperary','E25':'tipperary','E32':'tipperary','E34':'tipperary',
  'E41':'tipperary','E45':'tipperary','E53':'tipperary','E91':'tipperary',
  // Kilkenny
  'R51':'kilkenny','R95':'kilkenny',
  // Carlow
  'R21':'carlow','R93':'carlow',
  // Laois
  'R32':'laois',
  // Kildare
  'W12':'kildare','W23':'kildare','W34':'kildare','W91':'kildare',
  // Meath
  'A82':'meath','A84':'meath','A85':'meath','A86':'meath','C15':'meath',
  // Louth
  'A91':'louth','A92':'louth',
  // Monaghan
  'H18':'monaghan',
  // Cavan
  'H12':'cavan',
  // Longford
  'N39':'longford',
  // Westmeath
  'N37':'westmeath','N91':'westmeath',
  // Offaly
  'R35':'offaly','R42':'offaly',
  // Roscommon
  'F42':'roscommon',
  // Galway
  'H54':'galway','H62':'galway','H65':'galway','H71':'galway','H91':'galway',
  // Mayo
  'F12':'mayo','F23':'mayo','F26':'mayo','F28':'mayo','F31':'mayo',
  // Sligo
  'F56':'sligo','F91':'sligo',
  // Leitrim
  'N41':'leitrim',
  // Donegal
  'F92':'donegal','F93':'donegal','F94':'donegal',
  // NI
  'BT1':'belfast','BT2':'belfast','BT3':'belfast','BT4':'belfast','BT5':'belfast',
  'BT6':'belfast','BT7':'belfast','BT8':'belfast','BT9':'belfast','BT10':'belfast',
  'BT11':'belfast','BT12':'belfast','BT13':'belfast','BT14':'belfast','BT15':'belfast',
  'BT16':'belfast','BT17':'belfast','BT18':'antrim','BT19':'down','BT20':'down',
  'BT21':'down','BT22':'down','BT23':'down','BT24':'down','BT25':'down',
  'BT26':'down','BT27':'antrim','BT28':'antrim','BT29':'antrim','BT30':'down',
  'BT31':'down','BT32':'armagh','BT33':'down','BT34':'down','BT35':'armagh',
  'BT36':'antrim','BT37':'antrim','BT38':'antrim','BT39':'antrim','BT40':'antrim',
  'BT41':'antrim','BT42':'antrim','BT43':'antrim','BT44':'antrim','BT45':'derry',
  'BT46':'derry','BT47':'derry','BT48':'derry','BT49':'derry','BT51':'derry',
  'BT52':'derry','BT53':'antrim','BT54':'antrim','BT55':'antrim','BT56':'antrim',
  'BT57':'antrim','BT60':'armagh','BT61':'armagh','BT62':'armagh','BT63':'armagh',
  'BT64':'armagh','BT65':'armagh','BT66':'armagh','BT67':'armagh','BT68':'armagh',
  'BT69':'armagh','BT70':'tyrone','BT71':'tyrone','BT74':'fermanagh','BT75':'fermanagh',
  'BT76':'fermanagh','BT77':'fermanagh','BT78':'tyrone','BT79':'tyrone','BT80':'derry',
  'BT81':'tyrone','BT82':'derry','BT92':'fermanagh','BT93':'fermanagh','BT94':'fermanagh'
};

// Detect county from Eircode string
function detectCountyFromEircode(val) {
  val = val.trim().toUpperCase().replace(/\s+/g,'');
  if(!val) return null;
  // NI postcodes (BT prefix)
  var niMatch = val.match(/^(BT\d{1,2})/);
  if(niMatch && EIRCODE_COUNTY[niMatch[1]]) return EIRCODE_COUNTY[niMatch[1]];
  // Irish Eircode: first 3 chars are routing key
  var routing = val.substring(0,3);
  return EIRCODE_COUNTY[routing] || null;
}

// Live Eircode detection as user types
(function(){ var _el=document.getElementById('re-address'); if(_el) _el.addEventListener('input', function(){
  var val = this.value.trim();
  var county = detectCountyFromEircode(val);
  if(county){
    var sel = document.getElementById('re-county');
    if(sel.value !== county){
      sel.value = county;
      showBadge('badge-county');
      // Also apply smart orientation for this county
      var reOrient = document.getElementById('re-orient');
      if(reOrient && !reOrient.dataset.userSet && COUNTY_ORIENT[county]){
        reOrient.value = COUNTY_ORIENT[county];
        showBadge('badge-orient');
      }
      // Flash the county field to show it was auto-set
      sel.style.borderColor = 'var(--lime-dk)';
      sel.style.boxShadow = '0 0 0 3px rgba(109,201,58,.2)';
      setTimeout(function(){sel.style.borderColor='';sel.style.boxShadow='';},1500);
      reRecalc(false);
    }
  }
  // Auto-trigger if it looks like a complete Eircode (7 chars no space, or routing key + space + 4)
  var clean = val.replace(/\s/g,'');
  if(clean.length >= 7) reEstimate();
});
})();

function reEstimate(){
  // ── Helpers ───────────────────────────────────────────────────────────────
  var $ = function(id){ return document.getElementById(id); };
  var addr = ($('re-address')||{}).value;
  addr = addr ? addr.trim() : '';

  if(!addr){
    var inp = $('re-address');
    if(inp){ inp.focus(); inp.style.borderColor='#c00'; inp.style.boxShadow='2px 2px 0 #c00';
      setTimeout(function(){ inp.style.borderColor=''; inp.style.boxShadow=''; },1600); }
    return;
  }

  var estimateBtn = document.querySelector('.re2-btn');
  if(estimateBtn) btnLoad(estimateBtn,'Locating…');

  // Pre-load: county + house type from Eircode
  var county = detectCountyFromEircode(addr);
  if(county){ var ce=$('re-county'); if(ce) ce.value=county;
    var bc=$('badge-county'); if(bc) bc.style.display='inline'; }
  enrichFromEircode(addr);

  // UI state: show loading, hide results
  var loadEl=$('re-loading'); if(loadEl) loadEl.classList.add('on');
  var resEl=$('re-results');  if(resEl)  resEl.classList.remove('on');
  var tipsEl=$('re-placeholder-tips'); if(tipsEl) tipsEl.style.display='none';

  function _done(){ var l=$('re-loading'); if(l) l.classList.remove('on'); if(estimateBtn) btnReset(estimateBtn); }
  function _showMap(src){ var f=$('re-iframe'),p=$('re-placeholder');
    if(!f) return;
    f.src=src; f.style.display='block'; if(p) p.style.display='none'; }
  function _showOSM(lat,lon){
    _showMap('https://www.openstreetmap.org/export/embed.html?bbox='+(lon-0.003)+','+(lat-0.002)+','+(lon+0.003)+','+(lat+0.002)+'&layer=hot&marker='+lat+','+lon); }

  // ── Geocode via Google or OSM ─────────────────────────────────────────────
  if(GOOGLE_MAPS_KEY){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(addr+', Ireland')+'&key='+GOOGLE_MAPS_KEY)
      .then(function(r){ return r.ok ? r.json() : Promise.reject('HTTP '+r.status); })
      .then(function(data){
        _done();
        if(data.status==='OK' && data.results && data.results.length){
          var res=data.results[0];
          var lat=res.geometry.location.lat, lng=res.geometry.location.lng;
          // Extract county from geocode if Eircode didn't catch it
          if(!county) res.address_components.forEach(function(c){
            if(c.types.indexOf('administrative_area_level_2')>=0||c.types.indexOf('administrative_area_level_1')>=0){
              var n=c.long_name.toLowerCase().replace('county ','').replace('co. ','');
              if(RE_CF[n]){ var ce2=$('re-county'); if(ce2) ce2.value=n; }
            }
          });
          _showMap('https://www.google.com/maps/embed/v1/view?key='+GOOGLE_MAPS_KEY+'&center='+lat+','+lng+'&zoom=19&maptype=satellite');
        } else {
          // Bad geocode — fall back to place search
          _showMap('https://www.google.com/maps/embed/v1/place?key='+GOOGLE_MAPS_KEY+'&q='+encodeURIComponent(addr+', Ireland')+'&zoom=19&maptype=satellite');
        }
        reRecalc(true);
      })
      .catch(function(err){
        console.warn('Geocode error:',err);
        _done();
        // Try OSM as final fallback
        fetch('https://nominatim.openstreetmap.org/search?q='+encodeURIComponent(addr+', Ireland')+'&format=json&limit=1',{headers:{'Accept-Language':'en'}})
          .then(function(r){return r.json();})
          .then(function(d){ if(d&&d.length) _showOSM(parseFloat(d[0].lat),parseFloat(d[0].lon)); })
          .catch(function(){});
        reRecalc(true);
      });
  } else {
    // No Google key — use Nominatim + OSM
    fetch('https://nominatim.openstreetmap.org/search?q='+encodeURIComponent(addr+', Ireland')+'&format=json&limit=1',{headers:{'Accept-Language':'en'}})
      .then(function(r){return r.json();})
      .then(function(data){
        _done();
        if(data&&data.length) _showOSM(parseFloat(data[0].lat),parseFloat(data[0].lon));
        else{ var ph=$('re-placeholder'); if(ph){var p=ph.querySelector('p');if(p)var _s=document.createElement('strong');_s.style.color='var(--lime)';_s.textContent=addr;
              var _sm=document.createElement('span');_sm.style.cssText='opacity:.4;font-size:10px';_sm.textContent='Address not found';
              p.innerHTML=''; p.appendChild(_s); p.appendChild(document.createElement('br')); p.appendChild(_sm);} }
        reRecalc(true);
      })
      .catch(function(){ _done(); reRecalc(true); });
  }
}

function reRecalc(showOverlay){
  // ── Safe element helper ───────────────────────────────────────────────────
  var $ = function(id){ return document.getElementById(id); };
  var set = function(id,val){ var e=$(id); if(e) e.textContent=val; };
  var suit$ = function(id,pct){ setTimeout(function(){ var e=$(id); if(e) e.style.width=pct+'%'; },80); };

  // ── Read inputs (with fallbacks) ──────────────────────────────────────────
  var orient = ($('re-orient')||{}).value||'south';
  var house  = ($('re-house')||{}).value||'detached';
  var bill   = parseFloat(($('re-bill')||{}).value)||2200;
  var county = ($('re-county')||{}).value||'dublin';

  var oData   = RE_ORIENT[orient]||RE_ORIENT.south;
  var hData   = RE_HOUSE[house]||RE_HOUSE.detached;
  var cf      = RE_CF[county]||1.0;
  var kwp     = (hData.kwp * oData.kwp * cf).toFixed(1);
  var panels  = Math.round(hData.panels * oData.kwp);
  var saving  = Math.round(bill * 0.45 * oData.kwp * cf);
  var grant   = RE_GRANT[house]||1500;
  var netCost = Math.round(kwp * 1800) - grant;
  var payback = (netCost / saving).toFixed(1);
  var s25     = Math.round(saving * 25 - netCost);
  var suit    = Math.max(0,Math.min(100,Math.round(oData.suit * cf)));
  var suitLbl = suit>=85?'Excellent':suit>=70?'Very Good':suit>=55?'Good':suit>=40?'Moderate':'Limited';

  // ── Update right-panel results ────────────────────────────────────────────
  set('rr-kwp',    kwp+' kWp');
  set('rr-panels', panels+' panels');
  set('rr-save',   '€'+saving.toLocaleString());
  set('rr-grant',  '€'+grant.toLocaleString());
  set('rr-payback',payback+' yrs');
  set('rr-25yr',   '€'+s25.toLocaleString());
  set('rr-suit-label', suitLbl+' — '+suit+'%');
  suit$('rr-suit-fill', suit);
  var resEl=$('re-results'); if(resEl) resEl.classList.add('on');
  var tipsEl=$('re-placeholder-tips'); if(tipsEl) tipsEl.style.display='none';

  // ── Update map overlay stats ──────────────────────────────────────────────
  set('rov-kwp',       kwp);
  set('rov-panels',    panels);
  set('rov-save',      '€'+saving.toLocaleString());
  set('rov-grant',     '€'+grant.toLocaleString());
  set('rov-suit-label',suitLbl+' '+suit+'%');
  suit$('rov-suit-fill', suit);
  var ovEl=$('re-overlay'); if(ovEl){ ovEl.style.display='block'; if(showOverlay) ovEl.classList.add('on'); }

  if(showOverlay){
    var badge=$('re-badge'); if(badge) badge.classList.add('on');
    var box=$('re-panels');
    if(box){ box.classList.add('on'); box.innerHTML='';
      for(var i=0;i<Math.min(panels,20);i++){var cell=document.createElement('div');cell.className='re-pcell';box.appendChild(cell);} }
  }

  if(showOverlay!=='silent'){ syncCalculators('estimator'); updateWaSmartCta(); saveCalcPrefs(); }
}


(function(){
  var cur=document.getElementById('ricur');
  var trail=document.getElementById('ritrail');
  if(!cur||!trail)return;
  var mx=0,my=0,tx=0,ty=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  setInterval(function(){tx+=(mx-tx)*.18;ty+=(my-ty)*.18;trail.style.left=tx+'px';trail.style.top=ty+'px';},16);
  document.querySelectorAll('a,button').forEach(function(hr){
    hr.addEventListener('mouseenter',function(){cur.style.transform='translate(-50%,-50%) scale(1.8)';cur.style.background='transparent';cur.style.borderColor='#6ab347';});
    hr.addEventListener('mouseleave',function(){cur.style.transform='translate(-50%,-50%) scale(1)';cur.style.background='#6ab347';cur.style.borderColor='#111';});
  });
})();


// ── GDPR ──────────────────────────────────────────────────────────────────────
(function(){
  if(!localStorage.getItem('ri-cookie-consent')){
    setTimeout(function(){document.getElementById('gdpr-banner').classList.add('on');},1200);
  }
})();
function gdprAccept(){
  localStorage.setItem('ri-cookie-consent','all');
  document.getElementById('gdpr-banner').classList.remove('on');
}
function gdprDecline(){
  localStorage.setItem('ri-cookie-consent','essential');
  document.getElementById('gdpr-banner').classList.remove('on');
}

// Global error handler — catch any remaining unhandled JS errors
window.addEventListener('unhandledrejection', function(e){
  console.warn('Unhandled promise rejection:', e.reason);
  e.preventDefault(); // stop console noise
});
window.addEventListener('error', function(e){
  // Don't surface errors to users — just log
  console.error('JS Error:', e.message, 'at', e.filename, e.lineno);
});

// ── EXIT INTENT ───────────────────────────────────────────────────────────────
(function(){
  if(sessionStorage.getItem('ri-exit-shown')) return;
  var triggered = false;
  document.addEventListener('mouseleave', function(e){
    if(e.clientY <= 10 && !triggered){
      triggered = true;
      sessionStorage.setItem('ri-exit-shown','1');
      document.getElementById('exit-overlay').classList.add('on');
      document.body.style.overflow='hidden';
    }
  });
  var idleTimer = setTimeout(function(){
    if(!triggered){
      triggered = true;
      sessionStorage.setItem('ri-exit-shown','1');
      document.getElementById('exit-overlay').classList.add('on');
      document.body.style.overflow='hidden';
    }
  }, 40000);
})();
function exitClose(e){
  if(e.target===document.getElementById('exit-overlay')) exitDismiss();
}
function exitDismiss(){
  document.getElementById('exit-overlay').classList.remove('on');
  document.body.style.overflow='';
}
// ── SAVE BAR ─────────────────────────────────────────────────────────────────
(function(){
  var shown = false;
  function checkSaveBar(){
    if(shown || sessionStorage.getItem('sb-dismissed')) return;
    var footer = document.querySelector('footer');
    if(!footer) return;
    var rect = footer.getBoundingClientRect();
    if(rect.top < window.innerHeight + 200){
      shown = true;
      var bar = document.getElementById('save-bar');
      if(bar) bar.classList.add('on');
    }
  }
  window.addEventListener('scroll', checkSaveBar, {passive:true});
})();
function updateSaveBar(){
  var rs = document.getElementById('rs');
  var rg = document.getElementById('rg');
  var rp = document.getElementById('rp');
  var sb_s = document.getElementById('sb-saving');
  var sb_g = document.getElementById('sb-grant');
  var sb_p = document.getElementById('sb-payback');
  if(rs && sb_s) sb_s.textContent = rs.textContent;
  if(rg && sb_g) sb_g.textContent = rg.textContent;
  if(rp && sb_p) sb_p.textContent = rp.textContent;
}

// ── PROGRESSIVE DISCLOSURE ────────────────────────────────────────────────────
function revealEstimatorFields(){
  var w = document.getElementById('re-fields-wrap');
  if(w) w.classList.add('revealed');
}

// ── IF YOU DO NOTHING ─────────────────────────────────────────────────────────
function updateDoNothing(){
  var spEl = document.getElementById('sp');
  var hsEl = document.getElementById('hs');
  if(!spEl || !hsEl) return;
  var sp = parseInt(spEl.value)||2400;
  var si = parseInt(hsEl.value)-1;
  var grant = [900,1500,1800,1800][si]||1500;
  var installCost = Math.round([2.0,3.5,4.5,6.0][si]*1800) - grant;
  var gridTotal = 0, annual = sp;
  for(var y=0;y<20;y++){ gridTotal += annual; annual *= 1.03; }
  gridTotal = Math.round(gridTotal/100)*100;
  var solarBill = Math.round(sp*0.28), solarGrid = 0; annual = solarBill; // ~28% of bill still from grid
  for(var y=0;y<20;y++){ solarGrid += annual; annual *= 1.03; }
  var solarTotal = Math.round((installCost + solarGrid)/100)*100;
  var diff = gridTotal - solarTotal;
  var gEl=document.getElementById('dn-grid'), sEl=document.getElementById('dn-solar'), dEl=document.getElementById('dn-diff');
  if(gEl) gEl.textContent = '€'+gridTotal.toLocaleString();
  if(sEl) sEl.textContent = '€'+Math.max(0,solarTotal).toLocaleString();
  if(dEl) dEl.textContent = '€'+Math.max(0,diff).toLocaleString();
}

// ── PRICE FRAME ───────────────────────────────────────────────────────────────
function updatePriceFrame(){
  var hsEl = document.getElementById('hs');
  if(!hsEl) return;
  var si = parseInt(hsEl.value)-1;
  var grant = [900,1500,1800,1800][si]||1500;
  var gross = Math.round([2.0,3.5,4.5,6.0][si]*1800/100)*100; // consistent with ROI calc
  var net = gross - grant;
  var monthly = Math.round(net/120);
  var pfB=document.getElementById('pf-before'), pfA=document.getElementById('pf-after'), pfM=document.getElementById('pf-monthly');
  if(pfB) pfB.textContent = '€'+gross.toLocaleString()+' before SEAI grant';
  if(pfA) pfA.textContent = '€'+net.toLocaleString()+' you pay after grant';
  if(pfM) pfM.textContent = 'That’s €'+monthly+'/month over 10 years — less than most electricity bills.';
}

// ── PDF EMAIL ─────────────────────────────────────────────────────────────────
function submitPdfEmail(){
  var emailEl = document.getElementById('pdf-email-input');
  if(!emailEl || !emailEl.value.includes('@')){ if(emailEl){ emailEl.style.borderColor='#c00'; emailEl.focus(); } return; }
  emailEl.style.borderColor='';
  var btn = document.querySelector('#pdf-email-modal button[onclick]');
  btnLoad(btn, 'Sending…');
  // Production: POST to /api/lead
  setTimeout(function(){
    btnSuccess(btn, 'Sent! Check your inbox');
    setTimeout(function(){ document.getElementById('pdf-email-modal').classList.remove('on'); btnReset(btn); }, 2200);
  }, 900);
}

// ── GUIDE EMAIL ───────────────────────────────────────────────────────────────
function submitGuide(){
  var emailEl = document.getElementById('exit-guide-email');
  if(!emailEl || !emailEl.value.includes('@')){ if(emailEl){ emailEl.style.borderColor='var(--earth)'; emailEl.focus(); } return; }
  emailEl.style.borderColor='';
  var btn = emailEl.nextElementSibling;
  btnLoad(btn, 'Sending…');
  // Production: POST to /api/lead with {email, type:'guide'}
  setTimeout(function(){
    btnSuccess(btn, 'Guide sent!');
    setTimeout(exitDismiss, 1800);
  }, 800);
}

// ── PATCH uc() ───────────────────────────────────────────────────────────────
(function patchUcAll(){
  if(typeof uc !== 'function'){ setTimeout(patchUcAll, 250); return; }
  var _orig = uc;
  uc = function(){
    _orig.apply(this, arguments);
    updateSaveBar();
    updateDoNothing();
    updatePriceFrame();
    updateWaSmartCta();
  };
  setTimeout(function(){ updateDoNothing(); updatePriceFrame(); updateSaveBar(); }, 400);
})();


// ── 10. DEBOUNCED CALCULATOR ───────────────────────────────────────────────
var _calcTimer = null;
var _reTimer = null;

function debouncedUc() {
  // Update label display immediately (fast, no DOM-heavy work)
  var hsEl = document.getElementById('hs');
  var spEl = document.getElementById('sp');
  var hsvEl = document.getElementById('hsv');
  var spvEl = document.getElementById('spv');
  var hsl = ['1\u20132 bed','2 bed','3 bed','4+ bed'];
  if(hsEl && hsvEl) hsvEl.textContent = hsl[parseInt(hsEl.value)-1] || '3 bed';
  if(spEl && spvEl) spvEl.textContent = '\u20ac' + parseInt(spEl.value).toLocaleString();
  // Debounce the heavy calculation
  clearTimeout(_calcTimer);
  _calcTimer = setTimeout(uc, 120);
}

function debouncedReRecalc() {
  clearTimeout(_reTimer);
  _reTimer = setTimeout(function(){ reRecalc(false); }, 200);
}

// Wire debounced handlers (replace inline oninput/onchange)
document.addEventListener('DOMContentLoaded', function() {
  var hsEl = document.getElementById('hs');
  var spEl = document.getElementById('sp');
  var ccEl = document.getElementById('cc');
  // Remove inline handlers and attach debounced versions
  if(hsEl){ hsEl.removeAttribute('oninput'); hsEl.addEventListener('input', debouncedUc); }
  if(spEl){ spEl.removeAttribute('oninput'); spEl.addEventListener('input', debouncedUc); }
  if(ccEl){ ccEl.removeAttribute('onchange'); ccEl.addEventListener('change', uc); } // county: no debounce needed (dropdown)
  // Estimator selects
  ['re-orient','re-house','re-bill','re-county'].forEach(function(id) {
    var el = document.getElementById(id);
    if(!el) return;
    var orig = el.getAttribute('onchange');
    el.removeAttribute('onchange');
    el.addEventListener('change', function() {
      // Run the badge-hide / userSet logic from the original inline handler
      if(id === 're-orient') this.dataset.userSet = '1';
      var badgeMap = {'re-orient':'badge-orient','re-house':'badge-house','re-bill':'badge-bill','re-county':'badge-county'};
      var badge = document.getElementById(badgeMap[id]);
      if(badge) badge.style.display = 'none';
      debouncedReRecalc();
    });
  });
});

// ── 11. ANALYTICS SCAFFOLDING ──────────────────────────────────────────────
// Analytics: auto-connects to GA4, Plausible, or PostHog if loaded on page.
// To activate: add your GA4 script tag (gtag.js) or Plausible snippet to the <head>.
// GA4:      add gtag.js script tag to <head> with your G-XXXXXXXXXX measurement ID
// Plausible: add Plausible script tag to <head> with data-domain="renewableireland.ie"
var _analytics = {
  track: function(event, props) {
    // Auto-detects available analytics provider:
    if(window.gtag) gtag('event', event, props);
    if(window.plausible) plausible(event, { props: props });
    if(window.posthog) posthog.capture(event, props);
    console.debug('[Analytics]', event, props || {});
  }
};

// Key conversion events — wire to real analytics in production
(function() {
  // Quote form submits
  var gateSubmit = document.querySelector('.pg-submit');
  if(gateSubmit) {
    gateSubmit.addEventListener('click', function() {
      _analytics.track('quote_form_submit', { source: 'portal_gate' });
    });
  }
  // WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(el) {
    el.addEventListener('click', function() {
      _analytics.track('whatsapp_click', { label: el.textContent.trim().slice(0,40) });
    });
  });
  // Cal.com booking clicks
  document.querySelectorAll('a[href*="cal.com"]').forEach(function(el) {
    el.addEventListener('click', function() {
      _analytics.track('booking_click', { type: 'survey_calendar' });
    });
  });
  // Calculator slider interactions
  ['hs','sp'].forEach(function(id) {
    var el = document.getElementById(id);
    if(!el) return;
    var fired = false;
    el.addEventListener('input', function() {
      if(!fired) { fired = true; _analytics.track('calculator_engaged', { slider: id }); }
    });
  });
  // Tab switches in quote widget
  document.querySelectorAll('.wtab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      _analytics.track('quote_tab_switch', { tab: btn.querySelector('.wtab-lbl') ? btn.querySelector('.wtab-lbl').textContent : '' });
    });
  });
  // Commitment level CTA clicks
  document.querySelectorAll('.commit-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var level = btn.querySelector('.commit-level');
      _analytics.track('cta_click', { level: level ? level.textContent.trim() : 'unknown' });
    });
  });
  // PDF/guide email captures
  ['pdf-email-modal', 'exit-guide-email'].forEach(function(id) {
    var el = document.getElementById(id);
    if(el) el.addEventListener('change', function() {
      _analytics.track('email_capture_started', { form: id });
    });
  });
})();

// ── 14. IMPROVED ERROR HANDLING FOR GEOCODE / API CALLS ────────────────────
// Wraps the existing reEstimate fetch with better user-facing errors
(function patchReEstimateErrors() {
  if(typeof reEstimate !== 'function') { setTimeout(patchReEstimateErrors, 300); return; }
  var _orig = reEstimate;
  reEstimate = function() {
    // Clear any previous error state
    var ph = document.getElementById('re-placeholder');
    if(ph) {
      var errDiv = ph.querySelector('.re-error-msg');
      if(errDiv) errDiv.remove();
    }
    _orig.apply(this, arguments);
  };
})();

// Intercept fetch errors in the geocoding path and show friendly messages
var _origFetch = window.fetch;
window.fetch = function(url) {
  var args = arguments;
  return _origFetch.apply(this, args).catch(function(err) {
    // Only intercept geocoding calls
    if(typeof url === 'string' && url.indexOf('maps.googleapis.com') !== -1) {
      var loading = document.getElementById('re-loading');
      if(loading) loading.classList.remove('on');
      var ph = document.getElementById('re-placeholder');
      if(ph && ph.style.display !== 'none') {
        var p = ph.querySelector('p');
        if(p) p.innerHTML = '<strong style="color:var(--earth);font-size:13px">Connection error</strong><br><span style="font-size:10px;opacity:.6">Check your internet and try again</span>';
      }
      // Reset estimate button
      var btn = document.querySelector('.re-search-row .btn-p');
      if(btn) btnReset(btn);
    }
    throw err; // re-throw so the original .catch() still runs
  });
};

// Input validation with helpful inline messages
function validateReAddress(addr) {
  var input = document.getElementById('re-address');
  if(!addr || addr.length < 3) {
    showInputError(input, 'Enter an Eircode or address (e.g. D01 X2P3)');
    return false;
  }
  clearInputError(input);
  return true;
}
function showInputError(input, msg) {
  clearInputError(input);
  if(!input) return;
  input.style.borderColor = 'var(--earth)';
  input.style.boxShadow = '2px 2px 0 var(--earth)';
  var err = document.createElement('div');
  err.className = 're-input-error';
  err.style.cssText = 'font-size:11px;color:var(--earth);font-weight:600;margin-top:4px;font-family:Barlow Condensed,sans-serif;text-transform:uppercase;letter-spacing:.04em';
  err.textContent = msg;
  input.parentNode.insertBefore(err, input.nextSibling);
}
function clearInputError(input) {
  if(!input) return;
  input.style.borderColor = '';
  input.style.boxShadow = '';
  var err = input.parentNode && input.parentNode.querySelector('.re-input-error');
  if(err) err.remove();
}

// ── PATCH reEstimate() for progressive disclosure ─────────────────────────────
(function patchRe(){
  if(typeof reEstimate !== 'function'){ setTimeout(patchRe, 250); return; }
  var _orig = reEstimate;
  reEstimate = function(){
    revealEstimatorFields();
    _orig.apply(this, arguments);
  };
})();

// ── FINANCING TOGGLE ──────────────────────────────────────────────────────────
var _finView = 'cash';
function setFinView(v){
  _finView = v;
  var _fc=document.getElementById('fin-cash'); if(_fc){ _fc.classList.toggle('on', v==='cash'); _fc.setAttribute('aria-pressed', v==='cash'); }
  var _ff=document.getElementById('fin-finance'); if(_ff){ _ff.classList.toggle('on', v==='finance'); _ff.setAttribute('aria-pressed', v==='finance'); }
  var panel = document.getElementById('fin-monthly-panel');
  if(panel) panel.classList.toggle('on', v==='finance');
  if(v==='finance') updateFinance();
}
function updateFinance(){
  // Pull current calc values
  var hsVal = parseInt(document.getElementById('hs').value)||2;
  var spVal = parseInt(document.getElementById('sp').value)||2400;
  var sysKwp = [2.0,3.5,4.5,6.0][hsVal-1]||3.5;
  var grant = [900,1200,1500,1800][hsVal-1]||1500;
  var avgCost = sysKwp * 2200; // ~€2,200/kWp installed
  var netCost = Math.max(avgCost - grant, 0);
  // 0% APR over 10 years
  var months = 120;
  var monthly = Math.round(netCost / months);
  var savingPerMonth = Math.round(spVal * 0.49 / 12); // ~49% saving on bill
  var netFlow = savingPerMonth - monthly;
  document.getElementById('fin-monthly-val').textContent = '€' + monthly + '/mo';
  document.getElementById('fin-saving-val').textContent = '€' + savingPerMonth + '/mo';
  document.getElementById('fin-net-val').textContent = (netFlow >= 0 ? '+' : '') + '€' + netFlow + '/mo';
  document.getElementById('fin-grant-val').textContent = '−€' + grant;
}
// Hook into existing uc() update cycle — patch after page load
(function(){
  var _origUc;
  function patchUc(){
    if(typeof uc === 'function'){
      _origUc = uc;
      uc = function(){
        _origUc.apply(this, arguments);
        if(_finView === 'finance') updateFinance();
      };
    } else {
      setTimeout(patchUc, 200);
    }
  }
  patchUc();
})();

// ── PRICE MATCH MODAL ─────────────────────────────────────────────────────────
function closePmatch(){
  document.getElementById('pmatch-modal').classList.remove('on');
  document.body.style.overflow='';
}
(function(){ var _pm=document.getElementById('pmatch-modal'); if(_pm) _pm.addEventListener('keydown',function(e){
  if(e.key==='Escape') closePmatch();
}); })();
(function(){ var _pm=document.getElementById('pmatch-modal'); if(_pm) _pm.addEventListener('shown', function(){
  document.getElementById('pm-name').focus();
}); })();
function submitPmatch(){
  var name = document.getElementById('pm-name').value.trim();
  var phone = document.getElementById('pm-phone').value.trim();
  if(!name || !phone){
    document.getElementById('pm-name').style.borderColor = name ? '' : '#c00';
    document.getElementById('pm-phone').style.borderColor = phone ? '' : '#c00';
    return;
  }
  document.getElementById('pm-name').style.borderColor = '';
  document.getElementById('pm-phone').style.borderColor = '';
  var btn = document.querySelector('.pm-submit');
  btnLoad(btn, 'Sending quote…');
  // In production: POST to your CRM / Zapier / Make webhook here
  // fetch('/api/price-match', { method:'POST', body: JSON.stringify({name,phone,...}) })
  setTimeout(function(){
    btnSuccess(btn, 'Quote received!');
    setTimeout(function(){
      document.getElementById('pm-form-wrap').style.display='none';
      document.getElementById('pm-success').style.display='block';
    }, 600);
    setTimeout(closePmatch, 4000);
  }, 1200);
}
// Open modal also traps scroll
var _pmOpen = document.getElementById('pmatch-modal');
var origPmClassToggle = function(cls){ if(cls==='on') document.body.style.overflow='hidden'; };
(function(){
  var obs = new MutationObserver(function(ms){
    ms.forEach(function(m){
      if(m.attributeName==='class'){
        if(_pmOpen.classList.contains('on')) document.body.style.overflow='hidden';
        else if(!document.getElementById('exit-overlay').classList.contains('on')) document.body.style.overflow='';
      }
    });
  });
  obs.observe(_pmOpen,{attributes:true});
})();

