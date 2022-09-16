/**
 * Direction
 * Get name of the day of 4 days ago from today
 *
 * Expected result:
 * 1. if date now = monday
 * 2. then result = thursday
 */
function result() {
  // write your code here
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date();
  d.setDate(d.getDate() - 4);
  return weekday[d.getDay()];
}

console.log(result);
