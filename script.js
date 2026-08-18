/* =========================================================
   CALCULATOR-1.COM
   Complete Calculator JavaScript
   ========================================================= */


/* =========================================================
   NAVIGATION
   ========================================================= */

function toggleMenu() {

    const menu = document.getElementById("navigationLinks");

    if (menu) {
        menu.classList.toggle("open");
    }
}


/* =========================================================
   OPEN CALCULATOR
   ========================================================= */

function openCalculator(id) {

    const calculators =
        document.querySelectorAll(".calculator-tool");

    calculators.forEach(function (calculator) {

        calculator.classList.remove("active");

    });


    const selected =
        document.getElementById(id);

    if (selected) {

        selected.classList.add("active");

        selected.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    const menu =
        document.getElementById("navigationLinks");

    if (menu) {
        menu.classList.remove("open");
    }
}


/* =========================================================
   FAVORITES
   ========================================================= */

function addFavorite() {

    alert(
        "To add Calculator-1.com to your favorites, press Ctrl + D on your keyboard."
    );

}


/* =========================================================
   ONLINE CALCULATOR
   ========================================================= */

let calculatorExpression = "";


function updateDisplay() {

    const display =
        document.getElementById("display");

    if (!display) return;

    display.textContent =
        calculatorExpression || "0";
}


/* Add number/operator */

function addNumber(value) {

    calculatorExpression += value;

    updateDisplay();

}


/* Clear */

function clearCalculator() {

    calculatorExpression = "";

    updateDisplay();

}


/* Delete */

function deleteNumber() {

    calculatorExpression =
        calculatorExpression.slice(0, -1);

    updateDisplay();

}


/* Calculate */

function calculate() {

    if (!calculatorExpression) {

        return;

    }


    try {

        let expression =
            calculatorExpression;


        /* Convert percentage */

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        /*
           Only allow numbers and calculator operators
        */

        if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {

            throw new Error("Invalid expression");

        }


        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error("Invalid result");

        }


        calculatorExpression =
            String(result);

        updateDisplay();

    }

    catch (error) {

        calculatorExpression = "";

        const display =
            document.getElementById("display");

        if (display) {

            display.textContent = "Error";

        }

    }

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const key = event.key;


        /* Numbers */

        if (
            /^[0-9]$/.test(key)
        ) {

            addNumber(key);

        }


        /* Operators */

        else if (
            ["+", "-", "*", "/", ".", "%", "(", ")"]
                .includes(key)
        ) {

            addNumber(key);

        }


        /* Enter */

        else if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

        }


        /* Backspace */

        else if (
            key === "Backspace"
        ) {

            deleteNumber();

        }


        /* Escape */

        else if (
            key === "Escape"
        ) {

            clearCalculator();

        }

    }
);


/* =========================================================
   SCIENTIFIC CALCULATOR
   ========================================================= */


/* Add scientific number/operator */

function scientificInput(value) {

    const display =
        document.getElementById(
            "scientificDisplay"
        );

    if (!display) return;


    if (
        display.value === "0" &&
        value !== "."
    ) {

        display.value = value;

    }

    else {

        display.value += value;

    }

}


/* Scientific functions */

function scientific(operation) {

    const display =
        document.getElementById(
            "scientificDisplay"
        );

    if (!display) return;


    let value =
        parseFloat(display.value);


    try {


        /* Clear */

        if (
            operation === "clear"
        ) {

            display.value = "0";

            return;

        }


        /* Backspace */

        if (
            operation === "back"
        ) {

            display.value =
                display.value.slice(0, -1) || "0";

            return;

        }


        /* Pi */

        if (
            operation === "pi"
        ) {

            display.value =
                Math.PI;

            return;

        }


        /* Square root */

        if (
            operation === "sqrt"
        ) {

            if (value < 0) {

                display.value = "Error";

            }

            else {

                display.value =
                    Math.sqrt(value);

            }

            return;

        }


        /* Square */

        if (
            operation === "square"
        ) {

            display.value =
                value * value;

            return;

        }


        /* Cube */

        if (
            operation === "cube"
        ) {

            display.value =
                value * value * value;

            return;

        }


        /* Sine - degrees */

        if (
            operation === "sin"
        ) {

            display.value =
                Math.sin(
                    value * Math.PI / 180
                );

            return;

        }


        /* Cosine - degrees */

        if (
            operation === "cos"
        ) {

            display.value =
                Math.cos(
                    value * Math.PI / 180
                );

            return;

        }


        /* Tangent - degrees */

        if (
            operation === "tan"
        ) {

            display.value =
                Math.tan(
                    value * Math.PI / 180
                );

            return;

        }


        /* Log */

        if (
            operation === "log"
        ) {

            if (value <= 0) {

                display.value = "Error";

            }

            else {

                display.value =
                    Math.log10(value);

            }

            return;

        }


        /* Natural log */

        if (
            operation === "ln"
        ) {

            if (value <= 0) {

                display.value = "Error";

            }

            else {

                display.value =
                    Math.log(value);

            }

            return;

        }


        /* Equal */

        if (
            operation === "equal"
        ) {

            let expression =
                display.value
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/");


            if (
                !/^[0-9+\-*/().\s]+$/.test(expression)
            ) {

                display.value = "Error";

                return;

            }


            const result =
                Function(
                    '"use strict"; return (' +
                    expression +
                    ')'
                )();


            if (
                !Number.isFinite(result)
            ) {

                display.value = "Error";

            }

            else {

                display.value =
                    result;

            }

        }

    }

    catch (error) {

        display.value = "Error";

    }

}


