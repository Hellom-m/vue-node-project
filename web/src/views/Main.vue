<template>
  <div>
    <div class="topbar bg-dark py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" alt />
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-dark-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-priamry">立即下载</button>
    </div>
    <div class="bg-priamry pt-3 pb-2">
      <div class="nav nav-inserve text-white d-flex jc-around pb-1">
        <div class="nav-item active">
          <router-link tag="div" to="/">首页</router-link>
        </div>

        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>

        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 99;
}
</style>
