// TODO: remove this - we don't need it at all

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
