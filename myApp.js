

const express = require('express'); 
const app = express(); 


//serve static files, e.g. style.css 
app.use(express.static(__dirname + 'public'));

//display index page index.html @ "/"
app.get("/", function(req, res){
 res.sendFile(__dirname + '/views/index.html'); 
}); 

//listening port => localhost:3000/
app.listen("3000", function(req,res){
  console.log("listening on port 3000"); 
});