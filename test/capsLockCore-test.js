TestCase("test keypresses", {

  setUp: function() {
    this.evCL    = {which: 20};  // simulated capslock event    
    this.evLower = {which: 70};  // simulated lowercase alpha key
    this.evUpper = {which: 99};  // simulated uppercase alpha key
    // with shift key held down
    this.evLowerShift = {which: 70, shiftKey: true};
    this.evUpperShift = {which: 99, shiftKey: false};
  },
  
  "test capsLockPressed using e.which": function() {
    assertTrue(capslock.wasCapsLockPressed(this.evCL));
    assertFalse(capslock.wasCapsLockPressed(this.evLower));
  },

  // "test capsLockPressed using e.keyCode": function() {
  //   var ekc1 = {keyCode: 20};
  //   assertTrue(capslock.wasCapsLockPressed(ekc1));

  //   var ekc2 = {keyCode: 70};
  //   assertFalse(capslock.wasCapsLockPressed(ekc2));
  // },

  // "test after only capsLockPressed capsLockOn status is unknown": function() {
  //   assertTrue( capslock.wasCapsLockPressed(this.evCL) );
  //   assertUndefined( capslock.isCapsLockOn() );

  //   assertFalse( capslock.wasCapsLockPressed(this.evLower) );
  //   assertUndefined( capslock.isCapsLockOn() );

  //   assertTrue( capslock.wasCapsLockPressed(this.evCL) );
  //   assertUndefined( capslock.isCapsLockOn() );
  // },

  // "test pressing CapsLock toggles state": function() {
  //   assertUndefined( capslock.isCapsLockOn() );

  //   assertFalse( capslock.isCapsLockOn(this.evLower) );
  //   assertFalse( capslock.isCapsLockOn() );

    // toggle with wasCapsLockPressed
    // assertTrue( capslock.wasCapsLockPressed(this.evCL) );
    // assertTrue( capslock.isCapsLockOn() );
        
    // assertTrue( capslock.wasCapsLockPressed(this.evCL) );
    // assertFalse( capslock.isCapsLockOn() );
    
    // assertTrue( capslock.wasCapsLockPressed(this.evCL) );
    // assertTrue( capslock.isCapsLockOn() );    

    // toggle with wasCapsLockPressed
    // assertFalse( capslock.isCapsLockOn(this.evCl) );
    // assertTrue( capslock.isCapsLockOn(this.evCl) );    
    // assertFalse( capslock.isCapsLockOn(this.evCl) );
  // }
  
});
