document.addEventListener("DOMContentLoaded", () => {
  const stage = document.getElementById("stage");
  const boy = document.getElementById("boy");

  const heartsWrap = document.getElementById("hearts");
  const petalsLayer = document.getElementById("petalsLayer");

  const titlePill = document.querySelector(".top .pill");

  const nameHeartsLayer = document.getElementById("nameHeartsLayer");
  const burstLayer = document.getElementById("burstLayer");

  const boyTag = document.querySelector("#boy .nameTag");
  const girlTag = document.querySelector(".girl .nameTag");

  // =========================
  // 0) Stable mobile viewport
  // =========================
  function lockVH() {
    const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty("--vh", (h * 0.01) + "px");
  }
  lockVH();
  window.addEventListener("resize", lockVH);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", lockVH);
    window.visualViewport.addEventListener("scroll", lockVH);
  }

  // =========================
  // 0.1) Petal fall distance (px)
  // =========================
  function setFallDist() {
    const h = stage ? stage.getBoundingClientRect().height : window.innerHeight;
    document.documentElement.style.setProperty("--fallDist", (h + 260) + "px");
  }
  setFallDist();
  window.addEventListener("resize", setFallDist);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", setFallDist);

  // =========================
  // 1) Background floating hearts
  // =========================
  function addHeart() {
    if (!heartsWrap) return;

    const h = document.createElement("div");
    h.className = "heart";

    const size = 10 + Math.random() * 16;
    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.left = (Math.random() * 100) + "vw";
    h.style.opacity = (0.10 + Math.random() * 0.18).toFixed(2);
    h.style.animationDuration = (6 + Math.random() * 10).toFixed(1) + "s";
    h.style.animationDelay = (-Math.random() * 10).toFixed(1) + "s";

    heartsWrap.appendChild(h);
    setTimeout(() => h.remove(), 17000);
  }
  for (let i = 0; i < 14; i++) addHeart();
  setInterval(addHeart, 850);

  // =========================
  // 2) Petal shower (ALWAYS ON)
  // =========================
  let petalTimer = null;

  function spawnPetal() {
    if (!petalsLayer) return;

    const wrap = document.createElement("div");
    wrap.className = "petalWrap";
    wrap.style.left = (Math.random() * 100) + "%";

    const fallDur = 4 + Math.random() * 7; // 4–11s
    wrap.style.animationDuration = fallDur + "s";

    const petal = document.createElement("div");
    petal.className = "petal";

    const w = 10 + Math.random() * 18;
    const h = 8 + Math.random() * 14;
    petal.style.width = w + "px";
    petal.style.height = h + "px";

    const sway = 8 + Math.random() * 26;
    petal.style.setProperty("--sway", sway + "px");

    const swayDur = 1.2 + Math.random() * 2.6;
    petal.style.animationDuration = swayDur + "s";

    const tint = Math.floor(155 + Math.random() * 70);
    const alpha = (0.65 + Math.random() * 0.35).toFixed(2);
    petal.style.background = `rgba(255,${tint},${tint},${alpha})`;

    wrap.appendChild(petal);
    petalsLayer.appendChild(wrap);

    setTimeout(() => wrap.remove(), (fallDur + 0.6) * 1000);
  }

  function startPetals() {
    if (!petalsLayer || petalTimer) return;

    for (let i = 0; i < 18; i++) setTimeout(spawnPetal, i * 90);
    petalTimer = setInterval(spawnPetal, 180);
  }

  function restartPetals() {
    if (!petalsLayer) return;
    clearInterval(petalTimer);
    petalTimer = null;
    petalsLayer.innerHTML = "";
    startPetals();
  }

  startPetals();

  // =========================
  // 3) Sparkles on title
  // =========================
  function sparkleOnce() {
    if (!titlePill) return;

    const r = titlePill.getBoundingClientRect();
    const s = document.createElement("div");
    s.className = "sparkle";

    s.style.left = (r.left + Math.random() * r.width) + "px";
    s.style.top = (r.top + Math.random() * r.height) + "px";

    document.body.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }

  setTimeout(() => {
    for (let i = 0; i < 10; i++) setTimeout(sparkleOnce, i * 120);
    setInterval(sparkleOnce, 450);
  }, 300);

  // =========================
  // 4) Floating hearts near names
  // =========================
  function spawnNameHeart(tagEl) {
    if (!tagEl || !nameHeartsLayer || !stage) return;

    const r = tagEl.getBoundingClientRect();
    const s = stage.getBoundingClientRect();

    const heart = document.createElement("div");
    heart.className = "nameHeart";

    const x = (r.left + r.width * (0.3 + Math.random() * 0.4)) - s.left;
    const y = (r.top + r.height * (0.2 + Math.random() * 0.6)) - s.top;

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    const dx = (-18 + Math.random() * 36).toFixed(1) + "px";
    const dy = (30 + Math.random() * 60).toFixed(1) + "px";
    heart.style.setProperty("--dx", dx);
    heart.style.setProperty("--dy", dy);

    const size = 8 + Math.random() * 10;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    const dur = 900 + Math.random() * 1100;
    heart.style.animationDuration = dur + "ms";

    const op = (0.35 + Math.random() * 0.45).toFixed(2);
    heart.style.background = `rgba(255,77,166,${op})`;

    nameHeartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), dur + 80);
  }

  setInterval(() => spawnNameHeart(boyTag), 280);
  setInterval(() => spawnNameHeart(girlTag), 320);

  // =========================
  // 5) Final celebration burst
  // =========================
  function burstCelebration() {
    if (!burstLayer || !stage) return;

    const s = stage.getBoundingClientRect();
    const originX = s.width * 0.52;
    const originY = s.height * 0.42;

    const palette = [
      "rgba(255,77,166,.95)",
      "rgba(181,108,255,.95)",
      "rgba(76,195,255,.95)",
      "rgba(255,255,255,.95)"
    ];

    for (let i = 0; i < 42; i++) {
      const p = document.createElement("div");
      p.className = "burstPiece";

      p.style.left = originX + "px";
      p.style.top = originY + "px";

      const angle = Math.random() * Math.PI * 2;
      const dist = 140 + Math.random() * 240;

      const bx = Math.cos(angle) * dist;
      const by = Math.sin(angle) * dist - (60 + Math.random() * 80);

      p.style.setProperty("--bx", bx.toFixed(1) + "px");
      p.style.setProperty("--by", by.toFixed(1) + "px");

      p.style.background = palette[(Math.random() * palette.length) | 0];

      const size = 7 + Math.random() * 10;
      p.style.width = size + "px";
      p.style.height = size + "px";

      burstLayer.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  // =========================
  // 6) Replay behavior (boy should NOT loop)
  // =========================
  function replayScene() {
    // restart boy animation ONCE
    if (boy) {
      boy.style.animation = "none";
      void boy.offsetWidth;
      boy.style.animation = "";
    }

    // restart petals so iOS never "freezes" them
    restartPetals();

    // celebration burst after kneel moment (~70% of 7.5s)
    setTimeout(burstCelebration, 5450);
  }

  // play once on load
  replayScene();

  // tap anywhere on stage to replay
  if (stage) {
    stage.addEventListener("click", (e) => {
      if (e.target && e.target.id === "petalToggleBtn") return;
      replayScene();
    }, { passive: true });
  }
});
