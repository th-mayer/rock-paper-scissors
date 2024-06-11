<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/auth.store";
import Card from '../../components/Card.vue'

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  hash: Yup.string().required("Password is required")
});

async function onSubmit(values : any) {
  const authStore = useAuthStore();
  const { username, hash } = values;
  await authStore.login(username, hash);
}
</script>

<template>
  <Card title="Login">
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <div class="form-section">
        <label>Username</label>
        <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="form-section">
        <label>Password</label>
        <Field name="hash" type="password" class="form-control" :class="{ 'is-invalid' : errors.hash }"/>
        <div class="invalid-feedback">{{ errors.hash }}</div>
      </div>
      <div class="form-section">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinnder-border-sm mr-1"></span>
          Login
        </button>
        <router-link to="register" class="btn btn-link">Register</router-link>
      </div> 
    </Form>
  </Card>
</template>

<style>
  .form-section {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .form-section label {
    color: #ffffff;
  }
</style>