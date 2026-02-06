document.addEventListener("DOMContentLoaded", () => {
  const chips = Array.from(document.querySelectorAll(".chip"));
  const cards = Array.from(document.querySelectorAll(".artist-card"));
  const input = document.getElementById("artistSearchInput");

  const params = new URLSearchParams(window.location.search);
  const qParam = (params.get("q") || "").trim();
  const genreParam = (params.get("genre") || "").trim().toLowerCase();
  const artistParam = (params.get("artist") || "").trim().toLowerCase();

  function normalize(s){
    return (s || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  let activeGenre = "all";
  let activeQuery = "";

  function setActiveChip(filter){
    chips.forEach(ch => ch.classList.toggle("is-active", ch.dataset.filter === filter));
  }

  function applyFilter(){
    const f = normalize(activeGenre);
    const query = normalize(activeQuery);

    cards.forEach(card => {
      const genres = normalize(card.dataset.genre || "").split(/\s+/).filter(Boolean);

      const name = normalize(card.querySelector(".artist-name")?.textContent || "");
      const desc = normalize(card.querySelector(".artist-desc")?.textContent || "");

      const matchGenre = (f === "all") || genres.includes(f);

      const matchText =
        !query ||
        name.includes(query) ||
        desc.includes(query) ||
        genres.some(g => g.includes(query));

      card.style.display = (matchGenre && matchText) ? "" : "none";
    });
  }

  function focusArtist(slug){
    const el = document.querySelector(`.artist-card[data-artist="${slug}"]`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.outline = "2px solid rgba(255,255,255,.55)";
    el.style.outlineOffset = "6px";
    setTimeout(() => {
      el.style.outline = "";
      el.style.outlineOffset = "";
    }, 1600);
  }

  /* =========================
     INIT from URL
  ========================== */
  if (genreParam) {
    activeGenre = genreParam;
    setActiveChip(activeGenre);
  } else {
    const current = chips.find(c => c.classList.contains("is-active"));
    activeGenre = current?.dataset.filter || "all";
  }

  if (qParam) {
    activeQuery = qParam;
    if (input) input.value = qParam;
  }

  applyFilter();

  if (artistParam) focusArtist(artistParam);

  /* =========================
     EVENTS
  ========================== */
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      activeGenre = chip.dataset.filter || "all";
      setActiveChip(activeGenre);
      applyFilter();
    });
  });

  if (input){
    input.addEventListener("input", () => {
      activeQuery = input.value || "";
      applyFilter();
    });
  }
});