/**
 * @param {number[][]} grid
 * @return {number}
 */
var deleteGreatestValue = function(grid) {
  const newGrid = (grid || []).map(item => item.sort((a, b) => b - a));
  newGrid.sort((a, b) => b[0] - a[0]);
  let res = 0;
  for (let i = 0; i < newGrid[0].length; i++) {
    newGrid.sort((a, b) => b[i] - a[i])
    res += newGrid[0][i];
  }
  return res;
};

console.log(deleteGreatestValue([[10]]));
