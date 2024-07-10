<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/auth.store";
import Card from "../../components/Card.vue";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  hash: Yup.string().required("Password is required"),
});

async function onSubmit(values: any) {
  const authStore = useAuthStore();
  const { username, hash } = values;
  await authStore.login(username, hash);
}
</script>

<template>
  <div class="login-div">
    <Card title="Login">
      <h1>Hey you, login ^-^</h1>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-section">
          <div class="flex-col">
            <div class="lable-line">
              <label>Username</label>
              <div class="error">{{ errors.username }}</div>
            </div>
            <Field name="username" type="text" class="form-control margin-bottom-10"
              :class="{ 'is-invalid': errors.username }" />
          </div>
        </div>
        <div class="form-section">
          <div class="flex-col">
            <div class="lable-line">
              <label>Password</label>
              <div class="error">{{ errors.hash }}</div>
            </div>
            <Field name="hash" type="password" class="form-control" :class="{ 'is-invalid': errors.hash }" />
          </div>
        </div>
        <div class="form-section flex-col">
          <router-link to="register" class="register-link">No account? Register here!</router-link>
          <button class="login-btn" :disabled="isSubmitting">let me in!</button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<style lang="scss">
@import '@/css/main.scss';

.login-div {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.flex-col {
  color: $bright-font-color;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-control {
  background-color: $secondary-color;
  border-radius: 30px;
  border: none;
  height: 5vh;
  color: $bright-font-color;
  padding-left: 10px;

}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px $secondary-color inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: $bright-font-color !important;
}

input {
  font-size: 3vh;
  font-family: tweety;
}

.form-control:focus {
  background-color: $secondary-color;
  color: $bright-font-color;
  border: none;
  outline-color: $secondary-color;
}

.error {
  color: $alert-color;
  margin-top: 2vh;
  font-size: 60%;
}

.login-btn {
  color: $bright-font-color;
  background-color: $secondary-color;
  border: none;
  border-radius: 50px;
  padding: 3vh;
  height: 13vh;
  width: fit-content;
  margin: 0 auto;
  font-family: tweety;
  font-size: 8vh;
  box-shadow: 5px 5px $bright-font-color;
}

.login-btn:hover {
  cursor: pointer;
  background-color: $bright-font-color;
  color: $secondary-color;
  box-shadow: 5px 5px $secondary-color;
  transition: 0.2s ease-in;
}

.register-link {
  font-size: 60%;
  color: $bright-font-color;
  text-decoration: underline;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 13px;
  width: fit-content;
}

.lable-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-rect h1 {
  color: $bright-font-color;
  margin: 0.5rem 0;
  padding: 0;
  white-space: nowrap;
}
</style>
