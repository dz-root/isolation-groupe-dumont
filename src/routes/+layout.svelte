<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';

	let { children } = $props();
</script>

<div class="app">
<Header></Header>
	<main>
		{@render children()}
	</main>

</div>