Page({
  data: {
    latitude: 36.239587,
    longitude: 120.020353,
    markers: [{
      id: 1,
      latitude: 36.239587,
      longitude: 120.020353,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 36.239587,
      longitude: 120.020353,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]
  },
  mape:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 36.239587,
        longitude: 120.020353,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})