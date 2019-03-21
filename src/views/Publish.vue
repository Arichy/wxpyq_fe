<template>
  <div class="publish">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
      <button @click="publish">发布</button>
    </div>

    <div class="content">
      <div class="text_wrap">
        <textarea placeholder="说说你的想法..." v-model="text"></textarea>
        <!-- 图片上传 -->
        <Upload :loading="loading" @getImgs="getImgs"></Upload>
      </div>
    </div>

    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import Loading from "@/components/Loading.vue";
import jwtDecode from "jwt-decode";
export default {
  name: "publish",
  components: {
    Upload,
    Loading
  },
  data() {
    return {
      text: "",
      imgs: [],
      loading: false
    };
  },
  computed: {
    user() {
      const token = localStorage.getItem("wxpyqToken");
      // 解析token
      const decode = jwtDecode(token);
      console.log(decode);

      return decode;
    }
  },
  methods: {
    publish() {
      this.loading = true;
      const postData = {
        name: this.user.name,
        img: this.user.avatar,
        text: this.text,
        imgs: this.imgs.join("|")
      };
      // console.log(postData.imgs);

      // 调用发布朋友圈的接口
      this.$http
        .post("/api/profiles/add", postData)
        .then(res => {
          // 发布成功后跳转到朋友圈
          this.loading = false;
          this.$router.push("/moments");
        })
        .catch(err => {
          console.log(err);
        });
    },

    getImgs(imgs) {
      for (const file of imgs) {
        this.uploadFile(file);
      }
    },

    uploadFile(file) {
      let reader = new FileReader();

      reader.onload = e => {
        this.imgs.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.publish {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  line-height: 50px;
  justify-content: space-between;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
}
.header button:nth-child(2) {
  color: #20af0e;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}
.text_wrap textarea {
  width: 100%;
  font-size: 14px;
  min-height: 60px;
  border: none;
  outline: none;
}
.text_wrap {
  margin-bottom: 16px;
}
</style>
