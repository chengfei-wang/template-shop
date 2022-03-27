<script lang="ts">
import {ref} from "vue"
import {request} from "../requests";
import {logout} from "../user";
import mdui from "mdui";
import BottomNavigationView from "./BottomNavigationView.vue"
import ShoppingPage from "./ShoppingPage.vue"
import CraftPage from "./CraftPage.vue"
import PersonalPage from "./PersonalPage.vue"

export default {
  name: "MainPage",
  components: {
    BottomNavigationView, ShoppingPage, CraftPage, PersonalPage
  }
}
</script>

<script setup lang="ts">
defineProps<{}>()

const currentPage = ref(0)

const page_map = [
  ShoppingPage,
  CraftPage,
  PersonalPage,
]

function onPageChange(position: number) {
  currentPage.value = position
}

if (localStorage.getItem("token") == null) {
  console.log("Token == null")
  window.location.href = "/login"
} else {
  request("user/verify", {}, ((status, obj) => {
    if (status == 200) {
      if (obj.code != 200) {
        logout()
        window.location.href = "/login"
      } else {
        // mdui.snackbar({
        //   message: `欢迎 ${obj.data.name}`,
        //   position: 'top',
        // });
        console.log(obj)
      }
    } else {
      mdui.snackbar({
        message: '服务器异常',
        position: 'bottom',
      });
    }
  }))
}
</script>

<template>
  <keep-alive>
    <component :is="page_map[currentPage]"/>
  </keep-alive>
  <bottom-navigation-view :on-page-change="onPageChange"/>
</template>