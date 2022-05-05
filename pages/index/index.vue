<template>
  <view class="page-wrap">
    <view class="main-image">
      <image src="../../static/main.jpg" mode="scaleToFill" class="image"></image>
    </view>
    <view class="count-down-box">
      <view class="title">
        活动倒计时
      </view>
      <view class="count-down">
        <view class="count-down-num">
          03
        </view>
        <view class="count-down-text">
          天
        </view>
        <view class="count-down-num">
          15
        </view>
        <view class="count-down-text">
          :
        </view>
        <view class="count-down-num">
          24
        </view>
        <view class="count-down-text">
          :
        </view>
        <view class="count-down-num">
          21
        </view>
      </view>
      <view class="count-down-bottom">
        <view class="">
          已有 <text class="num">88</text> 人报名
        </view>
        <view class="right">
          浏览量
          88478
        </view>
      </view>
    </view>

    <view class="people-box-container">
      <view class="people-box">
        <view class="people-item" v-for="item in 30">
          <image src="../../static/profile.jpg" mode="aspectFit" class="people-profile"></image>
          <text class="people-label">花子-{{item}}</text>
        </view>
      </view>
    </view>

    <view class="people-group">
      <view class="people-group-box">
        <view class="people-group-item" v-for="item in 5">
          <image src="../../static/profile.jpg" class="people-profile" mode=""></image>
        </view>
      </view>
      <button class="people-group-button">
        还差2人 盼你如南方人判暖气
      </button>
    </view>

    <view class="bottom-image" v-for="item in 5">
      <image src="../../static/a1.jpg" mode="" class="bottom-image-item"></image>
      <image src="../../static/a2.jpg" mode="" class="bottom-image-item"></image>
    </view>

    <view class="bottom-button">
      <button class="cu-btn " @click="showModal('centerModal')">
        预付99元，3天内补齐全款生效
      </button>
    </view>

    <view class="cu-modal center-modal" :class="{show:modalName==='centerModal'}" @touchmove.stop.prevent="" @click="showModal()">
      <view class="cu-dialog"  @click.stop="">
        <view class="center-dialog">
          <view class="top">
            选择参与方式
          </view>
          <view class="center">
            <view class="contain people-group bg-white">
              <view class="people-group-box">
                <view class="people-group-item" v-for="item in 2">
                  <image src="../../static/profile.jpg" class="people-profile" mode=""></image>
                </view>
              </view>
              <view class="center-tip">
                <view class="tips">
                  此团仅剩2个名额，您现在付款即可加入此团
                </view>
              </view>
            </view>
            <view class="bottom">
              <button class="bg-gray button cu-btn" @click="showModal('bottomModal')">我要抢购</button>
              <button class="bg-red button cu-btn" @click="showModal('bottomModal')">加入TA</button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="cu-modal bottom-modal" :class="{show:modalName==='bottomModal'}" @touchmove.stop.prevent="" @click.stop="showModal()">
      <view class="cu-dialog" @click.stop="">
        <view class="bottom-dialog">
          <view class="title">
            请选择卡项(1/7)
          </view>
          <view class="goods-list">
            <uni-data-checkbox :multiple="true" selectedColor="#ff6060" selectedTextColor="#fff" v-model="selectedVal" :localdata="range" mode="tag" ></uni-data-checkbox>
          </view>
          <view class="bottom-button">
            <button class="cu-btn bg-red">下一步</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
        modalName: "",
        selectedVal:"",
        range: [{"value": 0,"text": "篮球"	},{"value": 1,"text": "足球"},{"value": 2,"text": "游泳"}]
      }
    },
    onLoad() {},
    methods: {
      showModal(e) {
        this.modalName = e
      },
    }
  }
</script>

