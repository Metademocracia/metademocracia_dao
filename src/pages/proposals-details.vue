<template>
	<div id="proposals-details" class="divcol center">
		<section>
				<v-carousel color="#DB107C" :show-arrows="false">
					<v-carousel-item>
					<img src="@/assets/sources/images/banner-3.svg" alt="Banner" style="max-height: 250px; max-width: 100vw!important;">
					</v-carousel-item>

					<v-carousel-item>
					<img src="@/assets/sources/images/banner-2.svg" alt="Banner" style="max-height: 250px; max-width: 100vw!important;">
					</v-carousel-item>

					<v-carousel-item>
					<img src="@/assets/sources/images/banner-1.svg" alt="Banner" style="max-height: 250px; max-width: 100vw!important;">
					</v-carousel-item>
				</v-carousel>
			</section>

			<section class="section2-proposals-details center">
				<v-card v-for="(item, index) in cardsProposals" :key="index" class="card-proposals" @click="$router.push('proposals-details')">
						<div class="side-bar">
							<v-icon>mdi-tray-arrow-up</v-icon>
							<span class="font300">
								Proposals ID: {{ item.proposals_id }}
							</span>
						</div>
						<div class="container-data-card">
							<div class="jspace mobile-col" style="width: 100%; height: max-content;">
								<div class="divcol">
									<span class="tstart" style="color: #939393;">Proposals type: {{ item.title_desc }}</span>
									<div class="divrow mt-1">
										<h5 style="color: #000;">{{ item.title }}</h5> <v-icon class="ml-2 icon">mdi-link</v-icon>
									</div>
								</div>	

								<div class="divcol jend aend mobile-left">
									<v-icon style="color: #8A5FA4; font-size: 45px;">mdi-dots-horizontal</v-icon>
									<span style="color: #8A5FA4;">{{ item.date }}</span>
								</div>
							</div>

							<hr class="mt-3 mb-3" style="width: 100%; border-bottom: 1px solid rgba(0,0,0,0.1); height: 1px;">

							<div class="jspace" style="width: 100%; height: max-content;">
								<div class="divcol">
									<span class="tstart" style="color: #939393;">Proposer</span>
									<span class="tstart" style="color: #000;">{{ item.near_id }}</span>
									<span class="tstart" style="color: #000;">BGeam</span>
								</div>

								<div class="mr-10 no-margin">
									<img src="@/assets/sources/images/approved.svg" alt="Approved" class="aprroved-failed-img">
								</div>
							</div>

							<div class="divcol" style="width: 100%; height: max-content;">
								<span class="tstart" style="color: #939393;">Description</span>
								<p class="tstart" style="color: #000;">
									{{ item.desc }}
								</p>
								<span class="tstart" style="color: #61C2D5;">
									{{ item.link }} <v-icon class="icon" color="#61C2D5">mdi-link</v-icon>
								</span>
							</div>

							<v-row>
								<v-col xl="2" lg="2" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393;">Amount</span>
									<div class="divrow jstart acenter" style="color: #000; gap: 8px;">
										{{ item.amount }} <img src="@/assets/sources/icons/near-icon.svg" alt="Near Icon" style="width: 20px;"> {{ item.currency }}
									</div>
								</v-col>
								<v-col xl="2" lg="2" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393;">Available Claims</span>
									<span class="tstart" style="color: #000;">{{ item.claims }}</span>
								</v-col>
								<v-col xl="2" lg="2" md="6" cols="6" class="divcol jstart">
									<span class="tstart" style="color: #939393;">Time to Complete</span>
									<span class="tstart" style="color: #000;">{{ item.time_complete }}</span>
								</v-col>
								<v-col cols="6" class="divrow jend acenter" style="gap: 10px; color: #000;">
									<img src="@/assets/sources/icons/like-icon.svg" alt="Like" style="width: 30px;"> {{ item.likes }} <img src="@/assets/sources/icons/dislike-icon.svg" alt="Dislike" style="width: 30px; margin-left: 10px;"> {{ item.dislikes }}
								</v-col>
							</v-row>
						</div>
				</v-card>
			</section>

			<section class="section3-proposals-details center divcol">
				<div style="width: 100%;" class="delete-mobile">
					<h5 class="tstart">
						Votes
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
						<span style="color: #e2e2e2;">Creating proposal</span>
						<span style="color: #e2e2e2;">Completed</span>
					</div>
				</div>

				<div class="container-dao-members-council mt-10">
					<v-row>
						<v-col xl="2" lg="2" md="2" cols="12" class="center jstart">
							<h6 class="mb-0 tstart" style="width: 100%;">
								Non DAO Members
							</h6>
						</v-col>

						<v-col xl="10" lg="10" md="10" cols="12">
							<div class="container-panel-expansion" @click="openToggle()">
								<span style="color: #e2e2e2; min-width: max-content;">
									{{ voices_left }} / {{ voices_goal }} voices
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
								<span>{{ item.name }}</span>
								<span>{{ item.date }}</span>
							</div>
						</v-col>
					</v-row>

					<v-row>
						<v-col xl="1" lg="1" md="1" cols="12" class="center jstart">
							<h6 class="mb-0 tstart" style="width: 100%;">
								Council
							</h6>
						</v-col>

						<v-col xl="11" lg="11" md="11" cols="12">
							<div class="container-panel-expansion" @click="openToggleCouncil()">
								<span style="color: #e2e2e2; min-width: max-content;">
									{{ council_left }} / {{ council_goal }} voices
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
					</v-row>
				</div>
			</section>
	</div>
</template>

<script>
import '@/assets/styles/pages/proposals-details.scss'
import like from '@/assets/sources/icons/like-icon.svg';
import dislike from '@/assets/sources/icons/dislike-icon.svg';

export default {
	data() {
		return{
			openVoice: false,
			openCouncil: false,
			voices_left: 0,
			voices_goal: 1,
			council_left: 3,
			council_goal: 4,
			percent_council: 75,
			cardsProposals:[
				{
					proposals_id: 1234,
					title_desc: 'AddBounty',
					title: 'Create a Bounty',
					date: 'Approved at: 31 August 2023',
					near_id: 'andresdom.near',
					desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eaque adipisci officia a. Vitae facilis quia minus numquam labore perspiciatis culpa odio totam eum, veniam fuga corrupti saepe temporibus dolore a voluptatem asperiores. Repellendus dignissimos doloribus optio eaque, ipsam id adipisci repellat atque? Praesentium repellendus pariatur reprehenderit deleniti ipsa dolores possimus velit nemo corporis optio cumque itaque officia qui nostrum suscipit delectus nulla labore quibusdam, vero, in quasi eos at? Beatae quos a laudantium ratione dignissimos perferendis quod, repudiandae nulla!',
					link: 'gov.near.org',
					amount: 777,
					currency: 'NEAR',
					claims: 222,
					time_complete: '3 Months',
					likes: 117,
					dislikes: 15,
				},					
			],

			dataLikes: [
				{icon: 'like'},
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
				{icon: 'like'},
			],

			iconMap: {
        like,
        dislike,
      },

			dataVoice: [
				{
					icon: 'mdi-vote',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},
			],

			dataCouncil:[
				{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-vote',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},
				{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},
				{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-vote',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},
			]
		}
	},

	methods: {
    openToggle() {
			this.openVoice = !this.openVoice
		},

		openToggleCouncil() {
			this.openCouncil = !this.openCouncil
		},
  },
}
</script>