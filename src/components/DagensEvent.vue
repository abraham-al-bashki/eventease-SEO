<template>
  <div id="hanppening-box">
    <h1>Dagens tips</h1>
    <!-- sökruta -->
    <input type="text" v-model="search" placeholder="Sök kategori, tex musik" />
    <!-- knapp för sökning -->
    <button @click="searchEvents">Sök</button>
    <!-- Lista med händelser, varje listelement representerar en händelse  -->
    <ul id="ulHappening">
      <!-- v-for går igenom varje händelse i listan "filteredHändelse". För varje händelse
      använder den variabeln item för att representera den aktuella händelsen
      och variabeln index för att representera  position i listan -->
      <li v-for="(item, index) in filteredHändelse" :key="index">
        <button @click="showInfo(index)">
          {{ item.namn }}
        </button>

        <div v-show="show[index]">
          &#128336;{{ item.tid }}
          <!-- <img src="./../assets/placeholder.png" alt="placeholder" /> -->
          {{ item.plats }}
        </div>
        <button v-show="show[index]" @click="taBortEvent(index)">
          inte intresserad
        </button>
        <div v-if="index === 2">&#8595;</div>
      </li>
      <div v-if="filteredHändelse.length <= 3">Finns inte mer än 3</div>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  // Array för händelse
  const händelse = ref([]);
  // Array för att visa/dölja detaljer
  const show = ref([]);
  // Array för "inte intresserad
  const Intresserad = ref([]);
  // Sök
  const search = ref('');
  // Funktion för att hämta händelser från JSON-fil, today.json
  function getTips() {
    fetch('/eventease-SEO/src/assets/today.json')
      .then((response) => response.json())
      .then((result) => {
        händelse.value = result.happening;
        show.value = new Array(händelse.value.length).fill(false);
        Intresserad.value = [...händelse.value];
      })
      .catch((err) => {
        console.log('DagensEvent: ', err);
      });
  }

  // Anropa funktion för att hämta händelser
  getTips();
  // Funktion för att visa/dölja detaljer om en händelse
  function showInfo(index) {
    show.value[index] = !show.value[index];
  }
  // Funktion för att ta bort en händelse från listan "inte intresserad"
  function taBortEvent(index) {
    Intresserad.value.splice(index, 1);
  }
  // För att filtrera händelser baserat på sökning
  const filteredHändelse = computed(() => {
    if (!search.value) {
      // Om ingen sökning görs, visa alla händelser
      return Intresserad.value;
    } else {
      // Annars filtrera baserat på kategori
      return filterByCategory(search.value);
    }
  });
  // Funktion för att filtrera händelser efter kategori
  function filterByCategory(category) {
    return Intresserad.value.filter((item) => item.kategori === category);
  }
  // Funktion för att söka efter händelser
  function searchEvents() {
    filteredHändelse.value = filterByCategory(search.value);
  }
</script>

<style scoped>
  #hanppening-box {
    font-size: 0.65em;
    width: 316px;
    height: 38vh;
    overflow-y: scroll;
    scrollbar-width: none;
    margin: auto;
    backdrop-filter: blur(10px);
    border: solid;
    border-radius: 20px;
  }
  #ulHappening {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
  }
  li {
    margin: 0px;
    transition: background 0.5s;
  }

  li:hover {
    background: #3a423c;
  }
  button {
    margin: 8px;
  }

  @media (min-width: 730px) {
    #hanppening-box {
      font-size: 1em;
      width: 80%;
      height: 50vh;
      overflow-y: scroll;
      scrollbar-width: none;
      margin: auto;
      backdrop-filter: blur(10px);
      border: solid;
      border-radius: 20px;
      padding-bottom: 20px;
    }
    h1 {
      width: 100%;
    }
    #ulHappening {
      list-style: none;
      margin: 0px;
      padding: 0px;
      width: 100%;
    }
    li {
      margin: 0px;
      transition: background 0.5s;
    }

    li:hover {
      background: #3a423c;
    }
    button {
      margin: 8px;
    }
  }
</style>
