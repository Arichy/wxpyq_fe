// 详细信息-单个人信息的组件
<template>
  <div class="cell_wrapper" v-if="userInfo">
    <div class="cell_title">
      <img :src="userInfo.avatar" alt>
      <span>{{userInfo.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "infoCell",
  props: {
    userInfo: Object
  }
};
</script>

<style scoped>
.cell_wrapper {
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
</style>
