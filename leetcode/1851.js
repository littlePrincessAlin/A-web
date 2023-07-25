/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
// var minInterval = function(intervals, queries) {
//   let result = new Array(intervals.length).fill(-1);
//   let n = intervals.length;
//   let min = 0;
//   let count = 0;
//   for(let j = 0; j < n; j++) {
//     for(let i = 0; i < n; i++) {
//       if(queries[j] <= intervals[i][1] && queries[j] >= intervals[i][0]) {
//         const length = intervals[i][1] - intervals[i][0] + 1;
//         result[j] = !count ? length : Math.min(min, length);
//         count += 1;
//         min = result[j];
//       }
//     }
//     count = 0;
//     min = 0;
//   }
//   return result;
// intervals => 自增数组
  // intervals.sort((a, b) => a[0] - b[0]);
  // queries.sort((a, b) => a - b);
  // let res = new Array(queries.length).fill(-1);
  // let pq = [];
  // let i = 0;
  // for (let j = 0; j < queries.length; j++) {
  //   while(queries[j] >= intervals[i][0]) {
  //     pq.push([intervals[i][1] - intervals[i][0] + 1, intervals[i][0], intervals[i][1]]);
  //     i++;
  //   }
  //   while (!pq.length && pq[0][2] < queries[j]) {
  //     pq.pop();
  //   }
  //   if (!pq.length) {
  //     res[j] = pq[0][0];
  //   }
  // }
  // return res;
// };
var minInterval = function(intervals, queries) {
  intervals = [...new Set(intervals.map(JSON.stringify))].map(JSON.parse);
  intervals.sort((a, b) => (a[1] - a[0]) === (b[1] - b[0]) ? a[0] - b[0] : (a[1] - a[0]) - (b[1] - b[0]));
  const map = new Map();
  const res = [];
  console.log(intervals)
  for(const querie of queries) {
    if(!map.has(querie)) {
      for(const interval of intervals) {
        if(interval[0] <= querie && interval[1] >= querie) {
          map.set(querie, interval[1] - interval[0] + 1); 
          break;
        }
      }
    }
    res.push(map.get(querie) ?? -1);
  }
  return res;
};
console.log(minInterval([[1,4],[2,4],[3,6],[4,4]], [2,3,4,5]));
