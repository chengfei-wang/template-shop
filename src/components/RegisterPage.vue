<script lang="ts">
import Toolbar from "./Toolbar.vue";

import {register} from "../user";
import {ref} from "vue";
import mdui from "mdui";

export default {
  name: "RegisterPage",
  components: {Toolbar}
}
</script>

<script setup lang="ts">

defineProps<{}>()

const email = ref("")
const name = ref("")
const password = ref("")
const password_confirm = ref("")

function register_handler() {
  let _email = email.value
  let _name = name.value
  let _password = password.value
  let _password_confirm = password_confirm.value
  if (_email.length <= 0 || !_email.match("^(.+)@(.+)\$")) {
    mdui.snackbar({
      message: '邮箱不合法',
      position: 'bottom',
    });
    return
  }

  if (_name.length <= 0) {
    mdui.snackbar({
      message: '请输入用户名',
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

  if (_password !== _password_confirm) {
    mdui.snackbar({
      message: '两次密码不一致',
      position: 'bottom',
    });
    return;
  }

  register(_email, _name, _password, (code: number, message: string, data: any | null) => {
    if (code != 200 || data == null) {
      mdui.snackbar({
        message: message,
        position: 'bottom',
      });
    } else {
      window.location.href = "/login"
    }
  })

}
</script>

<template>
  <toolbar title="用户注册"/>
  <div class="mdui-container">
    <div class="mdui-col-lg-3"></div>
    <div class="mdui-col-lg-6">
      <form onsubmit="return false">
        <h1 class="mdui-text-center mdui-typo-headline">Template Shop</h1>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">登录邮箱</label>
          <input id="input_register_email" class="mdui-textfield-input" type="email"
                 autocomplete="off" autofocus="autofocus" v-model="email" required/>
          <div class="mdui-textfield-error">邮箱格式错误</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">用户名</label>
          <input id="input_register_name" class="mdui-textfield-input" type="text"
                 autocomplete="off" v-model="name" required/>
          <div class="mdui-textfield-error">请输入用户名</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">设置密码</label>
          <input id="input_register_password" class="mdui-textfield-input" type="password"
                 autocomplete="off" v-model="password" required/>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">重复密码</label>
          <input id="input_register_password_confirm" class="mdui-textfield-input" type="password"
                 autocomplete="off" v-model="password_confirm" required/>
        </div>
        <input type="submit" style="margin-top: 32px" value="注册" v-on:click="register_handler"
               class="mdui-btn mdui-btn-block mdui-color-green mdui-text-color-white"/>
      </form>
    </div>
    <div class="mdui-col-lg-3"></div>
  </div>
</template>