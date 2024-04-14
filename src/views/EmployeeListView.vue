<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import IconBtnEdit from "../components/icons/IconBtnEdit.vue";
import IconBtnDelete from "../components/icons/IconBtnDelete.vue";

const employeeData = ref([]);
const getAllEmployee = () => {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "getAllEmployee")
    .then((res) => {
      if (res.data.status_bool) {
        employeeData.value = res.data.data;
        return;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteEmployeeById = (employeeId) => {
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
          import.meta.env.VITE_API_ENDPOINT + "deleteEmployeeById/" + employeeId
        )
        .then((res) => {
          if (res.data.status_bool) {
            Swal.fire({
              title: res.data.message,
              text: "",
              icon: "success",
              timer: 1000,
            }).then(() => {
              getAllEmployee();
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};

const realTimeGetAllEmployee = () => {
  setInterval(() => {
    getAllEmployee();
  }, 10000);
};

onMounted(() => {
  getAllEmployee();
  realTimeGetAllEmployee();
});
</script>

<template>
  <div class="main container mt-4">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <router-link
        type="button"
        class="btn btn-sm btn-primary"
        to="/employee/form_save"
        >Add Employee</router-link
      >
    </div>
    <div class="emp_table">
      <table class="table table-sm text-center">
        <caption>
          List of Employee
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fullname</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employeeData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }} {{ employee.surname }}</td>
            <td>{{ employee.position_name }}</td>
            <td>{{ employee.department_name }}</td>
            <td>{{ employee.salary.toLocaleString() }}</td>
            <td>
              <router-link
                type="button"
                class="btn btn-warning btn-sm"
                :to="'/employee/edit/' + employee.id"
              >
                <IconBtnEdit />
              </router-link>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click.passive="deleteEmployeeById(employee.id)"
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
