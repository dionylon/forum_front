<template>
  <div class="m-header">
    <div class="m-header-container">
      <div>
        <router-link class="m-logo" to="/home">
          <svg
            viewBox="0 0 200 91"
            class="Icon ZhihuLogo ZhihuLogo--blue Icon--logo"
            width="64"
            height="30"
            aria-hidden="true"
            style="height: 30px; width: 64px;"
          >
            <title />
            <g>
              <path
                d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        </router-link>
      </div>
      <div class="m-header-nav">
        <router-link to="/home" class="m-header-nav-item">首页</router-link>
      </div>
      <el-button class="ask-button" @click="clickHandler">{{btnText}}</el-button>
      <div class="user-info-div">
        <el-button class="sign-up" @click="signUp" v-if="!logged">登录/注册</el-button>
        <el-button @click="userInfo" class="sign-up" v-if="logged">{{username}}</el-button>
        <el-button class="sign-up" @click="logout" v-if="logged">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  name: "m-header",
  props: {
    btnText: {
      type: String,
      default: "写文章"
    },
    clickHandler: {
      type: Function,
      default: () => {
        let routeData = router.resolve({
          path: "/write",
          name: "writeArticle"
        });
        window.open(routeData.href, "_blank");
      }
    }
  },
  data() {
    return {
      username: "",
      logged: false
    };
  },
  created() {
    console.log("created");
    this.username = localStorage.getItem("username");
    if (this.username != undefined && this.username != "") {
      this.logged = true;
    } else {
      this.logged = false;
    }
  },
  methods: {
    userInfo() {
      let userId = localStorage.getItem("userId");
      if (userId == -1 || userId == undefined) {
        this.push("/signIn");
      }
      let routeData = router.resolve({
        path: "/user/profile",
        name: "userProfile",
        query: {
          userId: userId
        }
      });
      window.open(routeData.href, "_blank");
    },
   
    signUp() {
      router.push("/signIn");
    },
    logout() {
      console.log("登出");
      this.logged = false;
      localStorage.setItem("username", "");
      localStorage.setItem("token", "");
      localStorage.setItem("userId", -1);
      console.log(localStorage.getItem("userId"));
    }
  }
};
</script>
<style lang="less" scoped>
.m-header {
  position: fixed;
  z-index: 1600;
  top: 0;
  height: 52px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(13, 13, 13, 0.05);
  -webkit-box-shadow: 0 3px 6px rgba(13, 13, 13, 0.05);
  .m-header-container {
    display: flex;
    align-items: center;
    height: 52px;
    width: 55%;
    margin: auto 377px;
    .m-logo {
      height: 40px;
      width: 64px;
      fill: #0084ff;
    }
    .m-header-nav {
      flex: 1;
      padding-left: 40px;
      .m-header-nav-item {
        text-decoration: none;
        font-weight: normal;
        color: #666;
        margin: 0 20px;
        padding-bottom: 10px;
        &.router-link-exact-active {
          color: #000000;
          font-weight: bold;
          border-bottom: 3px solid #0084ff;
        }
      }
    }
    .ask-button {
      padding: 0 14px;
      font-size: 14px;
      z-index: 103;
      line-height: 30px;
      background-color: #0084ff;
      color: #fff;
      border: 1px solid;
      border-color: #0084ff;
      border-radius: 3px;
    }
    .user-info-div {
      width: auto;
      .sign-up:hover {
        color: #0084ff;
        font-weight: bolder;
      }
      .sign-up {
        overflow: hidden;
        width: auto;
        border: none;
        text-decoration: none;
        outline: none;
        line-height: 24px;
        margin: 0 auto;
        text-align: center;
        font-size: 15px;
        color: #0084ff;
        background-color: transparent;
      }
    }
  }
}
</style>