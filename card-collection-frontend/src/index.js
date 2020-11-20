const collectionContainer = document.getElementById("collection-container");
let collectionOptions
const newCardForm = document.getElementById("new-card-form"); 
const allCol = document.getElementById("allCol");
const allCard = document.getElementById("allCard");
const BACKEND_URL = 'http://localhost:3000';
let allCardArray

document.addEventListener("DOMContentLoaded", () => {
  Generate.buildNewCardForm();
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
    collectionContainer.innerHTML = ""
    let collNames = array.map(x => x.name)
    collNames.forEach(x => {
      collectionContainer.innerHTML += `<table id="${x}"> </table>`
      collectionOptions.innerHTML += `<option id="form-collection-${x}" value="${x}">${x}</option>`
    })
    Card.addExistingCards(array);
  }

}

class Card {

  // methods related to "View All Collections"
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
      name: Card.sanitize(document.getElementById("card-name").value),
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
    if (Card.checkForDublicate(table, newCard.name)) { 
      //if there is no dublicate card a new one is created
      fetch(`${BACKEND_URL}/cards`, configObj)
        .then(response => response.json())
        .then(card => Card.addCardToTable(card, table))
        .catch(error => {alert("You can't add a card with no name!");})
    } else {
      alert("You can't add a card to a collection that already has a card with that name!");
    }
    
  }

  static sanitize(string) {
    let newString = string.split(' ');
    for (let i = 0; i < newString.length; i++) {
        newString[i] = newString[i].replace(/[^A-Za-z0-9]/g, ''); 
    }
    return newString.join(' ');
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
    let cardData = this.parentElement.parentElement
    let table = cardData.parentElement.parentElement
    const configObj = {
      method: 'DELETE',
      headers: { 
          'Content-Type': 'application/json'
      }
    }

    // if the user is deleting the last card in the card's collection then the collection header will 
    //  also be removed
    if (table.rows.length === 2) { 
      // this checks for 2 rows because one is the header and the other is the last card
      table.rows[0].parentElement.remove()
    }

    fetch(`${BACKEND_URL}/cards` + `/${card_id}`, configObj)
    .then( cardData.parentElement.remove())
    };

    static checkForDublicate(table, name) {
      if (table.querySelector(`tr#card-row-${name}`)) {
        return false
      } else {
        return true 
      }
    }

    // methods related to "View All Cards"
    static fetchCardIndex() {
      fetch(`${BACKEND_URL}/cards`)
      .then(response => response.json())
      .then(cards => Card.createCards(cards))
    }

    static createCards(cards) {
      allCardArray = cards.map(x => {
        return new Card(x.name, x.collection.name, x.created_at)
      })
      Card.addOnlyCardsToTable(allCardArray);
    }

    constructor(cardName, setName, createdAt) {
      this.cardName = cardName;
      this.setName = setName;
      this.createdAt = createdAt;
    }

    static addOnlyCardsToTable(cards) {
      collectionContainer.innerHTML = ""
      collectionContainer.innerHTML += `<ul id="all-cards"> </ul>`
      let table = document.getElementById("all-cards");
      cards.forEach(card => { 
        table.innerHTML += `<li> - ${card.cardName} </li>`
      })
    }

    static filterSort(array) {
      let cardSort = newCardForm[0].value
      let cardFilter = newCardForm[1].value
      let newArray 

      // Filter
      if (cardFilter !== "none") {
        newArray = array.filter( x => {
          return x.setName === cardFilter
        })
      } else {
        newArray = array.slice(0);
      }

      // Sort
      if (cardSort === "oldest") {
        newArray = newArray.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      } else if (cardSort === "newest") {
        newArray = newArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (cardSort === "abc") {
        newArray = newArray.sort((a, b) => a.cardName.localeCompare(b.cardName))
      } else { // "zyx"
        newArray = newArray.sort((a, b) => b.cardName.localeCompare(a.cardName))
      }

      Card.addOnlyCardsToTable(newArray)
    }

}

class Generate {

  static buildNewCardForm() {
    newCardForm.innerHTML = ""
    newCardForm.innerHTML += `
      <label for="collections">What collection is the card from:</label>
      <select name="collection" id="form-collection-options">
      </select>
      
      <label for="card-name">Card name:</label>
      <input type="text" id="card-name" name="card-name">

      <button type="submit"> Add Card </button>
    `
    collectionOptions = document.getElementById("form-collection-options")

    newCardForm[2].addEventListener("click", e => {
      e.preventDefault();
      Card.fetchCardNew();
    })
  }

  static addEventsToButtons() {
    allCol.hidden = true;
    
    allCol.addEventListener("click", e => {
      allCol.hidden = true;
      allCard.hidden = false;
      Generate.buildNewCardForm();
      Collection.fetchCollectionIndex();
    })

    allCard.addEventListener("click", e => {
      allCard.hidden = true;
      allCol.hidden = false;
      Generate.buildSortFilterForm();
      Card.fetchCardIndex();
    })
  }

  static addDeleteButtonToNewCard(table) {
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

  static buildSortFilterForm() {
    newCardForm.innerHTML = ""
    newCardForm.innerHTML += `
      <label for="sort">Sort by:</label>
      <select id="sort-by" name="sort by">
        <option value="newest"> Newest card </option>
        <option value="oldest"> Oldest card </option>
        <option value="abc"> A-Z </option>
        <option value="zyx"> Z-A </option>
      </select>
      <label for="filter">Filter by collection:</label>
      <select id="filter" name="filter">
      </select>
      <button type="submit"> Apply </button>
      `

    let filterSelect = document.getElementById("filter");
    filterSelect.innerHTML += `<option value="none"> None </option>` + collectionOptions.innerHTML

    newCardForm[2].addEventListener("click", e => {
      e.preventDefault();
      Card.filterSort(allCardArray);
    })
  }

}