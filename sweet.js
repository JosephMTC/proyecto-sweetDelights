// --- VIDEO ROTATION ---
document.addEventListener("DOMContentLoaded", function() {
  const videos = document.querySelectorAll(".pastelVideo");
  let currentIndex = 0;
  let userInteracted = false;

  // Configuración inicial de videos
  function setupVideos() {
    videos.forEach((video, index) => {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('loop', '');
      video.setAttribute('disablePictureInPicture', '');
      
      // Precargar videos
      video.preload = "auto";
      video.load();
      
      // Ocultar todos los videos excepto el primero
      if (index !== 0) {
        video.style.opacity = 0;
        video.style.visibility = 'hidden';
      }
    });
  }

  // Función para iniciar reproducción
  function startVideoPlayback() {
    if (!userInteracted) return;
    
    playVideo(videos[currentIndex]);
    videos[currentIndex].classList.add("active");
    videos[currentIndex].style.opacity = 1;
    videos[currentIndex].style.visibility = 'visible';
    videos[currentIndex].addEventListener('ended', cambiarVideo);
  }

  // Función para cambiar de video
  function cambiarVideo() {
    const prevVideo = videos[currentIndex];
    prevVideo.classList.remove("active");
    prevVideo.style.opacity = 0;
    prevVideo.style.visibility = 'hidden';
    prevVideo.pause();
    prevVideo.removeEventListener('ended', cambiarVideo);

    currentIndex = (currentIndex + 1) % videos.length;
    const nextVideo = videos[currentIndex];
    
    nextVideo.currentTime = 0;
    nextVideo.classList.add("active");
    nextVideo.style.opacity = 1;
    nextVideo.style.visibility = 'visible';
    playVideo(nextVideo);
    nextVideo.addEventListener('ended', cambiarVideo);
  }

  // Función para reproducir video con manejo de errores
  function playVideo(video) {
    if (!userInteracted) return;
    
    video.currentTime = 0;
    const promise = video.play();
    
    if (promise !== undefined) {
      promise.catch(err => {
        console.log("Autoplay bloqueado, intentando fallback");
        video.muted = true;
        video.play()
          .then(() => {
            video.style.opacity = 1;
            video.style.visibility = 'visible';
          })
          .catch(e => console.log("Error al reproducir:", e));
      });
    }
  }

  // Configurar eventos de interacción
  function setupInteraction() {
    const handleInteraction = () => {
      userInteracted = true;
      document.body.removeEventListener('click', handleInteraction);
      document.body.removeEventListener('touchstart', handleInteraction);
      startVideoPlayback();
    };

    document.body.addEventListener('click', handleInteraction);
    document.body.addEventListener('touchstart', handleInteraction);
    
    // Iniciar automáticamente en desktop
    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      userInteracted = true;
      setupVideos();
      startVideoPlayback();
    } else {
      setupVideos();
      // Mostrar mensaje para móviles si es necesario
      // document.getElementById('play-message').style.display = 'block';
    }
  }

  setupInteraction();
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
