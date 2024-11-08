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





// Création de la grille
/**document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('gridContainer');
    const centerContent = document.getElementById('centerContent');
    
    // Créer les éléments de la grille
    for (let i = 0; i < 400; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item';
        gridContainer.appendChild(div);
    }

    // Animation d'apparition de la grille
    setTimeout(() => {
        const items = document.querySelectorAll('.grid-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 10);
        });

        // Afficher le contenu central
        setTimeout(() => {
            centerContent.style.opacity = '1';
            centerContent.style.transform = 'translate(-50%, -50%)';
        }, 1000);
    }, 500);
});

// Fonction pour entrer sur le site
function enterSite() {
    const mainContent = document.getElementById('mainContent');
    const introContainer = document.getElementById('gridContainer');
    const centerContent = document.getElementById('centerContent');
    
    // Affiche le contenu principal
    mainContent.style.visibility = 'visible';
    mainContent.style.opacity = '1';
    
    // Cache l'intro après un délai
    setTimeout(() => {
        introContainer.style.display = 'none';
        centerContent.style.display = 'none';
        document.body.style.overflow = 'auto'; // Active le scroll
    }, 500);
}

// Désactive le scroll au chargement
document.body.style.overflow = 'hidden';

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const front = card.querySelector('.card-front');
        const back = card.querySelector('.card-back');
        
        front.style.display = 'none';
        back.style.display = 'block';
    });

    card.addEventListener('mouseleave', () => {
        const front = card.querySelector('.card-front');
        const back = card.querySelector('.card-back');
        
        front.style.display = 'block';
        back.style.display = 'none';
    });
});*/