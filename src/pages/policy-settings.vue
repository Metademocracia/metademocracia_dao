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
          placeholder="Motivo del cambio"
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
  { globalRules, proposalKind } = variables,
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
proponen = ref(null), //WalletP2p.get Account().address,
proposalsView = ref([]),
permissionsView = ref([]),
proposals = ref([]),
permissions = ref([]),
rights = ref([
  { name: "Cambiar configuración de DAO", key: proposalKind.find((item) => item.key == "ChangeConfig")?.value},
  { name: "Cambiar la política de DAO", key: proposalKind.find((item) => item.key == "ChangePolicy")?.value},
  // { name: "Recompensa", key: ""},
  { name: "Transferencia", key: proposalKind.find((item) => item.key == "Transfer")?.value},
  // { name: "Encuestas", key: "Vote"},
  { name: "Votación", key: proposalKind.find((item) => item.key == "Vote")?.value},
  { name: "Eliminar miembros", key: proposalKind.find((item) => item.key == "RemoveMemberFromRole")?.value},
  { name: "Agregar miembros", key: proposalKind.find((item) => item.key == "AddMemberToRole")?.value},
  { name: "Llamada de función", key: proposalKind.find((item) => item.key == "FunctionCall")?.value},
]),
headerRights = ref([]),
groupsList = ref([]),
policy = ref([])

watch(tab, clearEditing)

onBeforeMount(getData)

async function getData() {
  const accounIdresult = await WalletP2p.getAccountId();
  proponen.value = accounIdresult;

  if(!accounIdresult) return

  const responsePolicy = await WalletP2p.view({
    contractId: route.query?.dao,
    methodName: "get_policy"
  });

  if(!responsePolicy) return

  const groups = responsePolicy.roles.map((items) => {return items.name});
  groupsList.value = groups;

  policy.value = responsePolicy;

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
        || (search.split(':')[0] == items.key && search.split(':')[1] == '*' || search == '*:*')
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

function setRoles(){
  for(let i in policy.value.roles){
    let rol = [];

    let countPermision = 0;
    for(let index=0; index < proposals.value.length; index++) {
      const proposalKey = proposals.value[index].key;
      const proposal = proposals.value[index].group.filter((search) => search.name == policy.value.roles[i].name )
      const action = permissions.value[index].group.filter((search) => search.name == policy.value.roles[i].name)


      if(proposal.length <= 0 || action.length <= 0) continue

      if(proposal[0].value && action[0].value) {
        rol.push(proposalKey+":*")
        countPermision +=1;
      } else if(!proposal[0].value && action[0].value) {
        rol.push(proposalKey+":VoteApprove")
        rol.push(proposalKey+":VoteReject")
        rol.push(proposalKey+":VoteRemove")
      } else if(proposal[0].value && !action[0].value) {
        rol.push(proposalKey+":AddProposal")
      }
    }

    if(rol.length == countPermision && rol.length > 0) {
      rol = ["*:*"]
    }

    policy.value.roles[i].permissions = rol

    //console.log("members: ", daoMembers.value.filter((search) => search.type == group).map((data) => {return data.member}))
  }
}

async function onCompleted({ formValid }) {
  console.log("paso 1")
  if (!formValid) return
  console.log("paso 2")

  setRoles();
  const responsePolicy = await WalletP2p.view({
    contractId: route.query?.dao,
    methodName: "get_policy"
  });

  const response = await WalletP2p.view({
    contractId: route.query?.dao,
    methodName: "get_fee_metadao",
  });

  const bounty_bond = (BigInt(responsePolicy?.bounty_bond.toString()) + BigInt(response)).toString()
  switch (tab.value) {
    // proposal creation
    case 0: {
      const title = btoa("Cambio permisos creación de propuesta");
      addProposal(bounty_bond, title)
      console.log('proposal creation');
    } break;

    // vote permissions
    case 1: {
      const title = btoa("Cambio permisos de Voto");
      addProposal(bounty_bond, title)
      console.log('vote permissions');
    } break;
  }

  clearEditing()
  //toast('¡Tu propuesta ha sido enviada\n con éxito!')
}

function addProposal(bounty_bond, title) {
  const json = {
    contractId: route.query?.dao,
    methodName: "add_proposal",
    args: {
      proposal: {
        title: title,
        description: btoa(document.getElementById("description").value),
        kind: {
          ChangePolicy: {policy: policy._rawValue}
        },
        link: document.getElementById("link").value,
      }
    },
    gas: "200000000000000",
    attachedDeposit: bounty_bond
  };

  console.log("json", json);

  WalletP2p.call(json, "proposals", ("?dao="+route.query?.dao));

  // clearEditing();
}


function clearEditing() {
  tabs.value.forEach(e => e.editing = false)
}
</script>
