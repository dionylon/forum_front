<template>
  <div class="main">
    <div class="normal-title">
        <el-button class="change-button active">登录</el-button>
        <b>-</b>
        <el-button class="change-button" @click="signUp">注册</el-button>
    </div>
    <div class="form-container">
      <div class="input-name">
        <el-input
          placeholder="用户名"
          v-model="inputName">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </div>
      <div class="input-password">
        <el-input
          placeholder="密码"
          v-model="inputPassword" type="password">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </div>
    </div>
    <div class="submit">
      <el-button class="button-submit" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import Request from '@/util/request.js';
import router from "../router/index";
import StatusCode from "@/util/StatusCode.js";

export default {
    data() {
        return {
          inputName: '',
          inputPassword: '',
          tips: ''
        }
    },
    methods: {
      login() {
        Request.login(this.inputName,this.inputPassword)
          .then(res=>{
            console.log(res);
            let data = res.data;
            if(data.status == StatusCode.OK){
              localStorage.setItem("username",this.inputName)
              localStorage.setItem("userId",data.userId);
              console.log("userName:" + localStorage.getItem("username"));
              console.log("OK, token" + data.token +"\n id:"+data.userId);
              this.$message({
                message: '登陆成功!',
                type: 'success',
                duration: 1000
              });
              setTimeout(()=>{router.push('/home');},1000);
            }
          })
        console.log(this.inputName);
        console.log(this.inputPassword);
      },
      signUp(){
        router.push('/signUp');
      }
    }
}
</script>

<style lang="less" scoped>
.main{
  vertical-align: middle;  
  margin: 100px auto;
  width: 300px;
  box-shadow: 0px 0px 7px rgba(123,123,123,0.1);
  .normal-title{
    border: none;
    outline: none;
    box-direction: none;
    text-align: center;
    text-decoration: none;
    .change-button{
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
    .change-button:hover{
      color: #0084ff;
      border-bottom: 2px solid #0084ff;
    }
    .active{
      font-weight: bolder;
      color: #0084ff;
      border-bottom: 2px solid #0084ff;
    }
  }
  .form-container{
    padding: 20px;
  }
  .submit{
    width: 100%;
    .button-submit{
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