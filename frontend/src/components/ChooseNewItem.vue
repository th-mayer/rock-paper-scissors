<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/users.store';
import { useRoute } from 'vue-router';
import { useAlertStore } from '../stores/alert.store';
import { Form, Field } from 'vee-validate';
import { generateRandomItem } from '../helpers/randomItemGenerator';

const route = useRoute();
const id = route.params.id;
const userStore = useUserStore();
let { user } = storeToRefs(userStore);

const userExistingItems = user.value.items;
const exItem1 = userExistingItems[0];
const exItem2 = userExistingItems[1];
const exItem3 = userExistingItems[2];

// TODO rework validate
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

  <!-- <div v-if="user.itemCoin > 0"> -->
  <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
    <h4>Your Items</h4>
    <div class="row">
      <div class="form-group col">
        <div class="card">
          <div class="card-header">{{ exItem1.name }}
            <div class="card-body">
              <label>Description:</label>
              <div>{{ exItem1.description }}</div>
              <label>Itemkind:</label>
              <div>{{ exItem1.kind }}</div>
              <label>Attack / Protection Modifier:</label>
              <div>{{ exItem1.modifier }}</div>
              <div class="text-center">
                <Field name="exItem" type="radio" :value="exItem1.id" :unchecked-value="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group col">
        <div class="card">
          <div class="card-header">{{ exItem2.name }}
            <div class="card-body">
              <label>Description:</label>
              <div>{{ exItem2.description }}</div>
              <label>Itemkind:</label>
              <div>{{ exItem2.kind }}</div>
              <label>Attack / Protection Modifier:</label>
              <div>{{ exItem2.modifier }}</div>
              <div class="text-center">
                <Field name="exItem" type="radio" :value="exItem2.id" :unchecked-value="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group col">
        <div class="card">
          <div class="card-header">{{ exItem3.name }}
            <div class="card-body">
              <label>Description:</label>
              <div>{{ exItem3.description }}</div>
              <label>Itemkind:</label>
              <div>{{ exItem3.kind }}</div>
              <label>Attack / Protection Modifier:</label>
              <div>{{ exItem3.modifier }}</div>
              <div class="text-center">
                <Field name="exItem" type="radio" :value="exItem3.id" :unchecked-value="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4>New Items</h4>
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
        Exchange Item
      </button>
    </div>
  </Form>
  <!--</div>-->
</template>
