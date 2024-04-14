<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const positon = ref({
  name: "",
  description: "",
  salary: 0,
  responsibilities: "",
  location: "",
});

const onCreatePositon = () => {
  const params = {
    name: positon.value.name,
    description: positon.value.description,
    salary: positon.value.salary,
    responsibilities: positon.value.responsibilities,
    location: positon.value.location,
  };
  axios
    .post(import.meta.env.VITE_API_ENDPOINT + "createPosition", params)
    .then((res) => {
      if (res.data.status_bool) {
        Swal.fire({
          title: res.data.message,
          text: "",
          icon: "success",
          timer: 1000,
        }).then(() => {
          router.push("/position/list");
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<template>
  <div class="main container mt-4">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <router-link
        type="button"
        class="btn btn-sm btn-danger"
        to="/position/list"
        >positon List
      </router-link>
    </div>
    <div class="emp_form_save">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onCreatePositon()">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="positon.name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="surname" class="form-label">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="positon.description"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="salary" class="form-label">Salary</label>
                <input
                  type="number"
                  class="form-control"
                  id="salary"
                  v-model="positon.salary"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="responsibilities" class="form-label"
                  >Responsibilities</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="responsibilities"
                  v-model="positon.responsibilities"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="location" class="form-label">Location</label>

                <input
                  type="text"
                  class="form-control"
                  id="location"
                  v-model="positon.location"
                  required
                />
              </div>
            </div>

            <button type="submit" class="btn btn-sm btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>