<template>
  <scroll-view class="box" :refresher-triggered="isTriggered" refresher-background="#f5f5f5" refresher-enabled
    @refresherrefresh="onScrollViewRefresh" @scrolltolower="onScrollToLower" :ellipsis="1" :scroll-y="true">
    <view class="scroll-view-wrapper">
      <p><uni-icons type="clear" size="30"></uni-icons>全部已读</p>
      <!-- <view v-for="(item, index) in 100" :key="index">{{ index }}</view> -->
      <uni-list @click="System" v-for="(item, index) in announList" :key="index">
        <uni-list-item :title="item.title" :rightText="item.created">
        </uni-list-item>
      </uni-list>
    </view>
  </scroll-view>
</template>
<script setup lang='ts'>
import { message } from '@/api/message';
import type { Item } from '@/api/types/message-type'
import { reactive, ref } from 'vue';
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
//
const contentType = ref(200)
//
const page = ref(1)
//
const pageSize = ref(10)
//保存数据
const announList = ref<Item[]>()
// 是否是空列表
const isEmpty = ref(false)
// 下拉刷新状态
const isTriggered = ref(false)
// 是否还有数据的状态
const hasMore = ref(true)
const getmessage = async () => {
  try {
    const res = await message({
      contentType: contentType.value,
      page: page.value,
      pageSize: pageSize.value
    })

    if (res.code != 200) {
      console.log('获取数据失败，稍后请重试');
    }
    if (page.value == 1) {
      announList.value = []
    }
    announList.value = [...(announList.value as Item[]), ...res.data.items]

    page.value++
    if (page.value > res.data.pages) {
      hasMore.value = false
    }

  } catch (error) {
    console.log('error', error)
  }
}
// 下拉刷新
const onScrollViewRefresh = async () => {
  isTriggered.value = true
  page.value = 1
  await getmessage()
  isTriggered.value = false
}
//上拉加载更多
const onScrollToLower = () => {
  // 如果没有数据,则不进行请求数据
  if (hasMore.value) return
  // 继续请求数据
  getmessage()
}
//详情事件
const System = () => {
  uni.navigateTo({
    url: '/subpkg_message/announcements/index',
  })
}

onLoad(() => {
  getmessage()
})
</script>
<style lang='scss' scoped>
.box {
  height: calc(100vh - 120px);
  background-color: #f5f5f5;
  overflow: auto;
}
</style>
