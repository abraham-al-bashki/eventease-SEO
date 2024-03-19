<script setup>
  import DropdownMeny from './DropdownMeny.vue';
  import UserPicture from './UserPicture.vue';
  import LoginContainer from './LoginContainer.vue';
  import ButtonToOrg from './ButtonToOrg.vue';
  import { useLoginStore } from '../store';
  import { useRoute } from 'vue-router';
  import { onBeforeMount, ref, watch } from 'vue';
  const route = useRoute();
  const store = useLoginStore();
  const informat = ref('');
  const show = ref(false);

  function routeCheck() {
    // console.log('route', route);
    // console.log('route', store.getUserinformation());
    if (typeof store.getUserinformation() === 'string') {
      informat.value = JSON.parse(store.getUserinformation());
      if (informat?.value?.type === 'organistation') {
        show.value = true;
      } else {
        show.value = false;
      }
    } else {
      show.value = false;
    }
  }
  onBeforeMount(() => {
    routeCheck();
  });
  watch(route, () => {
    routeCheck();
  });
</script>

<template>
  <div id="rightMainContainer">
    <LoginContainer />
    <div v-show="!show">
      <div>
        <UserPicture />
      </div>
    </div>
    <div class="middle" v-show="show">
      <div class="cirkel" v-show="show">
        <ButtonToOrg />
      </div>
    </div>
    <DropdownMeny />
  </div>
</template>
<style scoped>
  #rightMainContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background-image: none;
    background-image: url(../assets/flower3.png), url(../assets/flower2.png);
    background-position: left, right;
    background-repeat: no-repeat;
    flex-direction: row-reverse;
  }
  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .cirkel {
    width: 80px;
    height: 80px;
    border: solid;
    border-radius: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 600px) {
    .cirkel {
      height: 120px;
      width: 120px;
    }
  }
  @media (min-width: 730px) {
    #rightMainContainer {
      background-image: url(../assets/flower2.png);
      flex-direction: column;
      justify-content: flex-start;
      gap: 100px;
      padding: 10px;
      padding-top: 50px;
    }
  }
</style>
