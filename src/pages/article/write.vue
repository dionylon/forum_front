<template>
  <div class="main">
    <m-header></m-header>
    <div class="editor-container">
      <div>
        <input class="title-edit" v-model="title" placeholder="在此处输入标题" />
      </div>
      <div>
        <mavon-editor
          class="content-editor"
          :tabSize="4"
          :editable="true"
          :subfield="false"
          :placeholder="contentPlaceholder"
          :toolbars="toolbarOptions"
          v-model="content"
          @save="save"
        />
      </div>
      <div class="footer-bar">
        <el-button class="button-publish" @click="publish">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import header from "@/components/header.vue";
import Request from "@/util/request.js";
export default {
  components: {
    "m-header": header
  },
  created() {
    this.userId = localStorage.getItem("userId");
    if (this.userId == undefined || this.userId < 0) {
      this.$route.push("/signIn");
    }
  },
  data() {
    return {
      userId: -1,
      contentPlaceholder: "写点什么吧..",
      content: "",
      title: "",
      toolbarOptions: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    uploadArticle() {
      Request.post("/article", {
        authorId: this.userId,
        title: this.title,
        content: this.content
      }).then(res => {
        console.log(res.data);
      });
    },
    publish() {
      this.$confirm("是否发布?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
        center: true
      })
        .then(() => {
          this.uploadArticle();
          this.$router.push('/home');
        })
        .catch(() => {});
    },
    save() {
      // console.log(this.content);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  .editor-container {
    padding: 1px;
    width: 100%;
    height: 100%;
    margin: 50px auto;
    max-width: 700px;
    .title-edit {
      border: none;
      box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
      -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
      padding: 10px;
      height: auto;
      font-size: 18pt;
      line-height: 1.5rem;
      width: 100%;
      margin: 10px auto;
    }
    .content-editor {
      border: none;
      box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
      -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
      padding: 10px;
      margin: 10px auto;
      width: 100%;
      height: 100%;
      min-height: 600px;
    }
    .footer-bar {
      height: 50px;
      color: #0084ff;
      .button-publish {
        background-color: #0084ff;
        color: #fff;
      }
    }
  }
}
</style>