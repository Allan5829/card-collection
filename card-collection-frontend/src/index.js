const collectionContainer = document.getElementById("collection-container");
const collectionOptions = document.getElementById("form-collection-options")
const newCardForm = document.getElementById("new-card-form"); 

const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
  Collection.fetchCollectionIndex();
  Generate.addCardFormButton();
});

class Collection {

  static fetchCollectionIndex() {
    fetch(`${BACKEND_URL}/collections`)
      .then(response => response.json())
      .then(collections => Collection.createCollectionTables(collections))
  }

  static createCollectionTables(array) {
    let collNames = array.map(x => x.name)
    collNames.forEach(x => {
      collectionContainer.innerHTML += `<table id="${x}"> </table>`
      collectionOptions.innerHTML += `<option id="form-collection-${x}" value="${x}">${x}</option>`
      Generate.addHeaderToTable(x);
    })
    Card.addExistingCards(array);
  }

}

class Card {

  static addExistingCards(array) {
    // for each collection, add some html with unique information for each card in a collection
    array.forEach( collection => {
      let set = document.getElementById(collection.name)
      collection.cards.forEach(card => { 
        set.innerHTML += `<tr id="card-row-${card.name}"> <td> <button id="${card.id}">X</button> ${card.name} </td> </tr>`
      })
    })
    Generate.addDeleteButtonToCards();
  }

  static fetchCardNew() {
    let newCard = {
      name: document.getElementById("card-name").value,
      collection_id: document.getElementById(`form-collection-${collectionOptions.value}`).index + 1
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newCard)
    };

    fetch(`${BACKEND_URL}/cards`, configObj)
      .then(response => response.json())
      .then(card => Card.addCardToTable(card))
  }

  static addCardToTable(card) {
    let table = document.getElementById(`${collectionOptions.value}`);
    table.innerHTML += `<tr id="card-row-${card.name}"> <td> <button id="${card.id}">X</button> ${card.name} </td> </tr>`
    let cardInput = document.getElementById("card-name")
    cardInput.value = ""
    Generate.addDeleteButtonToNewCard(`card-row-${card.name}`);
  }

  static deleteCard () {
    let card_id = this.id
    let cardData = document.getElementById(`${this.parentElement.parentElement.id}`)
    const configObj = {
      method: 'DELETE',
      headers: { 
          'Content-Type': 'application/json'
      }
    }

    fetch(`${BACKEND_URL}` + "/cards" + `/${card_id}`, configObj)
    .then( cardData.parentElement.remove())
    }

}

class Generate {

  static addHeaderToTable(value) {
    let table = document.getElementById(`${value}`);
    table.innerHTML += `<tr id="coll-row-${value}"> <th> ${value} </th> </tr>` 
  }

  static addCardFormButton() {
    newCardForm.addEventListener("submit", e => {
      e.preventDefault();
      Card.fetchCardNew();
    })
  }

  static addDeleteButtonToNewCard(id) {
    let cardRow = document.getElementById(id)
    cardRow.querySelector("button").addEventListener("click", Card.deleteCard)
  }

  static addDeleteButtonToCards() {
    let buttons = collectionContainer.querySelectorAll("button")
    for (let button of buttons) {
      button.addEventListener("click", Card.deleteCard)
    }
  }

}