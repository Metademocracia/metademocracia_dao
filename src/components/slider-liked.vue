<template>
  <div style="width: 100%;" class="delete-mobile">
    <h5 class="tstart">
      Votos
    </h5>

    <div class="slider-liked center">
      <div class="circle"></div>
      <div class="transversal-line"></div>
      <div class="circle"></div>

      <div class="slider-liked__likes jstart">
        <img v-for="(item, i) in data" :key="i" :src="iconMap[item.icon]" :alt="item.icon_name">
      </div>
    </div>

    <div class="jspace" style="width: 100%;">
      <span style="color: #e2e2e2;">Creando propuesta</span>
      <span style="color: #e2e2e2;">Completada</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: undefined
  }
})
</script>

<style lang="scss" scoped>
.slider-liked{
  width: 100%;
  height: 45px;
  min-height: 45px;
  position: relative;
  display: flex;
  flex-direction: row;
  
  .circle{
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: rgb(123, 216, 123);
  }

  .transversal-line{
    width: 100%;
    height: 4px;
    background-color: rgb(123, 216, 123);
  }

  &__likes{
    position: absolute;
    width: 100%;
    height: 30px;
    background-color: transparent;
    padding-inline: 20px;
    display: flex;
    flex-direction: row;
  }
}
</style>
