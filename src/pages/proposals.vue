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
						v-model="radio_buttons"
						inline
						hide-details
						class="delete-mobile"
					>
						<v-radio label="Todos" class="radios mr-4" :value="1"></v-radio>
						<v-radio label="Llamadas a Funciones" class="radios mr-4"	:value="2"></v-radio>
						<v-radio label="Gobernancia" class="radios mr-4"	:value="3"></v-radio>
						<v-radio label="Transferencias" class="radios mr-4"	:value="4"></v-radio>
						<v-radio label="Recompensas" class="radios mr-4"	:value="5"></v-radio>
						<v-radio label="Miembros" class="radios mr-4"	:value="6"></v-radio>
						<v-radio label="Centro" class="radios mr-4" :value="7"></v-radio>
					</v-radio-group>

					<div class="divrow center" style="gap: 10px; min-width: max-content!important;">
						<h6 class="mb-0">{{ itemSelected }}</h6>
						<v-menu location="start">
							<template v-slot:activator="{ props }">
								<v-icon v-bind="props" size="x-large" class="show-mobile" style="margin-top: -5px;">mdi-filter-variant</v-icon>
							</template>
							<v-list>
								<v-list-item>
									<v-radio-group
										v-model="itemSelected"
										hide-details
									>
										<v-radio label="Todos" class="radios mr-4" :value="'Todos'"></v-radio>
										<v-radio label="Llamadas a Funciones" class="radios mr-4"	:value="'Llamadas a Funciones'"></v-radio>
										<v-radio label="Gobernancia" class="radios mr-4"	:value="'Gobernancia'"></v-radio>
										<v-radio label="Transferencias" class="radios mr-4"	:value="'Transferencias'"></v-radio>
										<v-radio label="Recompensas" class="radios mr-4"	:value="'Recompensas'"></v-radio>
										<v-radio label="Miembros" class="radios mr-4"	:value="'Miembros'"></v-radio>
										<v-radio label="Centro" class="radios mr-4" :value="'Centro'"></v-radio>
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
							v-model="radio_buttons2"
							hide-details
							class="mb-6"
						>
							<v-radio label="Todos" class="radios mr-4" :value="1"></v-radio>
							<v-radio label="Activas" class="radios mr-4"	:value="2"></v-radio>
							<v-radio label="Aprobadas" class="radios mr-4"	:value="3"></v-radio>
							<v-radio label="Populares" class="radios mr-4"	:value="4"></v-radio>
							<v-radio label="Fallidas" class="radios mr-4"	:value="5"></v-radio>
						</v-radio-group>
					</div>
					<div>
						<label for="proposer">Filtrar por proponente</label>
						<v-text-field
						id="proposer"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="andresdom.near"
						append-inner-icon="mdi-magnify"
						></v-text-field>

						<label for="categoria">Filtrar por categoría</label>
						<v-text-field
						id="categoria"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="Lorem Ipsum"
						append-inner-icon="mdi-magnify"
						></v-text-field>
					</div>

					<div class="show-mobile divrow" style="gap: 8px; display: flex;">
						<h6 class="mb-0 mr-0" style="max-width: max-content;">{{ filterSelected }}</h6>
						<v-menu location="start">
							<template v-slot:activator="{ props }">
								<v-icon v-bind="props" size="x-large" class="show-mobile" style="margin-top: -5px;">mdi-filter-variant</v-icon>
							</template>
							<v-list>
								<v-list-item>
									<v-radio-group
										v-model="filterSelected"
										hide-details
									>
										<v-radio label="Todos" class="radios mr-4" :value="'Todos'"></v-radio>
										<v-radio label="Activas" class="radios mr-4"	:value="'Activas'"></v-radio>
										<v-radio label="Aprobadas" class="radios mr-4"	:value="'Aprobadas'"></v-radio>
										<v-radio label="Populares" class="radios mr-4"	:value="'Populares'"></v-radio>
										<v-radio label="Fallidas" class="radios mr-4"	:value="'Fallidas'"></v-radio>
									</v-radio-group>
								</v-list-item>
							</v-list>
						</v-menu>
					</div>
				</v-col>


				<v-col align="center" xl="9" lg="9" md="9" sm="12" cols="12">
					<div class="jend">
						<v-btn v-if="session.address" class="mb-6" @click="$router.push('create-proposals')">Crear propuesta</v-btn>
					</div>

					<v-card v-for="(item, index) in displayedCards" :key="index" class="card-proposals" @click="$router.push({path: 'proposals-details', query: {id: item.proposals_id}})">
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
											<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;"><v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-twitter</v-icon> Compartir en Twitter</v-list-item-title>
											</v-list-item>
											<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;"><v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-send</v-icon> Compartir en Telegram</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
									<span style="color: #8A5FA4;">{{ item.date }}</span>
								</div>
							</div>

							<hr class="mt-3 mb-3" style="width: 100%; border-bottom: 1px solid rgba(0,0,0,0.1); height: 1px;">

							<div class="jspace" style="width: 100%; height: max-content;">
								<div class="divcol">
									<span class="tstart" style="color: #939393;">Proponente</span>
									<span class="tstart" style="color: #000;">{{ item.near_id }}</span>
									<!--<span class="tstart" style="color: #000;">BGeam</span>-->
								</div>

								<div class="mr-10 no-margin">
									<img v-if="item.date" src="@/assets/sources/images/approved.svg" alt="Approved" class="aprroved-failed-img">
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
									<button @click.stop="upvote(item.proposals_id)" :disabled="session.address ? false : true"><img src="@/assets/sources/icons/like-icon.svg" alt="Like" style="width: 30px;"></button> {{ item.likes }}
                  <button @click.stop="downvote(item.proposals_id)" :disabled="session.address ? false : true"><img src="@/assets/sources/icons/dislike-icon.svg" alt="Dislike" style="width: 30px; margin-left: 10px;"></button> {{ item.dislikes }}
								</v-col>
							</v-row>
						</div>
					</v-card>

					<v-pagination
						v-model="currentPage"
      			:length="totalPages"
						:total-visible="5"
						size="small"
					></v-pagination>

				</v-col>
			</v-row>
    </div>
