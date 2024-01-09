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
            <label for="name">Nombre del DAO:</label>
            <v-text-field
              id="name"
              placeholder="Nombre del DAO"
              variant="solo"
              class="mb-1"
              :rules="[globalRules.required]"
            />

            <label for="address">Dirección DAO (auto llenado):</label>
            <v-autocomplete
              id="address"
              placeholder="prueba-de-dao.sputnikv2.testnet"
              variant="solo"
              class="mb-1"
              :items="['prueba-de-dao.sputnikv2.testnet']"
              :rules="[globalRules.required]"
            />

            <label for="proposal-dao">Propósito</label>
            <v-textarea
              id="proposal-dao"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis accumsan urna ac placerat. Ut scelerisque eu ligula ac rhoncus. Aliquam sagittis sapien sit amet libero ultricies varius. Curabitur ac ligula ultricies, semper ipsum nec, auctor sapien. Etiam nec sem ac mauris imperdiet rutrum. Sed mi dui, mattis vel ipsum eget, dictum interdum augue. Donec mollis congue enim quis dignissim. Ut egestas dolor at mauris suscipit dictum. Quisque at sollicitudin"
              variant="solo"
              class="mb-1"
              :rules="[globalRules.required]"
            />
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
            <label for="legacy-state">Explique el estado legal y la jurisdicción de su DAO ( si se conoce) :</label>
            <v-text-field
              id="legacy-state"
              placeholder="Estado legal del DAO"
              variant="solo"
              class="mb-1"
            />

            <label for="proposal-kyc">Propósito</label>
            <v-text-field
              id="proposal-kyc"
              placeholder="https:// Documento_Legal"
              variant="solo"
              class="mb-1"
            />
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
            <p class="mb-8">¿Buscas hacer crecer a los miembros de DAO? Agregue enlaces para permitir que las personas aprendan más sobre su DAO. :</p>

            <v-text-field
              v-for="(item, i) in daoLinks"
              v-model="item.model"
              :key="i"
              placeholder="https://"
              class="appened"
              variant="solo"
            >
              <template #append-inner>
                <v-btn
                  min-width="70"
                  height="42"
                  :color="i == daoLinks.length - 1 ? '#61C2D5' : '#505050'"
                  style="border-radius: 8px !important;"
                  @click="() => {
                    if (i == daoLinks.length - 1) return daoLinks.push({ model: undefined })
                    daoLinks.splice(i, 1)
                  }"
                >
                  <v-icon :icon="i == daoLinks.length - 1 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                </v-btn>
              </template>
            </v-text-field>
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
            <label for="default-groups" style="color: #333 !important;">Grupos predeterminados</label>
            <span class="d-block mb-3" style="color: #939393 !important;">No puedes eliminarlos</span>
            <v-text-field
              id="default-groups"
              placeholder="council"
              variant="solo"
              class="mb-1"
            />

            <p class="d-block mb-3">Grupos personalizados</p>
            <v-text-field
              v-for="(item, i) in customGroups"
              v-model="item.model"
              :key="i"
              placeholder="Nombre del grupo"
              class="appened"
              variant="solo"
            >
              <template #append-inner>
                <v-btn
                  min-width="70"
                  height="42"
                  :color="i == customGroups.length - 1 ? '#61C2D5' : '#505050'"
                  style="border-radius: 8px !important;"
                  @click="() => {
                    if (i == customGroups.length - 1) return customGroups.push({ model: undefined })
                    customGroups.splice(i, 1)
                  }"
                >
                  <v-icon :icon="i == customGroups.length - 1 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
                </v-btn>
              </template>
            </v-text-field>
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
            <p class="d-block mb-3">Agregue miembros a su DAO.</p>

            <div v-for="(item, i) in daoMembers" :key="i" class="d-flex" style="gap: 20px;">
              <v-text-field
                v-model="item.member"
                placeholder="ap6ay7auhan6a78ahah8gfcvbay77a9a0han5"
                variant="solo"
              />

              <v-autocomplete
                v-model="item.type"
                placeholder="Council"
                :items="['Council']"
                variant="solo"
              />

              <v-btn
                min-width="70"
                height="42"
                :color="i == daoMembers.length - 1 ? '#61C2D5' : '#505050'"
                style="border-radius: 8px !important;"
                @click="() => {
                  if (i == daoMembers.length - 1) return daoMembers.push({ model: undefined })
                  daoMembers.splice(i, 1)
                }"
              >
                <v-icon :icon="i == daoMembers.length - 1 ? 'mdi-plus' : 'mdi-minus'" size="25" class="text-white" />
              </v-btn>
            </div>
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
            <p class="d-block mb-10">Elija qué derechos de creación le otorga a los grupos DAO. Esto se puede cambiar en la configuración más adelante</p>

            <table-rights :items="proposals" />
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
            <p class="d-block mb-10">Elija qué derechos de voto le otorga a los grupos DAO</p>

            <table-rights :items="permissions" />
          </form-card>
        </v-window-item>


        <!-- STEP 8 -->
        <v-window-item :value="7">
          <form-card
            :window-step="windowStep"
            :steps="steps"
            title="Crear activos DAO"
            next-text="Crear DAO"
            @prev="windowStep--"
            @next="createDao"
          >
            <p class="d-block mb-6">Coloca el logo de tu DAO es opcional. Si omite, se utilizará la imagen predeterminada</p>

            <div class="flex-column-center mx-auto" style="gap: 20px;">
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
                Subir Logo
                <v-icon icon="mdi-chevron-right" />
              </v-btn>
            </div>

            <v-divider thickness="1" class="mt-10 mb-5" color="#939393" style="opacity: 1;" />

            <aside class="flex-space-center flex-wrap" style="gap: 20px; --value-fs: 17px">
              <div class="flex-column" style="gap: 5px;">
                <label>Transacción</label>
                <span style="font-size: var(--value-fs) !important;">Crear Nuevo DAO</span>
              </div>

              <div class="flex-center text-end ml-auto" style="gap: 20px;">
                <div class="flex-column" style="gap: 5px;">
                  <label>Costo</label>
                  <span style="font-size: var(--value-fs) !important;">6 NEAR</span>
                </div>
                
                <div class="flex-column" style="gap: 5px;">
                  <label>TGas</label>
                  <span style="font-size: var(--value-fs) !important;">300</span>
                </div>
              </div>
            </aside>
          </form-card>
        </v-window-item>
      </v-window>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/create-dao.scss'
import FormCard from '@/components/form-card.vue'
import TableRights from '@/components/table-rights.vue'
import variables from '@/mixins/variables';
import { getUrlFromFile } from '@/plugins/functions';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
const
  toast = useToast(),
  { globalRules } = variables,

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
],
daoLinks = ref([ { model: undefined } ]),
customGroups = ref([ { model: undefined } ]),
daoMembers = ref([ { member: undefined, type: undefined } ]),
proposals = ref([]),
permissions = ref([]),
fileRef = ref(),
daoLogoPreview = ref(null)


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

function handleLoadFile(event) {
  // this is the file provided
  const file = event.target.files[0]
  daoLogoPreview.value = getUrlFromFile(file)
}

function createDao(formValid) {
  if (!formValid) return

  console.log('create dao function here');
  toast('¡Felicidades la DAO ha sido creada\n con éxito!')
}
</script>
