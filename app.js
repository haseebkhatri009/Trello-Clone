let cardId = 0;

function allowDrop(ev) {
ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
ev.preventDefault();
const data = ev.dataTransfer.getData("text");
const card = document.getElementById(data);
const newList = ev.target.closest('.list-cards');
newList.appendChild(card);
}

function addCard(listId, inputId) {
const inputText = document.getElementById(inputId).value.trim();
if (inputText !== '') {
    const card = createCardElement(inputText);
    document.getElementById(listId).appendChild(card);
    document.getElementById(inputId).value = '';
}
}

function createCardElement(text) {
const card = document.createElement('div');
const cardIdAttr = `card-${cardId++}`;
card.id = cardIdAttr;
card.className = 'card';
card.draggable = true;
card.addEventListener('dragstart', drag);

card.innerHTML = `
    <div class="card-content">${text}</div>
;

return card;
}
