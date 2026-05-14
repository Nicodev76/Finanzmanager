function Dashboard() {
  const element = document.querySelector(".main_dashboard");
  const otherElements = document.querySelectorAll([".accounts_dashboard", ".transactions_dashboard", ".budgets_dashboard", ".reports_dashboard", ".settings_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}

function Accounts() {
  const element = document.querySelector(".accounts_dashboard");
  const otherElements = document.querySelectorAll([".main_dashboard", ".transactions_dashboard", ".budgets_dashboard", ".reports_dashboard", ".settings_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}

function Transactions() {
  const element = document.querySelector(".transactions_dashboard");
  const otherElements = document.querySelectorAll([".main_dashboard", ".accounts_dashboard", ".budgets_dashboard", ".reports_dashboard", ".settings_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}

function Budgets() {
  const element = document.querySelector(".budgets_dashboard");
  const otherElements = document.querySelectorAll([".main_dashboard", ".accounts_dashboard", ".transactions_dashboard", ".reports_dashboard", ".settings_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}

function Reports() {
  const element = document.querySelector(".reports_dashboard");
  const otherElements = document.querySelectorAll([".main_dashboard", ".accounts_dashboard", ".transactions_dashboard", ".budgets_dashboard", ".settings_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}

function Settings() {
  const element = document.querySelector(".settings_dashboard");
  const otherElements = document.querySelectorAll([".main_dashboard", ".accounts_dashboard", ".transactions_dashboard", ".budgets_dashboard", ".reports_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}
