<template>
  <view class="Report">
    <view class="box">
      <uni-list-item title="异常时间" rightText="请选择" link></uni-list-item>
      <uni-list-item title="上报位置" rightText="请选择" link></uni-list-item>
      <uni-list-item title="异常类型" rightText="请选择" link></uni-list-item>
      <view>
        <view>异常描述</view>
        <view class="textarea">
          <textarea @input="Delayc(delay.length)" class="uni-title" v-model="delay" name="" id="" cols="30" rows="10"
            placeholder="请输入延迟提货原因">
            </textarea>
          <view class="title-botton-right">{{ Delay }}/50</view>
        </view>
      </view>
      <view>
        <uni-file-picker limit="6" title="上传图片(最多6张)"></uni-file-picker>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

//延迟提货原因数据
const delay = ref<string>("")
//延迟提货原因数据长度
const Delay = ref<number>(0)
//键盘输入事件
const Delayc = (length: number) => {
  Delay.value = length
}
</script>

<style lang='scss' scoped>
.Report {
  height: calc(100vh - 44px);
  padding: 10px;
  background-color: #f5f5f5;
}

.box {
  width: 95%;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
}

.textarea {
  position: relative;

  .uni-title {
    width: 95%;
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
</style>
