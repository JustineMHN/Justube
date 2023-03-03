"use strict"
/* Declaration des variables */
var nav = document.getElementsByClassName('navbar')[0];
var menu = document.querySelector('.fa.fa-bars')
var container = document.getElementsByClassName('container')[0]
var libraryItem = document.getElementsByClassName('library-item')
var library_items = document.querySelector('.library-items')

/* Objet contenant des evenements */

var listenerEvent = {
    openNav:()=>{ nav.style.display = 'block'},
    closeNav:()=>{ nav.style.display = 'none'}
}

/* Fonctions declanchants d'évènement */

var setupListener = (event)=>{
    if(menu){
        menu.addEventListener("click", ()=>{
            if ( nav.style.display === 'none') {
               listenerEvent.openNav()
               container.style.marginLeft = '15%'
               for (let index = 0; index < libraryItem.length; index++) {
                   const element = libraryItem[index];
                   element.style.width = '250px'
                   
               }
               
            } else {
                listenerEvent.closeNav()
                container.style.margin = '20px auto'
                for (let index = 0; index < libraryItem.length; index++) {
                    const element = libraryItem[index];
                    element.style.width = '280px'
                    
                }
            }
        })
    }
    
}

window.addEventListener("click", ()=>{console.log(amour)})

var getNumber = function(nb){
    if (typeof nb !== 'number') {
        var err = new Error("'"+nb+"'"+ ' is not a number')
        throw err
    }
    return nb*nb;
}

try { 
    console.log(getNumber('200'));
} catch (error) {
    console.log('Error: ' + error.message);
}

/* Utilisation de l'API Fetch pour recuperer le fichier library.json en tant que promesse et le traiter */

// var requeste = location.origin +"/api/library.json" // avec location.origin la localisation est dynamique donc on pet lancer la requeste sur n'importe quel port et travailler convenablement

// Utilisation de la méthode Post 
// Envoi des données dans la base de données firebase avec la méthode post

const API = "https://justbook-7f753-default-rtdb.firebaseio.com/justbook.json"
const req = location.origin +"/api/library.json"  // L'adresse dynamique du fichier JSON 
//const req = location.origin +"/api/piz.json"  // L'adresse dynamique du fichier JSON 

// Récuperation de ressources du fichier JSON 
var library = async(ressource)=>{
    var respond = await fetch(ressource);
    if (!respond.ok) {
        return {Error: "La ressource n'a pas été récupérée."};
    }
    var result = await respond.json();
    if (!result.status === 200) {
        return {Error: "Il n'y a un problème au niveau de la conversion du fichier JSON."};
    }
    return result
}
// Envoi des données contenu du fichier JSON dans la base de données firebase 
var setlibrary = async()=>{
    var lib = await(library(req)) // Recuperation du fichier
    if (!lib.status === 200){
        return {Error: "Le réseau n'a pas pu récuperer la ressource!."}
    }
    var biblio = lib['Bibliotheque']
    if (!biblio.status === 200) {
        return {Error: "Il n'y a un problème au niveau de l'object"}
    }
    for(var index=0; index < biblio.length; index++){
        var element = biblio[index]
        var data1 = await fetch(API, { //Envoi des données
            method : "POST", 
            body : JSON.stringify(element)
        })
        if (!data1.ok) {
            return {Error: "Problème de sauvegarde!"}
        }
        
    }
}
// Utilisation de la méthode get
// Récuperation des données envoyées sur le serveur firebase via la méthode get 
var getlibrary = async()=>{
    let data = await fetch(API)  
    let libraries = await data.json()
    return libraries; // Retourner le resultat sous format json ...
}
// Utilisation des données recuperées dans un code html
var uselibrary = async()=>{
    let items = await(getlibrary())
    if (!items.status === 200) {
        return {Error: "Problème de récuperation de getlibrary()!"}
    }
    library_items.innerHTML = ''
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            const library = items[key];
            var library_item = ` 
            <div class="library-item flex flex-column">
                <div class="library-video-poster"><img src=${library['video']}  alt="Poster"></div>
                <div class="library-video-meta flex flex-center gap-5">
                    <div class="profile-picture"><img src=${library['user_image']} alt="Profile"></div>
                    <div class="video-meta">
                        <div class="video-title">${library['title']}</div>
                        <div class="owner-video-fullname">${library['fullname']}</div>
                        <div class="video-meta-data flex gap-5">
                            <div class="video-meta-views">${library['views']} &nbsp;</div>
                            <div class="video-meta-time">&nbsp;${library['time']}</div>
                        </div>
                    </div>
                </div>
            </div> `
            library_items.innerHTML += library_item
        }

    }
}

var init = function(){
    setlibrary()
    getlibrary()
    uselibrary()
}

init()
