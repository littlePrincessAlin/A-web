
/**
 * @description: 监听函数
 * @param: 
 */
function observe (value, cb) {
  Object.keys(value).forEach(function(key) {
    defineReactive(value, key, value[key], cb);
  })
}
function defineReactive (obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: ()=>{
        /*....依赖收集等....*/
        /*Github:https://github.com/answershuto*/
        return val
    },
    set:newVal=> {
        val = newVal;
        cb();/*订阅者收到消息的回调*/
    }
  })
}


/**
 * @description: 使用
 */
class Vue {
  constructor(options) {
    this.data = options.data;
    // 注册监控
    observe(this.data, options.render);
  }
}
let app = new Vue({
  el: "#app",
  data: {
    text: 'text',
    text2: 'text2'
  },
  render: function() {
    console.log('render')
  }
});
