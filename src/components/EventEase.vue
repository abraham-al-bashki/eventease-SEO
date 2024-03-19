<script setup>
  import { useLoginStore } from '../store';
  import { ref } from 'vue';
  const store = useLoginStore();
  const informat = ref('');
  const show = ref(false);
  function test() {
    // console.log('hej');
    if (typeof store.getUserinformation() === 'string') {
      informat.value = JSON.parse(store.getUserinformation());
      // console.log('information', informat.value);
      if (informat?.value?.type === 'organistation') {
        show.value = true;
      }
    }
  }
</script>
<template>
  <div class="headContainer">
    <h1 class="rubrik">EventEase</h1>
    <!-- <button @click="test">rgr</button> -->
  </div>
  {{ informat.id }}
</template>

<style scoped>
  h1 {
    margin: 10px;
  }
  .headContainer {
    font-size: 0.65em;
    margin: 0px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
        90deg,
        rgba(156, 39, 176, 1) 0%,
        rgba(156, 39, 176, 0.2946428571428571) 60%
      ),
      url('../assets/flower3.png'), url('../assets/flower3.png');
    background-position: left, right;
    /* background-repeat: no-repeat; */
    backdrop-filter: blur(10px);
    border: solid;
    border-radius: 20px;
    width: 270px;
  }

  @media (min-width: 730px) {
    .headContainer {
      font-size: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      background-image: linear-gradient(
          90deg,
          rgba(156, 39, 176, 1) 0%,
          rgba(156, 39, 176, 0.2946428571428571) 60%
        ),
        url('../assets/flower3.png'), url('../assets/flower3.png');
      background-position: left, right;
      /* background-repeat: no-repeat; */
      padding: 20px;
      height: 120px;
      border: solid;
      border-radius: 20px;
      max-width: 80%;
    }
  }
</style>
