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
          v-model="proponen"
          id="proponent"
          variant="solo"
          read-only
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
        <table-rights :headers="headerRights" :items="tabs[0].editing ? proposals : permissions" />
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

        <table-rights :headers="headerRights" :items="proposalsView" read-only />
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

        <table-rights :headers="headerRights" :items="permissionsView" read-only />
      </form-card>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/policy-settings.scss'
import FormCard from '@/components/form-card.vue'
import FormCardEditable from '@/components/form-card-editable.vue'
import TableRights from '@/components/table-rights.vue'
import { ref, onBeforeMount, watch,  } from 'vue';
import { useToast } from 'vue-toastification';
import variables from '@/mixins/variables';
import { useRouter, useRoute } from 'vue-router';
import WalletP2p from '../services/wallet-p2p';

const
  toast = useToast(),
  { globalRules } = variables,
  router = useRouter(),
  route = useRoute(),

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
proponen = WalletP2p.getAccount().address,
proposalsView = ref([]),
permissionsView = ref([]),
proposals = ref([]),
permissions = ref([]),
rights = ref([
  { name: "Cambiar configuración de DAO", key: "ChangeConfig"},
  { name: "Cambiar la política de DAO", key: "ChangePolicy"},
  // { name: "Recompensa", key: ""},
  { name: "Transferencia", key: "Transfer"},
  { name: "Encuestas", key: "Vote"},
  { name: "Eliminar miembros", key: "RemoveMemberFromRole"},
  { name: "Agregar miembros", key: "AddMemberToRole"},
  { name: "Llamada de función", key: "FunctionCall"},
  /* { name: "Actualizar auto", key: ""},
  { name: "Actualizar remoto", key: ""},
  { name: "Establecer token de voto", key: ""}, */
]),
headerRights = ref([])


watch(tab, clearEditing)

onBeforeMount(getData)

async function getData() {
  const responsePolicy = await WalletP2p.view({
    contractId: route.query?.dao,
    methodName: "get_policy"
  });

  const groups = responsePolicy.roles.map((items) => {return items.name});

  console.log("ajajaja: ", groups, responsePolicy)

  const header = [{ key: 'name', sortable: false },];
  for(let i=0; i<groups.length; i++){
    header.push({ key: groups[i], title: groups[i], align: 'center', sortable: false });
  }

  headerRights.value = header;

  const rights1 = [];
  const rights2 = [];
  const rights3 = [];
  const rights4 = [];

  /*
  {
    "name": "all",
    "kind": "Everyone",
    "permissions": [
        "RemoveMemberFromRole:AddProposal",
        "ChangeConfig:AddProposal",
        "ChangePolicy:AddProposal",
        "AddMemberToRole:AddProposal",
        "Transfer:AddProposal",
        "Vote:AddProposal",
        "FunctionCall:AddProposal"
    ],
    "vote_policy": {}
} 

  {
    "name": "pruebas",
    "kind": {
        "Group": [
            "metademocracia.testnet"
        ]
    },
    "permissions": [
        "ChangePolicy:AddProposal",
        "RemoveMemberFromRole:VoteApprove",
        "RemoveMemberFromRole:VoteReject",
        "Transfer:*",
        "RemoveMemberFromRole:VoteRemove"
    ],
    "vote_policy": {}
}
  */

  for(const items of rights.value){
    
    const permissionsGroupA = responsePolicy.roles.map((elm) => {
      const value = elm.permissions.includes(elm.permissions.find((search) => search.split(':')[0] == items.key || search.split(':')[0] == '*'))
      return {name: elm.name, value: value}
    });

    const permissionsGroupB = responsePolicy.roles.map((elm) => {
      const value = elm.permissions.includes(elm.permissions.find((search) => 
        (search.split(':')[0] == items.key && (search.split(':')[1] == 'VoteApprove' || search.split(':')[1] == 'VoteReject' || search.split(':')[1] == 'VoteRemove')) 
        || (search.split(':')[0] == items.key && search.split(':')[1] == '*')
      ))
      return {name: elm.name, value: value}
    });

    rights1.push({
      name: items.name,
      key: items.key,
      group: permissionsGroupA,
    });
    rights2.push({
      name: items.name,
      key: items.key,
      group: permissionsGroupB,
    });
    rights3.push({
      name: items.name,
      key: items.key,
      group: permissionsGroupA,
    });
    rights4.push({
      name: items.name,
      key: items.key,
      group: permissionsGroupB,
    });
  }

  proposalsView.value = rights1;
  permissionsView.value = rights2;
  proposals.value = rights3;
  permissions.value = rights4;
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

function addProposal(bounty_bond, title, description, link) {
  const json = {
    contractId: walletDao.value,
    methodName: "add_proposal",
    args: {
      proposal: {
        title: title,
        description: description,
        kind: {
          ChangePolicy: {policy: dataConfig._rawValue}
        },
        link: link,
      }
    },
    gas: "200000000000000",
    attachedDeposit: bounty_bond.toString()
  };

  console.log("json", json);

  WalletP2p.call(json, "proposals", ("?dao="+walletDao.value));

  // clearEditing();
}


function clearEditing() {
  tabs.value.forEach(e => e.editing = false)
}
</script>
