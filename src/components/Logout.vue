<template>
	<div>
		<h2>Cerraste la sesión!!</h2>
	</div>
</template>

<script>
	export default {
		created () {
			//if(!token) {
			//	return false;
			//}
			//axios.get("http://weblloapi.dev/logout?api_token="+token)
			//.then(response => {
				localStorage.removeItem('user');
			//	Event.$emit('logout');
			//});
		}
	}
</script>