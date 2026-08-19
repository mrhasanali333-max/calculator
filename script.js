/* =====================================================
   FAST CALCULATOR + FIREBASE AUTHENTICATION
   ===================================================== */


/* =====================================================
   FIREBASE CONFIG
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


/* =====================================================
   INITIALIZE FIREBASE
   ===================================================== */

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();


/* =====================================================
   CALCULATOR
   ===================================================== */

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

        /*
           Convert:
           50% → (50/100)
        */

        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );


        /*
           Only allow calculator characters
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


/* =====================================================
   KEYBOARD SUPPORT
   ===================================================== */

document.addEventListener("keydown", function(event) {

    const key = event.key;


    if (/^[0-9]$/.test(key)) {

        addToDisplay(key);

    }

    else if (
        ["+", "-", "*", "/", ".", "%", "(", ")"].includes(key)
    ) {

        addToDisplay(key);

    }

    else if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        deleteLast();

    }

    else if (key === "Escape") {

        clearDisplay();
    }

});


/* =====================================================
   AUTH MODAL
   ===================================================== */

function openAuth(type) {

    const modal = document.getElementById("authModal");

    const login = document.getElementById("loginForm");

    const signup = document.getElementById("signupForm");

    const message = document.getElementById("authMessage");


    if (!modal) {
        return;
    }


    modal.style.display = "flex";


    if (message) {
        message.textContent = "";
        message.style.color = "";
    }


    if (type === "signup") {

        login.style.display = "none";

        signup.style.display = "block";

    }

    else {

        login.style.display = "block";

        signup.style.display = "none";
    }
}


/* =====================================================
   CLOSE AUTH
   ===================================================== */

function closeAuth() {

    const modal = document.getElementById("authModal");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =====================================================
   SIGN UP
   ===================================================== */

function signupUser() {

    const nameElement =
        document.getElementById("signupName");

    const emailElement =
        document.getElementById("signupEmail");

    const passwordElement =
        document.getElementById("signupPassword");

    const message =
        document.getElementById("authMessage");


    const name = nameElement
        ? nameElement.value.trim()
        : "";

    const email = emailElement
        ? emailElement.value.trim()
        : "";

    const password = passwordElement
        ? passwordElement.value
        : "";


    /* Validation */

    if (!name || !email || !password) {

        message.textContent =
            "Please fill all fields.";

        message.style.color = "red";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        message.style.color = "red";

        return;
    }


    /* Disable button while creating account */

    const button =
        document.querySelector("#signupForm .auth-submit");

    if (button) {
        button.disabled = true;
        button.textContent = "Creating Account...";
    }


    /* Firebase Create Account */

    auth.createUserWithEmailAndPassword(
        email,
        password
    )

    .then(function(result) {

        return result.user.updateProfile({

            displayName: name

        });

    })

    .then(function() {

        message.textContent =
            "Account created successfully!";

        message.style.color = "green";


        if (button) {

            button.disabled = false;

            button.textContent =
                "Create Account";
        }


        /*
           Close after successful signup
        */

        setTimeout(function() {

            closeAuth();

        }, 1500);

    })

    .catch(function(error) {

        console.error(
            "Firebase Signup Error:",
            error
        );


        let errorMessage =
            "Unable to create account.";


        if (error.code === "auth/email-already-in-use") {

            errorMessage =
                "This email is already registered.";

        }

        else if (error.code === "auth/invalid-email") {

            errorMessage =
                "Please enter a valid email address.";

        }

        else if (error.code === "auth/weak-password") {

            errorMessage =
                "Password is too weak.";

        }

        else if (
            error.code ===
            "auth/api-key-not-valid"
        ) {

            errorMessage =
                "Firebase API key is invalid.";

        }

        else {

            errorMessage =
                error.message;
        }


        message.textContent =
            errorMessage;

        message.style.color = "red";


        if (button) {

            button.disabled = false;

            button.textContent =
                "Create Account";
        }

    });
}


/* =====================================================
   SIGN IN
   ===================================================== */

function loginUser() {

    const emailElement =
        document.getElementById("loginEmail");

    const passwordElement =
        document.getElementById("loginPassword");

    const message =
        document.getElementById("authMessage");


    const email = emailElement
        ? emailElement.value.trim()
        : "";

    const password = passwordElement
        ? passwordElement.value
        : "";


    if (!email || !password) {

        message.textContent =
            "Enter email and password.";

        message.style.color = "red";

        return;
    }


    const button =
        document.querySelector("#loginForm .auth-submit");


    if (button) {

        button.disabled = true;

        button.textContent =
            "Signing In...";
    }


    auth.signInWithEmailAndPassword(
        email,
        password
    )

    .then(function(result) {

        message.textContent =
            "Login successful!";

        message.style.color = "green";


        if (button) {

            button.disabled = false;

            button.textContent =
                "Sign In";
        }


        setTimeout(function() {

            closeAuth();

        }, 1000);

    })

    .catch(function(error) {

        console.error(
            "Firebase Login Error:",
            error
        );


        let errorMessage =
            "Unable to sign in.";


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            errorMessage =
                "Incorrect email or password.";

        }

        else if (
            error.code ===
            "auth/user-not-found"
        ) {

            errorMessage =
                "No account found with this email.";

        }

        else if (
            error.code ===
            "auth/wrong-password"
        ) {

            errorMessage =
                "Incorrect password.";

        }

        else {

            errorMessage =
                error.message;
        }


        message.textContent =
            errorMessage;

        message.style.color = "red";


        if (button) {

            button.disabled = false;

            button.textContent =
                "Sign In";
        }

    });
}


/* =====================================================
   LOGOUT
   ===================================================== */

function logoutUser() {

    auth.signOut()

    .then(function() {

        location.reload();

    })

    .catch(function(error) {

        console.error(
            "Logout Error:",
            error
        );

    });
}


/* =====================================================
   USER LOGIN STATUS
   ===================================================== */

auth.onAuthStateChanged(function(user) {

    const loginButton =
        document.querySelector(".login-btn");

    const signupButton =
        document.querySelector(".signup-btn");


    if (user) {

        console.log(
            "Logged in:",
            user.email
        );


        /*
           Sign In button becomes account name
        */

        if (loginButton) {

            loginButton.textContent =
                user.displayName ||
                user.email ||
                "My Account";

            loginButton.onclick = function() {

                alert(
                    "Signed in as: " +
                    user.email
                );

            };
        }


        /*
           Sign Up becomes Logout
        */

        if (signupButton) {

            signupButton.textContent =
                "Logout";

            signupButton.onclick =
                logoutUser;
        }

    }

    else {

        /*
           User is logged out
        */

        if (loginButton) {

            loginButton.textContent =
                "Sign In";

            loginButton.onclick =
                function() {

                    openAuth("login");

                };
        }


        if (signupButton) {

            signupButton.textContent =
                "Sign Up";

            signupButton.onclick =
                function() {

                    openAuth("signup");

                };
        }
    }

});


/* =====================================================
   INITIAL DISPLAY
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateDisplay();

    }
);
