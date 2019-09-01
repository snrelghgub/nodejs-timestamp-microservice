const express = require('express');
const app = express();


//serve static files, e.g. style.css 
app.use(express.static('public'));


//display index page index.html @ "/"
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//listening port => localhost:3000/
const portNumber = process.env.PORT || 3000;
app.listen(portNumber, function (req, res) {
  console.log("listening on port " + portNumber);
});


app.get("/api/timestamp/:date_string?", function (req, res) {
  let dateString = req.params.date_string;

  let isValid = (dString) => {
    //if the string is undefined return true (dString==undefined)
    if (dString == undefined) {
      return undefined;
    }

    //checks the validity of date format required: YYYY-MM-DD
    let validDate = (dString) => {
      date = new Date(dString);
      if (date.toUTCString() != "Invalid Date") {
        return true;
      }
      else {
        return false;
      }
    }

    //checks the validbility of integer, 
    //if it is a valid timestamp integer or not 
    let validTimestamp = (dString) => {
      date = new Date(parseInt(dString));
      if (date.toUTCString() != "Invalid Date") {
        return true;
      }
      else {
        return false;
      }
    }

    //handle strings (non-numbers), if !isNaN(dString)==true 
    if (isNaN(dString) == true) {
      if (validDate(dString) == true) {  //if the string is valid date validDate(dString)==true
        return true;
      }
      else { //else, false (since it is a non-valid string)
        return false;
      }
    }

    //handle anything else, numbers, if !isNaN(dString)==true && validTimestamp(dString) == true 
    //return true otherwise false 
    if (!isNaN(dString) == true) {
      if (validTimestamp(dString) == true) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  //ex case: api/timestamp/test
  //ex case: api/timestamp/0901289802038102983091283
  if (isValid(dateString) == false) {
    res.json({ "error:": "Invalid Date" });
  }

  //ex case: api/timestamp/
  if (isValid(dateString) == undefined) {
    let date = new Date();
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  }

  //ex case: api/timestamp/2015-12-10
  if (isValid(dateString) == true) {
    let date = new Date(dateString);
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  }


}); 
