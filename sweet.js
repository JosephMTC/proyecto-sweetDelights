// --- VIDEO ROTATION ---
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".pastelVideo");
  let currentIndex = 0;

function playVideo(video) {
  video.muted = true; // refuerza que esté silenciado
  const promise = video.play();
  if (promise !== undefined) {
    promise.catch(error => {
      console.warn("Autoplay bloqueado, intentando fallback");
      video.setAttribute("controls", "true");
      video.currentTime = 0;
    });
  }
}

  function cambiarVideo() {
    videos[currentIndex].classList.remove("active");
    videos[currentIndex].pause();

    currentIndex = (currentIndex + 1) % videos.length;

    const nextVideo = videos[currentIndex];
    nextVideo.classList.add("active");

    nextVideo.addEventListener("loadeddata", () => {
      playVideo(nextVideo);
    }, { once: true });

    nextVideo.onended = cambiarVideo;
  }

  videos[currentIndex].classList.add("active");
  playVideo(videos[currentIndex]);
  videos[currentIndex].onended = cambiarVideo;
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
