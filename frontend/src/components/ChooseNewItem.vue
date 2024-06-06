<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/users.store';
import { useRoute } from 'vue-router';
import { useAlertStore } from '../stores/alert.store';
import { Form, Field } from 'vee-validate';
import { generateRandomItem } from '../helpers/randomItemGenerator';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const route = useRoute();
const id = route.params.id;

const schema = {
  item: (value: any) => {
    if (value) {
      return true;
    }
    return "Choose an Item!";
  }
}

const item1 = generateRandomItem();
const item2 = generateRandomItem();
const item3 = generateRandomItem();

async function onSubmit(values: any) {
  const userStore = useUserStore();
  const alertStore = useAlertStore();
  console.log(values);
  try {
    await userStore.update(id, values);
    alertStore.success("Items updated");
  } catch (error) {
    alertStore.error(error);
  }
}
</script>

<template>
  <h1>Choose a new item</h1>
  <div v-if="user.itemCoin < 1">
    <p>You don't have any ItemCoins to redeem. Win a match to gain ItemCoins!</p>
  </div>

  <div v-if="user.itemCoin > 0">
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">

      <div class="row">
        <div class="form-group col">
          <div class="card">
            <!--  <img src="source here" class="card-img-top"> -->
            <div class="card-header">{{ item1.name }}</div>
            <div class="card-body">
              <label>Description:</label>
              <div>{{ item1.description }}</div>
              <label>Item:</label>
              <div>{{ item1.kind }}</div>
              <label>Attack / Protection Modifier:</label>
              <div>{{ item1.modifier }}</div>
              <div class="text-center">
                <Field name="item" type="radio" :value="item1" :unchecked-value="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col">
          <div class="card">
            <!--    <img src="source here" class="card-img-top"> -->
            <div class="card-header">{{ item2.name }}</div>
            <div class="card-body">
              <label>Description:</label>
              <div>{{ item2.description }}</div>
              <label>Item:</label>
              <div>{{ item2.kind }}</div>
              <label>Attack / Protection Modifier:</label>
              <div>{{ item2.modifier }}</div>
              <div class="text-center">
                <Field name="item" type="radio" :value="item2" :unchecked-value="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group col">
          <div class="card">
            <!--    <img src="source here" class="card-img-top"> -->
            <div class="card-header">{{ item3.name }}</div>
            <div class="card-body">
              <label>Description:</label>
              <div>{{ item3.description }}</div>
              <label>Itemkind:</label>
              <div>{{ item3.kind }}</div>
              <label>Attack / Protection Modifier:</label>
              <div>{{ item3.modifier }}</div>
              <div class="text-center">
                <Field name="item" type="radio" :value="item3" :unchecked-value="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Choose Item
        </button>
      </div>
    </Form>
  </div>
</template>
