/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
  // 获取所有人身高从高到低排序， 如果高度一样的需要个数小的在前
  let peopleArr = people.sort((a, b) => b[0] - a[0]);
  // [[9,0],[7,0],[1,9],[3,0],[2,7],[5,3],[6,0],[3,4],[6,2],[5,2]]
  let same = [peopleArr[0]];
  let sameVal = peopleArr[0][0];
  let res = [];
  for (let i = 1; i < peopleArr.length; i++) {
    if (peopleArr[i][0] === sameVal) {
      same.push(peopleArr[i]);
    } else {
      same.sort((a, b) => a[1] - b[1]);
      res.push(...same);
      same = [peopleArr[i]];
      sameVal = peopleArr[i][0];
    }
  }
  if (same.length) {
    same.sort((a, b) => a[1] - b[1]);
    res.push(...same);
  }
  // 存储最终站位结果
  let queue = [];
  for (let i = 0; i < res.length; i++) {
    let second = res[i][1]; // 获取身高大于当前的数
    // 如果 second >= queue.length ====> 末尾插入的操作
    // 如果 second < queue.length ====> 中间插入的操作(插入到第i项)
    if (second >= queue.length) {
      queue.push(res[i]);
    } else {
      queue.splice(second, 0, res[i])
    }
  }
  return queue;
};
console.log(reconstructQueue([[9, 0], [7, 0], [1, 9], [3, 0], [2, 7], [5, 3], [6, 0], [3, 4], [6, 2], [5, 2]]));
