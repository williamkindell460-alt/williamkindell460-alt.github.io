document.addEventListener("DOMContentLoaded", () => {
    // Apply saved theme
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }

    // Load components
    loadComponent("site-header", "/include/header.html");
    loadComponent("site-footer", "/include/footer.html");
    // Expandable and collapseable file structure.
    initTreeControls();
    // Back to top button
    initBackToTop();
});

// Initialize scripts AFTER header/footer load
function initSiteScripts() {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    const toggle = document.getElementById("theme-toggle");

    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("light-mode") ? "light" : "dark"
            );
        });
    }
}

// Load header/footer components
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const res = await fetch(file);
        const html = await res.text();
        el.innerHTML = html;

        if (id === "site-header") {
            initSiteScripts();
            if (window.AOS) AOS.refresh();
        }
    } catch (err) {
        console.error("Component load failed:", file, err);
    }
}
function initTreeControls() {
    const expandBtn = document.getElementById("expand-all");
    const collapseBtn = document.getElementById("collapse-all");

    if (expandBtn) {
        expandBtn.addEventListener("click", () => {
            document.querySelectorAll("details").forEach(d => d.open = true);
        });
    }

    if (collapseBtn) {
        collapseBtn.addEventListener("click", () => {
            document.querySelectorAll("details").forEach(d => d.open = false);
        });
    }
}
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    // Show button when scrolling down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    // Scroll to top when clicked
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
