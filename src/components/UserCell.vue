// 联系人列表，每一个联系人的组件
<template>
  <div class="cell_wrapper" @click="$emit('click')" v-if="user">
    <div class="cell_title">
      <img :src="user.avatar" alt>
      <span v-show="count" class="badge">{{count}}</span>
      <span>{{user.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "userCell",
  props: {
    user: Object,
    count: Number
  }
};
</script>

<style scoped>
.cell_wrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 50px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 50px;
  /* border-top: 1px solid #d9d9d9; */
  border-bottom: 1px solid #d9d9d9;
}
.cell_title {
  flex: 1;
}
.cell_title img {
  width: 2.5rem;
  height: 2.5rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}
.cell_title span {
  display: inline-block;
  vertical-align: middle;
}
.badge {
  background-color: #ff0a0a;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
  position: absolute;
  left: 2rem;
}
</style>
 