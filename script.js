"use strict";

/* =========================================================
   FAST CALCULATOR
   Complete JavaScript
   ========================================================= */


/* =========================================================
   BASIC CALCULATOR
   ========================================================= */

let expression = "";

const display = document.getElementById("display");

function updateDisplay() {
    if (display) {
        display.value = expression || "0";
    }
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

        // Convert percentages
        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        // Security check
        if (!/^[0-9+\-*/().%\s]+$/.test(calculation)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            '"use strict"; return (' + calculation + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(
            Number(result.toFixed(12))
        );

        updateDisplay();

    } catch (error) {

        if (display) {
            display.value = "Error";

            setTimeout(() => {
                expression = "";
                updateDisplay();
            }, 900);
        }
    }
}


/* =========================================================
   CALCULATOR BUTTONS
   ========================================================= */

document.addEventListener("click", function (event) {

    const button = event.target.closest(
        ".buttons button"
    );

    if (!button) {
        return;
    }

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


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.target.matches("input, select, textarea")) {
        return;
    }

    // Numbers
    if (
        event.key >= "0" &&
        event.key <= "9"
    ) {
        event.preventDefault();
        addToCalculator(event.key);
        return;
    }

    // Operators
    if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === "." ||
        event.key === "%" ||
        event.key === "(" ||
        event.key === ")"
    ) {
        event.preventDefault();
        addToCalculator(event.key);
        return;
    }

    // Enter
    if (
        event.key === "Enter" ||
        event.key === "="
    ) {
        event.preventDefault();
        calculateCalculator();
        return;
    }

    // Backspace
    if (event.key === "Backspace") {
        event.preventDefault();
        deleteLast();
        return;
    }

    // Escape
    if (event.key === "Escape") {
        event.preventDefault();
        clearCalculator();
    }

});

updateDisplay();


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getNumber(id) {

    const element = document.getElementById(id);

    if (!element) {
        return NaN;
    }

    return parseFloat(element.value);
}


function showResult(id, message) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = message;
    }

}


function formatNumber(number, decimals = 2) {

    if (!Number.isFinite(number)) {
        return "—";
    }

    return Number(
        number.toFixed(decimals)
    ).toLocaleString("en-US");

}


function invalidResult(
    id,
    message = "Please enter valid numbers."
) {

    showResult(id, message);

}


/* =========================================================
   PERCENTAGE CALCULATOR
   ========================================================= */

function percentage() {

    const part = getNumber("percentagePart");
    const whole = getNumber("percentageWhole");

    if (
        !Number.isFinite(part) ||
        !Number.isFinite(whole) ||
        whole === 0
    ) {
        invalidResult("percentageResult");
        return;
    }

    const result = (part / whole) * 100;

    showResult(
        "percentageResult",
        formatNumber(result) + "%"
    );

}


/* =========================================================
   DISCOUNT CALCULATOR
   ========================================================= */

function discount() {

    const price = getNumber("discountPrice");
    const percent = getNumber("discountPercent");

    if (
        !Number.isFinite(price) ||
        !Number.isFinite(percent)
    ) {
        invalidResult("discountResult");
        return;
    }

    const saving = price * percent / 100;
    const finalPrice = price - saving;

    showResult(
        "discountResult",
        "Save: " +
        formatNumber(saving) +
        " | Final: " +
        formatNumber(finalPrice)
    );

}


/* =========================================================
   AVERAGE CALCULATOR
   ========================================================= */

function average() {

    const input = document.getElementById(
        "averageNumbers"
    );

    if (!input) {
        return;
    }

    const numbers = input.value
        .split(",")
        .map(value => parseFloat(value.trim()))
        .filter(value => Number.isFinite(value));

    if (!numbers.length) {

        invalidResult(
            "averageResult",
            "Enter numbers separated by commas."
        );

        return;
    }

    const total = numbers.reduce(
        (sum, value) => sum + value,
        0
    );

    const result = total / numbers.length;

    showResult(
        "averageResult",
        "Average: " + formatNumber(result)
    );

}


