<template>
  <div id="edit-box">
    <input class="title-input" v-model="title" placeholder="输入文章标题" />
    <div class="operations">
      <selectTag v-model="holdBlogTags" :keepTag="keepTag"></selectTag>
      <div class="flex-grow-hold"></div>
      <p class="operation">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuben" />
        </svg>-->
        <span :class="['option',{isActive:isPublic}]" @click="isPublic=!isPublic">公开</span>
        <span :class="['option',{isActive:isStick}]" @click="isStick=!isStick">置顶</span>
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
    keepTag: [4],
    isPublic: true,
    isStick: false
  }),
  methods: {
    async createArticle() {
      let tags = this.holdBlogTags.map(e => e.id);
      if (tags.indexOf(4) < 0) {
        tags.push(4);
      }
      if (this.blog.id) {
        let articleRes = await this.$axios.updateArticle({
          id: this.blog.id,
          tag_id: this.blog.tags.map(e => e.pivot.tag_id),
          tag: tags,
          title: this.title,
          content: this.txt,
          isPublic: this.isPublic + 0,
          isStick: this.isStick + 0
        });
        this.$emit("update");
      } else {
        let articleRes = await this.$axios.createArticle({
          tag: tags,
          title: this.title,
          content: this.txt,
          isPublic: this.isPublic ? 1 : 0,
          isStick: this.isStick ? 1 : 0,
          isPublic: this.isPublic + 0,
          isStick: this.isStick + 0
        });
        this.$emit("update");
        // TODO: 发文成功需要提示
      }
    }
  },
  watch: {
    blog: {
      deep: true,
      handler(v) {
        this.txt = v.content;
        this.title = v.title;
        this.isPublic = 1;
        this.isStick = 0;
        if (v.id) {
          this.isPublic = Boolean(v.is_public);
          this.isStick = Boolean(v.is_stick);
          this.holdBlogTags = [
            ...v.tags.map(e => {
              return { id: e.pivot.tag_id, tag: e.tag };
            })
          ];
        } else {
          this.holdBlogTags = [...v.tags];
        }
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

      margin: 0;
      .option {
        display: inline-block;
        width: 28px;
        height: 18px;
        transition: all 0.4s ease;
        margin-right: 10px;
        font-size: 12px;
        text-decoration: line-through red;
      }
      .isActive {
        font-size: 14px;
        text-decoration: none;
      }
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
