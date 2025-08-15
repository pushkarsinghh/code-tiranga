// COUNTDOWN
(function countdown() {
  const d = document.getElementById('d');
  const h = document.getElementById('h');
  const m = document.getElementById('m');
  const s = document.getElementById('s');

  function nextAug15() {
    const now = new Date();
    const y = now.getMonth() > 7 || (now.getMonth() === 7 && now.getDate() > 15)
      ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(y, 7, 15, 0, 0, 0);
  }

  function tick() {
    const t = nextAug15().getTime() - Date.now();
    const sec = Math.max(0, Math.floor(t / 1000));
    const dd = Math.floor(sec / 86400);
    const hh = Math.floor((sec % 86400) / 3600);
    const mm = Math.floor((sec % 3600) / 60);
    const ss = sec % 60;
    d.textContent = String(dd).padStart(2, '0');
    h.textContent = String(hh).padStart(2, '0');
    m.textContent = String(mm).padStart(2, '0');
    s.textContent = String(ss).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
})();

// FIREWORKS
(function fireworks() {
  const c = document.getElementById('fw');
  const ctx = c.getContext('2d');
  let W, H, dpr = Math.max(1, window.devicePixelRatio || 1);
  const colors = ['#FF9933', '#FFFFFF', '#138808', '#00b8d9'];
  let particles = [];

  function resize() {
    W = c.clientWidth;
    H = c.clientHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();

  function spawn(x, y) {
    const N = 90 + Math.floor(Math.random() * 40);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.5 + Math.random() * 3.5;
      particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 80 + Math.random() * 40, color: colors[(i % colors.length)] });
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 1;
      ctx.globalAlpha = Math.max(0, p.life / 120);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 2, 2);
      if (p.life <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  loop();

  setTimeout(() => { spawn(W * 0.3, H * 0.55); spawn(W * 0.7, H * 0.35); }, 600);

  window.addEventListener('click', (e) => { spawn(e.clientX, e.clientY); });
  document.getElementById('launchFireworks').addEventListener('click', () => {
    spawn(W * 0.5, H * 0.5);
    spawn(W * 0.2, H * 0.65);
    spawn(W * 0.8, H * 0.3);
  });
})();

// ANTHEM
(function anthem() {
  const btn = document.getElementById('toggleAnthem');
  const audio = document.getElementById('anthem');
  let playing = false;

  btn.addEventListener('click', async () => {
    if (!audio.src) {
      alert("Add 'anthem.mp3' next to this HTML or set the audio src.");
      return;
    }
    try {
      if (!playing) {
        await audio.play();
        playing = true;
        btn.textContent = '⏸️ Pause';
      } else {
        audio.pause();
        playing = false;
        btn.textContent = '🎵 Anthem';
      }
    } catch (err) {
      console.error(err);
    }
  });

  audio.addEventListener('ended', () => {
    playing = false;
    btn.textContent = '🎵 Anthem';
  });
})();
