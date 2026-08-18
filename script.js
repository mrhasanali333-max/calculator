let expression = "";

function getDisplay() {
    return document.getElementById("display");
}

function updateDisplay() {
    const display = getDisplay();

    if (display) {
        display.value = expression || "0";
    }
}

function addToDisplay(value) {
    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {

    if (!expression) {
        return;
    }

    try {

        let calculation = expression;

        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        if (!/^[0-9+\-*/().%\s]+$/.test(calculation)) {
            throw new Error("Invalid calculation");
        }

        const result = Function(
            '"use strict"; return (' +
            calculation +
            ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(result);

        updateDisplay();

    } catch (error) {

        expression = "";

        const display = getDisplay();

        if (display) {
            display.value = "Error";
        }
    }
}

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (/^[0-9]$/.test(key)) {

        addToDisplay(key);

    } else if (
        ["+", "-", "*", "/", ".", "%", "(", ")"].includes(key)
    ) {

        addToDisplay(key);

    } else if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();
        calculate();

    } else if (key === "Backspace") {

        deleteLast();

    } else if (key === "Escape") {

        clearDisplay();

    }

});


document.addEventListener("DOMContentLoaded", function() {
    updateDisplay();
});
