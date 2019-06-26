var app = getApp();
var server = require('../../utils/server');
Page({
  data: {
    filterId: 1,
    searchWords: '',
    placeholder: '烤鸭',
    shops: app.globalData.shops
  },
  globalData: {
    hasLogin: true,
    shops: [
      {
        id: 1,
        distance: 4.7,
        sales: 2567,
        img: '../../imgs/index/sj1.png',
        name: '杨国福麻辣烫+麻辣拌',
        logo: '../../imgs/1.JPG',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 2,
        distance: 4.6,
        sales: 4215,
        img: '../../imgs/index/sj2.png',
        name: '韩式红锅饭',
        logo: '../../imgs/2.JPG',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      },
      {
        id: 3,
        distance: 4.8,
        sales: 2277,
        img: '../../imgs/index/sj3.png',
        name: '华莱士炸鸡汉堡（御龙广场店）',
        logo: '../../imgs/3.JPG',
        desc: '满25减8；满35减10；满60减15（在线支付专享）'
      }
    ]
  },
  onLoad: function () {
    
  },
  onShow: function () {
    this.setData({
      showResult: true
    });
  },
  inputSearch: function (e) {
    this.setData({
      searchWords: e.detail.value
    });
  },
  doSearch: function () {
    this.setData({
      showResult: true
    });
  },
  tapFilter: function (e) {
    switch (e.target.dataset.id) {
      case '1':
        this.data.shops.sort(function (a, b) {
          return a.id - b.id;
        });
        break;
      case '2':
        this.data.shops.sort(function (a, b) {
          return b.sales - a.sales;
        });
        break;
      case '3':
        this.data.shops.sort(function (a, b) {
          return a.distance - b.distance;
        });
        break;
    }
    this.setData({
      filterId: e.target.dataset.id,
      shops: this.data.shops
    });
  }
});

