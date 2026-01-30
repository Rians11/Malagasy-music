document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchPanel = document.getElementById("searchPanel");

  if (!searchBtn || !searchPanel) return;

  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = searchPanel.classList.contains("open");
    searchPanel.classList.toggle("open", !isOpen);
    if (!isOpen) {
      const input = searchPanel.querySelector("input");
      if (input) input.focus();
    }
  });

  // close when clicking outside
  document.addEventListener("click", () => {
    searchPanel.classList.remove("open");
  });

  // prevent closing when clicking inside panel
  searchPanel.addEventListener("click", (e) => e.stopPropagation());
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
