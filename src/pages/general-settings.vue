<template>
  <div id="general-settings" class="mt-4">
    <!-- editable -->
    <form-card-editable
      v-if="tabs[0].editing"
      :proposal="tabs[0].name"
      required
      @completed="onCompleted"
      @close="tabs[0].editing = false"
    >
      <label for="proponent">Proponente</label>
      <v-text-field
        id="proponent"
        variant="solo"
        placeholder="andresdom.near"
        :rules="[globalRules.required]"
      />

      <label for="description">Descripción</label>
      <v-textarea
        id="description"
        variant="solo"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis accumsan urna ac placerat. Ut scelerisque eu ligula ac rhoncus. Aliquam sagittis sapien sit amet libero ultricies varius. Curabitur ac ligula ultricies, semper ipsum nec, auctor sapien. Etiam nec sem ac mauris imperdiet rutrum. Sed mi dui, mattis vel ipsum eget, dictum interdum augue. Donec mollis congue enim quis dignissim. Ut egestas dolor at mauris suscipit dictum. Quisque at sollicitudin dolor. Mauris id auctor dui. Duis velit ante, hendrerit in diam vel, tincidunt rutrum lacus. Morbi pulvinar efficitur efficitur. Quisque faucibus purus nec dolor convallis scelerisque. Mauris vitae viverra quam."
        :rules="[globalRules.required]"
      />

      <label for="link">Link</label>
      <v-text-field
        id="link"
        variant="solo"
        placeholder="Link_de_prueba.com"
        :rules="[globalRules.required]"
      />
    </form-card-editable>


    <form-card-editable
      v-else-if="tabs[3].editing"
      :proposal="tabs[3].name"
      required
      @completed="onCompleted"
      @close="tabs[3].editing = false"
    >
      <label for="proponent">Proponente</label>
      <v-text-field
        id="proponent"
        variant="solo"
        placeholder="andresdom.near"
        :rules="[globalRules.required]"
      />

      <label for="description">Descripción</label>
      <v-textarea
        id="description"
        variant="solo"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis accumsan urna ac placerat. Ut scelerisque eu ligula ac rhoncus. Aliquam sagittis sapien sit amet libero ultricies varius. Curabitur ac ligula ultricies, semper ipsum nec, auctor sapien. Etiam nec sem ac mauris imperdiet rutrum. Sed mi dui, mattis vel ipsum eget, dictum interdum augue. Donec mollis congue enim quis dignissim. Ut egestas dolor at mauris suscipit dictum. Quisque at sollicitudin dolor. Mauris id auctor dui. Duis velit ante, hendrerit in diam vel, tincidunt rutrum lacus. Morbi pulvinar efficitur efficitur. Quisque faucibus purus nec dolor convallis scelerisque. Mauris vitae viverra quam."
        :rules="[globalRules.required]"
      />

      <label for="link">Link</label>
      <v-text-field
        id="link"
        variant="solo"
        placeholder="Link_de_prueba.com"
        :rules="[globalRules.required]"
      />

      <div class="flex-column-center mr-auto" style="gap: 20px; max-width: max-content;">
        <input ref="fileRef" type="file" accept="image/*" class="d-none" @change="handleLoadFile">
        <v-img-load
          :src="daoLogoPreview"
          width="110"
          height="110"
          rounded="100"
          border="3px solid rgb(var(--v-theme-primary))"
          stop-loading
          cover
        />
        <v-btn class="bg-tertiary" @click="fileRef.click()">
          Subir Nuevo Logo
          <v-icon icon="mdi-chevron-right" />
        </v-btn>
      </div>
    </form-card-editable>


    <v-divider v-if="tabs.some(e => e.editing)" thickness="1" class="my-10" />


    <!-- content -->
    <section id="general-settings__content">
      <sticky-drawer>
        <h5>DAO Settings</h5>

        <h6 style="font-size: 15px;">Configuraciones</h6>

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
            :disabled="item.disabled"
            :key="i"
          >{{ item.name }}</v-tab>
        </v-tabs>
      </sticky-drawer>


      <!-- Name and proposal about DAO -->
      <form-card
        v-if="tab === 0"
        title="Nombre y propósito de DAO"
        class="w-100"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[0].editing"
            class="bg-secondary"
            @click="tabs[0].editing = !tabs[0].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>


        <label>Nombre del DAO:</label>
        <p class="mt-1" style="font-size: 16px !important;">DAO de Prueba</p>

        <label>Dirección DAO (auto llenado):</label>
        <p class="mt-1">prueba-de-dao.sputnikv2.testnet</p>
        
        <label>Propósito:</label>
        <p class="mt-1 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis accumsan urna ac placerat. Ut scelerisque eu ligula ac rhoncus. Aliquam sagittis sapien sit amet libero ultricies varius. Curabitur ac ligula ultricies, semper ipsum nec, auctor sapien. Etiam nec sem ac mauris imperdiet rutrum. Sed mi dui, mattis vel ipsum eget, dictum interdum augue. Donec mollis congue enim quis dignissim. Ut egestas dolor at mauris suscipit dictum. Quisque at sollicitudin dolor. Mauris id auctor dui. Duis velit ante, hendrerit in diam vel, tincidunt rutrum lacus. Morbi pulvinar efficitur efficitur. Quisque faucibus purus nec dolor convallis scelerisque. Mauris vitae viverra quam.</p>
      </form-card>


      <!-- Legal state and doc -->
      <form-card
        v-if="tab === 1"
        title="Estado Legal y doc"
        class="w-100"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[1].editing"
            class="bg-secondary"
            @click="tabs[1].editing = !tabs[1].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>
        

        <v-btn variant="text" class="pa-0">
          <span style="color: #333 !important;">Sociedad Anonima</span>

          <sup class="ml-1">
            <v-btn icon color="rgba(111, 91, 165, 1)" size="15" >
              <v-icon icon="mdi-open-in-new" size="10" />
            </v-btn>
          </sup>
        </v-btn>
      </form-card>


      <!-- Links -->
      <form-card
        v-if="tab === 2"
        title="Enlaces"
        class="w-100"
        content-class="flex-column"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[2].editing"
            class="bg-secondary"
            @click="tabs[2].editing = !tabs[2].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>
        

        <v-btn
          v-for="(item, i) in links"
          :key="i"
          variant="text"
          width="max-content"
          height="30"
          class="pa-0"
          :href="item.href"
          target="_blank"
        >
          <v-icon icon="mdi-link" class="text-primary" style="rotate: -45deg;" />
          <span class="text-primary">{{ item.text }}</span>
        </v-btn>
      </form-card>


      <!-- Logo -->
      <form-card
        v-if="tab === 3"
        title="Logo"
        class="w-100"
        content-class="flex-column-center pt-5"
      >
        <template #append-title>
          <v-btn
            v-if="!tabs[3].editing"
            class="bg-secondary"
            @click="tabs[3].editing = !tabs[3].editing"
          >
            Proponer cambio
            <v-icon icon="mdi-chevron-right" />
          </v-btn>
        </template>


        <v-img-load
          :src="daoLogo"
          width="110"
          height="110"
          rounded="100"
          border="3px solid rgb(var(--v-theme-primary))"
          stop-loading
          cover
        />
        <span class="mb-0 mt-4" style="color: #333 !important;">Logo actual del DAO</span>
      </form-card>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/general-settings.scss'
