<template>
    <div id="proposals" class="center divcol">
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

			<section class="section2-proposals center">
				<div class="container-radios divrow acenter">
					<h5 class="mb-0 mr-8">Propuestas</h5>
					<v-radio-group
						v-model="filterTypeProposalSelected"
            v-for="(item, index) in typeProposal" :key="index"
						inline
						hide-details
						class="delete-mobile"
            @change="loadProposal()"
					>
            <v-radio :label="item.desc" class="radios mr-4" :value="item.id"></v-radio>
						<!--<v-radio label="Todos" class="radios mr-4" :value="'*'"></v-radio>
						<v-radio label="Llamadas a Funciones" class="radios mr-4"	:value="'FunctionCall'"></v-radio>
						<!-<v-radio label="Gobernancia" class="radios mr-4"	:value="''"></v-radio>--
						<v-radio label="Transferencias" class="radios mr-4"	:value="'Transfer'"></v-radio>
						<v-radio label="Actualizar política de votación" class="radios mr-4"	:value="'ChangePolicyUpdateVotePolicy'"></v-radio>
						<!-<v-radio label="Actualización parámetros de políticas" class="radios mr-4"	:value="'ChangePolicyUpdateParameters'"></v-radio>--
            <!-<v-radio label="Miembros" class="radios mr-4"	:value="''"></v-radio>--
						<v-radio label="Centro" class="radios mr-4" :value="''"></v-radio>-->
					</v-radio-group>

					<div class="divrow center" style="gap: 10px; min-width: max-content!important;">
						<h6 class="mb-0">{{ typeProposal.find(item => item.id == filterTypeProposalSelected ).desc  }}</h6>
						<v-menu location="start">
							<template v-slot:activator="{ props }">
								<v-icon v-bind="props" size="x-large" class="show-mobile" style="margin-top: -5px;">mdi-filter-variant</v-icon>
							</template>
							<v-list>
								<v-list-item>
									<v-radio-group
										v-model="filterTypeProposalSelected"
                    v-for="(item, index) in typeProposal" :key="index"
										hide-details
                    @change="loadProposal()"
									>
                    <v-radio :label="item.desc" class="radios mr-4" :value="item.id"></v-radio>
										<!--<v-radio label="Todos" class="radios mr-4" :value="'Todos'"></v-radio>
										<v-radio label="Llamadas a Funciones" class="radios mr-4"	:value="'Llamadas a Funciones'"></v-radio>
										<v-radio label="Gobernancia" class="radios mr-4"	:value="'Gobernancia'"></v-radio>
										<v-radio label="Transferencias" class="radios mr-4"	:value="'Transferencias'"></v-radio>
										<v-radio label="Recompensas" class="radios mr-4"	:value="'Recompensas'"></v-radio>
										<v-radio label="Miembros" class="radios mr-4"	:value="'Miembros'"></v-radio>
										<v-radio label="Centro" class="radios mr-4" :value="'Centro'"></v-radio>-->
									</v-radio-group>
								</v-list-item>
							</v-list>
						</v-menu>
					</div>
				</div>
			</section>

			<hr style="width: 100%; border-bottom: 1px solid rgba(255,255,255,0.4); height: 1px;">

			<v-row style="width: 100%;" class="radio-side-container">
				<v-col xl="3" lg="3" md="3" sm="12" cols="12" class="divrow-mobile">
					<div class="delete-mobile">
						<span>
							Elige un filtro
						</span>
						<v-radio-group
							v-model="filterStatusSelected"
              v-for="(item, index) in statusProposal" :key="index"
							hide-details
							class="mb-6"
              @change="loadProposal()"
						>
              <v-radio :label="item.desc" class="radios mr-4" :value="item.id"></v-radio>
							<!--<v-radio label="Todos" class="radios mr-4" :value="'*'"></v-radio>
							<v-radio label="Activas" class="radios mr-4"	:value="'InProgress'"></v-radio>
              <v-radio label="Aprobadas" class="radios mr-4"	:value="'Approved'"></v-radio>
              <v-radio label="Rechazadas" class="radios mr-4"	:value="'Rejected'"></v-radio>
							<!-<v-radio label="Removed" class="radios mr-4"	:value="'Removed'"></v-radio>->
							<v-radio label="expiradas" class="radios mr-4"	:value="'Expired'"></v-radio>
							<v-radio label="Fallidas" class="radios mr-4"	:value="'Failed'"></v-radio>-->
						</v-radio-group>
					</div>
					<div>
						<label for="proposer">Filtrar por proponente</label>
						<v-text-field
            v-model="proposer"
						id="proposer"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="andresdom.near"
						append-inner-icon="mdi-magnify"
            @keyup="loadProposal()"
						></v-text-field>

						<!--<label for="categoria">Filtrar por categoría</label>
						<v-text-field
						id="categoria"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="Lorem Ipsum"
						append-inner-icon="mdi-magnify"
						></v-text-field>-->
					</div>

					<div class="show-mobile divrow" style="gap: 8px; display: flex;">
						<h6 class="mb-0 mr-0" style="max-width: max-content;">{{ statusProposal.find(item => item.id == filterStatusSelected ).desc }}</h6>
						<v-menu location="start">
							<template v-slot:activator="{ props }">
								<v-icon v-bind="props" size="x-large" class="show-mobile" style="margin-top: -5px;">mdi-filter-variant</v-icon>
							</template>
							<v-list>
								<v-list-item>
									<v-radio-group
										v-model="filterStatusSelected"
                    v-for="(item, index) in statusProposal" :key="index"
										hide-details
                    @change="loadProposal()"
									>
                    <v-radio :label="item.desc" class="radios mr-4" :value="item.id"></v-radio>
                    <!--<v-radio label="Todos" class="radios mr-4" :value="'*'"></v-radio>
                    <v-radio label="Activas" class="radios mr-4"	:value="'InProgress'"></v-radio>
                    <v-radio label="Aprobadas" class="radios mr-4"	:value="'Approved'"></v-radio>
                    <v-radio label="Rechazadas" class="radios mr-4"	:value="'Rejected'"></v-radio>
                    <!-<v-radio label="Removed" class="radios mr-4"	:value="'Removed'"></v-radio>->
                    <v-radio label="expiradas" class="radios mr-4"	:value="'Expired'"></v-radio>
                    <v-radio label="Fallidas" class="radios mr-4"	:value="'Failed'"></v-radio>-->
									</v-radio-group>
								</v-list-item>
							</v-list>
						</v-menu>
					</div>
				</v-col>


				<v-col align="center" xl="9" lg="9" md="9" sm="12" cols="12">
					<div class="jend">
						<v-btn v-if="session.address" class="mb-6" @click="goCreateProposal()">Crear propuesta</v-btn>
					</div>

					<v-card v-for="(item, index) in cardsProposals" :key="index" class="card-proposals" @click="$router.push({path: 'proposals-details', query: {id: item.proposals_id}})">
						<div class="side-bar">
							<v-icon>mdi-tray-arrow-up</v-icon>
							<div class="div-span-side">
								<span class="font300">
									Propuesta ID: {{ item.proposals_id }}
								</span>
							</div>
						</div>
						<div class="container-data-card">
							<div class="jspace mobile-col" style="width: 100%; height: max-content;">
								<div class="divcol">
									<span class="tstart" style="color: #939393;">Tipo de Propuesta: {{ item.title_desc }}</span>
									<div class="divrow mt-1">
										<h5 style="color: #000;">{{ item.title }}</h5> <v-icon class="ml-2 icon">mdi-link</v-icon>
									</div>
								</div>

								<div class="divcol jend aend mobile-left">
									<v-menu location="start">
										<template v-slot:activator="{ props }">
											<v-icon v-bind="props" style="color: #8A5FA4; font-size: 45px;">mdi-dots-horizontal</v-icon>
										</template>

										<v-list>
											<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;">
                          <button @click="copy(item.proposals_id)">
                          <v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-content-copy</v-icon>
                          Copiar Link</button>
                        </v-list-item-title>
											</v-list-item>
											<!--<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;">
                          <v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-twitter</v-icon> Compartir en Twitter
                        </v-list-item-title>
											</v-list-item>
											<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;">
                          <v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-send</v-icon> Compartir en Telegram
                        </v-list-item-title>
											</v-list-item>-->
										</v-list>
									</v-menu>
									<span style="color: #8A5FA4;">{{ item.date }}</span>
								</div>
							</div>

							<hr class="mt-3 mb-3" style="width: 100%; border-bottom: 1px solid rgba(0,0,0,0.1); height: 1px;">

							<div class="jspace mb-2" style="width: 100%; height: max-content;">
								<div class="divcol">
									<span class="tstart" style="color: #939393;">Proponente</span>
									<span class="tstart" style="color: #000; max-width: 150px">{{ item.near_id }}</span>
									<!--<span class="tstart" style="color: #000;">BGeam</span>-->
								</div>

								<div class="mr-10 no-margin">
									<img v-if="item.status == 'Approved'" src="@/assets/sources/images/icono_aprobado_color.png" alt="Approved" class="aprroved-failed-img">
                  <img v-if="item.status == 'Rejected'" src="@/assets/sources/images/icono_negado_color.png" alt="Approved" class="aprroved-failed-img">
								</div>
							</div>

							<div class="divcol" style="width: 100%; height: max-content;">
								<span class="tstart" style="color: #939393;">Descripción</span>
								<p class="tstart" style="color: #000;">
									{{ item.desc }}
								</p>
								<span class="tstart" style="color: #61C2D5;">
									{{ item.link }} <v-icon class="icon" color="#61C2D5">mdi-link</v-icon>
								</span>
							</div>

							<v-row>
								<v-col xl="3" lg="3" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393; font-size: 12px;">Cantidad</span>
									<div class="divrow jstart acenter" style="color: #000; gap: 8px;">
										{{ item.amount }} <img src="@/assets/sources/icons/near-icon.svg" alt="Near Icon" style="width: 20px;"> {{ item.currency }}
									</div>
								</v-col>
								<v-col xl="3" lg="3" md="6" cols="6" class="divcol jstart">
									<!--<span class="tstart" style="color: #939393; font-size: 12px;">Reclamaciones disponibles</span>
									<span class="tstart" style="color: #000;">{{ item.claims }}</span>-->
								</v-col>
								<v-col xl="3" lg="3" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393; font-size: 12px;">Tiempo para completar</span>
									<span class="tstart" style="color: #000;">{{ item.time_complete }}</span>
								</v-col>
								<v-col xl="3" lg="3" md="6" cols="6" class="divrow jend acenter" style="gap: 10px; color: #000;">
									<button @click.stop="upvote(item.proposals_id)" :disabled="(session.address ? false : true) || item.date"><img src="@/assets/sources/icons/like-icon.svg" alt="Like" style="width: 30px;"></button> {{ item.likes }}
                  <button @click.stop="downvote(item.proposals_id)" :disabled="(session.address ? false : true) || item.date"><img src="@/assets/sources/icons/dislike-icon.svg" alt="Dislike" style="width: 30px; margin-left: 10px;"></button> {{ item.dislikes }}
								</v-col>
							</v-row>
						</div>
					</v-card>

					<v-pagination
						v-model="currentPage"
      			:length="totalPages"
						:total-visible="5"
						size="small"
            @click="loadPage()"
					></v-pagination>

				</v-col>
			</v-row>
    </div>


    <v-row justify="center">
      <v-dialog
        v-model="alert"
        persistent
        width="auto"
        content-class="dialog-dao"
      >
        <v-card>
          <v-card-title class="text-h5">
            <v-icon>mdi-alert-circle</v-icon> Advertencia
          </v-card-title>
          <v-card-text>Debe ser miembro para poder votar, solicite su membresía.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              class="btn"
              @click="alert = false"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import '@/assets/styles/pages/proposals.scss';
