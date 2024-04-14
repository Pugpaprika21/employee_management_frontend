<script setup>
import { RouterLink, RouterView } from "vue-router";
import EmployeeNavbar from "./components/EmployeeNavbar.vue";
</script>

<template>
  <div class="app-main">
    <header>
      <div class="navbar-main">
        <EmployeeNavbar />
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <!-- <p>© 2023 Your Company Name</p> -->
    </footer>
  </div>
</template>

<style scoped>
</style>
