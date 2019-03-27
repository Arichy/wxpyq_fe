<template>
  <div class="mine">
    <Header title="我的"></Header>
    <div class="container">
      <!-- <div class="cell_wrapper">
        <div class="cell_title">
          <img :src="user.avatar" alt v-if="user">
          <span>{{user.name}}</span>
        </div>
      </div>
      <div class="btn_wrapper">
        <XButton @click="logout">退出登录</XButton>
      </div>-->
      <InfoCell :userInfo="user"></InfoCell>
      <div class="btn_wrapper">
        <XButton @click="logout">退出登录</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import InfoCell from "@/components/InfoCell.vue";
import jwtDecode from "jwt-decode";
import XButton from "@/components/XButton.vue";

export default {
  name: "me",
  // computed: {
  //   user() {
  //     const token = localStorage.getItem("wxpyqToken");
  //     // 解析token
  //     const decode = jwtDecode(token);
  //     console.log(decode);

  //     return decode;
  //   }
  // },
  data() {
    return {
      user: this.$store.getters.user
    };
  },
  components: { Header, XButton, InfoCell },

  methods: {
    logout() {
      localStorage.removeItem("wxpyqToken");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.mine {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}

/* .cell_wrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 80px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 80px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.cell_title {
  flex: 1;
}
.cell_title img {
  width: 4rem;
  height: 4rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}
.cell_title span {
  display: inline-block;
  vertical-align: middle;
}
*/

.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
</style>
