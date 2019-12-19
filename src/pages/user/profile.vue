<template>
  <div class="main">
    <m-header />
    <div class="container">
      <userCard :userId="this.userId" class="userInfo" />
      <el-menu
        :default-active="activeIndex"
        class="navigation"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#111"
        active-text-color="#0084ff"
      >
        <el-menu-item index="1">简介</el-menu-item>
        <el-menu-item index="2">文章</el-menu-item>
      </el-menu>
      <div class="content">
        <userIntro :userId=userId class="intro" v-if="selectIndex == 1" />
        <articleInfo :articleList=articles class="article-list" v-if="selectIndex == 2" />
      </div>
    </div>
  </div>
</template>
<script>
import userCard from "@/components/userCard.vue";
import header from "@/components/header.vue";
import userIntro from "@/components/userIntro.vue";
import articleInfo from "@/components/articleInfo.vue";
import Request from '@/util/request.js';
export default {
  components: {
    userCard,
    userIntro,
    articleInfo,
    "m-header": header
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.selectIndex = key;
    }
  },
  data() {
    return {
      activeIndex: "1",
      userId: -1,
      selectIndex: 1,
      articles: []
    };
  },
  created() {
    this.userId = this.$route.query.userId;
    Request.getArticlesByAuthorId(this.userId)
    .then(res=>{
      console.log(res.data);
      this.articles=res.data;
    }).catch(err=>{
      console.log(err);
    })
    console.log(this.userId);
  }
};
</script>
<style lang="less" scoped>
.main {
  margin: 0 auto;
  width: 100%;
  .container {
    margin-top: 60px;
    .userInfo {
      width: 100%;
      margin: 0 auto;
      max-width: 777px;
    }
    .navigation {
      margin: 0 auto;
      width: 100%;
      max-width: 777px;
    }
    .content {
      margin: 0 auto;
      width: 100%;
      max-width: 777px;
    }
  }
}
</style>