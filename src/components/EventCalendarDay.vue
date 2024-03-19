<script setup>
  import { ref, defineProps, watch } from 'vue';
  //importera eventinformationen med hjälp av props
  //"dag" och aktuell månad med "month"
  let prop = defineProps({
    dag: {
      type: Object,
      default() {
        return { time: '00.00' };
      }
    },
    month: {
      type: String,
      default() {
        return '';
      }
    }
  });
  //constant för att lägga in propvärdet, eftersom propvärde inte bör ändras på
  const day = { time: '', info: '' };
  // om propen ändras kör timefunction går inte att köra funktionen direkt,
  //direkt i setup för då körs den direkt när hela kalendern öppnas
  watch(prop, () => {
    if (prop.dag) {
      day.value = prop.dag;
    }
    timeFunction();
  });
  // emit för att stänga componenten
  const emit = defineEmits(['closer']);
  function closer() {
    emit('closer');
  }
  const times = ref([]);
  const hourInDay = 25;

  function timeFunction() {
    let tempArr = [];
    for (let i = 0; i < hourInDay; i++) {
      tempArr.push([{ time: i + '.00' }]);
      // check if there is some info send to prop
      if (day?.value?.info?.length > 0) {
        //check if there are events same time same day
        let eventsSameTime = 0;
        // loop thru the info
        for (let j = 0; j < day?.value?.info.length; j++) {
          // om ett event startar innan 10
          if (day?.value?.info[j]?.time.stringValue.startsWith('0')) {
            day.value.info[j].time.stringValue =
              day.value.info[j].time.stringValue.slice(1);
          }
          // kolla om det finns någon info den aktuella tiden.
          if (prop?.dag?.info[j]?.time.stringValue == i + '.00') {
            //kolla om det är flera event samma dag pusha in
            //informationen i en temporär array
            if (eventsSameTime > 0) {
              tempArr[i].push({ time: i + '.00' });
              tempArr[i][j].info = day?.value?.info[j].descript.stringValue;
              tempArr[i][j].namn = day?.value?.info[j].namn.stringValue;
              tempArr[i][j].plats = day?.value?.info[j].plats.stringValue;
              tempArr[i][j].eventnr = eventsSameTime;
            } else {
              tempArr[i][0].time = i + '.00';
              tempArr[i][0].info = day?.value?.info[j].descript.stringValue;
              tempArr[i][0].namn = day?.value?.info[j].namn.stringValue;
              tempArr[i][0].plats = day?.value?.info[j].plats.stringValue;
              eventsSameTime++;
            }
          }

          // pusha in namnet om ett event är pågående
          if (
            Number(prop?.dag?.info?.[j]?.stop?.stringValue.split('.')[0]) > i &&
            Number(prop?.dag?.info?.[j]?.time?.stringValue.split('.')[0]) < i
          ) {
            tempArr[i][0][`eventOnGoing${j}`] = day?.value?.info?.[j]?.namn;
          }
        }
      }
    }
    times.value = tempArr;
  }
</script>
<template>
  <div class="day">
    <div class="closer" @click="closer"><p>X</p></div>
    <p>{{ dag.day }} {{ prop.month }}</p>
    <div>
      <ul class="listan">
        <!-- gör en v-for över alla timmar på dagen -->
        <li :key="index" class="lian" v-for="(timme, index) in times">
          <!-- visa timmen -->
          <p>{{ timme[0].time }}</p>
          <!-- loopa över keys för att se om  det finns något
            pågående event ind är index   -->
          <div :key="ind" v-for="(ongoing, ind) in Object.keys(timme[0])">
            <!-- om en nyckel börjar med onGoing visa namnet på eventet F
              ick tips från chatgpt om stringfunktionen startsWith  -->
            <div
              class="onGoing"
              v-if="ongoing.startsWith('eventOnGoing') && timme[0][ongoing]"
            >
              <p>{{ timme[0][ongoing].stringValue }}</p>
            </div>
          </div>

          <!-- om det startar något event den specifika timmen visa den -->
          <div class="infoContainer" v-if="timme[0]?.info">
            <!--Loopa över informationen -->
            <div
              :key="inInfo"
              class="infoNamnPlats"
              v-for="(eventet, inInfo) in timme"
            >
              <h3>
                {{ eventet.namn }}
              </h3>
              <p>{{ eventet.info }}</p>
              <p>Plats: {{ eventet.plats }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .lian {
    display: flex;
    border-bottom: dotted 1px;
    width: 80%;
    position: relative;
    margin-left: 0px;
    background-color: transparent;
    text-align: left;
    padding: 10px;
  }
  .day {
    padding: 5px;
  }
  .day h1 {
    margin: 0px;
  }
  .listan {
    padding: 5px;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    max-height: 70vh;
    overflow-y: scroll;
  }

  .onGoing {
    background-color: rgba(128, 128, 139, 0.305);
    height: 80%;
    margin: 2px;
  }
  .listan li p {
    margin: 0px;
  }
  .infoContainer {
    display: flex;
    background-color: aliceblue;
    color: black;
    gap: 20px;
    border-radius: 20px;
    padding-left: 5px;
  }
  .infoNamnPlats {
    display: flex;
    flex-direction: column;
    border-right: dotted 1px;
    padding: 5px;
  }
  .infoNamnPlats p {
    margin: 0px;
    padding-bottom: 16px;
  }
  .day {
    width: 80%;
    position: absolute;
    margin: auto;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(10px);
    border: solid;
    border-radius: 20px;
  }
  .closer p {
    cursor: pointer;
    margin: 20px;
    font-size: 1.5em;
  }
  .closer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
</style>
