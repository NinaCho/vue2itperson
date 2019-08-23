/**
 * ImgEditor - Component
 *
 * @desc
 * @author    中文名(English name) <xxx@xxx.com>
 * @date      2019-08-21
 */


Component({
  options: {},
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 页面的初始数据
   */
  data: {
    currentVlaue: '', // 当前焦点所在的输入框的内容
    currentCursor: 0, // 当前焦点的位置（失去焦点时）
    currentIndex: 0, // 当前输入框属于第几个元素
    autoheight: true, // 输入框处于第一个位置的时候，设置固定高度，超过三行高度的时候自动增高
    areaHeight: 667,
    windowWidth: 375,
    dataAry: [{
      'type': 1, // 1: 字符串 2：图片 
      'value': ''
    }, 
    ], //输入元素的数组
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ready: function(option) {
    var that = this
    // 获取手机型号  待定待定待定待定待定
    wx.getSystemInfo({
      success(res) { // 375 * 667
        let windowHeight = (res.windowHeight * (667 / res.windowWidth))
        let areaHeight = windowHeight - 375
        that.setData({
          areaHeight: areaHeight,
          windowWidth: res.windowWidth - 30
        })
      },
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框失去焦点时触发
    bindblur(e) {
      console.log(e);
      let item = this.data.dataAry[this.data.currentIndex]
      if (item != undefined) {
        var dic = {
          'type': 1,
          'value': this.data.currentVlaue
        }
        this.data.dataAry.splice(this.data.currentIndex, 1, dic)
      } else {
        var dic = {
          'type': 1,
          'value': this.data.currentVlaue
          }
        this.data.dataAry.push(dic)
      }
      this._checkEditData(res=>{})
    },
    // 输入框输入时触发
    bindinput(e) {
      console.log(e);
      this.setData({
        currentVlaue: e.detail.value,
        currentCursor: e.detail.cursor, //  获取焦点的位置
        currentIndex: e.currentTarget.dataset.index // 当前输入框属于第几个元素
      })
      let item = this.data.dataAry[this.data.currentIndex]
      var dic = {
        'type': 1,
        'value': this.data.currentVlaue
      }
      this.data.dataAry.splice(this.data.currentIndex, 1, dic)
      this._checkEditData(res => { })
    },
    // 输入框行数变化时触发
    bindlinechange(e) {
      // 当前输入框行数 待定待定待定待定待定
      // debugger
      var lineHeight = e.detail.height * (750 / this.data.windowWidth)
      console.log(lineHeight, this.data.areaHeight)
      // 当前输入框处于的位置
      var index = e.currentTarget.dataset.index
      // 判断当前输入框是否处于第一个位置，是的话，超过行数，则改变aotoheight值为true
      if (index == 0) {
        // debugger
        if (lineHeight > this.data.areaHeight) {
          this.setData({
            autoheight: true,
            // areaHeight: lineHeight
          })
        } else {
          this.setData({
            autoheight: false,
            areaHeight: this.data.areaHeight
          })
        }
      }
    },
    // 获取当前图片index
    getIndex() {
      let index = this.data.dataAry.length;
      return index
    },
    // 计算图片宽度  
    getWidth(width) {
      if (width >= this.data.windowWidth) {
        width = this.data.windowWidth
      }
      return width
    },
    // 画图片
    drawImage(item) {
      const that = this;
      const index = that.getIndex()
      wx.getImageInfo({ // 获取图片info
          src: item.path,
          success(res) {
            var ctx = wx.createCanvasContext('canvas' + index, that);
            // 设置canvas尺寸
            console.log(res.height)
            console.log(res.width)
            var towidth = that.getWidth(res.width)          // 按屏幕宽度-30的比例压缩
            var toheight = Math.trunc(towidth * res.height / res.width);    // 根据图片比例换算出图片高度
            // debugger
            item.toWidth = towidth
            item.toHeight = toheight
            item.index = index
            ctx.drawImage(item.path, 0, 0, res.width, res.height, 0, 0, towidth, toheight)
            //  debugger
            ctx.draw(false, () => {
                wx.canvasToTempFilePath({
                  canvasId: 'canvas',
                  fileType:"jpg",
                  success(res) {
                      console.log(res)
                  }
                })
            })
            that._dealDataArray(item.path, item, 1)
          }
        })
    },
    // 拍照
    takePhoto() {
      const that = this;
      // 超过二十张 return 
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // 选择压缩后的图片
        sourceType: ['album', 'camera'],
        success(photo) {
          // console.log(photo);
          photo.tempFiles.map((item) => {
            that.drawImage(item)
          })
        },
      })
    },
    // 点击重新上传图片
    imgUploadAginEvent(e) {
     // TO DO
    },
    // 图片删除
    deleteImg(e) {
      var index = e.currentTarget.dataset.index;
      var imgItem = this.data.dataAry[index]
      var imgUrl = imgItem.value

      var before = this.data.dataAry[index - 1]
      var middle = this.data.dataAry[index + 1]
      //图片前后都有数据存在
      if (before != undefined && middle != undefined) {
        //删除图片的前后都是文字时
        if (before.type == 'string' && middle.type == 'string') {
          var string = before.value + middle.value
          var after = {
            'type': 'string',
            'value': string
          }
          this.data.dataAry.splice(index - 1, 3, after)
        } else { //删除图片前后是图片和文字时
          this.data.dataAry.splice(index, 1)
        }
      } else { //图片前面没有数据时
        this.data.dataAry.splice(index, 1)
      }
      this.setData({
        dataAry: this.data.dataAry,
        currentIndex: this.data.currentIndex - 1
      })
      this._checkEditData(res => { })
    },
    // 对文本编辑的内容进行提交
    submit(e) {
      // 判断当前编辑是否有内容，图片是否都已经上传
      this._checkEditData(res => {
        if(res.length <= 0){
          console.info('提交', this.data.dataAry)
          // 提交按钮回调 待定
          this.triggerEvent('submit', this.data.dataAry)
        } else {
          // TO DO 无提交内容提示
        }
      })
    },
    /********************************私有方法***************************************** */
    /** 
     * 根据焦点位置插入图片, 选择图片或者拍照成功后触发
     * imgPath: 图片路径本地
     * imgUrl :图片上传后返回地址
     * state: 图片的上传状态，-1:上传失败，0:未做上传操作，1:上传成功
     */
    _dealDataArray(imgPath, imgUrl, state) {
      // 取出当前插入图片位置的输入框内容，在焦点位置将输入框内容分为两个元素，只在焦点后插入图片元素
      // debugger
      const currentCursor = this.data.currentCursor
      var item = this.data.dataAry[this.data.currentIndex]
      var index = this.data.currentIndex
      if (item.type == 1) { // 文字中插入图片
        var before = {
          'type': 1,
          'value': this.data.currentVlaue.substring(0, currentCursor)
        }
        var middle = {
          'type': 2,
          'value': '上传后地址',
          'imgPath': imgPath,
          'imgUrl': imgUrl,
          'uploadState': state
        }
        var after = {
          'type': 1,
          'value': this.data.currentVlaue.substring(currentCursor, this.data.currentVlaue.length)
        }
        console.log(before, middle, after)

        if (before.value.length > 0 && after.value.length > 0) { // 图片前后文字都存在
          this.data.dataAry.splice(this.data.currentIndex, 1, before, middle, after)
          index = index + 1;
        } else if (before.value.length > 0 && after.value.length <= 0) { // 图片只在文字后面
          if(this.data.currentIndex == this.data.dataAry.length - 1) { // 如果当前插入图片的文字处于最后一个元素，则要在最后添加一个输入框
            this.data.dataAry.splice(this.data.currentIndex + 1, 0, middle, after)
          } else { // 如果不是最后一个元素，则直接添加图片
            this.data.dataAry.splice(this.data.currentIndex + 1, 0, middle)
          }
          index = index + 1
        } else if (after.value.length > 0 && before.value.length <= 0) { //图片加在文字前面
          this.data.dataAry.splice(this.data.currentIndex, 1, middle, before)
        } else { // 一开始就插入图片，要在图片数据后面插入一个空的输入框
          this.data.dataAry.splice(this.data.currentIndex, 1, middle, before)
          index = index + 1
        }
        this.setData({
          dataAry: this.data.dataAry,
          currentIndex: index
        })
      } else { // 图片后面插入图片
        var middle = {
          'type': 2,
          'value': '上传后地址',
          'imgPath': imgPath,
          'imgUrl': imgUrl,
          'uploadState': state
        }
        // 在上一张图片后面插入一张图片，需要index+1
        this.data.dataAry.splice(this.data.currentIndex + 1, 0, middle)
        this.setData({
          dataAry: this.data.dataAry,
          currentIndex: this.data.currentIndex + 1
        })
      }
      // 判断当前数据是否可以提交
      this._checkEditData(res => { })
    },
    // 图片上传到服务器，服务器返回多个图片地址
    _uploadImage(filePath, callBack) {
      // TO DO
    },
    // 图片资源转换成base64
    _imageToBase64(filePath, callBack) {
      // TO DO
    },
    // 判断编辑数据是否可以提交
    _checkEditData(callBack){
      var error = ''
      if (this.data.dataAry.length === 1) { // 什么都没操作情况下点击提交按钮
       // 如果数据源中只有一个元素，需要判断这个元素是否有值
        let strItem = this.data.dataAry[0]
        if (strItem.value.length == 0) {
          error = '请输入内容xxxx'
        }
      } else {
        for (let item of this.data.dataAry) {
          // for循环判断图片数据，只要有一张图片未上传成功，就提交不了
          if (item.type == 'image') {
            if (item.uploadState == -1) {
              // 有图片没有上传成功，提示
              error = '有图片没有上传，请重新上传'
            }
          }
        }
      }
      callBack(error)
    }
  }
})