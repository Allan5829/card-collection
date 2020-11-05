const collectionContainer = document.getElementById("collection-container");
const newCardForm = document.getElementById("new-card-form"); 

const BACKEND_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded") //delete later

  Fetch.fetchCollectionIndex();
  Generate.addCardFormButton();

});

//use to delete cards ->  document.getElementById(`card-row-${card.name}`).parentElement.remove()

class Generate {

  static createCollectionTables(array) {
    let collNames = array.map(x => x.name)
    collNames.forEach(function(n){
      collectionContainer.innerHTML += `<table id="${n}"> </table>`
      Generate.addHeaderToTable(n);
    })
    Generate.addExistingCards(array);
  }

  static addHeaderToTable(value) {
    let table = document.getElementById(`${value}`);
    table.innerHTML += `<tr id="coll-row-${value}"> <th> ${value} </th> </tr>` 
  }

  static addExistingCards(array) {
    array.forEach(function(collection) {
      let set = document.getElementById(collection.name)
      collection.cards.forEach(card => set.innerHTML += `<tr id="card-row-${card.name}"> <td> ${card.name} </td> </tr>`)
    })
  }

  static addCardFormButton() {
    newCardForm.addEventListener("submit", function(event){
      event.preventDefault();
      console.log(document.getElementById("collection").value);

      //bottom code will be relocated
      let card = document.getElementById("card-name") //if card equals the value not the element 
                                  //then I can't change the value of the card to an empty string
      console.log(card.value);
      Generate.addCardToTable(card.value);
      card.value = ""
      //debugger
    })
  }

  static addCardToTable(card) { //to be relocated
    let table = document.getElementById("collection").value;
    document.getElementById(table).innerHTML += `<tr id="card-row-${card}"> <td> ${card} </td> </tr>`
  }

}

class Fetch {

  static fetchCollectionIndex() {
    fetch(`${BACKEND_URL}/collections`)
      .then(response => response.json())
      .then(collections => Generate.createCollectionTables(collections))
  }

}