<template>
  <div id="proposals">
    <toolbar title="Propuestas">
      <v-tabs v-model="filterTypeProposalSelected" slider-color="transparent">
        <v-tab v-for="(item, i) in typeProposal" :key="i" @click="loadProposal()">
          <div class="custom-checkbox mr-2" :class="{ active: filterTypeProposalSelected == i }" />
          {{ item.desc }}
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
            v-for="(item, i) in statusProposal"
            :key="i"
            min-height="30"
            class="clear-overlay pa-0"
            :ripple="false"
            @click="() => {filterStatusSelected = item.id; loadProposal()}"
          >
            <div class="custom-checkbox mr-2" style="--size: 10px" :class="{ active: filterStatusSelected === item.id }" />
            {{ item.desc }}
          </v-list-item>
        </v-list>

        <h6 class="mt-6 mb-2">Filtrar por proponente</h6>
        <v-text-field
          v-model="proposer"
          placeholder="andresdom.near"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
          @keyup="loadProposal()"
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
        <!-- <v-tabs
          v-model="tab"
          align-tabs="end"
          color="deep-purple-accent-4"
        >
          <v-tab :value="1">Por Votar</v-tab>
          <v-tab :value="2">En Votación</v-tab>
          <v-tab :value="3">Aprobadas</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            v-for="n in 3"
            :key="n"
            :value="n"
          >
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="i in 6"
                  :key="i"
                  cols="12"
                  md="4"
                >
                  <v-img
                    :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                    :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                    aspect-ratio="1"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window> -->

            <div class="proposals">
              <proposal-card
                v-for="(item, i) in proposal_list" :key="i"
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
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import moment from 'moment';
import { ref, watch } from 'vue';
import graphQl from '@/services/graphQl';
import utilsDAO from '@/services/utils-dao';

const QUERY = gql`
  query Proposals {
    proposals(orderBy: creation_date, orderDirection: desc) {
      approval_date
      creation_date
      description
      downvote
      id
      kind
      link
      proposer
      proposal_type
      status
      submission_time
      title
      upvote
      user_creation
      vote(where: {user_id: "5d18671d5948cd3348ff4fe4578518ed25a77ee73d18e4ee2b21b335d1585df7"}) {
        user_id
      }
    }
  }
`;

