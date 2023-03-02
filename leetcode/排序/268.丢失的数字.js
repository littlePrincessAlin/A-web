/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let max = nums.length;
  while (max >= 0) {
    if (nums.includes(max)) {
      max--;
    } else {
      return max;
    }
  }
  return 0;
};
console.log(missingNumber([9,6,4,2,3,5,7,0,1]))
