<template>
  <div class="home">
    <div class="recommend-list">
      <div class="recommend-list-item"
        v-for="article in recommendArticles"
        :key="article.id"
        >
        <h3 class="article-title">{{ article.title }}</h3>
        <div class="article-container">
          <div class="article-content">
                {{ article.content }}
          </div>
          <el-button class="button-more">阅读全文</el-button>
        </div>
      </div>
      <div class="scroll-tips" v-loading="loading" v-cloak>
        <span class="scroll-tips-text">{{tips}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/util/request.js";
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      recommendArticles:[],
      totalPages: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      require: true,
      end: false,
      tips: ""
    }
  },
  created() {
    this.currentPage = 1;
    this.loading = true;
    Request.getArticlePage(this.currentPage,this.pageSize)
      .then(res=>{
        this.recommendArticles = res.data.content;
        this.loading = false;
        this.end = res.data.last;
        console.log(res.data);
        console.log(this.recommendArticles);
        this.tips = "";
      }).catch(err=>{
        console.log(err);
      });
  },
  mounted(){
    window.addEventListener('scroll',this.loadMore);
  },
  methods: {
    loadMore(){
      console.log(localStorage.getItem("username"));
      if(!this.end && document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop < 30){
        console.log("bottom");
        this.loading = true;
        Request.getArticlePage(this.currentPage+1,this.pageSize)
          .then(res=>{
            let data = res.data;
            for(let i = 0; i < data.content.length; ++i){
              this.recommendArticles.push(data.content[i]);
            }
            this.totalPages = data.totalPages;
            this.end = data.last;
            this.loading=false;
            this.currentPage++;
            window.console.log(res.data);
            if(this.end){
              this.tips = "没有更多了..";
            }
            console.log(this.recommendArticles);
          })
          .catch(err => {
            this.tips = "加载失败了..."
            window.console.log(err);
          });
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  min-height: 600px;
  background: #fff;
  width: 777px;
  margin: 40px auto auto auto;
  box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
  -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
  .recommend-list-item {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    color: #1a1a1a;
    padding: 20px 40px;
    border-radius: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5rem;
    text-align: left;
    border-bottom: 1px solid #f0f2f7;
    .article-container{
      display: block;
      .article-content {
        max-height: 105px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .button-more:hover{
        color: #8590a6
      }
      .button-more{
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
    }
  }
}
.scroll-tips{
  padding-top: 20px;
  text-align: center;
  color: #175199;
  height: 40px;
}
.v-cloak{
  display: none;
}
</style>