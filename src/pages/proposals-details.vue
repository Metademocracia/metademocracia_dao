<template>
	<div id="proposals-details" class="divcol center">
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

			<section class="section2-proposals-details center">
				<v-card v-for="(item, index) in cardsProposals" :key="index" class="card-proposals">
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
                          <button @click="copy()">
                            <v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-content-copy</v-icon>
                            Copiar Link
                          </button>
                        </v-list-item-title>
											</v-list-item>
											<!--<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;"><v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-twitter</v-icon> Compartir en Twitter</v-list-item-title>
											</v-list-item>
											<v-list-item style="max-height: 30px; min-height: 30px;">
												<v-list-item-title style="font-size: 12px!important; color: #61C2D5;"><v-icon style="font-size: 15px!important;  color: #8A5FA4;">mdi-send</v-icon> Compartir en Telegram</v-list-item-title>
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
									<span class="tstart max150">{{ item.near_id }}</span>
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
									<a :href="item.link" target="_blank" style="color: #61C2D5;">{{ item.link }} <v-icon class="icon" color="#61C2D5">mdi-link</v-icon></a>
								</span>
							</div>

							<v-row>
								<v-col xl="4" lg="4" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393; font-size: 12px;">Cantidad</span>
									<div class="divrow jstart acenter" style="color: #000; gap: 8px;">
										{{ item.amount }} <img src="@/assets/sources/icons/near-icon.svg" alt="Near Icon" style="width: 20px;"> {{ item.currency }}
									</div>
								</v-col>
								<!--<v-col xl="3" lg="3" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393; font-size: 12px;">Reclamaciones disponibles</span>
									<span class="tstart" style="color: #000;">{{ item.claims }}</span>
								</v-col>-->
								<v-col xl="4" lg="4" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393; font-size: 12px;">Tiempo para completar</span>
									<span class="tstart" style="color: #000;">{{ item.time_complete }}</span>
								</v-col>
								<v-col xl="4" lg="4" md="6" cols="6" class="divrow jend acenter" style="gap: 10px; color: #000;">
									<button @click.stop="upvote(item.proposals_id)" :disabled="(session.address ? false : true) || item.date" ><img src="@/assets/sources/icons/like-icon.svg" alt="Like" style="width: 30px;"></button> {{ item.likes }}
                  <button @click.stop="downvote(item.proposals_id)" :disabled="(session.address ? false : true) || item.date"><img src="@/assets/sources/icons/dislike-icon.svg" alt="Dislike" style="width: 30px; margin-left: 10px;"></button> {{ item.dislikes }}
								</v-col>
							</v-row>
						</div>
				</v-card>
			</section>

			<section class="section3-proposals-details center divcol">
				<div style="width: 100%;" class="delete-mobile">
					<h5 class="tstart">
						Votos
					</h5>
					<div class="div-likes-line center">
						<div class="circle"></div>
						<div class="transversal-line"></div>
						<div class="circle"></div>
						<div class="div-absolute-likes jstart">
							<img v-for="(item,index) in dataLikes" :key="index" :src="iconMap[item.icon]" :alt="item.icon_name">
						</div>
					</div>
					<div class="jspace" style="width: 100%;">
						<span style="color: #e2e2e2;">Creando propuesta</span>
						<span style="color: #e2e2e2;">Completada</span>
					</div>
				</div>

				<div class="container-dao-members-council mt-10">
					<v-row>
						<v-col xl="2" lg="2" md="2" cols="12" class="center jstart">
							<h6 class="mb-0 tstart" style="width: 100%;">
								Miembros de DAO
							</h6>
						</v-col>

						<v-col xl="10" lg="10" md="10" cols="12">
							<div class="container-panel-expansion" @click="openToggle()">
								<span style="color: #e2e2e2; min-width: max-content;">
									{{ voices_left }} / {{ voices_goal }} voces
								</span>

								<v-divider vertical :thickness="1" class="border-opacity-100" color="#fff"></v-divider>

								<v-progress-linear
									model-value="0"
									color="#DB107C"
									rounded
									style="max-width: 100%;"
								></v-progress-linear>

								<v-icon color="#DB107C" :class="{ 'rotate-180': openVoice, 'rotate-0' : ! openVoice }">mdi-chevron-up</v-icon>
							</div>
						</v-col>

						<v-col cols="12" v-if="openVoice">
							<div v-for="(item, index) in dataVoice" :key="index" class="card-desc-votes">
								<div class="div-img" :class="{'purple-absolute' : item.icon == 'mdi-vote', 'red-absolute' : item.icon == 'mdi-thumb-down', 'green-absolute' : item.icon == 'mdi-thumb-up'}">
									<v-icon>{{ item.icon }}</v-icon>
								</div>
								<span>{{ item.name.substring(0, 20) }}...</span>
								<span>{{ item.date }}</span>
							</div>
						</v-col>
					</v-row>

					<!--<v-row>
						<v-col xl="1" lg="1" md="1" cols="12" class="center jstart">
							<h6 class="mb-0 tstart" style="width: 100%;">
								Concejo
							</h6>
						</v-col>

						<v-col xl="11" lg="11" md="11" cols="12">
							<div class="container-panel-expansion" @click="openToggleCouncil()">
								<span style="color: #e2e2e2; min-width: max-content;">
									{{ council_left }} / {{ council_goal }} voces
								</span>

								<v-divider vertical :thickness="1" class="border-opacity-100" color="#fff"></v-divider>

								<span  style="color: #e2e2e2; min-width: max-content;">{{ percent_council }} %</span>

								<v-progress-linear
									model-value="75"
									color="#DB107C"
									rounded
									style="max-width: 100%;"
								></v-progress-linear>

								<v-icon color="#DB107C" :class="{ 'rotate-180': openCouncil, 'rotate-0' : ! openCouncil }">mdi-chevron-up</v-icon>
							</div>
						</v-col>

						<v-col cols="12" v-if="openCouncil">
							<div v-for="(item, index) in dataCouncil" :key="index" class="card-desc-votes">
								<div class="div-img" :class="{'purple-absolute' : item.icon == 'mdi-vote', 'red-absolute' : item.icon == 'mdi-thumb-down', 'green-absolute' : item.icon == 'mdi-thumb-up'}">
									<v-icon>{{ item.icon }}</v-icon>
								</div>
								<span>{{ item.name }}</span>
								<span>{{ item.date }}</span>
							</div>
						</v-col>
					</v-row>-->
				</div>
			</section>
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
import '@/assets/styles/pages/proposals-details.scss'
import like from '@/assets/sources/icons/like-icon.svg';
import dislike from '@/assets/sources/icons/dislike-icon.svg';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import moment from 'moment';
import { ref, computed } from 'vue';
import utilsDAO from '@/services/utils-dao';

