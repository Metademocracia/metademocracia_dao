<template>
  <div id="render-layout" class="center divcol" style="gap: 30px;">
    <section style="margin-inline: calc(50% - 50vw) !important; width: 100vw!important;">
      <v-carousel cycle color="#DB107C" :show-arrows="false">
        <v-carousel-item>
          <img src="@/assets/sources/images/banner-3.svg" alt="Banner" class="banner-img">
        </v-carousel-item>

        <v-carousel-item>
          <img src="@/assets/sources/images/banner-2.svg" alt="Banner" class="banner-img">
        </v-carousel-item>

        <v-carousel-item>
          <img src="@/assets/sources/images/banner-1.svg" alt="Banner" class="banner-img">
        </v-carousel-item>
      </v-carousel>
    </section>

    <section class="section2-home">
      <div class="member-container">
        <div class="center mobile-div-member" style="gap: 10px;">
          <img src="@/assets/sources/images/members.svg" alt="Members" style="max-width: 80px;" class="member-img">
          <span style="font-weight: 700!important; line-height: 1.6ch;">
            Nombre de la Dao <br>
            <span style="font-size: 11px; font-weight: 400 !important;">{{ walletDao }}</span>
            <!-- <span style="font-size: 1.5rem;" v-if="result">{{ result?.serie?.supply }}</span> -->
          </span>
        </div>


        <v-text-field
          v-model="amount_near"
          id="amount_near"
          variant="solo"
          flat
          class="container-input-search"
          :rules="required"
          required
        >
          <template #prepend>
            <v-select
              v-model="selectedToken"
              :items="tokens"
              item-title="name"
              item-value="name"
              class="token-selector"
              :menu-props="{ class: 'disable-title' }"
              variant="solo"
              hide-details
            >
              <template #selection="{ item }">
                <div class="token-logo mr-2">
                  <img :src="item.raw.icon" :alt="`${item.raw.name} icon`">
                </div>

                <span>{{ item.raw.name }}</span>
              </template>

              <template #item="{ item, props }">
                <v-list-item v-bind="props">
                  <aside class="d-flex align-center pa-1">
                    <div class="token-logo mr-2">
                      <img :src="item.raw.icon" :alt="`${item.raw.name} icon`">
                    </div>

                    <span>{{ item.raw.name }}</span>
                  </aside>
                </v-list-item>
              </template>
            </v-select>
          </template>

          <template #append-inner>
            <v-btn
              class="btn-donar"
              style="font-weight: 700!important;"
              @click="openDialog()"
            >Donar</v-btn>
          </template>
        </v-text-field>



        <div class="center" style="gap: 10px;">
          <v-icon color="#fff">mdi-instagram</v-icon>
          <v-icon color="#fff">mdi-share-variant</v-icon>
          <!-- <v-btn
            color="rgb(var(--v-theme-tertiary))"
          >
            <img src="@/assets/sources/icons/plus.svg" alt="plus icon" class="mr-1" style="width: 10px;">
            Follow
          </v-btn> -->
        </div>
      </div>

      <div
        v-if="daoActive"
        class="bottom-options"
      >
        <v-tabs v-model="tab" center-active slider-color="transparent">
          <v-tab v-for="(item, i) in dataTabs" :key="i" :class="{ active: canActive && i === tab }" @click="routeRedirect(item.to)" >
            <img :src="item.icon" :alt="`${item.name} icon`" class="mr-2" style="width: 20px;">
            {{ item.name }}
          </v-tab>
        </v-tabs>

        <v-tooltip
          v-if="create_proposal"
          location="top center"
          content-class="tooltip"
        >
          <template #activator="{ props }">
            <v-tab v-bind="props" style="background-color: rgba(50, 92, 151, .8);" min-width="75" @click="createProposal()">
              <img src="@/assets/sources/icons/plus.svg" alt="create proposal" style="width: 20px;">
            </v-tab>
          </template>

          <span>Crear propuesta</span>
        </v-tooltip>
      </div>
    </section>

    <router-view />
  </div>
</template>

