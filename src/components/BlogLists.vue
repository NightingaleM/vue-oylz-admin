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
      <p class="title" @click="editBlog(item.id)">{{item.title}}</p>
      <p class="tags">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tags" />
        </svg>
        {{item.tags.map(e=>e.tag).join(',')}}
      </p>
    </li>
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
  data: () => ({}),
  methods: {
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
  max-width: 400px;
  li {
    cursor: pointer;
    padding: 10px 20px;
    list-style: none;
    border-bottom: 1px dashed #ccc;
    p {
      margin: 0;
    }
  }
  .active {
    background-color: #eee;
  }
  .title {
    color: rgb(73, 73, 73);
    margin-bottom: 10px;
    &:hover {
      color: #000;
    }
  }
  .tags {
    font-size: 12px;
    color: #666;
  }
}
</style>
