import { JOURNAL, SCRIPTS, ROADS, MAIL_ROUTE } from "../constants/sandboxsources.mjs";

console.log("App has started!");

let jsonResponse = null;

const exerciseFunction1 = function() {

  const response = fetch('http://localhost:8085/json')
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
    // document.getElementById("bodytitle").innerHTML = jsonResponse;
    console.log("JSON Response:", Object.keys(data).at(0));
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation");
    console.error(error);
  });
}


const exerciseFunction2 = function() {
  console.log("Exercise Function 2: Fetching XML data");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8085/xml", true);
  xhr.overrideMimeType("application/xml");

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("XML Response received from server");
      const xmlResponse = xhr.responseXML;

      console.log("XML Response Received!");
      console.log(xmlResponse);
    
      const messageElement = xmlResponse.getElementsByTagName("Message")[0].textContent;
      console.log("Message from XML:", messageElement);
    } else {
      throw new Error("Failed to fetch XML data: " + xhr.statusText);
    }
  }
e
  console.log("Exercise Function 2: Fetching XML data");
  xhr.send();
}

const exerciseFunction3 = function() {
  console.log("Exercise Function 3: Fetching PDF data");
  const response = fetch('http://localhost:8085/pdf')
  .then(response => {
    console.log("Response received from server for PDF");
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    return response.blob();
  })
  .then(blob => {
    console.log("Blob received from server");
    console.log(blob);

    const url = URL.createObjectURL(blob);

    const pdfFrame = document.getElementById("pdf");
    pdfFrame.src = url;
    
    pdfFrame.onload = function() {
      console.log("PDF loaded successfully in iframe");

      setTimeout(() => {
        pdfFrame.contentWindow.print();
        URL.revokeObjectURL(url);
      }, 1000); // Clear the iframe after 1 second
    }

  })
  .catch(error => {
    console.error("There was a problem with the fetch operation for PDF");
    console.error(error);
  });
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
