<script lang="ts">
import Toolbar from "./Toolbar.vue"
import PageBody from "./PageBody.vue";
import { eval_user_info, logout, UserInfo } from "../User";
import { request } from "../Request";
import { ref } from "vue";

export default {
  name: "PersonalPage",
  components: { Toolbar, PageBody }
}
</script>

<script setup lang="ts">
const user_info = ref<UserInfo | undefined>(undefined)

function user_logout() {
  logout()
}

function goto_history() {
  window.location.href = "/history"
}

function get_user_info() {
  request("user/info", {}, (status, obj) => {
    if (status == 200 && obj?.code === 200) {
      user_info.value = eval_user_info(obj.data)
      console.log(user_info.value)
    }
  })
}

get_user_info()
</script>

<template>
  <toolbar title="个人中心">
    <a class="mdui-btn mdui-btn-icon mdui-ripple" @click="get_user_info">
      <i class="mdui-icon material-icons">refresh</i>
    </a>
  </toolbar>
  <page-body>
    <div v-if="user_info !== undefined" class="mdui-container">
      <div class="mdui-col-md-3"></div>
      <div class="mdui-col-md-6">
        <!-- 用户信息卡片 -->
        <div class="mdui-card">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title mdui-text-uppercase">{{ user_info.name }}</div>
            <div class="mdui-card-primary-subtitle">{{ user_info.email }}</div>
          </div>
          <div class="mdui-card-actions">
            <button class="mdui-btn mdui-ripple" disabled>余额 ¥{{ user_info.balance / 100 }}</button>
            <button class="mdui-btn mdui-ripple mdui-float-right">充值</button>
          </div>
        </div>
        <div class="normal-divider"></div>
        <ul class="mdui-list">
          <li class="mdui-list-item mdui-ripple" @click="goto_history">
            <div class="mdui-list-item-content">模版购买记录</div>
            <i class="mdui-list-item-icon mdui-icon material-icons">chevron_right</i>
          </li>
        </ul>
        <div class="normal-divider"></div>
        <button class="mdui-btn mdui-btn-block mdui-color-red" @click="user_logout">退出登录</button>
      </div>
      <div class="mdui-col-md-3"></div>
    </div>
  </page-body>
</template>

<style>
.normal-divider {
  height: 32px;
}
</style>