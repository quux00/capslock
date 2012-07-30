Function.prototype.partial = function() {
  var fn = this,
      args = Array.prototype.slice.call(arguments);

  return function() {
    var arg = 0,
        iargs = args.slice();
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        iargs[i] = arguments[arg++];
      }
    }
    return fn.apply(this, iargs.concat( Array.prototype.slice.call(arguments, arg) ));
  };
};

(function() {

  /* ---[ Helper Functions ]--- */

  function byId(id) {
    return document.getElementById(id);
  }

  /**
   * @param element - DOM element to add listener to
   * @param type - String event name, e.g., "click"
   * @param handler - JS callback function when event occurs
   */
  function bindEvent(element, type, handle) {
    if (element.addEventListener) {
      element.addEventListener(type, handle, false);

    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handle);
    }
  }

  function addClass(elem, cname) {
    elem.className += " " + cname;
  }

  function removeClass(elem, cname) {
    var re = new RegExp("(?:^|\\s)" + cname + "(?!\\S)", 'g');
    elem.className = elem.className.replace(re, '');
  }


  /* ---[ Main Body ]--- */

  // make sure capsLock state is set to unknown on (re)load
  capsLockCore.reset();

  function addWarning(elem) {
    removeClass(elem, "hidden");
    addClass(elem, "visible")    
  }
  
  function removeWarning(elem) {
    removeClass(elem, "visible");
    addClass(elem, "hidden")
  }

  var clOnUsername  = addWarning.partial(byId("above-warning"));
  var clOnPassword  = addWarning.partial(byId("below-warning"));
  var clOffUsername = removeWarning.partial(byId("above-warning"));
  var clOffPassword = removeWarning.partial(byId("below-warning"));
  
  var unameHandler = checkCapsLock.partial(undefined,
                                           clOnUsername,
                                           clOffUsername);
  var passwHandler = checkCapsLock.partial(undefined,
                                           clOnPassword,
                                           clOffPassword);

  // var loginHandler = function(e) {
  //   if (e.type === 'blur')
  // }
  
  // generic
  function checkCapsLock(e, fnOn, fnOff) {
    var state = capsLockCore.analyzeEvent(e);
    if (state.changed) {
      state.on ? fnOn() : fnOff();
    }
  }

  // // coupled
  // function handler(e) {
  //   checkCapsLock(e, capsLockOn, capsLockOff);
  // }
  
  var login = byId("login-field");
  var passw = byId("password-field");

  bindEvent(login, "keypress", unameHandler);
  bindEvent(passw, "keypress", passwHandler);
  bindEvent(login, "keydown",  unameHandler);
  bindEvent(passw, "keydown",  passwHandler);
})();
