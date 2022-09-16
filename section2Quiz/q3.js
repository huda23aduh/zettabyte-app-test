/**
 * Direction:
 * Find the higher value from the array bellow
 *
 * Expected Result:
 * 8
 */
let numbers = [3, 1, 2, 3, 7, 5, 6, 8, 2, 1];

function result(data) {
  // write your code here
  return Object.entries(data)
    .sort(([, a], [, b]) => a - b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v * 3 }), {});
}

console.log(result(numbers));
