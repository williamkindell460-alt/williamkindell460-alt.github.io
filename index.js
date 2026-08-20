// Apply saved theme on startup
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}

// Initialize scripts AFTER header/footer load
function initSiteScripts() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // Theme Toggle Button
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

        // Re-run scripts AFTER the component is injected
        initSiteScripts();

        // Re-run AOS so animations apply to dynamically loaded content
        if (window.AOS) {
            AOS.refresh();
        }
    } catch (err) {
        console.error("Component load failed:", file, err);
    }
}

// Inject header + footer
loadComponent("site-header", "/include/header.html");
loadComponent("site-footer", "/include/footer.html");
