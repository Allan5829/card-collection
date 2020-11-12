const collectionContainer = document.getElementById("collection-container");
const collectionOptions = document.getElementById("form-collection-options");
const newCardForm = document.getElementById("new-card-form"); 
const yesCol = document.getElementById("yesCol");
const noCol = document.getElementById("noCol");
const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
  Collection.fetchCollectionIndex();
  Generate.addEventsToButtons();
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
    })
    Card.addExistingCards(array);
  }

  static fetchCollectionShow(id) {
    fetch(`${BACKEND_URL}/collections` + `/${id}`)
    .then(response => response.json())
    .then(collection => Card.checkForDublicate(collection))
  }

}

class Card {

  static addExistingCards(array) {
    // for each collection, add some html with unique information for each card in a collection
    array.forEach( collection => {
      if (collection.cards.length === 0) {
        // will only create collection header and cards if there are any cards in the collection
      } else {
        let set = document.getElementById(collection.name);
        set.innerHTML += `<tr id="coll-row-${collection.name}"> <th> ${collection.name} </th> </tr>`
        collection.cards.forEach(card => { 
          set.innerHTML += `<tr id="card-row-${card.name}"> <td> <button id="${card.id}">X</button> ${card.name} </td> </tr>`
        })
      }
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

    let table = document.getElementById(collectionOptions.value);
    if (table === null) { 
      // would only ever be null if collections aren't displayed
      table = document.getElementById("all-cards")
    }
    if (Card.checkForDublicate(table, newCard.name)) { //if there is no dublicate card a new one is created
      fetch(`${BACKEND_URL}/cards`, configObj)
        .then(response => response.json())
        .then(card => Card.addCardToTable(card, table))
        .catch(error => {alert("You can't add a card with no name!");})
    } else {
      alert("You can't add a card to a collection that already has a card with that name!");
    }
    
  }

  static addCardToTable(card, table) {
    if (table.rows.length === 0) {
      // adds collection header if there isn't one currently present for this collection
      table.innerHTML += `<tr id="coll-row-${collectionOptions.value}"> <th> ${collectionOptions.value} </th> </tr>`
    }
    table.innerHTML += `<tr id="card-row-${card.name}"> <td> <button id="${card.id}">X</button> ${card.name} </td> </tr>`
    let cardInput = document.getElementById("card-name")
    cardInput.value = ""
    Generate.addDeleteButtonToNewCard(table);
  }

  static fetchCardDelete() {
    let card_id = this.id
    let cardData = document.getElementById(`${this.parentElement.parentElement.id}`)
    const configObj = {
      method: 'DELETE',
      headers: { 
          'Content-Type': 'application/json'
      }
    }

    // if the user is deleting the last card in the card's collection then the collection header will 
    //  also be removed
    let table = cardData.parentElement.parentElement;
    if (table.rows.length === 2) { 
      // this checks for 2 rows because one is the header and the other is the last card
      table.rows[0].parentElement.remove()
    }

    fetch(`${BACKEND_URL}/cards` + `/${card_id}`, configObj)
    .then( cardData.parentElement.remove())
    };

    static checkForDublicate(table, name) {
      let doesCardExist = document.getElementById(`card-row-${name}`)
      // add another if condition where if id="all-cards" then do a different condition with a fetch
      if (doesCardExist && table.id === doesCardExist.parentElement.parentElement.id) {
        return false
      } else {
        return true 
      }
    }

    static fetchCardIndex() {
      fetch(`${BACKEND_URL}/cards`)
      .then(response => response.json())
      .then(cards => Card.addOnlyCardsToTable(cards))
    }

    static addOnlyCardsToTable(cards) {
      collectionContainer.innerHTML += `<table id="all-cards"> </table>`
      let table = document.getElementById("all-cards");
      cards.forEach(card => { 
        table.innerHTML += `<tr id="card-row-${card.name}"> <td> <button id="${card.id}">X</button> ${card.name} </td> </tr>`
      })
      Generate.addDeleteButtonToCards();
    }

}

class Generate {

  static addEventsToButtons() {
    yesCol.disabled = true;
    noCol.disabled = false;

    newCardForm.addEventListener("submit", e => {
      e.preventDefault();
      Card.fetchCardNew();
    })
    
    yesCol.addEventListener("click", e => {
      yesCol.disabled = true;
      noCol.disabled = false;
      collectionContainer.innerHTML = ""
      collectionOptions.innerHTML = ""
      Collection.fetchCollectionIndex();
    })

    noCol.addEventListener("click", e => {
      noCol.disabled = true;
      yesCol.disabled = false;
      collectionContainer.innerHTML = ""
      Card.fetchCardIndex();
    })
  }

  static addDeleteButtonToNewCard(table) {
    //There was a bug with the commented code below. It is kept for the purposes of dublicating the error
    //  to see why it created the bug it did.

    // (`card-row-${card.name}`) = arguement(id)
    //let cardRow = document.getElementById(id)
    //cardRow.querySelector("button").addEventListener("click", Card.deleteCard)

    let buttons = table.querySelectorAll("button")
    for (let button of buttons) {
      button.addEventListener("click", Card.fetchCardDelete)
    }
  }

  static addDeleteButtonToCards() {
    let buttons = collectionContainer.querySelectorAll("button")
    for (let button of buttons) {
      button.addEventListener("click", Card.fetchCardDelete)
    }
  }

}