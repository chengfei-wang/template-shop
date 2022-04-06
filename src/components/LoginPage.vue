<script lang="ts">
import Toolbar from "./Toolbar.vue";
import PageBody from "./PageBody.vue";

import {login} from "../User";
import {ref} from "vue";
import mdui from "mdui";

export default {
  name: "LoginPage",
  components: {Toolbar, PageBody}
}
</script>

<script setup lang="ts">
defineProps<{}>()

const email = ref("")
const password = ref("")

function login_handler() {
  let _email = email.value
  let _password = password.value
  if (_email.length <= 0 || !_email.match("^(.+)@(.+)\$")) {
    mdui.snackbar({
      message: '邮箱不合法',
      position: 'bottom',
    });
    return
  }

  if (_password.length <= 0) {
    mdui.snackbar({
      message: '请输入密码',
      position: 'bottom',
    });
    return;
  }

  login(_email, _password, (code: number, data: any | null) => {
    if (code != 200 || data == null) {
      mdui.snackbar({
        message: '用户名或密码错误',
        position: 'bottom',
      });
    } else {
      window.location.href = "/"
    }
  })

}

</script>

<template>
  <toolbar title="用户登录">
      <a href="register" class="mdui-btn">
        <p>注册</p>
      </a>
  </toolbar>
  <page-body>
    <div class="mdui-container">
      <div class="mdui-col-lg-3"></div>
      <div class="mdui-col-lg-6">
        <form onsubmit="return false">
          <h1 class="mdui-text-center mdui-typo-headline">Template Shop</h1>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">邮箱</label>
            <input id="input_login_email" class="mdui-textfield-input" type="email"
                   autocomplete="off" autofocus v-model="email" required/>
            <div class="mdui-textfield-error">邮箱格式错误</div>
          </div>
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">密码</label>
            <input id="input_login_password" class="mdui-textfield-input" type="password"
                   autocomplete="off" v-model="password" required/>
          </div>
          <input type="submit" style="margin-top: 32px" value="提交" v-on:click="login_handler"
                 class="mdui-btn mdui-btn-block mdui-color-green mdui-text-color-white"/>
        </form>
      </div>
      <div class="mdui-col-lg-3"></div>
    </div>
  </page-body>
</template>