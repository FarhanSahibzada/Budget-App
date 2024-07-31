//variables input
let budgetinp = document.querySelector(".inp1");
let produectinp = document.querySelector(".inp2");
let priceinp = document.querySelector(".inp3");
let editmain = document.querySelector(".editmain");
let editname = document.querySelector("#editname");
let editprice = document.querySelector("#editprice");
let currenttindex;

//variables show balance
let buds = document.getElementById("bud");
let exp = document.getElementById("exp");
let bal = document.getElementById("bal");
let todo = document.getElementById("todo");
// variables btna
let btn2 = document.querySelector(".btn2");
let obj = JSON.parse(localStorage.getItem("list")) || [];
//functions

function bud() {
    let budgett = budgetinp.value;
    if (budgett) {
        let obj = {
            budget: parseFloat(budgett),
            balance: parseFloat(budgett)
        }
        localStorage.setItem("bud", JSON.stringify(obj));
    }
    let b = JSON.parse(localStorage.getItem("bud"));
    if (b) {
        buds.innerHTML = b.budget;
        bal.innerHTML = b.balance;
    }
    budgetinp.value = "";
    budgetinp.disabled = true;
}

let newbud = () => {
    budgetinp.disabled = false;
}

let createexp = () => {
    if (priceinp.value && priceinp.value) {
        let currentExp = parseFloat(exp.innerHTML);
        let newitem = {
            name: produectinp.value,
            price: parseFloat(priceinp.value) || "0",
        };
        obj.push(newitem);
        localStorage.setItem("list", JSON.stringify(obj));
        // exp
        let expense = {
            exp: currentExp + parseFloat(priceinp.value) || "0",
        };
        localStorage.setItem("exp", JSON.stringify(expense));
        
        // let  e = a.reduce((acc,item)=>{acc + item.price});
        // new balance
        let newBalance = parseFloat(bal.innerHTML) - newitem.price;
        bal.innerHTML = newBalance;
        let b = JSON.parse(localStorage.getItem("bud"));
        b.balance = newBalance;
        localStorage.setItem("bud", JSON.stringify(b));
        gettodos();
        priceinp.value = "";
        produectinp.value = "";
    } else {
        btn2.classList.add("error");
        setTimeout(() => {
            btn2.classList.remove("error");
        }, 700);
    }

}

function gettodos() {
    todo.innerHTML = "";
    let da = JSON.parse(localStorage.getItem("exp")) || {};
    exp.innerHTML = da.exp ||"0";
    let key = JSON.parse(localStorage.getItem("list")) || [];
    for (let i of key) {
        if (i) {
            todo.innerHTML += ` <li class="task">
            <span class="text2">${i.name}</span>
                 <span class="price" id="price">${i.price}</span>
                 <button class="edit" onclick="edit(this)" id="edit">Edit</button>
                 <i class="fa-solid fa-trash" id="${i.name}" onclick="del(this)" style="color: #FFD43B;"></i></li>`
                }
    }
}

let del = function (e) {
    // list del
    let item = e.id;
    let data = JSON.parse(localStorage.getItem("list"));
    let remove = data.find(val => val.name == item);
    data = data.filter(val => val.name !== item);
    localStorage.setItem("list", JSON.stringify(data));
    // exp update
    let da = JSON.parse(localStorage.getItem("exp"));
    da.exp =  parseFloat(da.exp) - remove.price;
     localStorage.setItem("exp",JSON.stringify(da));
    // bal update
    let newBalance = parseFloat(bal.innerHTML) + remove.price;
    bal.innerHTML = newBalance;
    let bus = JSON.parse(localStorage.getItem("bud"));
    bus.balance = newBalance;
    localStorage.setItem("bud", JSON.stringify(bus));
    gettodos();
}

let edit = (e) => {
    editmain.style.display = "block";
    requestAnimationFrame(() => {
        editmain.classList.add('show');
    });

    let element = e.closest(".task");
    let text2Content = element.querySelector(".text2").textContent;
    let priceContent = element.querySelector(".price").textContent;

    // Populate the edit fields with the current values for editing
    editname.value = text2Content;
    editprice.value = priceContent;
    currenttindex = Array.from(document.querySelectorAll(".task")).indexOf(element);
  
    document.body.classList.add('dim-background');
}

function save() {
    let data = JSON.parse(localStorage.getItem("list"));
    if (editname.value || editprice.value) {
        data[currenttindex].name = editname.value || "unknown";
        data[currenttindex].price = parseFloat(editprice.value) || "0";
        localStorage.setItem("list", JSON.stringify(data));
    }
    document.body.classList.remove('dim-background');
    editmain.style.display = "none";
    gettodos();

}
document.addEventListener("DOMContentLoaded", () => {
    gettodos();
    bud();
});



