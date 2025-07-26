import { JOURNAL, SCRIPTS, ROADS, MAIL_ROUTE } from "../constants/sandboxsources.mjs";

console.log("App has started!");

let jsonResponse = null;
const exerciseFunction1 = function() {

  const response = fetch('http://localhost:8085')
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  })
  .then(data => {
    console.log("Data received from server");
    console.log(data);

    jsonResponse = data.message;
    console.log(data.message);
    document.getElementById("bodytitle").innerHTML = jsonResponse;
    console.log("JSON Response:", Object.keys(data).at(0));
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation");
    console.error(error);
  });
}

const exerciseFunction2 = function() {
}

const exerciseFunction3 = function() {
}

const exerciseFunction4 = function() {
}

const exerciseFunction5 = function() {
}

const customWindowFunction = function(e) {
  if (e.keyCode === 32) {
      // ASCII 32 for SPACE key
      exerciseFunction1();
  } else if (e.keyCode === 13) {
      // ASCII 13 for ENTER key
      exerciseFunction1();
  } else if (e.keyCode === 27) {
      window.location.reload();
  }
}

// Define document element mapping
const button1 = document.getElementById("submit-1");
const button2 = document.getElementById("submit-2");
const button3 = document.getElementById("submit-3");
const button4 = document.getElementById("submit-4");
const button5 = document.getElementById("submit-5");

// Add event listeners (one (1) for the window keydown event, five (5) for each button)
window.addEventListener("keydown", customWindowFunction, false);
button1.addEventListener("click", exerciseFunction1, false);
button2.addEventListener("click", exerciseFunction2, false);
button3.addEventListener("click", exerciseFunction3, false);
button4.addEventListener("click", exerciseFunction4, false);
button5.addEventListener("click", exerciseFunction5, false);
