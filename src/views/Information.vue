<template>
  <div class="information">
    <Header :is-left="true" title="详细资料" btn_icon="ellipsis-h"></Header>
    <div class="container">
      <InfoCell :userInfo="targetUser"></InfoCell>
      <div class="btn_wrapper">
        <XButton @click="$router.push({name:'chat',params:{user:targetUser}})">发消息</XButton>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import InfoCell from "@/components/InfoCell.vue";

import XButton from "@/components/XButton.vue";

export default {
  name: "information",
  computed: {
    targetUser() {
      return this.$store.getters.targetUser;
    }
  },
  components: { Header, XButton, InfoCell },
  created() {
    console.log(this.targetUser);
  },
  methods: {}
};
</script>

<style scoped>
.information {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  box-sizing: border-box;
  padding: 16px 0;
  background-color: #f1f1f1;
}

.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
</style>
