// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Elementos al Hacer Scroll (Intersection Observer) ---
    const observerOptions = {
        root: null, // Observa intersecciones con el viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando al menos el 10% del elemento es visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Lógica específica para animar las barras de progreso
                if (entry.target.classList.contains('progress-bar')) {
                    if (!entry.target.style.width || entry.target.style.width === '0px') {
                        const level = entry.target.dataset.level || '0';
                        // Requesting animation frame para asegurar que la transición se aplique después de ser visible
                        requestAnimationFrame(() => {
                           entry.target.style.width = level + '%';
                        });
                    }
                }
                // Dejar de observar el elemento una vez que ha sido animado
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleccionar todos los elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.fade-in-element, .progress-bar');
    elementsToAnimate.forEach(el => {
        // Asegura que todos los elementos (excepto las barras) tengan la clase base para fade-in
        if (!el.classList.contains('progress-bar')) {
            el.classList.add('fade-in-element');
        }
        observer.observe(el);
    });

    // --- Efecto sutil en el header al hacer scroll ---
    const header = document.querySelector('.site-header');
    if(header) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, false);
    }

    // Nota: JuxtaposeJS se inicializa automáticamente si encuentra el markup correcto.
    // No necesitamos añadir código específico aquí para él.

});