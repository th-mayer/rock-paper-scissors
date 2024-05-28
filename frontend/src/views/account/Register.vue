<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useUserStore } from "../../stores/users.store";
import { useAlertStore } from "../../stores/alert.store";
import { router } from "../../router/router";
;

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

async function onSubmit(values: any) {
  const userStore = useUserStore();
  const alertStore = useAlertStore();
  try {
    await userStore.register(values);
    await router.push("/account/login");
    alertStore.success("Registration successful");
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group">
          <label>Email</label>
          <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label>Username</label>
          <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <Field name="password" type="password" class="form-contorl" :class="{ 'is-invalid': errors.password }" />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="from-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinnder-border-sm mr-1"></span>
            Login
          </button>
          <router-link to="login" class="btn btn-link">Cancel</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>