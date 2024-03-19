<template>
  <div class="pop-up-container" ref="draggableElement">
    <!-- https://vuejs.org/guide/components/slots.html#named-slots -->
    <div
      ref="draggableElement"
      class="select"
      @mousedown="startDragging"
      @mousemove="handleDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
    >
      <slot name="select-top" />
    </div>
    <div
      ref="draggableElement"
      id="input-fields"
      class="no-select"
      @mousedown="stopDragging"
      @mousemove="stopDragging"
    >
      <slot name="no-select-middle" />
    </div>
    <div
      ref="draggableElement"
      id="select-bottom"
      class="select"
      @mousedown="startDragging"
      @mousemove="handleDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
    >
      <slot name="select-bottom" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const initialMouseX = ref(0);
  const initialMouseY = ref(0);
  const initialElementX = ref(0);
  const initialElementY = ref(0);
  const isDragging = ref(false);
  const draggableElement = ref(null);
  function startDragging(event) {
    isDragging.value = true;
    initialMouseX.value = event.clientX;
    initialMouseY.value = event.clientY;
    initialElementX.value = draggableElement.value.offsetLeft;
    initialElementY.value = draggableElement.value.offsetTop;
  }
  function handleDragging(event) {
    if (isDragging.value) {
      const deltaX = event.clientX - initialMouseX.value;
      const deltaY = event.clientY - initialMouseY.value;

      draggableElement.value.style.left = initialElementX.value + deltaX + 'px';
      draggableElement.value.style.top = initialElementY.value + deltaY + 'px';
    }
  }
  function stopDragging() {
    isDragging.value = false;
  }
</script>

<style scoped>
  .pop-up-container {
    display: flex;
    flex-direction: column;
    background-color: #2a332c;
    position: absolute;
    border: 10px #2a332c;
    /* width: 100%;
    height: 100%;
    top: 0;
    left: 0; */
    z-index: 5;
    border-radius: 10%;
    box-shadow: 2px 2px 7px 1px black;

    top: calc(50% - 300px);
    left: calc(50% - 175px);
    width: 350px;
    height: 600px;
  }
  .select {
    position: relative;
    cursor: move;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .no-select {
    position: relative;
    cursor: text;
  }
  #input-fields {
    padding: 0 17.5px 0 17.5px;
  }
  #select-bottom {
    flex-grow: 1;
    padding: 0 17.5px 0 17.5px;
  }
  /* @media (800px <= width) {
    .pop-up-container {
      top: calc(50% - 300px);
      left: calc(50% - 175px);
      width: 350px;
      height: 600px;
    }
    #input-fields {
      padding: 0 17.5px 0 17.5px;
    }
    #select-bottom {
      padding: 0 17.5px 0 17.5px;
    }
  } */
</style>
