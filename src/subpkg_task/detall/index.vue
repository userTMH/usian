<template>
  <view class="box">
    <view style="height: calc(100vh - 125px);overflow: auto;">
      <view class="scroll-text">
        <view class="text-top">
          <h3>
            基本信息
          </h3>
          <view>
            <uni-icons v-show="!hide1" @click="hide1 = !hide1" type="plusempty" size="30"></uni-icons>
            <view v-show="hide1" @click="hide1 = !hide1" style="font-size: 12px;">——</view>
          </view>
        </view>
        <view v-show="hide1">
          <view class="text-content">
            <view class="text-content-top">
              <view class="rise">起</view>
              <view> {{ detall?.startAddress }} </view>
            </view>
            <view class="empty"></view>
            <view class="text-content-botton">
              <view class="stop">止</view>
              <view> {{ detall?.endAddress }} </view>
            </view>
          </view>
          <view class="text">
            <view class="text-text">
              <view>任务编号</view>
              <view>{{ detall?.transportTaskId }}</view>
            </view>
            <view class="text-text">
              <view>联系人</view>
              <view>{{ detall?.finishHandoverName }} <uni-icons type="phone" size="30"></uni-icons></view>
            </view>
            <view class="text-text">
              <view>联系电话</view>
              <view>{{ detall?.finishHandoverPhone }}</view>
            </view>
            <view class="text-text">
              <view>提货时间</view>
              <view>{{ detall?.planDepartureTime }}</view>
            </view>
            <view class="text-text">
              <view>预计送达时间</view>
              <view>{{ detall?.actualArrivalTime }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="vehicle-text">
        <view class="text-top">
          <h3>
            车辆司机信息
          </h3>
          <view>
            <uni-icons v-show="!hide2" @click="hide2 = !hide2" type="plusempty" size="30"></uni-icons>
            <view v-show="hide2" @click="hide2 = !hide2" style="font-size: 12px;">——</view>
          </view>
        </view>
        <view v-show="hide2" class="text">
          <view class="text-text">
            <view>车牌号</view>
            <view class="text-right">{{ detall?.licensePlate }}</view>
          </view>
          <view class="text-text">
            <view>司机姓名</view>
            <view class="text-right">{{ detall?.driverName }}</view>
          </view>
        </view>
      </view>
      <view class="transport-text">
        <view class="text-top">
          <h3>
            运输路线
          </h3>
          <view>
            <uni-icons v-show="!hide3" @click="hide3 = !hide3" type="plusempty" size="30"></uni-icons>
            <view v-show="hide3" @click="hide3 = !hide3" style="font-size: 12px;">——</view>
          </view>
        </view>
        <view v-show="hide3" class="text">
          <view>
            <view class="province">{{ detall?.startProvince }}</view>
            <view>{{ detall?.startCity }}</view>
          </view>
          <image style="width: 50px;height: 20px;" src="../../static/img_jiantou.png" mode="scaleToFill" />
          <view>
            <view class="province">{{ detall?.endProvince }}</view>
            <view>{{ detall?.endCity }}</view>
          </view>
        </view>
      </view>
      <view class="goods-text">
        <view class="text-top">
          <view class="text-top-left">
            <h3>货物信息</h3>
            <view style="margin-left: 5px;">共计：{{ counts }}单 </view>
          </view>
          <view>
            <uni-icons v-show="!hide4" @click="hide4 = !hide4" type="plusempty" size="30"></uni-icons>
            <view v-show="hide4" @click="hide4 = !hide4" style="font-size: 12px;">——</view>
          </view>
        </view>
        <view v-show="hide4" class="text">
          <view class="text-sou">
            <input class="inputbox" placeholder="输入运单号" />
            <uni-icons class="sou" type="search" size="20"></uni-icons>
          </view>
          <scroll-view scroll-y class="scroll-view">
            <view class="text-list" v-for="(item, index) in goods" :key="index">
              <view>{{ item.id }}</view>
              <view>{{ item.count }}件</view>
              <view>{{ item.totalWeight }}kg</view>
            </view>
          </scroll-view>
        </view>
      </view>
      <view class="Delivery-text">
        <view class="text-top">
          <h3>提货信息</h3>
          <view>
            <uni-icons v-show="!hide5" @click="hide5 = !hide5" type="plusempty" size="30"></uni-icons>
            <view v-show="hide5" @click="hide5 = !hide5" style="font-size: 12px;">——</view>
          </view>
        </view>
        <view v-show="hide5" class="text">
          <view class="example-body">
            <uni-file-picker limit="9" title="请拍照上传回单凭证"></uni-file-picker>
            <uni-file-picker limit="9" title="请拍照上传货品照片"></uni-file-picker>
          </view>
        </view>
      </view>
    </view>
    <view class="box-botton">
      <button v-show="detall?.status != 1" class="delay" @click="delay(detall?.planDepartureTime)">上报异常</button>
      <button v-show="detall?.status == 1" class="delay" @click="delay(detall?.planDepartureTime)">延迟提货</button>
      <button class="raise">提货</button>
    </view>
  </view>
</template>
<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app';
import { details, orders } from '@/api/task'
import { ref } from 'vue';
import type { Data, Item } from '@/api/types/task-type';

const hide1 = ref(false)
const hide2 = ref(false)
const hide3 = ref(false)
const hide4 = ref(false)
const hide5 = ref(false)

const id = ref<string>("")
//详情数据
const detall = ref<Data>()
//获取详情数据
const getDetall = async () => {
  try {
    const res = await details(id.value)
    if (res.code == 200) {
      detall.value = res.data
      taskId.value = res.data.transportTaskId
    }

  } catch (error) {

  }
}
//+事件
const zo = ref(false)
//货物信息
const goods = ref<Item[]>()
const page = ref<number>(1)
const pageSize = ref<number>(20)
const taskId = ref<string>("")
//货物总数量
const counts = ref<number>()
//获取货物信息
const getGoods = async () => {
  try {
    const res = await orders({
      page: page.value,
      pageSize: pageSize.value,
      taskId: taskId.value
    })
    if (res.code == 200) {
      goods.value = res.data.items
      counts.value = res.data.counts
    }
    console.log(res);

  } catch (error) {

  }
}
//延迟提货事件
const delay = (tim: any) => {
  if (detall.value?.status == 1) {
    uni.navigateTo({
      url: `/subpkg_task/Latepickup/index?time=${tim}`,
    })
  } else if (detall.value?.status != 1) {
    uni.navigateTo({
      url: `/subpkg_task/Report/index`,
    })
  }

}
onLoad((option) => {
  id.value = option?.id
  getDetall()
  getGoods()
})
</script>
<style lang='scss' scoped>
.box {
  height: calc(100vh - 64px);
  background-color: #f5f5f5;
  padding: 10px;
  overflow: auto;
}

.scroll-text {
  width: 85%;
  padding: 15px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;

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
  }

  .text-text {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #a9a9a9;
  }
}

