var capsLockCore = (function() {
  // keep track of whether capslock is on
  // three states: yes, no, unknown
  // unknown (null) until first non-CapsLock key is pressed
  var capsLockOn = null;

  /* ---[ Private Helper Methods ]--- */
  
  function getCharCode(e) {
    return (typeof e.which === "number") ? e.which : e.keyCode;
  }

  function toggleCapsLockState() {
    if (typeof capsLockOn === 'boolean') capsLockOn = !capsLockOn;
  }

  function isUpperCaseAlphaKey(charCode) {
    return (charCode >= 65 && charCode <= 90);
  }
  
  function isLowerCaseAlphaKey(charCode) {
    return (charCode >= 97 && charCode <= 122);
  }

  // function isLowerCaseNumber(charCode) {
  //   return (charCode >= 48 && charCode <= 57);
  // }

  // function isUpperCaseNumber(charCode) {
  //   switch (String.fromCharCode(charCode)) {
  //     case '!': return true;
  //     case '@': return true;
  //     case '#': return true;
  //     case '$': return true;
  //     case '%': return true;
  //     case '^': return true;
  //     case '&': return true;
  //     case '*': return true;
  //     case '(': return true;
  //     case ')': return true;
  //     case '_': return true;
  //     case '+': return true;
  //     default:  return false;
  //   }
  // }

  /* ---[ Public Methods ]--- */

  function wasCapsLockPressed(e) {
    return getCharCode(e) === 20;
  }

  function checkCapsLock(e) {
    if (!e) return capsLockOn;
    var charCode = getCharCode(e);
    if ( wasCapsLockPressed(e) ) {
      toggleCapsLockState();
    } else if ( isLowerCaseAlphaKey(charCode) ) {
      capsLockOn = !!e.shiftKey;
    } else if ( isUpperCaseAlphaKey(charCode) ) {
      capsLockOn = !!!e.shiftKey;
    }
    return capsLockOn;
  }
  
  function isCapsLockOn() {
    return capsLockOn;
  }

  function reset() {
    capsLockOn = null;
  }
  
  return {checkCapsLock: checkCapsLock,
          isCapsLockOn: isCapsLockOn,
          wasCapsLockPressed: wasCapsLockPressed,
          reset: reset};
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
