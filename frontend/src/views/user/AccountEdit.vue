<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAlertStore } from "../../stores/alert.store";
import { useUserStore } from "../../stores/users.store";
import { storeToRefs } from "pinia";
import * as Yup from "yup";
import { router } from "../../router/router";
import { Form, Field } from "vee-validate";
import Card from "../../components/Card.vue";

const alertStore = useAlertStore();
const userStore = useUserStore();
const route = useRoute();

// get current user id, load user into localStorage
const id = route.params.id;
let { user } = storeToRefs(userStore);
userStore.getById(id);

const schema = Yup.object().shape({
  email: Yup.string().email("e-mail invalid").required("Email adress is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required").min(12, "Password must be at least 12 characters"),
});

async function onSubmit(values: any) {
  try {
    await userStore.updateUser(user.value.id, values);
    await router.push("/users");
    alertStore.success("User updated");
  } catch (err) {
    alertStore.error("could not save changes");
  }
}
</script>

<template>
  <Card title="edit" class="editProfile">
    <h1>Edit Account</h1>
    <template v-if="!(user?.loading || user?.error)">
      <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
        <div>
          <div class="form-container">
            <label class="col-left">E-mail</label>
            <div class="col-right">
              <Field name="email" type="text" class="col-right form-control" :class="{ 'is-invalid': errors.email }">
              </Field>
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>
          </div>

          <div class="form-container">
            <label class="col-left">Username</label>
            <div class="col-right">
              <Field name="username" type="text" class="col-right form-control"
                :class="{ 'is-invalid': errors.username }"></Field>
              <div class="invalid-feedback">{{ errors.username }}</div>
            </div>
          </div>

          <div class="form-container">
            <label class="col-left">Password</label>
            <div class="col-right">
              <Field name="password" type="text" class="col-right form-control"
                :class="{ 'is-invalid': errors.password }"></Field>
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
          </div>

          <div class="btn-container">
            <router-link to="/home">
              <button class="btn router-link-in-button discard">
                Discard
              </button>
            </router-link>

            <button class="btn" :disabled="isSubmitting">
              <span v-show="isSubmitting"></span>
              Save Changes
            </button>
          </div>
        </div>
      </Form>
    </template>
  </Card>

</template>


<style lang="scss">
@import "../../css/main.scss";

label {
  color: $bright-font-color;
}

.editProfile {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-container {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.btn {
  margin-top: 2vh;
}

.form-container {
  display: flex;
}

.col-left {
  display: flex;
  flex: 1;
}

.col-right {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.discard.router-link-in-button>a {
  color: $backshadow;
}

.discard.router-link-in-button:hover>a {
  color: $alert-color;
}

.discard.router-link-in-button {
  color: $backshadow;
  background-color: $alert-color;
}

.discard.router-link-in-button:hover {
  color: $alert-color;
  background-color: $backshadow;
  box-shadow: 7px 7px $alert-color;
  transition: 0.2s ease-in;
}

.invalid-feedback {
  display: flex;
  flex-direction: column;
  color: $alert-color;
  font-size: 2.5vh;
  margin-top: .5vh;
}

/* Tablet styles */
@media (max-width: 768px) {
  .card-container.editProfile {
    width: 90vw;
  }

  .col-left {
    font-size: 6vw;
    align-items: center;
  }

  .col-right {
    width: fit-content;
  }
}

/* Phone styles */
@media (max-width: 480px) {
  .editProfile{
    margin: 2vw;
  }
  .card-container.editProfile {
    padding: 0;
    width: 100vw;
    margin: 1.5vw;
  }

  .col-left {
    font-size: 5vw;
    align-items: center;
  }

  .col-right {
    width: fit-content;
  }

  .card-rect h1 {
    font-size: 10vw;
  }

  Label {
    font-size: 10vw;
  }

  input.col-right{
    width: 30vw;
  }

  .register-link {
    font-size: 3vw;
  }

  button.login-btn {
    border-radius: 60px;
  }


}
</style>