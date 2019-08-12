<template>
  <v-app>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({}),
  computed: {
    key() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions(["GET_TAGS", "CHECK_STATUS"])
  },
  async created() {
    await this.CHECK_STATUS();
    await this.GET_TAGS();
  }
};
</script>
