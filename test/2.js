const successOccurrences = [];
const intervalCounts = {};
const totalRuns = 1000;

let lastSuccessIndex = -1;
for (let i = 0; i < totalRuns; i++) {
  const randomNumber = Math.floor(Math.random() * 101);
  if (randomNumber <= 22) {
    if (lastSuccessIndex === -1 || i - lastSuccessIndex > 1) {
      successOccurrences.push(i);
      const interval = i - lastSuccessIndex;
      intervalCounts[interval] = (intervalCounts[interval] || 0) + 1;
      lastSuccessIndex = i;
    }
  }
}

const totalSuccess = successOccurrences.length;

console.log(`总成功次数: ${totalSuccess}`);

console.log("成功后的间隔次数统计（从小到大排列）:");
Object.keys(intervalCounts)
  .sort((a, b) => a - b)
  .forEach((interval) => {
    const count = intervalCounts[interval];
    console.log(`间隔次数 ${interval} 统计: ${count}`);
  });