import { initOnLoad } from 'apexcharts';
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
    }
  },

  mounted() {
    this.loadProposal();
  },

	computed: {
    /*totalPages() {
      if(this.result) {
        const cardsProposals = this.result.proposals;
        return Math.ceil(cardsProposals.length / this.cardsPerPage);
      } else {
        return Math.ceil(0 / this.cardsPerPage)
      }
    },*/
    /*displayedCards() {
      if(this.result) {
        const cardsProposals = this.result.proposals.map((item) => {
          let amount = null
          if(item.proposal_type == "Transfer") {
            amount = Number((JSON.parse(item.kind).Transfer.amount / 1000000000000000000000000).toFixed(2));
          }

          const date = moment(item.approval_date/1000000)
          const date_format = 'Aprobado el: ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
          const date_final = item.approval_date ? date_format : item.approval_date;

          return {
            proposals_id: item.id,
            title_desc: item.proposal_type,
            title: item.title,
            date: date_final, //  'Aprobado el: 31 de Agosto de 2023',
            near_id: item.proposer,
            desc: item.description,
            link: item.link,
            amount: amount,
            currency: '',
            time_complete: '7 Días',
            likes: item.upvote,
            dislikes: item.downvote,
          }
        });
        const startIndex = (this.currentPage - 1) * this.cardsPerPage;
        const endIndex = startIndex + this.cardsPerPage;
        return cardsProposals.slice(startIndex, endIndex);
      } else {
        return [];
      }
    },*/
  },

  methods: {
    copy(id) {
      const link = window.location.origin + process.env.BASE_URL + "proposals-details?id=" + id
      navigator.clipboard.writeText(link);
    },

    async goCreateProposal() {
      const isMember = await this.isMember;
      this.alert = !isMember || false;

      if(isMember) {
        this.$router.push('create-proposals');
      }
    },

    async upvote(id) {
      const isMember = await this.isMember;
      this.alert = !isMember || false;

      if(isMember) {
        const json = {
          contractId: process.env.CONTRACT_NFT,
          methodName: "update_proposal",
          args: {
            id: Number(id),
            action: "VoteApprove"
          },
          gas: "300000000000000"
        };

        WalletP2p.call(json);
      }
    },
    async downvote(id) {
      const isMember = await this.isMember;
      this.alert = !isMember || false;

      if(isMember) {
        const json = {
          contractId: process.env.CONTRACT_NFT,
          methodName: "update_proposal",
          args: {
            id: Number(id),
            action: "VoteReject"
          },
          gas: "300000000000000"
        };

        WalletP2p.call(json);
      }
    },

    async loadProposal() {
      let status = this.statusProposal.map(item => { return item.id }).splice(1, this.statusProposal.length);
      let type = this.typeProposal.map(item => { return item.id }).splice(1, this.typeProposal.length);

      status = this.filterStatusSelected != '*' ? [this.filterStatusSelected] : status;
      type = this.filterTypeProposalSelected != '*' ? [this.filterTypeProposalSelected] : type;


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

          return {
            proposals_id: item.id,
            title_desc: item.proposal_type,
            title: item.title,
            date: date_final, //  'Aprobado el: 31 de Agosto de 2023',
            near_id: item.proposer,
            desc: item.description,
            link: item.link,
            amount: amount,
            currency: '',
            time_complete: '7 Días',
            likes: item.upvote,
            dislikes: item.downvote,
            status: item.status,
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
