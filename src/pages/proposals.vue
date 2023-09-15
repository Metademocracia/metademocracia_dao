<template>
    <div id="proposals" class="center divcol">
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

			<section class="section2-proposals center">
				<div class="container-radios divrow acenter col-mobile">
					<h5 class="mb-0 mr-8">Proposals</h5>
					<v-radio-group
						v-model="radio_buttons"
						inline
						hide-details
					>
						<v-radio label="All" class="radios mr-4" :value="1"></v-radio>
						<v-radio label="Fuctions Calls" class="radios mr-4"	:value="2"></v-radio>
						<v-radio label="Governance" class="radios mr-4"	:value="3"></v-radio>
						<v-radio label="Transfers" class="radios mr-4"	:value="4"></v-radio>
						<v-radio label="Bounties" class="radios mr-4"	:value="5"></v-radio>
						<v-radio label="Members" class="radios mr-4"	:value="6"></v-radio>
						<v-radio label="Polls" class="radios mr-4" :value="7"></v-radio>
					</v-radio-group>
				</div>
			</section>

			<hr style="width: 100%; border-bottom: 1px solid rgba(255,255,255,0.4); height: 1px;">
			
			<v-row style="width: 100%;" class="radio-side-container">
				<v-col xl="3" lg="3" md="3" sm="12" cols="12" class="divrow-mobile">
					<div>
						<span>
							Choose a filter
						</span>
						<v-radio-group
							v-model="radio_buttons2"
							hide-details
							class="mb-6"
						>
							<v-radio label="All" class="radios mr-4" :value="1"></v-radio>
							<v-radio label="Active" class="radios mr-4"	:value="2"></v-radio>
							<v-radio label="Approved" class="radios mr-4"	:value="3"></v-radio>
							<v-radio label="Popular" class="radios mr-4"	:value="4"></v-radio>
							<v-radio label="Failed" class="radios mr-4"	:value="5"></v-radio>
						</v-radio-group>
					</div>
					<div>
						<label for="proposer">Filter by proposer</label>
						<v-text-field
						id="proposer"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="andresdom.near"
						append-inner-icon="mdi-magnify"
						></v-text-field>

						<label for="categoria">Filter by Categoria</label>
						<v-text-field
						id="categoria"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="Lorem Ipsum"
						append-inner-icon="mdi-magnify"
						></v-text-field>
					</div>
				</v-col>
				<v-col align="center" xl="9" lg="9" md="9" sm="12" cols="12">
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
				</v-col>
			</v-row>
    </div>
</template>

<script>
import '@/assets/styles/pages/proposals.scss'

export default {
  data(){
    return{
			radio_buttons: 1,
			radio_buttons2: 2,

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
				{
					proposals_id: 1235,
					title_desc: 'Transfer',
					title: 'Transfer',
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
				{
					proposals_id: 1236,
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
			]
    }
  }
}
</script>