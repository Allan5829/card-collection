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
    collNames.forEach(n => collectionContainer.innerHTML += `<table id="${n}"> </table>`)
  }

  static addCardFormButton() {
    newCardForm.addEventListener("submit", function(event){
      event.preventDefault();
      console.log(document.getElementById("collection").value);
      Generate.addHeaderToTable(document.getElementById("collection").value);
    })
  }

  static addHeaderToTable(value) { //temporary because will only occur if collection has no cards
    let table = document.getElementById(`${value}`);
    table.innerHTML += `<tr> <th> ${value} </th> </tr>` 
  }

}