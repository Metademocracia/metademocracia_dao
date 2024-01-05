<template>
  <div id="policy-settings" class="mt-4">
    <sticky-drawer>
      <h5>DAO Settings</h5>

      <h6 style="font-size: 15px;">Config. Políticas</h6>

      <v-tabs
        v-model="tab"
        direction="vertical"
        align-tabs="start"
        density="compact"
        slider-color="rgb(var(--v-theme-primary))"
        class="tabs"
      >
        <v-tab
          v-for="(item, i) in tabs"
          :key="i"
        >{{ item }}</v-tab>
      </v-tabs>
    </sticky-drawer>

    <!-- TODO here container missing -->
    <v-sheet>
      <v-card>

      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/policy-settings.scss'
import { ref } from 'vue';
const
tab = ref(0),
tabs = ["Creación de propuesta", "Permisos de Voto"]
</script>
