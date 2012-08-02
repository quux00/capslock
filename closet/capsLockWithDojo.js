// TODO: remove this - we don't need it at all

(function() {
  /* ---[ Private Helper Functions ]--- */
  function byId(id) {
    return document.getElementById(id);
  }

  capsLockCore.reset();
  
  /**
   * @param element - DOM element to add listener to
   * @param types   - Array of String event name, e.g., []"click", "blur"]
   * @param handler - JS callback function when event occurs
   */
  function bindEvents(element, types, handler) {
    if (element.addEventListener) {
      for (var i=0; i < types.length; i++) {
        element.addEventListener(types[i], handler, false);
      }

    } else if (element.attachEvent) {
      for (var i=0; i < types.length; i++) {
        element.attachEvent("on" + types[i], handler);
      }
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
