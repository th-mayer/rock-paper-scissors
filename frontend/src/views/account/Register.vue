<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { string, required } from "yup";
import { useUserStore, useAlertStore } from "@/stores";

const schema = Yup.object().shape({
  email: string().required("Email is required"),
  username: string().required("Username is required"),
  password: string().required("Password is required")
});

async function onSubmit(values) {
  const userStore = useUserStore();
  const alertStore = useAlertStore();
  try {
    await userStore
  } catch (error) {

  }
}
</script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
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
          <router-link to="register" class="btn btn-link">Register</router-link>
        </div>
      </Form>

    </div>
  </div>
</template>