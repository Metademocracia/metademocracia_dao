<template>
	<div id="proposal-details">
		<toolbar title="Detalle de la Propuesta" />

		<proposal-card class="my-15" :proposal="proposal" />

		<slider-liked :data="dataLikes" />

		<v-expansion-panels class="mt-10 mb-6" multiple>
			<v-expansion-panel v-for="(item, i) in panels" :key="i">
				<v-expansion-panel-title class="clear-overlay">
					<h5 class="mb-0">{{ item.title }}</h5>

					<template #actions="{ expanded }">
						<span>{{ item.voices }} voices</span>
						<v-divider
							thickness="1"
							vertical
							class="mx-4"
							style="height: 70%; margin-block: auto; opacity: .5;"
						/>
						<span v-if="item.percent" class="mr-4">{{ item.percent }} %</span>

						<v-slider
							v-model="item.percent"
							readonly
							rounded
							track-color="#D1D1D1"
							track-fill-color="rgb(var(--v-theme-primary))"
							track-size="7"
							density="default"
							thumb-size="0"
							hide-details
						/>

						<v-icon class="text-primary" size="25">
							{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
						</v-icon>
					</template>
				</v-expansion-panel-title>


				<v-expansion-panel-text>
					<v-sheet
						v-for="(item2, i2) in item.children"
						:key="i2"
						height="38"
						color="#8564AB"
						class="d-flex"
						style="border-radius: 5px;"
					>
						<v-btn
							min-width="38"
							width="38"
							elevation="0"
							:class="[
								item2.state == true ? 'bg-success-variant'
								: item2.state == false ? 'bg-error-variant'
								: 'bg-tertiary-variant'
							]"
							style="border-radius: 5px !important;"
						>
							<v-icon
								v-if="item2.state == true || item2.state == false"
								size="16"
								:class="[item2.state ? 'text-success' : 'text-error' ]"
							>{{ item2.state ? 'mdi-thumb-up' : 'mdi-thumb-down' }}</v-icon>

							<img v-else :src="voteIcon" style="width: 16px;">
						</v-btn>

						<div class="flex-grow-1 d-flex flex-space-center flex-wrap px-5" style="gap: 20px;">
							<span>{{ item2.user }}</span>

							<span>{{ item2.date }}</span>
						</div>
					</v-sheet>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script setup>
import '@/assets/styles/pages/proposal-details-new.scss'
import voteIcon from '@/assets/sources/icons/vote-icon.svg'
import ProposalCard from '@/components/proposal-card.vue'
import SliderLiked from '@/components/slider-liked.vue'
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
const
	route = useRoute(),

proposal = ref(null),
dataLikes = ref(null),
panels = ref(null)


onBeforeMount(getData)


function getData() {
	getProposal()
	getPanels()
}

function getProposal() {
	proposal.value = {
		id: route.query.id,
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
	}
}

function getPanels() {
	panels.value = [
		{
			title: "Non DAO members",
			voices: "0/1",
			percent: 0,
			children: [
				{ user: "pruebavotar.near" },
				{
					user: "pruebavotar.near",
					state: false,
					date: "02 May 2023 22:56:28"
				},
			]
		},
		{
			title: "Council",
			voices: "3/4",
			percent: 75,
			children: [
				{
					user: "pruebavotar.near",
					state: true,
					date: "02 May 2023 22:56:28"
				},
				{
					user: "pruebavotar.near",
					state: false,
					date: "02 May 2023 22:56:28"
				},
			]
		},
	]
}
</script>