<style lang="scss" scoped>
  .cu-modal{
    display: block;
  }
  .page-wrap {
    padding-bottom: 80px;
    position: relative;

    .main-image {
      width: 750rpx;

      .image {
        height: 1040rpx;
        width: 100%;
        margin: 0;
        padding: 0;
        display: block;
        // margin-top: -12px;
      }
    }

    .count-down-box {
      background-color: #232429;
      padding: 0 10px;

      .title {
        text-align: center;
        color: #fff;
        line-height: 2;
      }

      .count-down {
        display: flex;
        justify-content: center;

        &-num {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: linear-gradient(135deg, #f7e5c8, #af9b70);
          border-radius: 5px;
          font-weight: bold;
        }

        &-text {
          padding: 0 5px;
          line-height: 30px;
          text-align: center;
          color: #ab986d;
        }
      }

      .count-down-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #cbaa6f;
        padding-top: 5px;
        padding-bottom: 10px;
        margin-top: 10px;
        font-size: 12px;
        border-top: 1px solid #000;

        .num {
          font-size: 20px;
          font-weight: bold;
        }

        .right {
          color: #efddbe;
        }
      }
    }

    @keyframes slide-top {
      0% {
        transform: translateY(0);
      }

      15% {
        transform: translateY(0);
      }

      20% {
        transform: translateY(-50px);
      }

      35% {
        transform: translateY(-50px);
      }

      40% {
        transform: translateY(-100px);
      }

      55% {
        transform: translateY(-100px);
      }

      60% {
        transform: translateY(-150px);
      }

      75% {
        transform: translateY(-150px);
      }

      80% {
        transform: translateY(-200px);
      }

      95% {
        transform: translateY(-200px);
      }

      100% {
        transform: translateY(0);
      }
    }

    .people-box-container {
      height: 300px;
      overflow: hidden;
      position: relative;
    }

    .people-box {
      display: flex;
      flex-wrap: wrap;
      animation: slide-top 10s cubic-bezier(0.7, 1, 1, 1) infinite both;

      .people-item {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5px 0;

        .people-profile {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }

        .people-label {
          padding: 5px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }

    .people-group {
      background-color: #232429;
      padding: 0 20px 20px;

      &.bg-white {
        background-color: #fff;
      }

      .people-group-box {
        display: flex;
        // justify-content: space-around;
        padding: 15px 20px;

        .people-group-item {
          margin-right: 10px;

          .people-profile {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }

      .people-group-button {
        border-radius: 50px;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(to right, #dbbf93, #ecdfc9);
      }
    }

    .bottom-image {
      display: flex;
      flex-direction: column;

      .bottom-image-item {
        display: block;
        width: 100%;
        height: 300px;
      }
    }

    .bottom-button {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      width: 100vw;
      bottom: 0;
      left: 0;

      .cu-btn {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #f55a5b;
        color: #fff;
        border-radius: 10px 10px 0 0;
      }
    }

    .cu-dialog {
      border-radius: 0;
    }

    .center-dialog {

      .contain {
        padding: 10px;
      }

      .top {
        padding: 10px;
        height: 50px;
        background-color: #ec1f1a;
        color: #fff;
        text-align: left;
        display: flex;
        align-items: center;
        font-size: 18px;
      }

      .center-tip {
        position: relative;
        display: flex;
        justify-content: center;

        &:after {
          content: '';
          background-color: #ccc;
          height: 1px;
          width: calc(100% - 10px);
          position: absolute;
          left: 5px;
          top: 50%;
          z-index: 0;
        }

        .tips {
          color: #999;
          z-index: 10;
          background-color: #fff;
          padding: 0 5px;
        }
      }

      .bottom {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 20px 0;

        .button {
          width: 45%;
          margin: 0;
          border-radius: 0;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
        }

        .bg-gray {
          background-color: #d2d5d6;
          border-radius: 50px 0 0 50px;
        }

        .bg-red {
          background-color: #ec1f1a;
          border-radius: 0 50px 50px 0;
        }
      }

    }

    .bottom-dialog {
      .title {
        height: 50px;
        color: #fff;
        text-align: center;
        line-height: 50px;
        background: linear-gradient(to right, #ff6060, #ff4a49);
      }
      
      .goods-list{
        padding: 10px 20px;
      }
      .bottom-button{
        position: relative;
        .bg-red{
          background-color: #ff6060;
          border-radius: 50px;
          height: 40px;
          line-height: 40px;
          width: 90%;
        }
      }
    }
  }
</style>
