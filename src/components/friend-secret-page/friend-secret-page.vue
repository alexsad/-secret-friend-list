<template lang='pug'>
h2
	span(v-if="!checkSecret()")
		.Type your name here
		input(v-model="secret")
	span(v-if="checkSecret()")
		.Your Secret Santa is "<b>{{surpriseFriend.toUpperCase()}}</b>"
</template>

<script lang="ts">

interface Secret {
	secret: string;
	user: string;
	checkSecret(): boolean;
}

export default {
	data:function(){
		return {
			secret:''
		}
	},
	methods: {
		checkSecret() {
			const {secret, user} = this as Secret;
			return user === secret.toLowerCase();
		}
	},
	computed: {
		surpriseFriend(){
			const urlParams = new URLSearchParams(window.location.search);
			if(urlParams.has('surprise-friend')){
				return atob(decodeURI(urlParams.get('surprise-friend') || ''));
			}
			return "";
		},
		user(){
			const urlParams = new URLSearchParams(window.location.search);
			if(urlParams.has('user')){
				return atob(decodeURI(urlParams.get('user') || ''));
			}
			return "";
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
