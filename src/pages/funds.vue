<template>
  <div id="funds">
    <toolbar title="Tokens">
      <aside class="d-flex flex-center flex-grow-1" style="gap: 20px;">
        <div class="flex-column">
          <span>Nombre de cuenta DAO</span>
          <span>{{ dao_account_name }}</span>
        </div>

        <v-divider
          vertical
          thickness="1"
          style="height: 40px; opacity: .5; margin-block: auto;"
        />

        <div class="flex-column">
          <span>Valor total bloqueado</span>
          <span>{{ total_value_computed }} USD</span>
        </div>
      </aside>
    </toolbar>

    <v-divider thickness="1" class="my-6" style="opacity: .5;" />

    <aside class="controls">
      <v-card
        v-for="(item, i) in headerCards"
        :key="i"
        class="d-flex flex-center flex-grow-1"
        :class="{ active: i === windowStep }"
        height="80"
        color="#7758a4"
        elevation="3"
        style="max-width: 250px;"
        @click="windowStep = i"
      >
        <div class="d-flex justify-center align-start" style="gap: 8px;">
          <img
            :src="iconMap[item.icon]"
            :alt="item.icon_alt"
            style="--size: 25px; width: var(--size); height: var(--size);"
          >

          <div class="flex-column">
            <h5 class="mb-0">{{ item.amount ?? 0.00 }} {{ item.currency }}</h5>
            <span>{{ item.amount_usd }} USD</span>
          </div>
        </div>
      </v-card>
    </aside>


    <!--<v-window v-model="windowStep" class="container-chart mt-7">
      <div class="flex-space-center">
        <h6 class="mb-0">Actividad</h6>

        <v-btn-toggle v-model="toggle" style="border-radius: 0px!important; gap: 10px; height: max-content;">
          <v-btn
            v-for="(item, i) in dataToggle"
            :key="i"
            min-width="30"
            width="30"
            height="30"
            class="btn-toggle"
            style="background-color: #4056a1; border-radius: 5px !important;"
          >{{ item }}</v-btn>
        </v-btn-toggle>
      </div>


      <v-window-item class="mt-5" :value="0">
        <h6
          v-if="seriesNear && seriesNear[0].data.length < 4"
          class="text-center my-8"
        >No hay suficientes datos</h6>
        <apexchart v-else type="area" :height="chartHeight" :options="chartOptionsNear" :series="seriesNear" />
      </v-window-item>

      <v-window-item class="mt-5" :value="1">
        <h6
          v-if="seriesUsdt && seriesUsdt[0].data.length < 4"
          class="text-center my-8"
        >No hay suficientes datos</h6>
        <apexchart v-else type="area" :height="chartHeight" :options="chartOptionsUsdt" :series="seriesUsdt" />
      </v-window-item>
    </v-window> -->

    <v-divider thickness="1" class="my-6" style="opacity: .5;" />

    <div class="flex-space-center mb-3">
      <h5 class="mb-0">Transacciones</h5>

      <v-select
        v-model="selectedOrderBy"
        :items="filterTableOrderBy"
        item-title="desc"
        item-value="id"
        variant="solo"
        class="custom-select flex-grow-0"
        hide-details
        @update="loadTransactions"
      ></v-select>
    </div>

    <section id="funds__content">
      <!-- controls -->
      <sticky-drawer>
        <h6 class="mb-3">Elige un filtro</h6>

        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in typeTransaction"
            :key="i"
            min-height="30"
            class="clear-overlay pa-0"
            :ripple="false"
            @click="() => {
              select_radio_buttons = item.id
              loadTransactions()
            }"
          >
            <div class="custom-checkbox mr-2" style="--size: 10px" :class="{ active: select_radio_buttons === item.id }" />
            {{ item.desc }}
          </v-list-item>
        </v-list>

        <h6 class="mt-6 mb-2">Filtrar por billetera</h6>
        <v-text-field
          placeholder="andresdom.near"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
          @keyup="loadTransactions"
        ></v-text-field>
      </sticky-drawer>

      <!-- transactions -->
      <aside class="d-flex flex-column flex-grow-1" style="gap: 25px;">
        <h6 v-if="!dataTransactions.length" class="text-center">No hay transacciones asociadas</h6>

        <template v-else>
          <v-sheet
            v-for="(item, i) in dataTransactions"
            :key="i"
            class="sheet-flexbar"
          >
            <v-btn
              min-width="45"
              width="45"
              height="45"
              elevation="0"
              :class="[item.icon == 'mdi-tray-arrow-down' ? 'bg-tertiary-variant' : 'bg-primary-variant']"
            >
              <v-icon
                size="20"
              >{{ item.icon }}</v-icon>
            </v-btn>

            <aside class="sheet-flexbar__wrapper">
              <span>{{ item.near }}</span>
              <span>{{ item.name.substring(0, 20) }}...</span>
              <span v-if="item.date">
                {{ item.date }}
                <v-icon color="#fff" style="transform: rotate(135deg); margin-top: -5px;">mdi-link</v-icon>
              </span>
            </aside>
          </v-sheet>

          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
            class="mt-10 mb-16"
            @click="loadPage"
          ></v-pagination>
        </template>
      </aside>
    </section>
  </div>
</template>

<script>
import '@/assets/styles/pages/funds-new.scss'
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
			dao_account_name: process.env.CONTRACT_DAO,
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
        let balanceUsdt = this.resultChartNear.result?.delegations?.find(item => item.id == "USDT")?.total_amount / 1000000;
        let balanceNear = this.resultChartNear.result?.delegations?.find(item => item.id == "NEAR")?.total_amount / 1000000000000000000000000;
        console.log(balanceNear, isNaN(balanceNear), balanceUsdt, isNaN(balanceUsdt))
        balanceNear = !isNaN(balanceNear) ? balanceNear : 0;
        balanceUsdt = !isNaN(balanceUsdt) ? balanceUsdt : 0;

        console.log("aqui va: ", balanceUsdt, this.resultChartNear.result)

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
      console.log(dataTransactions, "⭕");

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
