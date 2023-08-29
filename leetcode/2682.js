/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var circularGameLosers = function(n, k) {
  let win = new Map();
  let loser = [];
  let round = 1;
  let person = 1;
  if (n <= 1) return [];
  while(!win.has(person)) {
    win.set(person, round);
    console.log('person', person + round * k);
    person = (person + round * k) > n ? ((person + round * k) % n || n) : person + round * k;
    round++;
  }
  for(let i = 1; i <= n; i++) {
    if (!win.has(i)) {
      loser.push(i);
    }
  }
  return loser;
};
// console.log(circularGameLosers(5, 2));
// console.log(circularGameLosers(5, 3));
console.log(circularGameLosers(7, 2));
// console.log(circularGameLosers(4, 4));