import FormCard from '@/components/form-card.vue'
import FormCardEditable from '@/components/form-card-editable.vue'
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import variables from '@/mixins/variables';
import { getUrlFromFile } from '@/plugins/functions';
const
  toast = useToast(),
  { globalRules } = variables,

tab = ref(0),
tabs = ref([
  {
    name: "Nombre y Propósito",
    editing: false
  },
  {
    name: "Estado Legal y Doc",
    editing: false
  },
  {
    name: "Enlaces",
    editing: false
  },
  {
    name: "Logo",
    editing: false
  },
  {
    name: "Nombres de grupo",
    editing: false,
    disabled: true
  }
]),
links = ref([
  {
    text: "https://pruebaweb.io",
    href: ""
  },
  {
    text: "https://instagram.com",
    href: ""
  },
  {
    text: "https://appmeta.io",
    href: ""
  }
]),
fileRef = ref(),
daoLogoPreview = ref(null),
daoLogo = ref(null)

watch(tab, clearEditing)


function onCompleted({ formValid, bond, tgas }) {
  if (!formValid) return

  console.log('here', bond, tgas)
  switch (tab) {
    // Name and proposal about DAO
    case 0: {
      console.log('Name and proposal about DAO');
    } break;

    // Logo change
    case 3: {
      console.log('Logo change');
    } break;
  }

  clearEditing()
  toast('¡Tu propuesta ha sido enviada\n con éxito!')
}

function handleLoadFile(event) {
  // this is the file provided
  const file = event.target.files[0]
  daoLogoPreview.value = getUrlFromFile(file)
}

function clearEditing() {
  tabs.value.forEach(e => e.editing = false)
}
</script>
