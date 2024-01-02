<template>
  <aside class="sticky-drawer" :class="{ active: showFilters }">
    <v-btn
      class="show-filters-btn"
      :class="{ active: showFilters }"
      @click="showFilters = !showFilters"
    >
      <v-icon>mdi-filter</v-icon>
      <v-icon>
        {{ showFilters ? 'mdi-chevron-left' : 'mdi-chevron-right' }}
      </v-icon>
    </v-btn>

    <slot />
  </aside>
</template>

<script setup>
import { ref } from 'vue';
const showFilters = ref(false)
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.sticky-drawer {
  --w: 180px;
  display: flex;
  flex-direction: column;
  height: max-content;
  min-width: var(--w);
  top: 100px;
  position: sticky;
  @include media(max, small) {
    isolation: isolate;
    position: fixed;
    background-color: rgb(var(--v-theme-tertiary));
    z-index: 99;
    padding: 10px;
    border-radius: 10px;
    transform: translateX(calc(var(--w) * -1 - 30px));
    transition: .2s ease;
    &.active { transform: none }

    &:before {
      content: "";
      background-color: inherit;
      position: absolute;
      inset: 0;
      z-index: -1;
      translate: -50px 0;
    }
  }

  .show-filters-btn {
    position: absolute;
    top: 0;
    right: -50px;
    @include media(max, 550px) {right: -60px}
    @include media(max, x-small) {right: -65px}
    padding-inline: 0;
    transition: .2s ease;
    @include media(min, small) { display: none !important }

    &.active {
      right: -10px;

      i:first-of-type {
        order: 2; + i {  order: 1 }
      }
    }
  }

  .v-list {
    background-color: transparent !important;
    &-item__content {
      display: flex;
      align-items: center;
    }
  }

  .v-input {
    * { color: #333 !important }
    i {
      font-size: 18px;
      color: rgb(var(--v-theme-primary)) !important;
    }

    .v-field {
      border-radius: 30px;
      &__field {
        height: 38px;

        input {
          font-size: 13px !important;
          min-height: 100% !important;
          padding-block: 0;
        }
      }
    }
  }
}
</style>
