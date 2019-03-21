<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
      <!-- 表单 -->
      <form>
        <InputGroup label="账号" placeholder="请填写邮箱" v-model="user.email"></InputGroup>
        <InputGroup label="密码" placeholder="请填写密码" v-model="user.password" type="password"></InputGroup>
      </form>
      <div class="btn_wrap" style="margin-top:30px;">
        <XButton :disabled="isDisabled" @click="loginClick">登陆</XButton>
      </div>
    </div>
    <div class="footer_wrap">
      |
      <button class="register" @click="$router.push('/register')">注册账号</button> |
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup.vue";
import XButton from "@/components/XButton.vue";

export default {
  name: "login",
  components: {
    InputGroup,
    XButton
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    isDisabled() {
      if (this.user.email && this.user.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    loginClick() {
      let reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法的邮箱地址！");
        return;
      }

      this.$http
        .post("/api/users/login", this.user)
        .then(res => {
          console.log(res);
          // 存储token
          const { token } = res.data;
          localStorage.setItem("wxpyqToken", token);

          // 页面跳转
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.title {
  margin-top: 80px;
  font-size: 22px;
  text-align: center;
}

.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 16px;
  text-align: center;
  width: 100%;
  color: #888;
}

.footer_wrap .register {
  font-size: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  color: #7b8ca9;
}
</style>
