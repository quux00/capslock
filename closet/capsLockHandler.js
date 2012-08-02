// Ideas for API:

var capsLockHandler = (function() {
  function handle(e, fn) {
    e = e || window.event;
    var caller = e.target || e.srcElement;

    var pr = capsLockCore.isCapsLockOn();
    var cr = capsLockCore.checkCapsLock(e);
    if (!fn) return;
    if (fn.execIfCapsLockOn  && cr === fn.execIfCapsLockOn) fn();
    if (fn.execIfCapsLockOff && cr !== fn.execIfCapsLockOn) fn();
    if (fn.execIfCapsLockChanged && pr !== fn.execIfCapsLockOn) fn();
  }

  return {handle: handle};
})();
