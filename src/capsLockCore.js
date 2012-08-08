/**
 * Caps Lock detection library for use with web browsers.
 *
 * Include this in your HTML and reference its exported functions
 * via the capsLockCore "module" namespace handle.
 *
 * @author Michael Peterson
 * Aug 2012
 */
var capsLockCore = (function() {
  "use strict";
  // keep track of whether capslock is on
  // three states: yes, no, unknown
  // unknown (null) until first non-CapsLock key is pressed
  //                or if reset is called
  var capsLockOn = null;

  /* ---[ Private Helper Methods ]--- */

  /**
   * Modifies state: if capsLock state is already known
   * this toggles to the other state (on vs. off)
   */
  function toggleCapsLockState() {
    if (typeof capsLockOn === 'boolean') capsLockOn = !capsLockOn;
    return capsLockOn;
  }

  /**
   * Pure function. Returns true if charCode
   * passed in maps to an upper case alphabetical
   * key, false otherwise.
   *
   * @param charCode as defined by the capsLockCore
   *        getCharCode function
   */
  function isUpperCaseAlphaKey(charCode) {
    return (charCode >= 65 && charCode <= 90);
  }

  /**
   * Pure function. Returns true if charCode
   * passed in maps to a lower case alphabetical
   * key, false otherwise.
   *
   * @param charCode as defined by the capsLockCore
   *        getCharCode function
   */
  function isLowerCaseAlphaKey(charCode) {
    return (charCode >= 97 && charCode <= 122);
  }

  /**
   * Pure function. Returns true if event passed
   * in has a 'charcode' that matches that of the
   * Caps Lock key, where charcode is defined by
   * the getCharCode function; returns false otherwise.
   *
   * @param DOM Event object
   */
  function capsLockPressed(e) {
    return getCharCode(e) === 20;
  }

  /**
   * Modifies state. Worker method to handle a keypress
   * event (as opposed to a keydown/keyup or some other
   * DOM event). It inspects the keypress event to determine
   * whether the Caps Lock key is on or off and sets internal
   * state to match and returns that state (boolean).
   *
   * @param DOM Event object
   */
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

  /**
   * Pure function. Returns the "char code" from a DOM event.
   *
   * @param DOM Event object
   */
  function getCharCode(e) {
    return (typeof e.which === "number") ? e.which : e.keyCode;
  }

  /**
   * Modifies state.  This function orchestrates determining if the
   * Caps Lock key is on or off and sets internal state based on that.
   * Responds to keypress, keyup and keydown events. Other events can be
   * passed but will have no effect.
   * NOTE: The CapsLock key itself can only be detected from a keyup or
   *       keydown event.
   *
   * @param  DOM event
   * @return state object with two properties: 'changed' and 'on'
   *         : changed is true if the capsLock state is known to have changed
   *           as a result of this DOM event, false otherwise
   *         : on can have three states:
   *             true      if CapsLock key is known to be on
   *             false     if known not to be on
   *             undefined if not known (when no keys have been pressed or
   *                       the only the key pressed so far is Caps Lock)
   */
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

  /**
   * Pure function. Returns:
   *   true      if CapsLock key is known to be on
   *   false     if known not to be on
   *   undefined if not known (when no keys have been pressed or
   *             the only the key pressed so far is Caps Lock)
   */
  function isCapsLockOn() {
    return capsLockOn;
  }

  /**
   * Modifies state.  Sets capsLockOn state to null, simulating
   * the situation when an HTML doc has loaded for the first time
   * and the Caps Lock key state is indeterminate.
   */
  function reset() {
    capsLockOn = null;
  }

  /**
   * Modifies state (via the analyzeEvent function).
   * This is the primary DOM Event Handler or Event Listener.
   * Pass a DOM event and a function map/object that has callback functions.
   * If you function map has the appropriate callback, it will be called
   * in response to the event.
   *
   * @param e      DOM event
   * @param fnmap  Object or "function map" with any or all of the following
   *               callback functions:
   *   : capsLockOn  : called if caps lock key state changed and is now 'on'
   *   : capsLockOff : called if caps lock key state changed and is now 'off'
   *       The above are called in response to keyup, keydown or keypress events
   *       For other events, the callback should take the name of the event.type
   *   : focus :  called for a focus event
   *   : blur  :  called for a blur event
   *   : click :  called for a click event
   *     &etc.
   */
  function eventHandler(e, fnmap) {
    if (/^key/.test(e.type)) {
      var state = analyzeEvent(e);
      if (state.changed) {
        if (state.on) {
          if (fnmap.capsLockOn) fnmap.capsLockOn();
        } else {
          if (fnmap.capsLockOff) fnmap.capsLockOff();
        }
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
