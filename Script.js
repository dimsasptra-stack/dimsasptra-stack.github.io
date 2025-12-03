// Minimal protocol logic
const $ = id => document.getElementById(id);
const initBtn = $('initiate');
const scannerWrap = $('scannerWrap');
const scanBar = $('scanBar');
const scanText = $('scanText');
const securityCheck = $('securityCheck');
const checkForm = $('checkForm');
const vault = $('vault');
const denied = $('denied');
const retry = $('retry');
const abort = $('abort');
const logout = $('logout');

function startScan() {
  scannerWrap.classList.remove('hidden');
  let pct = 0;
  scanBar.style.width = '0%';
  scanText.textContent = 'SCANNING SUBJECT… 0%';
  const t = setInterval(()=>{
    pct += Math.floor(Math.random()*12);
    if(pct>=100) pct = 100;
    scanBar.style.width = pct+'%';
    scanText.textContent = 'SCANNING SUBJECT… '+pct+'%';
    if(pct>=100){
      clearInterval(t);
      // small delay then show security form
      setTimeout(()=>{
        scannerWrap.classList.add('hidden');
        securityCheck.classList.remove('hidden');
      }, 600);
    }
  }, 350);
}

initBtn && initBtn.addEventListener('click', startScan);

// Form logic
checkForm && checkForm.addEventListener('submit', function(e){
  e.preventDefault();
  const f = new FormData(checkForm);
  const q1 = (f.get('q1')||'').trim();
  const q2 = (f.get('q2')||'').trim().toUpperCase();
  const q3 = (f.get('q3')||'').trim();
  // Basic validation rules
  if(!q1 || q2 !== 'HUMAN' || q3.length < 2){
    // fail
    securityCheck.classList.add('hidden');
    denied.classList.remove('hidden');
    return;
  }
  // success
  securityCheck.classList.add('hidden');
  vault.classList.remove('hidden');
});

// Retry / abort
retry && retry.addEventListener('click', ()=>{
  denied.classList.add('hidden');
  // restart entry
  document.getElementById('entry').classList.remove('hidden');
});
abort && abort.addEventListener('click', ()=>{
  securityCheck.classList.add('hidden');
  document.getElementById('entry').classList.remove('hidden');
});
logout && logout.addEventListener('click', ()=>{
  vault.classList.add('hidden');
  document.getElementById('entry').classList.remove('hidden');
  // reset forms
  checkForm.reset();
});
