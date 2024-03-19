<template>
  <view class="Latepickup">
    <view class="box">
      <view class="box-top">
        <view>原定时间</view>
        <view class="top-right">{{ time }}</view>
      </view>
      <view class="box-top">
        <view>延迟时间</view>
        <view class="top-right">
          <view>不可超过2个小时</view>
          <uni-icons type="right" size="12" color="#ccc"></uni-icons>
        </view>
      </view>
      <view class="textarea">
        <textarea @input="Delayc(delay.length)" class="uni-title" v-model="delay" name="" id="" cols="30" rows="10"
          placeholder="请输入延迟提货原因">
        </textarea>
        <view class="title-botton-right">{{ Delay }}/50</view>
      </view>
      <view>
        <button class="botton">提交</button>
      </view>
    </view>
  </view>
  <view class="uni-title uni-common-pl">日期选择器</view>
  <view class="uni-list">
    <view class="uni-list-cell">
      <view class="uni-list-cell-left">
        当前选择
      </view>
      <view class="uni-list-cell-db">
        <picker mode="date" value="currentDate">
          <view class="uni-input"></view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
//原定时间
const time = ref<string>()
//延迟提货原因数据
const delay = ref<string>("")
//延迟提货原因数据长度
const Delay = ref<number>(0)
//键盘输入事件
const Delayc = (length: number) => {
  Delay.value = length
}

onLoad((options) => {
  time.value = options?.time

})
</script>

<style scoped>
.Latepickup {
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: #f5f5f5;
  padding: 10px;
}

.box {
  width: 85%;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;

  .box-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 20px 0px;
    font-size: 12px;

    .top-right {
      display: flex;
      align-items: center;
      color: #ccc;
    }
  }

  .textarea {
    position: relative;

    .uni-title {
      height: 100px;
      background-color: #f5f5f5;
      margin: 10px 0px;
      padding: 10px;
      border-radius: 5px;
    }

    .title-botton-right {
      color: #909090;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }

  .botton {
    width: 200px;
    border-radius: 20px;
    border: 0;
    color: #fff;
    background-color: #f9dcd8;
  }
}
</style>
