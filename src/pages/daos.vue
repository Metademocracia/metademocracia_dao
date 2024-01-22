<template>
  <div id="daos">
    <toolbar-search />

    <toolbar title="DAOs" content-class="flex-spaceb">
      <v-tabs v-model="tab" slider-color="transparent">
        <v-tab v-for="(item, i) in tabs" :key="i">
          <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="router.push({ name: 'CreateDao' })">
        <v-icon icon="mdi-plus" class="text-white" />
        Crear Dao
      </v-btn>
    </toolbar>

    <v-divider thickness="1.5" color="#fff" class="my-8" style="opacity: .5 !important;" />

    <section id="daos__content">
      <div class="daos">
        <dao-card
          v-for="(item, i) in daos"
          :key="i"
          :dao="item"
          @click="view(item)"
        />
      </div>

      <v-pagination
        v-model="page"
        class="mt-10 mb-16"
        :length="paginatedDaos"
      ></v-pagination>
    </section>
  </div>
</template>

<script setup>
import '@/assets/styles/pages/daos.scss'
import DaoCard from '@/components/dao-card.vue'
import MetademocraciaImage from '@/assets/sources/images/metademocracia-image.png'
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import graphQl from '@/services/graphQl';
import WalletP2p from '../services/wallet-p2p';

const
  router = useRouter(),

tab = ref(0),
tabs = ["Más Activos", "Más Nuevos", "Más Viejos", "N° Miembros", "Con mayores fondos"],
page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 9) / 9)


onBeforeMount(getData)

function view(item) {
  router.push({ path: 'Proposals', query: {dao: item.wallet_dao}  })
}

async function getData() {
  const query = `query dao {
    daos {
      owner_id
      wallet_dao
    }
  }`;

  await graphQl.getQueryDaoV2(query).then(async response => {
    console.log(response)
    const data = response.data.data.daos

    for(let i = 0; i < data.length; i++) {
      const responseConfig = await WalletP2p.view({
        contractId: data[i].wallet_dao,
        methodName: "get_config"
      });

      const responsePolicy = await WalletP2p.view({
        contractId: data[i].wallet_dao,
        methodName: "get_policy"
      });

      const responseSupply = await WalletP2p.view({
        contractId: data[i].wallet_dao,
        methodName: "get_supply"
      });

      let members = 0;
      for(let j=0; j < responsePolicy.roles.length; j++) {
        if(responsePolicy.roles[j].kind?.Group) {
          members += responsePolicy.roles[j].kind?.Group.length;
        }
      }

      const metadata = JSON.parse(atob(responseConfig.metadata))
      console.log(metadata.img)

      daos.value.push({
        wallet_dao: data[i].wallet_dao,
        image: metadata?.img ? metadata.img : MetademocraciaImage,
        name: responseConfig.name,
        account: response[i],
        description: responseConfig.purpose.split(" ").length > 0 ? responseConfig.purpose : atob(responseConfig.purpose),
        funds: 0,
        members: members,
        groups: responsePolicy.roles.length,
        activeProposals: responseSupply ? responseSupply[1] : 0,
        totalProposals: responseSupply ? responseSupply[0] : 0,
      })
    }
  });



}
</script>