const query = gql`
  query Proposals($id: String!) {
    serie(id: "1") {
      supply
    }

    proposal(id: $id) {
      approval_date
      creation_date
      description
      id
      kind
      link
      proposer
      proposal_type
      status
      submission_time
      title
      upvote
      downvote
      user_creation
      vote(orderBy: date_time, orderDirection: desc) {
        user_id
        vote
        date_time
      }
    }
  }
`;

export default {
	setup() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var id = urlParams.get('id');

    const { result, loading, error } = useQuery(query, {id: id});


    /*const realizarConsulta = (filtro) => {
      // Define tu consulta GraphQL utilizando el filtro proporcionado
      console.log("filtro", filtro)


      // Realiza la consulta utilizando useQuery
      const { result, loading, error } = useQuery(query, {
        // variables: {
          id: filtro,
        // },
      });

      // Maneja la respuesta y los errores de la consulta aquí
      // Puedes acceder a los datos de la consulta a través de result.value.data

      // Ejemplo básico de cómo manejar la respuesta
      if (loading) {
        console.log('Cargando...');
      } else if (error) {
        console.error(error);
      } else {
        console.log(result);
      }

      return result
    };*/


		return{
      result,
      loading,
      error,
      alert: ref(false),
      session: WalletP2p.getAccount(),
      isMember: ref(utilsDAO.isMember()),
			openVoice: ref(false),
			openCouncil: ref(false),
			voices_left: ref(0),
			voices_goal: ref(0),
			council_left: ref(3),
			council_goal: ref(4),
			percent_council: ref(75),
			cardsProposals: ref(/*[
				{
					proposals_id: 1234,
					title_desc: 'AddBounty',
					title: 'Crear una recompensa',
					date: 'Aprobado el: 31 de Agosto de 2023',
					near_id: 'andresdom.near',
					desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eaque adipisci officia a. Vitae facilis quia minus numquam labore perspiciatis culpa odio totam eum, veniam fuga corrupti saepe temporibus dolore a voluptatem asperiores. Repellendus dignissimos doloribus optio eaque, ipsam id adipisci repellat atque? Praesentium repellendus pariatur reprehenderit deleniti ipsa dolores possimus velit nemo corporis optio cumque itaque officia qui nostrum suscipit delectus nulla labore quibusdam, vero, in quasi eos at? Beatae quos a laudantium ratione dignissimos perferendis quod, repudiandae nulla!',
					link: 'gov.near.org',
					amount: 777,
					currency: 'NEAR',
					time_complete: '3 Meses',
					likes: 117,
					dislikes: 15,
				},
			]*/),

			dataLikes: ref([
				/*{icon: 'like'},
				{ icon: 'dislike'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{ icon: 'dislike'},
				{ icon: 'dislike'},
				{ icon: 'dislike'},
				{ icon: 'dislike'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},
				{icon: 'like'},*/
			]),

			iconMap: {
        like,
        dislike,
      },

			dataVoice: ref([
				/*{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},*/
			]),

			dataCouncil:[
				/*{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},*/
			]
		}
	},

  watch: {
    result(response) {
      this.loadData(response)
    }
  },


  mounted() {
    if(this.result){
      this.loadData(this.result);
    }
  },


	methods: {
    copy(id) {
      const link = window.location.origin + window.location.pathname + window.location.search
      navigator.clipboard.writeText(link);
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
          gas: "36000000000000"
          // attachedDeposit: "100000000000000000000"
        };

        WalletP2p.call(json, "proposals");
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

        WalletP2p.call(json, "proposals");
      }
    },
    loadData(response){
      if(response){
        const data = response.proposal;

        let amount = null
        if(data.proposal_type == "Transfer") {
          amount = Number((JSON.parse(data.kind).Transfer.amount / 1000000000000000000000000).toFixed(2));
        }

        const dataLikes = [];
        const dataVoice = [];
        for(let i = 0; i<data.vote.length; i++) {
          const type_vote = data.vote[i].vote == "VoteApprove" ? {icon: 'like'} : {icon: 'dislike'};
          dataLikes.push(type_vote);

          dataVoice.push({
            icon: data.vote[i].vote == "VoteApprove" ? 'mdi-thumb-up' : 'mdi-thumb-down',
            name: data.vote[i].user_id,
            date: moment(data.vote[i].date_time/1000000).format('DD MMM yyyy HH:mm:ss'),
          });
        }

        this.dataLikes = dataLikes;
        this.dataVoice = dataVoice;
        this.voices_goal = response.serie.supply;
        this.voices_left = Number(data.upvote) + Number(data.downvote)

        const date = moment(data.approval_date/1000000)
        const date_format = 'Aprobado el: ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
        const date_final = data.approval_date ? date_format : data.approval_date;

        this.cardsProposals = [{
          proposals_id: data.id,
          title_desc: data.proposal_type,
          title: data.title,
          date: date_final,
          near_id: data.proposer,
          desc: data.description,
          link: data.link,
          amount: amount,
          currency: 'NEAR',
          time_complete: '7 Días',
          likes: data.upvote,
          dislikes: data.downvote,
        }];

      };
    },
    openToggle() {
			this.openVoice = !this.openVoice
		},

		openToggleCouncil() {
			this.openCouncil = !this.openCouncil
		},
  },
}
</script>
