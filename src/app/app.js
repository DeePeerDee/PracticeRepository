import { JOURNAL, SCRIPTS } from "../constants/sandboxsources.mjs";

console.log("App has started!");

const exerciseFunction1 = function() {
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

const button1 = document.getElementById("submit-1");
const button2 = document.getElementById("submit-2");
const button3 = document.getElementById("submit-3");
const button4 = document.getElementById("submit-4");
const button5 = document.getElementById("submit-5");

window.addEventListener("keydown", customWindowFunction, false);
button1.addEventListener("click", exerciseFunction1, false);
button2.addEventListener("click", exerciseFunction2, false);
button3.addEventListener("click", exerciseFunction3, false);
button4.addEventListener("click", exerciseFunction4, false);
button5.addEventListener("click", exerciseFunction5, false);
