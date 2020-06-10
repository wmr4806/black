<template>
  <div class="index">
    <!-- 搜索 -->
    <van-nav-bar fixed placeholder class="index-navbar">
      <van-button plain type="info" slot="title" icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 标签栏 -->
    <van-tabs sticky :offset-top="46" v-model="active">
      <van-tab v-for="(item,index) in userchannel" :key="index" :title="item.name">
        <!-- 数据列表 -->
        <van-list>
          <van-cell v-for="item in 20" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <!-- 放在 nav-right 插槽中 -->
      <van-button
        @click="showPopup=true"
        style="position: fixed;right:0"
        slot="nav-right"
        icon="apps-o"
      />
    </van-tabs>
    <!-- 编辑频道 -->
    <van-popup
      close-icon-position="top-left"
      :overlay="false"
      closeable
      position="bottom"
      v-model="showPopup"
    >
      <van-cell-group :border="false">
        <!-- 插槽 -->
        <div slot="title">
          <van-button
            type="danger"
            style="float:right"
            plain
            size="mini"
            @click="showBtn=!showBtn"
          >{{showBtn ? '完成':'编辑'}}</van-button>
          <h3>我的频道</h3>
        </div>
        <!-- 显示频道 -->
        <van-grid class="index-channel" :gutter="10">
          <van-grid-item
            v-for="(item,index) in userchannel"
            :key="index"
            :icon="showBtn?'close':''"
            :text="item.name"
          />
        </van-grid>
      </van-cell-group>
      <van-cell-group class="index-channel" :border="false">
        <!-- 标题 -->
        <h3 slot="title">我的频道</h3>
        <van-grid class="index-channel" :gutter="10">
          <van-grid-item v-for="(item,index) in channel" :key="index" :text="item.name" />
        </van-grid>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels, getUserChannels } from "@/utils/api";
export default {
  data() {
    return {
      active: 0,
      value: "",
      channel: [], //所有频道
      userchannel: [], //用户频道
      showPopup: true, // 是否显示编辑频道的层
      showBtn: false //是否显示删除图标
    };
  },
  async created() {
    //获取所有频道
    try {
      let res = await getAllChannels();
      // 获取的数据放到channel
      this.channel = res.data.data.channels;
      // console.log(this.channel);
    } catch (error) {
      //提示
      this.$toast.fail("获取频道数据失败！");
    }
    //获取用户频道
    try {
      let res = await getUserChannels();
      // 获取的数据放到userchannel
      this.userchannel = res.data.data.channels;
      // console.log(this.userchannel);
    } catch (error) {
      //提示
      this.$toast.fail("获取用户频道数据失败！");
    }
  },
  methods: {
    show() {}
  }
};
</script>

<style lang="less">
.index-navbar {
  .van-nav-bar__title {
    height: 80%;
    border-radius: 50px;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .van-button {
    background-color: rgba(255, 255, 255, 0.2);
    width: 100%;
    height: 100%;
    &__icon {
      color: white !important;
    }
    &__text {
      font-weight: normal;
      color: white;
    }
  }
  .van-tabs__wrap {
    padding-right: 50px;
  }
}
.index {
  .van-popup {
    height: 100%;
    padding: 60px 10px 10px;
    box-sizing: border-box;
  }
}
.index-channel {
  .van-icon {
    position: absolute;
    right: -8px;
    top: -8px;
    font-size: 20px;
    z-index: 9999;
    background-color: #fff;
    color: #bbb;
  }
  .van-grid-item__text {
    margin-top: 0 !important;
  }
}
</style>