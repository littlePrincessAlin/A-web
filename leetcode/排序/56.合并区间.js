/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 将数组按end 从小到大排序
  const intervalsArr = intervals.sort((a, b) => a[1] - b[1]);
  let start = intervalsArr[0][0];
  let end = intervalsArr[0][1];
  let res = [];
  for (let i = 1; i < intervalsArr.length; i++) {
    if (end <= intervals[i][0] || end <= intervals[i][1]) {
      res.push([start, intervals[i][1]]);
    } else {
      res.push([start, end]);
      start = intervals[i][0];
      end = intervals[i][1];
    }
  }
  return res;
};
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
