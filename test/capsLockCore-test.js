TestCase("test keypresses", {

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
    capsLockCore.reset();
  },

  "test capsLockPressed using e.which": function() {
    assertTrue(capsLockCore.wasCapsLockPressed(this.evCL));
    assertFalse(capsLockCore.wasCapsLockPressed(this.evLower));
  },

  "test capsLockCorePressed using e.keyCode": function() {
    var ekc1 = {keyCode: 20};
    assertTrue(capsLockCore.wasCapsLockPressed(ekc1));

    var ekc2 = {keyCode: 70};
    assertFalse(capsLockCore.wasCapsLockPressed(ekc2));
  },

  "test wasCapsLockPressed does not set capsLock status": function() {
    assertTrue( capsLockCore.wasCapsLockPressed(this.evCL) );
    assertNull( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.wasCapsLockPressed(this.evLower) );
    assertNull( capsLockCore.isCapsLockOn() );

    assertTrue( capsLockCore.wasCapsLockPressed(this.evCL) );
    assertNull( capsLockCore.isCapsLockOn() );
  },

  "test only pressing capsLock before other keys does not set capsLock status": function() {
    assertNull( capsLockCore.checkCapsLock(this.evCL) );
    assertNull( capsLockCore.isCapsLockOn() );

    assertNull( capsLockCore.checkCapsLock(this.evCL) );
    assertNull( capsLockCore.checkCapsLock(this.evCL) );
    assertNull( capsLockCore.isCapsLockOn() );

    assertNull( capsLockCore.checkCapsLock(this.evCL) );
    assertNull( capsLockCore.isCapsLockOn() );
  },

  "test pressing CapsLock toggles state after non-CapsLock key pressed": function() {
    assertNull( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evLower) );
    assertFalse( capsLockCore.isCapsLockOn() );

    assertTrue( capsLockCore.checkCapsLock(this.evCL) );
    assertTrue( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evCL) );
    assertFalse( capsLockCore.isCapsLockOn() );
  },

  "test simulate keys WITHOUT capsLock on": function() {
    assertNull( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evLower) );
    assertFalse( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evUpper) );
    assertFalse( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evLower) );
    assertFalse( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evNumber) );
    assertFalse( capsLockCore.isCapsLockOn() );

    assertFalse( capsLockCore.checkCapsLock(this.evSymbol) );
    assertFalse( capsLockCore.isCapsLockOn() );
  },

  "test simulate keys WITH capsLock on": function() {
    assertNull( capsLockCore.isCapsLockOn() );

    // get a lower case key with Shift down => CapsLock is on
    assertTrue( capsLockCore.checkCapsLock(this.evLowerShift) );
    assertTrue( capsLockCore.isCapsLockOn() );

    // caps lock still on
    assertTrue( capsLockCore.checkCapsLock(this.evSymbol) );
    assertTrue( capsLockCore.isCapsLockOn() );
    assertTrue( capsLockCore.checkCapsLock(this.evNumber) );
    assertTrue( capsLockCore.isCapsLockOn() );
    assertTrue( capsLockCore.checkCapsLock(this.evUpperNoShift) );
    assertTrue( capsLockCore.isCapsLockOn() );
    assertTrue( capsLockCore.checkCapsLock(this.evLowerShift) );
    assertTrue( capsLockCore.isCapsLockOn() );

    // caps lock pressed - capsLock goes off
    assertFalse( capsLockCore.checkCapsLock(this.evCL) );
    assertFalse( capsLockCore.checkCapsLock(this.evSymbol) );
    assertFalse( capsLockCore.isCapsLockOn() );
    assertFalse( capsLockCore.checkCapsLock(this.evNumber) );
    assertFalse( capsLockCore.isCapsLockOn() );
    assertFalse( capsLockCore.checkCapsLock(this.evUpper) );
    assertFalse( capsLockCore.isCapsLockOn() );
    assertFalse( capsLockCore.checkCapsLock(this.evLower) );
    assertFalse( capsLockCore.isCapsLockOn() );
  },

  "test lower case key with Shift turns capsLock state on": function() {
    assertNull( capsLockCore.isCapsLockOn() );

    assertTrue( capsLockCore.checkCapsLock(this.evLowerShift) );
    assertTrue( capsLockCore.isCapsLockOn() );
  },

  "test upper case key without Shift turns capsLock state on": function() {
    assertNull( capsLockCore.isCapsLockOn() );

    assertTrue( capsLockCore.checkCapsLock(this.evUpperNoShift) );
    assertTrue( capsLockCore.isCapsLockOn() );
  }
});
