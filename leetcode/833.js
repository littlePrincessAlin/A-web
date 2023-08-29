/**
 * @param {string} s
 * @param {number[]} indices
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
let findReplaceString = function (s, indices, sources, targets) {
  let res = '';
  let i = 0;
  while (i < s.length) {
    let idx = indices.indexOf(i);
    if (idx === -1) {
      res += s[i];
      i++;
    } else {
      let source = sources[idx];
      let target = targets[idx];
      let j = 0;
      while (j < source.length && s[i + j] === source[j]) {
        j++;
      }
      if (j === source.length) {
        res += target;
        i += source.length;
      } else {
        res += s[i];
        i++;
      }
    }
  }
  return res;
};
// console.log(findReplaceString("abcd", [0,2], ["a","cd"], ["eee","ffff"]));
// console.log(findReplaceString("abcd", [0,2], ["ab","ec"], ["eee","ffff"]));
console.log(findReplaceString("jjievdtjfb", [4,6,1], ["md","tjgb","jf"], ["foe","oov","e"])); // jjievdtjfb



