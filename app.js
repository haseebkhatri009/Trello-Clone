const main = document.querySelector("#main-div");
const addCardBtn = document.querySelector("#addCard");

let element = null;

const addTask = (event) => {
event.preventDefault();

const currentForm = event.target;
const value = currentForm.elements[0].value;
const parent = currentForm.parentElement;
const ticket = createTicket(value);

if (!value) return;

parent.insertBefore(ticket, currentForm);

const h3Value = parent.children[0].innerText;

if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
}

savedTasks[h3Value].push(value);

currentForm.reset();
};

const myCreateCard = (cardTitle) => {
const myDiv = document.createElement("div");
const myH3 = document.createElement("h3");
const myForm = document.createElement("form");
const myInput = document.createElement("input");
const nBtn = document.createElement("button");

nBtn.textContent = "Enter";
nBtn.setAttribute("class", "nBtn");

const h3Text = document.createTextNode(cardTitle);

myDiv.setAttribute("class", "column");
myInput.setAttribute("type", "text");
myInput.setAttribute("placeholder", "add task");

myH3.appendChild(h3Text);
myForm.appendChild(myInput);
myDiv.appendChild(myH3);
myDiv.appendChild(myForm);
myForm.appendChild(nBtn); 

myForm.addEventListener("submit", addTask);

myDiv.addEventListener("dragleave", (event) => event.preventDefault());
myDiv.addEventListener("dragover", (event) => event.preventDefault());

myDiv.addEventListener("drop", (event) => {
const dropper = event.target;

    if (dropper.className.includes("column")) {
        dropper.appendChild(element);
    }

    if (dropper.className.includes("ticket")) {
        dropper.parentElement.appendChild(element);
    }
});

return myDiv;
};

const createTicket = (value) => {
const ticket = document.createElement("div");
ticket.setAttribute("class", "ticket");

const todoText = document.createElement("span");
todoText.textContent = value;

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "delete";
deleteBtn.setAttribute("class", "delete-todo-btn");

deleteBtn.addEventListener("click", () => {
    const todoToDelete = deleteBtn.parentNode;
    todoToDelete.remove();

});

ticket.appendChild(todoText);
ticket.appendChild(deleteBtn);

ticket.setAttribute("draggable", "true");

ticket.addEventListener("mousedown", (event) => {
    element = event.target;
});

return ticket;
};

let savedTasks = JSON.parse(localStorage.getItem("saveTasks")) || {};

for (const title in savedTasks) {
    const card = myCreateCard(title);

    savedTasks[title].forEach((taskValue) => {
    const p = createTicket(taskValue);
    card.insertBefore(p, card.lastElementChild.previousSibling); // Insert before the form in card
});

    main.insertBefore(card, addCardBtn);
}

addCardBtn.addEventListener("click", () => {
    const cardTitle = prompt("Please Enter Card Name?");

    if (!cardTitle) return;   

    const yourDiv = myCreateCard(cardTitle);

main.insertBefore(yourDiv, addCardBtn);
});
