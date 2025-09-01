// Animación de números en las barras de habilidades
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-out';
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Efecto de escritura en el título
    const title = document.querySelector('h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                title.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Botones de demo para proyectos
    addDemoButtons();
    
    // Funcionalidad del botón de descarga/impresión
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Función para agregar botones de demo a los proyectos
function addDemoButtons() {
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        const title = project.querySelector('.item-title').textContent.trim();
        const description = project.querySelector('.item-description');
        
        // Crear contenedor de botones
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'demo-buttons';
        
        // Botón de demo
        const demoBtn = document.createElement('a');
        demoBtn.className = 'demo-btn';
        demoBtn.textContent = '🚀 Ver Demo';
        demoBtn.href = '#'; // Cambiar por la URL real del demo
        demoBtn.target = '_blank';
        demoBtn.onclick = function(e) {
            e.preventDefault();
            alert('Demo próximamente disponible para: ' + title);
        };
        
        // Botón de repositorio
        const repoBtn = document.createElement('a');
        repoBtn.className = 'repo-btn';
        repoBtn.textContent = '📂 Código';
        repoBtn.href = '#'; // Cambiar por la URL real del repositorio
        repoBtn.target = '_blank';
        repoBtn.onclick = function(e) {
            e.preventDefault();
            alert('Repositorio próximamente disponible para: ' + title);
        };
        
        buttonsContainer.appendChild(demoBtn);
        buttonsContainer.appendChild(repoBtn);
        
        // Insertar después de la descripción
        description.parentNode.insertBefore(buttonsContainer, description.nextSibling);
    });
}