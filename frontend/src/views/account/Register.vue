<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useUserStore } from "../../stores/users.store";
import { useAlertStore } from "../../stores/alert.store";
import { router } from "../../router/router";
import Card from '../../components/Card.vue';

const schema = Yup.object().shape({
  email: Yup.string().email("e-mail address is invalid").required("e-mail is required"),
  username: Yup.string().required("Username is required"),
  hash: Yup.string().required("Password is required")
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
  <div class="register-div">
    <Card title="Register">
      <h1>hey you, register</h1>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-section">
          <div class="flex-col">
            <div class="label-line">
              <label>Email</label>
              <div class="error">{{ errors.email }}</div>
            </div>
            <Field name="email" type="text" class="form-control margin-bottom" :class="{ 'is-invalid': errors.email }" />
          </div>
        </div>
        <div class="form-section">
          <div class="flex-col">
            <div class="label-line">
              <label>Username</label>
              <div class="error">{{ errors.username }}</div>
            </div>
            <Field name="username" type="text" class="form-control margin-bottom" :class="{ 'is-invalid': errors.username }" />
          </div>
        </div>
        <div class="form-section">
          <div class="flex-col">
            <div class="label-line">
              <label>Password</label>
              <div class="error">{{ errors.hash }}</div>
            </div>
            <Field name="hash" type="password" class="form-control" :class="{ 'is-invalid': errors.hash }" />
          </div>
        </div>
        <div class="form-section flex-col">
          <router-link to="login" class="cancel-link">Cancel registration</router-link>
          <button class="login-btn" :disabled="isSubmitting">Register</button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<style>
.register-div {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.flex-col {
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.flex-row {  
  color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.form-control {
  background-color: #745cd8;
  border-radius: 30px;
  border: none;
  height: 5vh;
  color: white;
  padding-left: 10px;
}

.margin-bottom {
  margin-bottom: 10px;
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
  margin-top: 10px;
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

.cancel-link {
  font-size: 60%;
  color: white;
  text-decoration: underline;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 13px;
  width: fit-content;
}

.label-line{
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

/* Tablet styles */
@media (max-width: 768px) {
  .card-rect h1 {
    font-size: 10vw;
  }
}

/* Phone styles */
@media (max-width: 480px) {
  .card-rect h1 {
    font-size: 10vw;

  }

  label {
    font-size: 10vw;
  }

  .register-link {
    font-size: 3vw;
  }

  button.login-btn {
    font-size: 14vw;
    border-radius: 60px;
  }
}

</style>