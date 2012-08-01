var capsLockCore = (function() {
  // keep track of whether capslock is on
  // three states: yes, no, unknown
  // unknown (null) until first non-CapsLock key is pressed
  var capsLockOn = null;

  /* ---[ Private Helper Methods ]--- */
  
  function toggleCapsLockState() {
    if (typeof capsLockOn === 'boolean') capsLockOn = !capsLockOn;
    return capsLockOn;
  }

  function isUpperCaseAlphaKey(charCode) {
    return (charCode >= 65 && charCode <= 90);
  }
  
  function isLowerCaseAlphaKey(charCode) {
    return (charCode >= 97 && charCode <= 122);
  }

  function capsLockPressed(e) {
    return getCharCode(e) === 20;
  }

  function keyPress(e) {
    var charCode = getCharCode(e);
    if ( isLowerCaseAlphaKey(charCode) ) {
      capsLockOn = !!e.shiftKey;
    } else if ( isUpperCaseAlphaKey(charCode) ) {
      capsLockOn = !!!e.shiftKey;
    }
    return capsLockOn;
  }
  
  /* ---[ Public Methods ]--- */

  function getCharCode(e) {
    return (typeof e.which === "number") ? e.which : e.keyCode;
  }

  function analyzeEvent(e) {
    var prev = capsLockOn;
    if (e) {
      if ( (e.type === 'keydown' || e.type === 'keyup') && capsLockPressed(e) ) {
        toggleCapsLockState();
      } else if (e.type === 'keypress') {
        keyPress(e);
      }
    }
    return {changed: prev !== capsLockOn,
            on: capsLockOn};
  }
  
  function isCapsLockOn() {
    return capsLockOn;
  }

  function reset() {
    capsLockOn = null;
  }

  // DOM event handler
  function eventHandler(e, fnmap) {
    if (/^key/.test(e.type)) {
      var state = analyzeEvent(e);
      if (state.changed) {
        state.on ? fnmap.capsLockOn() : fnmap.capsLockOff();
      }
    } else if (fnmap[e.type]) {
      fnmap[e.type]( capsLockCore.isCapsLockOn() );
    }
  }

  // return methods that are publicly available
  return {analyzeEvent: analyzeEvent,
          eventHandler: eventHandler,
          getCharCode: getCharCode,
          isCapsLockOn: isCapsLockOn,
          reset: reset
         };
})();


  /**
   * The keypress or keyup event is evaluated as to whether the
   * capsLock is on or not.
   * NOTE: a keyup event should be passed in to detect if the CapsLock
   *       key itself was pressed; otherwise pass in a keypress event
   * 
   * @param  keypress event or keyup event
   * @return true      if CapsLock key is known to be on
   *         false     if known not to be on
   *         undefined if not known (when no keys have been
   *                   pressed or the only the key pressed
   *                   so far is Caps Lock)
   */
// checkCapsLock
