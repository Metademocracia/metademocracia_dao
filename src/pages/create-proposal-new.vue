<template>
  <div id="create-proposal">
    <toolbar title="Crear Propuesta" />

    <v-sheet class="mt-15 flex-grow-1" elevation="3" style="border-radius: 8px; padding: 15px;">
      <v-card class="flex-column pa-4" elevation="3" color="#FAFAFA">
        <v-form v-model="formValid" @submit.prevent="onSubmit">
          <label for="type">Tipo de Propuesta</label>
          <v-select
            id="type"
            :items="proposalTypes"
          />

          <div class="d-flex" style="gap: 20px;">
            <div class="flex-grow-1">
              <label for="title">Título de la propuesta</label>
              <v-text-field
                id="title"
                variant="solo"
                placeholder="Nombre de la propuesta"
              />
            </div>
            
            <div class="flex-grow-1">
              <label for="proponent">Proponente</label>
              <v-text-field
                id="proponent"
                variant="solo"
                placeholder="andresdom.near"
              />
            </div>
          </div>

          <label for="description">Descripción</label>
          <v-textarea
            id="description"
            variant="solo"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis accumsan urna ac placerat. Ut scelerisque eu ligula ac rhoncus. Aliquam sagittis sapien sit amet libero ultricies varius. Curabitur ac ligula ultricies, semper ipsum nec, auctor sapien. Etiam nec sem ac mauris imperdiet rutrum. Sed mi dui, mattis vel ipsum eget, dictum interdum augue. Donec mollis congue enim quis dignissim. Ut egestas dolor at mauris suscipit dictum. Quisque at sollicitudin dolor. Mauris id auctor dui. Duis velit ante, hendrerit in diam vel, tincidunt rutrum lacus. Morbi pulvinar efficitur efficitur. Quisque faucibus purus nec dolor convallis scelerisque. Mauris vitae viverra quam."
          />

          <label for="link">Link</label>
          <v-text-field
            id="link"
            variant="solo"
            placeholder="Link_de_prueba.com"
          />

          <v-btn
            class="bg-tertiary"
            :disabled="!formValid"
            :loading="loadingBtn"
            @click="onSubmit"
          >Crear Propuesta</v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/create-proposal-new.scss'
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
const
  toast = useToast(),

proposalTypes = ref(["Votación"]),
formValid = ref(false),
loadingBtn = ref(false)


async function onSubmit() {
  if (loadingBtn.value) return
  loadingBtn.value = true

  try {
    // <---- await fetch
    toast('¡Tu propuesta ha sido creada\n con éxito!')
  } catch (error) {
    toast.error(error)
  }

  loadingBtn.value = false
}
</script>
