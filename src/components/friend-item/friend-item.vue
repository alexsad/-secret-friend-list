<template lang='pug'>
.friend-item
	input(readonly type="text" :value="name")
	.remove-btn(@click="remove(name)")
	a.shuffled-uri-link.fas.fa-unlink(v-if="surpriseFriend" :href="uri" target="_blank")
	//- a.shuffled-uri-link.fab.fa-whatsapp(v-if="surpriseFriend" :href="uri" target="_blank")
	a.shuffled-uri-link.fab.fa-whatsapp(v-if="surpriseFriend" :href="`https://api.whatsapp.com/send/?text=${encodeURIComponent($translate('your-secret-santa-is')+' '+uri)}`" target="_blank")

</template>

<script lang="ts">
import store from '../../store/index';

export default {
	props: {
		name: String,
		surpriseFriend: String,
	},
	methods: {
		remove (name: string) {
			store.commit('remove', name);
			store.commit('eraseFriends');
		}
	},
	computed: {
		uri({name, surpriseFriend}: {name: string; surpriseFriend: string}) {
			return `${document.location.origin}${document.location.pathname}?user=${encodeURI(btoa(name))}&surprise-friend=${encodeURI(btoa(surpriseFriend))}`;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.friend-item{
		display: flex;
		margin-bottom: 2px;

		> input{
			display: inline-block;
			width: 80%;
			border: none;
			border-bottom: 1px solid #999999;
			height: 18px;
			font-size: 1.2rem;

			&:focus{
				outline: none !important;
				border: none;
				border-bottom: 1px solid purple;
			}
		}

		> .shuffled-uri-link{
			width: 34px;
			padding-top: 2px;
			height: 34px;
			text-decoration: none;

			// background-color: rgba(77, 11, 66, 0.082);
			display: inline-block;
			margin-top: 6px;
			// vertical-align: bottom;

			&.fa-whatsapp{
				color: green;
			}
		}

		> .remove-btn {
			width: 34px;
			height: 34px;
			background: url('./assets/remove.svg') no-repeat 12px;
			cursor: pointer;
		}
	}
</style>
