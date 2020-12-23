<template>
  <div id="appp">
    <div style="width: 1200px; margin: 0 auto;">
      <div class="page-title">热门城市</div>
      <!--          傳入images網址參數  config設定參數  顯示默認(default)插槽名字(image)-->
      <cascade-gallery :images="images" :config="config" v-slot:default="image">
        <div class="test-title-class">
          <!-- 依序images陣列依序index取的TitleText-->
          {{ images[image.index].data['my-custom-2'] | cutLongText(20) }}
        </div>
        <div class="test-description-class">
          <div style="padding: 10px;">
            <!-- image依序index取的getDescriptionText-->
            {{ images[image.index].data['my-custom-1'] | cutLongText(95) }}
            <br />
            <br />
            <!--a class="test-link-class" href="/flight-check">GO</a-->
            <Tag @click.native="log(images[image.index].data['my-custom-2'])">去这里</Tag>
          </div>
        </div>
      </cascade-gallery>
      <br />
      <br />
      <hr color="#ccc" size="1px" />
      <br />
      <br />
      <button class="test-big-button-class" @click="addImages()">查看更多</button></button>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import CascadeGallery from 'cascade-gallery'
export default {
  name: 'HomePage',
  data () {
    let images = []
    // 表示一開始只顯示26筆資料
    for (let iterator = 0; iterator <= 25; iterator++) {
      images.push(this.generateRandomImageConfig(iterator % 16))
    }
    return {
      images: images,
      config: {
        'width-range': {
          min: 250,
          max: 400
        },
        'height-range': {
          min: 200,
          max: 350
        },
        gap: 10
      },
      number: 0
    }
  },
  components: {
    'cascade-gallery': CascadeGallery
  },
  mounted () {
    this.number = 0
  },
  methods: {
    addImages () {
      // 點擊"看更多"後會隨意產生3-25之間的筆數->看更多顯示10筆、8筆、24筆隨意筆數等等
      let amount = this.getRandomNumber(3, 25)
      for (let iterator = 1; iterator <= amount; iterator++) {
        this.images.push(this.generateRandomImageConfig(iterator % 8))
      }
    },
    generateRandomImageConfig (num) {
      return {
        // 取得照片網址
        src: this.getImages(num),
        // 取的標題和簡介等資料
        data: {
          'my-custom-1': this.getDescriptionText(num),
          'my-custom-2': this.getTitleText(num)
        }
      }
    },
    getImages (num) {
      let images = []
      // 先產出10張照片
      for (let iterator = 1; iterator <= 10; iterator++) {
        // 設定寬度區間
        // let width = this.getRandomNumber(700, 800)
        // 設定高度區間
        // let height = this.getRandomNumber(500, 700)
        // 這邊會設定寬度高度是為了產生不同張照片
        let urls = [
          'https://s3.ax1x.com/2020/12/23/rcFBwD.jpg',
          'https://s3.ax1x.com/2020/12/23/rcFUQx.jpg',
          'https://s3.ax1x.com/2020/12/23/rcFYWR.jpg',
          'https://s3.ax1x.com/2020/12/23/rcFNS1.jpg',
          'https://s3.ax1x.com/2020/12/23/rcFJY9.jpg',
          'https://s3.ax1x.com/2020/12/23/rcFdOK.jpg',
          'https://s3.ax1x.com/2020/12/23/rcFay6.jpg',
          'https://s3.ax1x.com/2020/12/23/rcF0eO.jpg',
          'https://s3.ax1x.com/2020/12/23/rcVzK1.jpg',
          'https://s3.ax1x.com/2020/12/23/rcVj29.jpg',
          'https://s3.ax1x.com/2020/12/23/rcZPUO.jpg',
          'https://s3.ax1x.com/2020/12/23/rcVX8J.jpg',
          'https://s3.ax1x.com/2020/12/23/rcVvvR.jpg',
          'https://s3.ax1x.com/2020/12/23/rcZSDx.jpg',
          'https://s3.ax1x.com/2020/12/23/rcZCVK.jpg',
          'https://s3.ax1x.com/2020/12/23/rcZi5D.jpg'
        ]
        let url = urls[num]
        // let url = 'http://placekitten.com/' + width + '/' + height
        // let urll = require(base + '/' + i + '.jpg')
        images.push(url)
      }
      console.log(num)
      return images
    },
    getTitleText (num) {
      let titleTxT = ['北京', '成都', '东京', '桂林', '哈尔滨', '普吉岛', '厦门', '新加坡',
        '纽约', '三亚', '上海', '苏州', '西藏', '香港', '九寨沟', '南宁' ]
      return titleTxT[num]
    },
    getDescriptionText (num) {
      let titleTxT = ['北京', '成都', '东京', '桂林', '哈尔滨', '普吉岛', '厦门', '新加坡',
        '纽约', '三亚', '上海', '苏州', '西藏', '香港', '九寨沟', '南宁' ]
      return titleTxT[num]
    },
    getRandomNumber (min, max) {
      // 隨機產生一組min、max之間的數值
      return Math.floor(Math.random() * (max - min)) + min
    },
    log (place) {
      console.log(place)
      this.$store.commit('setGoto', place)
      this.$router.push({
        name: '航班查看'
      })
    }
  },
  filters: {
    cutLongText: function (text, maxLength) {
      // 會將text字數控制在maxLength內，超過的內容就顯示"..."
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'
      }
      return text
    }
  }
}
</script>

