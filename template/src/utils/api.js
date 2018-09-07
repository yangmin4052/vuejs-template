// import env is one of localTest/test/production
import env from '../../config/env';
var api = '';
console.log(env);
// 测试和生产的地址还不知道，需要知道后重新编写，并跨域代理
switch (env) {
  case 'localTest':
    api = '/api';
    break;
  case 'onlineTest':
    api = '';
    break;
  case 'onlineProduction':
    api = '';
    break;
}
export {
  api
};
