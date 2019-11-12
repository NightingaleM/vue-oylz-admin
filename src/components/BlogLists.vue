<template>
  <ul class="blog-ul">
    <li class="new-one">
      <p class="title" @click="createNewBlog">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-add" />
        </svg>
        新写一篇博客～
      </p>
      <p class="tags">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tags" />
        </svg>
      </p>
    </li>
    <li v-for="item in blogs" :key="item.title" :class="['blog-li',{active:item.id === activeId}]">
      <p class="title" @click="editBlog(item.id)">
        <svg class="icon" aria-hidden="true" v-if="!item.is_public">
          <use xlink:href="#icon-Non-publicise" />
        </svg>
        <svg class="icon" aria-hidden="true" v-else>
          <use xlink:href="#icon-gongkai" />
        </svg>
        {{item.title}}
      </p>
      <p class="tags">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tags" />
        </svg>
        {{item.tags.map(e=>e.tag).join(',')}}
      </p>
      <div class="options">
        <svg class="icon" aria-hidden="true" @click="initDelete(item.id)">
          <use xlink:href="#icon-delete" />
        </svg>
      </div>
    </li>
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">删除文章？</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red " text @click="deleteArticle">删！</v-btn>
          <v-btn color="green " text @click="deleteDialog = false">别！</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ul>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    deleteDialog: false,
    deleteId: null
  }),
  methods: {
    initDelete(id) {
      this.deleteId = id;
      this.deleteDialog = true;
    },
    async deleteArticle() {
      try {
        let deleteRes = await this.$axios.deleteArticle({
          id: this.deleteId
        });
        this.deleteId = null;
        this.deleteDialog = false;
        // TODO: 提醒删除成功
        this.$emit("update", true);
      } catch (e) {
        console.log(e);
      }
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    createNewBlog() {
      this.$emit("editBlog", null);
    },
    editBlog(id) {
      this.$emit("editBlog", id);
    }
  }
};
</script>

<style lang="less" scoped>
.blog-ul {
  padding: 0;
  max-width: 350px;
  li {
    overflow: hidden;
    cursor: pointer;
    padding: 10px 20px;
    list-style: none;
    position: relative;
    border-bottom: 1px dashed #ccc;
    z-index: 5;
    p {
      margin: 0;
    }
    .title {
      color: rgb(73, 73, 73);
      margin-bottom: 10px;
      position: relative;
      z-index: 5;
      &:hover {
        color: #000;
      }
    }
    .tags {
      font-size: 12px;
      color: #666;
    }
    .options {
      z-index: 10;
      top: 16px;
      right: 10px;
      position: absolute;
      font-size: 14px;
      svg {
        cursor: pointer;
      }
    }
  }
  .active {
    background-color: rgb(196, 196, 196);
  }
}
</style>
