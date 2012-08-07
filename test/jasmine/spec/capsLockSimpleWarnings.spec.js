function addClass(elem, cname) {
  elem.className += " " + cname;
}

function removeClass(elem, cname) {
  var re = new RegExp("(?:^|\\s)" + cname + "(?!\\S)", 'g');
  elem.className = elem.className.replace(re, '');
}

describe("CapsLockFunctions", function() {
  var expected;

  describe("Helper Functions", function() {
    var node, origClass;
    beforeEach(function() {
      node = document.getElementById("aboveWarning");
      origClass = node.className;
    });
    afterEach(function() {
      node.className = origClass;
    });

    it("addClass should add class to DOM node", function() {
      addClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).toMatch(/\bfoo\b/);
    });

    it("removeClass should remove class from DOM node", function() {
      expect(node.className).not.toMatch(/\bfoo\b/);

      addClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).toMatch(/\bfoo\b/);

      removeClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).not.toMatch(/\bfoo\b/);
    });
  })

  describe("eventHandler", function() {
    var fnmapUpper;
    var evLowerKeyP;
    var evLowerShiftKeyP;
    var evUpperNoShiftKeyUp;
    var evUpperKeyDown;
    var evCL;
    var evFocus;
    var evBlur;

    var aw, bw;
    var awOrigClass, bwOrigClass;

    var capsLockEventHandler;

    beforeEach(function() {
      if (!aw) aw = document.getElementById("aboveWarning");
      if (!bw) bw = document.getElementById("belowWarning");

      if (!awOrigClass) awOrigClass = aw.className;
      if (!bwOrigClass) bwOrigClass = bw.className;

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
      
      function Handler(elem) {
        this.makeVisible = function(elem) {
          addClass(elem, "visible");
          removeClass(elem, "hidden");
        };
        this.makeHidden = function(elem) {
          addClass(elem, "hidden");
          removeClass(elem, "visible");
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

      fnmapUpper = new Handler(aw);
      fnmapLower = new Handler(bw);      
    });

    afterEach(function() {
      aw.className = awOrigClass;
      bw.className = bwOrigClass;
      capsLockCore.reset();
    });

    describe("test capsLockCore.eventHandler directly", function() {
      
      it("handles keypresses - upper field", function() {
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // test loginField (upper text field)
        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapUpper);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapUpper);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapUpper);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);
      });

      it("handles keypresses - lower field", function() {
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // test loginField (upper text field)
        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).toMatch(/visible/);

        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).toMatch(/visible/);

        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).toMatch(/visible/);
      });

      it("handles CapsLock keyup/down events - upper field", function() {
        // Pressing CapsLock first should have no effect
        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // after pressing another key, CapsLock should toggle warnings
        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapUpper);
        expect(aw.className).toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);
      });

      it("handles CapsLock keyup/down events - lower field", function() {
        // Pressing CapsLock first should have no effect
        capsLockCore.eventHandler(evCL, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // after pressing another key, CapsLock should toggle warnings
        capsLockCore.eventHandler(evLowerShiftKeyP, fnmapLower);
        expect(bw.className).toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).toMatch(/visible/);
      });

      it("blur events remove warning", function() {
        capsLockCore.eventHandler(evLowerKeyP, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).toMatch(/visible/);

        capsLockCore.eventHandler(evBlur, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
      });

      it("blur events leave warning off", function() {
        capsLockCore.eventHandler(evLowerKeyP, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evBlur, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
      });

      it("focus events add warning if capsLock state is on", function() {
        capsLockCore.eventHandler(evLowerKeyP, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evCL, fnmapUpper);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        capsLockCore.eventHandler(evBlur, fnmapUpper);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // prove that CapsLock state is "on"
        expect(capsLockCore.isCapsLockOn()).toBe(true);

        // just blurred from upper field, now focus on lower field
        capsLockCore.eventHandler(evFocus, fnmapLower);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).toMatch(/visible/);
        expect(capsLockCore.isCapsLockOn()).toBe(true);
      });
    }); // end describe test capsLockCore.eventHandler directly

    describe("simulate registering eventHandler to DOM elem",function() {
      var unameHandler;
      var passwHandler;

      beforeEach(function() {
        var ea = document.getElementById("aboveWarning");
        var eb = document.getElementById("belowWarning");
        // these are functions that take an event object meant
        // to be registered with the DOM as an event listener
        unameHandler = capsLockEventHandler(ea);
        passwHandler = capsLockEventHandler(eb);
      });

      it("handles keypresses - upper field", function() {
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // test loginField (upper text field)
        unameHandler(evLowerShiftKeyP);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        unameHandler(evLowerShiftKeyP);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        unameHandler(evLowerShiftKeyP);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);
      });
      it("blur events remove warning", function() {
        unameHandler(evLowerKeyP);
        expect(aw.className).not.toMatch(/visible/);

        unameHandler(evCL);
        expect(aw.className).toMatch(/visible/);

        unameHandler(evBlur);
        expect(aw.className).not.toMatch(/visible/);
      });

      it("focus events add warning if capsLock state is on", function() {
        unameHandler(evLowerKeyP);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        unameHandler(evCL);
        expect(aw.className).toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        unameHandler(evBlur);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).not.toMatch(/visible/);

        // prove that CapsLock state is "on"
        expect(capsLockCore.isCapsLockOn()).toBe(true);

        // just blurred from upper field, now focus on lower field
        passwHandler(evFocus);
        expect(aw.className).not.toMatch(/visible/);
        expect(bw.className).toMatch(/visible/);
        expect(capsLockCore.isCapsLockOn()).toBe(true);
      });
    });
  });
});
