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
						<span>{{ item.voices }} votantes</span>
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
							<span style="word-break: break-all;">{{ item2.user }}</span>

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
import graphQl from '@/services/graphQl';
import moment from 'moment';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import WalletP2p from '../services/wallet-p2p';
import variables from '@/mixins/variables';

const
	route = useRoute(),
  { globalRules, groupsDefaults, groupAllDefault, groupDefault, proposalKind } = variables,
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
  const query = `query MyQuery($contractId: String, $walletcontract: String, $userId: String) {
    dao(id: $walletcontract) {
      proposal_period
    }

    proposal(id: $contractId) {
      description
      contract_id
      creation_date
      approval_date
      id
      kind
      link
      proposal_id
      proposer
      status
      title
      upvote
      downvote
      submission_time
      vote(where: {user_id: $userId}) {
        vote
      }
    }
  }`;

  const variables = {
    contractId: route.query.dao + "|" + route.query.id,
    walletcontract: route.query.dao,
    userId: await WalletP2p.getAccountId(),
  }

  await graphQl.getQueryDaoV2(query, variables).then(async response => {
    const item = response.data.data.proposal
    const dao = response.data.data.dao
    // console.log("aqui si va: ", item)

    let kind;
    try {
      kind = JSON.parse(item.kind);
    } catch (error) {
      kind = item.kind;
    }

    const type = typeof kind === "object" ? Object.keys(kind)[0] : item.kind.replace('"', '').replace('"', '').toString();
    const objectProposal = typeof kind === "object" ? kind[type] : undefined;
    const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

    const date = moment(item.approval_date/1000000)
    const date_format = ' ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
    const date_final = item.approval_date ? date_format : item.approval_date;

    let title = "";
    try {
      title = atob(item.title);
    } catch (error) {
      title = item.title;
    }

    /* let description = "";
    try {
      description = atob(item.description);
    } catch (error) {
      description = item.description;
    } */

    let description = "";
    try {
      if(item.description.split(" ").length <= 1) {
        description = atob(item.description);
      } else {
        description = item.description;
      }
    } catch (error) {
      description = item.description;
    }

    const fechaVencimiento = moment((Number(item.submission_time) + Number(dao.proposal_period))/1000000);
    const diasRestantes = fechaVencimiento <= moment() ? 0 : fechaVencimiento.diff(moment(), 'days')
    const remainingTime = `${diasRestantes} dias - el ${fechaVencimiento.format('DD MMMM')} de ${fechaVencimiento.format('yyyy')}`
    const status = diasRestantes == 0 && item.status == "InProgress" ? "Expired" : item.status
    const culminar = item.status != status ? true : false;

    if(type.trim() == 'ChangeConfig') {
      if(objectProposal?.config?.purpose) {
        const purposeData = objectProposal.config.purpose.split("|");
        let purpose;
        try {
          purpose = window.atob(purposeData.length <= 0 ? purposeData : purposeData[0]);
        } catch (error) {
          purpose = purposeData.length <= 0 ? purposeData : purposeData[0];
        }
        objectProposal.config.purpose = purpose
        objectProposal.config.isPrivate = !configMetadata?.isPrivated ? "Publico" : configMetadata?.isPrivated ? "Privado" : "Publico";
      }
    }
 //comsole.log("objectProposal: ", objectProposal)
    proposal.value = {
      id: item.proposal_id,
      contractId: item.contract_id,
      type,
      objectProposal,
      configMetadata,
      title,
      date: date_final,
      proposer: item.proposer,
      description,
      approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
      status,
      culminar,
      link: item.link,
      amount: null,
      claims: null,
      remainingTime,
      likes: item.upvote,
      dislikes: item.downvote,
      vote: item.vote.length > 0 ? item.vote[0].vote : undefined,
    };

  });

/*
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

      const noMembers = walletVote.filter((itemMember) => !walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )
      const members = walletVote.filter((itemMember) => walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )
      const countVotes = item.vote_counts[map][0] + item.vote_counts[map][1] + item.vote_counts[map][2]

      if(noMembers.length < countVotes) {
        childrens = formatChildrens(members);
        voices = members.length + "/" + walletsGroup.length;
        percent = Number(((members.length * 100) / walletsGroup.length).toFixed(2));
      } else {
        childrens = formatChildrens(noMembers);
        voices = noMembers.length + "/" + walletsGroup.length;
        percent = Number(((noMembers.length * 100) / walletsGroup.length).toFixed(2));
      }
    } else {
      const walletsGroup = responsePolicy.roles.filter((search) => search.name == map)[0].kind.Group

      const members = walletVote.filter((itemMember) => walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )

      childrens = formatChildrens(members);
      voices = members.length + "/" + walletsGroup.length;
      percent = Number(((members.length * 100) / walletsGroup.length).toFixed(2));
      console.log(walletsGroup.length, members.length)
    }

    return {
			title: map,
			voices,
			percent,
			children: childrens
		} // item.vote_counts[map]
  })
  */




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


  const item = response;

  const votes = Object.keys(item.vote_counts).map((map) => {return item.vote_counts[map]})
  let votesup = 0
  let votesdown = 0

  for(const vote of votes){
    votesup += vote[0]
    votesdown += vote[1]
  }

  /* const type = typeof item.kind === "object" ? Object.keys(item.kind)[0] : item.kind;
  const objectProposal = typeof item.kind === "object" ? item.kind[type] : undefined;
  const configMetadata = objectProposal && type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

  proposal.value = {
    id: item.id,
    contractId: route.query.dao,
    type,
    objectProposal,
    configMetadata,
    title: atob(item.title),
    date: null,
    proposer: item.proposer,
    description: atob(item.description),
    approved: item.status == "InProgress" ? null : item.status == "Approved" ? true : false,
    link: item.link,
    amount: null,
    claims: null,
    remainingTime: "una semana",
    likes: votesup,
    dislikes: votesdown,
  }; */


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
    if(map == groupAllDefault) {
      const group = [];
      for(const role of responsePolicy.roles) {
        if(typeof role.kind === "object") {
          for(const itemGroup of role.kind.Group) {
            group.push(itemGroup)
          }
        }
      }
      const walletsGroup = group
      /// console.log("all: ", walletsGroup)

      const noMembers = walletVote.filter((itemMember) => !walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )
      const members = walletVote.filter((itemMember) => walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )
      const countVotes = item.vote_counts[map][0] + item.vote_counts[map][1] + item.vote_counts[map][2]

      /*if(noMembers.length < countVotes) {
        childrens = formatChildrens(members);
        voices = members.length + "/" + walletsGroup.length;
        percent = Number(((members.length * 100) / walletsGroup.length).toFixed(2));
      } else {*/
        childrens = formatChildrens(noMembers);
        voices = noMembers.length + "/" + walletsGroup.length;
        percent = Number(((noMembers.length * 100) / walletsGroup.length).toFixed(2));
      //}

    } else {
      const walletsGroup = responsePolicy.roles.filter((search) => search.name == map)[0].kind.Group

      const members = walletVote.filter((itemMember) => walletsGroup.find((findWallet) => itemMember.wallet == findWallet)  )

      childrens = formatChildrens(members);
      voices = members.length + "/" + walletsGroup.length;
      percent = Number(((members.length * 100) / walletsGroup.length).toFixed(2));
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
			title: "Counci",
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
</script>
