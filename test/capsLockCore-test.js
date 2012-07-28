TestCase("test keypresses", {

  setUp: function() {
    this.evCL     = {keyCode: 20};  // sim capslock event    
    this.evLower  = {which: 107}; // sim lowercase alpha key
    this.evUpper  = {which: 75};  // sim uppercase alpha key
    this.evNumber = {which: 50}; // sim press number key
    this.evSymbol = {which: 38, shiftKey: true}; // sim press '#'
    this.evLower  = {which: 107}; // sim lowercase alpha key
    // with shift key held down
    // these simulate have CapsLock already pressed
    this.evLowerShift = {which: 70, shiftKey: true};
    this.evUpperShift = {which: 99, shiftKey: true};
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
    assertUndefined( capslock.isCapsLockOn() );

    assertFalse( capslock.wasCapsLockPressed(this.evLower) );
    assertUndefined( capslock.isCapsLockOn() );

    assertTrue( capslock.wasCapsLockPressed(this.evCL) );
    assertUndefined( capslock.isCapsLockOn() );
  },

  "test only pressing capsLock before other keys does not set capsLock status": function() {
    assertUndefined( capslock.checkCapsLock(this.evCL) );
    assertUndefined( capslock.isCapsLockOn() );

    assertUndefined( capslock.checkCapsLock(this.evCL) );
    assertUndefined( capslock.checkCapsLock(this.evCL) );
    assertUndefined( capslock.isCapsLockOn() );

    assertUndefined( capslock.checkCapsLock(this.evCL) );
    assertUndefined( capslock.isCapsLockOn() );
  },

  "test pressing CapsLock toggles state after non-CapsLock key pressed": function() {
    assertUndefined( capslock.isCapsLockOn() );

    assertFalse( capslock.checkCapsLock(this.evLower) );
    assertFalse( capslock.isCapsLockOn() );

    assertTrue( capslock.checkCapsLock(this.evCL) );
    assertTrue( capslock.isCapsLockOn() );
        
    assertFalse( capslock.checkCapsLock(this.evCL) );
    assertFalse( capslock.isCapsLockOn() );
  },

  "test simulate keys without capsLock on": function() {
    assertUndefined( capslock.isCapsLockOn() );

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
  }
});