.vehicle-text {
  width: 85%;
  padding: 15px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;

  .text-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .text-text {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #a9a9a9;

    .text-right {
      color: #000;
    }
  }
}

.transport-text {
  width: 85%;
  padding: 15px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;

  .text-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;

    .province {
      font-weight: 700;
      font-size: 15px;
    }
  }
}

.goods-text {
  width: 85%;
  padding: 15px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;

  .text-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .text-top-left {
      display: flex;
    }
  }

  .text-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inputbox {
    width: 90%;
    padding: 5px 5px 5px 25px;
    background-color: #f5f5f5;
    border-radius: 15px;
  }

  .text-sou {
    position: relative;

    .sou {
      position: absolute;
      top: 8px;
      left: 2px;
    }
  }
}

.scroll-view {
  height: 200px;
}

.Delivery-text {
  width: 85%;
  padding: 15px;
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;

  .text-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .text-top-left {
      display: flex;
    }
  }

}

.box-botton {
  width: 100%;
  height: 60px;
  position: relative;
  bottom: 0;
  display: flex;
  text-align: center;
  justify-content: space-between;

  button {
    margin: 5px;
    border-radius: 30px;
  }

  .delay {
    width: 35%;
    background-color: #e7e7e7;
  }

  .raise {
    width: 60%;
    background-color: red;
    color: #fff;
  }
}
</style>