export default {
  components: { ProposalCard },
  setup(){
    const { result, loading,  error } = useQuery(QUERY);
    return{
      result,
      loading,
      error,
      alert: ref(false),
			currentPage: ref(1),
      cardsPerPage: ref(3),
			page: ref(1),
      filterTypeProposalSelected: ref('*'),
			filterStatusSelected: ref('*'),
      session: WalletP2p.getAccount(),
      isMember: ref(utilsDAO.isMember()),
      typeProposal: [
        {id: "*", desc: "Todos"},
        // {id: "FunctionCall", desc: "Llamadas a Funciones"},
        //{id: "Gobernancia", desc: "Gobernancia"},
        {id: "Transfer", desc: "Solicitud de fondos"},
        {id: "Voting", desc: "Votación"},
        // {id: "ChangePolicyUpdateVotePolicy", desc: "Actualizar política de votación"},
        //{id: "ChangePolicyUpdateParameters", desc: "Actualización parámetros de políticas"},
        //{id: "Miembros", desc: "Miembros"},

      ],
      statusProposal: [
        { id: "*", desc: "Todos"},
        { id: "InProgress", desc: "Activas"},
        { id: "Approved", desc: "Aprobadas"},
        { id: "Rejected", desc: "Rechazadas"},
        // { id: "Removed", desc: "Removed"},
        { id: "Expired", desc: "Expiradas"},
        { id: "Failed", desc: "Fallidas"},
      ],
      proposal_list: ref([]),
			cardsProposals: ref([]),
      totalPages: ref(Math.ceil(0 / 0)),
      proposer: ref(null),
      tab: 1,
    }
  },

  mounted() {
    this.loadProposal(this.typeProposal[0]);
  },

	computed: {
    paginatedProposals() {
      return (this.proposal_list.length || 3) / 3
    }
  },

  methods: {
    copy(id) {
      const link = window.location.origin + process.env.VITE_BASE_URL + "proposals-details?id=" + id
      navigator.clipboard.writeText(link);
    },

    async goCreateProposal() {
      const isMember = await this.isMember;
      this.alert = !isMember || false;

      if(isMember) {
        this.$router.push('create-proposal-meta');
      }
    },

    async upvote(id) {
      const isMember = await this.isMember;
      this.alert = !isMember || false;

      if(isMember) {
        const json = {
          contractId: process.env.CONTRACT_DAO,
          methodName: "update_proposal",
          args: {
            id: Number(id),
            action: "VoteApprove"
          },
          gas: "56000000000000",
          // attachedDeposit: "1000000000000000000"
        };

        WalletP2p.call(json);
      }
    },
    async downvote(id) {
      const isMember = await this.isMember;
      this.alert = !isMember || false;

      if(isMember) {
        const json = {
          contractId: process.env.CONTRACT_DAO,
          methodName: "update_proposal",
          args: {
            id: Number(id),
            action: "VoteReject"
          },
          gas: "56000000000000"
          // attachedDeposit: "100000000000000000000"
        };

        WalletP2p.call(json);
      }
    },

    async loadProposal() {
      let status = this.statusProposal.map(item => { return item.id }).splice(1, this.statusProposal.length);
      let type = this.typeProposal.map(item => { return item.id }).splice(1, this.typeProposal.length);

      status = this.filterStatusSelected != '*' ? [this.filterStatusSelected] : status;
      type = this.typeProposal[this.filterTypeProposalSelected].id != '*' ? [this.typeProposal[this.filterTypeProposalSelected].id] : type;

      const query1 = `query Proposals($type: [String], $status: [String]) {
        proposals(where: {proposal_type_in: $type, status_in: $status} orderBy: creation_date, orderDirection: desc) {
          approval_date
          creation_date
          description
          downvote
          id
          kind
          link
          proposer
          proposal_type
          status
          submission_time
          title
          upvote
          user_creation
        }
      }`;

      const query2 = `query Proposals($type: [String], $status: [String], $proposer: String) {
        proposals(where: {proposal_type_in: $type, status_in: $status, proposer_contains_nocase: $proposer} orderBy: creation_date, orderDirection: desc) {
          approval_date
          creation_date
          description
          downvote
          id
          kind
          link
          proposer
          proposal_type
          status
          submission_time
          title
          upvote
          user_creation
        }
      }`;

      const querys = !this.proposer ? query1 : query2;

      const variables = { type: type, status: status, proposer: this.proposer };

      await graphQl.getQuery(querys, variables).then(response => {
        this.loadCardProposal(response.data.data);
      });
    },

    loadCardProposal(response) {
        const cardsProposals = response.proposals.map((item) => {
          let amount = null
          if(item.proposal_type == "Transfer") {
            amount = Number((JSON.parse(item.kind).Transfer.amount / 1000000000000000000000000).toFixed(2));
          }

          const date = moment(item.approval_date/1000000)
          const date_format = 'Aprobado el: ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
          const date_final = item.approval_date ? date_format : item.approval_date;

          //const type = typeof item.kind === "object" ? Object.keys(item.kind)[0] : item.kind;
          //const objectProposal = typeof item.kind === "object" ? item.kind[type] : undefined;
          //const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

          return {
            id: item.id,
            contractId: this.$route.query?.dao,
            type: item.proposal_type,
            objectProposal: undefined,
            configMetadata: undefined,
            title: item.title,
            date: date_final /*item.submission_time*/,
            proposer: item.proposer,
            description: item.description,
            approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
            link: item.link,
            amount: null,
            claims: null,
            remainingTime: "una semana",
            likes: item.upvote,
            dislikes: item.downvote,
          }
        });

        // const startIndex = (this.currentPage - 1) * this.cardsPerPage;
        // const endIndex = startIndex + this.cardsPerPage;

        this.totalPages = Math.ceil(cardsProposals.length / this.cardsPerPage);
        this.proposal_list = cardsProposals;

        this.loadPage();
        // this.cardsProposals = cardsProposals.slice(startIndex, endIndex);

      },

      loadPage() {
        const startIndex = (this.currentPage - 1) * this.cardsPerPage;
        const endIndex = startIndex + this.cardsPerPage;

        this.cardsProposals = this.proposal_list.slice(startIndex, endIndex);
      },

  },
}
</script>
