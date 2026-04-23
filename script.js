function loadComponent(file, elementId, callback) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error(`无法加载 ${file}`);
            return res.text();
        })
        .then(data => {
            const targetElement = document.getElementById(elementId);
            if (targetElement) {
                targetElement.innerHTML = data;
                if (callback) callback(); 
            }
        })
        .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', function() {
        
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,     
            offset: 200,
            startEvent: 'DOMContentLoaded' 
        });
    }

    loadComponent("navbar.html", "navbar", () => {
        const links = document.querySelectorAll(".nav-link");
        let currentPage = window.location.pathname.split("/").pop() || "index.html";

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });

        const mobileMenu = document.querySelector(".menu-toggle"); 
        const navMenu = document.querySelector(".nav-menu");

        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener("click", (event) => {
                navMenu.classList.toggle("active");
                mobileMenu.classList.toggle("is-active");
                event.stopPropagation(); 
            });

            const closeMenu = () => {
                navMenu.classList.remove("active");
                mobileMenu.classList.remove("is-active");
            };

            links.forEach(link => link.onclick = closeMenu);
            document.addEventListener("click", (event) => {
                if (!navMenu.contains(event.target) && navMenu.classList.contains("active")) {
                    closeMenu();
                }
            });
        }
    });

    loadComponent("footer.html", "footer");
});

function openGallery(subject, images) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const container = document.getElementById('galleryImages');

    title.innerText = "图片参考 | " + subject;
    container.innerHTML = ""; 

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = `images/${src}`; 
        img.alt = subject;

        img.onclick = function() {
            const fullScreenOverlay = document.createElement('div');
            fullScreenOverlay.className = 'full-screen-preview';
            fullScreenOverlay.innerHTML = `
                <img src="${this.src}" class="full-img">
                <span class="close-preview">&times;</span>
            `;
            
            fullScreenOverlay.onclick = () => fullScreenOverlay.remove();
            document.body.appendChild(fullScreenOverlay);
        };
        
        container.appendChild(img);
    });

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}