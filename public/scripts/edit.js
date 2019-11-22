let question = "";
let responseList = []

function createResponse() {
    let responseTextBox = document.getElementById("response-controls-textbox").value;
    responseList.push(responseTextBox); 
    console.log("Creating Response");
    displayResponses(responseTextBox);
}

function displayResponses() {
    let responseDiv = document.getElementById('response-list');
    responseDiv.innerHTML = "";
    for (n in responseList) {
        let div = document.createElement('div');
        div.classList = "response edit";
        let text = document.createElement('h3');
        text.innerText = responseList[n];
        text.classList = "edit";
        let deleteButton = document.createElement('div');
        deleteButton.id = 'response-control';
        deleteButton.setAttribute('onclick', 'deleteResponse(' + n + ')');
        deleteButton.innerText = "Delete";
        div.append(text);
        div.append(deleteButton);
        responseDiv.append(div);
    }
}

function deleteResponse(index) {
    console.log("Deleteing Response.")
    responseList.splice(index, 1);
    displayResponses();
}

document.querySelector('form').addEventListener('submit', (e) => {
    let questionValue;
    try {
        questionValue = document.getElementsByName("questionTextBox")[0].value;
    } catch (err) {
        console.log("How???");
        console.log(err);
        e.preventDefault(); 
        return;
    }
    if (questionValue === " ") {
        window.alert("Please give a valid question. We do not accept blank statements here.");
        e.preventDefault(); 
        return;
    }
    if (!questionValue) {
        window.alert("Please give a valid question.");
        e.preventDefault(); 
        return;
    }
    if(questionValue[length] !== "?") questionValue += "?";
    sendToServer();
    e.preventDefault(); 
});

async function sendToServer() {
    const server = "http://localhost:1000";
    let response = await fetch(server + "/uuid", {method: "GET"});
    let uuid = await response.text();

    let poll = {
        id: uuid,
        question: this.question,
        response: {}
    }
    for (n in responseList) {
        var hold = responseList[n];
        poll.response[hold] = []
    }
    let options = {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(poll)
    }
    console.log("Sending poll information to Server.");
    response = await fetch(server + "/save", options);
    let confirmation = await response.text();
    console.log(confirmation);
}