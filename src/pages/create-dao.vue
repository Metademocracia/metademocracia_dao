<template>
  <div id="create-dao">
    <toolbar-search />

    <section id="create-dao__content" class="mt-10">
      <sticky-drawer icon-distance="-50px">
        <template #mobile-icon>
          <v-icon>mdi-form-dropdown</v-icon>
        </template>

        <h5>Crear nueva DAO</h5>

        <ul class="steps">
          <li
            v-for="(item, i) in steps"
            :key="i"
            :class="{ active: i <= windowStep }"
          >{{ item }}</li>
        </ul>
      </sticky-drawer>


      <v-window v-model="windowStep">
        <!-- STEP 1 -->
        <v-window-item :value="0">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            required
            title="Nombre y Propósito de DAO"
            @next="formValid => {
              if (!formValid) return
              windowStep++
            }"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 2 -->
        <v-window-item :value="1">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="KYC (Opcional)"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 3 -->
        <v-window-item :value="2">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Enlaces y redes sociales (Opcional)"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 4 -->
        <v-window-item :value="3">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Agregar grupos <span style='font-size: 13px'>(Agregue más grupos a su DAO)</span>"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 5 -->
        <v-window-item :value="4">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Agregar Miembros (Opcional)"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 6 -->
        <v-window-item :value="5">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Creación de propuestas"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 7 -->
        <v-window-item :value="6">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Permisos de voto"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>


        <!-- STEP 8 -->
        <v-window-item :value="7">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Crear activos DAO"
            @prev="windowStep--"
            @next="windowStep++"
          >
            here
          </form-card>
        </v-window-item>
      </v-window>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/create-dao.scss'
import FormCard from '@/components/form-card.vue'
import { ref } from 'vue';
const
windowStep = ref(0),
steps = [
  "Nombre y Propósito",
  "KYC",
  "Enlaces y Redes",
  "Agregar Grupos",
  "Agregar Miembros",
  "Creación de Propuesta",
  "Permisos de Votación",
  "Create DAO Assets"
]
</script>
