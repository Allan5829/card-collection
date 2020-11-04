const collectionContainer = document.getElementById("collection-container");
const newCardForm = document.getElementById("new-card-form"); 

let testButton = document.getElementById("test-button") //delete
let test = ` 
            <tr> 
              <td> - indvidual card </td>
            </tr>
            ` //delete

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded") //delete

  Generate.createCollectionTables();
  Generate.addCardFormButton();
});

class Generate {

  static createCollectionTables() {
    // would fetch collection names
    let collNames = ["Not Listed", "Vivid Voltage", "Darkness Ablaze"]
    collNames.forEach(function(n){
      collectionContainer.innerHTML += `<table id="${n}"> </table>`
      Generate.addHeaderToTable(n);
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

  static addHeaderToTable(value) {
    let table = document.getElementById(`${value}`);
    table.innerHTML += `<tr> <th> ${value} </th> </tr>` 
  }

  static addCardToTable(card) { //to be relocated
    let table = document.getElementById("collection").value;
    document.getElementById(table).innerHTML += `<tr> <td> ${card} </td> </tr>`
  }

}