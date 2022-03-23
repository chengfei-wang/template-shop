<script setup lang="ts">
import {login} from "../user";
import {ref} from "vue";
import mdui from "mdui";

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
      buttonText: 'EDIT',
      onButtonClick: function(){
        // $('#input_login_email').focus()
      },
    });
    return
  }

  if (_password.length <= 0) {
    return;
  }

  login(_email, _password, (data: any) => {
    if (data == null) {
      mdui.snackbar({
        message: '用户名或密码错误',
        position: 'bottom',
      });
    } else {
      window.location.href = "/"
    }
  })

}

function register_handler() {

}
</script>

<template>
  <div class="mdui-container">
    <div class="mdui-col-lg-3"></div>
    <div class="mdui-col-lg-6">
      <h1 class="mdui-text-center mdui-typo-headline">Template Shop</h1>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">邮箱</label>
        <input id="input_login_email" class="mdui-textfield-input" type="email" v-model="email"/>
        <div class="mdui-textfield-error">邮箱格式错误</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">密码</label>
        <input id="input_login_password" class="mdui-textfield-input" type="password" v-model="password"/>
      </div>
      <input type="button" style="margin-top: 32px" value="提交" v-on:click="login_handler"
             class="mdui-btn mdui-btn-block mdui-color-green mdui-text-color-white"/>
    </div>
    <div class="mdui-col-lg-3"></div>
  </div>
</template>

<style scoped>
</style>