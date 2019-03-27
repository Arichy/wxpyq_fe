<template>
  <div class="address_book">
    <Header title="通讯录" btn_icon="user-plus"></Header>
    <div class="container">
      <div class="content_wrap">
        <!-- 搜索框 -->
        <div class="search_wrap">
          <div class="search_content">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="搜索" v-model="search_value">
          </div>
        </div>
        <!-- 联系人列表 -->
        <UserCell
          v-for="(friend) of friendList"
          :key="friend._id"
          :user="friend"
          @click="cellClick(friend)"
        ></UserCell>

        <!-- 最下面 -->
        <div class="count_wrap">
          <span>{{friendList.length}}位联系人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import UserCell from "@/components/UserCell.vue";

export default {
  name: "contacts",
  components: { Header, UserCell },
  data() {
    return {
      friendList: [],
      allFriends: null,
      search_value: ""
    };
  },

  created() {
    this.getFriendsList();
  },

  methods: {
    getFriendsList() {
      this.$http.get("/api/users/all").then(res => {
        this.friendList = [...res.data];
        this.allFriends = [...res.data];
      });
    },

    filterData() {
      this.friendList = this.allFriends.filter(
        friend => ~friend.name.indexOf(this.search_value)
      );
    },

    cellClick(friend) {
      console.log(friend);
      this.$store.dispatch("setTargetUser", friend);
      this.$router.push("/information");
    }
  },
  watch: {
    search_value() {
      this.filterData();
    }
  }
};
</script>

<style scoped>
.address_book {
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

.search_wrap {
  background-color: #f1f1f1;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
}
.search_content {
  height: 40px;
  background: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.search_content i {
  color: #888;
  margin-right: 10px;
}
.search_content input {
  height: 36px;
  width: 90%;
  outline: none;
  border: none;
  font-size: 14px;
}

.count_wrap {
  min-height: 50px;
  background-color: #fff;
  box-sizing: border-box;
  color: #888;
  font-size: 16px;
  width: 100%;
  line-height: 50px;
  text-align: center;
}
</style>

