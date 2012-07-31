Function.prototype.partial = function() {
  var fn = this,
      args = Array.prototype.slice.call(arguments);

  return function() {
    var arg = 0,
        iargs = args.slice();
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        iargs[i] = arguments[arg++];
      }
    }
    return fn.apply(this, iargs.concat( Array.prototype.slice.call(arguments, arg) ));
  };
};

(function() {
  /* ---[ Private Helper Functions ]--- */
  function byId(id) {
    return document.getElementById(id);
  }

  capsLockCore.reset();
  
  /**
   * @param element - DOM element to add listener to
   * @param type - String event name, e.g., "click"
   * @param handler - JS callback function when event occurs
   */
  function bindEvent(element, type, handle) {
    if (element.addEventListener) {
      element.addEventListener(type, handle, false);

    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handle);
    }
  }

  // main namespace module to be returned
  var capsLock = {
    
    addClass: function(elem, cname) {
      elem.className += " " + cname;
    },
    
    removeClass: function(elem, cname) {
      var re = new RegExp("(?:^|\\s)" + cname + "(?!\\S)", 'g');
      elem.className = elem.className.replace(re, '');
    }

  }; // end capslock namespace obj

  // Expose functions to the global object
  window.capsLock = capsLock;
})();
