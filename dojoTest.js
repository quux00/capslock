function capsLockEventHandler(elem, pos) {
  var h = new Handler(elem, pos);
  return function(e) {
    capsLockCore.eventHandler(e, h);
  }
}

function Handler(elem, pos) {
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

var login = document.getElementById("loginField");
var passw = document.getElementById("passwordField");
var loginHandler = capsLockEventHandler(login, ['above']);
var passwHandler = capsLockEventHandler(passw, ['below']);

// TODO: change to better event registration method
login.onkeypress = loginHandler;
login.onkeydown  = loginHandler;
login.onblur     = loginHandler;
login.onfocus    = loginHandler;
passw.onkeypress = passwHandler;
passw.onkeydown  = passwHandler;
passw.onblur     = passwHandler;
passw.onfocus    = passwHandler;

login.onkeyup = enterKeyHandler;
passw.onkeyup = enterKeyHandler;

function enterKeyHandler(e) {
  if (capsLockCore.getCharCode(e) === 13) alert("Would login() now");
}
