window.addEventListener('load', () => {

    // Czyszczenie pamięci skrolla przeglądarki po F5 (zapobiega błędom pozycji)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // 1. Spowolnienie wideo
    const video = document.querySelector('.video-container video');
    if (video) {
        video.playbackRate = 0.75;
    }

    // 2. Rejestracja wtyczek
    gsap.registerPlugin(ScrollTrigger);

    // 3. Inicjalizacja Lenis
    const lenis = new Lenis({
        duration: 4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ==========================================
    // HERO ANIMACJA
    // ==========================================
    const heroTl = gsap.timeline();
    heroTl.from('.hero-content', {
        scale: 0.85,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power3.out'
    }).from('.company-name', {
        letterSpacing: '15px',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6');

    // ==========================================
    // SEKCJA USŁUG (Sekwencyjna animacja)
    // ==========================================
    const servicesTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    servicesTl
        .fromTo('.section-title', 
            { opacity: 0, y: -30, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }
        )
        .fromTo('.service-card', 
            { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotateX: 0, 
                duration: 0.6, 
                stagger: 0.12, 
                ease: 'power3.out',
                clearProps: 'transform,opacity' 
            },
            '-=0.2'
        );

    
    lenis.resize();
    ScrollTrigger.refresh();
});