// // Variables input
// let budgetinp = document.querySelector(".inp1");
// let produectinp = document.querySelector(".inp2");
// let priceinp = document.querySelector(".inp3");
// let editmain = document.querySelector(".editmain");
// let editname = document.querySelector("#editname");
// let editprice = document.querySelector("#editprice");
// let currenttindex;

// // Variables show balance
// let buds = document.getElementById("bud");
// let exp = document.getElementById("exp");
// let bal = document.getElementById("bal");
// let todo = document.getElementById("todo");

// // Variables btna
// let btn2 = document.querySelector(".btn2");
// let obj = JSON.parse(localStorage.getItem("list")) || [];

// // Functions

// function bud() {
//     let budgett = budgetinp.value;
//     if (budgett) {
//         let obj = {
//             budget: parseFloat(budgett),
//             balance: parseFloat(budgett)
//         };
//         localStorage.setItem("bud", JSON.stringify(obj));
//     }
//     let b = JSON.parse(localStorage.getItem("bud"));
//     if (b) {
//         buds.innerHTML = b.budget;
//         bal.innerHTML = b.balance;
//     }
//     budgetinp.value = "";
//     budgetinp.disabled = true;
// }

// let newbud = () => {
//     budgetinp.disabled = false;
// };

// let createexp = () => {
//     if (priceinp.value && produectinp.value) {
//         let currentExp = parseFloat(exp.innerHTML) || 0;
//         let newitem = {
//             name: produectinp.value,
//             price: parseFloat(priceinp.value) || 0,
//             expense: currentExp + parseFloat(priceinp.value) || 0
//         };
//         obj.push(newitem);
//         localStorage.setItem("list", JSON.stringify(obj));
//         let a = JSON.parse(localStorage.getItem("list")) || [];
//         let e = a.reduce((acc, item) => acc + item.price, 0);
//         exp.innerHTML = e;

//         // New balance
//         let newBalance = parseFloat(bal.innerHTML) - newitem.price;
//         bal.innerHTML = newBalance;
//         let b = JSON.parse(localStorage.getItem("bud"));
//         b.balance = newBalance;
//         localStorage.setItem("bud", JSON.stringify(b));
//         gettodos();
//         priceinp.value = "";
//         produectinp.value = "";
//     } else {
//         btn2.classList.add("error");
//         setTimeout(() => {
//             btn2.classList.remove("error");
//         }, 700);
//     }
// };

// function gettodos() {
//     todo.innerHTML = "";
//     let key = JSON.parse(localStorage.getItem("list")) || [];
//     for (let i of key) {
//         if (i) {
//             todo.innerHTML += `<li class="task">
//                 <span class="text2">${i.name}</span>
//                 <span class="price" id="price">${i.price}</span>
//                 <button class="edit" onclick="edit(this)" id="edit">Edit</button>
//                 <i class="fa-solid fa-trash" id="${i.name}" onclick="del(this)" style="color: #FFD43B;"></i>
//             </li>`;
//         }
//     }
// }

// let del = function(e) {
//     // List del
//     let item = e.id;
//     let data = JSON.parse(localStorage.getItem("list"));
//     let remove = data.find(val => val.name == item);
//     data = data.filter(val => val.name !== item);
//     localStorage.setItem("list", JSON.stringify(data));

//     // Update expense
//     let totalExpense = data.reduce((acc, val) => acc + val.price, 0);
//     exp.innerHTML = totalExpense;
//     localStorage.setItem("expense", JSON.stringify(totalExpense));

//     // Update balance
//     let newBalance = parseFloat(bal.innerHTML) + remove.price;
//     bal.innerHTML = newBalance;
//     let bus = JSON.parse(localStorage.getItem("bud"));
//     bus.balance = newBalance;
//     localStorage.setItem("bud", JSON.stringify(bus));
//     gettodos();
// };

// let edit = (e) => {
//     editmain.style.display = "block";
//     requestAnimationFrame(() => {
//         editmain.classList.add('show');
//     });

//     let element = e.closest(".task");
//     let text2Content = element.querySelector(".text2").textContent;
//     let priceContent = element.querySelector(".price").textContent;

//     // Populate the edit fields with the current values for editing
//     editname.value = text2Content;
//     editprice.value = priceContent;
//     currenttindex = Array.from(document.querySelectorAll(".task")).indexOf(element);
// };

// function save() {
//     let data = JSON.parse(localStorage.getItem("list"));
//     if (editname.value || editprice.value) {
//         data[currenttindex].name = editname.value || "unknown";
//         data[currenttindex].price = parseFloat(editprice.value) || "0";
//         localStorage.setItem("list", JSON.stringify(data));
//     }
//     editmain.style.display = "none";
//     gettodos();
// }

// document.addEventListener("DOMContentLoaded", () => {
//     gettodos();
//     let storedBudget = JSON.parse(localStorage.getItem("bud"));
//     if (storedBudget) {
//         buds.innerHTML = storedBudget.budget;
//         bal.innerHTML = storedBudget.balance;
//     }
// });