/* =========================================================
   SIMPLE INTEREST
   ========================================================= */

function simpleInterest() {

    const principal = getNumber(
        "interestPrincipal"
    );

    const rate = getNumber(
        "interestRate"
    );

    const years = getNumber(
        "interestYears"
    );

    if (
        !Number.isFinite(principal) ||
        !Number.isFinite(rate) ||
        !Number.isFinite(years)
    ) {
        invalidResult("simpleInterestResult");
        return;
    }

    const interest =
        principal * rate * years / 100;

    const total =
        principal + interest;

    showResult(
        "simpleInterestResult",
        "Interest: " +
        formatNumber(interest) +
        " | Total: " +
        formatNumber(total)
    );

}


/* =========================================================
   COMPOUND INTEREST
   ========================================================= */

function compoundInterest() {

    const principal =
        getNumber("compoundPrincipal");

    const rate =
        getNumber("compoundRate");

    const years =
        getNumber("compoundYears");

    const frequency =
        getNumber("compoundFrequency");

    if (
        !Number.isFinite(principal) ||
        !Number.isFinite(rate) ||
        !Number.isFinite(years) ||
        !Number.isFinite(frequency) ||
        frequency <= 0
    ) {
        invalidResult("compoundResult");
        return;
    }

    const total =
        principal *
        Math.pow(
            1 + rate / 100 / frequency,
            frequency * years
        );

    const interest =
        total - principal;

    showResult(
        "compoundResult",
        "Interest: " +
        formatNumber(interest) +
        " | Total: " +
        formatNumber(total)
    );

}


/* =========================================================
   LOAN / EMI CALCULATOR
   ========================================================= */

function loan() {

    const principal =
        getNumber("loanAmount");

    const annualRate =
        getNumber("loanRate");

    const years =
        getNumber("loanYears");

    if (
        !Number.isFinite(principal) ||
        !Number.isFinite(annualRate) ||
        !Number.isFinite(years) ||
        years <= 0
    ) {
        invalidResult("loanResult");
        return;
    }

    const months = years * 12;

    const monthlyRate =
        annualRate / 100 / 12;

    let monthlyPayment;

    if (monthlyRate === 0) {

        monthlyPayment =
            principal / months;

    } else {

        monthlyPayment =
            principal *
            monthlyRate *
            Math.pow(
                1 + monthlyRate,
                months
            ) /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );

    }

    const totalPayment =
        monthlyPayment * months;

    showResult(
        "loanResult",
        "Monthly: " +
        formatNumber(monthlyPayment) +
        " | Total: " +
        formatNumber(totalPayment)
    );

}


/* =========================================================
   TIP CALCULATOR
   ========================================================= */

function tip() {

    const bill =
        getNumber("tipBill");

    const percent =
        getNumber("tipPercent");

    if (
        !Number.isFinite(bill) ||
        !Number.isFinite(percent)
    ) {
        invalidResult("tipResult");
        return;
    }

    const tipAmount =
        bill * percent / 100;

    const total =
        bill + tipAmount;

    showResult(
        "tipResult",
        "Tip: " +
        formatNumber(tipAmount) +
        " | Total: " +
        formatNumber(total)
    );

}


/* =========================================================
   PROFIT MARGIN
   ========================================================= */

function profit() {

    const cost =
        getNumber("profitCost");

    const revenue =
        getNumber("profitRevenue");

    if (
        !Number.isFinite(cost) ||
        !Number.isFinite(revenue) ||
        revenue === 0
    ) {
        invalidResult("profitResult");
        return;
    }

    const profitAmount =
        revenue - cost;

    const margin =
        profitAmount / revenue * 100;

    showResult(
        "profitResult",
        "Profit: " +
        formatNumber(profitAmount) +
        " | Margin: " +
        formatNumber(margin) +
        "%"
    );

}


/* =========================================================
   BMI CALCULATOR
   ========================================================= */

