<script setup>
  import { ref, computed } from 'vue';
  import HemKnapp from '../components/HemKnapp.vue';
  const datum = ref(new Date().toISOString().split('T')[0]),
    information = ref('Information'),
    name = ref('Namn'),
    plats = ref('Plats'),
    kategori = ref('Kategori'),
    stop = ref('20:00'),
    time = ref('13:00'),
    shower = ref(false),
    laddar = ref(false),
    dataSent = ref(false);
  const kategoriUppercase = computed(() => {
    return `${kategori.value[0].toLocaleUpperCase()}${kategori.value.slice(1)}`;
  });
  const daten = computed(() => {
    return {
      year: datum.value.split('-')[0],
      month: datum.value.split('-')[1].replace(/^./, ''),
      day: datum.value.split('-')[2]
    };
  });
  const startTime = computed(() => {
    return {
      time: time.value.replace(/:.*/g, '.00')
    };
  });
  const stopTime = computed(() => {
    return {
      stop: stop.value.replace(/:.*/g, '.00')
    };
  });

  // testar async await och arrow funktion istället
  const addParent = async () => {
    // console.log('test');
    const PostDataparent = {
      fields: {
        date: { stringValue: 'tomt' }
      }
    };
    const parent = `https://firestore.googleapis.com/v1/projects/ithseventease/databases/(default)/documents/kategori/${kategoriUppercase.value}`;
    try {
      let response = await fetch(parent, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(PostDataparent)
      });
      let data = await response.json();
      console.log('data', data);
    } catch (error) {
      alert('ServerError');
    }
  };
  //testar arrow syntax
  const addData = async () => {
    const urlPost = `https://firestore.googleapis.com/v1/projects/ithseventease/databases/(default)/documents/kategori/${
      kategoriUppercase.value
    }/2024/${daten.value.month - 1}/events`;

    const PostData = {
      fields: {
        date: { integerValue: Number(daten.value.day) },
        descript: { stringValue: information.value },
        longlat: { geoPointValue: { latitude: 11.9, longitude: 57.7 } },
        namn: { stringValue: name.value },
        plats: { stringValue: plats.value },
        stop: { stringValue: stopTime.value.stop },
        time: { stringValue: startTime.value.time },
        parentCategori: { stringValue: kategoriUppercase.value }
      }
    };
    try {
      let result = await fetch(urlPost, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(PostData)
      });
      let data = await result.json();
      return data;
    } catch (error) {
      alert('error kunde inte lägga in ditt event i servern');
      console.log('errror', error);
    }
  };
  function moduleRegret(event) {
    event.preventDefault();
    if (stop.value < time.value) {
      alert('starttid måste vara innan sluttid');
    } else {
      shower.value = true;
    }
  }
  async function sendDataToServer() {
    laddar.value = true;
    await addParent();
    await addData();
    laddar.value = false;
    shower.value = false;
    shower.value = false;
    dataSent.value = true;
  }
  // nollställ all data när inforutan stängs
  function closeTheSuccess() {
    information.value = 'Information';
    name.value = 'Namn';
    plats.value = 'Plats';
    stop.value = '23:00';
    kategori.value = 'Kategori';
    time.value = '00:00';
    dataSent.value = false;
  }
</script>
<template>
  <div class="container">
    <div><h2>Organisation</h2></div>
    <HemKnapp />

    <div class="inputForm">
      <form class="form" @submit="(event) => moduleRegret(event)">
        <p>Name</p>
        <input placeholder="name" type="text" v-model="name" required />
        <p>Information</p>
        <textarea placeholder="information" v-model="information" required />
        <p>Kategori</p>
        <input type="text" placeholder="Kategori" v-model="kategori" required />
        <p>Plats</p>
        <input placeholder="plats" type="text" v-model="plats" required />
        <p>Tid då eventet startar enbart heltimma:</p>
        <input type="time" v-model="time" required />
        <p>Tid då evented slutar enbart heltimma:</p>
        <input type="time" v-model="stop" required />
        <p>Datum:</p>
        <input type="date" v-model="datum" required />
        <input class="buttonClass" type="submit" value="lägg till" />
      </form>
    </div>
    <div class="infoContainer" v-show="dataSent">
      <p>Grattis ditt event är nu publicerat</p>
      <button @click="closeTheSuccess">Stäng rutan</button>
    </div>
    <div v-show="shower" class="infoContainer">
      <h2>Ditt event:</h2>
      <p>Namn:</p>
      <p class="infoClass">{{ name }}</p>
      <p class="kat">Kategori:</p>
      <p class="infoClass">{{ kategori }}</p>
      <p>Plats:</p>
      <p class="infoClass">{{ plats }}</p>
      <p>Information:</p>
      <p class="infoClass">{{ information }}</p>
      <p>Start tid: {{ startTime.time }}</p>
      <p>Stop tid: {{ stopTime.stop }}</p>
      <p>Datum :{{ daten.year }} {{ daten.month }} {{ daten.day }}</p>
      <div v-show="laddar">
        <p>Laddar</p>
        <button @click="shower = !shower">close</button>
      </div>
      <div class="buttonContainer" v-show="!laddar">
        <button @click="shower = !shower">ångra</button>
        <button @click="sendDataToServer">Lägg till</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    word-wrap: break-word;
  }
  h2 {
    margin: 10px;
  }
  input,
  textarea {
    color: aliceblue;
    padding: 15px;
    margin-bottom: 14px;
    background-color: var(--main-color);
    border-radius: 6px;
    border: none;
    box-shadow: inset -2px -2px 2px #a6a6a6, inset 2px 2px 2px #161616;
  }
  button,
  .buttonClass {
    cursor: pointer;
    background-color: var(--main-color);
    margin-top: 10px;
    box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
  }
  .container {
    padding: 0px;
    margin: 0px;
    position: relative;
    width: 50vw;
  }
  .infoContainer {
    position: absolute;
    top: 10%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    backdrop-filter: blur(50px);
    background-color: rgba(42, 51, 44, 0.021);
    border: solid white;
    border-radius: 20px;
    padding-left: 5px;
    min-height: 60vh;
    text-align: left;
    padding: 20px;
    min-width: 80%;
  }
  p {
    margin: 0px;
    margin-top: 15px;
  }
  .infoClass {
    border: dotted 1px;
    padding: 5px;
    border-radius: 5px;
    margin-top: 0px;
  }
  .buttonContainer {
    display: flex;
    width: 80%;
    justify-content: space-between;
  }
  .buttonContainer button {
    padding: 2px;
    font-size: 0.8em;
    border-radius: 2px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    text-align: left;
  }
  .inputForm {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    gap: 2px;
  }

  @media (min-width: 504px) {
    .buttonContainer {
      align-items: center;
      justify-content: center;
      gap: 40px;
    }
    .buttonContainer button {
      padding: 5px;
      font-size: 1em;
      border-radius: 7px;
    }
  }
</style>
