<template>
  <div>
    <m-header></m-header>
    <el-container>
        <el-main class="main">
          <router-view/>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import header from "./header.vue";

export default {
    name: 'layout',
    data() {
      return {
        activeIndex: "1"
      }
    },
    components:{
      "m-header": header
    }
}
</script>
<style scoped>
.el-main {
    background-color: #f6f6f6;
    color: rgb(61, 56, 56);
    text-align: center;
    line-height: 10px;
  }

</style>