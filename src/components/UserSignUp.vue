<template>
  <div v-if="showPopUp">
    <pop-up>
      <template #select-top>
        <div class="exit-button-container">
          <button class="exit-button" @click="deactivateSignUp()">X</button>
        </div>
        <h1>Sign Up</h1>
      </template>
      <template #no-select-middle>
        <template v-if="users !== undefined">
          <div class="user-input-for-sign-up">
            <label class="label-for-sign-up" for="type-username"
              >Username</label
            >
            <div class="dynamic-padding" />
            <button
              :id="
                isUsernameTaken
                  ? 'maybe-username-is-in-database'
                  : 'username-is-in-database'
              "
              @click="checkIfUsernameIsTaken()"
              @mouseover="infoPopUp"
              @mouseleave="hideInfoPopUp"
            >
              {{ IsUsernameTakenButtonText }}
            </button>
            <input
              id="type-username"
              v-model="signUpUserInput.username"
              placeholder="Type your username..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <div class="user-input-for-sign-up">
            <label class="label-for-sign-up" for="type-mail">Mail</label>
            <div class="dynamic-padding" />
            <input
              id="type-mail"
              v-model="signUpUserInput.mail"
              placeholder="Type your mail..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <div class="user-input-for-sign-up">
            <label class="label-for-sign-up" for="type-password"
              >Password</label
            >
            <div class="dynamic-padding" />
            <input
              id="type-password"
              v-model="signUpUserInput.password"
              placeholder="Type your password..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <div class="user-input-for-sign-up">
            <label class="label-for-sign-up" for="type-password"
              >Password</label
            >
            <div class="dynamic-padding" />
            <input
              id="type-password"
              v-model="passwordConfirmation"
              placeholder="Type your password again..."
              @keyup.enter="navigateToUser()"
            />
          </div>
          <button @click="navigateToUser()">Sign Up</button>
        </template>
      </template>
      <template #select-bottom>
        <template v-if="users !== undefined">
          <div id="cover-bottom-content">
            <a>Forgot Your password?</a>
            <div class="error-text" :hidden="!wrongInput">
              <p>Wrong Input!</p>
              <p>Password: At least 8 characters.</p>
              <p>
                Password: Contains a number, a lowercase and a uppercase letter.
              </p>
              <p>Username: Must be unique.</p>
            </div>
          </div>
        </template>
      </template>
    </pop-up>
  </div>
  <template v-else>
    <button v-bind="$attrs" @click="activateSignUp()">Sign Up</button>
  </template>
  <div
    v-if="infoPopUpisActive"
    class="info-pop-up"
    :style="{
      top: infoPopUpPosition.top + 'px',
      left: infoPopUpPosition.left + 'px'
    }"
  >
    Click on this button to check if the username is available!
  </div>
</template>

<script setup>
  import { ref, watch, computed, defineProps, defineEmits } from 'vue';
  import PopUp from './PopUp.vue';
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
  const signUpUserInput = ref({
    id: 'NaN',
    username: '',
    mail: '',
    password: ''
  });
  const passwordConfirmation = ref('');
  const router = useRouter();
  const showPopUp = ref(false);
  const wrongInput = ref(false);
  const startId = ref(5);
  const isUsernameTaken = ref(true);
  const IsUsernameTakenButtonText = computed(() => {
    return isUsernameTaken.value ? '?' : '✔';
  });
  const infoPopUpPosition = ref({ top: 0, left: 0, isActive: false });
  const infoPopUpisActive = ref(false);
  const props = defineProps({
    signUpTriggered: { required: true, type: Boolean }
  });
  const emit = defineEmits(['sign-up-triggered']);
  // https://vuejs.org/guide/essentials/watchers.html#deep-watchers
  watch(
    signUpUserInput,
    () => {
      if (oldUsername.value !== signUpUserInput.value.username) {
        isUsernameTaken.value = true;
        oldUsername.value = signUpUserInput.value.username;
      }
      errorTextHide();
    },
    { deep: true }
  );
  watch(props, () => {
    if (props.signUpTriggered) {
      showPopUp.value = true;
      emit('sign-up-triggered', false);
    }
  });
  const oldUsername = ref(signUpUserInput.value);
  const navigateToUser = () => {
    const isSamePassword =
      passwordConfirmation.value === signUpUserInput.value.password;
    const passwordMinEightChars = passwordConfirmation.value.length >= 8;
    if (isSamePassword && passwordMinEightChars) {
      idGenerator();
      showPopUp.value = false;
      errorTextHide();
      const store = useLoginStore();
      store.login(signUpUserInput.value);
      router.push({ path: `/eventease-SEO/user/${signUpUserInput.value.id}` });
    } else {
      errorTextShow();
    }
  };
  function activateSignUp() {
    showPopUp.value = true;
  }
  function deactivateSignUp() {
    errorTextHide();
    resetSignUp();
    showPopUp.value = false;
  }
  function errorTextShow() {
    wrongInput.value = true;
  }
  function errorTextHide() {
    wrongInput.value = false;
  }
  function idGenerator() {
    signUpUserInput.value.id = startId;
    ++startId.value;
  }
  function checkIfUsernameIsTaken() {
    const user = users.value.find(
      (element) => element.name === signUpUserInput.value.username
    );
    if (user || signUpUserInput.value.username === '') {
      isUsernameTaken.value = true;
    } else {
      isUsernameTaken.value = false;
    }
  }
  function infoPopUp(event) {
    infoPopUpPosition.value = {
      top: event.clientY,
      left: event.clientX
    };
    infoPopUpisActive.value = true;
  }
  function hideInfoPopUp() {
    infoPopUpisActive.value = false;
  }
  function resetSignUp() {
    signUpUserInput.value = {
      id: 'NaN',
      username: '',
      mail: '',
      password: ''
    };
    passwordConfirmation.value = '';
    oldUsername.value = '';
    showPopUp.value = false;
    wrongInput.value = false;
    isUsernameTaken.value = true;
    infoPopUpPosition.value = { top: 0, left: 0, isActive: false };
    infoPopUpisActive.value = false;
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
  .error-text p {
    margin: 0;
    text-align: left;
  }
  #cover-bottom-content {
    height: calc(100% - 10px);
  }
  .label-for-sign-up {
    font-size: large;
  }
  .user-input-for-sign-up {
    display: flex;
    flex-direction: row;
  }
  .dynamic-padding {
    flex-grow: 1;
  }
  #maybe-username-is-in-database {
    background-color: rgb(250, 250, 0);
    color: black;
  }
  #username-is-in-database {
    background-color: rgb(0, 250, 0);
    color: black;
  }
  #maybe-username-is-in-database:hover {
    background-color: rgb(230, 230, 0);
    color: black;
  }
  #username-is-in-database:hover {
    background-color: rgb(0, 230, 0);
    color: black;
  }
  .info-pop-up {
    position: absolute;
    background-color: white;
    color: black;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 6;
  }
</style>
