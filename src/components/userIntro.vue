<template>
  <el-card class="user-card">
    <div class="clearfix">
      <span>昵称: </span>
      <span v-if="!modify">{{ user.name }}</span>
      <el-input v-if="modify" class="input-name" v-model="user.name" />
    </div>
    <el-divider />
    <div class="clearfix">
      <span>性别: </span>
      <span v-if="!modify">{{gender(user.gender)}}</span>
      <el-radio-group v-else class="gender-picker" v-model="user.gender" >
        <el-radio label="1" border>男</el-radio>
        <el-radio label="0" border>女</el-radio>
      </el-radio-group>
    </div>
    <el-divider />
    <div class="clearfix">
      <span>生日: </span>
      <span v-if="!modify">{{birthday(user.birthday)}}</span>
      <el-date-picker
        v-else
        class="birthday"
        v-model=user.birthday
        align="center"
        type="date"
        placeholder="生日日期"
        :picker-options="pickerOptions1"
      ></el-date-picker>
    </div>
    <el-divider v-if="self"/>
    <el-button v-if="self && !modify" @click="modify = true">修改</el-button>
    <el-button v-if="self && modify" @click="update">提交</el-button>
  </el-card>
</template>

<script>
import Request from "@/util/request.js";
export default {
  props: {
    userId: String
  },
  created() {
    let selfId = localStorage.getItem("userId");
    if (selfId == this.userId) {
      this.self = true;
    }
    Request.getUserInfo(this.userId).then(res => {
      console.log("userIntro", res.data);
      this.user = res.data;
      console.log(this.user.birthday);
    });
  },
  methods: {
    update(){
      console.log(this.user)
      this.modify = true;
      let data = {
        userName: this.user.name,
        birthday: '',
        gender: this.user.gender
      };
      if(this.user.birthday != null){
        // 修正时区
        data.birthday = this.user.birthday.getTime()+3600*1000*8;
      }
      console.log(data);
      Request.updateUserInfo(this.user.id,data)
      .then(res=>{
        console.log(res.data);
        this.$notify({
          message: res.data.message
        });

      })
    },
    birthday(str){
      if(str == "" || str == undefined){
        return "未知"
      }
      return this.user.birthday.substr(0,10);
    },
    gender(genderNum) {
      if (genderNum == 1) {
        return "男";
      }
      if (genderNum == 0) {
        return "女";
      }
      return "未知";
    }
  },
  data() {
    return {
      self: false,
      modify: false,
      newBirthday: Date,
      user: {
        name: "",
        birthday: "",
        phone: "",
        gender: "1"
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  }
};
</script>
<style lang="less" scoped>
.user-card {
  padding: 10px;
  line-height: 1.5rem;
  .clearfix {
    padding: 5px;
    .input-name {
      width: 150px;
      font-size: 13pt;
      margin-left: 10px;
    }
    .gender-picker {
      width: 300px;
      margin-left: 10px;
    }
    .birthday {
      margin-left: 10px;
    }
    display: block;
  }
  .item {
    font-size: 14pt;
    color: #111;
    padding: 5px;
  }
}
</style>