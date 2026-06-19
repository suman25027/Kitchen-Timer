  let mins = 0, secs = 0;
  let running = false;
  let iv = null;
  let colonOn = true;
  let blinkIv = null;
  let audioCtx = null;
  let minDown = false, secDown = false;

  const dMin    = document.getElementById('d-min');
  const dSec    = document.getElementById('d-sec');
  const colonEl = document.getElementById('colon');
  const statusEl= document.getElementById('status');
  const lcd     = document.getElementById('lcd');

  function pad(n) { return String(n).padStart(2, '0'); }

  function render() {
    dMin.textContent = pad(mins);
    dSec.textContent = pad(secs);
  }

  function setStatus(text, cls) {
    statusEl.textContent = text;
    statusEl.className = 'status ' + (cls || '');
  }

  /* Web Audio beep sequence */
  function beep() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const pattern = [880, 1100, 880, 1100, 880];
      pattern.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        const t = audioCtx.currentTime + i * 0.22;
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch(e) {}
  }

  /* LCD flash when done */
  function flashDone() {
    let count = 0;
    blinkIv = setInterval(() => {
      count++;
      lcd.style.background = count % 2 === 0 ? '#c8ccc0' : '#e8ece0';
      colonEl.style.visibility = count % 2 === 0 ? 'visible' : 'hidden';
      if (count >= 14) {
        clearInterval(blinkIv);
        lcd.style.background = '#c8ccc0';
        colonEl.style.visibility = 'visible';
      }
    }, 280);
  }

  function stopTimer() {
    clearInterval(iv);
    iv = null;
    running = false;
    colonEl.style.visibility = 'visible';
  }

  function reset() {
    stopTimer();
    clearInterval(blinkIv);
    lcd.style.background = '#c8ccc0';
    mins = 0; secs = 0;
    render();
    setStatus('ready');
  }

  function tick() {
    if (secs > 0) {
      secs--;
    } else if (mins > 0) {
      mins--;
      secs = 59;
    } else {
      stopTimer();
      setStatus('done!', 'done');
      beep();
      flashDone();
      return;
    }
    render();
    colonOn = !colonOn;
    colonEl.style.visibility = colonOn ? 'visible' : 'hidden';
  }

  /* Start / Stop */
  document.getElementById('b-start').addEventListener('click', () => {
    if (mins === 0 && secs === 0) { setStatus('set time first'); return; }
    if (running) {
      stopTimer();
      setStatus('paused', 'pause');
    } else {
      running = true;
      iv = setInterval(tick, 1000);
      setStatus('running…', 'run');
    }
  });

  /* 分 button */
  function onMinDown() {
    if (running) return;
    minDown = true;
    if (secDown) { reset(); minDown = false; secDown = false; return; }
    mins = (mins + 1) % 100;
    render();
    setStatus('');
  }

  /* 秒 button */
  function onSecDown() {
    if (running) return;
    secDown = true;
    if (minDown) { reset(); minDown = false; secDown = false; return; }
    secs = (secs + 1) % 60;
    render();
    setStatus('');
  }

  const bMin = document.getElementById('b-min');
  const bSec = document.getElementById('b-sec');

  bMin.addEventListener('pointerdown', onMinDown);
  bSec.addEventListener('pointerdown', onSecDown);
  bMin.addEventListener('pointerup',   () => { minDown = false; });
  bSec.addEventListener('pointerup',   () => { secDown = false; });
  bMin.addEventListener('pointercancel', () => { minDown = false; });
  bSec.addEventListener('pointercancel', () => { secDown = false; });


  // Target the new reset button element
  const bReset = document.getElementById('b-reset');

  // 1. Mouse Click Event for PC Users
  bReset.addEventListener('click', () => {
    reset();
  });

  // 2. Keyboard Shortcuts Engine for PC Users
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    if (key === 'r') {
      // 'R' Key clears out the timer back to 00:00
      e.preventDefault();
      reset();
    } else if (e.key === ' ' || key === 'spacebar') {
      // Spacebar toggles start / pause states seamlessly
      e.preventDefault();
      document.getElementById('b-start').click();
    }
  });
