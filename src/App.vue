<template>
	<h1>Secret Santa List</h1>
	<!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
	<div class="box-container">
		<FriendList v-if="!hasUser()"/>
		<FriendSecretPage v-if="hasUser()"/>
	</div>
</template>

<script lang="ts">
import FriendList from './components/friend-list/friend-list.vue';
import FriendSecretPage from './components/friend-secret-page/friend-secret-page.vue';

export default {
	components:{
		FriendList,
		FriendSecretPage,
	},
	methods: {
		hasUser(){
			const urlParams = new URLSearchParams(window.location.search);
			return urlParams.has('user');
		}
	},
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	display: block;
	margin-top: 60px;
	> .box-container{
		width: 400px;
		margin: 0px auto;
	}
}
</style>
