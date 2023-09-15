<template>
  <div id="home" class="center divcol" style="gap: 30px;">
    <section>
      <v-carousel color="#DB107C" :show-arrows="false">
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
          <span>
            Members <br> <span style="font-size: 1.5rem;">{{ members }}</span>
          </span>
        </div>

        <div class="center divrow container-text-field-btn">
          <img src="@/assets/sources/images/search-near.svg" alt="Search Near Logo" class="pl-3">
          <v-text-field
           hide-details
           variant="solo"
           flat
           class="input-search"
          ></v-text-field>
          <v-btn class="btn-donar">Donar</v-btn>
        </div>

        <div class="divrow center" style="gap: 20px;">
          <v-icon color="#fff">mdi-magnify</v-icon>
          <v-icon color="#fff">mdi-instagram</v-icon>
          <v-icon color="#fff">mdi-share-variant</v-icon>
        </div>
      </div>

      <hr class="mt-8 mb-8" style="width: 100%; border-bottom: 1px solid #fff;">

      <span class="tcenter font300 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat ligula orci, ac imperdiet tortor cursus vitae. Nunc fringilla lacus vel tempus ultrices. Nulla facilisi. Donec rutrum posuere sollicitudin. Donec et quam sit amet mauris gravida volutpat. Sed volutpat dignissim nibh vitae interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed congue 
      </span>
    </section>

    <v-row style="max-width: 1660px; width: 100%;">
      <v-col xl="8" lg="8" md="8" cols="12">
        <div class="wrapper-chart">
          <div class="jspace acenter mobile-col mb-8" style="width: 100%;">
            <h5>
              DAO Funds
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
      </v-col>

      <v-col xl="4" lg="4" md="4" cols="12">
        <div class="container-multiple-charts">
          <v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span>
                DAO Funds
              </span>
              <v-sheet class="sheet-card">+ 12.34 %</v-sheet>
            </div>
            <h5 style="margin-bottom: 0;">
              777 USD
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>

          <v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span>
                Bounties
              </span>
              <v-sheet class="sheet-card">+ 12.34 %</v-sheet>
            </div>
            <h5 style="margin-bottom: 0;">
              777 USD
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>

          <v-card class="card-charts">
            <div class="jspace" style="width: 100%;">
              <span>
                NFTs
              </span>
              <v-sheet class="sheet-card">+ 12.34 %</v-sheet>
            </div>
            <h5 style="margin-bottom: 0;">
              77 USD
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
          </v-card>

          <v-card class="double-card-charts">
            <div class="jspace" style="width: 100%;">
              <span>
                Active Proposals
              </span>
              <v-sheet class="sheet-card">+ 12.34 %</v-sheet>
            </div>
            <h5 style="margin-bottom: 0;">
              888
            </h5>
            <apexchart type="area" :options="chartOptions2" :series="chartSeries2" height="100" style="margin-top: -40px;"/>
            <div class="jspace" style="width: 100%;">
              <span>
                Proposals in Total
              </span>
              <v-sheet class="sheet-card">+ 12.34 %</v-sheet>
            </div>
            <h5 style="margin-bottom: 0;">
              888
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


export default {
  components: {
    apexchart: VueApexCharts,
  },
  data(){
    return{
      members: 77,
      toggle: 0,

      series: [
        {
          name: 'series1',
          data: [100, 150, 138, 200, 248, 230, 180],
        }
      ],
      chartOptions: {
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
          categories: ["1 JUL", "2 JUL", "3 JUL", "4 JUL", "5 JUL", "6 JUL", "7 JUL "],
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
      },

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

  computed: {
    chartHeight() {
      return window.innerWidth < 690 ? '250px' : '450px';
    },
  },
}


function anything() {
  toast.success({
    component: ToastTitle,
    props: {
      title: "Do anything",
      desc: "powered by detextre4"
    }
  })
}
</script>
