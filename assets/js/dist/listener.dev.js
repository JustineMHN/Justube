"use strict";
/* Declaration des variables */

var nav = document.getElementsByClassName('navbar')[0];
var menu = document.querySelector('.fa.fa-bars');
var container = document.getElementsByClassName('container')[0];
var libraryItem = document.getElementsByClassName('library-item');
var library_items = document.querySelector('.library-items');
/* Objet contenant des evenements */

var listenerEvent = {
  openNav: function openNav() {
    nav.style.display = 'block';
  },
  closeNav: function closeNav() {
    nav.style.display = 'none';
  }
};
/* Fonctions declanchants d'évènement */

var setupListener = function setupListener(event) {
  if (menu) {
    menu.addEventListener("click", function () {
      if (nav.style.display === 'none') {
        listenerEvent.openNav();
        container.style.marginLeft = '15%';

        for (var index = 0; index < libraryItem.length; index++) {
          var element = libraryItem[index];
          element.style.width = '250px';
        }
      } else {
        listenerEvent.closeNav();
        container.style.margin = '20px auto';

        for (var _index = 0; _index < libraryItem.length; _index++) {
          var _element = libraryItem[_index];
          _element.style.width = '280px';
        }
      }
    });
  }
};

window.addEventListener("click", function () {
  console.log(amour);
});

var getNumber = function getNumber(nb) {
  if (typeof nb !== 'number') {
    var err = new Error("'" + nb + "'" + ' is not a number');
    throw err;
  }

  return nb * nb;
};

try {
  console.log(getNumber('200'));
} catch (error) {
  console.log('Error: ' + error.message);
}
/* Utilisation de l'API Fetch pour recuperer le fichier library.json en tant que promesse et le traiter */
// var requeste = location.origin +"/api/library.json" // avec location.origin la localisation est dynamique donc on pet lancer la requeste sur n'importe quel port et travailler convenablement
// Utilisation de la méthode Post 
// Envoi des données dans la base de données firebase avec la méthode post


var API = "https://justbook-7f753-default-rtdb.firebaseio.com/justbook.json";
var req = location.origin + "/api/library.json"; // L'adresse dynamique du fichier JSON 
//const req = location.origin +"/api/piz.json"  // L'adresse dynamique du fichier JSON 
// Récuperation de ressources du fichier JSON 

var library = function library(ressource) {
  var respond, result;
  return regeneratorRuntime.async(function library$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(ressource));

        case 2:
          respond = _context.sent;

          if (respond.ok) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", {
            Error: "La ressource n'a pas été récupérée."
          });

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(respond.json());

        case 7:
          result = _context.sent;

          if (!(!result.status === 200)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", {
            Error: "Il n'y a un problème au niveau de la conversion du fichier JSON."
          });

        case 10:
          return _context.abrupt("return", result);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Envoi des données contenu du fichier JSON dans la base de données firebase 


var setlibrary = function setlibrary() {
  var lib, biblio, index, element, data1;
  return regeneratorRuntime.async(function setlibrary$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(library(req));

        case 2:
          lib = _context2.sent;

          if (!(!lib.status === 200)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", {
            Error: "Le réseau n'a pas pu récuperer la ressource!."
          });

        case 5:
          biblio = lib['Bibliotheque'];

          if (!(!biblio.status === 200)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", {
            Error: "Il n'y a un problème au niveau de l'object"
          });

        case 8:
          index = 0;

        case 9:
          if (!(index < biblio.length)) {
            _context2.next = 19;
            break;
          }

          element = biblio[index];
          _context2.next = 13;
          return regeneratorRuntime.awrap(fetch(API, {
            //Envoi des données
            method: "POST",
            body: JSON.stringify(element)
          }));

        case 13:
          data1 = _context2.sent;

          if (data1.ok) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", {
            Error: "Problème de sauvegarde!"
          });

        case 16:
          index++;
          _context2.next = 9;
          break;

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Utilisation de la méthode get
// Récuperation des données envoyées sur le serveur firebase via la méthode get 


var getlibrary = function getlibrary() {
  var data, libraries;
  return regeneratorRuntime.async(function getlibrary$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch(API));

        case 2:
          data = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(data.json());

        case 5:
          libraries = _context3.sent;
          return _context3.abrupt("return", libraries);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Utilisation des données recuperées dans un code html


var uselibrary = function uselibrary() {
  var items, key, _library, library_item;

  return regeneratorRuntime.async(function uselibrary$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getlibrary());

        case 2:
          items = _context4.sent;

          if (!(!items.status === 200)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", {
            Error: "Problème de récuperation de getlibrary()!"
          });

        case 5:
          library_items.innerHTML = '';

          for (key in items) {
            if (items.hasOwnProperty(key)) {
              _library = items[key];
              library_item = " \n            <div class=\"library-item flex flex-column\">\n                <div class=\"library-video-poster\"><img src=".concat(_library['video'], "  alt=\"Poster\"></div>\n                <div class=\"library-video-meta flex flex-center gap-5\">\n                    <div class=\"profile-picture\"><img src=").concat(_library['user_image'], " alt=\"Profile\"></div>\n                    <div class=\"video-meta\">\n                        <div class=\"video-title\">").concat(_library['title'], "</div>\n                        <div class=\"owner-video-fullname\">").concat(_library['fullname'], "</div>\n                        <div class=\"video-meta-data flex gap-5\">\n                            <div class=\"video-meta-views\">").concat(_library['views'], " &nbsp;</div>\n                            <div class=\"video-meta-time\">&nbsp;").concat(_library['time'], "</div>\n                        </div>\n                    </div>\n                </div>\n            </div> ");
              library_items.innerHTML += library_item;
            }
          }

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var init = function init() {
  setlibrary();
  getlibrary();
  uselibrary();
};

init();