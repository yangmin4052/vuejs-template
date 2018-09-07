import wx from 'weixin-js-sdk';
import axios from 'axios';
import { api } from '../utils/api';
import { shareParams } from './params';
import env from '../../config/env';
import queryString from 'querystring';

function shareAction(pathName, query) {
  const hidePathArr = []; // 配置禁止转发的路由名；

  const isHide = hidePathArr.indexOf(pathName) > -1;

  if (isHide) {
    wx.ready(function() {
      hiddenShare();
    });
    return;
  }

  const origin = location.origin;
  const queryKey = [
    'activitycode',
    'fromsource',
    'agentnum',
    'fromsource',
    'ssid',
    'supopenid'
  ];
  const title = '标题'; // 自行配置
  let param = shareParams;
  queryKey.forEach((key) => {
    param[key] = query[key];
  });
  if (!query.supopenid) {
    param.supopenid = query.openid;
  }
  param = queryString.stringify(param);
  const link = `${origin}${api}/path/need/to/config/${param}`;
  const desc = '描述'; // 自行配置
  const imgUrl = `${origin}${api}/path/to/wxShare.jpg`;

  var menuList = [
    'menuItem:openWithSafari',
    'menuItem:openWithQQBrowser',
    'menuItem:share:qq',
    'menuItem:share:weiboApp',
    'menuItem:share:QZone',
    'menuItem:share:email',
    'menuItem:share:facebook'
  ]; // 要隐藏的菜单项，所有menu项见附录3
  if (env === 'onlineProduction') menuList.push('menuItem:copyUrl');

  wx.ready(function() {
    wx.hideMenuItems({
      menuList
    });
    // share to 朋友圈
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success: function() {}
    });
    // share to 朋友
    wx.onMenuShareAppMessage({
      title,
      link,
      desc,
      imgUrl,
      success: function() {}
    });
  });
}
function hiddenShare() {
  wx.hideAllNonBaseMenuItem();
  if (env !== 'onlineProduction') {
    let list = ['menuItem:copyUrl'];
    wx.showMenuItems({ menuList: list });
  }
}
function wxShare(pathName, query) {
  axios
    .post(
      api +
        '/path/need/to/config/' + // 自行配置路径
        encodeURIComponent(location.href.split('#')[0])
    )
    .then(res => {
      if (res && res.data) {
        var data = res.data;
        wx.config({
          // debug: false,
          debug: env !== 'onlineProduction',
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: [
            'hideAllNonBaseMenuItem',
            'previewImage',
            'chooseImage',
            'showMenuItems',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideMenuItems'
          ]
        });
        shareAction(pathName, query);
      } else {
        console.log('微信签名响应数据有误');
      }
    })
    .catch(res => {
      console.log('微信签名接口失败');
    });
}

export {
  wxShare,
  shareAction
};
