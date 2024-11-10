// Variables globales

// Ajoutez ceci à votre JavaScript existant
document.getElementById('enterButton').addEventListener('click', enterSite);

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const centerContent = document.getElementById('centerContent');

let particles = [];
let animationFrameId;
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = Math.random() > 0.5 ? '#c376e5' : '#4d8bf5';
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        // Interaction avec la souris
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            this.x -= dx * 0.02;
            this.y -= dy * 0.02;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Dessiner les connexions
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = '#c376e5';
                ctx.globalAlpha = 1 - (distance / 150);
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    animationFrameId = requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    mouseX = e.x;
    mouseY = e.y;
});

window.addEventListener('resize', resizeCanvas);

function enterSite() {
    const mainContent = document.getElementById('mainContent');
    mainContent.style.visibility = 'visible';
    mainContent.style.opacity = '1';
    
    cancelAnimationFrame(animationFrameId);
    setTimeout(() => {
        canvas.style.display = 'none';
        centerContent.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}

// Initialisation
resizeCanvas();
init();
animate();

// Afficher le contenu central après un délai
setTimeout(() => {
    centerContent.style.opacity = '1';
    centerContent.style.transform = 'translate(-50%, -50%)';
}, 500);

document.body.style.overflow = 'hidden';




// Ajout de la gestion du menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu');
    const navbarCollapse = document.getElementById('navbarNav');
    const body = document.body;
    
    let isMenuOpen = false;

    menuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if(isMenuOpen) {
            navbarCollapse.style.display = 'flex';
            menuBtn.classList.add('active');
            // Force un reflow pour permettre la transition
            navbarCollapse.offsetHeight;
            setTimeout(() => {
                navbarCollapse.classList.add('active');
                body.style.overflow = 'hidden';
            }, 10);
        } else {
            navbarCollapse.classList.remove('active');
            menuBtn.classList.remove('active');
            body.style.overflow = 'auto';
            setTimeout(() => {
                if(!isMenuOpen) {
                    navbarCollapse.style.display = 'none';
                }
            }, 500);
        }

        // Change l'icône du menu
        if(isMenuOpen) {
            menuBtn.classList.remove('fa-bars');
            menuBtn.classList.add('fa-times');
        } else {
            menuBtn.classList.add('fa-bars');
            menuBtn.classList.remove('fa-times');
        }
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if(isMenuOpen) {
                navbarCollapse.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.classList.add('fa-bars');
                menuBtn.classList.remove('fa-times');
                body.style.overflow = 'auto';
                isMenuOpen = false;
                
                setTimeout(() => {
                    navbarCollapse.style.display = 'none';
                }, 500);
            }
        });
    });
});

/// 


// document.querySelector('form[name="contact"]').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Vérification des champs
//     const name = this.querySelector('input[name="name"]');
//     const email = this.querySelector('input[name="email"]');
//     const message = this.querySelector('textarea[name="message"]');
    
//     // Validation
//     if (!name.value || !email.value || !message.value) {
//         [name, email, message].forEach(field => {
//             if (!field.value) {
//                 field.classList.add('error');
//                 setTimeout(() => field.classList.remove('error'), 3000);
//             }
//         });
//         return;
//     }

//     // Préparation des données pour Netlify
//     const formData = new FormData(this);
    
//     // Envoi à Netlify
//     fetch("/", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams(formData).toString()
//     })
//     .then(() => {
//         // Redirection vers la page de succès
//         window.location.href = '/success.html';
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('Une erreur est survenue. Veuillez réessayer.');
//     });
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.querySelector('form[name="contact"]');
//     const overlay = document.querySelector('.success-overlay');

//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Validation des champs
//         const name = this.querySelector('input[name="name"]');
//         const email = this.querySelector('input[name="email"]');
//         const message = this.querySelector('textarea[name="message"]');
//         const submitButton = this.querySelector('input[type="submit"]');

//         // Vérification
//         if (!name.value || !email.value || !message.value) {
//             [name, email, message].forEach(field => {
//                 if (!field.value) {
//                     field.classList.add('error');
//                     setTimeout(() => field.classList.remove('error'), 3000);
//                 }
//             });
//             return;
//         }

//         // Préparation des données
//         const formData = new FormData(this);
//         formData.append("form-name", "contact");

//         // Envoi à Netlify
//         fetch("/", {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: new URLSearchParams(formData).toString()
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Afficher l'overlay
//                 overlay.style.display = 'flex';
//                 // Reset le formulaire
//                 form.reset();
//                 // Réactiver le bouton
//                 submitButton.value = "Envoyez";
//                 submitButton.disabled = false;
//             } else {
//                 throw new Error('Erreur réseau');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Une erreur est survenue. Veuillez réessayer.');
//         });
//     });

    // Gestion du bouton retour dans l'overlay
//     document.querySelector('.return-button').addEventListener('click', () => {
//         overlay.style.display = 'none';
//         window.location.href = '#About';
//     });
// });