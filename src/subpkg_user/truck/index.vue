<template>
  <view class="page-container">
    <view class="obj">

      <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
        <swiper-item v-for="(item, index) in truckInfo?.pictureList" :key="index">
          <view class="swiper-item uni-bg-red">
            <image class="img" :src="item.url" mode="scaleToFill" />
          </view>
        </swiper-item>
      </swiper>
      <view class="text img">
        <view class="rex">
          <p class="left">车辆编号</p>
          <p class="right">{{ truckInfo?.id }}</p>
        </view>
        <view class="rex">
          <p class="left">车辆号牌</p>
          <p class="right">{{ truckInfo?.licensePlate }}</p>
        </view>
        <view class="rex">
          <p class="left">车型</p>
          <p class="right">{{ truckInfo?.truckType }}</p>
        </view>
        <view class="rex">
          <p class="left">所属机构</p>
          <p class="right">{{ truckInfo?.currentOrganName }}</p>
        </view>
        <view class="rex">
          <p class="left">载重</p>
          <p class="right">{{ truckInfo?.allowableLoad.replace(".00", "") }}吨</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { responseTruckType } from '@/api/types/login-type.ts'
import { truck } from '@/api/login'
import { onLoad } from '@dcloudio/uni-app'
// 保存车辆信息变量
let truckInfo = ref<responseTruckType>()

// 获取车辆信息方法
const getTruckInfo = async () => {
  try {
    const res = await truck()
    console.log('res=>', res)
    truckInfo.value = res.data
  } catch (error) {
    console.log('error', error)
  }
}

onLoad(() => {
  getTruckInfo()
})
</script>

<style lang="scss" scoped>
.obj {
  padding: 10px;

  .img {
    width: 100%;
    border-radius: 10px;
  }

  .text {
    width: 90%;
    background-color: #fff;
    padding: 20px;
    margin: 10px 0px;

    .left {

      color: #ccc;
    }

    .rex {
      margin: 10px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
