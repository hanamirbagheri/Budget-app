const buttonHeading = document.querySelector(".selected");
const optionsContainer = document.querySelector(".option-container");

const optionList = document.querySelectorAll(".option");

buttonHeading.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

// Loop through each option, if click on one then put it on heading
optionList.forEach( o => {
    o.addEventListener("click", () => {
        buttonHeading.innerText = o.querySelector("label").innerText;
        // Remove active state after choosing a type
        optionsContainer.classList.remove("active");
    })
})

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".selected")) {
      var dropdowns = document.getElementsByClassName("option-container");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("active")) {
          openDropdown.classList.remove("active");
        }
      }
    }
  };


/** Fetches spendings from the server and adds them to the DOM. */
function loadExpenses(server, list) {
    fetch(server).then(response => response.json()).then((expenses) => {
      const listElement = document.getElementById(list);
      expenses.forEach((expense) => {
          if (listElement == 'spending-list'){
            listElement.appendChild(createSpendingElement(expense));
          } else {
            listElement.appendChild(createBudgetElement(expense));
          }
      })
    });
  }
  
  /** Creates an element that represents a spending, including its delete button. */
  function createSpendingElement(spending) {
    const spendingElement = document.createElement('li');
    spendingElement.className = 'budget';
  
    const titleElement = document.createElement('span');
    titleElement.innerText = spending.type + " - " + spending.amount + "$";
  
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
      deleteSpending(spending);
  
      // Remove the task from the DOM.
      spendingElement.remove();
    });
  
    spendingElement.appendChild(titleElement);
    spendingElement.appendChild(deleteButtonElement);
    return spendingElement;
  }
  
  /** Tells the server to delete the spending. */
  function deleteSpending(spending) {
    const params = new URLSearchParams();
    params.append('id', spending.id);
    fetch('/delete-spending', {method: 'POST', body: params});
  }

  function deleteBudget(budget) {
    const params = new URLSearchParams();
    params.append('id', budget.id);
    fetch('/delete-budget', {method: 'POST', body: params});
  }
  
  /** Creates an element that represents a spending, including its delete button. */
  function createBudgetElement(budget) {
    const budgetElement = document.createElement('li');
    budgetElement.className = 'budget';
  
    const titleElement = document.createElement('span');
    titleElement.innerText = budget.type + " - " + budget.amount + "$";
  
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
        deleteBudget(budget);
  
      // Remove the task from the DOM.
      budgetElement.remove();
    });
  
    budgetElement.appendChild(titleElement);
    budgetElement.appendChild(deleteButtonElement);
    return budgetElement;
  }