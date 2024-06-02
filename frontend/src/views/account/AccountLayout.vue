/**
 * default layout to show either login / register / home page
 */
<script setup lang="ts">
import { router } from '../../router/router';
import { useAuthStore } from '../../stores/auth.store';

const authStore = useAuthStore();
if(authStore.user){
  router.push("/");
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2 mt-5">
        <router-view />
      </div>
    </div>
  </div>
</template>