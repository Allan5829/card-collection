const collectionContainer = document.getElementById("collection-container");

let notListedTable = document.getElementById("not-listed");
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
});

function testFunction() {
  console.log("do I see this?")
  notListedTable.innerHTML += test
}