<style>
#appp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.page-title {
  font-size: 54px;
  text-align: center;
  padding: 45px 0 25px 0px;
  color: #d14992;
}
.page-description {
  font-family: "Hind Siliguri", sans-serif;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.14);
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  -webkit-box-shadow: 0px 7px 5px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 7px 5px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 7px 5px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 55px;
  padding: 0px 25px 25px 25px;
  text-align: center;
}
.test-title-class {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 38px;
  background: rgba(0, 0, 0, 0.45);
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  font-family: "Hind Siliguri", sans-serif;
  font-size: 18px;
  text-align: center;
  line-height: 20px;
}
.test-description-class {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  font-family: "Hind Siliguri", sans-serif;
  font-size: 14px;
  line-height: 18px;
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  border-top: 3px solid rgba(0, 0, 0, 0.7);
  padding: 0px;
  max-height: 0;
  -webkit-transition: all 0.55s linear;
  -moz-transition: all 0.55s linear;
  -o-transition: all 0.55s linear;
  transition: all 0.55s linear;
}
.cgl-image-wrapper:hover .test-description-class {
  max-height: 100%;
}
.test-big-button-class {
  display: block;
  font-family: "Hind Siliguri", sans-serif;
  font-size: 24px;
  background: rgba(223, 234, 240, 1);
  background: -moz-linear-gradient(
    top,
    rgba(223, 234, 240, 1) 0%,
    rgba(192, 208, 219, 1) 50%,
    rgba(139, 178, 201, 1) 51%,
    rgba(224, 239, 249, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(223, 234, 240, 1)),
    color-stop(50%, rgba(192, 208, 219, 1)),
    color-stop(51%, rgba(139, 178, 201, 1)),
    color-stop(100%, rgba(224, 239, 249, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(223, 234, 240, 1) 0%,
    rgba(192, 208, 219, 1) 50%,
    rgba(139, 178, 201, 1) 51%,
    rgba(224, 239, 249, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(223, 234, 240, 1) 0%,
    rgba(192, 208, 219, 1) 50%,
    rgba(139, 178, 201, 1) 51%,
    rgba(224, 239, 249, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(223, 234, 240, 1) 0%,
    rgba(192, 208, 219, 1) 50%,
    rgba(139, 178, 201, 1) 51%,
    rgba(224, 239, 249, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(223, 234, 240, 1) 0%,
    rgba(192, 208, 219, 1) 50%,
    rgba(139, 178, 201, 1) 51%,
    rgba(224, 239, 249, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dfeaf0', endColorstr='#e0eff9', GradientType=0 );
  border: 1px solid rgba(0, 0, 0, 0.03);
  height: 50px;
  width: 300px;
  color: #ffffff;
  font-weight: bold;
  margin: 0 auto;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  outline: none;
}
.test-link-class {
  font-family: "Hind Siliguri", sans-serif;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 3px;
  color: #ffffff;
  font-weight: bold;
  margin: 0 auto;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  text-decoration: none;
  padding: 0px 10px;
}
.test-link-class:hover {
  background: rgba(0, 0, 0, 0.75);
}
</style>
