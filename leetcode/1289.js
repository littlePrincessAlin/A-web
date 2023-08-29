/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function(grid) {
  let n = grid.length
  let dp = new Array(grid.length).fill(null).map(() =>  new Array(grid[0].length).fill(null));
  dp[0] = grid[0];
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let arr = [...dp[i-1]];
      arr.splice(j, 1);
      dp[i][j] = (Math.min.apply(Math, arr) || 0) + grid[i][j];
    }
  }
  return Math.min.apply(Math, dp[n - 1]) || 0;
};
console.log(minFallingPathSum([[-73,61,43,-48,-36],[3,30,27,57,10],[96,-76,84,59,-15],[5,-49,76,31,-7],[97,91,61,-46,67]]));