<script>
import '@/assets/styles/layouts/render-layout.scss'
import proposalIcon from '@/assets/sources/icons/proposal.svg'
import fundsIcon from '@/assets/sources/icons/funds.svg'
import membersIcon from '@/assets/sources/icons/members.svg'
import settingsIcon from '@/assets/sources/icons/settings.svg'
import nearIcon from '@/assets/sources/logos/near.svg'
import WalletP2p from '../services/wallet-p2p';
import { ref } from 'vue';
// import moment from 'moment';
// import graphQl from '@/services/graphQl';

export default {
  setup(){
    return{
      route: "",
      routes: [
        'Proposals',
        'proposals',
        'proposal-details',
        'create-proposal',
        'members',
        'funds',
        'settings',
        'general-settings',
        'policy-settings',
      ],
      tab: ref(3),
      dialog: ref(false),
      required: [v => !!v || 'Ingrese un monto'],
      toggle: ref(0),
      dataTabs: [
        {
          name: "Propuestas",
          icon: proposalIcon,
          to: "proposals"
        },
        {
          name: "Fondos",
          icon: fundsIcon,
          to: "funds"
        },
        {
          name: "Miembros",
          icon: membersIcon,
          to: "members"
        },
        {
          name: "Configuración",
          icon: settingsIcon,
          to: "settings"
        },
      ],
      tokens: [
        {
          name: "NEAR",
          icon: nearIcon,
        }
      ],
      selectedToken: "NEAR",
      amount_near: ref(null),
      create_proposal: ref(false),
      create_proposal_route: ref(null),
      walletDao: ref(""),
    }
  },
  computed: {
    canActive() {
      return this.$route.name != "Home" && this.$route.name != "CreateProposal"
    },
    
    daoActive() {
      this.route = this.$route.path.replace("/", "");
      const dao = this.$route.query?.dao

      // this.routes.find((route) => route === route)

      if(dao) {
        this.walletDao = dao;
        const result = this.routes.find((routeFind) => routeFind === this.route)

        if(!result) return false

        this.create_proposal_route = dao
        this.create_proposal = true;
        
        return true
      }

      this.walletDao = process.env.CONTRACT_DAO;
      return false
    }
  },

  beforeMount() {
    /* this.route = window.location.pathname.split('/').at(-1);
    
    //console.log("query: ", this.$route.query.dao)
    const dao = this.$route.query?.dao
    
    if(dao) {
      this.create_proposal_route = dao
      this.create_proposal = true;
    } */
  },


  methods: {
    /* isRouteValid() {
      return this.routes.find((route) => route === this.route)
    }, */

    routeRedirect(route){
      if(!this.create_proposal_route) return

      this.$router.push({ path: route, query: {dao: this.create_proposal_route}  })
    },

    createProposal() {
      this.$router.push({ path: 'create-proposal', query: {dao: this.create_proposal_route}  })
    },
    async openDialog() {
      console.log(WalletP2p.getAccount().address)
      if(!WalletP2p.getAccount().address) {
        this.$toast('Debe conectar su wallet primero para poder donar')
        return
      }

      const { valid } = await this.$refs.form.validate()

      if(Number(this.amount_near) && valid) {
        this.dialog = true;
      }
    },

    delegate(){
      const amount = (BigInt(this.amount_near.toString()) * BigInt("1000000000000000000000000")).toString()
      const deposit = (BigInt(amount) + BigInt("1000000000000000000000")).toString()

      const json = {
        contractId: process.env.CONTRACT_DAO,
        methodName: "delegate",
        args: {
          account_id: WalletP2p.getAccount().address,
          amount: amount
        },
        gas: "300000000000000",
        attachedDeposit: deposit
      };

      // 1000000000000000000000
      WalletP2p.call(json);
    },
  }
}
</script>
<style lang="scss">
.v-window__controls {
  margin-top: -50px !important; /* Adjust this value as needed */
}
.dialog-dao{
  .v-card{
    background-image: linear-gradient(45deg, #7b48ad 30%, #5577c1 80%);

    .v-card-title{
      color: #fff;
    }

    .v-card-text{
      color: #fff;
    }
  }
}
</style>
