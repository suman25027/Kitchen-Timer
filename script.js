  let mins = 0, secs = 0;
  let running = false;
  let iv = null;
  let colonOn = true;
  let blinkIv = null;
  let audioCtx = null;
  let beepOsc = null;
  let beepGain = null;
  let beepIv = null;
  let beepTimeout = null;
  let minDown = false, secDown = false;

  const dMin1   = document.getElementById('d-min1');
  const dMin2   = document.getElementById('d-min2');
  const dSec1   = document.getElementById('d-sec1');
  const dSec2   = document.getElementById('d-sec2');
  const colonEl = document.getElementById('colon');
  const statusEl= document.getElementById('status');
  const lcd     = document.getElementById('lcd');

  const SEGMENT_MAP = {
    0: ['a','b','c','d','e','f'],
    1: ['b','c'],
    2: ['a','b','g','e','d'],
    3: ['a','b','g','c','d'],
    4: ['f','g','b','c'],
    5: ['a','f','g','c','d'],
    6: ['a','f','g','e','c','d'],
    7: ['a','b','c'],
    8: ['a','b','c','d','e','f','g'],
    9: ['a','b','c','d','f','g']
  };

  function setDigit(element, value) {
    const active = SEGMENT_MAP[value] || [];
    element.querySelectorAll('.segment').forEach(seg => {
      seg.classList.toggle('on', active.includes(seg.dataset.seg));
    });
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function render() {
    const [m1, m2] = pad(mins).split('');
    const [s1, s2] = pad(secs).split('');
    setDigit(dMin1, Number(m1));
    setDigit(dMin2, Number(m2));
    setDigit(dSec1, Number(s1));
    setDigit(dSec2, Number(s2));
  }

  function setStatus(text, cls) {
    statusEl.textContent = text;
    statusEl.className = 'status ' + (cls || '');
  }

  /* Web Audio beep sequence */
  function startBeep(durationMs = 35000) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (beepOsc) return;

      beepOsc = audioCtx.createOscillator();
      beepGain = audioCtx.createGain();
      beepOsc.connect(beepGain);
      beepGain.connect(audioCtx.destination);
      beepOsc.type = 'square';
      beepOsc.frequency.value = 880;
      beepGain.gain.setValueAtTime(0.24, audioCtx.currentTime);
      beepOsc.start();

      beepIv = setInterval(() => {
        if (!beepGain) return;
        const now = audioCtx.currentTime;
        beepGain.gain.setValueAtTime(0.08, now);
        beepGain.gain.linearRampToValueAtTime(0.24, now + 0.1);
      }, 220);

      beepTimeout = setTimeout(stopBeep, durationMs);
    } catch (e) {
      console.warn('beep failed', e);
    }
  }

  function stopBeep() {
    if (beepIv) {
      clearInterval(beepIv);
      beepIv = null;
    }
    if (beepTimeout) {
      clearTimeout(beepTimeout);
      beepTimeout = null;
    }
    if (beepOsc) {
      try {
        beepOsc.stop();
      } catch (e) {}
      beepOsc.disconnect();
      beepOsc = null;
    }
    if (beepGain) {
      beepGain.disconnect();
      beepGain = null;
    }
  }

  /* LCD flash when done */
  function flashDone() {
    let count = 0;
    blinkIv = setInterval(() => {
      count++;
      lcd.style.background = count % 2 === 0 ? '#c8ccc0' : '#e8ece0';
      colonEl.classList.toggle('visible', count % 2 === 0);
      if (count >= 14) {
        clearInterval(blinkIv);
        lcd.style.background = '#c8ccc0';
        colonEl.classList.add('visible');
      }
    }, 280);
  }

  function stopTimer() {
    clearInterval(iv);
    iv = null;
    running = false;
    stopBeep();
    colonEl.classList.add('visible');
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
      startBeep(35000);
      flashDone();
      return;
    }
    render();
    colonOn = !colonOn;
    colonEl.classList.toggle('visible', colonOn);
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


  // Target the control buttons
  const bStart = document.getElementById('b-start');

  // 2. Keyboard Shortcuts Engine for PC Users
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'm') {
      if (running) return;
      e.preventDefault();
      mins = (mins + 1) % 100;
      render();
      setStatus('');
      return;
    }

    if (key === 's') {
      if (running) return;
      e.preventDefault();
      secs = (secs + 1) % 60;
      render();
      setStatus('');
      return;
    }

    if (key === 'r') {
      e.preventDefault();
      reset();
      return;
    }

    if (key === ' ' || key === 'spacebar' || key === 'enter') {
      e.preventDefault();
      bStart.click();
      return;
    }
  });

  render();
  colonEl.classList.add('visible');
