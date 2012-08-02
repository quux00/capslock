/**
 * Cross-browser helper to bind callback functions to DOM events.
 * 
 * @param element - DOM element to add listener to
 * @param types   - String or Array of String event names,
                    e.g., 'keypress' or ["click", "blur"]
 * @param handler - JS function to callback when event occurs
 */
function bindEvents(element, types, handler) {
  if (typeof types === 'string') types = [types];
  if (element.addEventListener) {
    for (var i=0; i < types.length; i++) {
      element.addEventListener(types[i], handler, false);
    }

  } else if (element.attachEvent) {
    for (var i=0; i < types.length; i++) {
      element.attachEvent("on" + types[i], handler);
    }
  }
}

function capsLockEventHandler(elem, pos) {
  var h = new CLHandler(elem, pos);
  return function(e) {
    capsLockCore.eventHandler(e, h);
  }
}

function CLHandler(elem, pos) {
  this.capsLockOn = function() {
    dijit.showTooltip( "Caps Lock is On", elem, pos );
  };
  this.capsLockOff = function() {
    dijit.hideTooltip( elem );
  };
  this.focus = function(val) {
    if (val) this.capsLockOn();
  };
  this.blur = function(val) {
    this.capsLockOff();
  };
}

function enterKeyHandler(e) {
  if (capsLockCore.getCharCode(e) === 13) alert("Would login() now");
}

var login = document.getElementById("loginField");
var passw = document.getElementById("passwordField");

bindEvents(login,
           ['keypress', 'keydown', 'blur', 'focus'],
           capsLockEventHandler(login, ['above']));

bindEvents(passw,
           ['keypress', 'keydown', 'blur', 'focus'],
           capsLockEventHandler(passw, ['below']));

bindEvents(login, 'keyup', enterKeyHandler);
bindEvents(passw, 'keyup', enterKeyHandler);

