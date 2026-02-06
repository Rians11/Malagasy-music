document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchPanel = document.getElementById("searchPanel");
  const input = document.getElementById("homeSearchInput");

  if (!searchBtn || !searchPanel || !input) return;

  // open/close
  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchPanel.classList.toggle("open");
    if (searchPanel.classList.contains("open")) input.focus();
  });

  // submit => redirect
  searchPanel.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if (!q) return;

    window.location.href = `artists.html?q=${encodeURIComponent(q)}`;
  });

  // close when click outside
  document.addEventListener("click", () => {
    searchPanel.classList.remove("open");
  });

  // keep open when clicking inside
  searchPanel.addEventListener("click", (e) => e.stopPropagation());

  const ROUTES = {
  // genres
  salegy: "artists.html?genre=salegy",
  jazz: "artists.html?genre=jazz",
  pop: "artists.html?genre=pop",
  rock: "artists.html?genre=rock",
  tsapiky: "artists.html?genre=tsapiky",
  rap: "artists.html?genre=rap",
  afro: "artists.html?genre=afro",
  bagasy: "artists.html?genre=bagasy",
  gospel: "artists.html?genre=gospel",
  worship: "artists.html?genre=worship",
  traditional: "artists.html?genre=traditional",

  // pages
  artists: "artists.html",
  instruments: "instruments.html",
  genres: "genres.html",
};

const ARTISTS = {
  jaojoby: "artists.html?artist=jaojoby",
  wawa: "artists.html?artist=wawa",
  mahaleo: "artists.html?artist=mahaleo",
  bessa: "artists.html?artist=bessa",
  denise: "artists.html?artist=denise",
  shyn: "artists.html?artist=shyn",
  rijaramantoanina: "artists.html?artist=rijaramantoanina",


};

// instruments
const INSTRUMENTS = {
  valiha: "instruments.html?instrument=valiha",
  kabosy: "instruments.html?instrument=kabosy",
  marovany: "instruments.html?instrument=marovany",
  hazolahy: "instruments.html?instrument=hazolahy",
  sodina: "instruments.html?instrument=sodina",
  aponga: "instruments.html?instrument=aponga",
 
};

function normalize(s){
  return (s || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); 
}

searchPanel.addEventListener("submit", (e) => {
  e.preventDefault();
  const qRaw = input.value;
  const q = normalize(qRaw);
  if (!q) return;

  if (ROUTES[q]) return (window.location.href = ROUTES[q]);

  if (ARTISTS[q]) return (window.location.href = ARTISTS[q]);

  if (INSTRUMENTS[q]) return (window.location.href = INSTRUMENTS[q]);

  window.location.href = `artists.html?q=${encodeURIComponent(qRaw)}`;
});

});
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("offcanvasMenu");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("closeMenu");

  if (!menuBtn || !menu || !overlay || !closeBtn) return;

  menuBtn.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("active");
  });

  const closeMenu = () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
});
document.addEventListener("DOMContentLoaded", () => {
  // Find every slider track on the page
  const tracks = document.querySelectorAll(".feature-image.slider .slides");
  if (!tracks.length) return;

  tracks.forEach((track) => {
    const slides = track.querySelectorAll("img");
    const total = slides.length;
    if (total <= 1) return;

    let i = 0;

    // Ensure smooth movement
    track.style.transition = "transform 0.7s ease";
    track.style.transform = "translateX(0%)";

    setInterval(() => {
      i = (i + 1) % total;
      track.style.transform = `translateX(-${i * 100}%)`;
    }, 4500);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".events-slides");
  if (!slider) return;

  const images = slider.querySelectorAll("img");
  let index = 0;

  setInterval(() => {
    index = (index + 1) % images.length;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }, 4500);
});