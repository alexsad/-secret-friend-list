<template lang='pug'>
.friend-item
	input(readonly type="text" :value="name")
	.remove-btn(@click="remove(name)")
	a.shuffled-uri-link(v-if="surpriseFriend" :href="uri" target="_blank") link
</template>

<script lang="ts">
import store from '../../store/index';

export default {
	props: {
		name: String,
		surpriseFriend: String,
	},
	methods: {
		addFriend ({target}: KeyboardEvent) {
			const value = (target as HTMLInputElement).value;
			if(value && value.trim()){
				store.commit('add', {name: value.trim().toLowerCase()});
			}
		},
		remove (name: string) {
			store.commit('remove', name);
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
			width: 10%;
			padding-top: 2px;
			height: 34px;
			// background-color: rgba(77, 11, 66, 0.082);
			display: inline-block;
			margin-top: 6px;
			// vertical-align: bottom;
		}

		> .remove-btn {
			width: 34px;
			height: 34px;
			background: url('./assets/remove.svg') no-repeat 12px;
			cursor: pointer;
		}
	}
</style>
