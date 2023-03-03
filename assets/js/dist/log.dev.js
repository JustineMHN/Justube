"use strict";

var APIlog = "https://justbook-7f753-default-rtdb.firebaseio.com/logError.json";

var sendErrorNotification = function sendErrorNotification(ev) {
  var date, error, respond, result;
  return regeneratorRuntime.async(function sendErrorNotification$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          date = new Date().toLocaleDateString();
          date += " " + new Date().toLocaleTimeString();
          error = {
            Navigator: navigator.userAgent + ' ' + navigator.appVersion,
            errorName: ev.error.name,
            errorMessage: ev.error.message,
            errorStack: ev.error.stack,
            urlPage: location.href,
            createdAt: date
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(APIlog, {
            method: 'POST',
            body: JSON.stringify(error)
          }));

        case 5:
          respond = _context.sent;

          if (respond.ok) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            Error: "LogError message sending error!"
          });

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(respond.json());

        case 10:
          result = _context.sent;
          console.log(result);
          return _context.abrupt("return", result);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

window.addEventListener("error", sendErrorNotification);