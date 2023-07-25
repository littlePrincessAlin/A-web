/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
  // 起始点与前进距离
  let x = 0, y = 0, distance = 1;
  // 方向：每次robot会按照以下顺序换方向，当遇到-1就顺时针，遇到-2则逆时针
  const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let res = 0;
  let set = new Set();
  for(const obstacle of obstacles) {
    set.add(obstacle[0] + ',' + obstacle[1])
  }
  for (const command of commands) {
    if (command < 0) {
      distance = distance + (command == -1 ? 1 : 3);
      distance = distance % 4;
    }else {
      for(let i = 0; i < command; i++) {
        if(set.has((x + direction[distance][0]) + ',' + (y + direction[distance][1]))) {
          // 看有没有障碍
          break;
        }
        x += direction[distance][0];
        y += direction[distance][1];
      }
    }
    res = Math.max(res, x*x+y*y);
  }
  return res;
};
console.log(robotSim([4,-1,3],[]));
