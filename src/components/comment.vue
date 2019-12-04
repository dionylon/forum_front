<template>
  <div class="main">
    <div class="topBar">{{total}}条评论</div>
    <div v-if="total==0" class="empty-tips">还没有评论哦~</div>
    <div class="comment-list" v-for="comment in comments" :key="comment.id">
      <el-divider class="divider"></el-divider>
      <div class="auhthorInfo">
        <div class="authorName">{{comment.authorInfo.name}}</div>
        <el-button v-show="false" icon="el-icon-caret-top" class="thumbUp" @click="thumbUpComment">
          {{comment.thumbUp}}
        </el-button>
      </div>
      <div class="content">{{comment.content}}</div>
      <div class="bottomBar"></div>
    </div>
  </div>
</template>
<script>
import Request from "@/util/request.js";
export default {
  props: {
    articleId: String
  },
  data() {
    return {
      comments: [],
      total: 0
    };
  },
  created() {
    // 根据文章id加载评论
    console.log(this.articleId);
    this.getComments();
  },
  methods: {
    thumbUpComment() {},
    getComments() {
      Request.getCommentsByArticleId(this.articleId).then(res => {
        console.log(res.data);
        this.comments = res.data;
        this.total = this.comments.length;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  margin: 5px auto;
  box-shadow: 0 3px 6px rgba(13, 13, 13, 0.2);
  -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.2);
  color: #111;
  background-color: #fff;
  height: auto;
  width: 100%;
  .divider {
    margin: 0px auto;
    width: 90%;
  }
  .topBar {
    text-align: left;
    padding: 5px 10px;
  }
  .empty-tips {
    background: #fff;
    text-align: center;
    padding: 25px;
    color: #000;
    height: 50px;
  }
  .auhthorInfo {
    height: 30px;
    width: 100%;
    font-size: 15px;
    background: #fff;
    float: right;
    margin-bottom: 10px;
    .authorName {
      font-weight: bold;
      text-align: left;
      padding: 10px;
      font-size: 12pt;
      margin-left: 20px;
    }
    .thumbUp {
      float: right;
      padding: 0px;
      width: 50px;
      height: 30px;
      :hover {
        color: #111;
        font-weight: bold;
      }
      border: none;
      color: white;
      background-color: #0084ffc8;
    }
  }
  .content {
    text-align: left;
    padding: 20px 30px;
    line-height: 1.6;
    background: #fff;
  }
  .bottomBar {
    background: #fff;
  }
}
</style>