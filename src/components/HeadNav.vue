<template>
  <div id="head-nav">
    <h1>OYLZ admin</h1>
    <div class="link-box">
      <router-link
        v-for="item in links"
        :key="item.txt"
        :to="item.link"
        :class="['link',{isActive: item.txt.toLowerCase().indexOf($route.name) >= 0}]"
      >{{item.txt}}</router-link>
    </div>
    <div class="flex-grow-hold"></div>
    <div class="logout" @click="logout">退出登陆</div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    links: [
      {
        link: "/articles",
        txt: "Blogs"
      },
      {
        link: "/notes",
        txt: "EasyNotes"
      }
    ]
  }),
  methods: {
    logout() {
      console.log("logout");
    }
  }
};
</script>

<style lang="less" scoped>
#head-nav {
  display: flex;
  align-items: center;
  padding: 0 50px;
  height: 60px;
  border-bottom: 1px dashed #ccc;
  h1 {
    border-right: 1px dashed #ccc;
    padding-right: 20px;
  }
  .link-box {
    margin-left: 20px;
    .link {
      color: #ccc;
      text-decoration: none;
      padding-right: 15px;
      margin-right: 15px;
      border-right: 1px dashed #ccc;
      &:last-child {
        border-right: none;
      }
    }
    .isActive {
      color: rgba(88, 111, 252, 1);
    }
  }
}
</style>
