// --- FROM password reset html page ---
// document.getElementById("newpassword").onkeypress = capsLockFunctions.checkForCapsLock;
// document.getElementById("newpassword").onkeyup = capsLockFunctions.capsLockRemoveHandler;
// document.getElementById("newpassword").onblur = capsLockFunctions.onBlurTooltipRemove;
// document.getElementById("newpassword").onfocus = capsLockFunctions.onFocusAddTooltipIfCapsLockIsOn;
// document.getElementById("confirm").onkeypress = capsLockFunctions.checkForCapsLock;
// document.getElementById("confirm").onkeyup = capsLockFunctions.capsLockRemoveHandler;
// document.getElementById("confirm").onblur = capsLockFunctions.onBlurTooltipRemove;
// document.getElementById("confirm").onfocus = capsLockFunctions.onFocusAddTooltipIfCapsLockIsOn;


// --- FROM main login html page ---
// //Disables Caps Lock Warning for iPad
// if ( !navigator.userAgent.match(/iPad/i) ){

// 	document.getElementById("<%=LoginConstants.PARAM_LOGIN%>").onkeypress = capsLockFunctions.checkForCapsLock;
// 	document.getElementById("<%=LoginConstants.PARAM_LOGIN%>").onkeyup = capsLockFunctions.capsLockRemoveHandler;
// 	document.getElementById("<%=LoginConstants.PARAM_LOGIN%>").onblur = capsLockFunctions.onBlurTooltipRemove;
// 	document.getElementById("<%=LoginConstants.PARAM_LOGIN%>").onfocus = capsLockFunctions.onFocusAddTooltipIfCapsLockIsOn;
// 	document.getElementById("<%=LoginConstants.PARAM_PASSWORD%>").onkeypress = capsLockFunctions.checkForCapsLock;
// 	document.getElementById("<%=LoginConstants.PARAM_PASSWORD%>").onkeyup = capsLockFunctions.capsLockRemoveHandler;
// 	document.getElementById("<%=LoginConstants.PARAM_PASSWORD%>").onblur = capsLockFunctions.onBlurTooltipRemove;
// 	document.getElementById("<%=LoginConstants.PARAM_PASSWORD%>").onfocus = capsLockFunctions.onFocusAddTooltipIfCapsLockIsOn;

// }
// //Allows user to press 'go' button on ipad to complete login
// if( navigator.userAgent.match(/iPad/i) ){

// 	document.getElementById("<%=LoginConstants.PARAM_LOGIN%>").onkeypress = capsLockFunctions.loginIfEnterKeyIsPressed;
// 	document.getElementById("<%=LoginConstants.PARAM_PASSWORD%>").onkeypress = capsLockFunctions.loginIfEnterKeyIsPressed;

// }
	


var capsLockFunctions = {

  toolTipOn: false,   // state of the tooltip
  isCapsLockOn: false,

  // Primary DOM handler
  checkForCapsLock: function( e ) {
    // If the browser passes us an object (an event), then we use it.
    // Otherwise, we'll set up e to be window.event.
    if ( !e ) {
      e = window.event;
    }

    // Set up a variable called caller which points to the particular
    // DOM node that events are firing from.
    var caller = e.target || e.srcElement;

    if ( capsLockFunctions.capsLockAlreadyOn( e ) ) {
      capsLockFunctions.showCapsLockWarningTooltip( caller );
      capsLockFunctions.isCapsLockOn = true;
    }

    // IDs of the username and password input fields on the main login page (login_detail.jsp)
    if ( caller.id === "in_login" || caller.id === "in_password" ) {
      capsLockFunctions.loginIfEnterKeyIsPressed( e );
    }
  },

  capsLockAlreadyOn: function( e ) {
    var asciiKeyValue = 0;
    var userShiftKey = false;
    asciiKeyValue = (typeof e.which === "number") ? e.which : e.keyCode;
    userShiftKey = e.shiftKey;
    if ( ( asciiKeyValue >= 65 && asciiKeyValue <= 90 ) && !userShiftKey ) {
      capsLockFunctions.isCapsLockOn = true;
      return true;
    }

    if ( ( asciiKeyValue >= 97 && asciiKeyValue <= 122 ) && userShiftKey ) {
      capsLockFunctions.isCapsLockOn = true;
      return true;

    } else {
      capsLockFunctions.isCapsLockOn = false;
      return false;
    }
  },

  loginIfEnterKeyIsPressed:  function ( e ) {
    var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
    if ( charCode === 13 ) {
      if (parent.doClearTimeout) parent.doClearTimeout();
      if (enterPressed(e.keyCode)) {
        login();
      }
    }
  },

  //Primary DOM Handler, removes caps lock warning if caps lock is pressed
  capsLockRemoveHandler: function( e ) {
    e = e || window.event;
    var caller = e.target || e.srcElement;

    if ( capsLockFunctions.capsLockPressed( e ) ) {
      if ( capsLockFunctions.toolTipOn ) {
        capsLockFunctions.removeCapsLockWarningTooltip( caller );
        capsLockFunctions.isCapsLockOn = false;
      }
    }
  },

  capsLockPressed:  function( e ) {
    var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
    if ( charCode === 20 ) {
      return true;
    }
  },

  onBlurTooltipRemove: function ( e ) {
    capsLockFunctions.toolTipOn = true;
    e = e || window.event;
    var caller = e.target || e.srcElement;

    capsLockFunctions.removeCapsLockWarningTooltip( caller );
  },

  onFocusAddTooltipIfCapsLockIsOn: function ( e ) {
    e = e || window.event;
    var caller = e.target || e.srcElement;

    if ( capsLockFunctions.isCapsLockOn == true ) {
      capsLockFunctions.showCapsLockWarningTooltip( caller );
    }
    else return;
  },

  showCapsLockWarningTooltip: function( caller ) {
    var toolTipPosition;

    // 'in_login' is the id of the login input field on the main login screen (login_detail.jsp)
    // 'newpassword' is the id of the 'new password' field on the change password screen
    //    for new users (password.jsp)
    if ( caller.id === "in_login" || caller.id === "newpassword" ) {
      toolTipPosition = [ "above" ];

    } else {
      toolTipPosition = [ "below" ];
    }

    dijit.showTooltip( "Caps Lock is On", caller, toolTipPosition );
    capsLockFunctions.toolTipOn = true;
    capsLockFunctions.isCapsLockOn = true;
  },

  removeCapsLockWarningTooltip: function( caller ) {
    dijit.hideTooltip( caller );
    capsLockFunctions.toolTipOn = false;
  }

};
