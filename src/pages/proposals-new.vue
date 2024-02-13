<template>
  <div id="proposals">
    <toolbar title="Propuestas">
      <v-tabs v-model="tab" slider-color="transparent">
        <v-tab v-for="(item, i) in tabs" :key="i">
          <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
          {{ item.name }}
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
          v-model="filterProposer"
          placeholder="metademocracia_dao.near"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
        ></v-text-field>

        <!--<h6 class="mt-6 mb-2">Filtrar por categoría</h6>
        <v-text-field
          placeholder="lorem ipsum"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
        ></v-text-field>-->
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
          :length="paginatedDataProposal"
        ></v-pagination>
      </aside>
    </section>
  </div>
</template>

<script>
import axios from'axios';
import '@/assets/styles/pages/proposals-new.scss';
import ProposalCard from '@/components/proposal-card.vue';
import WalletP2p from '../services/wallet-p2p';
import graphQl from '@/services/graphQl';
import moment from 'moment'
import { ref } from 'vue';

export default {
  components: { ProposalCard },
  setup() {
    return {
      tab: ref(0),
      filter: ref('todos'),
      proposals: ref([]),
      tabs: [
        {name:"Todos", value: "todos"},
        {name:"Votos", value: "Vote"},
        /*{name:"Llamada de función", value: "FunctionCall"},*/
        {name:"Transferencia", value: "Transfer"},
        {name:"Miembros", value: "AddMemberToRole"}
      ],
      filters: [
        {
          name: "Todos",
          value: "todos"
        },
        {
          name: "Activas",
          value:"InProgress"
        },
        {
          name: "Aprobados",
          value: "Approved"
        },
        {
          name: "Fallidas",
          value: "Failed"
        }
      ],
      page: ref(1),
      wallet_dao: ref(null),
      typeDao: ref(false),
      paginatedDataProposal: ref(0),
      elementosPorPagina: ref(4),
      totalProposalList: ref(0),
      nextIndex: ref(0),
      type: ref(undefined),
      status: ref(undefined),
      filterProposer: ref(undefined),
      likeProposer: ref(undefined)
    }
  },

  watch: {
    page: function(val) {
      this.nextIndex = (val - 1) * this.elementosPorPagina;
      this.getData()
    },
    tab: function(val) {
      this.nextIndex = 0;
      this.type = this.tabs[val].value == "todos" ? undefined : this.tabs[val].value;
      this.status = this.filter == "todos" ? undefined : this.filter;
      this.getData()
    },
    filter: function(val) {
      this.nextIndex = 0;
      this.type = this.tabs[this.tab].value == "todos" ? undefined : this.tabs[this.tab].value;
      this.status = val == "todos" ? undefined : val;
      this.getData()
    },
    filterProposer: function(val) {
      this.nextIndex = 0;
      this.likeProposer = !val ? undefined : val.trim() == "" ? undefined : val.trim();
      this.getData()
    }
  },

  computed: {
    paginatedProposals() {
      return (this.proposals.length || 3) / 3
    }
  },
  beforeMount() {
    // console.log(window.location.pathname.split('/').at(-1))
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var id = urlParams.get('dao');
    this.wallet_dao = id;

    this.getData()
    //this.getData2()

    const a = "algo.factoryv4.metademocracia.testnet"
    const b = "factoryv4.metademocracia.testnet"
  },


  methods: {
    async getData() {
      const proposalType = !this.type ? '' : ', proposal_type: "' + this.type + '"';
      const statusProposal = !this.status ? '' : ', status: "' + this.status + '"';
      const proposerLike = !this.likeProposer ? '' : ', proposer_contains: "' + this.likeProposer + '"';

      const query = `query MyQuery($contractId: String, $limit: Int, $index: Int) {
        dao(id: $contractId) {
          proposal_total
        }

        proposals(where: {contract_id: $contractId ${proposalType} ${statusProposal} ${proposerLike}},
        orderBy: proposal_id, orderDirection: desc, skip: $index, first: $limit) {
          description
          contract_id
          creation_date
          approval_date
          id
          kind
          link
          proposal_id
          proposer
          status
          title
          upvote
          downvote
        }
      }`;


      const variables = {
        contractId: this.wallet_dao,
        limit: this.elementosPorPagina,
        index:this.nextIndex
      }

      await graphQl.getQueryDaoV2(query, variables).then(async response => {
        const dao = response.data.data.dao
        const proposals = response.data.data.proposals


        //paginacion
        this.totalProposalList = proposals.length <= 0 ? 0 : dao.proposal_total;
        this.paginatedDataProposal = Math.ceil(this.totalProposalList / this.elementosPorPagina);
        this.nextIndex = (this.page) * this.elementosPorPagina;

        this.proposals = proposals.map((item) => {
          let kind;
          try {
            kind = JSON.parse(item.kind);
          } catch (error) {
            kind = item.kind;
          }

          const type = typeof kind === "object" ? Object.keys(kind)[0] : item.kind;
          const objectProposal = typeof kind === "object" ? kind[type] : undefined;
          const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

          const date = moment(item.approval_date/1000000)
          const date_format = ' ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
          const date_final = item.approval_date ? date_format : item.approval_date;

          return{
            id: item.proposal_id,
            contractId: item.contract_id,
            type,
            objectProposal,
            configMetadata,
            title: atob(item.title),
            date: date_final,
            proposer: item.proposer,
            description: atob(item.description),
            approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
            link: item.link,
            amount: null,
            claims: null,
            remainingTime: "una semana",
            likes: item.upvote,
            dislikes: item.downvote,
          }});


        //pintado data
        /*const proposals = []
        for (let i = 0; i < response.data[0].length; i++) {
          const item = response.data[0][i];
          const votes = Object.keys(JSON.parse(item.vote_counts)).map((map) => {return JSON.parse(item.vote_counts)[map]})

          let votesup = 0
          let votesdown = 0
          for(const vote of votes){
            console.log(vote[0])
            votesup += vote[0]
            votesdown += vote[1]
          }

          let kind;
          try {
            kind = JSON.parse(item.kind);
          } catch (error) {
            kind = item.kind;
          }

          const type = typeof kind === "object" ? Object.keys(kind)[0] : item.kind;
          const objectProposal = typeof kind === "object" ? kind[type] : undefined;
          const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

          proposals.push({
            id: item.proposal_id,
            contractId: this.wallet_dao,
            type,
            objectProposal,
            configMetadata,
            title: item.title,
            date: null,
            proposer: item.proposer,
            description: item.description,
            approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
            link: item.link,
            amount: null,
            claims: null,
            remainingTime: "una semana",
            likes: votesup,
            dislikes: votesdown,
          });
        }

        this.proposals = proposals*/
      })
    },

    /* async getData2() {
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
          date: null,
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
    }*/
  }
}
</script>
