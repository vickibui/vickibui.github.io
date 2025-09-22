// REFRESH SCROLL TO TOP
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

// LIGHT/DARK MODE
const toggleButton = document.getElementById("mode");
const body = document.body;

function updateButtonText() {
    if (body.classList.contains("light"))
        toggleButton.textContent = "DARK MODE";
    else
        toggleButton.textContent = "LIGHT MODE";
}

function checkModeFromStorage() {
    const savedMode = localStorage.getItem("mode");
    console.log("Saved mode:", localStorage.getItem("mode"));
    if (savedMode) {
        body.classList.add(savedMode);
    }
    else {
        body.classList.add("light");
    }
    updateButtonText();
}

toggleButton.addEventListener("click", function () {
    if (body.classList.contains("light")) {
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("mode", "dark");
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("mode", "light");
    }
    updateButtonText();
});

document.addEventListener("DOMContentLoaded", function () {
    body.classList.remove("light", "dark");
    checkModeFromStorage();
});

// PAGE TRANSITION
