<template>
  <div id="policy-settings" class="mt-4">
    <!-- editable -->
    <template v-if="tabs.some(e => e.editing)">
      <form-card-editable
        :proposal="tabs[tab].name"
        required
        @completed="onCompleted"
        @close="tabs[tab].editing = false"
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

        <label style="text-decoration: underline !important;">Cambios que se proponen:</label>
        <table-rights :items="tabs[0].editing ? proposals : permissions" />
      </form-card-editable>

      <v-divider thickness="1" class="my-10" />
    </template>


    <!-- content -->
    <section id="policy-settings__content">
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
          >{{ item.name }}</v-tab>
        </v-tabs>
      </sticky-drawer>


      <!-- proposal creation -->
      <form-card
        v-if="tab === 0"
        title="Creación de propuestas"
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

        <p class="d-block mb-10">Elija qué derechos de creación le otorga a los grupos DAO. Esto se puede cambiar en la configuración más adelante</p>

        <table-rights :items="proposals" read-only />
      </form-card>


      <!-- vote permissions -->
      <form-card
        v-if="tab === 1"
        title="Permisos de voto"
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

        <p class="d-block mb-10">Elija qué derechos de voto le otorga a los grupos DAO</p>

        <table-rights :items="permissions" read-only />
      </form-card>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/policy-settings.scss'
import FormCard from '@/components/form-card.vue'
import FormCardEditable from '@/components/form-card-editable.vue'
import TableRights from '@/components/table-rights.vue'
import { ref, onBeforeMount, watch } from 'vue';
import { useToast } from 'vue-toastification';
import variables from '@/mixins/variables';
const
  toast = useToast(),
  { globalRules } = variables,

tab = ref(0),
tabs = ref([
  {
    name: "Creación de Propuesta",
    editing: false
  },
  {
    name: "Permisos de Voto",
    editing: false
  }
]),
proposals = ref([]),
permissions = ref([])

watch(tab, clearEditing)

onBeforeMount(getData)

function getData() {
  const rights = [
    {
      name: "Cambiar configuración de DAO",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Cambiar la política de DAO",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Recompensa",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Transferencia",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Encuestas",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Eliminar miembros",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Agregar miembros",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Llamada de función",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Actualizar auto",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Actualizar remoto",
      all: false,
      group: true,
      council: true
    },
    {
      name: "Establecer token de voto",
      all: false,
      group: true,
      council: true
    },
  ]

  proposals.value = rights
  permissions.value = rights
}


function onCompleted({ formValid, bond, tgas }) {
  if (!formValid) return

  console.log('here', bond, tgas)
  switch (tab) {
    // proposal creation
    case 0: {
      console.log('proposal creation');
    } break;

    // vote permissions
    case 1: {
      console.log('vote permissions');
    } break;
  }

  clearEditing()
  toast('¡Tu propuesta ha sido enviada\n con éxito!')
}

function clearEditing() {
  tabs.value.forEach(e => e.editing = false)
}
</script>
