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

        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

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

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (/^[0-9]$/.test(key)) {

        addToDisplay(key);

    } else if (
        ["+", "-", "*", "/", ".", "%", "(", ")"].includes(key)
    ) {

        addToDisplay(key);

    } else if (
        key === "Enter" ||
        key === "="
    ) {

        event.preventDefault();
        calculate();

    } else if (key === "Backspace") {

        deleteLast();

    } else if (key === "Escape") {

        clearDisplay();

    }

});


document.addEventListener("DOMContentLoaded", function() {
    updateDisplay();
});
/* =========================
   FIREBASE AUTH
========================= */

function openAuth(type) {

    const modal =
        document.getElementById("authModal");

    const login =
        document.getElementById("loginForm");

    const signup =
        document.getElementById("signupForm");

    const message =
        document.getElementById("authMessage");

    modal.style.display = "flex";

    message.textContent = "";

    if (type === "signup") {

        login.style.display = "none";
        signup.style.display = "block";

    } else {

        login.style.display = "block";
        signup.style.display = "none";
    }
}


function closeAuth() {

    document.getElementById("authModal")
        .style.display = "none";
}


/* =========================
   SIGN UP
========================= */

function signupUser() {

    const name =
        document.getElementById("signupName")
        .value.trim();

    const email =
        document.getElementById("signupEmail")
        .value.trim();

    const password =
        document.getElementById("signupPassword")
        .value;

    const message =
        document.getElementById("authMessage");


    if (!name || !email || !password) {

        message.textContent =
            "Please fill all fields.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    firebase.auth()
        .createUserWithEmailAndPassword(
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

        })

        .catch(function(error) {

            message.textContent =
                error.message;

        });
}


/* =========================
   SIGN IN
========================= */

function loginUser() {

    const email =
        document.getElementById("loginEmail")
        .value.trim();

    const password =
        document.getElementById("loginPassword")
        .value;

    const message =
        document.getElementById("authMessage");


    if (!email || !password) {

        message.textContent =
            "Enter email and password.";

        return;
    }


    firebase.auth()
        .signInWithEmailAndPassword(
            email,
            password
        )

        .then(function() {

            message.textContent =
                "Login successful!";

            setTimeout(function() {

                closeAuth();

            }, 800);

        })

        .catch(function(error) {

            message.textContent =
                error.message;

        });
}


/* =========================
   LOGOUT
========================= */

function logoutUser() {

    firebase.auth()
        .signOut()
        .then(function() {

            location.reload();

        });
}


/* =========================
   USER STATUS
========================= */

firebase.auth()
    .onAuthStateChanged(function(user) {

        const loginButton =
            document.querySelector(".login-btn");

        const signupButton =
            document.querySelector(".signup-btn");


        if (user) {

            if (loginButton) {

                loginButton.textContent =
                    user.displayName ||
                    "My Account";
            }


            if (signupButton) {

                signupButton.textContent =
                    "Logout";

                signupButton.onclick =
                    logoutUser;
            }

        }

    });
