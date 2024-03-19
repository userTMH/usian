<template>
  <view class="task">
    <view class="top">
      <view class="top-text" v-for="(item, index) in topList" :key="index">
        <view @click="dot(index)">{{ item.title }}</view>
        <view v-if="act == index" class="top-botton"></view>
      </view>
    </view>
    <view class="content">
      <Pending v-if="act == 0"></Pending>
      <OnThe v-if="act == 1"></OnThe>
      <Done v-if="act == 2"></Done>
    </view>
  </view>
</template>

<script setup lang="ts">
import Pending from './components/PendingPickup.vue'
import OnThe from './components/OnTheWay.vue'
import Done from './components/Done.vue'
import { reactive, ref } from 'vue';
const topList = reactive([
  {
    title: "待提货",
    id: 0
  },
  {
    title: "在途",
    id: 1
  },
  {
    title: "已完成",
    id: 2
  },
])
let act = ref<number>(0)

const dot = (id: number) => {
  act.value = id
  // console.log(act.value);

}

</script>

<style scoped>
.top {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;

  .top-text {
    margin: 0px 20px;
    text-align: center;

    .top-botton {
      width: 20px;
      height: 3px;
      margin: auto;
      border-radius: 5px;
      background-color: red;
    }
  }
}

.content {
  flex: 1;
}
</style>
