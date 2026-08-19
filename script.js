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
// =====================================================
// GOOGLE SIGN IN
// =====================================================

const GOOGLE_CLIENT_ID =
    "726205497784-riu677s1uur4tuqa25dherc9ncnklvou.apps.googleusercontent.com";


// =====================================================
// GOOGLE LOGIN CALLBACK
// =====================================================

function handleGoogleLogin(response) {

    console.log("Google login callback received");

    if (!response || !response.credential) {
        console.error("Google credential missing");
        return;
    }

    const user = parseGoogleJwt(response.credential);

    if (!user) {
        console.error("Could not read Google account data");
        return;
    }

    console.log("Logged in user:", user);

    localStorage.setItem(
        "googleUser",
        JSON.stringify({
            name: user.name || "",
            email: user.email || "",
            picture: user.picture || "",
            sub: user.sub || ""
        })
    );

    updateGoogleUserUI(user);
}


// =====================================================
// DECODE GOOGLE USER
// =====================================================

function parseGoogleJwt(token) {

    try {

        const payload = token.split(".")[1];

        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (char) {

                    return "%" +
                        ("00" + char.charCodeAt(0).toString(16))
                        .slice(-2);

                })
                .join("")
        );

        return JSON.parse(jsonPayload);

    } catch (error) {

        console.error(
            "Google token decode error:",
            error
        );

        return null;
    }
}


// =====================================================
// SHOW USER
// =====================================================

function updateGoogleUserUI(user) {

    const signInBtn =
        document.getElementById("signInBtn");

    if (!signInBtn) {
        return;
    }

    signInBtn.textContent =
        user.name || "Signed In";

    signInBtn.classList.add("google-logged-in");

}


// =====================================================
// GOOGLE LOGOUT
// =====================================================

function googleLogout() {

    localStorage.removeItem("googleUser");

    const signInBtn =
        document.getElementById("signInBtn");

    if (signInBtn) {

        signInBtn.textContent = "Sign In";

        signInBtn.classList.remove(
            "google-logged-in"
        );
    }

    if (
        window.google &&
        google.accounts &&
        google.accounts.id
    ) {

        google.accounts.id.disableAutoSelect();

    }
}


// =====================================================
// INITIALIZE GOOGLE
// =====================================================

function initializeGoogle() {

    if (
        !window.google ||
        !google.accounts ||
        !google.accounts.id
    ) {

        console.error(
            "Google Identity Services is not loaded."
        );

        return false;
    }


    const googleButton =
        document.getElementById(
            "google-signin-button"
        );


    if (!googleButton) {

        console.error(
            "Hidden Google button not found."
        );

        return false;
    }


    google.accounts.id.initialize({

        client_id: GOOGLE_CLIENT_ID,

        callback: handleGoogleLogin,

        auto_select: false,

        cancel_on_tap_outside: false

    });


    // Render Google's official button
    google.accounts.id.renderButton(

        googleButton,

        {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            width: 250
        }

    );


    console.log("Google initialized");

    return true;
}


// =====================================================
// CLICK YOUR OWN SIGN IN BUTTON
// =====================================================

function startGoogleLogin() {

    console.log("Sign In button clicked");


    if (
        !window.google ||
        !google.accounts ||
        !google.accounts.id
    ) {

        alert(
            "Google Sign In is not loaded. Please refresh the page and try again."
        );

        return;
    }


    // Direct Google One Tap / account chooser
    google.accounts.id.prompt(
        function (notification) {

            console.log(
                "Google prompt:",
                notification
            );

        }
    );

}


// =====================================================
// PAGE LOAD
// =====================================================

window.addEventListener(
    "load",
    function () {

        // Wait for Google's library
        const timer =
            setInterval(
                function () {

                    if (
                        window.google &&
                        google.accounts &&
                        google.accounts.id
                    ) {

                        clearInterval(timer);

                        initializeGoogle();

                        loadSavedGoogleUser();

                    }

                },
                100
            );

    }
);


// =====================================================
// EXISTING USER
// =====================================================

function loadSavedGoogleUser() {

    const savedUser =
        localStorage.getItem("googleUser");


    if (!savedUser) {
        return;
    }


    try {

        const user =
            JSON.parse(savedUser);

        updateGoogleUserUI(user);

    } catch (error) {

        localStorage.removeItem(
            "googleUser"
        );

    }
}


// =====================================================
// CONNECT YOUR SIGN IN BUTTON
// =====================================================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target &&
            event.target.id === "signInBtn"
        ) {

            startGoogleLogin();

        }

    }
);