/* =========================================================
   SIMPLE CALCULATOR
   ========================================================= */

function simpleCalculate() {

    const first =
        parseFloat(
            document.getElementById(
                "simpleFirst"
            ).value
        );


    const second =
        parseFloat(
            document.getElementById(
                "simpleSecond"
            ).value
        );


    const operator =
        document.getElementById(
            "simpleOperator"
        ).value;


    const resultBox =
        document.getElementById(
            "simpleResult"
        );


    if (
        Number.isNaN(first) ||
        Number.isNaN(second)
    ) {

        resultBox.textContent =
            "Please enter both numbers.";

        return;

    }


    let result;


    switch (operator) {

        case "+":

            result =
                first + second;

            break;


        case "-":

            result =
                first - second;

            break;


        case "*":

            result =
                first * second;

            break;


        case "/":

            if (second === 0) {

                result =
                    "Cannot divide by zero";

            }

            else {

                result =
                    first / second;

            }

            break;


        default:

            result = "Invalid operation";

    }


    resultBox.textContent =
        "Result: " + result;

}


/* =========================================================
   TIP CALCULATOR
   ========================================================= */

function calculateTip() {

    const bill =
        parseFloat(
            document.getElementById(
                "billAmount"
            ).value
        );


    const percentage =
        parseFloat(
            document.getElementById(
                "tipPercentage"
            ).value
        );


    const people =
        parseInt(
            document.getElementById(
                "numberPeople"
            ).value
        );


    const resultBox =
        document.getElementById(
            "tipResult"
        );


    if (
        Number.isNaN(bill) ||
        Number.isNaN(percentage)
    ) {

        resultBox.textContent =
            "Please enter bill amount and tip percentage.";

        return;

    }


    const numberOfPeople =
        people > 0 ? people : 1;


    const tipAmount =
        bill * percentage / 100;


    const total =
        bill + tipAmount;


    const perPerson =
        total / numberOfPeople;


    resultBox.textContent =
        "Tip: $" +
        tipAmount.toFixed(2) +

        " | Total: $" +
        total.toFixed(2) +

        " | Per Person: $" +
        perPerson.toFixed(2);

}


/* =========================================================
   PERCENTAGE CALCULATOR
   ========================================================= */

function calculatePercentage() {

    const number =
        parseFloat(
            document.getElementById(
                "percentageNumber"
            ).value
        );


    const percentage =
        parseFloat(
            document.getElementById(
                "percentageValue"
            ).value
        );


    const resultBox =
        document.getElementById(
            "percentageResult"
        );


    if (
        Number.isNaN(number) ||
        Number.isNaN(percentage)
    ) {

        resultBox.textContent =
            "Please enter both values.";

        return;

    }


    const result =
        number * percentage / 100;


    resultBox.textContent =
        percentage +
        "% of " +
        number +
        " = " +
        result;

}


/* =========================================================
   ROOT CALCULATOR
   ========================================================= */

function calculateRoot() {

    const number =
        parseFloat(
            document.getElementById(
                "rootNumber"
            ).value
        );


    const degree =
        parseFloat(
            document.getElementById(
                "rootDegree"
            ).value
        );


    const resultBox =
        document.getElementById(
            "rootResult"
        );


    if (
        Number.isNaN(number) ||
        Number.isNaN(degree)
    ) {

        resultBox.textContent =
            "Please enter number and root degree.";

        return;

    }


    if (degree <= 0) {

        resultBox.textContent =
            "Root degree must be greater than 0.";

        return;

    }


    /* Negative number with even root */

    if (
        number < 0 &&
        degree % 2 === 0
    ) {

        resultBox.textContent =
            "Invalid real root.";

        return;

    }


    let result;


    if (
        number < 0
    ) {

        result =
            -Math.pow(
                Math.abs(number),
                1 / degree
            );

    }

    else {

        result =
            Math.pow(
                number,
                1 / degree
            );

    }


    resultBox.textContent =
        degree +
        "th root of " +
        number +
        " = " +
        result;

}


/* =========================================================
   LENGTH CONVERTER
   ========================================================= */


/*
   Every unit is converted to meters first.
*/

const lengthUnits = {

    mm: 0.001,

    cm: 0.01,

    m: 1,

    km: 1000,

    in: 0.0254,

    ft: 0.3048,

    yd: 0.9144,

    mi: 1609.344

};


function convertLength() {

    const value =
        parseFloat(
            document.getElementById(
                "lengthValue"
            ).value
        );


    const from =
        document.getElementById(
            "lengthFrom"
        ).value;


    const to =
        document.getElementById(
            "lengthTo"
        ).value;


    const resultBox =
        document.getElementById(
            "lengthResult"
        );


    if (
        Number.isNaN(value)
    ) {

        resultBox.textContent =
            "Please enter a value.";

        return;

    }


    const meters =
        value *
        lengthUnits[from];


    const result =
        meters /
        lengthUnits[to];


    resultBox.textContent =
        "Result: " +
        result +
        " " +
        to;

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDisplay();

    }
);
