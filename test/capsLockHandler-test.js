TestCase("test capsLockHandler", {

  setUp: function() {
    this.evCL     = {keyCode: 20}; // capslock key
    this.evLower  = {which: 107};  // lowercase alpha key
    this.evUpper  = {which: 75, shiftKey: true};  // upper alpha key
    this.evNumber = {which: 50};   // number key
    this.evSymbol = {which: 38, shiftKey: true};  // press '#'
    this.evEnter  = {which: 13};   // Enter key
    // with shift key held down
    // these simulate have CapsLock already pressed
    this.evLowerShift   = {which: 107, shiftKey: true};
    this.evUpperNoShift = {which: 75, shiftKey: false};
  },

  "test handle": function() {
    var fnCalled = false;
    var fn = function() {
      fnCalled = true;
    };
    fn.execIfCapsLockOff = true;
    capsLockHandler.handle(this.evNumber, fn);
    assertTrue("no callback :(", fnCalled);
  }
});
