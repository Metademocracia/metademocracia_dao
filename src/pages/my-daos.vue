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
          :class="{ limited: daos.length <= 2 }"
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
import axios from 'axios';


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
    members(where: {member: $owner_id}) {
      dao {
        owner_id
        wallet_dao
      }
    }
  }`;

  const variables = { owner_id: WalletP2p.getAccount().address };

  await graphQl.getQueryDaoV2(query, variables).then(async response => {
    const data = response.data.data.members

    for(let i = 0; i < data.length; i++) {
      const responseNearAmount = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_available_amount"
      });

      const responseUsdtAmount = await WalletP2p.view({
        contractId: process.env.CONTRACT_USDT,
        methodName: "ft_balance_of",
        args: {account_id: data[i].dao.wallet_dao }
      });

      let total_balance = 0;
      const balanceUsdt = responseUsdtAmount ? responseUsdtAmount != "0" ? Number(responseUsdtAmount) / 1000000 : 0 : 0;//montousdt / 1000000;
      const balanceNear = responseNearAmount ? (Number(responseNearAmount) / 1000000000000000000000000) : 0;

      const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
      total_balance += !balanceNearUsd ? 0 : Number((balanceNear * balanceNearUsd.data[0].value).toFixed(2));

      const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
      total_balance += !balanceUsdtUsd ? 0 : Number((balanceUsdt * balanceUsdtUsd.data[0].value).toFixed(2))


      const responseConfig = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_config"
      });

      const responsePolicy = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_policy"
      });

      const responseSupply = await WalletP2p.view({
        contractId: data[i].dao.wallet_dao,
        methodName: "get_supply"
      });

      let members = 0;
      for(let j=0; j < responsePolicy.roles.length; j++) {
        if(responsePolicy.roles[j].kind?.Group) {
          members += responsePolicy.roles[j].kind?.Group.length;
        }
      }

      const metadata = JSON.parse(atob(responseConfig.metadata))

      daos.value.push({
        wallet_dao: data[i].dao.wallet_dao,
        image: metadata?.img ? metadata.img : MetademocraciaImage,
        name: responseConfig.name,
        account: data[i].dao.wallet_dao,
        description: atob(responseConfig.purpose), // responseConfig.purpose.split(" ").length > 0 ? responseConfig.purpose : atob(responseConfig.purpose),
        funds: total_balance,
        members: members,
        groups: responsePolicy.roles.length,
        activeProposals: responseSupply ? responseSupply[1] : 0,
        totalProposals: responseSupply ? responseSupply[0] : 0,
      })
    }
  });

}
</script>
