<template lang='pug'>
ol
	li(v-for="friend in friends")
		FriendItem(:name="friend.name" :surprise-friend="friend.surpriseFriend")
	li
		input(type="text" :value="inputText" placeholder="add a friend here" @keyup.enter="addFriend")
button(@click="shuffleFriends") Create shuffled list
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import store from '../../store/index';
import FriendItem from '../friend-item/friend-item.vue';

export default {
	components:{
		FriendItem
	},
	props: {
		inputText: String
	},
	methods: {
		addFriend ({target}: KeyboardEvent) {
			const value = (target as HTMLInputElement).value;
			if(value && value.trim()){
				store.commit('add', {name: value.trim().toLowerCase()});
			}
		},
		shuffleFriends () {
			store.commit('shuffle');
		}
	},
	computed: {
	...mapGetters([
		'friends',
	])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input{
	width: 90%;
}
</style>
