<script setup lang="ts">
defineProps<{}>()

</script>

<template>
  <div class="mdui-dialog mdui-dialog-open" style="display: block; top: 0; height: 1006px;">
    <button class="mdui-btn mdui-btn-icon close"><i class="mdui-icon material-icons">close</i></button>
    <div class="mdui-dialog-title">登录</div>
    <form>
      <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-has-bottom mdui-textfield-invalid-html5">
        <label class="mdui-textfield-label">用户名或邮箱</label>
        <input class="mdui-textfield-input" name="name" type="text" required="">
        <div class="mdui-textfield-error">账号不能为空</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-has-bottom"><label
          class="mdui-textfield-label">密码</label>
        <input class="mdui-textfield-input" name="password" type="password" required="">
        <div class="mdui-textfield-error">密码不能为空</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-has-bottom captcha-field mdui-hidden">
        <label class="mdui-textfield-label">图形验证码</label>
        <input class="mdui-textfield-input" name="captcha_code" type="text" autocomplete="off">
        <div class="mdui-textfield-error">请输入图形验证码</div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>