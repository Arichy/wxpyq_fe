<template>
  <div class="tabbar">
    <router-link class="tab-item" v-for="(item,index) of data" :key="index" :to="item.path" active-class="is-selected">
      <div class="tab-item-icon">
        <i :class="`fa fa-${item.icon}`"></i>
      </div>
      <div class="tab-item-label">{{item.title}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    data: Array
  }
};
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 55px;
  box-sizing: border-box;

  position: fixed;
  bottom: 0;

  display: flex;
  text-align: center;

  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #fafafa;

  .tab-item {
    display: block;
    padding: 7px 0;
    flex: 1;

    .tab-item-icon {
      width: 24px;
      height: 24px;
      margin: 0 auto 5px;

      i {
        font-size: 1.3rem;
      }
    }

    .tab-item-label {
      color: inherit;
      font-size: 12px;
      line-height: 1;
    }
  }
}
a {
  text-decoration: none;
  color: #888;
}
.is-selected {
  color: #20af0e;
}
</style>
