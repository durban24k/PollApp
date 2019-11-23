const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1000;
const jsonParser = bodyParser.json();
const utils = require('./public/scripts/utils');
try {
    require('console-stamp')(console, 'HH:MM:ss.l');
} catch(ignore) {}

let jsonObj = {
    id: "UUID",
    question: "This is a test question",
    responces: {
        "Yellow": ["1", "2"],
        "Red": ["3"]
    }
};

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('home');
});

app.get('/edit', (request, response) => {
    response.render('edit');
});

app.get('/uuid', (request, response) => {
    let uuid = utils.genUUID();
    console.log("Creating new UUID: " + uuid);
    response.send(uuid);
});

app.get('/poll', jsonParser, (request, response) => {
    response.send(JSON.stringify(jsonObj));
})

app.listen(port);
console.log('server listening on port: ' + port);