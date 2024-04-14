<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-main">
    <div class="container-fluid">
      <router-link class="nav-link" aria-current="page" to="/employee/list"
        >Employee Management</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              position
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/position/list"
                  >List</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              department
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/department/list"
                  >List</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-main {
  background-color: rgb(10, 34, 54);
}
.navbar-brand,
.nav-link {
  color: aliceblue;
}
</style>