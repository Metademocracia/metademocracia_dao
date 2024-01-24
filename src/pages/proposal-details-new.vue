<template>
	<div id="proposal-details">
		<toolbar title="Detalle de la Propuesta" />

		<proposal-card class="my-15" :proposal="proposal" />

		<slider-liked :data="dataLikes" />

		<v-expansion-panels v-model="panelsExpanded" class="mt-10 mb-6" multiple>
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
					<p v-if="!item.children.length" class="text-center">No hay registros</p>

					<v-sheet
						v-else
						v-for="(item2, i2) in item.children"
						:key="i2"
						class="sheet-flexbar"
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
						>
							<v-icon
								v-if="item2.state == true || item2.state == false"
								size="16"
								:class="[item2.state ? 'text-success' : 'text-error' ]"
							>{{ item2.state ? 'mdi-thumb-up' : 'mdi-thumb-down' }}</v-icon>

							<img v-else :src="voteIcon" style="width: 16px; height: 16px;">
						</v-btn>

						<aside class="sheet-flexbar__wrapper">
							<span>{{ item2.user }}</span>

							<span>{{ item2.date }}</span>
						</aside>
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
import WalletP2p from '../services/wallet-p2p';

const
	route = useRoute(),

proposal = ref(null),
dataLikes = ref(null),
panels = ref(null),
panelsExpanded = ref([])


onBeforeMount(getData)


function getData() {
	getProposal()
	// getPanels()
}

async function getProposal() {
	const response = await WalletP2p.view({
    contractId: route.query.dao,
    methodName: "get_proposal",
    args: {
      id: Number(route.query.id)
    }
  });

  const responsePolicy = await WalletP2p.view({
    contractId: route.query.dao,
    methodName: "get_policy",
  });

  console.log(response)

  console.log(responsePolicy.roles.filter((search) => search.name == 'all')[0])

  const item = response;

  const votes = Object.keys(item.vote_counts).map((map) => {return item.vote_counts[map]})
  let votesup = 0
  let votesdown = 0

  for(const vote of votes){
    console.log(vote[0])
    votesup += vote[0]
    votesdown += vote[1]
  }

  const type = typeof item.kind === "object" ? Object.keys(item.kind)[0] : item.kind;
  const objectProposal = typeof item.kind === "object" ? item.kind[type] : undefined;
  const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

  proposal.value = {
    id: item.id,
    contractId: route.query.dao,
    type,
    objectProposal,
    configMetadata,
    title: atob(item.title),
    date: null/*item.submission_time*/,
    proposer: item.proposer,
    description: atob(item.description),
    approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
    link: item.link,
    amount: null,
    claims: null,
    remainingTime: "una semana",
    likes: votesup,
    dislikes: votesdown,
  };


  /////////////////data panel/////////////////////////////////////////
  function formatChildrens(data) {
    return data.map((mapChild) => {
      return {
        user: mapChild.wallet,
        state: mapChild.action == "Approve"  /*"Reject"*/,
        /* date: "02 May 2023 22:56:28" */
      }
    });
  }

  panels.value = Object.keys(item.vote_counts).map((map) => {
    const walletVote = Object.keys(item.votes).map((mapWallet) => { return {wallet: mapWallet, action: item.votes[mapWallet] }})

    let childrens = [];
    let voices = "0/0";
		let percent = 0;
    if(map == "all") {
      const group = [];
      for(const role of responsePolicy.roles) {
        if(typeof role.kind === "object") {
          for(const itemGroup of role.kind.Group) {
            group.push(itemGroup)
          }
        }
      }
      const walletsGroup = group
      console.log("all: ", walletsGroup)

      const noMembers = walletVote.filter((itemMember) => !walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )
      const members = walletVote.filter((itemMember) => walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )
      const countVotes = item.vote_counts[map][0] + item.vote_counts[map][1] + item.vote_counts[map][2]

      if(noMembers.length < countVotes) {
        childrens = formatChildrens(members);
        voices = members.length + "/" + walletsGroup.length;
        percent = Number(((walletsGroup.length * 100) / members.length).toFixed(2));
      } else {
        childrens = formatChildrens(noMembers);
        voices = noMembers.length + "/" + walletsGroup.length;
        percent = Number(((walletsGroup.length * 100) / noMembers.length).toFixed(2));
      }
    } else {
      const walletsGroup = responsePolicy.roles.filter((search) => search.name == map)[0].kind.Group

      const members = walletVote.filter((itemMember) => walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )

      childrens = formatChildrens(members);
      voices = members.length + "/" + walletsGroup.length;
      percent = Number(((walletsGroup.length * 100) / members.length).toFixed(2));
    }

    return {
			title: map,
			voices,
			percent,
			children: childrens
		} // item.vote_counts[map]
  })

  /* panels.value = [
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
	]*/

	// set index of current elements
	panelsExpanded.value = panels.value.map((panel, index) => index)
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

	// set index of current elements
	panelsExpanded.value = panels.value.map((panel, index) => index)
}
</script>
