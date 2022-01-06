<script setup>
import {ref} from 'vue'
import BottomNavigationView from './BottomNavigationView.vue'
import ShoppingPage from './ShoppingPage.vue'
import CraftPage from './CraftPage.vue'
import PersonalPage from './PersonalPage.vue'

defineProps({})

const currentPage = ref(0)

const page_map = {
  0: ShoppingPage,
  1: CraftPage,
  2: PersonalPage,
}

function onPageChange(position) {
  currentPage.value = position
}

</script>

<template>
  <component :is="page_map[currentPage]"/>
  <BottomNavigationView :on-page-change="onPageChange"/>
</template>

<script>

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
