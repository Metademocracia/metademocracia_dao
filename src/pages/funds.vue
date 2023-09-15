<template>
    <div id="funds" class="divcol center">
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

			<section class="section2-funds center">
				<div class="container-titles divrow acenter">
					<h5 class="mb-0 mr-8">Tokens</h5>
					<div class="divrow center" style="gap: 15px;">
						<div class="divcol jstart" style="gap: 5px;">
							<span class="tstart" style="color: #61C2D5; font-size: 12px; margin-bottom: 0px;">DAO Account Name</span>
							<span class="tstart">{{ dao_account_name }}</span>
						</div>
						<v-divider vertical :thickness="1" class="border-opacity-50" style="color: rgba(#fff, 0.7);"></v-divider>
						<div class="divcol jstart" style="gap: 5px;">
							<span class="tstart" style="color: #61C2D5; font-size: 12px; margin-bottom: 0px;">Total Value Locked</span>
							<span class="tstart">{{ total_value }} USD</span>
						</div>
					</div>
					<div class="delete-mobile" style="width: 80px; height: 1px;"></div>
				</div>
			</section>

			<v-divider :thickness="1" class="border-opacity-50 mt-8 mb-8" style="width: 100%; color: rgba(#fff, 0.4);"></v-divider>

			<section class="section3-funds center">
					<v-row style="width: 100%;">
						<v-col v-for="(item, index) in headerCards" :key="index" xl="3" lg="3" md="6" sm="6" cols="12">
							<v-card 
							class="card-header-funds" 
							:class="{'first-element': index === 0 && windowStep == 0,
							'second-element': index === 1 && windowStep == 1,
							'third-element': index === 2 && windowStep == 2, 
							'fourth-element': index === 3 && windowStep == 3}"
							@click="windowStep = index"
							> 
								<img :src="iconMap[item.icon]" :alt="item.icon_alt" style="width: 25px;">
								<div class="divcol jstart">
									<span style="font-size: 1.3rem;" class="jstart">
										{{ item.amount }} {{ item.currency }}
									</span>
									<span style="font-size: .8rem; color: #D1D1D1;" class="jstart">
										{{ item.amount_usd }} USD
									</span>
								</div>
							</v-card>
						</v-col>
					</v-row>

					<v-row style="width: 100%;" class="mt-10">
						<v-col cols="12">
							<v-window v-model="windowStep" touchless>
								<v-window-item class="window-sparkline" :value="0">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8" style="width: 100%;">
											<h5>
												Activity
											</h5>

											<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle>
										</div>
										<div class="apexchart-container">
											<apexchart type="area" height="450" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>
								</v-window-item>
								<v-window-item class="window-sparkline" :value="1">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8" style="width: 100%;">
											<h5>
												Activity
											</h5>

											<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle>
										</div>
										<div class="apexchart-container">
											<apexchart type="area" height="450" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>
								</v-window-item>
								<v-window-item class="window-sparkline" :value="2">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8" style="width: 100%;">
											<h5>
												Activity
											</h5>

											<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle>
										</div>
										<div class="apexchart-container">
											<apexchart type="area" height="450" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>
								</v-window-item>
								<v-window-item class="window-sparkline" :value="3">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8" style="width: 100%;">
											<h5>
												Activity
											</h5>

											<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle>
										</div>
										<div class="apexchart-container">
											<apexchart type="area" height="450" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>
								</v-window-item>
							</v-window>
						</v-col>
					</v-row>
			</section>

			<v-divider :thickness="1" class="border-opacity-50 mt-8 mb-8" style="width: 100%; color: rgba(#fff, 0.4);"></v-divider>

			<section class="section4-funds center">
				<v-row style="width: 100%;" class="radio-side-container">
					<v-col xl="3" lg="3" md="3" sm="12" cols="12">
						<span>
							Choose a filter
						</span>
						<v-radio-group
							v-model="radio_buttons"
							hide-details
							class="mb-6"
						>
							<v-radio label="All" class="radios mr-4" :value="1"></v-radio>
							<v-radio label="Recivied" class="radios mr-4"	:value="2"></v-radio>
							<v-radio label="Sent" class="radios mr-4"	:value="3"></v-radio>
						</v-radio-group>
						<label for="proposer">Filter by wallet</label>
						<v-text-field
						id="proposer"
						class="input mt-6 mb-6"
						variant="solo"
						placeholder="andresdom.near"
						append-inner-icon="mdi-magnify"
						></v-text-field>
					</v-col>
					<v-col align="center" xl="9" lg="9" md="9" sm="12" cols="12" class="divcol pl-14">
						<v-select
							v-model="selected"
							:items="['Less Recent', 'Last Recent']"
							variant="solo"
							flat
							menu-icon="mdi-chevron-down"
							class="select"
							bg-color="transparent"
							hide-details
							style="color: white;"
						></v-select>

						<div v-for="(item, index) in dataTransactions" :key="index" class="card-desc-votes">
							<div class="div-img" :class="{'purple-absolute' : item.icon == 'mdi-tray-arrow-down', 'red-absolute' : item.icon == 'mdi-tray-arrow-up'}">
								<v-icon>{{ item.icon }}</v-icon>
							</div>
							<span>{{ item.near }}</span>
							<span>{{ item.name }}</span>
							<span v-if="item.date">{{ item.date }} <v-icon color="#fff" style="transform: rotate(135deg); margin-top: -5px;">mdi-link</v-icon></span>
						</div>
					</v-col>
				</v-row>
			</section>
    </div>
