<template>
  <div id="edit-box">
    <input class="title-input" v-model="title" placeholder="输入文章标题" />
    <div class="operations">
      <selectTag v-model="holdBlogTags" :keepTag="keepTag"></selectTag>
      <div class="flex-grow-hold"></div>
      <p class="operation">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuben" />
        </svg>
      </p>
      <p class="operation submit" @click="createArticle">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fabu" />
        </svg>
        发布文章
      </p>
    </div>
    <textarea class="txt-box" v-model="txt" placeholder="输入文章内容"></textarea>
  </div>
</template>

<script>
import SelectTag from "@/components/SelectTag.vue";

export default {
  components: {
    SelectTag
  },
  props: {
    blog: {
      type: Object,
      default: () => ({
        content: "",
        title: "",
        tags: []
      })
    }
  },
  data: () => ({
    txt: "",
    title: "",
    holdBlogTags: [],
    keepTag: [4]
  }),
  methods: {
    async createArticle() {
      let tags = this.holdBlogTags.map(e => e.id);
      if (tags.indexOf(4) < 0) {
        tags.push(4);
      }
      console.log(tags);
      let articleRes = await this.$axios.createArticle({
        tag: tags,
        title: this.title,
        content: this.txt
      });
      this.$emit("update");
    }
  },
  watch: {
    blog: {
      deep: true,
      handler(v) {
        console.log(v);
        this.txt = v.content;
        this.title = v.title;
        this.holdBlogTags = [...v.tags];
      }
    }
  }
};
</script>

<style lang="less" scoped>
#edit-box {
  border-left: 1px dashed #ccc;
  .title-input {
    width: 100%;
    outline: none;
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
  }
  .txt-box {
    padding: 10px;
    outline: none;
    height: calc(100vh - 160px);
    width: 100%;
    resize: none;
  }
  .operations {
    display: flex;
    background-color: #eeeeee;
    padding: 0 10px;
    align-items: center;
    .operation {
      color: #666;
      cursor: pointer;
      padding: 10px 10px;
      margin: 0 20px;
    }
    .submit {
      &:hover {
        color: #fff;
        background-color: #333;
      }
    }
  }
}
</style>
