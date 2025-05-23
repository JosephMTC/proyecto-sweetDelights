document.addEventListener('DOMContentLoaded', () => {
  // 1. Seleccionar el fondo y detectar dispositivo
  const background = document.querySelector('.video-background-color');
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // 2. Elegir los videos según el dispositivo
  const videos = document.querySelectorAll(
    isMobile ? ".video-mobile" : ".video-desktop"
  );
  let currentIndex = 0;

  // 3. Función para cambiar de video
  function cambiarVideo() {
    let nextIndex = (currentIndex + 1) % videos.length;

    videos[currentIndex].pause();
    videos[currentIndex].classList.remove("active");

    videos[nextIndex].classList.add("active");
    videos[nextIndex].play().catch(() => {
      videos[nextIndex].currentTime = 0;
    });

    currentIndex = nextIndex;
    videos[nextIndex].onended = cambiarVideo;
  }

  // 4. Iniciar reproducción del primer video (solo si tiene .active)
  videos.forEach((video, index) => {
    if (index === 0) {
      video.play().catch(() => {
        video.currentTime = 0;
      });
      video.onended = cambiarVideo;
    } else {
      video.classList.remove("active");
    }
  });

  // 5. Forzar preload y ocultar fondo en móviles
  if (isMobile && videos.length) {
    const firstMobileVideo = videos[0];
    firstMobileVideo.load();
    firstMobileVideo.addEventListener("canplay", () => {
      firstMobileVideo.classList.add("active");
      if (background) {
        // Sólo ocultamos el fondo una vez, al primer canplay
        background.style.display = "none";
      }
    });
  }
});

  
// --- ACERCA DE SLIDER ---
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;
    let interval;
    const slideInterval = 5000;

    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Ir al slide ${index + 1}`);
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function initSlider() {
        updateSlider();
        startAutoSlide();

        if (prevBtn) prevBtn.addEventListener("click", prevSlide);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);

        dotsContainer.addEventListener("mouseenter", pauseAutoSlide);
        dotsContainer.addEventListener("mouseleave", startAutoSlide);
        document.querySelector(".slides").addEventListener("mouseenter", pauseAutoSlide);
        document.querySelector(".slides").addEventListener("mouseleave", startAutoSlide);
    }

    function updateSlider() {
        slides.forEach((slide, index) => {
            const isActive = index === currentIndex;
            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", !isActive);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
            dot.setAttribute("aria-selected", index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    }

    function startAutoSlide() {
        if (!interval) {
            interval = setInterval(nextSlide, slideInterval);
        }
    }

    function pauseAutoSlide() {
        clearInterval(interval);
        interval = null;
    }

    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }

    initSlider();

    window.addEventListener("blur", pauseAutoSlide);
    window.addEventListener("focus", startAutoSlide);
});

// --- HAMBURGER MENU ---
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.barraNavegacion');
  const btn = nav.querySelector('.hamburger');

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.classList.toggle('active');
  });
});
