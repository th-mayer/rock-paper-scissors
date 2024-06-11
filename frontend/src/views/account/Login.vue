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
          <div class="TEST">
            <label>
              Username
              <div class="error">
                {{ errors.username }}
              </div>
            </label>
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
          <label>Password {{ errors.hash }} </label>
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
        <router-link to="register" class="register-link">Register</router-link>
        <button class="login-btn" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinnder-border-sm mr-1"
          ></span>
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
}

.error {
  color: darkred;
  justify-content: flex-end;
}

.login-btn {
  color: white;
  background-color: #745cd8;
  border: none;
  border-radius: 50px;
  height: 8vh;
  width: 20vw;
  margin: 0 auto;
  font-family: tweety;
  font-size: 200%;
  box-shadow: 5px 5px white;
}

.register-link {
  color: white;
  text-decoration: underline;
}

.TEST{
  display: flex;
  flex-direction: row;
}
</style>
