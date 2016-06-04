function parseAfterLoaded() {
  var data = JSON.parse(event.target.responseText);   //get and parse JSON data file
  var newHTML = "";  //newHTML will be the final result added to the DOM

  //the following loops through every object in the JSON file, breaking each one down until it gets to its end value, then adds those key-value pairs to newHTML 
 for (var item in data) {
    newHTML += `<h3 class="firstLevel">${item}:</h3>`
  function breakDownJSON (y) {
    for (var x in y) {
      var newVar = y[x];
      if (newVar.constructor !== Array && newVar.constructor !== Object) {
        newHTML += `<p>${x}: ${newVar}</p>`;
      } else {
          breakDownJSON(newVar);
        }
    }
  } 
    breakDownJSON(data[item]);
  }
  //we define selectedDiv below
  selectedDiv.innerHTML += newHTML;
}

function executeThisIfXHRFails() {
  alert("Could not load the JSON file.")
}

//XHR request for dog food
var myRequest = new XMLHttpRequest();
myRequest.addEventListener('load', function(){
  selectedDiv = document.getElementById("dogFood");
});
myRequest.addEventListener("load", parseAfterLoaded);
myRequest.addEventListener("error", executeThisIfXHRFails);
myRequest.open("GET", "food.json");
myRequest.send();

//XHR request for cat food
var myCatRequest = new XMLHttpRequest();
myCatRequest.addEventListener('load', function(){
  selectedDiv = document.getElementById("catFood");
});
myCatRequest.addEventListener("load", parseAfterLoaded);
myCatRequest.addEventListener("error", executeThisIfXHRFails);
myCatRequest.open("GET", "catFood.json");
myCatRequest.send();