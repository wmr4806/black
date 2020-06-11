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
        <van-cell v-for="item in channelarticle" :key="item.id" :title="item.title">
          <!-- 默认插槽 图片 -->
          <van-image
            width="100"
            height="100"
            fit="cover"
            :src="item.cover.images[0]"
            v-if="item.cover.type==1"
          />
          <!-- 插槽 -->
          <div slot="label">
            <!-- 循环三张图片的 -->
            <div class="index-article-images" v-if="item.cover.type==3">
              <van-image
                width="100"
                height="100"
                fit="cover"
                v-for="(v1,k1) in item.cover.images"
                :key="k1"
                :src="v1"
              />
            </div>
            <!-- 文章的描述 -->
            <div class="index-article-images">
              <van-tag v-if="item.is_top==1" plain type="danger" size="medium">置顶</van-tag>
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate|relativeTime}}</span>
            </div>
          </div>
        </van-cell>
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
            @click="delechannel($event,index)"
          />
        </van-grid>
      </van-cell-group>
      <van-cell-group class="index-channel" :border="false">
        <!-- 标题 -->
        <h3 slot="title">我的频道</h3>
        <van-grid :gutter="10">
          <!-- 循环所有的频道 -->
          <template v-for="(item,index) in channel">
            <!-- 判断如果不在我的频道  就循环-->
            <van-grid-item
              :key="index"
              :text="item.name"
              v-if="userchannel.findIndex(v=>v.id==item.id) === -1 "
              @click="addchannel(index)"
            />
          </template>
        </van-grid>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import {
  getAllChannels,
  getUserChannels,
  deleteUserChannel,
  addUserChannel,
  getChannelArticles
} from "@/utils/api";
export default {
  data() {
    return {
      active: 0,
      value: "",
      channel: [], //所有频道
      userchannel: [], //用户频道
      showPopup: true, // 是否显示编辑频道的层
      showBtn: false, //是否显示删除图标
      page: 1, //页数
      perPage: 15, //每页数量
      channelId: "", //当前选中频道的id
      channelarticle: [] //文章数据
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
    await this.getchannel();
  },
  methods: {
    // 删除频道
    async delechannel(e, index) {
      // 判断点击的是不是图标
      // console.log(e,index);
      if (e.srcElement.nodeName === "I") {
        // 截取要删除的频道
        let data = this.userchannel.splice(index, 1);
        // 把截取的频道放到channel
        this.channel.push(data[0]);
        //调用接口
        try {
          // 删除
          await deleteUserChannel(data[0].id);
        } catch (error) {
          //提示错误
          this.$toast.fail("删除失败");
        }
      }
    },
    // 添加频道
    async addchannel(index) {
      // console.log(index)
      // 截取频道
      let data = this.channel.splice(index, 1);
      // console.log(data);
      // 把截取的频道放到我的频道中
      this.userchannel.push(data[0]);
      // 调用接口
      try {
        let params = {
          channel: [
            {
              id: data[0].id,
              seq: data[0].id
            }
          ]
        };
        let res = await addUserChannel(params);
      } catch (error) {
        // 提示
        this.$toast.fail("添加失败");
      }
    },
    //获取当前用户文章列表
    async getchannel() {
      try {
        // 调取接口
        let res = await getChannelArticles(
          this.channelId,
          this.page,
          this.perPage
        );
        // console.log(res);
        // 把获取到的文章放到文章数据中
        this.channelarticle = res.data.data.results;
        console.log(this.channelarticle);
      } catch (error) {
        //提示
        this.$toast.fail("获取失败");
      }
    }
  },
  // // 监听器
  watch: {
    // 监听 active 变量当值改变时调用函数
    active: async function(newValue, oldValue) {
      // 更新频道ID
      this.channelId = this.userchannel[newValue].id;
      // 获取文章
      await this.getchannel();
    }
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
.index-article-images {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.index-article-label {
  span {
    margin-right: 20px;
  }
}
</style>