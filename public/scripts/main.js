const server = "http://192.168.137.1:3000";
let uuid = ""
let rawCookieName = "uuid"
let rawCookie = document.cookie;

/**
 * Called when the page Has loaded
 */
function onLoad() {
    setUUID();
}

/**
 * Sets the UUID of the client
 */
async function setUUID() {
    if (rawCookie == false) {
        const cookieName = rawCookieName + "="
        const url = server + '/uuid';
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options);
        uuid = await response.text();
        
        var date = new Date();
        date.setTime(date.getTime() + (259200000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + uuid + ";" + expires + ";path=/";
    } else {
        uuid = getCookieSegmentValue(rawCookieName, rawCookie);
    }
}

/**
 * Returns the value of a cookie in the cookies string.
 * 
 * @param {String} segment The name of the Cookie.
 * @param {String} cookies The cookie string.
 * @returns {String} The value of the Cookie. 
 */
function getCookieSegmentValue(segment, cookies) {
    let rawCookieSplit = cookies.split(";");
    for (var i = 0; i < rawCookieSplit.length; i++) {
        let cookie = rawCookieSplit[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        let varibleSplit = cookie.split("=")
        if(!(varibleSplit.length > 1))
            continue;
        if(varibleSplit[0] === segment) {
            return varibleSplit[1];
        }
    }
}