<template>
  <div id="home">
    <aside class="toolbar-search">
    <div class="toolbar-search__wrapper">
      <v-text-field
        v-model="likeWalletDao"
        placeholder="Buscar"
        variant="solo"
        hide-details
      >
        <template #prepend-inner>
          <v-icon icon="mdi-magnify" size="23" class="text-primary" />

          <v-divider vertical thickness="1" color="#000" class="mx-2 my-auto" style="opacity: 1; height: 70%;" />
        </template>

        <template #append-inner>
          <v-btn
            height="38"
            class="bg-secondary px-7"
            @click="getData()"
          >Buscar</v-btn>
        </template>
      </v-text-field>
    </div>
  </aside>


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

    <div style="color: white !important;" v-if="loading"><center>Cargando daos...</center><br/><v-progress-linear  indeterminate class="full-width" fluid></v-progress-linear></div>

    <v-divider v-if="!loading" thickness="1.5" color="#fff" class="my-8" style="opacity: .5 !important;" />
    <section id="daos__content">
      <div class="daos" >
        <dao-card
          v-for="(item, i) in daos"
          :key="i"
          :dao="item"
          :class="{ limited: daos.length <= 2 }"
          @pressed="view(item)"
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
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import graphQl from '@/services/graphQl';
import WalletP2p from '../services/wallet-p2p';
import axios from 'axios';

const
  router = useRouter(),

tab = ref(0),
tabs = [/*"Más Activos",*/ "Más Nuevos", "Más Viejos", "N° Miembros"],
page = ref(1),
daos = ref([]),
paginatedDaos = computed(() => (daos.value.length || 9) / 9),
likeWalletDao = ref(undefined),
listDaos = ref([])
const loading = ref(true);

watch(tab, async (newVal, oldVal) => {
  getData()
})

onBeforeMount(getData)

function view(item) {
  if(process.env.CONTRACT_DAO == item.wallet_dao) {
    router.push({ path: 'proposals-meta', query: {dao: item.wallet_dao}})
  } else {
    router.push({ path: 'Proposals', query: {dao: item.wallet_dao}  })
  }
}

async function getData() {
  listDaos.value = [];
  if(likeWalletDao.value) {
    likeWalletDao.value = likeWalletDao.value.trim() == "" ? undefined : likeWalletDao.value;
  }

  // "Más Nuevos", "Más Viejos", "N° Miembros"
  let orderDirection;
  let orderBy;
  switch (tabs[tab.value]) {
    case "Más Nuevos":
      orderDirection = 'desc'
      orderBy = 'creation_date'
      break;

    case "Más Viejos":
      orderDirection = 'asc'
      orderBy = 'creation_date'
      break;

    case "N° Miembros":
      orderDirection = 'desc'
      orderBy = 'total_members'
      break;

    default:
      orderDirection = 'desc'
      orderBy = 'creation_date'
      break;
  }

  const _likeWalletDao = !likeWalletDao.value ? '' : 'where: {wallet_dao_contains: "' + likeWalletDao.value + '"},';

  const query = `query dao {
    daos(${_likeWalletDao} orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
      owner_id
      wallet_dao
      total_members
      creation_date
      proposal_total
      proposal_actives
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

  /// dao metademocracia
  // if("Metademocracia".toUpperCase().includes(!_likeWalletDao ? "Metademocracia".toUpperCase() : _likeWalletDao.toUpperCase())) {
    await graphQl.getQuery(queryMeta).then(async response => {
      let total_balance = 0;
      const delegation_near = response.data.data?.delegations ? response.data.data?.delegations?.find(item => item.id == "NEAR")?.total_amount / 1000000000000000000000000 : 0;
      const delegation_usdt = response.data.data?.delegations ? response.data.data?.delegations?.find(item => item.id == "USDT")?.total_amount / 1000000 : 0;

      const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
      total_balance += !balanceNearUsd ? 0 : Number((delegation_near * balanceNearUsd.data[0].value).toFixed(2));

      const balanceUsdtUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"});
      total_balance += !balanceUsdtUsd ? 0 : Number((delegation_usdt * balanceUsdtUsd.data[0].value).toFixed(2));

      listDaos.value.push({
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
  //}


  //// daos factory
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

      let total_balance = 0;
      const balanceUsdt = responseUsdtAmount ? responseUsdtAmount != "0" ? Number(responseUsdtAmount) / 1000000 : 0 : 0;//montousdt / 1000000;
      const balanceNear = responseNearAmount ? (Number(responseNearAmount) / 1000000000000000000000000) : 0;

      const balanceNearUsd = await axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"});
      total_balance += !balanceNearUsd ? 0 : Number((balanceNear * balanceNearUsd.data[0].value).toFixed(2));

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

      /*const responseSupply = await WalletP2p.view({
        contractId: data[i].wallet_dao,
        methodName: "get_supply"
      });*/

      /* let members = 0;
      for(let j=0; j < responsePolicy.roles.length; j++) {
        if(responsePolicy.roles[j].kind?.Group) {
          members += responsePolicy.roles[j].kind?.Group.length;
        }
      } */

      const metadata = JSON.parse(atob(responseConfig.metadata))

      listDaos.value.push({
        wallet_dao: data[i].wallet_dao,
        image: metadata?.img ? metadata.img : MetademocraciaImage,
        name: responseConfig.name,
        account: data[i].wallet_dao,
        description: atob(responseConfig.purpose),
        funds: total_balance.toFixed(2),
        members: data[i].total_members, // members,
        groups: responsePolicy.roles.length,
        activeProposals: data[i].proposal_actives, // responseSupply ? responseSupply[1] : 0,
        totalProposals: data[i].proposal_total, // responseSupply ? responseSupply[0] : 0,
      })
    }


  });
  daos.value = listDaos.value
  if(daos.value.length > 0) {
    loading.value = false;
  }

}
</script>
<style lang="scss">
@import '@/assets/styles/main.scss';

.full-width {
      width: 550px !important;
      align-content: center;
 }

.toolbar-search {
  // position: sticky;
  // top: 20px;

  position: relative;
  isolation: isolate;
  background: $primary !important;
  width: 100vw !important;
  min-height: 120px;
  display: flex;
  align-items: center;
  margin-inline: calc(50% - 50vw) !important;
  z-index: 2;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgb(#62C3D7, .58);
    translate: 20px 0px;
    scale: 1 2;
    filter: blur(50px);
    z-index: -1;
  }


  &__wrapper {
    max-width: calc(880px + var(--margin-global));
    width: 100%;
    margin-inline: auto;
    padding-inline: var(--margin-global);
    padding-block: 10px;
    display: flex;
    align-items: center;
  }

  .v-input {
    .v-field {
      padding-right: 0;
      border-radius: 30px;

      &__field {
        height: 38px;
      }

      input {
        min-height: 100% !important;
        height: 100% !important;
        font-size: 14px;
      }
    }

    i { color: $primary }
  }
}
</style>
