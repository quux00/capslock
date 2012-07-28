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
    capslock.reset();
  },

  "test capsLockPressed using e.which": function() {
    assertTrue(capslock.wasCapsLockPressed(this.evCL));
    assertFalse(capslock.wasCapsLockPressed(this.evLower));
  },

  "test capsLockPressed using e.keyCode": function() {
    var ekc1 = {keyCode: 20};
    assertTrue(capslock.wasCapsLockPressed(ekc1));

    var ekc2 = {keyCode: 70};
    assertFalse(capslock.wasCapsLockPressed(ekc2));
  },

  "test wasCapsLockPressed does not set capsLock status": function() {
    assertTrue( capslock.wasCapsLockPressed(this.evCL) );
    assertNull( capslock.isCapsLockOn() );

    assertFalse( capslock.wasCapsLockPressed(this.evLower) );
    assertNull( capslock.isCapsLockOn() );

    assertTrue( capslock.wasCapsLockPressed(this.evCL) );
    assertNull( capslock.isCapsLockOn() );
  },

  "test only pressing capsLock before other keys does not set capsLock status": function() {
    assertNull( capslock.checkCapsLock(this.evCL) );
    assertNull( capslock.isCapsLockOn() );

    assertNull( capslock.checkCapsLock(this.evCL) );
    assertNull( capslock.checkCapsLock(this.evCL) );
    assertNull( capslock.isCapsLockOn() );

    assertNull( capslock.checkCapsLock(this.evCL) );
    assertNull( capslock.isCapsLockOn() );
  },

  "test pressing CapsLock toggles state after non-CapsLock key pressed": function() {
    assertNull( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evLower) );
    assertFalse( capslock.isCapsLockOn() );

    assertTrue( capslock.checkCapsLock(this.evCL) );
    assertTrue( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evCL) );
    assertFalse( capslock.isCapsLockOn() );
  },

  "test simulate keys WITHOUT capsLock on": function() {
    assertNull( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evLower) );
    assertFalse( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evUpper) );
    assertFalse( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evLower) );
    assertFalse( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evNumber) );
    assertFalse( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evSymbol) );
    assertFalse( capslock.isCapsLockOn() );
  },

  "test simulate keys WITH capsLock on": function() {
    assertNull( capslock.isCapsLockOn() );

    // get a lower case key with Shift down => CapsLock is on
    assertTrue( capslock.checkCapsLock(this.evLowerShift) );
    assertTrue( capslock.isCapsLockOn() );

    // caps lock still on
    assertTrue( capslock.checkCapsLock(this.evSymbol) );
    assertTrue( capslock.isCapsLockOn() );
    assertTrue( capslock.checkCapsLock(this.evNumber) );
    assertTrue( capslock.isCapsLockOn() );
    assertTrue( capslock.checkCapsLock(this.evUpperNoShift) );
    assertTrue( capslock.isCapsLockOn() );
    assertTrue( capslock.checkCapsLock(this.evLowerShift) );
    assertTrue( capslock.isCapsLockOn() );

    // caps lock pressed - capsLock goes off
    assertFalse( capslock.checkCapsLock(this.evCL) );
    assertFalse( capslock.checkCapsLock(this.evSymbol) );
    assertFalse( capslock.isCapsLockOn() );
    assertFalse( capslock.checkCapsLock(this.evNumber) );
    assertFalse( capslock.isCapsLockOn() );
    assertFalse( capslock.checkCapsLock(this.evUpper) );
    assertFalse( capslock.isCapsLockOn() );
    assertFalse( capslock.checkCapsLock(this.evLower) );
    assertFalse( capslock.isCapsLockOn() );
  },

  "test lower case key with Shift turns capsLock state on": function() {
    assertNull( capslock.isCapsLockOn() );

    assertTrue( capslock.checkCapsLock(this.evLowerShift) );
    assertTrue( capslock.isCapsLockOn() );
  },

  "test upper case key without Shift turns capsLock state on": function() {
    assertNull( capslock.isCapsLockOn() );

    assertTrue( capslock.checkCapsLock(this.evUpperNoShift) );
    assertTrue( capslock.isCapsLockOn() );
  }
});
