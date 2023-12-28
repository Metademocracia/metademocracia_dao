<template>
  <div id="home">
    <hr class="mt-8 mb-8" style="width: 100%; border-bottom: 1px solid #fff;">

    <span class="tcenter mb-8">
      Tu voz importa. Levantarla depende de ti. Esta es una revolución en política que se empodera gracias a las nuevas tecnologías de la web3. Los ciudadanos tienen un papel activo en la formación de políticas y proyectos, lo que fortalece su sentido de pertenencia y empoderamiento en la sociedad.
    </span>

    <v-row style="max-width: 1660px; width: 100%;">
      <v-col xl="8" lg="8" md="8" cols="12">
        <div class="wrapper-chart">
          <div class="jspace acenter mobile-col mb-8" style="width: 100%;">
            <h5 style="font-weight: 700!important;">
              Fondos NEAR DAO
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
            </v-btn-toggle>-->
          </div>
          <div class="apexchart-container">
            <apexchart type="area" :height="chartHeight" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <div class="container-multiple-charts">
          <v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span style="font-weight: 700!important;">
                Fondos DAO
              </span>
              <!--<v-sheet class="sheet-card">+ 12.34 %</v-sheet>-->
            </div>
            <h5 style="margin-bottom: 0;">
              {{ delegationNear }} NEAR
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>

          <v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span style="font-weight: 700!important;">
                Fondos DAO
              </span>
              <!--<v-sheet class="sheet-card">+ 12.34 %</v-sheet>-->
            </div>
            <h5 style="margin-bottom: 0;">
              {{ delegationUsdt }} USDT
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>

          <v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span style="font-weight: 700!important;">
                NFTs
              </span>
              <!--<v-sheet class="sheet-card">+ 12.34 %</v-sheet>-->
            </div>
            <h5 style="margin-bottom: 0;">
              {{ result?.serie?.supply }}
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>

          <v-card class="double-card-charts">
            <div class="jspace" style="width: 100%;">
              <span style="font-weight: 700!important;">
                Propuestas Activas
              </span>
              <!--<v-sheet class="sheet-card">+ 12.34 %</v-sheet>-->
            </div>
            <h5 style="margin-bottom: 0;">
              {{ result?.proposaldata?.proposal_actives }}
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
            <div class="jspace" style="width: 100%;">
              <span style="font-weight: 700!important;">
                Propuestas Totales
              </span>
              <!--<v-sheet class="sheet-card">+ 12.34 %</v-sheet>-->
            </div>
            <h5 style="margin-bottom: 0;">
              {{ result?.proposaldata?.proposal_total }}
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import '@/assets/styles/pages/home.scss'
import VueApexCharts from "vue3-apexcharts"
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import { ref } from 'vue';
// import moment from 'moment';
// import graphQl from '@/services/graphQl';

const QUERY = gql`
  query MyQuery {
    serie(id: "1") {
      supply
    }

    delegations {
      total_amount
      id
    }

    delegationhists(orderBy: date_time, orderDirection: asc) {
      amount
      date_time
    }

    proposaldata(id: "1") {
      proposal_actives
      proposal_total
    }
  }
`;

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup(){

    const { result, loading,  error } = useQuery(QUERY);

    return{
      result,
      loading,
      error,
      toggle: ref(0),
      delegation_near: ref(0),
      delegation_usdt: ref(0),
      series: ref(null),
      chartOptions: ref(null),

      chartSeries2: [
        {
          name: 'Series 1',
          data: [30, 40, 45, 50, 20, 49, 87, 67, 100]
        }
      ],

      chartOptions2: {
        tooltip: {
          theme: 'custom-tooltip',
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex][dataPointIndex];

            return '<div class="custom-tooltip-content">' +
              '<span>' + '$' + value + '</span>' +
              '</div>';
          }
        },
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2,
          fill: false
        },
        colors: ['#fff'],
        xaxis: {
          tooltip: {
            enabled: false,
          },
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        grid: {
          show: false
        }
      }
    }
  },

  watch: {
    result(response) {
      this.loadChart(response);
    }
  },

  computed: {
    chartHeight() {
      return window.innerWidth < 690 ? '250px' : '450px';
    },
    delegationNear() {
      if(this.result) {
        this.delegation_near = this.result?.delegations?.find(item => item.id == "NEAR")?.total_amount / 1000000000000000000000000;
      }
      return isNaN(this.delegation_near) ? 0.00 : this.delegation_near.toFixed(2);
    },
    delegationUsdt() {
      if(this.result) {
        this.delegation_usdt = this.result?.delegations?.find(item => item.id == "USDT")?.total_amount / 1000000;
      }
      return this.delegation_usdt.toFixed(2)
    },
  },

  mounted() {
    if(this.result){
      if(this.result.delegationhists) {
        this.loadChart(this.result);
      }
    }
  },

  methods: {

    loadChart(response) {
      if(response){
        if(response.delegationhists) {
          this.series = null;
          this.chartOptions = null;

          const data_series = [];
          for(let i = 0; i < response.delegationhists.length; i++){
            data_series.push(Number((response.delegationhists[i].amount / 1000000000000000000000000).toFixed(2)))
          }

          let series = [
            {
              name: 'series1',
              data: data_series, // [100, 150, 138, 200, 248, 230, 180],
            }
          ];


          const data_chartOptions = [];
          for(let i = 0; i < response.delegationhists.length; i++){
            // data.push(moment(this.result.delegationhists[i].date_time/1000000).format('DD MM HH:MM'))
            data_chartOptions.push(response.delegationhists[i].date_time/1000000)
          }

          let chartOptions = {
            tooltip: {
              theme: 'custom-tooltip',
              custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const value = series[seriesIndex][dataPointIndex];

                return '<div class="custom-tooltip-content">' +
                  '<span>' + '$' + value + '</span>' +
                  '</div>';
              }
            },
            chart: {
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
              categories: data_chartOptions, // ["1 JUL", "2 JUL", "3 JUL", "4 JUL", "5 JUL", "6 JUL", "7 JUL "],
              labels: {
                style: {
                  colors: '#fff',
                },
              },
              tooltip: {
                enabled: false,
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
          };


          this.series = series;
          this.chartOptions = chartOptions;

        }
      }

    }
  },
}
</script>
