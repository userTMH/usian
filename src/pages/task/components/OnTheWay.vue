<template>
  <view class="OnTheWay">
    <scroll-view class="scroll" :scroll-y="true" :refresher-triggered="scrollinto" refresher-enabled
      @refresherrefresh="scrollintoview" refresher-background="#f5f5f5" @scrolltolower="onScrollToLower">
      <view class="scroll-text" v-for="(item, index) in taskList" :key="index" @click="detail(item.id)">
        <view class="text-top">
          <view>
            任务编号：{{ item.transportTaskId }}
          </view>
          <view>
            <view v-show="item.actualArrivalTime > item.planArrivalTime" class="text-top-right">已延迟</view>
          </view>
        </view>
        <view class="text-content">
          <view class="text-content-top">
            <view class="rise">起</view>
            <view>{{ item.startAddress }}</view>
          </view>
          <view class="empty"></view>
          <view class="text-content-botton">
            <view class="stop">止</view>
            <view>{{ item.endAddress }}</view>
          </view>
        </view>
        <view class="text-botton">
          <view class="text-botton-left">
            <view>提货时间</view>
            <view>{{ item.planArrivalTime }}</view>
          </view>
          <view>
            <button class="Delivery" @click="add" :disabled="!item.enablePickUp" type="warn">交付</button>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- <view v-if=" == 0">
      <uni-icons type="contact" size="30"></uni-icons>
      暂无数据
    </view> -->
  </view>
</template>
<script setup lang='ts'>
import { task } from '@/api/task'
import type { TaskItemType } from '@/api/types/task-type'
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const page = ref<number>(1)
const pageSize = ref<number>(5)
const status = ref(2)
//判断是否还有数据
const hasMore = ref(true)
//下拉刷新状态
const scrollinto = ref(false)
//存放数据
const taskList = ref<TaskItemType[]>()
//获取数据
const getTask = async () => {
  try {
    const res = await task({
      page: page.value,
      pageSize: pageSize.value,
      status: status.value
    })
    console.log(res);
    // if (res.code != 200) {
    //   uni.utils.toast('获取失败')
    // }
    if (page.value == 1) {
      taskList.value = []
    }
    taskList.value = [...taskList.value || [], ...res.data.items || []]

    page.value++

    if (page.value > res.data.pages) {
      hasMore.value = false
    }

  } catch (error) {
    console.log(error);

  }
}
const scrollintoview = async () => {
  scrollinto.value = true
  page.value = 1
  await getTask()
  scrollinto.value = false
}
const onScrollToLower = () => {
  if (!hasMore.value) {
    return
  }
  getTask()
}
//详情事件
const detail = (id: string) => {
  uni.navigateTo({
    url: `/subpkg_task/detall/index?id=${id}`,
  })
}
//提货事件
const add = () => {

}

onLoad(() => {
  getTask()
})
</script>
<style lang='scss' scoped>
.PendingPickup {
  height: calc(100vh - 90px);
  background-color: #f5f5f5;
}

.Delivery {
  width: 80px;
  background-color: red;
  border-radius: 30px;
  font-size: 12px;
}

.scroll {
  height: calc(100vh - 90px);

  .scroll-text {
    width: 85%;
    padding: 15px;
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;

    .text-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text-top-right {
        padding: 5px;
        border: 1px solid #000;
        border-radius: 15px;
        font-size: 12px;
      }
    }

    .text-content {
      width: 100%;
      height: 80px;
      padding: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      font-size: 12px;
      text-align: center;
      color: #969696;

      .text-content-top {
        display: flex;

        .rise {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #000;
          color: #fff;
          margin-right: 10px;
        }
      }

      .text-content-botton {
        display: flex;

        .stop {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: red;
          color: #fff;
          margin-right: 10px;
        }
      }

      .empty {
        width: 1px;
        height: 30px;
        position: absolute;
        left: 20px;
        top: 35px;
        border-left: 1px dashed #ccc;
      }
    }

    .text-botton {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
