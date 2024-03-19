<script setup>
  import Weather from './CalendarWeather.vue';
  import UserAnteckningar from './UserAnteckningar.vue';
</script>

<template>
  <div id="leftMainContainer">
    <UserAnteckningar />
    <Weather />
  </div>
</template>
<style scoped>
  #leftMainContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    gap: 10px;
    background-image: url(../assets/flower2.png), url(../assets/flower3.png);
    background-position: left, right;
    background-repeat: no-repeat;
  }
  @media (min-width: 730px) {
    #leftMainContainer {
      background-image: url(../assets/flower3.png);
      background-position: bottom left;
    }
  }
</style>
