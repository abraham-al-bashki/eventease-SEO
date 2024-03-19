<template>
  <!-- <Hem v-if="currentComponent === 'Hem'" />
  <Calendar v-if="currentComponent === 'Calender'" /> -->
  <Calendar />
</template>

<script setup>
  // försök 2: anävända redirect istället för navigation guard. Och aanvända store för att veta vilken user id som ska vara på path. Och på nåt sätt skicka en prop från router redirect
  import Hem from './Hem.vue';
  import Calendar from './EventCalendar.vue';
  import { ref, watch } from 'vue';
  import {
    useRoute,
    useRouter,
    onBeforeRouteLeave,
    onBeforeRouteUpdate
  } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  // const routePath = ref(route.path);
  const currentComponent = ref('Hem');
  // const props = defineProps({ currentComponent: String });
  function switchToComponent(routePath) {
    if (routePath.includes('/kalender/')) {
      currentComponent.value = 'Calender';
    } else if (routePath === '/user/guest') {
      currentComponent.value = 'Hem';
    }
  }

  // //onBeforeRouteLeave and onBeforeRouteUpdate fails to change currentComponent on changing path
  // onBeforeRouteLeave((to, from) => {
  //   console.log('hej');
  //   const routePath = ref(route.path);
  //   switchToComponent(routePath);
  // });
  // onBeforeRouteUpdate(async (to, from) => {
  //   console.log('Ge');
  //   const routePath = ref(route.path);
  //   switchToComponent(routePath);
  // });
  watch(
    () => route.path,
    (newPath, oldPath) => {
      switchToComponent(newPath);
    }
  );
</script>
