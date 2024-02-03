document.addEventListener("DOMContentLoaded", () => {
  loadExpensesFromLocalStorage();
});

function addExpense() {
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  if (description && amount && category) {
    const expense = {
      description: description,
      amount: parseFloat(amount),
      category: category,
    };
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    loadExpensesFromLocalStorage();
  }
}

function editExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const selectedExpense = expenses[index];

  document.getElementById("description").value = selectedExpense.description;
  document.getElementById("amount").value = selectedExpense.amount;
  document.getElementById("category").value = selectedExpense.category;
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  loadExpensesFromLocalStorage();
}

function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  loadExpensesFromLocalStorage();
}

function loadExpensesFromLocalStorage() {
  const expensesList = document.getElementById("expensesList");
  expensesList.innerHTML = "";
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");
    expenseItem.innerHTML = `
            <strong>${expense.description}</strong> - ${expense.amount.toFixed(
      2
    )} - Category: ${expense.category}
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;

    expensesList.appendChild(expenseItem);
  });
}
