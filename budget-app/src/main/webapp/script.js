
function calculateExpense(type, server, display) {

    fetch(server).then(res => res.json()).then((expenses) => {
        var count = 0;
        expenses.forEach((expense) => {
            if (expense.type == type){
                count += parseFloat(expense.amount);
            }
        })
        const finalCount = document.getElementById(display);
        finalCount.value = count + "$";
    })
}

function calculateIncome(){
    fetch("/list-income").then(res => res.json()).then((incomes) => {
        var count = 0;
        console.log(incomes)
        incomes.forEach((income) => {
            count += parseFloat(income.amount);
        })
        const income = document.getElementById("income-display");
       income.value = count + "$";
    })
}



function displayData(){
    const select = document.getElementById("select");
    const type = select.value;
    calculateExpense(type, "/list-spendings", "spending-display");
    calculateExpense(type, "/list-budgets", "budget-display");
    calculateIncome();

}

