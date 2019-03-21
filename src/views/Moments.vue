<template>
  <div class="cicle">
    <Header title="朋友圈" btn_icon="camera" :isLeft="true" @rightClick="$router.push('/publish')"></Header>
    <div class="container">
      <!-- <div class="scroll-wrap"> -->
      <Scroll @pulldown="loadData" @pullup="loadMore" ref="refresh">
        <div class="head_wrapper">
          <div class="user_head">
            <span>{{user.name}}</span>
            <div class="user_img">
              <img :src="user.avatar" alt class="head_img">
            </div>
          </div>
        </div>
        <div class="content_wrapper">
          <CellView v-for="(moments,index) of momentsList" :key="index" :momentsObj="moments"></CellView>
        </div>
      </Scroll>
      <!-- </div> -->
      <!-- <Loading :loading="loading"></Loading> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import CellView from "@/components/CellView.vue";
import Scroll from "@/components/Scroll.vue";
import Loading from "@/components/Loading.vue";
import jwtDecode from "jwt-decode";

export default {
  name: "moments",
  components: { Header, CellView, Scroll, Loading },
  computed: {
    user() {
      const token = localStorage.getItem("wxpyqToken");
      // 解析token
      const decode = jwtDecode(token);
      console.log(decode);

      return decode;
    }
  },

  data() {
    return {
      momentsList: [],
      page: 2, // 加载更多，从page2开始
      size: 3, // 每次请求3条数据
      loading: false
    };
  },

  methods: {
    getLatestData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$http
        .get("/api/profiles/latest")
        .then(res => {
          this.loading = false;
          this.momentsList = [...res.data];

          this.$refs.refresh.$emit("refresh");
        })
        .catch(err => {
          console.log(err);
        });
    },

    loadData() {
      this.page = 2;
      this.getLatestData();
    },

    loadMore() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$http(`/api/profiles/${this.page}/${this.size}`).then(res => {
        this.loading = false;
        const result = [...res.data];
        for (const item of result) {
          this.momentsList.push(item);
        }
        this.page++;

        if (result.length == 0) {
          this.$refs.refresh.$emit("loadDone");
        }
      });
    }
  },

  created() {
    this.getLatestData();
  }
};
</script>

<style lang="scss" scoped>
.cicle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
  overflow: auto;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url(../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_head img {
  width: 100%;
  height: 100%;
}
.user_head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color: white;
}
</style>
