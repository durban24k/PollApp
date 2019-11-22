const express = require('express');
const app = express();

const server = app.listen(1000, function(){
    console.log("Listening to requests on port 1000....");
});

//Static files in the public folder
app.use(express.static('public'));