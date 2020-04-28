<template>
  <div>
    <m-card :icon="icon" :title="title">
      <div class="nav d-flex jc-between">
        <div
          class="nav-item"
          :class="{active:active === i}"
          v-for="(item,i) in categories"
          :key="i"
          @click="active = i"
        >
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>

      <div class="pt-2">
        <swiper>
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true },
    categories: { type: Array }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style  lang="scss" scoped>
</style>
