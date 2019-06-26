var server = require('./utils/server');
App({
	onLaunch: function () {
		console.log('App Launch')
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session', rd_session)
		if (!rd_session) {
			self.login();
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					console.log('登录态未过期')
					self.rd_session = rd_session;
					self.getUserInfo();
				},
				fail: function () {
					//登录态过期
					self.login();
				}
			})
		}
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		hasLogin: false,
    shops: [
      {
        id: 1,
        distance: 1.8,
        sales: 1475,
        img: '../../imgs/index/sj1.png',
        name: '杨国福麻辣烫+麻辣拌',
        logo: '../../imgs/1.JPG',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 2,
        distance: 2.4,
        sales: 1284,
        img: '../../imgs/index/sj2.png',
        name: '韩式红锅饭',
        logo: '../../imgs/2.JPG',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 3,
        distance: 2.3,
        sales: 2039,
        img: '../../imgs/index/sj3.png',
        name: '华莱士炸鸡汉堡（御龙广场店）',
        logo: '../../imgs/3.JPG',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      }
    ]
	},
	rd_session: null,
	login: function() {
		var self = this;
		wx.login({
			success: function (res) {
				console.log('wx.login', res)
				server.getJSON('/WxAppApi/setUserSessionKey', {code: res.code}, function (res) {
					console.log('setUserSessionKey', res)
					self.rd_session = res.data.data.rd_session;
					self.globalData.hasLogin = true;
					wx.setStorageSync('rd_session', self.rd_session);
					self.getUserInfo();
				});
			}
		});
	},
	getUserInfo: function() {
		var self = this;
		wx.getUserInfo({
			success: function(res) {
				console.log('getUserInfo', res)
				self.globalData.userInfo = res.userInfo;
				server.getJSON('/WxAppApi/checkSignature', {
					rd_session: self.rd_session,
					result: res
				}, function (res) {
					console.log('checkSignature', res)
					if (res.data.errorcode) {
						// TODO:验证有误处理
					}
				});
			}
		});
	}
})
