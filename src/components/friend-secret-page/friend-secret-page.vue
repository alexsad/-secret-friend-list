<template lang='pug'>
h2
	span(v-if="!checkSecret()") {{ $translate('type-your-name-here') }}
		input(v-model="secret")
	span(v-if="checkSecret()") {{ $translate('your-secret-santa-is') }} "<b>{{surpriseFriend.toUpperCase()}}</b>"
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
<style scoped lang="scss">
input{
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
</style>
