/*
 * @lc app=leetcode.cn id=931 lang=javascript
 *
 * [931] 下降路径最小和
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function(matrix) {
  const len = matrix.length;
  const dp = new Array(len).fill(0).map(() => new Array(len).fill(0));
  dp[0] = [...matrix[0]];
  for(let i = 1; i < len; i++) {
    for(let j = 0; j < len; j++) {
      let mn = dp[i-1][j];
      if(j > 0) {
        mn = Math.min(mn, dp[i-1][j-1]);
      }
      if(j < len - 1) {
        mn = Math.min(mn, dp[i-1][j+1]);
      }
      dp[i][j] = mn + matrix[i][j];
    }
  }
  return Math.min(...dp[n-1]);
};
// @lc code=end
console.log(minFallingPathSum([[2,1,3],[6,5,4],[7,8,9]]))
