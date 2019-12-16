<template>
  <div class="main">
    <div class="normal-title">
      <el-button class="change-button" @click="signIn">登录</el-button>
      <b>-</b>
      <el-button class="change-button active">注册</el-button>
    </div>
    <div class="form-container">
      <div class="input-name">
        <el-input placeholder="用户名" maxlength="10" v-model="inputName">
          <!-- <i slot="prefix" class="el-input__icon el-icon-user"></i> -->
        </el-input>
        <el-alert v-show="nameAlert" :closable="false" title="用户名过短" type="error" show-icon></el-alert>
      </div>
      <div class="input-password">
        <el-input placeholder="密码" v-model="inputPassword" type="password">
          <!-- <i slot="prefix" class="el-input__icon el-icon-user"></i> -->
        </el-input>
        <el-alert v-show="passwordAlert" :closable="false" title="密码过短" type="error" show-icon></el-alert>
      </div>
      <div class="input-password">
        <el-input placeholder="确认密码" v-model="confirmPassword" type="password">
          <!-- <i slot="prefix" class="el-input__icon el-icon-user"></i> -->
        </el-input>
        <el-alert v-show="confirmAlert" :closable="false" title="密码不一致" type="error" show-icon></el-alert>
      </div>
    </div>
    <div class="submit">
      <el-button class="button-submit" @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
import Request from "@/util/request.js";
import StatusCode from "@/util/StatusCode.js";
export default {
  data() {
    return {
      inputName: "",
      inputPassword: "",
      confirmPassword: "",
      tips: "",
      alertTitle: String,
      confirmAlert: false,
      nameAlert: false,
      passwordAlert: false
    };
  },
  methods: {
    register() {
      if (this.check() == false) {
        return;
      }
      console.log(this.inputPassword);
      let name = this.inputName;
      let pwd = this.inputPassword;
      Request.register(name, pwd).then(res => {
        console.log(res.data);
        let data = res.data;
        if (data.status == StatusCode.OK) {
          this.$notify({
            title: "成功！",
            message: "注册成功!"
          });
          this.login(name, pwd);
        } else {
          console.log("错误");
          this.$notify.error({
            title: "错误",
            message: data.message,
            offset: 0
          });
        }
      });
    },
    login() {
      Request.login(this.inputName, this.inputPassword).then(res => {
        console.log(res);
        let data = res.data;
        if (data.status == StatusCode.OK) {
          localStorage.setItem("username", this.inputName);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("token", data.token);
          console.log("userName:" + localStorage.getItem("username"));
          console.log("OK, token" + data.token + "\n id:" + data.userId);
          setTimeout(() => {
            this.$router.push("/home");
          }, 1000);
        } else {
          this.$notify.error({
            message: "服务器错误"
          });
        }
      });
      console.log(this.inputName);
      console.log(this.inputPassword);
    },
    check() {
      if (this.inputName.length < 3) {
        this.$notify({
          title: "警告",
          message: "用户名过短",
          type: "warning"
        });
        return false;
      }
      if (this.inputPassword < 4) {
        this.$notify({
          title: "警告",
          message: "密码过短",
          type: "warning"
        });
        return false;
      }
    },
    signIn() {
      this.$router.push("/signIn");
    }
  },
  watch: {
    inputPassword: function(newPassword, oldPassword) {
      console.log(newPassword + " " + oldPassword);
      if (newPassword.length < 5) {
        console.log(newPassword.length);
        this.passwordAlert = true;
      } else {
        this.passwordAlert = false;
      }
    },
    inputName: function(newName, oldName) {
      console.log(newName + " " + oldName);
      if (newName.length < 3) {
        console.log(newName.length);
        this.nameAlert = true;
      } else {
        this.nameAlert = false;
      }
    },
    confirmPassword: function(newInput, oldInput) {
      if (newInput != this.inputPassword) {
        this.alertTitle = "两次密码不一致";
        this.confirmAlert = true;
      } else {
        this.confirmAlert = false;
      }
      console.log(newInput + " " + oldInput);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  vertical-align: middle;
  margin: 100px auto;
  width: 300px;
  box-shadow: 0px 0px 7px rgba(123, 123, 123, 0.1);
  .normal-title {
    border: none;
    outline: none;
    box-direction: none;
    text-align: center;
    text-decoration: none;
    .change-button {
      border: none;
      text-decoration: none;
      outline: none;
      line-height: 24px;
      margin: auto;
      text-align: center;
      font-size: 15px;
      border-radius: 0;
      color: #666;
      background-color: transparent;
    }
    .change-button:hover {
      color: #0084ff;
      border-bottom: 2px solid #0084ff;
    }
    .active {
      font-weight: bolder;
      color: #0084ff;
      border-bottom: 2px solid #0084ff;
    }
  }
  .form-container {
    padding: 20px;
    .input-name {
      margin: 5px;
    }
    .input-password {
      margin: 5px;
    }
  }
  .submit {
    width: 100%;
    .button-submit {
      color: #ffffff;
      background: #0084ffce;
      outline: none;
      box-decoration-break: none;
      text-align: center;
      width: fill;
      margin: 10px;
    }
  }
}
</style>