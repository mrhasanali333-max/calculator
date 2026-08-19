// =========================
// KEYBOARD SUPPORT
// Prevent duplicate listeners
// =========================

document.onkeydown = function(event) {

    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        addToDisplay(key);
        return;
    }

    if (["+", "-", "*", "/", ".", "%", "(", ")"].includes(key)) {
        event.preventDefault();
        addToDisplay(key);
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
        return;
    }

    if (key === "Escape") {
        event.preventDefault();
        clearDisplay();
    }
};
document.addEventListener("keydown", function (e) {

    // Prevent browser from handling the key twice
    if (e.repeat) return;

    const key = e.key;

    if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        addToDisplay(key);
        return;
    }

    if (["+", "-", "*", "/", ".", "%"].includes(key)) {
        e.preventDefault();
        addToDisplay(key);
        return;
    }

    if (key === "Enter") {
        e.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace") {
        e.preventDefault();
        deleteLast();
        return;
    }

    if (key === "Escape") {
        e.preventDefault();
        clearDisplay();
    }

});
