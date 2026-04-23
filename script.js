const nav = `
    <nav class="nav-header">
        <div class="navbar container">
            <a href="index.html" class="nav-logo">
                <img src="images/logo.webp" alt="ICE Education">
            </a>

            <span class="menu-toggle" id="mobile-menu"">&#9776;</span>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">主页</a></li>
                <li><a href="about.html" class="nav-link">关于我们</a></li>
                <li><a href="programmes.html" class="nav-link">课程 / 活动</a></li>
            </ul>

            <div class="nav-social">
                <a href="https://wa.me/6084328650" class="social-icon wa" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                <a href="https://facebook.com/ICEEducation05" class="social-icon fb" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="mailto:iceeduction2025@gmail.com" class="social-icon mail" title="Email"><i class="fas fa-envelope"></i></a>
            </div>
        </div>
    </nav>
`;

function loadNav() {
    const navBar = document.getElementById('navbar');
    if (navBar) {
        navBar.innerHTML = nav;
        navLogic();
    }
}

loadNav();

document.addEventListener('DOMContentLoaded', function() {
        
    loadFooter();

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,     
            offset: 200,
        });
    }
});

function navLogic() {
    const links = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    const mobileMenu = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenu && navMenu) {
        mobileMenu.onclick = () => {
            navMenu.classList.toggle("active");
            mobileMenu.classList.toggle("is-active");
        };
        
        links.forEach(link => {
            link.onclick = () => {
                navMenu.classList.remove("active");
                mobileMenu.classList.remove("is-active");
            };
        });
    }
}

function loadFooter() {
    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

function openGallery(subject, images) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const container = document.getElementById('galleryImages');

    title.innerText = "图片参考 | " + subject;
    container.innerHTML = ""; 

    const fragment = document.createDocumentFragment();

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = `images/${src}`; 
        img.alt = subject;
        img.loading = "lazy";

        img.onclick = function() {
            const overlay = document.createElement('div');
            overlay.className = 'full-screen-preview';
            overlay.innerHTML = `
                <img src="${this.src}" class="full-img">
                <span class="close-preview">&times;</span>
            `;
            
            overlay.onclick = () => overlay.remove();
            document.body.appendChild(overlay);
        };
        
        fragment.appendChild(img);
    });

    container.appendChild(fragment);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}