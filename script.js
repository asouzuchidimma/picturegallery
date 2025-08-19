document.addEventListener("DOMContentLoaded", () => {
  const colorMap = {
    Zinnia: { bg: "#2F4F4F", text: "#FF6EC7" },
    Marigold: { bg: "#2C3E50", text: "#7CFC00" },
    Lily: { bg: "#3D2C2E", text: "#00FFFF" },
    Lavender: { bg: "#4B3F72", text: "#FFD700" },
    Camellia: { bg: "#333D4B", text: "#FFA500" },
    Hibiscus: { bg: "rgba(26, 26, 26, 1)", text: "#00FF7F" },
    Orchid: { bg: "#3E3E3E", text: "#87CEFA" },
    Daisy: { bg: "#2A2A2A", text: "#FF69B4" },
    Lotus: { bg: "#23272A", text: "#00CED1" },
    Rose: { bg: "#1C1C1C", text: "#ADFF2F" },
    Dubai: { bg: "#2F4F4F", text: "#FF7F50" },
    London: { bg: "#1B1B1B", text: "#BA55D3" },
    Nigeria: { bg: "#2E2E2E", text: "#40E0D0" },
    Italy: { bg: "#292929", text: "#F08080" },
    Europe: { bg: "#202020", text: "#00FA9A" },
    Ghana: { bg: "#181818", text: "#DAA520" },
    Portharcourt: { bg: "#262626", text: "#8A2BE2" },
    "New York": { bg: "#212121", text: "#7B68EE" },
    Amsterdam: { bg: "#1D1D1D", text: "#98FB98" },
    Paris: { bg: "#282828", text: "#E9967A" },
    Salad: { bg: "#3B3B6D", text: "#FFC0CB" },
    "Fruits Salad": { bg: "#2F4F4F", text: "#FFDAB9" },
    Pasta: { bg: "#556B2F", text: "#FF69B4" },
    "Fried Fish": { bg: "#8B4513", text: "#00FFFF" },
    Noodles: { bg: "#483D8B", text: "#ADFF2F" },
    Pancakes: { bg: "#708090", text: "#FF6347" },
    Sharwama: { bg: "#800000", text: "#40E0D0" },
    Burger: { bg: "#6B8E23", text: "#FFD700" },
    Pizza: { bg: "#4A235A", text: "#7FFF00" },
    Peppersoup: { bg: "#2E8B57", text: "#FFA07A" },
    Bole: { bg: "#191970", text: "#FF1493" },
    Rice: { bg: "#00008B", text: "#FFD700" },
    "Egwusi soup": { bg: "#800080", text: "#00FFFF" },
    Cows: { bg: "#A0522D", text: "#98FB98" },
    "Water Falls": { bg: "#228B22", text: "#FF4500" },
    Forest: { bg: "#5F9EA0", text: "#FF69B4" },
    "Blue Sea": { bg: "#1A237E", text: "#FFB300" },
    Leopard: { bg: "#004D40", text: "#FF8A65" },
    Whale: { bg: "#263238", text: "#FFD600" },
    Fruit: { bg: "#880E4F", text: "#00E676" },
    Turtle: { bg: "#01579B", text: "#FF5252" },
    Lion: { bg: "#33691E", text: "#FFEB3B" },
    Grass: { bg: "#B71C1C", text: "#00B8D4" },
    "Sitting Room": { bg: "#4E342E", text: "#FF4081" },
    Kitchen: { bg: "#827717", text: "#40C4FF" },
    Bathroom: { bg: "#006064", text: "#FFD54F" },
    "Home Office": { bg: "#FFB300", text: "#FFFFFF" },
    "Wine Rack": { bg: "#00B8D4", text: "#B71C1C" },
    Store: { bg: "#0D47A1", text: "#FFD54F" },
    Laundry: { bg: "#FF5252", text: "#01579B" },
    "Reception Room": { bg: "#00E676", text: "#666666" },
    Pool: { bg: "#FFD600", text: "#ff69b4" },
    Bedroom: { bg: "#FF8A65", text: "#004D40" },
  };

  const names = document.querySelectorAll(".name");
  let lastClicked = null;

  names.forEach((name) => {
    name.addEventListener("click", () => {
      if (name === lastClicked) return;

      // Reset all name styles
      names.forEach((n) => {
        n.style.color = "";
        n.style.backgroundColor = "";
      });

      const person = name.textContent.trim();
      const colors = colorMap[person];

      if (colors) {
        name.style.color = colors.text;
        name.style.backgroundColor = colors.bg;
      }

      lastClicked = name;
    });
  });

  // Load More Functionality
  const items = document.querySelectorAll(".gallery-item");
  const loadMoreBtn = document.getElementById("loadMore");
  let visibleCount = 12;

  function updateVisibility() {
    items.forEach((item, index) => {
      item.style.display = index < visibleCount ? "block" : "none";
    });

    if (visibleCount >= items.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }

  // Call updateVisibility initially to set up the gallery
  updateVisibility();

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += 6;
      updateVisibility();
    });
  }

  // Lightbox Functionality
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox .prev");
  const nextBtn = document.querySelector(".lightbox .next");
  const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < galleryImages.length) {
      lightboxImg.classList.remove("show");
      setTimeout(() => {
        lightboxImg.src = galleryImages[index].src;
        currentIndex = index;
        lightboxImg.onload = () => {
          lightboxImg.classList.add("show");
        };
      }, 200);
    }
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      showImage(index);
    });
  });

  prevBtn.addEventListener("click", () => {
    showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  });

  nextBtn.addEventListener("click", () => {
    showImage((currentIndex + 1) % galleryImages.length);
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Filter Functionality with fade animation
  const buttons = document.querySelectorAll(".filter-buttons button");
  const filterItems = document.querySelectorAll(".gallery-item");
  const dropdown = document.getElementById("filterSelect");

  function filterGallery(category) {
    // Fade out all items
    filterItems.forEach((item) => {
      item.classList.add("hidden");
    });

    // Wait for fade-out, then show matching items
    setTimeout(() => {
      filterItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
          item.style.display = "block";
          // Small delay before fade-in
          setTimeout(() => item.classList.remove("hidden"), 50);
        } else {
          item.style.display = "none";
        }
      });
    }, 400); // match CSS transition time

    // Highlight active button
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(
      `.filter-buttons button[data-category="${category}"]`
    );
    if (activeBtn) activeBtn.classList.add("active");

    if (dropdown) dropdown.value = category;

    // Load More visibility control
    if (category === "all") {
      visibleCount = 12;
      updateVisibility();
      loadMoreBtn.style.display = "block";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      filterGallery(category);
    });
  });

  if (dropdown) {
    dropdown.addEventListener("change", () => {
      const category = dropdown.value;
      filterGallery(category);
    });
  }

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Zoom on image click
  lightboxImg.addEventListener("click", () => {
    lightboxImg.classList.toggle("zoomed");
    lightboxImg.style.cursor = lightboxImg.classList.contains("zoomed")
      ? "zoom-out"
      : "zoom-in";
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        showImage((currentIndex + 1) % galleryImages.length);
      } else if (e.key === "ArrowLeft") {
        showImage(
          (currentIndex - 1 + galleryImages.length) % galleryImages.length
        );
      } else if (e.key === "Escape") {
        lightbox.style.display = "none";
      }
    }
  });

  // Dark/Light Mode Toggle
  const toggleBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  function setMode(mode) {
    if (mode === "dark") {
      body.classList.add("darkmode");
      toggleBtn.textContent = "☀️";
      localStorage.setItem("mode", "dark");
    } else {
      body.classList.remove("darkmode");
      toggleBtn.textContent = "🌙";
      localStorage.setItem("mode", "light");
    }
  }

  // Initial mode
  setMode(localStorage.getItem("mode") || "light");

  toggleBtn.addEventListener("click", () => {
    setMode(body.classList.contains("darkmode") ? "light" : "dark");
  });

  const filterButtons = document.querySelectorAll(".filter-buttons button");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
