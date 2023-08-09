/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function(n) {
  const arr = `${n}`.split('');
  let cheng = 1;
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    cheng *=  +arr[i];
    sum += +arr[i];
    console.log(cheng, sum)
  }
  return cheng - sum;
};
console.log(subtractProductAndSum(234));
