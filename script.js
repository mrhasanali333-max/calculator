/* =====================================================
   FAST CALCULATOR
   ===================================================== */


/* =====================================================
   FIREBASE
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


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const auth = firebase.auth();


/* =====================================================
   CALCULATOR VARIABLES
   ===================================================== */

let expression = "";

const display = document.getElementById("display");


/* =====================================================
   DISPLAY
   ===================================================== */

function updateDisplay() {

    display.value = expression || "0";

}


/* =====================================================
   ADD VALUE
   ===================================================== */

function addValue(value) {

    expression += value;

    updateDisplay();

}


/* =====================================================
   CLEAR
   ===================================================== */

function clearCalculator() {

    expression = "";

    updateDisplay();

}


/* =====================================================
   DELETE
   ===================================================== */

function deleteLast() {

    expression = expression.slice(0, -1);

    updateDisplay();

}


/* =====================================================
   CALCULATE
   ===================================================== */

function calculateResult() {

    if (!expression) {
        return;
    }


    try {

        let calculation = expression;


        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        if (
            !/^[0-9+\-*/().%\s]+$/.test(
                calculation
            )
        ) {

            throw new Error("Invalid calculation");

        }


        const result = Function(
            '"use strict"; return (' +
            calculation +
            ')'
        )();


        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error("Invalid result");

        }


        expression = String(
            Number(
                result.toFixed(12)
            )
        );


        updateDisplay();


    } catch (error) {

        expression = "";

        display.value = "Error";

    }

}


/* =====================================================
   MOUSE CALCULATOR BUTTONS
   ===================================================== */

document
    .querySelectorAll(".buttons button")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const value =
                    button.dataset.value;

                const action =
                    button.dataset.action;


                if (value !== undefined) {

                    addValue(value);

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

                    calculateResult();

                }

            }
        );

    });


/* =====================================================
   KEYBOARD
   IMPORTANT:
   ONLY ONE KEYBOARD LISTENER
   ===================================================== */

document.onkeydown = function(event) {

    const key = event.key;


    /* Numbers */

    if (
        key >= "0" &&
        key <= "9"
    ) {

        event.preventDefault();

        addValue(key);

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

        addValue(key);

        return;

    }


    /* Enter */

    if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();

        calculateResult();

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


/* =====================================================
   AUTH ELEMENTS
   ===================================================== */

const authModal =
    document.getElementById("authModal");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const authMessage =
    document.getElementById("authMessage");


const loginButton =
    document.getElementById("loginButton");

const signupButton =
    document.getElementById("signupButton");

const closeAuth =
    document.getElementById("closeAuth");


/* =====================================================
   AUTH MESSAGE
   ===================================================== */

function showMessage(
    message,
    success = false
) {

    authMessage.textContent =
        message;

    authMessage.style.color =
        success ? "green" : "red";

}


/* =====================================================
   OPEN LOGIN
   ===================================================== */

function openLogin() {

    authModal.style.display =
        "flex";

    loginForm.style.display =
        "block";

    signupForm.style.display =
        "none";

    authMessage.textContent = "";

}


/* =====================================================
   OPEN SIGNUP
   ===================================================== */

function openSignup() {

    authModal.style.display =
        "flex";

    loginForm.style.display =
        "none";

    signupForm.style.display =
        "block";

    authMessage.textContent = "";

}


/* =====================================================
   CLOSE AUTH
   ===================================================== */

function closeAuthentication() {

    authModal.style.display =
        "none";

    authMessage.textContent = "";

}


/* =====================================================
   BUTTON EVENTS
   ===================================================== */

loginButton.addEventListener(
    "click",
    openLogin
);


signupButton.addEventListener(
    "click",
    openSignup
);


closeAuth.addEventListener(
    "click",
    closeAuthentication
);


document
    .getElementById("showSignup")
    .addEventListener(
        "click",
        openSignup
    );


document
    .getElementById("showLogin")
    .addEventListener(
        "click",
        openLogin
    );


/* =====================================================
   SIGN UP
   ===================================================== */

document
    .getElementById("signupSubmit")
    .addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            if (!name || !email || !password) {

                showMessage(
                    "Please fill all fields."
                );

                return;

            }


            if (password.length < 6) {

                showMessage(
                    "Password must be at least 6 characters."
                );

                return;

            }


            showMessage(
                "Creating account...",
                true
            );


            auth
                .createUserWithEmailAndPassword(
                    email,
                    password
                )

                .then(function(result) {

                    return result.user
                        .updateProfile({

                            displayName:
                                name

                        });

                })

                .then(function() {

                    showMessage(
                        "Account created successfully!",
                        true
                    );


                    setTimeout(
                        closeAuthentication,
                        1200
                    );

                })

                .catch(function(error) {

                    console.error(error);


                    showMessage(
                        firebaseError(error)
                    );

                });

        }
    );


/* =====================================================
   LOGIN
   ===================================================== */

document
    .getElementById("loginSubmit")
    .addEventListener(
        "click",
        function() {

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            if (!email || !password) {

                showMessage(
                    "Enter email and password."
                );

                return;

            }


            showMessage(
                "Signing in...",
                true
            );


            auth
                .signInWithEmailAndPassword(
                    email,
                    password
                )

                .then(function() {

                    showMessage(
                        "Login successful!",
                        true
                    );


                    setTimeout(
                        closeAuthentication,
                        1000
                    );

                })

                .catch(function(error) {

                    console.error(error);


                    showMessage(
                        firebaseError(error)
                    );

                });

        }
    );


/* =====================================================
   FORGOT PASSWORD
   ===================================================== */

document
    .getElementById("forgotPassword")
    .addEventListener(
        "click",
        function() {

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            if (!email) {

                showMessage(
                    "Enter your email first."
                );

                return;

            }


            auth
                .sendPasswordResetEmail(
                    email
                )

                .then(function() {

                    showMessage(
                        "Password reset email sent.",
                        true
                    );

                })

                .catch(function(error) {

                    showMessage(
                        firebaseError(error)
                    );

                });

        }
    );


/* =====================================================
   FIREBASE ERROR
   ===================================================== */

function firebaseError(error) {

    switch (error.code) {

        case "auth/email-already-in-use":

            return "This email is already registered.";


        case "auth/invalid-email":

            return "Invalid email address.";


        case "auth/weak-password":

            return "Password must be at least 6 characters.";


        case "auth/invalid-credential":

            return "Incorrect email or password.";


        case "auth/user-not-found":

            return "No account found with this email.";


        case "auth/wrong-password":

            return "Incorrect password.";


        case "auth/api-key-not-valid":

            return "Firebase API key is invalid.";


        default:

            return error.message ||
                   "Something went wrong.";

    }

}


/* =====================================================
   USER LOGIN STATUS
   ===================================================== */

auth.onAuthStateChanged(
    function(user) {

        if (user) {

            loginButton.textContent =
                user.displayName ||
                "My Account";


            signupButton.textContent =
                "Logout";


            signupButton.onclick =
                function() {

                    auth.signOut();

                };


        } else {

            loginButton.textContent =
                "Sign In";


            signupButton.textContent =
                "Sign Up";


            signupButton.onclick =
                openSignup;

        }

    }
);


/* =====================================================
   INITIAL DISPLAY
   ===================================================== */

updateDisplay();
