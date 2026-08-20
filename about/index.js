// Theme Toggle Button
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Save preference
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

// Load saved preference on startup
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}
