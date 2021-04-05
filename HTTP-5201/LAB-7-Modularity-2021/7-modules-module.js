//LAB 7 - MODULES - MODULE FILE
//THIS FILE CONTAINS YOUR CUSTOM MODULE.

var myModNS = (function () {
  var myPrivateMsg = "Kyle created this myModNS module";

  var citeMessage = function () {
    alert(myPrivateMsg);
  };

  var module = {
    citeMe: citeMessage
  };

  return module;
})();
