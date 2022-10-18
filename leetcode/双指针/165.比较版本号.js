var compareVersion = function(version1, version2) {
  const version1Arr = version1.split('.');
  const version2Arr = version2.split('.');
  // 补齐
  if(version1Arr.length < version2Arr.length) {
    const weici = version2Arr.length - version1Arr.length;
    const arr = Array(weici).fill(0);
    version1Arr.push(...arr);
  }
  if(version1Arr.length > version2Arr.length) {
    const weici = version1Arr.length - version2Arr.length;
    const arr = Array(weici).fill(0);
    version2Arr.push(...arr);
  }
  let i = 0;
  let j = 0;
  while(i < version1Arr.length && j < version2Arr.length) {
    if(+version1Arr[i] > +version2Arr[j]) {
      return 1;
    }
    if(+version1Arr[i] < +version2Arr[j]) {
      return -1;
    }
    if(+version1Arr[i] === +version2Arr[j]) {
      i++;
      j++;
    }
  }
  return 0;
};
