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
import axios from 'axios';

const
  router = useRouter(),

tab = ref(0),
tabs = ["Más Activos", "Más Nuevos", "Más Viejos", "N° Miembros", "Con mayores fondos"],
page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 9) / 9)


onBeforeMount(getData)

function view(item) {
  console.log(item)
  if(process.env.CONTRACT_DAO == item.wallet_dao) {
    router.push({ path: 'proposals-meta'})
  } else {
    router.push({ path: 'Proposals', query: {dao: item.wallet_dao}  })
  }
}

async function getData() {
  const query = `query dao {
    daos {
      owner_id
      wallet_dao
    }
  }`;

  const queryMeta = `query dao {
    proposaldata(id: "1") {
      proposal_actives
      proposal_total
    }

    delegations {
      total_amount
      id
    }

    serie(id: "1") {
      supply
    }
  }`;

  await graphQl.getQuery(queryMeta).then(async response => {
    let total_balance = 0;
    const delegation_near = response.data.data?.delegations ? response.data.data?.delegations?.find(item => item.id == "NEAR")?.total_amount / 1000000000000000000000000 : 0;
    const delegation_usdt = response.data.data?.delegations ? response.data.data?.delegations?.find(item => item.id == "USDT")?.total_amount / 1000000 : 0;

    console.log(delegation_near, delegation_usdt)

    const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
    total_balance += !balanceNearUsd ? 0 : Number((delegation_near * balanceNearUsd.data[0].value).toFixed(2));

    const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
    total_balance += !balanceUsdtUsd ? 0 : Number((delegation_usdt * balanceUsdtUsd.data[0].value).toFixed(2));


    daos.value.push({
      wallet_dao: process.env.CONTRACT_DAO,
      image: MetademocraciaImage,
      name: "Metademocracia",
      account: process.env.CONTRACT_DAO,
      description: "Metademocracia",
      funds: total_balance.toFixed(2),
      members: response.data.data?.proposaldata ? response.data.data?.serie?.supply : 0,
      groups: 1,
      activeProposals: response.data.data?.proposaldata ? response.data.data?.proposaldata?.proposal_actives : 0,
      totalProposals: response.data.data?.proposaldata ? response.data.data?.proposaldata?.proposal_total : 0,
    })
  })

  await graphQl.getQueryDaoV2(query).then(async response => {
    const data = response.data.data.daos

    for(let i = 0; i < data.length; i++) {
      const responseNearAmount = await WalletP2p.view({
        contractId: data[i].wallet_dao,
        methodName: "get_available_amount"
      });

      const responseUsdtAmount = await WalletP2p.view({
        contractId: process.env.CONTRACT_USDT,
        methodName: "ft_balance_of",
        args: {account_id: data[i].wallet_dao }
      });

      console.log("aqui: ",responseUsdtAmount)

      let total_balance = 0;
      const balanceUsdt = responseUsdtAmount ? responseUsdtAmount != "0" ? Number(responseUsdtAmount) / 1000000 : 0 : 0;//montousdt / 1000000;
      const balanceNear = responseNearAmount ? (Number(responseNearAmount) / 1000000000000000000000000) : 0;

      const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
      total_balance += !balanceNearUsd ? 0 : Number((balanceNear * balanceNearUsd.data[0].value).toFixed(2));

      console.log("balance", balanceNearUsd, total_balance)

      const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
      total_balance += !balanceUsdtUsd ? 0 : Number((balanceUsdt * balanceUsdtUsd.data[0].value).toFixed(2))

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

      daos.value.push({
        wallet_dao: data[i].wallet_dao,
        image: metadata?.img ? metadata.img : MetademocraciaImage,
        name: responseConfig.name,
        account: response[i],
        description: atob(responseConfig.purpose),
        funds: total_balance.toFixed(2),
        members: members,
        groups: responsePolicy.roles.length,
        activeProposals: responseSupply ? responseSupply[1] : 0,
        totalProposals: responseSupply ? responseSupply[0] : 0,
      })
    }
  });



}
</script>
