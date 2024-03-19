<template>
  <view>
    <view class="top">
      <view class="top-text">
        <view>
          <p @click="annu">公告</p>
          <p v-show="act == 0" class="but"></p>
        </view>
      </view>
      <view class="top-text">
        <view>
          <p @click="task">任务通知</p>
          <p v-show="act == 1" class="but"></p>
        </view>
      </view>
    </view>
    <view class="b" v-show="act == 0">
      <Announcement></Announcement>
    </view>
    <view class="b" v-show="act == 1">
      <Task></Task>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Announcement from './components/m-announcement.vue';
import Task from './components/m-task.vue'
let act = ref(0)
const annu = () => {
  act.value = 0

}
const task = () => {
  act.value = 1
}
</script>

<style scoped>
.top {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.top-text {
  width: 50%;
  text-align: center;
  position: relative;
}

.but {
  width: 30px;
  height: 5px;
  background-color: red;
  border-radius: 2px;
  margin-top: 5px;
  margin-left: 43%;
}

.b {
  flex: 1;
}
</style>
