// Initialize variables
let balance = 0;
let depositHistory = JSON.parse(localStorage.getItem("depositHistory")) || [];
let withdrawalHistory = JSON.parse(localStorage.getItem("withdrawalHistory")) || [];
let kycVerified = localStorage.getItem("kycVerified") === "true";
let traderActive = localStorage.getItem("traderActive") === "true";

// Display initial values
document.getElementById("balance").textContent = balance;
document.getElementById("kyc-status").textContent = kycVerified ? "Verified" : "Unverified";
document.getElementById("trader-status").textContent = traderActive ? "Active" : "Inactive";

// Toggle KYC status
function toggleKYC() {
    kycVerified = !kycVerified;
    localStorage.setItem("kycVerified", kycVerified);
    document.getElementById("kyc-status").textContent = kycVerified ? "Verified" : "Unverified";
}

// Toggle Trader status
function toggleTrader() {
    traderActive = !traderActive;
    localStorage.setItem("traderActive", traderActive);
    document.getElementById("trader-status").textContent = traderActive ? "Active" : "Inactive";
}

// Show modal for deposit/withdrawal
function showModal(type) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-title").textContent = type === "deposit" ? "Deposit" : "Withdraw";
    document.getElementById("modal").dataset.type = type;
}

// Close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Submit deposit or withdrawal
function submitTransaction() {
    const type = document.getElementById("modal").dataset.type;
    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    
    if (type === "deposit") {
        balance += amount;
        depositHistory.push({ amount, date: new Date().toLocaleString() });
        localStorage.setItem("depositHistory", JSON.stringify(depositHistory));
    } else {
        if (amount > balance) {
            alert("Insufficient balance");
            return;
        }
        balance -= amount;
        withdrawalHistory.push({ amount, date: new Date().toLocaleString() });
        localStorage.setItem("withdrawalHistory", JSON.stringify(withdrawalHistory));
    }

    localStorage.setItem("balance", balance);
    document.getElementById("balance").textContent = balance.toFixed(2);
    document.getElementById("amount").value = "";
    closeModal();
}

// Show deposit or withdrawal history
function showHistory(type) {
    const history = type === "deposit" ? depositHistory : withdrawalHistory;
    document.getElementById("history-title").textContent = type === "deposit" ? "Deposit History" : "Withdrawal History";
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<li>No transactions found</li>";
    } else {
        history.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.date} - $${entry.amount.toFixed(2)}`;
            historyList.appendChild(listItem);
        });
    }
}

// Load balance from storage
function loadBalance() {
    balance = parseFloat(localStorage.getItem("balance")) || 0;
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// Initialize the dashboard
loadBalance();
