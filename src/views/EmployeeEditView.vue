<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const employee = ref({
  name: "",
  surname: "",
  position_id: 0,
  department_id: 0,
  salary: null,
  address: "",
  phone_number: "",
  email: "",
  gender: "male",
});

const employeeLocation = ref({
  positionData: [],
  departmentData: [],
});

const getEmployeeById = () => {
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT + "getEmployeeById/" + route.params.id
    )
    .then((res) => {
      if (res.data.status_bool) {
        const employeeEdit = res.data.data;
        employee.value.name = employeeEdit.name;
        employee.value.surname = employeeEdit.surname;
        employee.value.position_id = employeeEdit.position_id;
        employee.value.department_id = employeeEdit.department_id;
        employee.value.salary = employeeEdit.salary;
        employee.value.address = employeeEdit.address;
        employee.value.phone_number = employeeEdit.phone_number;
        employee.value.email = employeeEdit.email;
        employee.value.gender = employeeEdit.gender;
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

const getAllPosition = () => {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "getAllPosition")
    .then((res) => {
      if (res.data.status_bool) {
        employeeLocation.value.positionData = res.data.data;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const getAllDepartment = () => {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "getAllDepartment")
    .then((res) => {
      if (res.data.status_bool) {
        employeeLocation.value.departmentData = res.data.data;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const onUpdateEmployeeById = () => {
  const params = {
    name: employee.value.name,
    surname: employee.value.surname,
    position_id: employee.value.position_id,
    department_id: employee.value.department_id,
    salary: employee.value.salary,
    address: employee.value.address,
    phone_number: employee.value.phone_number,
    email: employee.value.email,
    gender: employee.value.gender,
  };

  axios
    .put(
      import.meta.env.VITE_API_ENDPOINT +
        "updateEmployeeById/" +
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
          router.push("/employee/list");
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(() => {
  getAllPosition();
  getAllDepartment();
  getEmployeeById();
});
</script>

<template>
  <div class="main container mt-4">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <router-link
        type="button"
        class="btn btn-sm btn-danger"
        to="/employee/list"
        >Employee List
      </router-link>
    </div>
    <div class="emp_form_save">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onUpdateEmployeeById()">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="employee.name"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="surname" class="form-label">Surname</label>
                <input
                  type="text"
                  class="form-control"
                  id="surname"
                  v-model="employee.surname"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="position_id" class="form-label">Position</label>
                <select
                  class="form-select"
                  id="position_id"
                  v-model="employee.position_id"
                  required
                >
                  <option value="0" disabled>Select Position</option>
                  <option
                    v-for="position in employeeLocation.positionData"
                    :key="position.id"
                    :value="position.id"
                    v-bind:selected="position.id === employee.position_id"
                  >
                    {{ position.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="department_id" class="form-label">Department</label>
                <select
                  class="form-select"
                  id="department_id"
                  v-model="employee.department_id"
                  required
                >
                  <option value="0" disabled selected>Select Department</option>
                  <option
                    v-for="department in employeeLocation.departmentData"
                    :key="department.id"
                    :value="department.id"
                    v-bind:selected="department.id === employee.department_id"
                  >
                    {{ department.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="salary" class="form-label">Salary</label>
                <input
                  type="number"
                  class="form-control"
                  id="salary"
                  v-model="employee.salary"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="address" class="form-label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="employee.address"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="phone_number" class="form-label"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  class="form-control"
                  id="phone_number"
                  v-model="employee.phone_number"
                  required
                />
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="employee.email"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="gender" class="form-label">Gender</label>
                <select
                  class="form-select"
                  id="gender"
                  v-model="employee.gender"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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