TestCase("test keypresses", {

  setUp: function() {
    // capslock key
    this.evCL     = {keyCode: 20, type: 'keyup'}; 
    this.evCLd    = {keyCode: 20, type: 'keydown'}; 
    // lowercase alpha key
    this.evLower  = {which: 107, type: 'keypress'};
    // upper alpha key
    this.evUpper  = {which: 75, shiftKey: true, type: 'keypress'};
    // number key
    this.evNumber = {which: 50, type: 'keypress'};
    // press '#'
    this.evSymbol = {which: 38, shiftKey: true, type: 'keypress'};
    // Enter key
    this.evEnter  = {which: 13, type: 'keypress'};   
    // with shift key held down
    // these simulate have CapsLock already pressed
    this.evLowerShift   = {which: 107, shiftKey: true, type: 'keypress'};
    this.evUpperNoShift = {which: 75, shiftKey: false, type: 'keypress'};

    // keys other than CapsLock with 'keyup/down' events (should be ignored)
    this.evLower_keyUp = {which: 75, type: 'keyup'};
    this.evLowerShift_keyDown = {which: 75, shiftKey: true, type: 'keydown'};

    // click event
    this.evClick = {type: 'click'};

    
    capsLockCore.reset();
  },

  "test press CapsLock first does not set capsLock status":
  function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );

    // try with keyup event
    state = capsLockCore.analyzeEvent(this.evCL);
    assertFalse( state.changed );
    assertNull( state.on );

    state = capsLockCore.analyzeEvent(this.evCL);
    assertFalse( state.changed );
    assertNull( state.on );

    state = capsLockCore.analyzeEvent(this.evCL);
    assertFalse( state.changed );
    assertNull( state.on );

    // try with keydown event
    state = capsLockCore.analyzeEvent(this.evCLd);
    assertFalse( state.changed );
    assertNull( state.on );

    state = capsLockCore.analyzeEvent(this.evCLd);
    assertFalse( state.changed );
    assertNull( state.on );

    assertNull( capsLockCore.isCapsLockOn() );
  },
    // console.log("stateChanged: " + state.changed +
    //             "; capsLockOn: " + state.on);

  "test pressing CapsLock toggles state after non-CapsLock key pressed":
  function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );
    
    state = capsLockCore.analyzeEvent(this.evLower);
    assertTrue( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    // keyup event
    state = capsLockCore.analyzeEvent(this.evCL);
    assertTrue( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evCL);
    assertTrue( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    // keydown event
    state = capsLockCore.analyzeEvent(this.evCLd);
    assertTrue( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );
  },

  "test simulate keys WITHOUT capsLock on":
  function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evLower);
    assertTrue( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evUpper);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evLower);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evNumber);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evSymbol);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

  },

  "test simulate keys WITH capsLock on":
  function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );

    // get a lower case key with Shift down => CapsLock is on
    state = capsLockCore.analyzeEvent(this.evLowerShift);
    assertTrue( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );

    // caps lock still on
    state = capsLockCore.analyzeEvent(this.evSymbol);
    assertFalse( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evUpperNoShift);
    assertFalse( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evNumber);
    assertFalse( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evLowerShift);
    assertFalse( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );

    // caps lock pressed - capsLock goes off
    state = capsLockCore.analyzeEvent(this.evCL);
    assertTrue( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evNumber);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evLower);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evUpper);
    assertFalse( state.changed );
    assertFalse( state.on )
    assertFalse( capsLockCore.isCapsLockOn() );
  },

  "test lower case key with Shift turns capsLock state on":
  function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evLowerShift);
    assertTrue( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );
  },

  "test upper case key without Shift turns capsLock state on":
  function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evUpperNoShift);
    assertTrue( state.changed );
    assertTrue( state.on )
    assertTrue( capsLockCore.isCapsLockOn() );
  },

  "test alpha keys have no effect on keyup/down events": function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );
    
    state = capsLockCore.analyzeEvent(this.evLower_keyUp);
    assertFalse( state.changed );
    assertNull( state.on );
    assertNull( capsLockCore.isCapsLockOn() );
    
    // now set state with a keypress event
    state = capsLockCore.analyzeEvent(this.evUpperNoShift);
    assertTrue( state.changed );
    assertTrue( state.on );
    assertTrue( capsLockCore.isCapsLockOn() );

    // keyup/down events with alpha keys should have no effect on state
    state = capsLockCore.analyzeEvent(this.evLower_keyUp);
    assertFalse( state.changed );
    assertTrue( state.on );
    assertTrue( capsLockCore.isCapsLockOn() );
    
    state = capsLockCore.analyzeEvent(this.evLowerShift_keyDown);
    assertFalse( state.changed );
    assertTrue( state.on );
    assertTrue( capsLockCore.isCapsLockOn() );    
  },

  "test giving non key event (click) should not change state": function() {
    var state;
    assertNull( capsLockCore.isCapsLockOn() );
    
    state = capsLockCore.analyzeEvent(this.evClick);
    assertFalse( state.changed );
    assertNull( state.on );
    assertNull( capsLockCore.isCapsLockOn() );
    
    // now set state with a keypress event
    state = capsLockCore.analyzeEvent(this.evUpperNoShift);
    assertTrue( state.changed );
    assertTrue( state.on );
    assertTrue( capsLockCore.isCapsLockOn() );

    state = capsLockCore.analyzeEvent(this.evClick);
    assertFalse( state.changed );
    assertTrue( state.on );
    assertTrue( capsLockCore.isCapsLockOn() );
  }
});

