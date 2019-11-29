const api_url = server + '/poll';

async function query() {
    const response = await fetch(api_url);
    const data = await response.json();
    var node = document.createElement("p");
    var textnode = document.createTextNode(data.question);
    node.appendChild(textnode);
    document.getElementById("query").appendChild(node);

    
};