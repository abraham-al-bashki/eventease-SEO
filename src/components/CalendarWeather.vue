<template>
  <!-- <h1 id="weather">weather</h1> -->
  <!-- <p id="gothenburg">Göteborg</p> -->

  <div id="weather-main">
    <!-- if vädret laddar in -->
    <div v-if="!laddar">
      <button class="PETERHAR" @click="fetchWeather">
        <!-- värden som ska visas på knappen så som ikon, temperatur -->
        <p>Dagens Väder</p>
        <img
          v-if="data?.weather[0]?.icon"
          :src="nowWeatherIconUrl(data.weather[0].icon)"
          alt="Weather Icon"
        />
        <p>{{ data.main.temp }}℃</p>
        <!-- {{ data.weather[0].description }} -->
        <!-- en dropdown för veckans väder med datum, ikon, temperatur -->
        <p>Veckans Väder</p>
        <div class="arrow-down" />
      </button>
      <div id="dropdown" v-show="show">
        <div class="closer" @click="closer">
          <p>Väder</p>
          <p>X</p>
        </div>
        <p id="text" v-for="(we, index) in list" :key="index">
          {{ getWeekday(we.dt_txt) }}
          {{ formatDate(we.dt_txt) }}
          <!-- <p>{{ we.dt_txt }}</p> -->
          <!-- {{ we.dt_txt }} -->
          <img
            v-if="we?.weather[0]?.icon"
            :src="nowWeatherIconUrl(we.weather[0].icon)"
            alt="Weather Icon"
          />
          {{ we.main.temp }}℃
          <!-- {{ we.weather[0].description }} -->
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const show = ref(false);
  const list = ref('');
  const data = ref('');
  const laddar = ref(false);
  const nowWeatherIconUrl = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}.png`;

  // en funktion som hämtar veckans väder i göteborg och filtrerar ut värdena för enbart klockan 15.00
  // för att visa ett värde per dag och inte åtta
  function fetchWeather() {
    show.value = !show.value;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg&units=metric&appid=cdbc7fce116b35121e05f3402acf91bd`
    )
      .then((response) => response.json())
      .then((result) => {
        // Filtrera endast de värden där dt_txt visar 15:00
        list.value = result.list.filter((we) => we.dt_txt.includes('15:00'));
        getWeekday();
      });
  }

  // en funktion som hämtar vädret just NU i göteborg
  function nowWeather() {
    laddar.value = true;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Gothenburg&units=metric&appid=cdbc7fce116b35121e05f3402acf91bd`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('två', result);
        data.value = result;
        laddar.value = false;
      });
  }

  // en funktion för att få ut dagen datum och månad
  function getWeekday(timestamp) {
    const weekdays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    const date = new Date(timestamp);
    const weekday = weekdays[date.getDay()];
    return weekday;
  }

  // en funktion för att få fram kortformen av månad så som Januari blir Jan
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  // till för att kryssa ner vädret på mobilversion
  function closer() {
    show.value = !show.value;
  }
  // spottar ut funktionen
  nowWeather();
</script>

<style scoped>
  button p {
    display: none;
  }
  button {
    box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
    background-color: #2a332c;
    width: 75px;
    height: 75px;
    padding: 0px;
    justify-content: center;
  }
  #dropdown {
    width: 300px;
    position: absolute;
    margin: auto;
    left: 50%;
    right: 50%;
    top: 50%;
    padding: 0px;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(10px);
    border: solid;
    border-radius: 20px;
    z-index: 3;
  }
  .closer p {
    cursor: pointer;
    margin: 20px;
    margin-bottom: 0px;
    font-size: 1.5em;
  }
  .closer {
    margin: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @media (min-width: 730px) {
    .closer {
      display: none;
    }

    button p {
      margin-top: 0px;
      display: block;
    }
    .PETERHAR {
      max-width: 150px;
    }
    #weather-main {
      position: relative;
      display: flex;
      align-items: center;
      text-align: center;
    }
    button {
      color: rgba(255, 255, 255, 0.87);
      background-color: #2a332c;
      font-family: CamptonBold, sans-serif;
      font-size: 20px;
      box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
      width: 150px;
      height: 298px;
      margin-bottom: auto;
      border-radius: 20px;
    }
    #dropdown {
      position: absolute;
      align-items: center;
      background-color: #2a332c;
      border-radius: 20px;
      font-size: 12px;
      font-family: CamptonBold, sans-serif;
      box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
      padding-bottom: 15px;
      width: 145px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 140px;
      max-height: 30vh;
      overflow-y: scroll;
      right: 50%;
      top: 98%;
      transform: translate(-50%, -50%);
    }
    #dropdown #text {
      border-bottom-style: dotted;
      margin: 0;
      border-width: 2px;
    }
    /* #dropdown p{
    margin: 0px;
    border: 3px solid red;
} */
    img {
      width: 52px;
    }

    .arrow-down {
      width: 2px;
      height: 0px;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 20px solid #d9d9d9;
      margin-right: auto;
      margin-left: auto;
    }
  }
</style>