function bmi() {

    const weight =
        getNumber("bmiWeight");

    const height =
        getNumber("bmiHeight");

    if (
        !Number.isFinite(weight) ||
        !Number.isFinite(height) ||
        weight <= 0 ||
        height <= 0
    ) {
        invalidResult("bmiResult");
        return;
    }

    const heightMeters =
        height / 100;

    const bmiValue =
        weight /
        Math.pow(heightMeters, 2);

    let category;

    if (bmiValue < 18.5) {
        category = "Underweight";
    } else if (bmiValue < 25) {
        category = "Normal range";
    } else if (bmiValue < 30) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    showResult(
        "bmiResult",
        "BMI: " +
        formatNumber(bmiValue) +
        " — " +
        category
    );

}


/* =========================================================
   AGE CALCULATOR
   ========================================================= */

function age() {

    const birthInput =
        document.getElementById("birthDate");

    if (
        !birthInput ||
        !birthInput.value
    ) {
        invalidResult(
            "ageResult",
            "Please select your date of birth."
        );

        return;
    }

    const birth =
        new Date(
            birthInput.value + "T00:00:00"
        );

    const today =
        new Date();

    if (birth > today) {

        invalidResult(
            "ageResult",
            "Birth date cannot be in the future."
        );

        return;
    }

    let years =
        today.getFullYear() -
        birth.getFullYear();

    let months =
        today.getMonth() -
        birth.getMonth();

    let days =
        today.getDate() -
        birth.getDate();

    if (days < 0) {

        months--;

        days += new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

    }

    if (months < 0) {

        years--;

        months += 12;

    }

    showResult(
        "ageResult",
        years +
        " years, " +
        months +
        " months, " +
        days +
        " days"
    );

}


/* =========================================================
   DATE DIFFERENCE
   ========================================================= */

function dateDifference() {

    const start =
        document.getElementById("dateStart");

    const end =
        document.getElementById("dateEnd");

    if (
        !start ||
        !end ||
        !start.value ||
        !end.value
    ) {

        invalidResult(
            "dateDifferenceResult",
            "Please select both dates."
        );

        return;
    }

    const first =
        new Date(
            start.value + "T00:00:00"
        );

    const second =
        new Date(
            end.value + "T00:00:00"
        );

    const milliseconds =
        Math.abs(second - first);

    const days =
        Math.round(
            milliseconds / 86400000
        );

    showResult(
        "dateDifferenceResult",
        days.toLocaleString() +
        " day" +
        (days === 1 ? "" : "s")
    );

}


/* =========================================================
   LENGTH CONVERTER
   ========================================================= */

function lengthConverter() {

    const value =
        getNumber("lengthValue");

    const from =
        document.getElementById("lengthFrom");

    const to =
        document.getElementById("lengthTo");

    if (
        !Number.isFinite(value) ||
        !from ||
        !to
    ) {
        invalidResult("lengthResult");
        return;
    }

    const units = {

        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        mile: 1609.344,
        yard: 0.9144,
        foot: 0.3048,
        inch: 0.0254

    };

    const result =
        value *
        units[from.value] /
        units[to.value];

    showResult(
        "lengthResult",
        formatNumber(result, 6) +
        " " +
        to.value
    );

}


/* =========================================================
   WEIGHT CONVERTER
   ========================================================= */

function weightConverter() {

    const value =
        getNumber("weightValue");

    const from =
        document.getElementById("weightFrom");

    const to =
        document.getElementById("weightTo");

    if (
        !Number.isFinite(value) ||
        !from ||
        !to
    ) {
        invalidResult("weightResult");
        return;
    }

    const units = {

        kilogram: 1,
        gram: 0.001,
        pound: 0.45359237,
        ounce: 0.028349523125,
        stone: 6.35029318

    };

    const result =
        value *
        units[from.value] /
        units[to.value];

    showResult(
        "weightResult",
        formatNumber(result, 6) +
        " " +
        to.value
    );

}


