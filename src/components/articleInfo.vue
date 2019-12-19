<template>
  <el-card class="box-card">
    <div v-for="article in articleList" :key="article.id" class="item">
      <el-button class="article-item" @click="openArticle(article.id)">{{article.title}}</el-button>
      <div class="time">{{article.createTime.substr(0,10)}}</div>
      <el-divider />
    </div>
    <div class="empty" v-if="articleList.length==0">{{tips}}</div>
  </el-card>
</template>

<script>
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
    openArticle(id) {
      console.log(id);
      this.$router.push({path: '/article', query: {articleId: id}});
    }
  }
};
</script>
<style lang="less" scoped>
.box-card {
  padding: 5px;
  .item {
    padding: 0;
    .article-item {
      font-size: 15pt;
      border: none;
      background: #fff;
      margin: 0;
    }
    .article-item:hover {
      background: #fff;
    }
    .time {
      float: right;
      font-size: 11pt;
    }
  }
}
</style>