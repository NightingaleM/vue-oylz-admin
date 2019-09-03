<template>
  <div id="select-tag">
    <ul class="show-tags">
      <li
        class="tag-chip no-warp"
        @click="removeTag(item,index)"
        v-for="(item,index) in holdTags"
        :key="item.id"
      >{{item.tag}}</li>
      <input type="text" v-model="keyword" class="select-input" placeholder="添加标签" @focus="onFocus" />
    </ul>
    <div class="option-box" v-show="showOptions">
      <div
        :class="['tag-chip',{selected:holdTags.findIndex(e=>e.id===item.id) >=0}]"
        v-for="item in selectedTags"
        :key="item.id"
        @click="addTag(item)"
      >{{item.tag}}</div>
      <p class="undefind-tag" v-show="!selectedTags.length">
        没有找到"{{keyword}}"标签，是否
        <span @click="createTag">添加</span>？
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { setTimeout, clearTimeout } from "timers";

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    keepTag: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    showOptions: false,
    holdTags: [],
    keyword: "",
    timer: null,
    Doms: []
  }),
  methods: {
    ...mapActions(["GET_TAGS"]),
    onFocus() {
      this.showOptions = true;
      let actions = e => {
        e.path.forEach(p => {});
        for (let i = 0; i < e.path.length; i++) {
          if (this.Doms.indexOf(e.path[i]) >= 0) {
            return;
          }
        }
        this.showOptions = false;
        window.removeEventListener("click", actions);
      };
      window.addEventListener("click", actions);
    },
    async createTag() {
      let { data: tagRes } = await this.$axios.createTag({ tag: this.keyword });
      await this.GET_TAGS();
      this.holdTags.push({
        id: tagRes.id,
        tag: this.keyword
      });
      this.keyword = "";
      this.changeTag();
    },
    removeTag(item, index) {
      if (this.keepTag.findIndex(e => e === item.id) >= 0) {
        // TODO: 提示必须保留该tag
        return;
      }
      this.holdTags.splice(index, 1);
      this.changeTag();
    },
    addTag(item) {
      clearTimeout(this.timer);
      let index = this.holdTags.findIndex(e => e.id === item.id);
      if (index >= 0) {
        this.removeTag(item, index);
        return;
      }
      if (this.holdTags.length >= 5) {
        // TODO: 提示不可以多余5条
        return;
      }
      this.holdTags.push(item);
      this.changeTag();
    },
    changeTag() {
      let value = this.holdTags;
      this.$emit("input", value);
    }
  },
  computed: {
    ...mapState({
      tags: ({ User }) => User.tags
    }),
    selectedTags() {
      return this.tags.filter(e => {
        return new RegExp(`${this.keyword}`).test(e.tag);
      });
    }
  },
  created() {},
  mounted() {
    this.Doms.push(
      document.querySelector("#select-tag .show-tags input.select-input")
    );
    this.Doms.push(document.querySelector("#select-tag .option-box"));
  },
  watch: {
    value() {
      this.holdTags = [...this.value];
    }
  }
};
</script>

<style lang="less" scoped>
#select-tag {
  position: relative;
  .show-tags {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;

    .select-input {
      border-bottom: 1px solid #000;
      outline: none;
    }
  }
  .option-box {
    position: absolute;
    left: -10px;
    top: 27px;
    background-color: #eee;
    width: 500px;
    flex-wrap: wrap;
    height: auto;
    display: flex;
    padding: 10px;
    border: 1px dashed #ccc;
    border-left: none;
    .undefind-tag {
      margin-bottom: 0;
      padding-top: 10px;
      span {
        cursor: pointer;
        text-decoration: underline;
        background: #333;
        color: #fff;
        padding: 0 5px;
        margin-right: 5px;
      }
    }
  }
  .tag-chip {
    text-align: center;
    min-width: 40px;
    border: 1px dashed #ccc;
    padding: 1px 3px;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #333;
      border: 1px dashed #fff;
    }
  }
  .selected {
    background-color: #d9f2f3;
    color: #333;
  }
  .no-warp {
    margin-top: 0;
    margin-right: 10px;
  }
}
</style>
