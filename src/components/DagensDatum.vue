<template>
  <div>
    {{ date }}
  </div>
</template>

<script>
  export default {
    // körs när den kommer in i komponenten
    created() {
      this.updateTime(); // Flyttade anropet hit för att starta timern direkt
    },
    // körs när den kommer ut från nuvarande komponent
    unmounted() {
      this.beforeDestroy();
    },
    data() {
      return {
        date: '',
        intervalID: null
      };
    },
    methods: {
      updateTime() {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        };
        let nu = new Date();
        let tid = nu.toLocaleTimeString('sv-SE', options);
        this.date = tid;
        // console.log(tid);

        // Starta timern här istället
        this.intervalID = setInterval(() => {
          let nu = new Date();
          let tid = nu.toLocaleTimeString('sv-SE', options);
          this.date = tid;
          // console.log(tid);
        }, 60000); // Ange intervallet i millisekunder, 1000 motsvarar en sekund
      },
      beforeDestroy() {
        clearInterval(this.intervalID);
      }
    }
  };
</script>

<style scoped>
  /* div {
  } */
</style>
