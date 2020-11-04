const collectionContainer = document.getElementById("collection-container");

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
  console.log("DOMContentLoaded")
  testButton.addEventListener("click", testFunction)
  Generate.createCollectionTables()
});

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