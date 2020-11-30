<template lang='pug'>
h3 Your friends names
ol
	li(v-for="friend in friends")
		FriendItem(:name="friend.name" :surprise-friend="friend.surpriseFriend")
input(type="text" :value="inputText" placeholder="add a friend here" @keyup.enter="addFriend")
button(:class="{'is-active': friends.length > 2}" @click="shuffleFriends") Shuffle list
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
	border: none;
	border-bottom: 1px solid #999999;
	margin-bottom: 10px;
	font-size: 1.2rem;

	&:focus{
		outline: none !important;
		border: none;
		border-bottom: 1px solid purple;
	}
}
button{
	margin-top:16px;
	margin-bottom: 16px;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	line-height: 1.5;
	transition: border-color 0.2s, background-color 0.2s, color 0.2s;
	padding: 0.5em 1em;
	outline: 0;
	min-width: 250px;
	font-size: 1.2rem;
	border-radius: 25px;
	color: #fff;
	background-color: purple;
	border-color: purple;
	opacity: .5;
	&.is-active {
		opacity: 1;
	}
}
</style>
