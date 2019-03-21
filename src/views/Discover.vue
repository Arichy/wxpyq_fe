<template>
  <div class="discover">
    <Header title="发现"/>
    <div class="content">
      <Cell :src="cellData.src" :title="cellData.title" :path="cellData.path"></Cell>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Cell from "@/components/Cell.vue";

export default {
  name: "discover",
  components: { Header, Cell },
  data() {
    return {
      cellData: {
        src: "pyq.jpg",
        title: "朋友圈",
        path: "/moments"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.discover {
  width: 100%;
  height: calc(100% - 55px);
  position: relative;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}
</style>
