// Account number and pin pattern
const accountNumberPattern = /^[0-9]{6}$/;
const pinCodePattern = /^[0-9]{4}$/;

// Login Validation
document.querySelector('#buttonLogin').addEventListener('click', function(event) {
    event.preventDefault();
    const accountNumber = document.getElementById('accountNumber').value;
    const pinCode = document.getElementById('pinCode').value;
    const userName = document.getElementById('userName').value;

    if (accountNumberPattern.test(accountNumber) && pinCodePattern.test(pinCode)){
        alert("Welcome, " + userName);
        accountPortal(accountNumber, pinCode, userName);
    } else {
        alert("Please enter valid details.");
    }
});

// Account Portal

function accountPortal(accountNumber, pinCode, userName){
    document.getElementById('loginPortal').style = "display:none";
    document.getElementById('accountPortal').style = "display:block";

    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = `Welcome Back, ${userName}`;

    const h1Element = document.querySelector('#accountPortal h1');
    h1Element.insertAdjacentElement('afterend', welcomeMessage);

    let totalBalance = 2000.00;

    let totalBalanceParagraph = document.getElementById('totalBalance');

    totalBalanceParagraph.textContent = `Total balance: £${totalBalance.toFixed(2)}`;
}

// Deposit portal

document.querySelector('#buttonDeposit').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('accountPortal').style.display = 'none';
    document.getElementById('depositPortal').style.display = 'block';
});

document.querySelector('#depositPortal form').addEventListener('submit', function(event) {
    event.preventDefault();
    const depositAmount = document.querySelector('#depositPortal input[name="enterAmountForDeposit"]').value;
    deposit(depositAmount);
});

function deposit(amount) {
    
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount)) {
        alert('Please enter a valid deposit amount.');
        return;
    }

    let totalBalanceParagraph = document.querySelector('#accountPortal #totalBalance');
    let totalBalanceText = totalBalanceParagraph.textContent;
    let currentBalance = parseFloat(totalBalanceText.split('£')[1]); 

    let newBalance = currentBalance + depositAmount;

    totalBalanceParagraph.textContent = `Total balance: £${newBalance.toFixed(2)}`;

    document.getElementById('accountPortal').style.display = 'block';
    document.getElementById('depositPortal').style.display = 'none';
}

document.querySelector('#clearDepositAmount').addEventListener('click', function(event) {
    event.preventDefault();
    
    document.getElementById('enterAmountForDeposit').value = '';
});

// Withdraw portal

document.querySelector('#buttonWithdraw').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('accountPortal').style.display = 'none';
    document.getElementById('withdrawPortal').style.display = 'block';
});

document.querySelector('#withdrawPortal form').addEventListener('submit', function(event) {
    event.preventDefault();
    const withdrawAmount = document.querySelector('#withdrawPortal input[name="enterAmountForWithdraw"]').value;
    withdraw(withdrawAmount);
});

function withdraw(amount, userName) {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount)) {
        alert('Please enter a valid withdrawal amount.');
        return;
    }

    let totalBalanceParagraph = document.querySelector('#accountPortal #totalBalance');
    let totalBalanceText = totalBalanceParagraph.textContent;
    let currentBalance = parseFloat(totalBalanceText.split('£')[1]); 

    if (withdrawAmount > currentBalance) {
        alert('Insufficient funds. Please enter a smaller amount.');
        return;
    }

    let newBalance = currentBalance - withdrawAmount;

    totalBalanceParagraph.textContent = `Total balance: £${newBalance.toFixed(2)}`;

    document.getElementById('accountPortal').style.display = 'block';
    document.getElementById('withdrawPortal').style.display = 'none';
}

document.querySelector('#clearWithdrawAmount').addEventListener('click', function(event) {
    event.preventDefault();
    
    document.getElementById('enterAmountForWithdraw').value = '';
});

// Logout Button

document.querySelector('#buttonLogOut').addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('accountNumber').value = '';
    document.getElementById('pinCode').value = '';
    document.getElementById('userName').value = '';

    document.getElementById('loginPortal').style.display = 'block';
    document.getElementById('depositPortal').style.display = 'none';
    document.getElementById('withdrawPortal').style.display = 'none';
    document.getElementById('accountPortal').style.display = 'none';
});

// Show Pin Code

function showPinCode() {
    let x = document.getElementById("pinCode");
    if (x.type === "password") {
      x.type = "number";
    } else {
      x.type = "password";
    }
  }