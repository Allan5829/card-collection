const collectionContainer = document.getElementById("collection-container");
const newCardForm = document.getElementById("new-card-form"); 

let notListedTable = document.getElementById("not-listed"); //delete
let testButton = document.getElementById("test-button")
let test = `
            <tr>
              <th> Not Listed </th>
            </tr>

            <tr> 
              <td> - indvidual card </td>
            </tr>
            `

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded") //delete
  testButton.addEventListener("click", testFunction) //delete
  
  newCardForm.addEventListener("submit", function(event){
    event.preventDefault();
    testSubmit(event);
  })

  Generate.createCollectionTables()
});

function testSubmit(e) {
  console.log(e);
}

function testFunction() { //delete
  console.log("do I see this?")
  notListedTable.innerHTML += test
}

class Generate {

  static createCollectionTables() {
    // would fetch collection names
    let collNames = ["Not Listed", "Vivid Voltage", "Darkness Ablaze"]
    collNames.forEach(n => collectionContainer.innerHTML += `<table id="${n}"> </table>`)
  }

}