/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let str = []; // 存放子串
  let max = 0; // 记录最大长度
  for (let i = 0; i < s.length; i++) {
    if(str.includes(s[i])) {
      const index = str.findIndex(item => item === s[i]);
      str = str.slice(index + 1);
    }
    str.push(s[i]);
    if (str.length > max) {
      max = str.length
    }
  }
  return max;
};
