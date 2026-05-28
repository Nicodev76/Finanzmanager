function Dashboard() {
  const element = document.querySelector(".main_dashboard");
  const otherElements = document.querySelectorAll([".transactions_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}

function Transactions() {
  const element = document.querySelector(".transactions_dashboard");
  const otherElements = document.querySelectorAll([".main_dashboard"]);

  element.style.display = "flex";

  for (let i = 0; i < otherElements.length; i++) {
    otherElements[i].style.display = "none";
  }
}