</template>

<script>
import '@/assets/styles/pages/proposals.scss';
import { initOnLoad } from 'apexcharts';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import { ref } from 'vue';

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
			currentPage: ref(1),
      cardsPerPage: ref(3),
			page: ref(1),
			radio_buttons: null,
			radio_buttons2: 2,
			itemSelected: '',
			filterSelected: '',
      session: ref({}),

			cardsProposals: ref([/*
				{
					proposals_id: 1234,
					title_desc: 'AddBounty2',
					title: 'Crear una recompensa',
					date: 'Aprobado el: 31 de Agosto de 2023',
					near_id: 'andresdom.near',
					desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eaque adipisci officia a. Vitae facilis quia minus numquam labore perspiciatis culpa odio totam eum, veniam fuga corrupti saepe temporibus dolore a voluptatem asperiores. Repellendus dignissimos doloribus optio eaque, ipsam id adipisci repellat atque? Praesentium repellendus pariatur reprehenderit deleniti ipsa dolores possimus velit nemo corporis optio cumque itaque officia qui nostrum suscipit delectus nulla labore quibusdam, vero, in quasi eos at? Beatae quos a laudantium ratione dignissimos perferendis quod, repudiandae nulla!',
					link: 'gov.near.org',
					amount: 777,
					currency: 'NEAR',
					claims: 222,
					time_complete: '3 Meses',
					likes: 117,
					dislikes: 15,
				},*/
			])
    }
  },

  mounted() {
    this.session = WalletP2p.getAccount();
  },

	computed: {
    totalPages() {
      if(this.result) {
        const cardsProposals = this.result.proposals;
        return Math.ceil(cardsProposals.length / this.cardsPerPage);
      } else {
        return Math.ceil(0 / this.cardsPerPage)
      }
    },
    displayedCards() {
      if(this.result) {
        const cardsProposals = this.result.proposals.map((item) => {
          let amount = null
          if(item.proposal_type == "Transfer") {
            amount = Number((JSON.parse(item.kind).Transfer.amount / 1000000000000000000000000).toFixed(2));
          }

          return {
            proposals_id: item.id,
            title_desc: item.proposal_type,
            title: item.title,
            date: item.approval_date, //  'Aprobado el: 31 de Agosto de 2023',
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
    },
  },

  methods: {
    copy(id) {
      const link = window.location.origin + process.env.BASE_URL + "proposals-details?id=" + id
      navigator.clipboard.writeText(link);
    },
    upvote(id) {
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
    },
    downvote(id) {
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
    },
  },
}
</script>
