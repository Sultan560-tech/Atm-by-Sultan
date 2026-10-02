/* =========================================
   PERSONAL ATM - JAVASCRIPT
   ========================================= */


/* =========================================
   LOAD SAVED DATA
   ========================================= */

let correctPIN = localStorage.getItem("atmPIN") || "1234";

let balance = Number(
    localStorage.getItem("atmBalance") || 0
);

let accountName =
    localStorage.getItem("atmName") || "Sultan";

let transactions =
    JSON.parse(
        localStorage.getItem("atmTransactions") || "[]"
    );


/* =========================================
   ELEMENTS
   ========================================= */

const loginCard =
    document.querySelector(".login-card");

const menuCard =
    document.querySelector(".menu-card");

const pinInput =
    document.querySelector(".input-group input");

const loginButton =
    document.querySelector(".login-btn");

const balanceDisplay =
    document.querySelector(".balance strong");

const welcomeText =
    document.querySelector(".welcome");


/* =========================================
   SAVE DATA
   ========================================= */

function saveData() {

    localStorage.setItem(
        "atmPIN",
        correctPIN
    );

    localStorage.setItem(
        "atmBalance",
        balance
    );

    localStorage.setItem(
        "atmName",
        accountName
    );

    localStorage.setItem(
        "atmTransactions",
        JSON.stringify(transactions)
    );
}


/* =========================================
   LOGIN
   ========================================= */

loginButton.addEventListener("click", function () {

    const enteredPIN = pinInput.value;

    if (enteredPIN.length !== 4) {

        alert("Please enter a 4-digit PIN.");

        return;
    }


    if (enteredPIN === correctPIN) {

        alert("Login successful!");

        loginCard.style.display = "none";

        menuCard.style.display = "block";

        welcomeText.textContent =
            "Welcome, " + accountName;

        updateBalance();

    } else {

        alert("Incorrect PIN.");

        pinInput.value = "";

        pinInput.focus();
    }

});


/* =========================================
   ENTER KEY LOGIN
   ========================================= */

pinInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            loginButton.click();

        }

    }
);


/* =========================================
   UPDATE BALANCE
   ========================================= */

function updateBalance() {

    balanceDisplay.textContent =
        "₹ " + balance.toLocaleString("en-IN");

}


/* =========================================
   CHECK BALANCE
   ========================================= */

document
.querySelector(".balance-btn")
.addEventListener("click", function () {

    alert(
        "Your current balance is ₹" +
        balance.toLocaleString("en-IN")
    );

});


/* =========================================
   DEPOSIT MONEY
   ========================================= */

document
.querySelector(".deposit-btn")
.addEventListener("click", function () {

    const amount =
        prompt("Enter amount to deposit:");

    if (amount === null) {

        return;
    }

    const money = Number(amount);

    if (!Number.isFinite(money) || money <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    balance += money;


    transactions.push(
        "Deposited ₹" +
        money.toLocaleString("en-IN")
    );


    saveData();

    updateBalance();


    alert(
        "Deposit successful!\n\n" +
        "New Balance: ₹" +
        balance.toLocaleString("en-IN")
    );

});


/* =========================================
   WITHDRAW MONEY
   ========================================= */

document
.querySelector(".withdraw-btn")
.addEventListener("click", function () {

    const amount =
        prompt("Enter amount to withdraw:");

    if (amount === null) {

        return;
    }

    const money = Number(amount);


    if (!Number.isFinite(money) || money <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    if (money > balance) {

        alert(
            "Insufficient balance!\n\n" +
            "Available Balance: ₹" +
            balance.toLocaleString("en-IN")
        );

        return;
    }


    balance -= money;


    transactions.push(
        "Withdrawn ₹" +
        money.toLocaleString("en-IN")
    );


    saveData();

    updateBalance();


    alert(
        "Withdrawal successful!\n\n" +
        "New Balance: ₹" +
        balance.toLocaleString("en-IN")
    );

});


/* =========================================
   ACCOUNT INFORMATION
   ========================================= */

document
.querySelector(".account-btn")
.addEventListener("click", function () {

    alert(
        "ACCOUNT INFORMATION\n\n" +
        "Account Holder: " +
        accountName +
        "\n" +
        "Current Balance: ₹" +
        balance.toLocaleString("en-IN") +
        "\n" +
        "PIN: Protected"
    );

});


/* =========================================
   TRANSACTION HISTORY
   ========================================= */

document
.querySelector(".history-btn")
.addEventListener("click", function () {

    if (transactions.length === 0) {

        alert("No transactions yet.");

        return;
    }


    alert(
        "TRANSACTION HISTORY\n\n" +
        transactions.join("\n")
    );

});


/* =========================================
   CHANGE PIN
   ========================================= */

document
.querySelector(".pin-btn")
.addEventListener("click", function () {

    const currentPIN =
        prompt("Enter your current PIN:");

    if (currentPIN === null) {

        return;
    }


    if (currentPIN !== correctPIN) {

        alert("Current PIN is incorrect.");

        return;
    }


    const newPIN =
        prompt("Enter your new 4-digit PIN:");

    if (newPIN === null) {

        return;
    }


    if (!/^\d{4}$/.test(newPIN)) {

        alert(
            "PIN must contain exactly 4 digits."
        );

        return;
    }


    const confirmPIN =
        prompt("Confirm your new PIN:");

    if (confirmPIN !== newPIN) {

        alert("PINs did not match.");

        return;
    }


    correctPIN = newPIN;

    saveData();


    alert(
        "PIN changed successfully!"
    );

});


/* =========================================
   EXIT
   ========================================= */

document
.querySelector(".exit-btn")
.addEventListener("click", function () {

    const confirmExit =
        confirm(
            "Are you sure you want to exit?"
        );


    if (confirmExit) {

        menuCard.style.display = "none";

        loginCard.style.display = "flex";

        pinInput.value = "";

        alert(
            "Session closed safely."
        );

    }

});


/* =========================================
   INITIAL BALANCE DISPLAY
   ========================================= */

updateBalance();