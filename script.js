/* =====================================================
   FAST CALCULATOR
   ===================================================== */

"use strict";


/* =========================
   CALCULATOR
   ========================= */

let expression = "";

const display = document.getElementById("display");


function updateDisplay() {
    display.value = expression || "0";
}


function addToCalculator(value) {
    expression += value;
    updateDisplay();
}


function clearCalculator() {
    expression = "";
    updateDisplay();
}


function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}


function calculateCalculator() {

    if (!expression) {
        return;
    }

    try {

        let calculation = expression;

        /*
         * Convert:
         * 50% -> (50/100)
         */

        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        /*
         * Only allow calculator characters
         */

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


        expression = String(
            Number(result.toFixed(12))
        );

        updateDisplay();


    } catch (error) {

        expression = "";

        display.value = "Error";

    }
}


/* =========================
   MOUSE BUTTONS
   ========================= */

const calculatorButtons =
    document.querySelectorAll(".buttons button");


calculatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.getAttribute("data-value");
        const action = button.getAttribute("data-action");


        if (value !== null) {
            addToCalculator(value);
            return;
        }


        if (action === "clear") {
            clearCalculator();
            return;
        }


        if (action === "delete") {
            deleteLast();
            return;
        }


        if (action === "calculate") {
            calculateCalculator();
        }

    });

});


/* =========================
   KEYBOARD
   ========================= */

/*
 * IMPORTANT:
 * There is only ONE keyboard handler.
 */

document.onkeydown = function(event) {

    const key = event.key;


    /* Numbers */

    if (
        key >= "0" &&
        key <= "9"
    ) {

        event.preventDefault();

        addToCalculator(key);

        return;
    }


    /* Operators */

    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {

        event.preventDefault();

        addToCalculator(key);

        return;
    }


    /* Enter */

    if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();

        calculateCalculator();

        return;
    }


    /* Backspace */

    if (key === "Backspace") {

        event.preventDefault();

        deleteLast();

        return;
    }


    /* Escape */

    if (key === "Escape") {

        event.preventDefault();

        clearCalculator();

    }

};


/* =========================
   START
   ========================= */

updateDisplay();


/* =====================================================
   FIREBASE AUTH
   ===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyBMnXU1DIbEUDTgqQYFJh77SgbiaqVfdnM",
    authDomain: "fast-calculator--sign-up.firebaseapp.com",
    projectId: "fast-calculator--sign-up",
    storageBucket: "fast-calculator--sign-up.firebasestorage.app",
    messagingSenderId: "779031012907",
    appId: "1:779031012907:web:a1ad9301a552d44324ac6e",
    measurementId: "G-SVB7RJJPN5"
};


/*
 * Start Firebase only if available.
 * Calculator will still work if Firebase has an issue.
 */

if (
    typeof firebase !== "undefined" &&
    !firebase.apps.length
) {
    firebase.initializeApp(firebaseConfig);
}


let firebaseAuth = null;

if (typeof firebase !== "undefined") {
    firebaseAuth = firebase.auth();
}


/* =========================
   AUTH BUTTONS
   ========================= */

const signInBtn =
    document.getElementById("signInBtn");

const signUpBtn =
    document.getElementById("signUpBtn");


signInBtn.addEventListener("click", function() {

    alert(
        "Sign In will be connected with Firebase next."
    );

});


signUpBtn.addEventListener("click", function() {

    alert(
        "Sign Up will be connected with Firebase next."
    );

});
