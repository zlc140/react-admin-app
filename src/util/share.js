import wx from 'weixin-js-sdk'
import {Toast} from 'mint-ui'
import url from './url';
import userStore from '@app/comm/store/user/userInfo.store'


function goodsImg(src) {
  if (src) {
    // 主要作兼容性路径处理避免 后面这种多重host 错误路径 "http://images.lovego.com/http://img30.360buyimg.com/popWaterMark/jfs/t17533/289/892668385/252704/4efea209/5aacb81fNc8bc9d40.jpg"
    src = src.replace(/^(\w+:)?\/\/images.lovego.com\//, '');
    if (src.match(/^(\w+:)?\/\/(\w[\w.]*(:\d+)?)/)) {
      return src.replace(/^(\w+:)?\/\//, location.protocol + '//');
    }
    return 'https://images.lovego.com/' + String(src).replace(/(https:|http:)?\/\/images\.lovego\.com\//, '')
  } else {
    return 'https://images.lovego.com/'
  }
}


/**
 *分享
 * @param that
 * @param shareObj.shareTitle 标题
 * @param shareUrl 链接
 * @param shareImg 图片
 * @param shareDesc 描述
 */
export default (that, shareObj = {}, successFunc, cancelFunc, failFunc) => {
  shareObj = {
    shareTitle: shareObj.shareTitle ,
    shareUrl: shareObj.shareUrl || location.href ,
    shareImg: goodsImg(shareObj.shareImg,
    shareDesc: shareObj.shareDesc,
  }
  let mobile = userStore.state.userInfo ? userStore.state.userInfo.mobile : null;
  //alert(JSON.stringify(shareObj))
  // 把分享码合并到路径中
  shareObj.shareUrl = mobile ? url.computedUrl(shareObj.shareUrl,{
    mobRefer:Base64.encodeURI(mobile)
  }) : shareObj.shareUrl;


  let props = {
    url: location.href.split('#')[0]
  };
  that.$service(
    'getSignature'
    //   {
    //   type:'get',
    //   gateway:'',
    //   url:'/orders/pay/getSignature?url=' + encodeURIComponent(location.href.split('#')[0])
    // }
  ).success(res => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: window.location.hostname === 'mobile.lovego.com' ? 'wxf456e1895f5df22e' : 'wx2eb3e05b46f61f34', // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature,// 必填，签名
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    });
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      //判断当前客户端版本是否支持指定JS接口
      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          let result = res.checkResult;
          if (!result.onMenuShareTimeline) {
            Toast('当前客户端版本不支持分享朋友圈')
          }
          if (!result.onMenuShareAppMessage) {
            Toast('当前客户端版本不支持分享到朋友')
          }
        }
      });
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: shareObj.shareTitle, // 分享标题
        desc: shareObj.shareDesc, // 分享描述
        link: shareObj.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        // 该链接是重定向链接，因为需要获取用户code，但是该链接又无法直接写微信获取code的链接，
        // 所以需要点击后重新加载新的页面，来实现重定向，重新打开获取code的微信链接，实现获取用户信息的功能；
        imgUrl: shareObj.shareImg, // 分享图标
        success: function () {
          // 用户点击了分享后执行的回调函数
          successFunc && successFunc();
        },
        cancel: function (res) {
          cancelFunc && cancelFunc();
        },
        fail: function (res) {
          failFunc && failFunc();
        }
      });
      // 分享到朋友
      wx.onMenuShareAppMessage({
        title: shareObj.shareTitle, // 分享标题
        desc: shareObj.shareDesc, // 分享描述
        link: shareObj.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        // 该链接是重定向链接，因为需要获取用户code，但是该链接又无法直接写微信获取code的链接，
        // 所以需要点击后重新加载新的页面，来实现重定向，重新打开获取code的微信链接，实现获取用户信息的功能；
        imgUrl: shareObj.shareImg, // 分享图标
        success: function () {
          // 用户点击了分享后执行的回调函数
          successFunc && successFunc();
        },
        cancel: function (res) {
          cancelFunc && cancelFunc();
        },
        fail: function (res) {
          failFunc && failFunc();
        }
      });

    });

    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      if (!sessionStorage.getItem('invalidAuth_WX')) {
        sessionStorage.setItem('invalidAuth_WX', '1')
        window.location.reload();
      }

    });


  }).error(err => {
    Toast(err.errMsg)
  }).send(props)
};
