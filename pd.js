

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.getElementById("stage");
  const boy = document.getElementById("boy");

  const heartsWrap = document.getElementById("hearts");
  const petalsLayer = document.getElementById("petalsLayer");
  const toggleBtn = document.getElementById("petalToggleBtn");

  const titlePill = document.querySelector(".top .pill");

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
  // 1) Background hearts
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

  // seed + continuous
  for (let i = 0; i < 14; i++) addHeart();
  setInterval(addHeart, 850);

  // =========================
  // 2) Petal shower (ALWAYS ON)
  // =========================
  let petalsOn = true;
  let petalTimer = null;

  function spawnPetal() {
    if (!petalsOn || !petalsLayer) return;

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

    // cleanup after fall ends
    setTimeout(() => wrap.remove(), (fallDur + 0.6) * 1000);
  }

  function startPetals() {
    if (!petalsLayer || petalTimer) return;

    // quick burst so you see it instantly
    for (let i = 0; i < 18; i++) setTimeout(spawnPetal, i * 90);

    // continuous rain
    petalTimer = setInterval(spawnPetal, 180);
  }

  function stopPetals() {
    clearInterval(petalTimer);
    petalTimer = null;
    if (petalsLayer) petalsLayer.innerHTML = "";
  }

  // start immediately
  startPetals();

  // optional toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      petalsOn = !petalsOn;
      toggleBtn.textContent = petalsOn ? "Petals: ON" : "Petals: OFF";
      if (petalsOn) startPetals();
      else stopPetals();
    });
  }

  // =========================
  // 3) Tap anywhere to replay
  // =========================
  if (stage && boy) {
    stage.addEventListener("click", (e) => {
      if (e.target && e.target.id === "petalToggleBtn") return;

      boy.style.animation = "none";
      void boy.offsetWidth; // reflow
      boy.style.animation = "";
    });
  }

  // =========================
  // 4) Sparkles on title
  // =========================
  function sparkleOnce() {
    if (!titlePill) return;

    const r = titlePill.getBoundingClientRect();
    const s = document.createElement("div");
    s.className = "sparkle";

    const x = r.left + Math.random() * r.width;
    const y = r.top + Math.random() * r.height;

    s.style.left = x + "px";
    s.style.top = y + "px";

    document.body.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }

  setTimeout(() => {
    // quick burst (visible immediately)
    for (let i = 0; i < 10; i++) setTimeout(sparkleOnce, i * 120);

    // gentle continuous sparkles
    setInterval(sparkleOnce, 450);
  }, 300);
});
