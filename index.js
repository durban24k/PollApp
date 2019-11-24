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

app.get('/uuid', (request, response) => {
    let uuid = utils.genUUID();
    console.log("Creating new UUID: " + uuid);
    response.send(uuid);
});

app.get('/poll', jsonParser, (request, response) => {
    response.send(JSON.stringify(jsonObj));
});

app.post('/save', jsonParser, (request, response) => {
    console.log('Save request recived. Attempteping a save.');
    let json = request.body;
    try {
        if(!json.id || !json.question || !json.responces || !(typeof json.responces === "object")) throw new SyntaxError();
    } catch (err) {
        console.log('Not in the valid JSON schema. Ignored');
        response.send('rejected');
        return;
    }
    jsonObj = json;
    console.log('Json object saved.');
    response.send('confirmed');
});

app.listen(port);
console.log('server listening on port: ' + port);