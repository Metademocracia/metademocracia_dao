<template>
  <div id="proposals">
    <aside class="toolbar">
      <div class="toolbar__wrapper">
        <h5 class="mb-0">Proposals</h5>

        <v-tabs v-model="tab" slider-color="transparent">
          <v-tab v-for="(item, i) in tabs" :key="i">
            <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>
    </aside>

    <v-divider thickness="1.5" color="#fff" class="my-4" style="opacity: .5 !important;" />

    <section id="proposals__content">
      <!-- controls -->
      <aside class="controls" :class="{ active: showFilters }">
        <v-btn
          class="show-filters-btn"
          :class="{ active: showFilters }"
          @click="showFilters = !showFilters"
        >
          <v-icon>mdi-filter</v-icon>
          <v-icon>
            {{ showFilters ? 'mdi-chevron-left' : 'mdi-chevron-right' }}
          </v-icon>
        </v-btn>

        <h6 class="mb-3">Choose a filter</h6>

        <v-list density="compact">
          <v-list-item
            v-for="(item, i) in filters"
            :key="i"
            min-height="30"
            class="clear-overlay pa-0"
            :ripple="false"
            @click="filter = item.value"
          >
            <div class="custom-checkbox mr-2" style="--size: 10px" :class="{ active: filter == item.value }" />
            {{ item.name }}
          </v-list-item>
        </v-list>

        <h6 class="mt-6 mb-2">Filter by proposer</h6>
        <v-text-field
          placeholder="andresdom.near"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
        ></v-text-field>

        <h6 class="mt-6 mb-2">Filter by category</h6>
        <v-text-field
          placeholder="lorem ipsum"
          append-inner-icon="mdi-magnify"
          class="flex-grow-0"
          variant="solo"
          hide-details
        ></v-text-field>
      </aside>


      <!-- proposals -->
      <section class="flex-grow-1">
        <div class="proposals">
          <v-sheet v-for="(item, i) in proposals" :key="i" elevation="3">
            <v-card class="vertical-toolbar clear-overlay" @click="console.log('do anything')">
              <span>Proposals ID:{{ item.id }}</span>
              <img src="@/assets/sources/icons/leave.svg" alt="leave icon" style="width: 20px;">
            </v-card>
  
            <v-card class="flex-column" elevation="3" color="#FAFAFA">
              <v-card-title class="flex-column pa-0" style="gap: 20px; overflow: visible;">
                <div class="flex-space-center">
                  <label>Proposal type: {{ item.type }}</label>
                  
                  <v-btn icon color="transparent" elevation="0" size="30" class="relative clear-overlay" :ripple="false">
                    <v-icon
                      class="text-tertiary"
                      icon="mdi-dots-horizontal"
                      size="50"
                      style="translate: 0 -10px;"
                    />
                  </v-btn>
                </div>

                <div class="flex-space-center flex-wrap">
                  <v-btn
                    :text="item.title"
                    append-icon="mdi-link"
                    class="title-linked px-0"
                  />

                  <span class="text-tertiary ml-auto" style="--fs: 14px">Approved at: {{ item.date }}</span>
                </div>
              </v-card-title>
              
              <hr class="my-3">

              <v-card-text class="pa-0 pr-1 d-flex flex-column">
                <div class="card__content">
                  <img
                    :src="item.approved ? approvedIcon : failedIcon"
                    :alt="item.approved ? 'proposal approved' : 'proposal failed'"
                    class="mr-5"
                    style="width: 100px; height: 100px; float: right;"
                  >

                  <p class="label mb-2">Proposer</p>
                  <p>{{ item.proposer }}</p>

                  <p class="label mb-2">Description</p>
                  <p class="ellipsis-box" style="--lines: 6">{{ item.description }}</p>
                </div>

                <a href="" target="_blank" class="mb-4">
                  <v-icon icon="mdi-link" size="20" class="text-secondary" style="rotate: -45deg;" />
                  gov.near.org
                </a>

                <div class="card__bottom flex-space-center mt-auto" style="gap: clamp(20px, 3vw, 40px);">
                  <aside class="flex-grow-1 d-flex flex-wrap flex-spacee justify-start" style="gap: clamp(20px, 3vw, 40px);">
                    <div class="flex-column" style="gap: 10px;">
                      <label>Amount</label>
                      <span class="flex-center" style="gap: 4px;">
                        {{ item.amount }}
                        <img
                          src="@/assets/sources/logos/near-icon.svg"
                          alt="near logo"
                          style="width: 15px; height: 15px; translate: 0 -1px;"
                        >
                        NEAR
                      </span>
                    </div>

                    <div class="flex-column" style="gap: 10px;">
                      <label>Available Claims</label>
                      <span>{{ item.claims }}</span>
                    </div>

                    <div class="flex-column" style="gap: 10px;">
                      <label>Time to Complete</label>
                      <span>{{ item.remainingTime }}</span>
                    </div>
                  </aside>

                  <aside class="flex-center" style="gap: 20px;">
                    <div class="flex-center" style="gap: 10px;">
                      <v-btn icon color="#EEE6F1" elevation="0" size="29">
                        <v-icon icon="mdi-thumb-up" color="#DC7AAB" size="15" />
                      </v-btn>

                      <span>{{ item.likes }}</span>
                    </div>

                    <div class="flex-center" style="gap: 10px;">
                      <v-btn icon color="#EEE6F1" elevation="0" size="29">
                        <v-icon icon="mdi-thumb-down" color="#DC7AAB" size="15" />
                      </v-btn>

                      <span>{{ item.dislikes }}</span>
                    </div>
                  </aside>
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>
        </div>

        <v-pagination
          v-model="page"
          class="mt-10 mb-16"
          :length="paginatedProposals"
        ></v-pagination>
      </section>
    </section>
  </div>
