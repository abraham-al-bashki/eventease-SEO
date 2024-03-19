<template>
  <div v-if="showPopUp">
    <pop-up>
      <template #select-top>
        <div class="exit-button-container">
          <button class="exit-button" @click="deactivateLogin()">X</button>
        </div>
        <h1>Login</h1>
      </template>
      <template #no-select-middle>
        <template v-if="users !== undefined">
          <div class="user-input-for-login">
            <label class="label-for-login" for="type-username">Username</label>
            <div class="dynamic-padding" />
            <input
              id="type-username"
              v-model="loginUserInput.username"
              placeholder="Type your username..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <div class="user-input-for-login">
            <label class="label-for-login" for="type-mail">Mail</label>
            <div class="dynamic-padding" />
            <input
              id="type-mail"
              v-model="loginUserInput.mail"
              placeholder="Type your mail..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <div class="user-input-for-login">
            <label class="label-for-login" for="type-password">Password</label>
            <div class="dynamic-padding" />
            <input
              id="type-password"
              v-model="loginUserInput.password"
              placeholder="Type your password..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <button @click="navigateToUser()">Log In</button>
          <div>
            <a @click="signUpTriggered">Don't have an account? Sign Up</a>
          </div>
        </template>
      </template>
      <template #select-bottom>
        <template v-if="users !== undefined">
          <div id="cover-bottom-content">
            {{ `Användarnamn: guest, lösenord: guest` }}
            {{ `Användarnamn: organisation, lösenord: organisation` }}
            <div class="error-text" :hidden="!wrongInput">
              Wrong password or username!
            </div>
          </div>
        </template>
      </template>
    </pop-up>
  </div>
  <template v-else>
    <button @click="activateLogin()">Login</button>
  </template>
</template>

<script setup>
  import { ref, watch, defineEmits } from 'vue';
  import PopUp from './PopUp.vue';
  // import SignUp from './UserSignUp.vue';
  import { useRouter } from 'vue-router';
  import { useLoginStore } from '../store.js';
  const users = ref([
    {
      id: 'guest',
      name: 'guest',
      mejl: '',
      password: 'guest',
      type: 'private'
    },
    {
      id: 'organisation',
      name: 'organisation',
      mejl: 'organisation@mejl.se',
      password: 'organisation',
      type: 'organistation'
    },
    {
      id: 2,
      name: 'kalle',
      mejl: 'kalle@mejl.se',
      password: 'kalle',
      type: 'private'
    },
    {
      id: 3,
      name: 'anki',
      mejl: 'anki@mejl.se',
      password: 'anki',
      type: 'admin'
    },
    {
      id: 4,
      name: 'rik',
      mejl: 'rik@mejl.se',
      password: 'rik',
      type: 'private'
    },
    {
      id: 5,
      name: 'ardo',
      mejl: 'ardo@mejl.se',
      password: 'ardo',
      type: 'private'
    }
  ]);
  const loginUserInput = ref({ username: '', mail: '', password: '' });
  const router = useRouter();
  const showPopUp = ref(false);
  const wrongInput = ref(false);
  const emit = defineEmits(['sign-up-triggered']);
  // https://vuejs.org/guide/essentials/watchers.html#deep-watchers
  watch(
    loginUserInput,
    () => {
      errorTextHide();
    },
    { deep: true }
  );
  const navigateToUser = () => {
    const user = users.value.find(
      (element) =>
        element.name === loginUserInput.value.username &&
        element.password === loginUserInput.value.password
    );
    if (user) {
      showPopUp.value = false;
      errorTextHide();
      const store = useLoginStore();
      store.login(user);
      console.log(
        'useLoginStore()',
        store.getIsLoggedIn(),
        ', user.id: ',
        user.id
      ); //TODO: remove console.log when the rest is implemented
      // router.push({ path: `user/${user.id}`, params: { id: user.id } }); //TODO: Vue warning about replacing path with name here https://router.vuejs.org/guide/essentials/named-routes
      router.push({ path: `/eventease-SEO/user/${user.id}` });
    } else {
      errorTextShow();
    }
  };
  function activateLogin() {
    showPopUp.value = true;
  }
  function deactivateLogin() {
    errorTextHide();
    resetLogin();
    showPopUp.value = false;
  }
  function errorTextShow() {
    wrongInput.value = true;
  }
  function errorTextHide() {
    wrongInput.value = false;
  }
  function signUpTriggered() {
    emit('sign-up-triggered', true);
    deactivateLogin();
  }
  function resetLogin() {
    loginUserInput.value = { username: '', mail: '', password: '' };
    showPopUp.value = false;
    wrongInput.value = false;
  }
</script>

<style scoped>
  .exit-button-container {
    display: flex;
    justify-content: flex-end;
  }
  .error-text {
    color: red;
  }
  #cover-bottom-content {
    height: calc(100% - 10px);
  }
  .label-for-login {
    font-size: large;
  }
  .user-input-for-login {
    display: flex;
    flex-direction: row;
  }
  .dynamic-padding {
    flex-grow: 1;
  }
  a:hover {
    cursor: pointer;
  }
</style>
