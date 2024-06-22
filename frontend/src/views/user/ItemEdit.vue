<script setup lang="ts">
import ChooseNewItem from "../../components/ChooseNewItem.vue";
import Card from "../../components/Card.vue";
 
</script>

<template>
    <ChooseNewItem />
    
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