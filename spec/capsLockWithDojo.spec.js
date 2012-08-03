describe("CapsLockWithDojo eventHandler", function() {

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
  var masterToolTip;

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

    capsLockEventHandler = function(elem, pos) {
      var h = new CLHandler(elem, pos);
      return function(e) {
        capsLockCore.eventHandler(e, h);
      }
    };

    masterToolTip = function() {
      return document.getElementById("dijit__MasterTooltip_0");
      // <div id="dijit__MasterTooltip_0" class="dijitTooltip dijitTooltipBelow dijitTooltipABLeft" widgetid="dijit__MasterTooltip_0" style="">
      // <div id="dijit__MasterTooltip_0" class="dijitTooltip dijitTooltipBelow dijitTooltipABLeft" widgetid="dijit__MasterTooltip_0" style="top: xx; left: xx; opacity: 1">
    };
    
    function CLHandler(elem, pos) {
      this.capsLockOn = function() {
        dijit.showTooltip( "Caps Lock is On", elem, pos );
      };
      this.capsLockOff = function() {
        dijit.hideTooltip( elem );
      };
      this.focus = function(val) {
        if (val) this.capsLockOn();
      };
      this.blur = function(val) {
        this.capsLockOff();
      };
    }
  });

  // afterEach(function() {
  //   capsLockCore.reset();
  // });
  
  it("should pass", function() {
    expect(masterToolTip()).toBeFalsy();
    expect(true).toBe(true);
  });

  describe("simulate registering eventHandler to DOM elem", function() {
    var unameHandler;
    var passwHandler;
    var flag;
    
    beforeEach(function() {
      // these are functions that take an event object meant
      // to be registered with the DOM as an event listener
      unameHandler = capsLockEventHandler(lf, ['above']);
      passwHandler = capsLockEventHandler(pf, ['below']);
      flag = false;
    });

    it("does not turn on tooltip with lower case key press", function() {
      expect(masterToolTip()).toBeFalsy();

      runs(function() {
        unameHandler(evLowerKeyP);
        setTimeout(function() {
          expect(masterToolTip()).toBeTruthy();
          flag = true;
        }, 700);
      });
           
      waitsFor(function() {
        return flag;
      }, "", 750);

      runs(function() {
        expect(masterToolTip().style.opacity).toBeFalsy();
      })
    });

    it("turns on tooltip with lower case key press", function() {
      expect(masterToolTip().style.opacity).toBeFalsy();

      runs(function() {
        unameHandler(evLowerShiftKeyP);
        setTimeout(function() {
          flag = true;
        }, 700);
      });
           
      waitsFor(function() {
        return flag;
      }, "", 750);

      runs(function() {
        expect(masterToolTip().style.opacity).toBeTruthy();
      });
    });

    it("turns tooltip off with blur", function() {
      expect(masterToolTip().style.opacity).toBeTruthy();

      runs(function() {
        unameHandler(evBlur);
        setTimeout(function() {
          flag = true;
        }, 700);
      });

      waitsFor(function() {
        return flag;
      }, "", 750);

      runs(function() {
        expect(masterToolTip().style.opacity).toBeFalsy();
      });
    });
      
    it("turns tooltip on and moves tooltip down with focus when capsLock still on", function() {
      expect(capsLockCore.isCapsLockOn()).toBe(true);
      expect(masterToolTip().style.opacity).toBeFalsy();
      var vertPosPrev = masterToolTip().style.top;
      var vertPosCurr;
      
      runs(function() {
        passwHandler(evFocus);
        setTimeout(function() {
          flag = true;
          vertPosCurr = masterToolTip().style.top;
        }, 700);
      });

      waitsFor(function() {
        return flag;
      }, "", 750);

      runs(function() {
        expect(masterToolTip().style.opacity).toBeTruthy();
        expect(vertPosCurr).toBeGreaterThan(vertPosPrev);
      });
    });

    it("turns toolTip off when CapsLock key pressed", function() {
      expect(capsLockCore.isCapsLockOn()).toBe(true);
      expect(masterToolTip().style.opacity).toBeTruthy();

      runs(function() {
        passwHandler(evCL);
        setTimeout(function() {
          flag = true;
        }, 700);
      });

      waitsFor(function() {
        return flag;
      }, "", 750);

      runs(function() {
        expect(capsLockCore.isCapsLockOn()).toBe(false);
        expect(masterToolTip().style.opacity).toBeFalsy();
      });
    });
  });
});
