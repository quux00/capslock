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
  
  var warningOn = true;
  var warningElem = byId("warning");
  capsLockCore.reset();
  console.log("...." + capsLockCore.isCapsLockOn());

  function capsLockOn() {
    removeClass(warningElem, "hidden");
    addClass(warningElem, "visible")
  }
  
  function capsLockOff() {
    removeClass(warningElem, "visible");
    addClass(warningElem, "hidden")
  }
  
  function handler(e) {
    if ( capsLockCore.capsLockChanged(e) ) {
      if (capsLockCore.isCapsLockOn()) {
        capsLockOn();
      } else {
        capsLockOff();
      }
    }
  }
  
  // LEFT OFF: not yet tested
  function checkForCapsLock(e) {
    console.log(">>>>" + capsLockCore.isCapsLockOn());
    console.log(e.type);
    console.log(e);
    return;
    if (e.type === 'keyup') {
      if ( capsLockCore.wasCapsLockPressed(e) ) {
        capsLockCore.checkCapsLock(e);
        
      }
    }

    var prev = capsLockCore.isCapsLockOn();
    var curr = capsLockCore.checkCapsLock(e);
    if (prev === curr) return;

    if (curr) {
      removeClass(warningElem, "hidden");
      addClass(warningElem, "visible")
    } else {
      removeClass(warningElem, "visible");
      addClass(warningElem, "hidden")
    }
    console.log("<<<<<" + capsLockCore.isCapsLockOn());
  }
  
  var login = byId("login-field");
  var passw = byId("password-field");

  bindEvent(login, "keypress", checkForCapsLock);
  // bindEvent(passw, "keypress", checkForCapsLock);
  bindEvent(login, "keyup", checkForCapsLock);
  bindEvent(login, "keydown", checkForCapsLock);
  // bindEvent(passw, "keyup", checkForCapsLock);
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
