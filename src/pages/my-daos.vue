<template>
  <div id="my-daos">
    <toolbar-search />

    <toolbar title="Mis DAOs" content-class="flex-spaceb">
      <v-btn class="bg-tertiary px-2 ml-auto" style="font-size: 12px;" @click="router.push({ name: 'CreateDao' })">
        <v-icon icon="mdi-plus" class="text-white" />
        Crear Dao
      </v-btn>
    </toolbar>

    <section id="my-daos__content" class="mt-10">
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

page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 3) / 3)


onBeforeMount(getData)

function view(item) {
  router.push({ path: 'Proposals', query: {dao: item.wallet_dao}  })
}

async function getData() {

  const query = `query dao($owner_id: String) {
    daos(where: { owner_id: $owner_id }) {
      owner_id
      wallet_dao
    }
  }`;

  const variables = { owner_id: WalletP2p.getAccount().address };

  await graphQl.getQueryDaoV2(query, variables).then(async response => {
    console.log(response.data.data.daos);
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

      daos.value.push({
        wallet_dao: data[i].wallet_dao,
        image: MetademocraciaImage,
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