TestCase("test eventHandler", {
  setUp: function() {
    // these cause 'capsLockOn' to be false
    this.evLowerKeyP      = {which: 107, type: 'keypress'};
    this.evLowerShiftKeyP = {which: 107, shiftKey: true, type: 'keypress'};

    // these cause 'capsLockOn' to be true
    this.evUpperKeyDown      = {which: 75, shiftKey: true, type: 'keydown'};
    this.evUpperNoShiftKeyUp = {which: 75, shiftKey: false, type: 'keyup'};

    this.evFocus = {type: 'focus'};
    this.evBlur  = {type: 'blur'};

    this.fnmap = {
      onCalled: 0,
      offCalled: 0,
      focusCalled: 0,
      blurCalled: 0,

      capsLockOn: function() {
        this.onCalled += 1;
      },
      capsLockOff: function() {
        this.offCalled += 1;
      },
      focus: function(val) {
        this.focusCalled += 1;
      },
      blur: function(val) {
        this.blurCalled += 1;
      },

      reset: function() {
        this.onCalled = this.offCalled = this.focusCalled = this.blurCalled = 0;
      }
    };
  },
  
  tearDown: function() {
    this.fnmap.reset();
  },

  "test eventHandler: focus and blur events":
  function() {
    assertEquals(0, this.fnmap.blurCalled);
    assertEquals(0, this.fnmap.focusCalled);

    this.fnmap.focus();
    assertEquals(1, this.fnmap.focusCalled);

    capsLockCore.eventHandler(this.evFocus, this.fnmap);
    assertEquals(2, this.fnmap.focusCalled);
    assertEquals(0, this.fnmap.blurCalled);

    capsLockCore.eventHandler(this.evFocus, this.fnmap);
    assertEquals(3, this.fnmap.focusCalled);
    assertEquals(0, this.fnmap.blurCalled);

    capsLockCore.eventHandler(this.evBlur, this.fnmap);
    assertEquals(3, this.fnmap.focusCalled);
    assertEquals(1, this.fnmap.blurCalled);
  },

  "test eventHandler: keypress events":
  function() {
    assertEquals(0, this.fnmap.onCalled);
    assertEquals(0, this.fnmap.offCalled);

    capsLockCore.eventHandler(this.evLowerKeyP, this.fnmap);
    assertEquals(0, this.fnmap.onCalled);
    assertEquals(1, this.fnmap.offCalled);

    // calling it again does NOT inc offCalled, bcs the callback
    // is invoked only if the state of the CapsLock has changed
    capsLockCore.eventHandler(this.evLowerKeyP, this.fnmap);
    assertEquals(0, this.fnmap.onCalled);
    assertEquals(1, this.fnmap.offCalled);

  }
});
