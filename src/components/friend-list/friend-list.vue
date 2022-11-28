<template lang='pug'>
h3 {{ $translate('names-of-your-friends') }}
ol
	li(v-for="friend in friends")
		FriendItem(:name="friend.name" :surprise-friend="friend.surpriseFriend")
input(type="text" :value="inputText" :placeholder="$translate('add-a-friend-here')" @keyup.enter="addFriend")
span.error(v-if="addFriendException") {{ $translate('add-a-friend-exception') }}
button(:class="{'is-active': friends.length > 2}" @click="shuffleFriends") {{ $translate('shuffle-list') }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import store from '../../store/index';
import FriendItem from '../friend-item/friend-item.vue';

export default defineComponent({
	components:{
		FriendItem
	},
	data(){
		return {
			addFriendException: false,
		}
	},
	props: {
		inputText: String,
	},
	methods: {
		addFriend ({target}: KeyboardEvent) {
			this.addFriendException = false;
			const value = (target as HTMLInputElement).value;
			store.commit('eraseFriends');
			const trimmedValue = value ? value.trim().toLowerCase() : '';
			if(typeof trimmedValue === 'string' && trimmedValue !== ''){
				try {
					store.commit('add', {name: trimmedValue});
				} catch (error) {
					this.addFriendException = true;
				}
			}
		},
		shuffleFriends () {
			store.commit('shuffle');
		}
	},
	computed: {
	...mapGetters([
		'friends',
	]),
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input{
	width: 90%;
	border: none;
	border-bottom: 1px solid #999999;
	margin-bottom: 10px;
	font-size: 1.2rem;
	text-transform: lowercase;

	&:focus{
		outline: none !important;
		border: none;
		border-bottom: 1px solid purple;
	}
}
span.error{
	width: 100%;
	display: block;
	color: red;
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
