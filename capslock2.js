(function() {

  /* ---[ Helper Functions ]--- */
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

  var warningOn = true;
  var warningElem = byId("warning");
  capsLockCore.reset();
  console.log("...." + capsLockCore.isCapsLockOn());

  // coupled
  function capsLockOn() {
    removeClass(warningElem, "hidden");
    addClass(warningElem, "visible")
  }

  // coupled
  function capsLockOff() {
    removeClass(warningElem, "visible");
    addClass(warningElem, "hidden")
  }

  // coupled
  function handler(e) {
    checkCapsLock(e, capsLockOn, capsLockOff);
  }

  var h2 = checkCapsLock.partial(undefined, capsLockOn, capsLockOff);
  
  // generic
  function checkCapsLock(e, fnOn, fnOff) {
    var state = capsLockCore.analyzeEvent(e);
    if (state.changed) {
      state.on ? fnOn() : fnOff();
    }
  }

  var login = byId("login-field");
  var passw = byId("password-field");

  bindEvent(login, "keypress", h2);
  bindEvent(passw, "keypress", h2);
  bindEvent(login, "keydown", h2);
  bindEvent(passw, "keydown", h2);
})();



  // function toggleWarning(e) {
  //   warningOn = !warningOn;
  //   var caller = e.target || e.srcElement;
  //   if (warningOn) {
  //     removeClass(warningElem, "visible");
  //     addClass(warningElem, "hidden")
  //     addClass(warningElem, "hidden")
  //     addClass(warningElem, "hidden")
  //   } else {
  //     removeClass(warningElem, "hidden");
  //     addClass(warningElem, "visible")
  //   }
  // }
