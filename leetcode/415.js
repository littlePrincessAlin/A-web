/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// num1 = "11", num2 = "123" 输出："134"
var addStrings = function(num1, num2) {
  if (num1.length > num2.length) {
    num2 = num2.padStart(num1.length, '0')
  }
  if (num2.length > num1.length) {
    num1 = num1.padStart(num2.length, '0')
  }
  let n = num1.length - 1;
  let result = '', ext = 0;
  while(n >= 0) {
    let a = +num1[n];
    let b = +num2[n];
    let target = a + b + ext;
    result += target % 10;
    ext = Math.floor(target / 10);
    n--;
  }
  if(ext) {
    result += ext
  }
  return result.split('').reverse().join('');
};
console.log(addStrings('9', '99'))
