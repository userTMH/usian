<template>
  <view class="page-container">
    <view class="entry-list">
      <uni-list :border="false" style="width: 95%; margin: 10px;">
        <uni-list-item v-for="(item, index) in entryList" :key="index" :to="item.to" :showArrow="item.showArrow"
          :title="item.title" />
      </uni-list>
    </view>
    <button class="exip" @click="exip">退出</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type entryListType = {
  to: string
  showArrow: boolean
  title: string
}
const entryList = ref<entryListType[]>([
  {
    to: '',
    showArrow: true,
    title: '换绑手机',
  },
  {
    to: '',
    showArrow: true,
    title: '修改密码',
  },
  {
    to: '',
    showArrow: true,
    title: '消息通知设置',
  },
  {
    to: '',
    showArrow: true,
    title: '修改密码',
  },
  {
    to: '',
    showArrow: true,
    title: '清理缓存',
  },
])
const exip = () => {
  localStorage.removeItem('user')
  uni.redirectTo({
    url: '/pages/login/login',
  })
}
</script>

<style lang="scss" scoped>
.exip {
  width: 95%;
  background-color: #fff;
  border: 0;
}
</style>
