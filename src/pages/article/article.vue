<template>
  <div class="main">
    <m-header class="header"></m-header>
    <div class="article-container">
      <div class="base-bar">
        <div class="article-top-bar">
          <div class="article-title">{{article.title}}</div>
          
          <div class="btn-group">
            <el-button
              class="like-btn-done"
              icon="el-icon-caret-top"
              @click="like"
              v-if="!isThumbUp"
            >{{likeTips}} {{thumbUp}}</el-button>
            <el-button
              class="like-btn"
              @click="like"
              icon="el-icon-caret-top"
              v-else
            >{{hasLikeTips}} {{thumbUp}}</el-button>
            <!-- <el-button class="collect-btn" @click="collection">收藏</el-button> -->
            <el-button class="comment-btn" @click="commentShow=true">评论</el-button>
            <el-dialog class="comment-dialog" title="评论" :visible.sync="commentShow">
              <el-input
                class="comment-input"
                type="textarea"
                autofocus="true"
                autosize
                placeholder="留下评论吧"
                v-model="commentContent"
              />
              <el-button class="comment-publish" @click="publishComment">发布</el-button>
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="article-panel">
        <div class="article-content">
          <markdown v-if="article" :source="article.content"></markdown>
          <div>{{article.content}}</div>
        </div>
        <div class="comment-container">
          <comment :articleId="articleId"></comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header.vue";
import Request from "@/util/request.js";
import router from "@/router/index.js";
import StatusCode from "@/util/StatusCode.js";
import markdown from "@/components/markdown.vue";
import comment from "@/components/comment.vue";

export default {
  name: "articleCard",
  data() {
    return {
      commentContent: "",
      commentShow: false,
      articleId: -1,
      content: "",
      article: {},
      thumbUp: 0,
      userId: -1,
      likeTips: "赞同",
      hasLikeTips: "已赞同",
      isThumbUp: false
    };
  },
  components: {
    comment,
    markdown,
    "m-header": header
  },
  created() {
    console.log(this.$route.query);
    this.getArticle(this.$route.query.articleId);
    this.articleId = this.$route.query.articleId;
    this.userId = localStorage.getItem("userId");
    if (this.userId > 0) {
      this.setThumbUp();
    }
  },
  methods: {
    setThumbUp() {
      Request.get(
        "/article/thumbUp/" + this.userId + "/" + this.$route.query.articleId
      ).then(res => {
        console.log(res.data);
        this.isThumbUp = res.data.isThumbUp;
      });
    },
    collection() {
      this.$message({
        message: "暂时不支持收藏~",
        type: "warn",
        duration: 1000
      });
    },
    getArticle(articleId) {
      Request.getArticleById(articleId).then(res => {
        console.log(res.data);
        this.article = res.data;
        this.thumbUp = res.data.thumbUp;
        this.content = res.data.content;
        console.log(this.article);
      });
    },
    like() {
      let id = localStorage.getItem("userId");
      console.log("用户id:" + id);
      if (id == undefined || id < 0) {
        router.push("/signIn");
      } else {
        Request.thumbUpArticle(id, this.article.id).then(res => {
          console.log("----thumbUp--OK:" + StatusCode.OK);
          console.log(res.data);
          this.thumbUp += this.isThumbUp ? -1 : 1;
          this.isThumbUp = !this.isThumbUp;
        });
      }
    },
    publishComment() {
      let userId = localStorage.getItem("userId");
      Request.publishComment(userId, this.articleId, this.commentContent)
      .then(res => {
          console.log(res.data);
          this.$notify({
          title: '评论成功!',
          offset: 100
          });
        }).catch(err => {
            console.log(err);
          });
      this.commentShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  padding: 0;
  background-color: #f6f6f6;
  .base-bar {
    background: #fff;
    text-align: center;
    padding: 20px;
    box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
    -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
    margin-bottom: 10px;
    .article-top-bar {
      height: auto;
      width: 50%;
      margin: auto;
      min-width: 300px;
      padding-top: 40px;
      padding-bottom: 10px;
      background-color: #fff;
      .article-title {
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
        font-size: 26px;
        margin: auto;
        text-align: left;
        font-weight: bold;
        top: 100px;
        padding: 16px 0;
        overflow: hidden;
        background: #fff;
      }
      .btn-group {
        text-align: left;
        width: auto;
        height: 40px;
        line-height: 30px;
        font-size: 12pt;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue,
          PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
          WenQuanYi Micro Hei, sans-serif;
        font-size: 15px;
        .like-btn {
          background: rgba(0, 132, 255, 0.1);
          color: #0084ff;
        }
        .like-btn-done {
          background: rgba(1, 132, 255, 1);
          color: #fff;
        }
        .comment-dialog {
          width: auto;
          color: #0084ff;
          .comment-input {
            font-size: 13pt;
          }
          .comment-publish {
            margin-top: 10px;
          }
        }
      }
    }
  }
  .article-panel {
    box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
    -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
      Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
      sans-serif;
    font-size: 15px;
    color: #1a1a1a;
    background: #f6f6f6;
    background-color: #fff;
    border-radius: 2px;
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    padding: 20px 40px;
    height: 100%;
    min-height: 600px;
    margin: 0 auto;
    text-align: center;
    line-height: 27px;
    .article-content {
      text-align: left;
      min-height: 400px;
      color: #111;
      margin-bottom: 20px;
    }
  }
}
</style>