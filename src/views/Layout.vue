<template>
  <div id="layout">
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
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>
