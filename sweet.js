const videos = document.querySelectorAll(".pastelVideo");
let currentIndex = 0;

function cambiarVideo() {
    let nextIndex = (currentIndex + 1) % videos.length;

    videos[currentIndex].pause();
    videos[currentIndex].classList.remove("active");

    videos[nextIndex].classList.add("active");
    videos[nextIndex].play();

    currentIndex = nextIndex;

    videos[nextIndex].onended = cambiarVideo;
}

videos[currentIndex].play();
videos[currentIndex].onended = cambiarVideo;

function playVideo(video) {
    const promise = video.play();
    if (promise !== undefined) {
        promise.catch(error => {
            // Fallback: Mostrar primer frame
            video.currentTime = 0;
            video.classList.add('active');
        });
    }
}

videos[currentIndex].classList.add('active');
playVideo(videos[currentIndex]);

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    
    let currentIndex = 0;
    let interval;
    const slideInterval = 5000; // 5 segundos

    // Crear puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Ir al slide ${index + 1}`);
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    // Inicializar slider
    function initSlider() {
        updateSlider();
        startAutoSlide();
        
        // Solo añadir eventos si los botones existen
        if (prevBtn) prevBtn.addEventListener("click", prevSlide);
        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        
        // Pausar al interactuar
        dotsContainer.addEventListener("mouseenter", pauseAutoSlide);
        dotsContainer.addEventListener("mouseleave", startAutoSlide);
        document.querySelector(".slides").addEventListener("mouseenter", pauseAutoSlide);
        document.querySelector(".slides").addEventListener("mouseleave", startAutoSlide);
    }

    // Actualizar slider
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

    // Navegación
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

    // Control automático
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

    // Iniciar
    initSlider();

    // Limpiar intervalo al salir de la página
    window.addEventListener("blur", pauseAutoSlide);
    window.addEventListener("focus", startAutoSlide);
});




  // Esperamos a que cargue el DOM
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.barraNavegacion');
    const btn = nav.querySelector('.hamburger');

    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      // opcional: animar la hamburguesa a “X”
      btn.classList.toggle('active');
    });
  });















