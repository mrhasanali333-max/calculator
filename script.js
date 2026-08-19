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
// ============================================
// GOOGLE SIGN IN
// ============================================

const GOOGLE_CLIENT_ID =
    "726205497784-riu677s1uur4tuqa25dherc9ncnklvou.apps.googleusercontent.com";


// ============================================
// GOOGLE LOGIN CALLBACK
// ============================================

function handleGoogleLogin(response) {

    console.log("Google Login Successful");

    const credential = response.credential;

    const user = parseGoogleJwt(credential);

    if (!user) {
        console.error("Unable to read Google user.");
        return;
    }

    console.log("Google User:", user);

    // Save user
    localStorage.setItem(
        "googleUser",
        JSON.stringify({
            name: user.name || "",
            email: user.email || "",
            picture: user.picture || "",
            sub: user.sub || ""
        })
    );

    showGoogleUser(user);
}


// ============================================
// READ GOOGLE USER DATA
// ============================================

function parseGoogleJwt(token) {

    try {

        const base64Url = token.split(".")[1];

        const base64 = base64Url
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
            "Google JWT Error:",
            error
        );

        return null;
    }
}


// ============================================
// SHOW USER
// ============================================

function showGoogleUser(user) {

    const loginButton =
        document.getElementById(
            "google-signin-button"
        );

    const userInfo =
        document.getElementById(
            "google-user-info"
        );

    const userName =
        document.getElementById(
            "google-user-name"
        );

    const userEmail =
        document.getElementById(
            "google-user-email"
        );

    const userPicture =
        document.getElementById(
            "google-user-picture"
        );


    if (loginButton) {
        loginButton.style.display = "none";
    }


    if (userInfo) {

        userInfo.style.display = "flex";

        userInfo.style.alignItems = "center";

        userInfo.style.gap = "10px";
    }


    if (userName) {
        userName.textContent =
            user.name || "Google User";
    }


    if (userEmail) {
        userEmail.textContent =
            user.email || "";
    }


    if (userPicture) {
        userPicture.src =
            user.picture || "";
    }
}


// ============================================
// LOGOUT
// ============================================

function googleLogout() {

    localStorage.removeItem("googleUser");

    const loginButton =
        document.getElementById(
            "google-signin-button"
        );

    const userInfo =
        document.getElementById(
            "google-user-info"
        );


    if (userInfo) {
        userInfo.style.display = "none";
    }


    if (loginButton) {
        loginButton.style.display = "block";
    }


    if (
        window.google &&
        google.accounts &&
        google.accounts.id
    ) {

        google.accounts.id.disableAutoSelect();

    }

    console.log("Google Logout");
}


// ============================================
// INITIALIZE GOOGLE
// ============================================

function initializeGoogleLogin() {

    if (
        !window.google ||
        !google.accounts ||
        !google.accounts.id
    ) {

        console.error(
            "Google Identity Services not loaded."
        );

        return;
    }


    const button =
        document.getElementById(
            "google-signin-button"
        );


    if (!button) {

        console.error(
            "google-signin-button not found."
        );

        return;
    }


    google.accounts.id.initialize({

        client_id: GOOGLE_CLIENT_ID,

        callback: handleGoogleLogin,

        auto_select: false,

        use_fedcm_for_prompt: true

    });


    google.accounts.id.renderButton(

        button,

        {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: 300
        }

    );
}


// ============================================
// PAGE LOAD
// ============================================

window.addEventListener(
    "load",
    function () {

        const timer =
            setInterval(function () {

                if (
                    window.google &&
                    google.accounts &&
                    google.accounts.id
                ) {

                    clearInterval(timer);

                    initializeGoogleLogin();

                    checkExistingGoogleUser();

                }

            }, 100);

    }
);


// ============================================
// CHECK EXISTING USER
// ============================================

function checkExistingGoogleUser() {

    const savedUser =
        localStorage.getItem("googleUser");


    if (!savedUser) {
        return;
    }


    try {

        const user =
            JSON.parse(savedUser);

        showGoogleUser(user);

    } catch (error) {

        localStorage.removeItem("googleUser");

    }
}


// ============================================
// LOGOUT BUTTON
// ============================================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target &&
            event.target.id ===
                "google-logout-button"
        ) {

            googleLogout();

        }

    }
);
