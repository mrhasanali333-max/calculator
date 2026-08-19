// =========================
// KEYBOARD SUPPORT
// Prevent duplicate listeners
// =========================

if (!window.fastCalculatorKeyboardLoaded) {

    window.fastCalculatorKeyboardLoaded = true;

    document.addEventListener("keydown", function(event) {

        const key = event.key;

        // Numbers
        if (/^[0-9]$/.test(key)) {
            event.preventDefault();
            addToDisplay(key);
            return;
        }

        // Operators
        if (["+", "-", "*", "/", ".", "%", "(", ")"].includes(key)) {
            event.preventDefault();
            addToDisplay(key);
            return;
        }

        // Enter / =
        if (key === "Enter" || key === "=") {
            event.preventDefault();
            calculate();
            return;
        }

        // Backspace
        if (key === "Backspace") {
            event.preventDefault();
            deleteLast();
            return;
        }

        // Escape
        if (key === "Escape") {
            event.preventDefault();
            clearDisplay();
        }

    });
}
