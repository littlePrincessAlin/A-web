/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  // 暴力
  let str = ''; // 记录最终返回的回文子串
  let max = 0;
  let i = 0; // 头指针
  let j = s.length - 1; // 尾指针
  while (i <= j && i <= s.length - 1) {
    if (i === j) {
      i = i + 1;
      j = s.length - 1;
    }
    console.log(i, j);
    if (s[i] !== s[j]) {
      j--;
    } else {
      const resStr = s.slice(i, j + 1);
      const resArr = resStr.split('').reverse();
      if (resArr.join('') === resStr && resStr.length > max) {
        str = resStr
      }
    }
  }
  return str;
};
console.log(longestPalindrome('babad'));
