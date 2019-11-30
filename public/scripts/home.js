const api_url = server + '/poll';
let answers;


async function query() {
    const response = await fetch(api_url);
    const data = await response.json();
    answers = data.responses;
    

    var node = document.createElement("p");
    var textnode = document.createTextNode(data.question);
    node.appendChild(textnode);
    document.getElementById("query").appendChild(node);
    
    for(o in answers){
        var div = document.createElement('div');
        div.classList = "response-element"
        var input = document.createElement("INPUT");
        input.setAttribute("type","radio");
        input.setAttribute("name","responses");
        input.setAttribute('value', o);
        input.classList = ''
        var label = document.createElement("h3");
        label.innerText = o;
        div.appendChild(input);
        div.appendChild(label);
        document.getElementById("response-list").appendChild(div);
    }
};

window.onLoad = function(){
    query();
};