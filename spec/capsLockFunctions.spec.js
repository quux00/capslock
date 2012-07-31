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
      capsLock.addClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).toMatch(/\bfoo\b/);
    });

    it("removeClass should remove class from DOM node", function() {
      expect(node.className).not.toMatch(/\bfoo\b/);

      capsLock.addClass(node, "foo");
      expect(node.className).toMatch(origClass);
      expect(node.className).toMatch(/\bfoo\b/);

      capsLock.removeClass(node, "foo");
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

      function Handler(elem) {
        this.makeVisible = function(elem) {
          capsLock.addClass(elem, "visible");
          capsLock.removeClass(elem, "hidden");
        };
        this.makeHidden = function(elem) {
          capsLock.addClass(elem, "hidden");
          capsLock.removeClass(elem, "visible");
        };
        this.capsLockOn = function() {
          makeVisible(elem);
        };
        this.capsLockOff = function() {
          makeHidden(elem);
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
      
      var makeVisible = function(elem) {
        capsLock.addClass(elem, "visible");
        capsLock.removeClass(elem, "hidden");
      };

      var makeHidden = function(elem) {
        capsLock.addClass(elem, "hidden");
        capsLock.removeClass(elem, "visible");
      };

      fnmapUpperOld = {
        capsLockOn: function() {
          makeVisible(aw);
        },
        capsLockOff: function() {
          makeHidden(aw);
        },
        focus: function(val) {
          if (val) this.capsLockOn();
        },
        blur: function(val) {
          this.capsLockOff();
        }
      };

      fnmapLowerOld = {
        capsLockOn: function() {
          makeVisible(bw);
        },
        capsLockOff: function() {
          makeHidden(bw);
        },
        focus: function(val) {
          if (val) this.capsLockOn();
        },
        blur: function(val) {
          this.capsLockOff();
        }
      };
    });

    afterEach(function() {
      aw.className = awOrigClass;
      bw.className = bwOrigClass;
      capsLockCore.reset();
    });

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

  });
});
