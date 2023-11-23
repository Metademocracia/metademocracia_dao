<template>
    <div id="funds" class="divcol center">
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

			<section class="section2-funds center">
				<div class="container-titles divrow acenter">
					<h5 class="mb-0 mr-8">Tokens</h5>
					<div class="divrow center" style="gap: 15px;">
						<div class="divcol jstart" style="gap: 5px;">
							<span class="tstart" style="color: #61C2D5; font-size: 12px; margin-bottom: 0px;">Nombre de cuenta DAO</span>
							<span class="tstart">{{ dao_account_name }}</span>
						</div>
						<v-divider vertical :thickness="1" class="border-opacity-50" style="color: rgba(#fff, 0.7);"></v-divider>
						<div class="divcol jstart" style="gap: 5px;">
							<span class="tstart" style="color: #61C2D5; font-size: 12px; margin-bottom: 0px;">Valor total</span>
							<span class="tstart">{{ total_value_computed }} USD</span>
						</div>
					</div>
					<div class="delete-mobile" style="width: 80px; height: 1px;"></div>
				</div>
			</section>

			<v-divider :thickness="1" class="delete-mobile border-opacity-50 mt-8 mb-8" style="width: 100%; color: rgba(#fff, 0.4);"></v-divider>

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
										<div class="jspace acenter mb-8 mobile-col" style="width: 100%;">
											<h5>
												Actividad
											</h5>

											<!--<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle> -->
										</div>
										<div class="apexchart-container">
											<apexchart type="area" :height="chartHeight" :options="chartOptionsNear" :series="seriesNear"></apexchart>
										</div>
									</div>
								</v-window-item>
								<v-window-item class="window-sparkline" :value="1">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8 mobile-col" style="width: 100%;">
											<h5>
												Actividad
											</h5>

											<!--<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle> -->
										</div>
										<div class="apexchart-container">
											<apexchart type="area" :height="chartHeight" :options="chartOptionsUsdt" :series="seriesUsdt"></apexchart>
										</div>
									</div>
								</v-window-item>
								<v-window-item class="window-sparkline" :value="2">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8 mobile-col" style="width: 100%;">
											<h5>
												Actividad
											</h5>

											<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle>
										</div>
										<div class="apexchart-container">
											<apexchart type="area" :height="chartHeight" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>
								</v-window-item>
								<v-window-item class="window-sparkline" :value="3">
									<div class="wrapper-chart">
										<div class="jspace acenter mb-8 mobile-col" style="width: 100%;">
											<h5>
												Actividad
											</h5>

											<v-btn-toggle v-model="toggle" style="background-color: transparent; border-radius: 0px!important;">
												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													7D
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1W
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1M
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													1Y
												</v-btn>

												<v-btn class="btn-toggle" style="background-color: transparent; border-radius: 5px!important;">
													ALL
												</v-btn>
											</v-btn-toggle>
										</div>
										<div class="apexchart-container">
											<apexchart type="area" :height="chartHeight" :options="chartOptions" :series="series"></apexchart>
										</div>
									</div>
								</v-window-item>
							</v-window>
						</v-col>
					</v-row>
			</section>

			<v-divider :thickness="1" class="delete-mobile border-opacity-50 mt-8 mb-8" style="width: 100%; color: rgba(#fff, 0.4);"></v-divider>

			<section class="section4-funds center mt-3">
				<v-row style="width: 100%;" class="radio-side-container">
					<v-col xl="3" lg="3" md="3" sm="12" cols="12" class="divrow-mobile">
						<div>
							<span>
								Elige un Filtro
							</span>
							<v-radio-group
								v-model="select_radio_buttons"
                v-for="(item, index) in typeTransaction" :key="index"
								hide-details
								class="mb-6"
                @change="loadTransactions()"
							>
                <v-radio :label="item.desc" class="radios mr-4" :value="item.id"></v-radio>
								<!--<v-radio label="Todos" class="radios mr-4" :value="1"></v-radio>
								<v-radio label="Recibidos" class="radios mr-4"	:value="2"></v-radio>
								<v-radio label="Enviados" class="radios mr-4"	:value="3"></v-radio>-->
							</v-radio-group>
						</div>
						<div>
							<label for="address">Filtrar por Wallet</label>
							<v-text-field
              v-model="address"
							id="address"
							class="input mt-6 mb-6"
							variant="solo"
							placeholder="address"
							append-inner-icon="mdi-magnify"
              @keyup="loadTransactions()"
							></v-text-field>
						</div>
					</v-col>
					<v-col align="center" xl="9" lg="9" md="9" sm="12" cols="12" class="divcol pl-14 no-padding">
						<v-select
							v-model="selectedOrderBy"
							:items="filterTableOrderBy"
              item-title="desc"
              item-value="id"
              variant="solo"
							flat
							menu-icon="mdi-chevron-down"
							class="select"
							bg-color="transparent"
							hide-details
							style="color: white;"
              onchange="loadTransactions()"
						></v-select>

						<div v-for="(item, index) in dataTransactions" :key="index" class="card-desc-votes">
							<div class="div-img" :class="{'purple-absolute' : item.icon == 'mdi-tray-arrow-down', 'red-absolute' : item.icon == 'mdi-tray-arrow-up'}">
								<v-icon>{{ item.icon }}</v-icon>
							</div>
							<span>{{ item.near }}</span>
							<span>{{ item.name.substring(0, 20) }}...</span>
							<span v-if="item.date">{{ item.date }} <v-icon color="#fff" style="transform: rotate(135deg); margin-top: -5px;">mdi-link</v-icon></span>
						</div>

						<v-pagination
							v-model="currentPage"
							:length="totalPages"
							:total-visible="5"
							size="small"
              @click="loadPage()"
						></v-pagination>
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
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import { ref, watch } from 'vue';
import axios from 'axios';
import moment from 'moment';
import graphQl from '@/services/graphQl'

