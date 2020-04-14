<template>
  <div>
    <swiper :options="swiperOptions" :auto-update="true">
      <swiper-slide>
        <img class="w-100" src="../assets/images/703c1c3f819a0b642aff3c88c7c5f395.png" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/bab2a956b5b22ebbb87c4fce39f7627c.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/e008222024acc72dc40c5371689e09da.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>

    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 pt-3 text-center">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light-1 py-2 fs-sm ">
        <i class="sprite arrow"></i>
        <span class="mx-2">收起</span>
      </div>
    </div>

    <!-- end of nav icons -->

    
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: true
      }
    };
  },
  components: {}
};
</script>

<style lang="scss">
@import "../assets/sass/_variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: "white");

    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  .nav-item {
    width: 25%;
    text-align: center;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: 0;
    }
  }
}
</style>
