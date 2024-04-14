<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import IconBtnEdit from "../components/icons/IconBtnEdit.vue";
import IconBtnDelete from "../components/icons/IconBtnDelete.vue";

const positionData = ref([]);
const getAllPosition = () => {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "getAllPosition")
    .then((res) => {
      if (res.data.status_bool) {
        positionData.value = res.data.data;
        return;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

const deletePositionById = (positionId) => {
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
          import.meta.env.VITE_API_ENDPOINT + "deletePositionById/" + positionId
        )
        .then((res) => {
          if (res.data.status_bool) {
            Swal.fire({
              title: res.data.message,
              text: "",
              icon: "success",
              timer: 1000,
            }).then(() => {
              getAllPosition();
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};

const realTimeGetAllPosition = () => {
  setInterval(() => {
    getAllPosition();
  }, 10000);
};

onMounted(() => {
  getAllPosition();
  realTimeGetAllPosition();
});
</script>

<template>
  <div class="main container mt-4">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <router-link
        type="button"
        class="btn btn-sm btn-primary"
        to="/position/form_save"
        >Add Position</router-link
      >
    </div>
    <div class="emp_table">
      <table class="table table-sm text-center">
        <caption>
          List of Position
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Responsibilities</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(position, index) in positionData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ position.name }}</td>
            <td>{{ position.description }}</td>
            <td>{{ position.salary.toLocaleString() }}</td>
            <td>{{ position.responsibilities }}</td>
            <td>{{ position.location }}</td>
            <td>
              <router-link
                type="button"
                class="btn btn-warning btn-sm"
                :to="'/position/edit/' + position.id"
              >
                <IconBtnEdit />
              </router-link>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click.passive="deletePositionById(position.id)"
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