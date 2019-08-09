<template>
  <div id="blogs-page">
    <BlogLists class="cp-blog-lists" :blogs="blogs" @editBlog="editBlog" :activeId="activeId"></BlogLists>
    <EditBlog class="cp-edit-blog" :blog="eBlog" @update="getBlogs"></EditBlog>
  </div>
</template>

<script>
import BlogLists from "@/components/BlogLists.vue";
import EditBlog from "@/components/EditBlog.vue";
export default {
  components: {
    BlogLists,
    EditBlog
  },
  data: () => ({
    blogs: [],
    page: 1,
    count: 10,
    eBlog: {},
    activeId: null
  }),
  methods: {
    editBlog(v) {
      console.log("asdf");
      if (!v) {
        this.holdBlogTxt = "";
        this.holdBlogTitle = "";
        this.holdTags = [];
      } else {
        this.activeId = v;
        let findItem = this.blogs.find(e => {
          return e.id === v;
        });
        this.eBlog = findItem;
      }
    },
    async getBlogs() {
      let { data: blogs } = await this.$axios.getArticleLists({
        page: this.page,
        count: this.count
      });
      this.blogs = blogs.result.data;
      this.activeId = blogs.result.data[0].id;
      this.editBlog(this.activeId);
    }
  },
  created() {
    this.getBlogs();
  }
};
</script>

<style lang="less" scoped>
#blogs-page {
  height: calc(100vh - 60px);
  display: flex;
  .cp-blog-lists {
    // flex-grow: 1;
  }
  .cp-edit-blog {
    flex-grow: 3;
  }
}
</style>
