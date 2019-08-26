<template>
  <div id="layout" :class="[isLight?'light-layout':'dark-layout']">
    <div class="light-bt" @click="isLight = !isLight">
      {{
      isLight ? 'light':'dark'
      }}
    </div>
    <HeadNave></HeadNave>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
import HeadNave from "@/components/HeadNav.vue";
export default {
  components: {
    HeadNave
  },
  data() {
    return {
      isLight: true
    };
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.dark-layout {
  background-color: #000 !important;
  color: #fff !important;
}
.light-layout {
  background-color: #fff !important;
  color: #000 !important;
}
.light-bt {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #ccc;
}
</style>