const QUERY = gql`
  query MyQuery {
    serie(id: "1") {
      supply
    }

    delegations {
      total_amount
      id
    }

    delegationhists(where: {delegation_: {id: "NEAR"}}, orderBy: date_time, orderDirection: desc) {
      delegator
      amount
      date_time
    }

    proposaldata(id: "1") {
      proposal_actives
      proposal_total
    }
  }
`;

const QUERY_USDT = gql`
  query MyQuery {
    delegationhists(where: {delegation_: {id: "USDT"}}, orderBy: date_time, orderDirection: desc) {
      delegator
      amount
      date_time
    }
  }
`;

export default {
	components: {
    apexchart: VueApexCharts,
  },
	data() {
    const resultChartNear = useQuery(QUERY);
    const resultChartUsdt = useQuery(QUERY_USDT);
		return{
      resultChartNear,
      resultNear: ref(resultChartNear.result),
      resultChartUsdt,
      resultUsdt: ref(resultChartUsdt.result),
			currentPage: ref(1),
      cardsPerPage: ref(10),
			page: ref(1),
			selectedOrderBy: ref({id: "asc", desc: "Menos Recientes"}),
      filterTableOrderBy: ref([
        {id: "asc", desc: "Menos Recientes"},
        {id: "desc", desc: "Más Recientes"}
      ]),
			select_radio_buttons: ref("todos"),
			toggle: ref(0),
			windowStep: ref(0),
			dao_account_name: process.env.CONTRACT_DAO,
			total_value: ref(0),

			headerCards: ref([
				{
					icon: 'near',
					amount: 0,
					currency: 'NEAR',
					amount_usd: 0
				},
        {
					icon: 'usdt',
					amount: 0,
					currency: 'USDT',
					amount_usd: 0
				},
				/*{
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
				},*/
			]),

			iconMap: {
        near,
        stnear,
				usdc,
				usdt
      },
      seriesNear: ref(null),
      chartOptionsNear: ref(null),
      seriesUsdt: ref(null),
      chartOptionsUsdt: ref(null),
			dataTransactions: ref([]),
      transactions_list: ref([]),
      totalPages: ref(Math.ceil(0 / 0)),
      typeTransaction: ref([
        {id: "todos", desc: "Todos"},
        {id: "received", desc: "Recibidos"},
        {id: "transfer", desc: "Enviados"},
      ]),
      address: ref(null),

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

  watch: {
    resultNear(response) {
      this.loadChartNear(response);
    },
    resultUsdt(response) {
      this.loadChartUsdt(response);
    },
  },

	computed: {
    chartHeight() {
      return window.innerWidth < 690 ? '250px' : '450px';
    },
		/*totalPages() {
      return Math.ceil(this.dataTransactions.length / this.cardsPerPage);
    },
    displayedCards() {
      const startIndex = (this.currentPage - 1) * this.cardsPerPage;
      const endIndex = startIndex + this.cardsPerPage;
      return this.dataTransactions.slice(startIndex, endIndex);
    },*/
    total_value_computed() {
      if(this.resultChartNear.result) {
        const balanceUsdt = this.resultChartNear.result?.delegations?.find(item => item.id == "USDT")?.total_amount / 1000000;
        const balanceNear = this.resultChartNear.result?.delegations?.find(item => item.id == "NEAR")?.total_amount / 1000000000000000000000000;

        this.headerCards[0].amount = balanceNear.toFixed(5);
        this.headerCards[1].amount = balanceUsdt.toFixed(2);

        axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "NEAR"})
        .then((response) => {
          // console.log("balance: ", response)
          this.headerCards[0].amount_usd = Number((balanceNear * response.data[0].value).toFixed(2))
        }).catch((error) => {
          console.log("error balane: ", error)
        })

        axios.post(process.env.URL_APIP_PRICE,{fiat: "USD", crypto: "USDT"})
        .then((response) => {
          this.headerCards[1].amount_usd = Number((balanceUsdt * response.data[0].value).toFixed(2))
        }).catch((error) => {
          console.log("error balane: ", error)
        })

      }
      return (this.headerCards[0].amount_usd + this.headerCards[1].amount_usd).toFixed(2)
    },
  },

  mounted() {
    if(this.resultChartNear.result){
      if(this.resultChartNear.result.delegationhists) {
        this.loadChartNear(this.resultChartNear.result);
      }
    }
    if(this.resultChartUsdt.result){
      if(this.resultChartUsdt.result.delegationhists) {
        this.loadChartUsdt(this.resultChartUsdt.result);
      }
    }
    this.loadTransactions()
  },

  methods: {
    mapChart(response, asset) {
      const data_series = [];
      const data_chartOptions = [];

      for(let i = 0; i < response.delegationhists.length; i++){
        const divider = asset == "NEAR" ? 1000000000000000000000000 : 1000000;
        const amount = Number((response.delegationhists[i].amount / divider).toFixed(2))
        const epoch = response.delegationhists[i].date_time/1000000;

        data_series.push(amount);
        data_chartOptions.push(epoch);
      }

      let series = [ { name: 'series', data: data_series } ];

      let chartOptions = {
        tooltip: {
          theme: 'custom-tooltip',
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex][dataPointIndex];

            return '<div class="custom-tooltip-content">' +
              '<span>' + asset + value + '</span>' +
              '</div>';
          }
        },
        chart: { type: 'area', toolbar: { show:false } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 1 },
        xaxis: {
          type: 'datetime',
          categories: data_chartOptions,
          labels: { style: { colors: '#fff' } },
          tooltip: { enabled: false },
        },
        yaxis: {
          labels: { style: { colors: '#fff' } },
          axisBorder: { show: true },
        },
        grid: { show: false },
      };


      return { series, chartOptions };

    },

    loadChartNear(response) {
      if(response){
        if(response.delegationhists) {
          this.seriesNear = null;
          this.chartOptionsNear = null;

          const { series, chartOptions } = this.mapChart(response, 'NEAR');

          this.seriesNear = series;
          this.chartOptionsNear = chartOptions;
        }
      }
    },

    loadChartUsdt(response) {
      if(response){
        if(response.delegationhists) {
          this.seriesUsdt = null;
          this.chartOptionsUsdt = null;

          const { series, chartOptions } = this.mapChart(response, 'USDT');

          this.seriesUsdt = series;
          this.chartOptionsUsdt = chartOptions;
        }
      }
    },

    async loadTransactions() {
      let typeTransactions = this.typeTransaction.map(item => { return item.id }).splice(1, this.typeTransaction.length);
      typeTransactions = this.select_radio_buttons != 'todos' ? [this.select_radio_buttons] : typeTransactions;

      const query1 = `query MyQuery($typeTransactions: [String], $orderDirection: String) {
        fundshists(where: {type_in: $typeTransactions}, orderBy: date_time, orderDirection: $orderDirection ) {
          amount
          date_time
          id
          token_id
          type
          user_id
        }
      }`;

      const query2 = `query MyQuery($typeTransactions: [String], $address: String, $orderDirection: String) {
        fundshists(where: {type_in: $typeTransactions, user_id_contains_nocase: $address}, orderBy: date_time, orderDirection: $orderDirection ) {
          amount
          date_time
          id
          token_id
          type
          user_id
        }
      }`;

      const querys = !this.address ? query1 : query2;

      const variables = { typeTransactions, address: this.address, orderDirection: this.selectedOrderBy?.id };

      await graphQl.getQuery(querys, variables).then(response => {
        this.loadTransactionsTable(response.data.data.fundshists);
      });
    },

    loadTransactionsTable(response) {
      const dataTransactions = response.map((item) => {
        const epoch = item.date_time/1000000;

        return {
            near: (item.type == "received" ? '+ ' : '- ')+Number(item.amount).toFixed(2)+' '+item.token_id,
            icon: item.type == "received" ? 'mdi-tray-arrow-down' : 'mdi-tray-arrow-up',
            name: item.user_id,
            date: moment(epoch).format("DD MMM yyyy HH:mm:ss")
          };
      });

      // const startIndex = (this.currentPage - 1) * this.cardsPerPage;
      // const endIndex = startIndex + this.cardsPerPage;

      this.totalPages = Math.ceil(dataTransactions.length / this.cardsPerPage);
      this.transactions_list = dataTransactions;
      this.loadPage();
      // this.dataTransactions = dataTransactions.slice(startIndex, endIndex);

    },

    loadPage() {
      const startIndex = (this.currentPage - 1) * this.cardsPerPage;
      const endIndex = startIndex + this.cardsPerPage;

      this.dataTransactions = this.transactions_list.slice(startIndex, endIndex);
    },


  },
}
</script>
