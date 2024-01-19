<template>
  <span v-html="html"></span>
</template>

<script setup>
defineProps({
  html: {
    type: String,
    default: undefined
  }
})
</script>

<style lang="scss">
.dao-card {
  border-radius: 6px !important;
  padding: 10px;
  box-shadow: 0 3px 8px 0px rgb(0, 0, 0, .2) !important;
  display: grid !important;

  > .v-card {
    padding: 20px 25px;
    border-radius: 4px !important;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


  .linked-btn {
    $distance: 5px;
    position: absolute;
    top: $distance;
    right: $distance;
    .v-icon { font-size: 12px }
  }

  .dao-image {
    $size: 58px;
    width: $size;
    height: $size;
    border-radius: 50%;
    border: 3.5px solid rgb(var(--v-theme-primary));
    background: linear-gradient(-145deg, rgb(var(--v-theme-primary)), #62C3D7);
    object-fit: cover;
  }

  span, a { font-size: 11px !important }
  p { font-size: 13px !important }
}
</style>
