<template>
  <div>
    <div v-if="isUserPath">
      <LogOut />
    </div>
    <div v-else>
      <!-- Crazy default feature makes in complex to add class to self-created component: https://vuejs.org/guide/components/attrs.html#attribute-inheritance -->
      <div class="static-size">
        <Login @sign-up-triggered="activateSignUp" />
      </div>
      <div class="static-size">
        <SignUp
          :sign-up-triggered="isSignUpTriggered"
          @sign-up-triggered="clearSignUpVariable"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Login from './UserLogIn.vue';
  import SignUp from './UserSignUp.vue';
  import LogOut from './UserLogOut.vue';
  import { useRoute } from 'vue-router';
  import { computed, ref } from 'vue';
  const route = useRoute();
  const isUserPath = computed(() =>
    typeof route.path === 'string' ? route.path.includes('/user/') : false
  );
  const isSignUpTriggered = ref(false);
  function activateSignUp(callback) {
    isSignUpTriggered.value = callback;
  }
  function clearSignUpVariable(callback) {
    isSignUpTriggered.value = callback;
  }
</script>

<style scoped>
  .static-size {
    min-height: 50px;
  }
</style>
