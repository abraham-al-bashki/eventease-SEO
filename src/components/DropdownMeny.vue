<script>
  export default {
    // Anropa getkategori() för att hämta data
    created() {
      this.getkategori();
    },
    methods: {
      // getkategori() {
      //   this.kategori.data = [];
      //   fetch('/src/assets/events.json')
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log('result', result);
      //       // Sätt options till en array av nycklar från result.kategori
      //       this.options = Object.keys(result.kategori);
      //       // Sätt kategori.data till samma som result.kategori
      //       this.kategori.data = result.kategori;
      //     });
      // }
      // out commented to not risk onödiga hämtningar.
      getkategori() {
        this.kategori.data = [];
        fetch(
          'https://firestore.googleapis.com/v1/projects/ithseventease/databases/(default)/documents/kategori'
        )
          .then((response) => response.json())
          .then((result) => {
            console.log('result', result);
            this.options = result.documents.map((x) => {
              let s = x.name.split('/');
              return s[s.length - 1];
            });
            // this.options = Object.keys(result.kategori);
            // this.kategori.data = result.kategori;
          })
          // Felmeddelande
          .catch((error) => {
            console.error('Något gick fel:', error);
          });
      }
    },
    data() {
      return {
        // Tom array för att fyllas med nycklar
        options: [],
        // Sträng för att hålla koll på det valda alternativet
        selected: '',
        // Objekt för att lagra kategoridata
        kategori: { data: [] }
      };
    },
    // Watch övervakar ändringar i selected. När selected ändras,
    //  omdirigera användaren till en annan sida med hjälp av Vue Router
    watch: {
      selected() {
        this.$router.push(`/eventease-SEO/kalender/${this.selected}`);
      }
    }
  };
</script>

<template>
  <div class="Container">
    <h3>Eventskalender</h3>
    <!-- Dropdown-menyn där användaren kan välja alternativ -->
    <select v-model="selected">
      <option value="">Events</option>
      <!-- Visa varje alternativ från options -->
      <option v-for="(option, index) in options" :value="option" :Key="index">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
  select {
    max-width: 100px;
    background-color: rgba(139, 0, 139, 0.835);
    color: white;
    padding: 10px;
    border: none;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    font-family: Arial;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #161616, -2px -2px 2px #a6a6a6;
  }

  .option-style {
    font-weight: normal;
  }
  h3 {
    display: block;
  }
  @media (max-width: 730px) {
    h3 {
      display: none;
    }
  }
</style>
