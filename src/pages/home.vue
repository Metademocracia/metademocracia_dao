<template>
  <div id="home" class="center divcol" style="gap: 30px;">
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

    <section class="section2-home">
      <div class="member-container">
        <div class="divrow center mobile-div-member" style="gap: 20px;">
          <img src="@/assets/sources/images/members.svg" alt="Members" style="max-width: 80px;" class="member-img">
          <span style="font-weight: 700!important;">
            Miembros <br> <span style="font-size: 1.5rem;"> <span v-if="result">{{ result?.serie?.supply }}</span> </span>
          </span>
        </div>

        <div class="center divrow container-text-field-btn">
          <img src="@/assets/sources/images/search-near.svg" alt="Search Near Logo" class="pl-3">
          <v-text-field
            v-model="amount_near"
            id="amount_near"
            hide-details
            variant="solo"
            flat
            class="input-search"
          ></v-text-field>
          <v-btn
            class="btn-donar"
            style="font-weight: 700!important;"
            @click="delegate()"
          >Donar</v-btn>
        </div>

        <div class="divrow center" style="gap: 20px;">
          <v-icon color="#fff">mdi-magnify</v-icon>
          <v-icon color="#fff">mdi-instagram</v-icon>
          <v-icon color="#fff">mdi-share-variant</v-icon>
        </div>
      </div>

      <hr class="mt-8 mb-8" style="width: 100%; border-bottom: 1px solid #fff;">

      <span class="tcenter mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat ligula orci, ac imperdiet tortor cursus vitae. Nunc fringilla lacus vel tempus ultrices. Nulla facilisi. Donec rutrum posuere sollicitudin. Donec et quam sit amet mauris gravida volutpat. Sed volutpat dignissim nibh vitae interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed congue
      </span>
    </section>

    <v-row style="max-width: 1660px; width: 100%;">
      <v-col xl="8" lg="8" md="8" cols="12">
        <div class="wrapper-chart">
          <div class="jspace acenter mobile-col mb-8" style="width: 100%;">
            <h5 style="font-weight: 700!important;">
              Fondos DAO
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

          <!--<v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span style="font-weight: 700!important;">
                Fondos DAO
              </span>
              <v-sheet class="sheet-card">+ 12.34 %</v-sheet>
            </div>
            <h5 style="margin-bottom: 0;">
              777 USDC
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>-->

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
import ToastTitle from '@/components/toast-content/toast-title.vue';
import VueApexCharts from "vue3-apexcharts"
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import { ref, watch } from 'vue';
import moment from 'moment';
import graphQl from '@/services/graphQl';

const QUERY = gql`
  query MyQuery {
    serie(id: "1") {
      supply
    }

    delegation(id: "near") {
      total_amount
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
      amount_near: ref(null),
      delegation_near: ref(0),
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
        this.delegation_near = this.result?.delegation?.total_amount / 1000000000000000000000000;
      }
      return this.delegation_near.toFixed(2)
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
    delegate(){
      if(Number(this.amount_near)) {
        console.log("amount near: ", this.amount_near)
        const amount = (BigInt(this.amount_near.toString()) * BigInt("1000000000000000000000000")).toString()
        const deposit = (BigInt(amount) + BigInt("1000000000000000000000")).toString()

        const json = {
          contractId: process.env.CONTRACT_NFT,
          methodName: "delegate",
          args: {
            account_id: WalletP2p.getAccount().address,
            amount: amount
          },
          gas: "300000000000000",
          attachedDeposit: deposit
        };

        // 1000000000000000000000
        WalletP2p.call(json);
      } else {
        console.log("debe introducir un monto")
      }
    },

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


function anything() {
  toast.success({
    component: ToastTitle,
    props: {
      title: "Do anything",
      desc: "powered by CR7"
    }
  })
}
</script>
