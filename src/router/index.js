import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/employee/list",
            name: "employee_list",
            component: () =>
                import ("../views/EmployeeListView.vue"),
        },
        {
            path: "/employee/form_save",
            name: "employee_form_save",
            component: () =>
                import ("../views/EmployeeFormSaveView.vue"),
        },
        {
            path: "/employee/edit/:id",
            name: "employee_edit",
            component: () =>
                import ("../views/EmployeeEditView.vue"),
        },
        {
            path: "/position/list",
            name: "position_list",
            component: () =>
                import ("../views/PositionListView.vue"),
        },
        {
            path: "/position/form_save",
            name: "position_form_save",
            component: () =>
                import ("../views/PositionFormSaveView.vue"),
        },
        {
            path: "/position/edit/:id",
            name: "position_edit",
            component: () =>
                import ("../views/PositionEditView.vue"),
        },

        {
            path: "/department/list",
            name: "department_list",
            component: () =>
                import ("../views/DepartmentListView.vue"),
        },

        {
            path: "/department/form_save",
            name: "department_form_save",
            component: () =>
                import ("../views/DepartmentFormSaveView.vue"),
        },

        {
            path: "/department/edit/:id",
            name: "department_edit",
            component: () =>
                import ("../views/DepartmentEditView.vue"),
        },
    ],
});

export default router;

// DepartmentListView.vue