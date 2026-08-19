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
document.onkeydown = null;

document.onkeydown = function (event) {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        addToDisplay(key);
        return;
    }

    if (key === "+") {
        addToDisplay("+");
        return;
    }

    if (key === "-") {
        addToDisplay("-");
        return;
    }

    if (key === "*") {
        addToDisplay("*");
        return;
    }

    if (key === "/") {
        addToDisplay("/");
        return;
    }

    if (key === ".") {
        addToDisplay(".");
        return;
    }

    if (key === "%") {
        addToDisplay("%");
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
        clearDisplay();
    }
};
