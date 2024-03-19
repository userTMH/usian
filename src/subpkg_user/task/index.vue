<template>
  <view class="page-container">
    <view class="month-overview">
      <view class="title">本月任务</view>
      <view class="content">
        <view class="item">
          <text class="volumn">{{ truckInfo?.taskAmounts }}</text>
          <text class="label">任务总量</text>
        </view>
        <view class="item">
          <text class="volumn">{{ truckInfo?.completedAmounts }}</text>
          <text class="label">完成任务量</text>
        </view>
        <view class="item">
          <text class="volumn">{{ truckInfo?.transportMileage }}</text>
          <text class="label">运输里程(km)</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { responseTaskReportType } from '@/api/types/login-type.ts'
import { taskReport } from '@/api/login'
import { onLoad } from '@dcloudio/uni-app'
let truckInfo = ref<responseTaskReportType>()

const getTruckInfo = async () => {
  try {
    const res = await taskReport({
      month: "07",
      year: "2022"
    })
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
.month-overview {
  height: 268rpx;
  margin: 0 30rpx;
  border-radius: 16rpx;
  background-color: #fff;
  position: relative;
  top: -130rpx;

  .title {
    color: $uni-secondary-color;
    font-size: $uni-font-size-small;
    padding-top: 28rpx;
    text-align: center;

    &::after,
    &::before {
      content: '-';
      margin: 0 5rpx;
    }
  }

  .content {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: $uni-font-size-small;
    color: $uni-main-color;
    margin-top: 40rpx;

    .volumn {
      display: block;
      font-size: 36rpx;
      margin-bottom: 20rpx;
      font-weight: 500;
    }
  }
}
</style>
