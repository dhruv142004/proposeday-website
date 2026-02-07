// Soft floating hearts (lightweight for mobile)
const heartsWrap = document.getElementById("hearts");
function addHeart(){
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
  setTimeout(()=>h.remove(), 17000);
}
for(let i=0;i<14;i++) addHeart();
setInterval(addHeart, 850);

// Tap to replay animation (mobile friendly)
const stage = document.getElementById("stage");
const boy = documen
s