</template>

<script>
import '@/assets/styles/pages/proposals-new.scss'
import ApprovedIcon from '@/assets/sources/images/approved.svg'
import FailedIcon from '@/assets/sources/images/failed.svg'
import { ref } from 'vue'

export default {
  setup() {
    const
      approvedIcon = ApprovedIcon,
      failedIcon = FailedIcon

    return {
      approvedIcon,
      failedIcon,
      tab: ref(0),
      tabs: ["All", "Function Calls", "Governance", "Transfers", "Bounties", "Members", "Polls"],
      showFilters: ref(false),
      filter: ref('all'),
      filters: [
        {
          name: "All",
          value: "all"
        },
        {
          name: "Active",
          value:"active"
        },
        {
          name: "Approved",
          value: "approved"
        },
        {
          name: "Popular",
          value: "popular"
        },
        {
          name: "Failed",
          value: "failed"
        }
      ],
      proposals: ref([]),
      page: ref(1),
    }
  },
  computed: {
    paginatedProposals() {
      return (this.proposals.length || 3) / 3
    }
  },
  beforeMount() {
    this.getData()
  },
  methods: {
    getData() {
      for (let i = 0; i < 3; i++) {
        this.proposals.push({
          id: 324,
          type: "AddBounty",
          title: "Create a Bounty",
          date: "32 August 2023",
          proposer: "andresdom.near\n BGeam",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis accumsan urna ac placerat. Ut scelerisque eu ligula ac rhoncus. Aliquam sagittis sapien sit amet libero ultricies varius. Curabitur ac ligula ultricies, semper ipsum nec, auctor sapien. Etiam nec sem ac mauris imperdiet rutrum. Sed mi dui, mattis vel ipsum eget, dictum interdum augue. Donec mollis congue enim quis dignissim. Ut egestas dolor at mauris suscipit dictum. Quisque at sollicitudin dolor. Mauris id auctor dui. Duis velit ante, hendrerit in diam vel, tincidunt rutrum lacus. Morbi pulvinar efficitur efficitur. Quisque faucibus purus nec dolor convallis scelerisque. Mauris vitae viverra quam.",
          approved: true,
          amount: 7777,
          claims: 280,
          remainingTime: "3 months",
          likes: 111,
          dislikes: 112,
        })
      }
    }
  }
}
</script>
