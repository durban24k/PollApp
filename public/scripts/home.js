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
        var input = document.createElement("INPUT");
        input.setAttribute("type","radio");
        input.setAttribute("name","responses");
        input.setAttribute('value', o);
        var label = document.createElement("Label");
        label.innerText = o;
        document.getElementById("radio").appendChild(input);
        document.getElementById("radio").appendChild(label);
    }
};

window.onLoad = function(){
    query();
};