//ASSIGNMENT 4 WEB COMPONENTS
//MODULE FILE
//IN THIS FILE YOU WILL CREATE YOUR CUSTOM MODULE FOR YOUR REQUIRED FUNCTIONALITY AND EXPOSE IT THROUGH A 'PUBLICLY' ACCESSIBLE METHOD.

const Semester = (function () {

  // April 30th, 2021, 17:00:00
  const semesterEnd = new Date(2021, 3, 30, 17, 0, 0, 0);

  var daysLeft = function () {
    // today
    let today = new Date();

    // get difference in milliseconds. use math to get days left
    let diff = Math.floor((semesterEnd - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // expose private methods
  var module = {
    getDaysLeft: daysLeft,
  };

  return module;
})();
