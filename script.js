// ========================================
// Calculator-1.com Calculator
// ========================================

let expression = "";

const display = document.getElementById("display");


// ========================================
// SHOW DISPLAY
// ========================================

function updateDisplay() {

    if (display) {
        display.value = expression || "0";
    }

}


// ========================================
// ADD NUMBER / OPERATOR
// ========================================

function addToDisplay(value) {

    expression += value;

    updateDisplay();

}


// ========================================
// CLEAR
// ========================================

function clearDisplay() {

    expression = "";

    updateDisplay();

}


// ========================================
// DELETE LAST
// ========================================

function deleteLast() {

    expression = expression.slice(0, -1);

    updateDisplay();

}


// ========================================
// CALCULATE
// ========================================

function calculate() {

    if (expression === "") {
        return;
    }

    try {

        let calculation = expression;

        // Percentage
        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        // Only allow calculator characters
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

    }

    catch (error) {

        expression = "";

        if (display) {

            display.value = "Error";

        }

    }

}


// ========================================
// KEYBOARD SUPPORT
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers
        if (/^[0-9]$/.test(key)) {

            addToDisplay(key);

        }


        // Operators
        else if (
            ["+", "-", "*", "/", ".", "%", "(", ")"]
            .includes(key)
        ) {

            addToDisplay(key);

        }


        // Enter
        else if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

        }


        // Backspace
        else if (
            key === "Backspace"
        ) {

            deleteLast();

        }


        // Escape
        else if (
            key === "Escape"
        ) {

            clearDisplay();

        }

    }
);


// ========================================
// START
// ========================================

updateDisplay();