/* =========================================================
   TEMPERATURE CONVERTER
   ========================================================= */

function temperatureConverter() {

    const value =
        getNumber("temperatureValue");

    const from =
        document.getElementById(
            "temperatureFrom"
        );

    const to =
        document.getElementById(
            "temperatureTo"
        );

    if (
        !Number.isFinite(value) ||
        !from ||
        !to
    ) {
        invalidResult(
            "temperatureResult"
        );

        return;
    }

    let celsius;

    if (from.value === "c") {

        celsius = value;

    } else if (from.value === "f") {

        celsius =
            (value - 32) * 5 / 9;

    } else {

        celsius =
            value - 273.15;

    }

    let result;

    if (to.value === "c") {

        result = celsius;

    } else if (to.value === "f") {

        result =
            celsius * 9 / 5 + 32;

    } else {

        result =
            celsius + 273.15;

    }

    showResult(
        "temperatureResult",
        formatNumber(result, 4) +
        " °" +
        to.value.toUpperCase()
    );

}


/* =========================================================
   CALCULATOR ACTION SYSTEM
   ========================================================= */

const calculatorActions = {

    percentage:
        percentage,

    discount:
        discount,

    average:
        average,

    simpleInterest:
        simpleInterest,

    compoundInterest:
        compoundInterest,

    loan:
        loan,

    tip:
        tip,

    profitMargin:
        profit,

    bmi:
        bmi,

    age:
        age,

    dateDifference:
        dateDifference,

    length:
        lengthConverter,

    weight:
        weightConverter,

    temperature:
        temperatureConverter

};


document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-calculator-action]"
            );

        if (!button) {
            return;
        }

        const action =
            button.getAttribute(
                "data-calculator-action"
            );

        if (
            calculatorActions[action]
        ) {

            calculatorActions[action]();

        }

    }
);


/* =========================================================
   CALCULATOR SEARCH
   ========================================================= */

const calculatorSearch =
    document.getElementById(
        "calculatorSearch"
    );

const calculatorGrid =
    document.getElementById(
        "calculatorGrid"
    );

const noResults =
    document.getElementById(
        "noResults"
    );

const searchCalculatorBtn =
    document.getElementById(
        "searchCalculatorBtn"
    );


function filterCalculators() {

    if (
        !calculatorSearch ||
        !calculatorGrid
    ) {
        return;
    }

    const query =
        calculatorSearch.value
            .trim()
            .toLowerCase();

    const cards =
        calculatorGrid.querySelectorAll(
            ".tool-card"
        );

    let visible = 0;

    cards.forEach(function (card) {

        const text =
            (
                card.dataset.name ||
                ""
            ) +
            " " +
            card.textContent;

        const match =
            !query ||
            text.toLowerCase().includes(
                query
            );

        card.hidden = !match;

        if (match) {
            visible++;
        }

    });

    if (noResults) {

        noResults.hidden =
            visible !== 0;

    }

}


if (calculatorSearch) {

    calculatorSearch.addEventListener(
        "input",
        filterCalculators
    );

    calculatorSearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                filterCalculators();

            }

        }
    );

}


if (searchCalculatorBtn) {

    searchCalculatorBtn.addEventListener(
        "click",
        filterCalculators
    );

}


