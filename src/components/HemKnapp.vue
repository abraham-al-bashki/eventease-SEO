<template>
  <div class="home-button"><button @click="goHome">Back</button></div>
</template>

<script>
  export default {
    methods: {
      goHome() {
        this.$router.back();
      }
    }
  };
</script>
