import { JOURNAL, SCRIPTS } from "./sandboxsources.mjs";

console.log("App has started!");

function speak(line) {
    console.log(Object.fromEntries(this));
    console.log(`The ${this.type} rabbit says '${line}'`);
}

const exerciseFunction1 = function() {
    console.log(Object.getPrototypeOf({}));
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

window.addEventListener("keydown", customWindowFunction, false);
button1.addEventListener("click", exerciseFunction1, false);
button2.addEventListener("click", exerciseFunction1, false);
button3.addEventListener("click", exerciseFunction1, false);
