let lilin = {};

// 数据描述符
Object.defineProperty(lilin, 'age', {
  configurable: false, // false就不可以删除lilin.age并且不可以修改属性; true的话就是undefined
  value: 18,
  writable: false, // value不可更改
  enumerable: true // 可以让age在lilin对象里出现，默认false不出现
});
//重新修改特性
// Object.defineProperty(lilin, 'age', {
//   value: 20,
//   writable:true,
//   enumerable:true,
//   configurable:true
// });
// lilin.age = 20;

// 访问器描述符
Object.defineProperty(lilin, 'userInfo', {
  configurable: false,
  enumerable: true,
  get() {
    return lilin.userInfo;
  },
  set(newVal, oldVal) {
    lilin.userInfo = {
      
    }
  }
})
delete lilin.age;
console.log('lilin', lilin); // {}
console.log('lilin.age', lilin.age); // 18
