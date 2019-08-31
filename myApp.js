

const express = require('express'); 
const app = express(); 


//serve static files, e.g. style.css 
app.use(express.static('public'));

//display index page index.html @ "/"
app.get("/", function(req, res){
 res.sendFile(__dirname + '/views/index.html'); 
}); 

//listening port => localhost:3000/
const portNumber = process.env.PORT || 3000; 
app.listen(portNumber, function(req,res){
  console.log("listening on port "+ portNumber); 
});


app.get("/api/timestamp/:date_string?", function(req,res){
    let dateString = req.params.date_string; 
    console.log(dateString); 
    let date = new Date(dateString);
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() }); 

}); 
