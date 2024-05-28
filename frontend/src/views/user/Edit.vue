<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAlertStore } from '../../stores/alert.store';
import { useUserStore } from '../../stores/users.store';
import { storeToRefs } from 'pinia';
import * as Yup from "yup";
import { router } from '../../router/router';
import { Form, Field } from "vee-validate";

const alertStore = useAlertStore();
const userStore = useUserStore();
const route = useRoute();

// get current user id, load user into localStorage
const id = route.params.id;
let user = storeToRefs(userStore);
userStore.getById(id);

const schema = Yup.object().shape({
  email: Yup.string().required("Email adress is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

async function onSubmit(values:any) {
  let message: string;
  try {
    await userStore.update(user.value.id, values);
    message = "User updated";
    await router.push("/users");
    alertStore.success(message);
  } catch (err) {
    alertStore.error(err);
  }
}
</script>

// somwhere here needs to be the item roulette as well
<template>
  <h1>Edit Account</h1>
  <template v-if="!(user?.loading || user?.error)">
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
      <div class="form-row">
        <div class="form-group col">
          <label>Email</label>
          <Field name="email" type="text" class="form-control" :class="{ 'is-invalid' : errors.email }"></Field>
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="form-group col">
          <label>Username</label>
          <Field name="username" type="text" class="form-control" :class="{ 'is-invalid' : errors.username }"></Field>
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group col">
          <label>Password</label>
          <Field name="password" type="text" class="form-control" :class="{ 'is-invalid' : errors.password }"></Field>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Save
          </button>
        </div>
      </div>
    </Form>
  </template>
  <template v-if="user?.loading">
    <div class="text-center m-5"></div>
    <span class="spinner-border spinner-border-lg align-center"></span>
  </template>
  <template v-if="user?.error">
    <div class="text-center m-5">
      <div class="text-danger">Error loading user: {{ user.error }}</div>
    </div>
  </template>
</template>
