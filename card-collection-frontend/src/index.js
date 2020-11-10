const collectionContainer = document.getElementById("collection-container");
const collectionOptions = document.getElementById("form-collection-options")
const newCardForm = document.getElementById("new-card-form"); 

const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded") //delete later

  Collection.fetchCollectionIndex();
  Generate.addCardFormButton();

});

//use to delete cards ->  document.getElementById(`card-row-${card.name}`).parentElement.remove()

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
      collectionOptions.innerHTML += `<option value="${x}">${x}</option>`
      Generate.addHeaderToTable(x);
    })
    Card.addExistingCards(array);
  }

}

class Card {

  static addExistingCards(array) {
    // for each collection, add some html with unique information for each card in a collection
    array.forEach(function(collection) {
      let set = document.getElementById(collection.name)
      collection.cards.forEach(card => { 
        set.innerHTML += `<tr id="card-row-${card.name}"> <td> ${card.name} </td> </tr>`
      })
    })
  }

  static addCardToTable(card) { //to be relocated
    let table = collectionOptions.value;
    document.getElementById(table).innerHTML += `<tr id="card-row-${card}"> <td> ${card} </td> </tr>`
  }

}

class Generate {

  static addHeaderToTable(value) {
    let table = document.getElementById(`${value}`);
    table.innerHTML += `<tr id="coll-row-${value}"> <th> ${value} </th> </tr>` 
  }

  static addCardFormButton() {
    newCardForm.addEventListener("submit", function(event){
      event.preventDefault();
      console.log(collectionOptions.value);

      //bottom code will be relocated
      let card = document.getElementById("card-name") //if card equals the value not the element 
                                  //then I can't change the value of the card to an empty string
      console.log(card.value);
      Card.addCardToTable(card.value);
      card.value = ""
      //debugger
    })
  }

}