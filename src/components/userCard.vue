<template>
  <div class="main">
    <div class="container">
      <div class="avatar"></div>
      <div class="user-info">
        <div class="user-name">{{userInfo.name}}</div>
        <img class="user-gender" v-if='this.userInfo.gender==1' src="../assets/male.png" />
        <img class="user-gender" v-else src="../assets/female.png" />
        <div class="follow-block">
          <div class="following">关注: {{userInfo.following}}</div>
          <div class="follower">粉丝: {{userInfo.fans}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Request from "@/util/request.js";
export default {
  props: {
    userId: String
  },
  data() {
    return {
      userInfo: Object,
      genderImg: "../assets/male.png"
    };
  },
  created() {
    if (this.userId <= 0 || this.userId == undefined) {
      this.push("/signIn");
    }
    Request.getUserInfo(this.userId).then(res => {
      console.log(res.data);
      this.userInfo = res.data;
      console.log(this.userInfo);
      this.genderImg = this.userInfo.gender == 1 ? "../assets/male.png" : "../assets/female.png";
    });
    console.log(this.genderImg);
  }
};
</script>
<style lang="less" scoped>
.main {
  color: #1a1a1a;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 2px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  .container {
    background-color: #fff;
    margin: 10px auto;
    height: 100%;
    width: 50%;
    .userInfo {
      height: auto;
      width: auto;
      .user-info {
        margin: auto 0;
        width: 80%;
        max-width: 777px;
        height: auto;
        font-size: 1.5rem;
        .user-name {
          text-align: left;
          font-size: 30px;
          height: 50px;
          display: inline-block;
        }
        .user-gender {
          margin-top: 3px;
          padding-left: 5px;
          width: 20px;
          height: 20px;
          display: inline-block;
        }
        .follow-block {
          margin: 10px 40px;
          display: inline-block;
          font-size: 14pt;
          font-weight: 400;
          .follower {
            padding: 10px;
            display: inline-block;
            font-size: 14pt;
          }
          .following {
            padding: 10px;
            display: inline-block;
            font-size: 14pt;
          }
        }
      }
      .avatar {
        /* 暂时不需要 */
        display: none;
        background: #fff;
        position: relative;
        width: 70px;
        height: 70px;
        top: 30%;
        left: 30px;
      }
    }
  }
}
</style>