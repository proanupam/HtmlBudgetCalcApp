let incomeInput;
let budgetAmt;
let emergencyFund;
let availableMoney

let itemNameInput;
let itemPriceInput;

let expensesSection = document.querySelector(".money-spent");

let savingText = document.querySelector(".moneySaved");

const totalExp = document.getElementById("totalExpRup");

let itemObj = {
    name: "",
    quantity: "",
    price: "",
    total:"",
}

let itemArray = [];

let expensesArray = [];

let arrayOfPrices = [];

let totalExpensesAmount;

let allotedBudgetAmount = document.querySelector(".budgetAlloted");

let sumOfExpenses;
console.log(sumOfExpenses);

const addItemButton = document.querySelector("#add-item-Button");
addItemButton.addEventListener('click', addItemFunc);

const emergencyBtn = document.querySelector("#emergency-button");

emergencyBtn.addEventListener('click', addEmergencyAmtFunc);

let incomeAvailable = document.getElementById("incomeEntered");

let addIncomeBtn = document.querySelector("#add-income-button");

addIncomeBtn.addEventListener('click', inputIncomeFunc);

let setBudgetBtn = document.querySelector("#set-budget-button");
setBudgetBtn.addEventListener('click', setBudgetFunc);


function inputIncomeFunc(){
    incomeInput = parseFloat(document.getElementById("income-input").value);
    document.getElementById("incomeEntered").textContent = incomeInput.toFixed(2);
    document.getElementById("income-input").value = "";
}

function addEmergencyAmtFunc(){
    emergencyFund = parseInt(document.querySelector("#emergency-input").value);
    document.querySelector("#emergencyEntered").textContent = emergencyFund;
}

function setBudgetFunc(){
    availableMoney = incomeInput - emergencyFund;
    budgetAmt = parseFloat(document.querySelector("#add-budget-input").value);
    if(budgetAmt >= availableMoney){
        alert("short of money");
        return;
    }
    document.querySelector("#budgetEntered").textContent = budgetAmt;
    document.querySelector(".budgetAlloted").textContent = budgetAmt;
}


function addItemFunc(){
    let itemNameText = document.querySelector("#expense-item").value;
    let itemPriceText = document.querySelector("#expense-cost").value;
    let itemQuantityText = 1;
    let itemTotalPrice = parseInt(itemQuantityText) * parseInt(itemPriceText);

    let listItem = document.querySelector(".expenses-list-item");

    let item1 = {};
    item1.name = itemNameText;
    item1.quantity = itemQuantityText;
    item1.price = itemPriceText;
    item1.totalPrice = itemTotalPrice;

    if(itemArray.length == 0){
        listItem.classList.remove('hidden');
        
        itemArray.push(item1);

        listItem.querySelector(".item-name").textContent = item1.name;
        listItem.querySelector("#itemQty").textContent = item1.quantity;
        listItem.querySelector("#itemSingle").textContent = item1.price;
        listItem.querySelector("#itemTotal").textContent = item1.totalPrice;
        listItem.setAttribute('id', 'expenses-list-item-'+itemArray.length);
        
        deleteItemButton = listItem.querySelector(".deleteItemBtn");
        incrementButton = listItem.querySelector(".increBtn");
        decrementButton = listItem.querySelector(".decreBtn");
        
        deleteItemButton.setAttribute('id', 'delItemBtn-'+itemArray.length);
        incrementButton.setAttribute('id', 'increBtn-'+itemArray.length);
        decrementButton.setAttribute('id', 'decreBtn-'+itemArray.length);
        expensesArray.push(parseInt(item1.totalPrice));



        sumOfExpenses = expensesArray.reduce(function (x,y){
            return x + y;
        },0);

        totalExp.textContent = parseInt(sumOfExpenses);
        arrayOfPrices.push(item1.totalPrice);
        console.log("Sum of expenses: " + sumOfExpenses);
        console.log("Array of prices= "+ arrayOfPrices);
        document.querySelector("#expense-item").value = "";
        document.querySelector("#expense-cost").value = 0;
       


    }else{
        newListItem = document.querySelector(".expenses-list-item").cloneNode(true);
        newListItem.classList.remove(".hidden");
        itemArray.push(item1);

        newListItem.querySelector(".item-name").textContent = item1.name;
        newListItem.querySelector("#itemQty").textContent = item1.quantity;
        newListItem.querySelector("#itemSingle").textContent = item1.price;
        newListItem.querySelector("#itemTotal").textContent = item1.totalPrice;
        newListItem.setAttribute('id', 'expenses-list-item-'+itemArray.length);
        
        deleteItemButton = newListItem.querySelector(".deleteItemBtn");
        incrementButton = newListItem.querySelector(".increBtn");
        decrementButton = newListItem.querySelector(".decreBtn");
        
        deleteItemButton.setAttribute('id', 'delItemBtn-'+itemArray.length);
        incrementButton.setAttribute('id', 'increBtn-'+itemArray.length);
        decrementButton.setAttribute('id', 'decreBtn-'+itemArray.length);

        document.querySelector(".expenses-list").appendChild(newListItem);
        expensesArray.push(parseInt(item1.totalPrice));
        sumOfExpenses = expensesArray.reduce(function (x,y){
            return x + y;
        },0);
        totalExp.textContent = sumOfExpenses;
        arrayOfPrices.push(item1.totalPrice);
        console.log(arrayOfPrices);
        document.querySelector("#expense-item").value = "";
        document.querySelector("#expense-cost").value = 0;
      

    }
        console.log(itemArray);
        x = itemArray.reduce((accumulator, currentItem) => {
            return accumulator + parseInt(currentItem.totalPrice);
        },0);
        totalExp.textContent = x;

        expensesSection.textContent = totalExp.textContent;
        budgetInt = parseInt(allotedBudgetAmount.textContent);
        expensesInt = parseInt(totalExp.textContent);
        console.log(budgetInt - expensesInt);
        savingText.textContent = budgetInt - expensesInt;
}

