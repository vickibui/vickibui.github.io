// LIGHT/DARK MODE

const toggleButton = document.getElementById("mode");
const body = document.body;

function updateButtonText() {
    if (body.classList.contains("light"))
        toggleButton.textContent = "DARK MODE";
    else
        toggleButton.textContent = "LIGHT MODE";
}

// Check if a mode is saved in localStorage
function checkModeFromStorage() {
    const savedMode = localStorage.getItem("mode");
    console.log("Saved mode:", localStorage.getItem("mode"));
    if (savedMode) {
        // Apply the saved mode (either 'light' or 'dark')
        body.classList.add(savedMode);
    }
    else {
        body.classList.add("light");
    }
    updateButtonText();
}

toggleButton.addEventListener("click", function() {
    if (body.classList.contains("light")) {
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("mode", "dark"); // Save the mode
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("mode", "light"); // Save the mode
    }
    updateButtonText(); // Update button text after mode change
});

document.addEventListener("DOMContentLoaded", function() {
    body.classList.remove("light", "dark");
    checkModeFromStorage();
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const menuSection = document.getElementById('menu-section');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active"); // Animate the lines
    menuSection.classList.toggle("active"); // Show/hide the menu
});