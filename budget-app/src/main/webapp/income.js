/** Fetches spendings from the server and adds them to the DOM. */
function loadExpenses(server, list) {
    fetch(server).then(response => response.json()).then((expenses) => {
      const listElement = document.getElementById(list);
      expenses.forEach((expense) => {
            listElement.appendChild(createIncomeElement(expense));
      })
    });
  }

function deleteIncome(income) {
    const params = new URLSearchParams();
    params.append('id', income.id);
    fetch('/delete-income', {method: 'POST', body: params});
}
  
/** Creates an element that represents a spending, including its delete button. */
function createIncomeElement(income) {
const incomeElement = document.createElement('li');
incomeElement.className = 'budget';

const titleElement = document.createElement('span');
titleElement.innerText = income.amount + "$";

const deleteButtonElement = document.createElement('button');
deleteButtonElement.innerText = 'Delete';
deleteButtonElement.addEventListener('click', () => {
    deleteIncome(income);

    // Remove the task from the DOM.
    incomeElement.remove();
});

incomeElement.appendChild(titleElement);
incomeElement.appendChild(deleteButtonElement);
return incomeElement;
}
