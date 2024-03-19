<template>
  <scroll-view class="box" :refresher-triggered="isTriggered" refresher-background="#f5f5f5" refresher-enabled
    @refresherrefresh="onScrollViewRefresh" @scrolltolower="onScrollToLower" :ellipsis="1" :scroll-y="true">
    <view class="scroll-view-wrapper">
      <p><uni-icons type="clear" size="30"></uni-icons>全部已读</p>
      <!-- <view v-for="(item, index) in 100" :key="index">{{ index }}</view> -->
      <uni-list class="uni-list" v-for="(item, index) in announList" :key="index">
        <view class="uni-top">
          <view>{{ item.title }}</view>
          <view v-show="item.isRead == 0" class="uni-list-top"></view>
        </view>
        <view class="transport">{{ item.content }}</view>
        <view class="uni-list-botton">
          <view>{{ item.created }}</view>
          <view class="View" @click="System">查看详情</view>
        </view>
      </uni-list>
    </view>
  </scroll-view>
</template>
<script setup lang='ts'>
import { message } from '@/api/message';
import type { Item } from '@/api/types/message-type'
import { reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
//
const contentType = ref(201)
//
const page = ref(1)
//
const pageSize = ref(5)
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
    console.log(res);

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

const onScrollToLower = () => {
  // 如果没有数据,则不进行请求数据
  if (!hasMore.value) return
  // 继续请求数据
  getmessage()
}
onLoad(() => {
  getmessage()
})
const System = () => {
  uni.navigateTo({
    url: '/subpkg_message/announcements/index',
  })
}
</script>
<style lang='scss' scoped>
.uni-list {
  width: 80%;
  height: 150px;
  padding: 20px;
  margin: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .transport {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ccc;
  }

  .uni-top {
    display: flex;
    align-items: center;

    .uni-list-top {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: red;
    }
  }


  .uni-list-botton {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ccc;

    .View {
      width: 70px;
      border-radius: 30px;
      color: red;
      font-size: 12px;
      border: 1px solid red;
      padding: 5px;
      text-align: center;
    }
  }
}

.box {
  height: calc(100vh - 130px);
  background-color: #f5f5f5;
  overflow: auto;
}
</style>
