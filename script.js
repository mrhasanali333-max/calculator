/* =====================================================
   FAST CALCULATOR - MODERN WEBSITE SCRIPT
   Calculator + Keyboard + Firebase Google Sign-In
   ===================================================== */

"use strict";


/* =====================================================
   CALCULATOR
   ===================================================== */

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


        /* Convert percentage */

        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        /* Allow calculator characters only */

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

        console.error(
            "Calculator Error:",
            error
        );

        expression = "";

        if (display) {

            display.value = "Error";

            setTimeout(function () {

                updateDisplay();

            }, 900);

        }

    }

}


/* =====================================================
   MOUSE BUTTONS
   ===================================================== */

const calculatorButtons =
    document.querySelectorAll(
        ".buttons button"
    );


calculatorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const value =
                    button.getAttribute(
                        "data-value"
                    );

                const action =
                    button.getAttribute(
                        "data-action"
                    );


                /* Number / operator */

                if (value !== null) {

                    addToCalculator(value);

                    return;
                }


                /* Clear */

                if (action === "clear") {

                    clearCalculator();

                    return;
                }


                /* Delete */

                if (action === "delete") {

                    deleteLast();

                    return;
                }


                /* Equals */

                if (action === "calculate") {

                    calculateCalculator();

                    return;
                }

            }
        );

    }
);


/* =====================================================
   KEYBOARD SUPPORT
   ONLY ONE KEYBOARD HANDLER
   ===================================================== */

document.onkeydown = function (event) {

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

        return;
    }

};


/* =====================================================
   START CALCULATOR
   ===================================================== */

updateDisplay();


/* =====================================================
   FIREBASE CONFIG
   ===================================================== */

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


/* =====================================================
   FIREBASE INITIALIZATION
   ===================================================== */

let firebaseAuth = null;


if (
    typeof firebase !== "undefined" &&
    firebase.apps &&
    !firebase.apps.length
) {

    firebase.initializeApp(
        firebaseConfig
    );

}


if (
    typeof firebase !== "undefined" &&
    firebase.auth
) {

    firebaseAuth =
        firebase.auth();

}


/* =====================================================
   AUTH ELEMENTS
   ===================================================== */

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


/* =====================================================
   OPEN AUTH MODAL
   ===================================================== */

function openAuthModal() {

    if (!authModal) {
        return;
    }


    authModal.style.display = "flex";

    authModal.setAttribute(
        "aria-hidden",
        "false"
    );


    if (authMessage) {

        authMessage.textContent = "";

    }

}


/* =====================================================
   CLOSE AUTH MODAL
   ===================================================== */

function closeAuthModal() {

    if (!authModal) {
        return;
    }


    authModal.style.display = "none";

    authModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =====================================================
   GOOGLE SIGN IN
   ===================================================== */

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


        const user =
            result.user;


        console.log(
            "Google login successful:",
            user
        );


        if (authMessage) {

            authMessage.textContent =
                "Signed in successfully.";

        }


        closeAuthModal();


    } catch (error) {

        console.error(
            "Google Sign In Error:",
            error
        );


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
                "Google Sign-In popup was blocked. Please allow popups for this website."
            );

            return;
        }


        if (
            error.code ===
            "auth/operation-not-allowed"
        ) {

            alert(
                "Google Sign-In is not enabled in Firebase yet."
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


/* =====================================================
   SIGN IN BUTTON
   ===================================================== */

if (signInBtn) {

    signInBtn.addEventListener(
        "click",
        function () {

            signInWithGoogle();

        }
    );

}


/* =====================================================
   SIGN UP BUTTON
   ===================================================== */

if (signUpBtn) {

    signUpBtn.addEventListener(
        "click",
        function () {

            openAuthModal();

        }
    );

}


/* =====================================================
   GOOGLE BUTTON INSIDE MODAL
   ===================================================== */

if (googleSignInModal) {

    googleSignInModal.addEventListener(
        "click",
        function () {

            signInWithGoogle();

        }
    );

}


/* =====================================================
   CLOSE AUTH BUTTON
   ===================================================== */

if (closeAuth) {

    closeAuth.addEventListener(
        "click",
        function () {

            closeAuthModal();

        }
    );

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ===================================================== */

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


/* =====================================================
   ESCAPE CLOSES AUTH MODAL
   ===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            authModal &&
            authModal.style.display === "flex"
        ) {

            closeAuthModal();

        }

    }
);


/* =====================================================
   FIREBASE AUTH STATE
   ===================================================== */

if (firebaseAuth) {

    firebaseAuth.onAuthStateChanged(
        function (user) {

            if (user) {

                console.log(
                    "User is signed in:",
                    user.displayName
                );


                if (signInBtn) {

                    signInBtn.textContent =
                        user.displayName ||
                        "Signed In";

                }

            } else {

                console.log(
                    "No user is signed in."
                );


                if (signInBtn) {

                    signInBtn.textContent =
                        "Sign In";

                }

            }

        }
    );

}


/* =====================================================
   CALCULATOR SEARCH
   ===================================================== */

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


    let visibleCount = 0;


    cards.forEach(
        function (card) {

            const searchText =
                (
                    (card.dataset.name || "") +
                    " " +
                    card.textContent
                ).toLowerCase();


            const matches =
                !query ||
                searchText.includes(query);


            card.hidden =
                !matches;


            if (matches) {

                visibleCount++;

            }

        }
    );


    if (noResults) {

        noResults.hidden =
            visibleCount !== 0;

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


/* =====================================================
   FINISHED
   ===================================================== */
