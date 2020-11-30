<template lang='pug'>
.friend-item
	input(readonly type="text" :value="name")
	a.shuffled-uri-link(@click="remove(name)") x
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

		> input{
			display: inline-block;
			width: 80%;
		}
		> .shuffled-uri-link{
			width: 10%;
			padding: 2px;
			height: 18px;
			background-color: rgba(77, 11, 66, 0.082);
			display: inline-block;
			margin: 2px;
		}
	}
</style>
