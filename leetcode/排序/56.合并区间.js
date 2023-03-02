/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 将数组按end 从小到大排序
  const intervalsArr = intervals.sort((a, b) => a[0] - b[0]);
  let res = [];
  let start = intervalsArr[0][0]; // 1
  let end = intervalsArr[0][1]; // 10
  // 当数组长度小于二
  if (intervalsArr.length < 2) return intervalsArr;
  for (let i = 1; i < intervalsArr.length; i++) {
    // end 值有三种可能性：在数组中，在数组的左侧，在数组的右侧
    if (end <= intervalsArr[i][1] && end >= intervalsArr[i][0]) {
      end = intervalsArr[i][1];
    }else if (end < intervalsArr[i][0]) {
      res.push([start, end]);
      start = intervalsArr[i][0];
      end = intervalsArr[i][1];
    }
    if (i === intervalsArr.length - 1) {
      res.push([start, end]);
    }
  }
  return res;
};
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
