<template>
  <el-card class="box-card">
    <div v-for="(article,index) in articleList" :key="article.id" class="item">
      <el-button class="article-item" @click="openArticle(article.id)">{{article.title}}</el-button>
      <div class="time">{{article.createTime.substr(0,10)}}</div>
      <div class="btn-group" v-if="self()">
        <el-button class="btn" @click="updateArticle(article.id)">编辑</el-button>
        <el-button class="btn" @click="deleteArticle(article.id, index)">删除</el-button>
      </div>
      <el-divider class="divider"/>
    </div>
    <div class="empty" v-if="articleList.length==0">{{tips}}</div>
  </el-card>
</template>

<script>
import Request from "@/util/request.js";
export default {
  props: {
    userId: String,
    articleList: Array
  },
  data() {
    return {
      tips: "还没有文章~"
    };
  },
  methods: {
    self() {
      let selfId = localStorage.getItem("userId");
      if (selfId == this.$route.query.userId) {
        console.log("本人",this.userId,selfId);
        return true;
      }
      console.log("其他人",this.userId,selfId);
      return false;
    },
    deleteArticle(id, index) {
      console.log(id);
      Request.deleteArticle(id).then(res => {
        console.log(res.data);
        this.$notify({
          message: res.data.message,
          duration: 1000
        });
        this.articleList.splice(index, 1);
      });
    },
    updateArticle(id) {
      console.log(id);
      // this.$router.push({path: '/article/update',query:{articleId: id}});
      let routeData = this.$router.resolve({
        path: "/article/update",
        name: "updateArticle",
        query: {
          articleId: id
        }
      });
      window.open(routeData.href, "_blank");
    },
    openArticle(id) {
      console.log(id);
      // this.$router.push({path: '/article', query: {articleId: id}});
      let routeData = this.$router.resolve({
        path: "/article",
        name: "openArticle",
        query: {
          articleId: id
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
.box-card {
  padding: 5px;
  .item {
    padding: 5px;
    .divider{
      background: #eeeeee;
  }
    .article-item {
      font-size: 15pt;
      border: none;
      background: #fff;
      margin: 0;
    }
    .article-item:hover {
      color: #0084ff;
      background: #fff;
    }
    .time {
      float: left;
      margin: 15px 0;
      font-size: 10pt;
    }
    .btn-group {
      .btn {
        border: none;
        padding: 14px;
        color: #0084ffcc;
        font-size: 10pt;
      }
      float: right;
      padding: 0;
    }
  }
}
</style>