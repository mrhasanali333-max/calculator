/* =====================================================
   FAST CALCULATOR
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

        // Convert 50% to (50/100)
        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        // Allow calculator characters only
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

        if (display) {
            display.value = "Error";
        }

    }

}


/* =====================================================
   MOUSE BUTTONS
   ===================================================== */

const calculatorButtons =
    document.querySelectorAll(".buttons button");


calculatorButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const value =
                button.getAttribute("data-value");

            const action =
                button.getAttribute("data-action");


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

        }
    );

});


/* =====================================================
   KEYBOARD
   ONLY ONE KEYBOARD HANDLER
   ===================================================== */

document.onkeydown = function (event) {

    const key = event.key;


    // Numbers
    if (
        key >= "0" &&
        key <= "9"
    ) {

        event.preventDefault();

        addToCalculator(key);

        return;
    }


    // Operators
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


    // Enter
    if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();

        calculateCalculator();

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

        clearCalculator();

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
   INITIALIZE FIREBASE
   ===================================================== */

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



/* =====================================================
   AUTH BUTTONS
   ===================================================== */

const signInBtn =
    document.getElementById("signInBtn");

const signUpBtn =
    document.getElementById("signUpBtn");


/* =====================================================
   GOOGLE SIGN IN WITH FIREBASE
   ===================================================== */

if (signInBtn) {

    signInBtn.addEventListener(
        "click",
        async function () {

            console.log(
                "Sign In clicked"
            );


            if (!firebaseAuth) {

                alert(
                    "Firebase Authentication is not available."
                );

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


                // Update button
                signInBtn.textContent =
                    user.displayName || "Signed In";


                // Optional user data
                console.log(
                    "Name:",
                    user.displayName
                );

                console.log(
                    "Email:",
                    user.email
                );

                console.log(
                    "Photo:",
                    user.photoURL
                );


            } catch (error) {

                console.error(
                    "Google Sign In Error:",
                    error
                );


                if (
                    error.code ===
                    "auth/popup-closed-by-user"
                ) {

                    console.log(
                        "Google login popup was closed."
                    );

                    return;
                }


                if (
                    error.code ===
                    "auth/popup-blocked"
                ) {

                    alert(
                        "Google login popup was blocked by your browser. Please allow popups for this website."
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


                alert(
                    "Google Sign In failed: " +
                    error.message
                );

            }

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

            alert(
                "Sign Up will be connected next."
            );

        }
    );

}



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
