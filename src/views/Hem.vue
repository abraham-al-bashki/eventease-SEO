<template>
  <div class="mainBox">
    <LeftMain />
    <MidMain />
    <RightMain />
  </div>
</template>
<script setup>
  import RightMain from '../components/RightMain.vue';
  import MidMain from '../components/MidMain.vue';
  import LeftMain from '../components/LeftMain.vue';
</script>
<style scoped>
  .container {
    background-color: black;
  }
  .mainBox {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }

  @media (min-width: 730px) {
    .mainBox {
      display: flex;
      flex-direction: row;
      width: 100vw;
    }
  }
</style>
