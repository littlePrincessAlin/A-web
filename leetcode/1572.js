/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function(mat) {
  let sum = 0;
  let left = 0;
  let right = mat[0].length - 1;
  for(let i = 0; i < mat.length; i++) {
    if(left >= mat.length || right < 0) {
      return;
    }
    if(left === right) {
      sum += mat[i][left];
    }else {
      sum += mat[i][left] + mat[i][right];
    }
    left++;
    right--;
  }
  return sum;
};
// console.log(diagonalSum([[2,10,5,10],[1,7,1,4],[2,6,5,3],[2,5,7,8]]));
console.log(diagonalSum([[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]));