function deleteItemFunc(id){
    let foo = document.getElementById(id).parentNode.parentNode;
    console.log(foo);
    let deletedItemName = foo.querySelector(".item-name").textContent;
    console.log(deletedItemName);
    document.querySelector(".expenses-list").removeChild(foo);
    deleteItemFromArray(deletedItemName);
    console.log(itemArray);
}

function incrementItemQuantityFunc(id){
    // debugger;
    let bar = document.getElementById(id).parentNode.parentNode;
    let i = parseInt(bar.querySelector("#itemQty").textContent);
    bar.querySelector("#itemQty").textContent = i+1;
    let baz = parseInt(bar.querySelector("#itemSingle").textContent);
    bar.querySelector("#itemTotal").textContent = baz * bar.querySelector("#itemQty").textContent;
    updateArray(bar);
    console.log(itemArray);
    
}

function decrementItemQuantityFunc(id){
    let bar = document.getElementById(id).parentNode.parentNode;
    let i = parseInt(bar.querySelector("#itemQty").textContent);
    if(i <= 0){
        return;
    }
    bar.querySelector("#itemQty").textContent = i-1;
    let baz = parseInt(bar.querySelector("#itemSingle").textContent);
    bar.querySelector("#itemTotal").textContent = baz * bar.querySelector("#itemQty").textContent;
    updateArray(bar);
    console.log(itemArray);
}

function deleteItemFromArray(itemName){
    itemArray = itemArray.filter((item) => item.name != itemName);
    
}

function updateArray(item){
    let foo = item;
    console.log(foo);
    let searchName = foo.querySelector(".item-name").textContent;
    let foundItem = itemArray.find(product => product.name === searchName);
    foundItem.quantity = foo.querySelector("#itemQty").textContent;
    foundItem.totalPrice = foo.querySelector("#itemTotal").textContent;

    let boo = 0;
    boo = itemArray.reduce((accumulator,grocery) => {
        return accumulator + parseInt(grocery.totalPrice);
    },0)
    totalExp.textContent  = boo;
    expensesSection.textContent = totalExp.textContent;
    console.log(boo);
    savingText.textContent = allotedBudgetAmount.textContent - expensesSection.textContent;
}