<template>
  <div class="home">
    <div class="recommend-list">
      <div class="recommend-list-item" v-for="article in recommendArticles" :key="article.id">
        <a class="article-title" @click="openArticle(article.id)">{{ article.title }}</a>
        <div class="article-container">
          <markdown :source=article.content class="article-content" />
          <div class="item-footer-bar">
            <el-button class="button-more" @click="openArticle(article.id)">阅读全文</el-button>
            <!-- <el-button class="button-like">{{tips}} {{article.thumbUp}}</el-button> -->
          </div>
        </div>
      </div>
      <div class="scroll-tips" v-loading="loading" v-cloak>
        <span class="scroll-tips-text">{{tips}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import markdown from '@/components/markdown.vue';
import Request from "@/util/request.js";
export default {
  name: "home",
  components: {
    markdown
  },
  data() {
    return {
      likeTips: "赞同",
      recommendArticles: [],
      totalPages: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      require: true,
      end: false,
      tips: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.loadMore);
    this.currentPage = 1;
    this.loading = true;
    Request.getArticlePage(this.currentPage, this.pageSize)
      .then(res => {
        this.recommendArticles = res.data.content;
        this.loading = false;
        this.end = res.data.last;
        console.log(res.data);
        console.log(this.recommendArticles);
        this.tips = "";
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    openArticle(id) {
      // 在新窗口打开文章
      console.log(id);
      // let routeData = this.$router.resolve({
      //   path: "/article",
      //   name: "openArticle",
      //   query: {
      //     articleId: id
      //   }
      // });
      // window.open(routeData.href, "_blank");

      // 在本窗口打开
      this.$router.push({path: '/article', query: {articleId: id}});
      
    },
    loadMore() {
      console.log(localStorage.getItem("username"));
      if (
        !this.end &&
        document.documentElement.offsetHeight -
          window.innerHeight -
          document.documentElement.scrollTop <
          30
      ) {
        console.log("bottom");
        this.loading = true;
        Request.getArticlePage(this.currentPage + 1, this.pageSize)
          .then(res => {
            let data = res.data;
            for (let i = 0; i < data.content.length; ++i) {
              this.recommendArticles.push(data.content[i]);
            }
            this.totalPages = data.totalPages;
            this.end = data.last;
            this.loading = false;
            this.currentPage++;
            window.console.log(res.data);
            if (this.end) {
              this.tips = "没有更多了..";
            }
            console.log(this.recommendArticles);
          })
          .catch(err => {
            this.tips = "加载失败了...";
            window.console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  min-height: 600px;
  background: #fff;
  width: 100%;
  max-width: 600px;
  margin: 60px auto auto auto;
  box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
  -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
  .recommend-list-item {
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
      Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
      sans-serif;
    color: #1a1a1a;
    padding: 20px 30px;
    border-radius: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5rem;
    text-align: left;
    border-bottom: 1px solid #f0f2f7;
    .article-title {
      border: none;
      font-size: 14pt;
      font-weight: bold;
      text-decoration: none;
      background: #fff;
    }
    .article-container {
      display: block;
      padding: 5px;
      .article-content {
        max-height: 90px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .button-more:hover {
        color: #8590a6;
      }
      .button-more {
        padding: 0;
        outline: none;
        -webkit-appearance: none;
        margin-left: 4px;
        color: #175199;
        height: auto;
        padding: 0;
        line-height: inherit;
        background-color: transparent;
        border: none;
        border-radius: 0;
      }
      .button-like {
        margin-top: 5px;
        line-height: 30px;
        padding: 0 12px;
        color: #0084ff;
        background: rgba(0, 132, 255, 0.1);
        border-color: transparent;
      }
    }
  }
}
.scroll-tips {
  padding-top: 20px;
  text-align: center;
  color: #175199;
  height: 40px;
}
.v-cloak {
  display: none;
}
</style>