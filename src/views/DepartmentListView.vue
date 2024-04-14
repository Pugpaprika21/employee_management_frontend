<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import IconBtnEdit from "../components/icons/IconBtnEdit.vue";
import IconBtnDelete from "../components/icons/IconBtnDelete.vue";

const departmentData = ref([]);
const getAllDepartment = () => {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "getAllDepartment")
    .then((res) => {
      if (res.data.status_bool) {
        departmentData.value = res.data.data;
        return;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteDepartmentById = (departmentId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(
          import.meta.env.VITE_API_ENDPOINT +
            "deleteDepartmentById/" +
            departmentId
        )
        .then((res) => {
          if (res.data.status_bool) {
            Swal.fire({
              title: res.data.message,
              text: "",
              icon: "success",
              timer: 1000,
            }).then(() => {
              getAllDepartment();
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};

const realTimeGetAllDepartment = () => {
  setInterval(() => {
    getAllDepartment();
  }, 10000);
};

onMounted(() => {
  getAllDepartment();
  realTimeGetAllDepartment();
});
</script>

<template>
  <div class="main container mt-4">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <router-link
        type="button"
        class="btn btn-sm btn-primary"
        to="/department/form_save"
        >Add Department</router-link
      >
    </div>
    <div class="emp_table">
      <table class="table table-sm text-center">
        <caption>
          List of Department
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(department, index) in departmentData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ department.name }}</td>
            <td>{{ department.location }}</td>
            <td>
              <router-link
                type="button"
                class="btn btn-warning btn-sm"
                :to="'/department/edit/' + department.id"
              >
                <IconBtnEdit />
              </router-link>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click.passive="deleteDepartmentById(department.id)"
              >
                <IconBtnDelete />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
