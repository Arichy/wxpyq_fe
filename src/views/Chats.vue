<template>
  <div>
    <Header title="微信" btn_icon="plus"></Header>
    <div class="container">
      <UserCell
        v-for="(chatItem) of chatDataList"
        :key="chatItem._id"
        :user="chatItem.target"
        :count="chatItem.count"
        @click="$router.push({name:'chat',params:{user:chatItem.target}})"
      ></UserCell>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import UserCell from "@/components/UserCell.vue";
import WSocket from "@/socket.js";

export default {
  name: "chats",
  components: { Header, UserCell },
  data() {
    return {
      chatDataList: []
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$http(`/api/messages/msg/${vm.user.id}`).then(res => {
        vm.chatDataList = res.data;
      });
    });
  },

  mounted() {
    WSocket.init(
      { user: this.user },
      message => {
        this.setMsgCount(message);
      },
      err => console.log(err)
    );
  },

  methods: {
    setMsgCount(message) {
      // 判断消息列表中是否有该用户
      let chatUser = this.chatDataList.filter(chatItem => {
        return chatItem.target._id == message.from;
      });
      // 如果存在,count+1并且保存消息
      if (chatUser.length > 0) {
        chatUser[0].count++;
        chatUser[0].message.push({
          msg: message.msg,
          source: "other"
        });
        this.saveMsg(
          chatUser[0].target,
          chatUser[0].count,
          chatUser[0].message
        );
      } else {
        // 如果不存在，那么获取用户信息并显示提醒
        this.getUserInfo(message);
      }
    },

    getUserInfo(message) {
      // 根据id查询用户信息
      this.$http(`/api/users/${message.from}`).then(res => {
        const msg = [];
        msg.push({
          msg: message.msg,
          source: "other"
        });
        // 将消息保存在聊天列表中,count为1
        this.chatDataList.push({
          target: res.data,
          count: 1,
          message: msg
        });

        this.saveMsg(res.data, 1, msg);
      });
    },

    saveMsg(targetUser, count, msg) {
      const messageObj = {
        target: {
          avatar: targetUser.avatar,
          name: targetUser.name,
          _id: targetUser._id
        },
        count,
        message: msg,
        user_id: this.user.id
      };
      this.$http.post("/api/messages/addmsg", messageObj).then(res => {
        console.log("数据保存成功");
      });
    }
  }
};
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  overflow: auto;
}
</style>