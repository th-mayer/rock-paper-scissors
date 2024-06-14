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
  <Card title="Login">
    <h1>Hey you, login ^-^</h1>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-section">
        <div class="flex-col">
          <div class="lable-line">
            <label>Username</label>
            <div class="error">{{ errors.username }}</div>
          </div>

          <Field
            name="username"
            type="text"
            class="form-control margin-bottom"
            :class="{ 'is-invalid': errors.username }"
          />
        </div>

        <!-- <div class="invalid-feedback">{{ errors.username }}</div> -->
      </div>
      <div class="form-section">
        <div class="flex-col">
            <div class="lable-line">
              <label>Password</label>
              <div class="error">{{ errors.hash }}</div>
            </div>
          <Field
            name="hash"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.hash }"
          />
        </div>

        <!-- <div class="invalid-feedback">{{ errors.hash }}</div> -->
      </div>
      <div class="form-section flex-col">
        <router-link to="register" class="register-link">No account? Register here!</router-link>
        <button class="login-btn" :disabled="isSubmitting">
          let me in!
        </button>
      </div>
    </Form>
  </Card>
</template>

<style>
.flex-col {
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.margin-bottom {
  margin-bottom: 10px;
}

.form-control {
  background-color: #745cd8;
  border-radius: 30px;
  border: none;
  height: 5vh;
  color: white;
  padding-left: 10px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px #745cd8 inset !important;
}

input:-webkit-autofill{
    -webkit-text-fill-color: white !important;
}

.form-control:focus {
  background-color: #745cd8;
  color: white;
  border: none;
  outline-color: #745cd8;
  ;
}

.error {
  color: rgb(239, 39, 122); margin-top: 2vh;
  font-size: 60%;
}

.login-btn {
  color: white;
  background-color: #745cd8;
  border: none;
  border-radius: 50px;
  padding: 3vh;
  height: 13vh;
  width: fit-content;
  margin: 0 auto;
  font-family: tweety;
  font-size: 8vh;
  box-shadow: 5px 5px white;
}

.login-btn:hover {
  cursor: pointer;
  background-color: white;
  color:#745cd8;
  box-shadow: 5px 5px #745cd8;
  transition: 0.2s ease-in;
}

.register-link {
  font-size: 60%;
  color: white;
  text-decoration: underline;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 13px;
  width: fit-content;
}

.lable-line{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card-rect h1{
    color: white;
    margin: 0.5rem 0;
    padding: 0;
    white-space: nowrap;
}
</style>
