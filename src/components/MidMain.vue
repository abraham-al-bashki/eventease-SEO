<script setup>
  // import DagensEvent from './DagensEvent.vue';
  import EventEase from './EventEase.vue';
  import DagensDatum from './DagensDatum.vue';

  // import organisationen from '../views/OrganisationEventAdder.vue';
  // import buttontoOrg from './ButtonToOrg.vue';
  // import AnalogKlocka from './AnalogKlocka.vue';
</script>

<template>
  <div id="midMainContainer">
    <EventEase />
    <DagensDatum />
    <!-- <AnalogKlocka /> -->
    <!-- <DagensEvent /> -->
    <!-- <buttontoOrg /> -->
  </div>

  <!-- <DagensHändelse /> -->
</template>
<style scoped>
  #midMainContainer {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  @media (min-width: 730px) {
    #midMainContainer {
      background-image: linear-gradient(#2a332cc2 20%, #2a332c6a),
        url('../assets/berg.jpg');
      background-repeat: no-repeat;
      background-position: cover;
      background-size: cover;
      width: 100%;
      border-left: dotted;
      border-right: dotted;
    }
  }
</style>
