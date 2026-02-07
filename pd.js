document.addEventListener("DOMContentLoaded", () => {

  function setVH(){
  const h = (window.visualViewport ? window.visualViewport.height : window.innerHeight);
  document.documentElement.style.setProperty("--vh", (h * 0.01) + "px");
}
setVH();
window.addEventListener("resize", setVH);
if (window.visualViewport) window.visualViewport.addEventListener("resize", setVH);
    // =========================
    // 1) Background floating hearts
    // =========================
    const heartsWrap = document.getElementById("hearts");
    function addHeart(){
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
    // 2) Petal rain (no transform conflict)
    // =========================
    const layer = document.getElementById("petalsLayer");
    const toggle = document.getElementById("petalToggleBtn");
  
    let petalsOn = true;
    let petalTimer = null;
  
    function spawnPetal(){
      if (!petalsOn || !layer) return;
  
      const wrap = document.createElement("div");
      wrap.className = "petalWrap";
      wrap.style.left = (Math.random() * 100) + "%";
  
      const fallDur = 4 + Math.random() * 7; // 4–11s
      wrap.style.animationDuration = fallDur + "s";
  
      const p = document.createElement("div");
      p.className = "petal";
  
      const w = 10 + Math.random() * 18;
      const h = 8 + Math.random() * 14;
      p.style.width = w + "px";
      p.style.height = h + "px";
  
      const sway = 6 + Math.random() * 22;
      p.style.setProperty("--sway", sway + "px");
  
      const swayDur = 1.2 + Math.random() * 2.6; // 1.2–3.8s
      p.style.animationDuration = swayDur + "s";
  
      const tint = Math.floor(150 + Math.random() * 80);
      const alpha = (0.6 + Math.random() * 0.35).toFixed(2);
      p.style.background = `rgba(255,${tint},${tint},${alpha})`;
  
      wrap.appendChild(p);
      layer.appendChild(wrap);
  
      setTimeout(() => wrap.remove(), (fallDur + 0.5) * 1000);
    }
  
    function startPetals(){
      if (!layer || petalTimer) return;
      for (let i = 0; i < 12; i++) setTimeout(spawnPetal, i * 120);
      petalTimer = setInterval(spawnPetal, 220);
    }
  
    function stopPetals(){
      clearInterval(petalTimer);
      petalTimer = null;
      if (layer) layer.innerHTML = "";
    }
  
    if (layer) startPetals();
  
    if (toggle){
      toggle.addEventListener("click", (e) => {
        e.stopPropagation(); // don't trigger replay
        petalsOn = !petalsOn;
        toggle.textContent = petalsOn ? "Petals: ON" : "Petals: OFF";
        if (petalsOn) startPetals();
        else stopPetals();
      });
    }
  
    // =========================
    // 3) Tap anywhere to replay (restart boy animation)
    // =========================
    const stage = document.getElementById("stage");
    const boy = document.getElementById("boy");
  
    if (stage && boy){
      stage.addEventListener("click", (e) => {
        // ignore clicks on the toggle button
        if (e.target && e.target.id === "petalToggleBtn") return;
  
        // restart boy animation
        boy.style.animation = "none";
        void boy.offsetWidth; // force reflow
        boy.style.animation = "";
      });
    }
      // ===== Sparkles on title (guaranteed) =====
  const titlePill = document.querySelector(".top .pill");

  function sparkleOnce(){
    if (!titlePill) return;

    const r = titlePill.getBoundingClientRect();
    const s = document.createElement("div");
    s.className = "sparkle";

    // random point inside title pill
    const x = r.left + Math.random() * r.width;
    const y = r.top  + Math.random() * r.height;

    s.style.left = x + "px";
    s.style.top  = y + "px";

    document.body.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }

  // start after layout is painted
  setTimeout(() => {
    // quick test burst so you definitely see it
    for (let i=0; i<10; i++) setTimeout(sparkleOnce, i*120);

    // then continuous gentle sparkles
    setInterval(sparkleOnce, 450);
  }, 300);

  });
  

