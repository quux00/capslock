describe("CapsLockWithDojo", function() {

  describe("eventHandler", function() {
    var fnmapUpper;
    var evLowerKeyP;
    var evLowerShiftKeyP;
    var evUpperNoShiftKeyUp;
    var evUpperKeyDown;
    var evCL;
    var evFocus;
    var evBlur;

    var lf, pf;

    var capsLockEventHandler;

    beforeEach(function() {
      if (!lf) lf = document.getElementById("loginField");
      if (!pf) pf = document.getElementById("passwordField");

      // causes 'capsLockOn' to be false
      evLowerKeyP = {which: 107, type: 'keypress'};

      // causes 'capsLockOn' to be true
      evLowerShiftKeyP = {which: 107, shiftKey: true, type: 'keypress'};

      // these are keyup/down so should have no effect
      evUpperNoShiftKeyUp = {which: 75, shiftKey: false, type: 'keyup'};
      evUpperKeyDown = {which: 75, shiftKey: true, type: 'keydown'};

      evCL = {keyCode: 20, type: 'keyup'};

      evFocus = {type: 'focus'};
      evBlur  = {type: 'blur'};

      capsLockEventHandler = function(elem) {
        var h = new Handler(elem);
        return function(e) {
          capsLockCore.eventHandler(e, h);
        }
      }
      
      function Handler(elem, pos) {
        this.makeVisible = function(elem) {
          dijit.showTooltip( "Caps Lock is On", elem, pos );
        };
        this.makeHidden = function(elem) {
          dijit.hideTooltip( caller );
        };
        this.capsLockOn = function() {
          this.makeVisible(elem);
        };
        this.capsLockOff = function() {
          this.makeHidden(elem);
        };
        this.focus = function(val) {
          if (val) this.capsLockOn();
        };
        this.blur = function(val) {
          this.capsLockOff();
        };
      }

      fnmapUpper = new Handler(lf, ["above"]);
      fnmapLower = new Handler(pf, ["below"]);
    });

    afterEach(function() {
      capsLockCore.reset();
    });

    describe("simulate registering eventHandler to DOM elem",function() {
      var unameHandler;
      var passwHandler;

      beforeEach(function() {
        // these are functions that take an event object meant
        // to be registered with the DOM as an event listener
        unameHandler = capsLockEventHandler(lf);
        passwHandler = capsLockEventHandler(pf);
      });

      it("handles keypresses - upper field", function() {
        // expect(aw.className).not.toMatch(/visible/);
        // expect(bw.className).not.toMatch(/visible/);

        // test loginField (upper text field)
        unameHandler(evLowerShiftKeyP);
        // expect(aw.className).toMatch(/visible/);
        // expect(bw.className).not.toMatch(/visible/);

        unameHandler(evLowerShiftKeyP);
        // expect(aw.className).toMatch(/visible/);
        // expect(bw.className).not.toMatch(/visible/);

        // unameHandler(evLowerShiftKeyP);
        // expect(aw.className).toMatch(/visible/);
        // expect(bw.className).not.toMatch(/visible/);
      });
      // it("blur events remove warning", function() {
      //   unameHandler(evLowerKeyP);
      //   expect(aw.className).not.toMatch(/visible/);

      //   unameHandler(evCL);
      //   expect(aw.className).toMatch(/visible/);

      //   unameHandler(evBlur);
      //   expect(aw.className).not.toMatch(/visible/);
      // });

      // it("focus events add warning if capsLock state is on", function() {
      //   unameHandler(evLowerKeyP);
      //   expect(aw.className).not.toMatch(/visible/);
      //   expect(bw.className).not.toMatch(/visible/);

      //   unameHandler(evCL);
      //   expect(aw.className).toMatch(/visible/);
      //   expect(bw.className).not.toMatch(/visible/);

      //   unameHandler(evBlur);
      //   expect(aw.className).not.toMatch(/visible/);
      //   expect(bw.className).not.toMatch(/visible/);

      //   // prove that CapsLock state is "on"
      //   expect(capsLockCore.isCapsLockOn()).toBe(true);

      //   // just blurred from upper field, now focus on lower field
      //   passwHandler(evFocus);
      //   expect(aw.className).not.toMatch(/visible/);
      //   expect(bw.className).toMatch(/visible/);
      //   expect(capsLockCore.isCapsLockOn()).toBe(true);
      // });
    });
  });
});
