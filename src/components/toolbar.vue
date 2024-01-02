<template>
  <aside class="toolbar">
    <div class="toolbar__wrapper flex-wrap">
      <h5 class="mb-0">{{ title }}</h5>

      <slot />
    </div>
  </aside>
</template>

<script setup>
defineProps({
  title: String,
})
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.toolbar {
  // position: sticky;
  // top: 20px;
  background-color: rgba(0, 0, 0, .05) !important;
  width: 100vw !important;
  min-height: 70px;
  display: flex;
  align-items: center;
  margin-inline: calc(50% - 50vw) !important;
  z-index: 2;

  &__wrapper {
    @extend .parent;
    @extend .margin-global;
    padding-block: 10px;
    display: flex;
    align-items: center;
    gap: clamp(20px, 4vw, 40px);

    .v-tabs {
      button { min-width: max-content }
    }
  }
}
</style>
