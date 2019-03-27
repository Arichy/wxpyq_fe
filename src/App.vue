<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";

export default {
  created() {
    if (localStorage.wxpyqToken) {
      const decode = jwtDecode(localStorage.wxpyqToken);
      this.$store.dispatch("setUser", decode);
    }
  }
};
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