/* =========================================================
   FIREBASE GOOGLE SIGN-IN
   ========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyBMnXU1DIbEUDTgqQYFJh77SgbiaqVfdnM",

    authDomain:
        "fast-calculator--sign-up.firebaseapp.com",

    projectId:
        "fast-calculator--sign-up",

    storageBucket:
        "fast-calculator--sign-up.firebasestorage.app",

    messagingSenderId:
        "779031012907",

    appId:
        "1:779031012907:web:a1ad9301a552d44324ac6e",

    measurementId:
        "G-SVB7RJJPN5"

};


let firebaseAuth = null;


if (
    typeof firebase !== "undefined"
) {

    if (
        firebase.apps &&
        firebase.apps.length === 0
    ) {

        firebase.initializeApp(
            firebaseConfig
        );

    }

    if (firebase.auth) {

        firebaseAuth =
            firebase.auth();

    }

}


const signInBtn =
    document.getElementById(
        "signInBtn"
    );

const signUpBtn =
    document.getElementById(
        "signUpBtn"
    );

const authModal =
    document.getElementById(
        "authModal"
    );

const closeAuth =
    document.getElementById(
        "closeAuth"
    );

const googleSignInModal =
    document.getElementById(
        "googleSignInModal"
    );

const authMessage =
    document.getElementById(
        "authMessage"
    );


function openAuthModal() {

    if (!authModal) {
        return;
    }

    authModal.style.display =
        "flex";

    authModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeAuthModal() {

    if (!authModal) {
        return;
    }

    authModal.style.display =
        "none";

    authModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


async function signInWithGoogle() {

    if (!firebaseAuth) {

        if (authMessage) {

            authMessage.textContent =
                "Firebase Authentication is not available.";

        }

        return;
    }

    try {

        const provider =
            new firebase.auth.GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: "select_account"
        });

        const result =
            await firebaseAuth.signInWithPopup(
                provider
            );

        if (signInBtn) {

            signInBtn.textContent =
                result.user.displayName ||
                "Signed In";

        }

        closeAuthModal();

    } catch (error) {

        if (
            error.code ===
            "auth/popup-closed-by-user"
        ) {
            return;
        }

        if (
            error.code ===
            "auth/popup-blocked"
        ) {

            alert(
                "Google Sign-In popup was blocked. Please allow popups."
            );

            return;
        }

        if (
            error.code ===
            "auth/operation-not-allowed"
        ) {

            alert(
                "Google Sign-In is not enabled in Firebase."
            );

            return;
        }

        if (authMessage) {

            authMessage.textContent =
                "Google Sign-In failed: " +
                error.message;

        }

    }

}


if (signInBtn) {

    signInBtn.addEventListener(
        "click",
        signInWithGoogle
    );

}


if (signUpBtn) {

    signUpBtn.addEventListener(
        "click",
        openAuthModal
    );

}


if (googleSignInModal) {

    googleSignInModal.addEventListener(
        "click",
        signInWithGoogle
    );

}


if (closeAuth) {

    closeAuth.addEventListener(
        "click",
        closeAuthModal
    );

}


if (authModal) {

    authModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                authModal
            ) {

                closeAuthModal();

            }

        }
    );

}


if (firebaseAuth) {

    firebaseAuth.onAuthStateChanged(
        function (user) {

            if (!signInBtn) {
                return;
            }

            signInBtn.textContent =
                user
                    ? (
                        user.displayName ||
                        "Signed In"
                    )
                    : "Sign In";

        }
    );

}


/* =========================================================
   RESET CALCULATOR
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const resetButton =
            event.target.closest(
                "[data-reset-calculator]"
            );

        if (!resetButton) {
            return;
        }

        const target =
            resetButton.getAttribute(
                "data-reset-calculator"
            );

        const calculator =
            document.getElementById(
                target
            );

        if (!calculator) {
            return;
        }

        calculator
            .querySelectorAll("input")
            .forEach(function (input) {

                input.value =
                    input.defaultValue || "";

            });

        calculator
            .querySelectorAll("select")
            .forEach(function (select) {

                select.selectedIndex = 0;

            });

        calculator
            .querySelectorAll(".calc-result")
            .forEach(function (result) {

                result.textContent =
                    "Result will appear here.";

            });

    }
);


/* =========================================================
   GLOBAL API
   ========================================================= */

window.FastCalculator = {

    percentage,
    discount,
    average,
    simpleInterest,
    compoundInterest,
    loan,
    tip,
    profit,
    bmi,
    age,
    dateDifference,
    lengthConverter,
    weightConverter,
    temperatureConverter,

    addToCalculator,
    clearCalculator,
    deleteLast,
    calculateCalculator

};
