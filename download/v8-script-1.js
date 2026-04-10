
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
  if(pfA) pfA.textContent = '€'+net.toLocaleString();color:rgba(255,255,255,.4);font-weight:400">you pay after grant</span>';
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
  var _fc=document.getElementById('fin-cash'); if(_fc) _fc.classList.toggle('on', v==='cash');
  document.getElementById('fin-cash').setAttribute('aria-pressed', v==='cash');
  var _ff=document.getElementById('fin-finance'); if(_ff) _ff.classList.toggle('on', v==='finance');
  document.getElementById('fin-finance').setAttribute('aria-pressed', v==='finance');
  var panel = document.getElementById('fin-monthly-panel');
  panel.classList.toggle('on', v==='finance');
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
document.getElementById('pmatch-modal').addEventListener('keydown',function(e){
  if(e.key==='Escape') closePmatch();
});
// Re-open: trap focus loosely
document.getElementById('pmatch-modal').addEventListener('shown', function(){
  document.getElementById('pm-name').focus();
});
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
