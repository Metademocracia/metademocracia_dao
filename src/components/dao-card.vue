<template>
  <v-sheet class="dao-card bg-tertiary">
    <v-card
      :ripple="hasPressedEmit"
      :style="`cursor: ${hasPressedEmit ? 'pointer' : 'default'}`"
      @click="emit('pressed')"
    >
      <v-btn
        icon="mdi-open-in-new"
        color="rgba(111, 91, 165, 1)"
        size="18"
        class="linked-btn"
      />

      <img :src="dao?.image" :alt="`${dao?.name} image`" class="dao-image mx-auto">
      <h6 class="mt-2 mb-1 text-center" style="text-decoration: underline">{{ dao?.name }}</h6>
      <a class="text-center" style="text-wrap: nowrap;">
        {{ dao?.account }}
        <sup>
          <v-icon icon="mdi-content-copy" class="text-tertiary" size="8" />
        </sup>
      </a>

      <p class="my-5 ellipsis-box" style="--lines: 4">{{ dao?.description }}</p>

      <div class="w-100 d-flex flex-spacea" style="gap: 20px;">
        <div class="flex-column-center">
          <span class="text-primary">Fondos del DAO</span>

          <h6 class="mb-0" style="font-size: 18px;">{{ dao?.funds }} USD</h6>
        </div>
        
        <div class="flex-column-center">
          <span class="text-primary">Miembros / Grupos</span>

          <h6 class="mb-0" style="font-size: 18px;">{{ dao?.members }} / {{ dao?.groups }}</h6>
        </div>
      </div>

      <v-divider thickness="1" class="text-tertiary my-4" style="opacity: .5; width: 100%;" />

      <span class="mb-1" style="font-size: 13px !important;">{{ dao?.activeProposals }} Propuestas Activas</span>
      <span class="mb-0">Propuestas totales: {{ dao?.totalProposals }}</span>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

defineProps({
  dao: {
    type: Object,
    default: undefined
  }
})
const
  emit = defineEmits(['pressed']),
  instance = getCurrentInstance(),

hasPressedEmit = !!instance?.vnode.props?.onPressed
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

  span:not(.v-btn span, .text-primary), a, p, h6 {
    color: #000 !important;
  }
}
</style>
