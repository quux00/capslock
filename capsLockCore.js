var capslock = (function() {
  // keep track of whether capslock is on
  // three states: yes, no, unknown
  // unknown until first non-CapsLock key is pressed
  var capsLockOn; 

  /* ---[ Private Helper Methods ]--- */
  
  function getCharCode(e) {
    return (typeof e.which === "number") ? e.which : e.keyCode;
  }

  function toggleCapsLockState() {
    if (typeof capsLockOn === 'boolean') capsLockOn = !capsLockOn;
  }

  function isLowerCaseAlphaKey(charCode) {
    return (charCode >= 65 && charCode <= 90);
  }
  
  function isUpperCaseAlphaKey(charCode) {
    return (charCode >= 97 && charCode <= 122);
  }

  function wasCapsLockPressed(e) {
    return getCharCode(e) === 20;
  }

  
  /* ---[ Public Methods ]--- */

  function isCapsLockOn(e, fn) {
    if (!e) return capsLockOn;
    var charCode = getCharCode(e);
    if ( isLowerCaseAlphaKey(charCode) ) {
      capsLockOn = !!e.shiftKey;
    } else if (wasCapsLockPressed(e)) {
      toggleCapsLockState();
    }
    return capsLockOn;
  }

  return {isCapsLockOn: isCapsLockOn};
})();



  /**
   * Can be called with or without a keypress event
   * If no keypress event passed in, then it returns the
   * last known state of the capsLock key.
   * If keypress event passed in, the keypress is evaluated
   * as to whether the capsLock is on or not.
   * 
   * @return true      if CapsLock key is known to be on
   *         false     if known not to be on
   *         undefined if not known (when no keys have been
   *                   pressed or the only the key pressed
   *                   so far is Caps Lock)
   */
// isCapsLockOn
