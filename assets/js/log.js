"use strict";
const APIlog = "https://justbook-7f753-default-rtdb.firebaseio.com/logError.json"


var sendErrorNotification = async(ev)=> {
    let date = (new Date()).toLocaleDateString();
    date +=" " +(new Date()).toLocaleTimeString();
     
    let error = {
        Navigator : navigator.userAgent + ' ' + navigator.appVersion,
        errorName : ev.error.name,
        errorMessage : ev.error.message,
        errorStack : ev.error.stack,
        urlPage : location.href,
        createdAt : date
    }
    let respond = await fetch(APIlog, {
        method: 'POST',
        body: JSON.stringify(error)
    })
    if (!respond.ok) {
        return {Error: "LogError message sending error!"}
    }
    var result = await respond.json()
    console.log(result)
    return result
    
}
window.addEventListener("error", sendErrorNotification)
