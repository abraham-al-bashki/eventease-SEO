<script setup>
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import EventCalendarDay from '../components/EventCalendarDay.vue';
  import HemKnapp from '../components/HemKnapp.vue';

  const route = useRoute();
  const sendDagInfo = ref({
      day: '31',
      info: ''
    }),
    // event = ref('t'),
    happening = ref({}),
    // variabel för att visa EventKalenderDay.vue när man
    //klickat på aktuell dag.
    show = ref(false),
    // lägg in kategorin som vi fått  ifrån route
    kategori = ref(route.params?.kategori),
    // array med alla dagar och information
    daysArray = ref([]),
    // information för aktuellt valda månad
    currentMonth = ref(new Date().getMonth()),
    // information för aktuellt valda år
    currentYear = ref(new Date().getFullYear());

  const weekdays = ref([
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
    'Söndag'
  ]);
  const months = ref([
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'Novemer',
    'December'
  ]);

  // välj valda månad i text
  const nameOfMonth = computed(() => {
    return months.value[currentMonth.value];
  });
  // information för aktuellt valda år i strängform
  const stringYear = computed(() => {
    return currentYear.value.toString();
  });

  function getEvents() {
    fetch(
      `https://firestore.googleapis.com/v1/projects/ithseventease/databases/(default)/documents/kategori/${kategori.value}/${stringYear.value}/${currentMonth.value}/events`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((result) => {
        happening.value = result.documents;
        // event.value = result.documents;
        setTheMonth(currentMonth.value);
      })
      .catch((err) => {
        alert('serverfel');
        console.error('Fel: ' + err);
      });
  }

  function setTheMonth() {
    // skapa en array med 42 element för att kunna passa i griden 6*7
    let daysArr = Array.from({ length: 42 }, (_, i) => i);
    // hämta hur många dagar det är i valda månaden
    let MonthYear = new Date(currentYear.value, currentMonth.value + 1, 0),
      numberOfDaysInMonth = MonthYear.getDate();
    //ta reda på vilken veckodag månaden startar på
    let startDay = getRightDay(
      new Date(currentYear.value, currentMonth.value, 1)
    );
    //loopa över alla dagar i månaden och lägg till dem i gridden
    for (let dag = 1; dag < numberOfDaysInMonth + 1; dag++) {
      let tempDay = new Date(currentYear.value, currentMonth.value, dag),
        tempInfo = [],
        temp = {};

      // lägg till händelser ifall något händer det aktuella dagen
      if (happening?.value?.[0]?.fields.date.integerValue !== undefined) {
        happening?.value.forEach((event) => {
          if (event.fields.date.integerValue == dag) {
            tempInfo.push(event.fields);
          }
        });
      }
      temp = { day: tempDay.getDate(), info: tempInfo };
      // splicia in aktuella dagen på rätt ställe i arrayen med 42 dagar
      daysArr.splice(dag + startDay - 1, 1, temp);

      //  ifall tempinfo blivit fylld dagen vi loopat över töm den.
      tempInfo = 'empty';
    }
    //lägg till informationen i den globala variabeln för den aktuella månaden
    daysArray.value = daysArr;
    //denna behövs ej under:
    return MonthYear;
  }

  //visa valda dag vid klick
  function showDayComponent(d) {
    if (d.day) {
      show.value = true;
      sendDagInfo.value = d;
    }
  }
  // funktion för att kunna byta aktuell månad och år.
  function changeMonth(d) {
    if (currentMonth.value == 0 && d == -1) {
      currentMonth.value = 11;
      currentYear.value--;
    } else if (currentMonth.value == 11 && d == 1) {
      currentMonth.value = 0;
      currentYear.value++;
    } else {
      currentMonth.value = currentMonth.value + d;
    }
    getEvents();
  }

  function getRightDay(date) {
    // const date = new Date();
    let dateDay = date.getDay();
    let s = dateDay + 6 > 6 ? (dateDay = dateDay - 1) : (dateDay = 6);
    return s;
  }
  function test() {
    console.log('t', daysArray.value);
    console.log('t', happening.value);
  }
  getEvents();
</script>
<template>
  <div class="flower1" />
  <div class="calendarContainer">
    <h3>{{ kategori }}Kalendern</h3>
    <div class="hemKnapp">
      <HemKnapp />
    </div>
    <button @click="test">hej</button>
    <div class="curentContainer">
      <div>
        <h2>{{ nameOfMonth }}</h2>
        <h2>{{ currentYear }}</h2>
      </div>
      <div class="toppContainer">
        <button class="monthDay" @click="changeMonth(-1)">&#60;&#45;</button>
        <button class="monthDay" @click="changeMonth(1)">&#45;&#62;</button>
      </div>
    </div>

    <div class="containerAll">
      <div class="monthClass">
        <div
          class="month weekdays"
          :key="index2"
          v-for="(weekday, index2) in weekdays"
        >
          <p>
            {{ weekday }}
          </p>
        </div>
        <div
          :key="index"
          class="month"
          :class="{ monthDay: day.info, monthDayNoneinfo: !day.info }"
          @click="showDayComponent(day)"
          v-for="(day, index) in daysArray"
        >
          <p class="dayNumber">{{ day.day }}</p>
          <div v-if="day.info?.length > 0">
            <p class="informationDay">{{ day.info[0].namn.stringValue }}</p>
          </div>
          <div class="informationDay" v-if="day.info?.length > 1">
            <p>...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EventCalendarDay
    v-show="show"
    :dag="sendDagInfo"
    :month="nameOfMonth"
    @closer="show = false"
  />
</template>
<style scoped>
  .curentContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20vw;
  }
  .flower1 {
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100vw;
    transform: translate(-0%, 0%);
    background-image: url(../assets/flower3.png), url(../assets/flower2.png);
    background-repeat: no-repeat space;
    background-size: 20%;
    background-position: right;
  }

  h2 {
    font-family: Lato;
    margin: 0px;
  }
  .hemKnapp {
    position: absolute;
    top: -20px;
    left: 0px;
    display: flex;
    width: 100%;
  }
  .informationDay {
    background-color: rgba(21, 25, 21, 0.354);
    font-size: 0.2em;
    margin: 0px;
    text-wrap: wrap;
  }
  .informationDayinf {
    font-size: 0.1em;
    margin: 0px;
    text-wrap: wrap;
  }
  .toppContainer {
    display: flex;
    align-items: center;
    margin: 0px 5px;
    gap: 20px;
  }
  .calendarContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .containerAll {
    display: flex;
  }
  .month {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin: 2px;
    margin-top: 0px;
    margin-bottom: 5px;
  }
  .weekdays {
    width: 40px;
    height: 30px;
    text-align: center;
    font-size: 0.5em;
    margin-bottom: 0px;
  }
  .weekdays p {
    padding: 0px;
    margin-bottom: 0px;
  }
  .monthDay {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: var(--main-color);
    white-space: nowrap;
    box-shadow: 2px 2px 15px #161616, -2px -2px 2px #a6a6a6;
    box-sizing: border-box;
  }
  .monthDayNoneinfo {
    cursor: pointer;
    border: dotted;
    box-sizing: border-box;
  }
  .dayNumber {
    padding-right: 5px;
    text-align: right;
  }
  .monthDay p {
    margin: 0px;
  }
  .monthClass {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  @media (min-width: 410px) {
    .month {
      width: 42px;
      height: 42px;
      margin: 5px;
      margin-top: 0px;
      margin-bottom: 10px;
    }
    .monthClass {
      width: 400px;
    }
    .weekdays {
      text-align: center;
      font-size: 0.7em;
      margin-bottom: 0px;
    }
    .hemKnapp {
      top: 20px;
    }
  }

  @media (min-width: 600px) {
    .calendarContainer {
      position: relative;
      /* min-width: 100vw; */
    }
    .containerAll {
      display: flex;
    }
    .informationDay {
      font-size: 0.3em;
      margin: 0px;
    }
    .informationDayinf {
      font-size: 0.3em;
    }
    .monthClass {
      width: 500px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    .month {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      margin: 8px;
    }
    .weekdays {
      text-align: center;
      font-size: 0.9em;
      margin-bottom: 0px;
      width: 50px;
      height: 40px;
    }
    .monthDay {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-shadow: 2px 2px 2px #161616, -2px -2px 2px #a6a6a6;
    }

    @media (min-width: 780px) {
      .monthClass {
        width: 700px;
      }
      .month {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin: 8px;
      }
      .weekdays {
        text-align: center;
        font-size: 0.9em;
        height: 46px;
        margin-bottom: 0px;
      }

      .informationDay {
        font-size: 0.5em;
      }
      .monthDay {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
      }
    }
  }
</style>
