<template lang='pug'>
h2
	span(v-if="user !== secret.toLowerCase()")
		Say your name
		input(v-model="secret")
	span(v-if="user === secret.toLowerCase()")
		Your secret friend is "<b>{{surpriseFriend.toUpperCase()}}</b>"
</template>

<script lang="ts">
export default {
	data:function(){
		return {
			secret:''
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
