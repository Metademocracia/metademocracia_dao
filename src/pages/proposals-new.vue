<template>
  <div id="proposals">
    <toolbar title="Proposals">
      <v-tabs v-model="tab" slider-color="transparent">
        <v-tab v-for="(item, i) in tabs" :key="i">
          <div class="custom-checkbox mr-2" :class="{ active: tab == i }" />
          {{ item }}
        </v-tab>
      </v-tabs>
    </toolbar>

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
          <proposal-card
            v-for="(item, i) in proposals" :key="i" 
            :proposal="item"
          />
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
import ProposalCard from '@/components/proposal-card.vue'
import { ref } from 'vue'

export default {
  components: { ProposalCard },
  setup() {
    return {
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
