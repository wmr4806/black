<template>
  <div class="tabbar">
    <!-- 显示子路由页面 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar placeholder route>
      <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="notes-o">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o">视频</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
