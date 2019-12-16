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
    </div>
  </div>
</template>
<script>
import userCard from "@/components/userCard.vue";
import header from "@/components/header.vue";

export default {
  components: {
    userCard,
    "m-header": header
  },
  methods: {
    handleSelect() {}
  },
  data() {
    return {
      activeIndex: '1',
      userId: -1
    };
  },
  created() {
    this.userId = this.$route.query.userId;
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
      max-width: 777px;
    }
    .navigation {
      margin: 0 auto;
      width: 100%;
      max-width: 777px;
    }
  }
}
</style>