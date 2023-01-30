// 拆分reducer，每个页面都拥有一个独立管理state的reducer函数，然后再合并为一个总的reducer。
// import { combineReducers } from 'redux';
// import { reducer as TeslaReducer } from '../pages/Tesla/store';
// import { reducer as ShopReducer } from '../pages/Shop/store'
// import { reducer as FindReducer } from '../pages/Find/store';

// export default combineReducers({
//     tesla: TeslaReducer,
//     shop: ShopReducer,
//     find: FindReducer
// });