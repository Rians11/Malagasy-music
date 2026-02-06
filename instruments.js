document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = (params.get("instrument") || "").toLowerCase().trim();
  if (slug) {
    const target =
      document.querySelector(`[data-instrument="${slug}"]`) ||
      document.getElementById(slug);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // highlight
      target.classList.add("is-highlight");
      setTimeout(() => target.classList.remove("is-highlight"), 2500);
    }
  }

  const track = document.getElementById("imgTrack");
  const prev = document.getElementById("imgPrev");
  const next = document.getElementById("imgNext");
  const dotsWrap = document.getElementById("imgDots");

  if (!track || !prev || !next || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer = null;

  function go(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    Array.from(dotsWrap.children).forEach((d, k) => {
      d.classList.toggle("active", k === index);
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.addEventListener("click", () => {
      go(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  prev.addEventListener("click", () => { go(index - 1); restart(); });
  next.addEventListener("click", () => { go(index + 1); restart(); });

  function start(){
    stop();
    timer = setInterval(() => go(index + 1), 4500);
  }
  function stop(){
    if (timer) clearInterval(timer);
    timer = null;
  }
  function restart(){
    start();
  }

  track.addEventListener("mouseenter", stop);
  track.addEventListener("mouseleave", start);

  go(0);
  start();
});