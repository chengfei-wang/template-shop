<script setup lang="ts">
import {ref} from "vue"
import BottomNavigationView from "./BottomNavigationView.vue"
import ShoppingPage from "./ShoppingPage.vue"
import CraftPage from "./CraftPage.vue"
import PersonalPage from "./PersonalPage.vue"

defineProps<{}>()

const currentPage = ref(0)

const page_map = {
  0: ShoppingPage,
  1: CraftPage,
  2: PersonalPage,
}

function onPageChange(position: number) {
  currentPage.value = position
}

</script>

<template>
  <keep-alive>
    <component :is="page_map[currentPage]"/>
  </keep-alive>
  <BottomNavigationView :on-page-change="onPageChange"/>
</template>

<script>

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
