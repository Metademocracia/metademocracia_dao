<template>
  <aside class="toolbar-search">
    <div class="toolbar-search__wrapper">
      <v-text-field
        v-model="model"
        placeholder="Buscar"
        variant="solo"
        hide-details
        @update:model-value="(value) => emit('update', value)"
      >
        <template #prepend-inner>
          <v-icon icon="mdi-magnify" size="23" class="text-primary" />
        </template>

        <template #append-inner>
          <v-btn
            height="38"
            class="bg-secondary px-7"
            @click="emit('search', model)"
          >Buscar</v-btn>
        </template>
      </v-text-field>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
const
  emit = defineEmits(['update', 'search']),

model = ref(null)

defineExpose({ model })
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.toolbar-search {
  // position: sticky;
  // top: 20px;

  position: relative;
  isolation: isolate;
  background: $primary !important;
  width: 100vw !important;
  min-height: 120px;
  display: flex;
  align-items: center;
  margin-inline: calc(50% - 50vw) !important;
  z-index: 2;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgb(#62C3D7, .58);
    translate: 20px 0px;
    scale: 1 2;
    filter: blur(50px);
    z-index: -1;
  }


  &__wrapper {
    max-width: calc(880px + var(--margin-global));
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--margin-global);
    padding-block: 10px;
    display: flex;
    align-items: center;
  }

  .v-input {
    .v-field {
      padding-right: 0;
      border-radius: 30px;

      &__field {
        height: 38px;
      }

      input {
        min-height: 100% !important;
        height: 100% !important;
        font-size: 14px;
      }
    }

    i { color: $primary }
  }
}
</style>