</template>

<script>
import '@/assets/styles/pages/funds.scss'
import near from '@/assets/sources/icons/near-icon.svg';
import stnear from '@/assets/sources/icons/stnear-icon.svg';
import usdc from '@/assets/sources/icons/usdc-icon.svg';
import usdt from '@/assets/sources/icons/tether-icon.svg';
import VueApexCharts from "vue3-apexcharts"

export default {
	components: {
    apexchart: VueApexCharts,
  },
	data() {
		return{
			selected: 'Less Recent',
			radio_buttons: 1,
			toggle: 0,
			windowStep: 0,
			dao_account_name: 'metademocracia.near',
			total_value: '10,350.22',

			headerCards:[
				{
					icon: 'near',
					amount: '1234.87',
					currency: 'NEAR',
					amount_usd: '3456.878'
				},
				{
					icon: 'stnear',
					amount: '1234.87',
					currency: 'STNEAR',
					amount_usd: '3456.878'
				},
				{
					icon: 'usdc',
					amount: '1234.87',
					currency: 'USDC',
					amount_usd: '3456.878'
				},
				{
					icon: 'usdt',
					amount: '1234.87',
					currency: 'USDT',
					amount_usd: '3456.878'
				},
			],

			iconMap: {
        near,
        stnear,
				usdc,
				usdt
      },

			series: [
        {
          name: 'series1',
          data: [100, 150, 138, 200, 248, 230, 180],
        }
      ],
      chartOptions: {
        chart: {
          height: 450,
          type: 'area',
          toolbar: {
            show:false,
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 1,
        },
        xaxis: {
          type: 'datetime',
          categories: ["1 JUL", "2 JUL", "3 JUL", "4 JUL", "5 JUL", "6 JUL", "7 JUL "],
          labels: {
            style: {
              colors: '#fff', 
            },
          },
        },

        yaxis: {
          labels: {
            style: {
              colors: '#fff', 
            },
          },

          axisBorder: {
            show: true,
          },
        },
        
        grid: {
          show: false,
          
        },
      },
			dataTransactions: [
				{	near: '+ 1.78 NEAR',icon: 'mdi-tray-arrow-down',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 11.78 NEAR',icon: 'mdi-tray-arrow-up',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 1.78 NEAR',icon: 'mdi-tray-arrow-down',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 31.78 NEAR',icon: 'mdi-tray-arrow-up',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 11.78 NEAR',icon: 'mdi-tray-arrow-up',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 41.78 NEAR',icon: 'mdi-tray-arrow-down',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 11.78 NEAR',icon: 'mdi-tray-arrow-up',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 1.78 NEAR',icon: 'mdi-tray-arrow-down',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
				{	near: '+ 1.78 NEAR',icon: 'mdi-tray-arrow-up',name: 'pruebavotar.near',date: '02 May 2023 22:56:28'},
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