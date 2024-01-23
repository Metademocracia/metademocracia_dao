<template>
  <div id="proposals">
    <toolbar title="Propuestas">
      <v-tabs v-model="tab" slider-color="transparent">
        <v-tab v-for="(item, i) in tabs" :key="i">
          <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
          {{ item }}
        </v-tab>
      </v-tabs>
    </toolbar>

    <v-divider thickness="1.5" color="#fff" class="my-4" style="opacity: .5 !important;" />

    <section id="proposals__content">
      <!-- controls -->
      <sticky-drawer>
        <h6 class="mb-3">Elige un filtro</h6>

        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in filters"
            :key="i"
            min-height="30"
            class="clear-overlay pa-0"
            :ripple="false"
            @click="filter = item.value"
          >
            <div class="custom-checkbox mr-2" style="--size: 10px" :class="{ active: filter === item.value }" />
            {{ item.name }}
          </v-list-item>
        </v-list>

        <h6 class="mt-6 mb-2">Filtrar por proponente</h6>
        <v-text-field
          placeholder="andresdom.near"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
        ></v-text-field>

        <h6 class="mt-6 mb-2">Filtrar por categoría</h6>
        <v-text-field
          placeholder="lorem ipsum"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
        ></v-text-field>
      </sticky-drawer>

      <!-- proposals -->
      <aside class="flex-grow-1">
        <div class="proposals">
          <proposal-card
            v-for="(item, i) in proposals" :key="i"
            :proposal="item"
          />
        </div>

        <v-pagination
          v-model="page"
          class="mt-10 mb-16"
          :length="paginatedProposals"
        ></v-pagination>
      </aside>
    </section>
  </div>
</template>

<script>
import '@/assets/styles/pages/proposals-new.scss'
import ProposalCard from '@/components/proposal-card.vue'
import WalletP2p from '../services/wallet-p2p';
import { ref } from 'vue'

export default {
  components: { ProposalCard },
  setup() {
    return {
      tab: ref(0),
      tabs: ["Todos", "Llamada de función", "Transferencia", "Miembros"],
      filter: ref('all'),
      filters: [
        {
          name: "Todos",
          value: "all"
        },
        {
          name: "Activas",
          value:"active"
        },
        {
          name: "Aprobados",
          value: "approved"
        },
        {
          name: "Fallidas",
          value: "failed"
        }
      ],
      proposals: ref([]),
      page: ref(1),
      wallet_dao: ref(null),
      typeDao: ref(false)
    }
  },
  computed: {
    paginatedProposals() {
      return (this.proposals.length || 3) / 3
    }
  },
  beforeMount() {
    console.log(window.location.pathname.split('/').at(-1))
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var id = urlParams.get('dao');
    this.wallet_dao = id;
    this.getTypeDao()
    this.getData()
  },


  methods: {
    getTypeDao() {
      if (process.env.CONTRACT_DAO === this.$route.query.dao) this.typeDao = true
    },
    async getData() {
      const response = await WalletP2p.view({
        contractId: this.wallet_dao,
        methodName: "get_proposals",
        args: {
          from_index: 0,
          limit: 15
        }
      });

      response.reverse()

      for (let i = 0; i < response.length; i++) {
        const item = response[i];

        const votes = Object.keys(item.vote_counts).map((map) => {return item.vote_counts[map]})
        console.log(votes)

        let votesup = 0
        let votesdown = 0
        for(const vote of votes){
          console.log(vote[0])
          votesup += vote[0]
          votesdown += vote[1]
        }

        const type = typeof item.kind === "object" ? Object.keys(item.kind)[0] : item.kind;
        const objectProposal = typeof item.kind === "object" ? item.kind[type] : undefined;
        const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

        this.proposals.push({
          id: item.id,
          contractId: this.wallet_dao,
          type,
          objectProposal,
          configMetadata,
          title: atob(item.title),
          date: null/*item.submission_time*/,
          proposer: item.proposer,
          description: atob(item.description),
          approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
          link: item.link,
          amount: null,
          claims: null,
          remainingTime: "una semana",
          likes: votesup,
          dislikes: votesdown,
        });
      }
    }
  }
}
</script>
