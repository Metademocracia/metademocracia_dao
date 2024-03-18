<template>
	<div id="proposal-details">
		<toolbar title="Detalle de la Propuesta" />

		<proposal-card class="my-15" :proposal="cardsProposals" />

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
							<span style="word-break: break-all;">{{ item2.user }}</span>

							<span>{{ item2.date }}</span>
						</aside>
					</v-sheet>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import '@/assets/styles/pages/proposal-details-new.scss'
import voteIcon from '@/assets/sources/icons/vote-icon.svg'
import ProposalCard from '@/components/proposal-card.vue'
import SliderLiked from '@/components/slider-liked.vue'

import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import WalletP2p from '../services/wallet-p2p';
import moment from 'moment';
import { ref } from 'vue';

const query = gql`
  query Proposals($id: String!) {
    serie(id: "1") {
      supply
    }

    proposal(id: $id) {
      approval_date
      creation_date
      description
      id
      kind
      link
      proposer
      proposal_type
      status
      submission_time
      title
      upvote
      downvote
      user_creation
      vote(orderBy: date_time, orderDirection: desc) {
        user_id
        vote
        date_time
      }
    }
  }
`;

export default {
  components: { ProposalCard },
	setup() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var id = urlParams.get('id');

    const { result, loading, error } = useQuery(query, {id: id});


		return{
      result,
      loading,
      error,
      proposal: ref(null),
      panels: ref(null),
      panelsExpanded: ref([]),
      alert: ref(false),
      session: WalletP2p.getAccount(),
			openVoice: ref(false),
			openCouncil: ref(false),
			voices_left: ref(0),
			voices_goal: ref(0),
			council_left: ref(3),
			council_goal: ref(4),
			percent_council: ref(75),
			cardsProposals: ref(null/*[
				{
					proposals_id: 1234,
					title_desc: 'AddBounty',
					title: 'Crear una recompensa',
					date: 'Aprobado el: 31 de Agosto de 2023',
					near_id: 'andresdom.near',
					desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eaque adipisci officia a. Vitae facilis quia minus numquam labore perspiciatis culpa odio totam eum, veniam fuga corrupti saepe temporibus dolore a voluptatem asperiores. Repellendus dignissimos doloribus optio eaque, ipsam id adipisci repellat atque? Praesentium repellendus pariatur reprehenderit deleniti ipsa dolores possimus velit nemo corporis optio cumque itaque officia qui nostrum suscipit delectus nulla labore quibusdam, vero, in quasi eos at? Beatae quos a laudantium ratione dignissimos perferendis quod, repudiandae nulla!',
					link: 'gov.near.org',
					amount: 777,
					currency: 'NEAR',
					time_complete: '3 Meses',
					likes: 117,
					dislikes: 15,
				},
			]*/),

			dataLikes: ref(null),

			/*iconMap: {
        like,
        dislike,
      },*/

			dataVoice: ref([
				/*{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},*/
			]),

			dataCouncil:[
				/*{
					icon: 'mdi-thumb-up',
					name: 'pruebavotar.near',
				},
				{
					icon: 'mdi-thumb-down',
					name: 'pruebavotar.near',
					date: '02 May 2023 22:56:28',
				},*/
			]
		}
	},

  watch: {
    result(response) {
      this.loadData(response)
    }
  },


  mounted() {
    if(this.result){
      this.loadData(this.result);
    }
  },


	methods: {
    copy(id) {
      const link = window.location.origin + window.location.pathname + window.location.search
      navigator.clipboard.writeText(link);
    },

    loadData(response){
      if(response){
        const data = response.proposal;

        let amount = null
        if(data.proposal_type == "Transfer") {
          amount = Number((JSON.parse(data.kind).Transfer.amount / 1000000000000000000000000).toFixed(2));
        }

        const dataLikes = [];
        const dataVoice = [];
        for(let i = 0; i<data.vote.length; i++) {
          const type_vote = data.vote[i].vote == "VoteApprove" ? {icon: 'like'} : {icon: 'dislike'};
          dataLikes.push(type_vote);

          dataVoice.push({
            state: data.vote[i].vote == "VoteApprove" ? true : false,
            user: data.vote[i].user_id,
            date: moment(data.vote[i].date_time/1000000).format('DD MMM yyyy HH:mm:ss'),
          });
        }

        //this.dataLikes = dataLikes;
        //this.dataVoice = dataVoice;
        //this.voices_goal = response.serie.supply;
        //this.voices_left = Number(data.upvote) + Number(data.downvote)

        const date = moment(data.approval_date/1000000)
        const date_format = 'Aprobado el: ' + date.format('DD MMMM').toString() + ' de ' + date.format('yyyy').toString();
        const date_final = data.approval_date ? date_format : data.approval_date;

        const kindProposal = JSON.parse(data.kind);
        const objectProposal = kindProposal[data.proposal_type];
        const configMetadata = objectProposal && data.proposal_type == "ChangeConfig" ? JSON.parse(atob(objectProposal.config.metadata)) : undefined;

        const voteResult = data.vote.length > 0 ? data.vote : undefined;
        const userId = WalletP2p.getAccount().address;
        const voteUser = !voteResult ? undefined : voteResult.find((item) => item.user_id == userId)?.vote;


        this.cardsProposals = {
          id: data.id,
          contractId: this.$route.query?.dao,
          type: data.proposal_type,
          objectProposal,
          configMetadata,
          title: data.title,
          date: date_final /*item.submission_time*/,
          proposer: data.proposer,
          description: data.description,
          approved: data.status == "InProgress" ? null : data.status == "Approved" ? true : false,
          status: data.status,
          link: data.link,
          amount: amount,
          claims: null,
          remainingTime: "una semana",
          likes: data.upvote,
          dislikes: data.downvote,
          vote: voteUser
        };


        this.panels = [{
          title: "Concejales",
          voices: dataVoice.length+"/"+response.serie.supply,
          percent: Number(((dataVoice.length * Number(response.serie.supply)) / 100).toFixed(2)),
          children: dataVoice
        }]

        this.panelsExpanded = this.panels.map((panel, index) => index)
      };
    },

  },
}
</script>
