<template>
  <div id="proposals">
    <toolbar title="Filtrar Propuestas">
      <v-tabs v-model="filterTypeProposalSelected" slider-color="transparent">
        <v-tab v-for="(item, i) in typeProposal" :key="i">
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
            @click="() => {filterStatusSelected = item.id; nextIndex = 0; loadProposal()}"
          >
            <div class="custom-checkbox mr-2" style="--size: 10px" :class="{ active: filterStatusSelected === item.id }" />
            {{ item.desc }}
          </v-list-item>
        </v-list>

        <h6 class="mt-6 mb-2">Filtrar por proponente</h6>
        <v-text-field
          v-model="filterProposer"
          placeholder="andresdom.near"
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
        <v-pagination
            v-model="page"
            class="mt-10 mb-16"
            :length="paginatedDataProposal"
          ></v-pagination>

          <div class="proposals">
            <proposal-card
              v-for="(item, i) in proposal_list" :key="i"
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
  data: () => ({
      tab: null,
    }),
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
      page2: ref(1),
      filterTypeProposalSelected: ref('*'),
			filterStatusSelected: ref('*'),
      session: ref(null), // WalletP2p.getA ccount(),
      isMember: ref(utilsDAO.isMember()),
      typeProposal: [
        {id: "*", desc: "Todas"},
        {id: "PorVotar", desc: "Por votar"},
        {id: "InProgress", desc: "En votación"},
        {id: "Approved", desc: "Aprobadas"},
        {id: "Rejected", desc: "Rechazadas"},
        // {id: "ChangePolicyUpdateVotePolicy", desc: "Actualizar política de votación"},
        //{id: "ChangePolicyUpdateParameters", desc: "Actualización parámetros de políticas"},
        //{id: "Miembros", desc: "Miembros"},

      ],
      statusProposal: [
        { id: "*", desc: "Todos"},
        {id: "PorVotar", desc: "Por votar"},
        { id: "InProgress", desc: "Activas"},
        { id: "Approved", desc: "Aprobadas"},
        { id: "Rejected", desc: "Rechazadas"},
        // { id: "Removed", desc: "Removed"},
        // { id: "Expired", desc: "Expiradas"},
        // { id: "Failed", desc: "Fallidas"},
      ],
      proposal_list: ref([]),
			cardsProposals: ref([]),
      totalPages: ref(Math.ceil(0 / 0)),
      proposer: ref(null),
      paginatedDataProposal: ref(4),
      elementosPorPagina: ref(4),
      totalProposalList: ref(0),
      nextIndex: ref(0),
      filterProposer: ref(undefined),
      back: ref(false)
    }
  },

  watch: {
    page: function(val, valOld) {
      if(this.totalProposalList.length <= 0) return
      this.back = val < valOld;
      this.nextIndex = (val - 1) * this.elementosPorPagina;

      this.loadProposal()
    },
    filterTypeProposalSelected: function(vala, valb) {
      this.nextIndex = 0;
      this.filterStatusSelected = this.typeProposal[vala].id;
      this.loadProposal()
    },
    /*filterStatusSelected: function(val) {
      this.nextIndex = 0;
      // const status = this.statusProposal.map(item => { return item.id }).splice(1, this.statusProposal.length);
      // this.proposalStatus = val != '*' ? [val] : status
      this.loadProposal()
    },*/
    filterProposer: function(val) {
      this.nextIndex = 0;
      this.proposer = !val ? undefined : val.trim() == "" ? undefined : val.trim();
      this.loadProposal()
    }
  },


  mounted() {
    this.getAddress()
    this.loadProposal();
  },

	computed: {
    paginatedProposals() {
      return (this.proposal_list.length || 3) / 3
    }
  },

  methods: {
    async getAddress() {
      const accoun_id = await WalletP2p.getAccountId();
      this.session = accoun_id;
    },

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
          gas: "36000000000000",
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
          gas: "36000000000000"
          // attachedDeposit: "100000000000000000000"
        };

        WalletP2p.call(json);
      }
    },

    async loadProposal() {
      let status = this.statusProposal.map(item => { return item.id }).splice(2, this.statusProposal.length);

      //let type = this.typeProposal.map(item => { return item.id }).splice(1, this.typeProposal.length);

      status = this.filterStatusSelected != '*' ? [this.filterStatusSelected] : status;
      let searchStatus = `status_in: ${JSON.stringify(status)} `;
      if(status[0] == "PorVotar") {
        const query = `query Proposals($type: [String], $status: [String], $userId: String, $limit: Int, $index: Int) {
          proposals(where: {vote_: {user_id: $userId}} ) {
            id
          }
        }`;

        const variables = {
          // type: type,
          userId: this.session,
        };

        await graphQl.getQuery(query, variables).then(response => {
          const result = response.data.data?.proposals

          if(!result) return

          searchStatus = `id_not_in: ${JSON.stringify(result.map((item) => {return item.id.toString()}))} `;
        });
      }

      //type = this.typeProposal[this.filterTypeProposalSelected].id != '*' ? [this.typeProposal[this.filterTypeProposalSelected].id] : type;

      //const proposalType = !this.type ? '' : ', proposal_type: "' + this.type + '"';
      //const statusProposal = !this.status ? '' : ', status: "' + this.status + '"';
      //const proposerLike = !this.likeProposer ? '' : ', proposer_contains: "' + this.likeProposer + '"';


      const searchProposer = !this.proposer ? `` : `, proposer_contains_nocase: "${this.proposer}"`;
      // id_not: "8",
      const query = `query Proposals($type: [String], $status: [String], $userId: String, $limit: Int, $index: Int) {
        proposals(where: {${searchStatus} ${searchProposer}} orderBy: creation_date, orderDirection: desc, skip: $index, first: $limit ) {
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
          vote(where: {user_id: $userId}) {
            vote
          }
        }

        proposaldata(id: "1") {
          proposal_total
        }
      }`;

      const variables = {
        // type: type,
        userId: this.session,
        limit: this.elementosPorPagina,
        index:this.nextIndex
      };

      await graphQl.getQuery(query, variables).then(async result => {
        const response = result.data.data;

        if(!response?.proposals) return
        // if(response.proposals.length <= 0) return


        //paginacion
        if(this.filterStatusSelected != '*' || searchProposer != '') {
          this.totalProposalList = this.page == 1 && !this.back ? response.proposals.length : this.totalProposalList;
          this.paginatedDataProposal = Math.ceil(this.totalProposalList / this.elementosPorPagina);

          if(this.paginatedDataProposal == this.page) {
            variables.index = (this.page) * this.elementosPorPagina

            await graphQl.getQuery(query, variables).then(async response => {
              const data = response.data.data?.proposals;
              if(!data) return
              if(data.length <= 0) return

              this.totalProposalList += data.length;
              this.paginatedDataProposal = Math.ceil(this.totalProposalList / this.elementosPorPagina);
            })
          }
          this.back = false;
        } else {
          this.totalProposalList = response.proposals.length <= 0 ? 0 : response.proposaldata.proposal_total;
          this.paginatedDataProposal = Math.ceil(this.totalProposalList / this.elementosPorPagina);
        }


        // this.totalProposalList = response.proposals.length <= 0 ? 0 : response.proposaldata.proposal_total;
        // this.paginatedDataProposal = Math.ceil(this.totalProposalList / this.elementosPorPagina);

        this.nextIndex = (this.page) * this.elementosPorPagina;


        const cardsProposals = response.proposals.map((item) => {
          let amount = null
          if(item.proposal_type == "Transfer") {
            amount = Number((JSON.parse(item.kind).Transfer.amount / 1000000000000000000000000).toFixed(2));
          }

          const date = moment(item.approval_date/1000000)
          const date_format = 'Aprobado el: ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
          const date_final = item.approval_date ? date_format : item.approval_date;

          const kindProposal = JSON.parse(item.kind);
          const objectProposal = kindProposal[item.proposal_type];
          const configMetadata = objectProposal && item.proposal_type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

          return {
            id: item.id,
            contractId: this.$route.query?.dao,
            type: item.proposal_type,
            objectProposal,
            configMetadata,
            title: item.title,
            date: date_final /*item.submission_time*/,
            proposer: item.proposer,
            description: item.description,
            approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
            status: item.status,
            link: item.link,
            amount: null,
            claims: null,
            remainingTime: "una semana",
            likes: item.upvote,
            dislikes: item.downvote,
            vote: item.vote.length > 0 ? item.vote[0].vote : undefined,
          }
        });

        this.proposal_list = this.cardsProposals = cardsProposals;


        // this.totalPages = Math.ceil(cardsProposals.length / this.cardsPerPage);
        // this.proposal_list = cardsProposals;

        // this.loadPage();
        // this.cardsProposals = cardsProposals.slice(startIndex, endIndex);

      });
    },


    loadPage() {
      const startIndex = (this.currentPage - 1) * this.cardsPerPage;
      const endIndex = startIndex + this.cardsPerPage;

      this.cardsProposals = this.proposal_list.slice(startIndex, endIndex);
    },

  },
}
</script>
