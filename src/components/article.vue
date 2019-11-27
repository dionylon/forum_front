<template>
  <div class="main">
    <m-header class="header"></m-header>
    <div class="article-container">
        <div class="base-bar">
            <div class="article-top-bar">
                <div class="article-title">
                    {{article.title}}
                </div>
                <div class="btn-group">
                    <el-button class="like-btn-done" icon="el-icon-caret-top" @click="like" v-if="!isThumbUp">{{thumbUp}}</el-button>
                    <el-button class="like-btn" @click="like" icon="el-icon-caret-top" v-else>{{tips}} {{thumbUp}}</el-button>
                    <el-button class="collect-btn" @click="collection">收藏</el-button>
                    <el-button class="comment-btn" >评论</el-button>
                </div>
            </div>
        </div>
        <div class="article-panel">
        <div class="article-content">
            {{article.content}}
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import header from "./header.vue";
import Request from "@/util/request.js";
import router from '../router';
import StatusCode from '@/util/StatusCode.js';
export default {
  name: "articleCard",
  data() {
    return {
      article: '',
      thumbUp: 0,
      userId: -1,
      tips: '已赞同',
      isThumbUp: false
    }
  },
  components:{
    "m-header": header
  },
  created() {
      console.log(this.$route.query);
      this.getArticle(this.$route.query.articleId);
      this.userId = localStorage.getItem("userId");
      if(this.userId > 0){
        this.setThumbUp();
      }
  },
  methods: {
    setThumbUp(){
      Request.get('/article/thumbUp/'+this.userId+'/'+this.$route.query.articleId)
        .then(res=>{
          console.log(res.data);
          this.isThumbUp = res.data.isThumbUp;
        })
    },
    collection(){
        this.$message({
                message: '暂时不支持收藏~',
                type: 'warn',
                duration: 1000
              });
    },
    getArticle(articleId){
        Request.getArticleById(articleId)
        .then(res=>{
            console.log(res.data);
            this.article = res.data;
            this.thumbUp = res.data.thumbUp;
        });
    },
    like(){
      let id = localStorage.getItem("userId");
        console.log("用户id:"+id);
        if(id == undefined || id < 0){
          router.push('/signIn');
        }else{
           Request.thumbUpArticle(id,this.article.id)
            .then(res=>{
              console.log("----thumbUp--OK:"+StatusCode.OK);
              console.log(res.data);
              this.thumbUp+=this.isThumbUp?-1:1;
              this.setThumbUp();
            });
          }
      }
  }
}
</script>
<style lang="less" scoped>
.main{
    padding: 0;
    background-color: #f6f6f6;
    .base-bar{
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
        font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
        font-size: 15px;
        .like-btn {
          background: rgba(0,132,255,.1);
          color: #0084ff;
        }
        .like-btn-done {
          background: rgba(1, 132, 255, 1);
          color: #fff;
        }
      }
    }
    }
    .article-panel {
        .article-content {
            color: #111;
        }
        box-shadow: 0 3px 6px rgba(13, 13, 13, 0.1);
        -webkit-box-shadow: 0px 0px 5px rgba(13, 13, 13, 0.1);
        font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
        font-size: 15px;
        color: #1a1a1a;
        background: #f6f6f6;
        background-color: #fff;
        border-radius: 2px;
        overflow: hidden;
        width: 50%;
        max-width: 777px;
        padding:20px 40px;
        min-height: 1000px;
        margin: 0 auto;
        text-align: center;
        line-height: 27px;
  }
}
</style>