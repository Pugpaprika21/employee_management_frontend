<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const department = ref({
  name: "",
  location: "",
});

const getDepartmentById = () => {
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT + "getDepartmentById/" + route.params.id
    )
    .then((res) => {
      if (res.data.status_bool) {
        const departmentEdit = res.data.data;
        department.value.name = departmentEdit.name;
        department.value.location = departmentEdit.surname;
        return;
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "no employee data",
        text: "",
        icon: "error",
        timer: 1000,
      }).then(() => {
        router.push("/employee/list");
      });
    });
};

const onUpdateDepartmentById = () => {
  const params = {
    name: department.value.name,
    location: department.value.location,
  };
  axios
    .put(
      import.meta.env.VITE_API_ENDPOINT +
        "updateDepartmentById/" +
        route.params.id,
      params
    )
    .then((res) => {
      if (res.data.status_bool) {
        Swal.fire({
          title: res.data.message,
          text: "",
          icon: "success",
          timer: 1000,
        }).then(() => {
          router.push("/department/list");
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        title: err.response.data.message,
        text: "",
        icon: "warning",
        timer: 1000,
      });
    });
};

onMounted(() => {
  getDepartmentById();
});
</script>

<template>
  <div class="main container mt-4">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <router-link
        type="button"
        class="btn btn-sm btn-danger"
        to="/department/list"
        >Department List
      </router-link>
    </div>
    <div class="emp_form_save">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onUpdateDepartmentById()">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="department.name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="location" class="form-label">Location</label>
                <input
                  type="text"
                  class="form-control"
                  id="department"
                  v-model="department.location"
                  required
                />
              </div>
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Edit</button>
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