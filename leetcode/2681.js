/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfPower = function(nums) {
  nums.sort((a, b) => a -b);
  let i = 0; 
  let j = nums.length - 1;
  let sum = nums.length > 2 ? nums[j] * nums[j] * nums[i] : 0;
  while(i <= j) {
    sum += nums[j] * nums[j] * nums[i];
    console.log(nums[j] * nums[j] * nums[i], nums[j],  nums[i], i, j);
    if (i === j) {
      j = nums.length - 1;
      i = i + 1
    }else {
      j--;
    }
  }
  return sum;
};

// console.log(sumOfPower([4, 4])) // 192对的
console.log(sumOfPower([76,24,96,82,97])); // 13928461对的 ---> 8131431错的

