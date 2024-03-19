<template>
  <button @click="logOut">Log out</button>
</template>

<script setup>
  import { useLoginStore } from '../store';
  import { useRouter } from 'vue-router';
  const store = useLoginStore();
  const router = useRouter();

  function logOut() {
    store.logout();
    router.push('/');
  }
</script>
