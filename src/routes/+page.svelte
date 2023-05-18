<script lang="ts">
	import Body from '../lib/Body.svelte'
	import Decal from '$lib/Decal.svelte'
</script>

<svelte:head>
	<title>Grace Train Component Library</title>
</svelte:head>
<div class="showcase">
	<Body name="boxy">
		<Decal
			name="star"
			transform={{ translate: { x: 375 / 2, y: 120 }, scale: 1.5, rotate: 0 }}
		/>
	</Body>
	<Body name="tanky">
		<Decal
			name="heart"
			transform={{ translate: { x: 375 / 2, y: 120 }, scale: 1.5, rotate: 0 }}
		/>
	</Body>
	<Body name="boxy">
		<Decal
			name="circle"
			transform={{ translate: { x: 375 / 2, y: 120 }, scale: 1.5, rotate: 0 }}
		/>
	</Body>
</div>

<style>
	:global(html) {
		background: #29185e;
	}
	.showcase {
		display: grid;
		grid-template-columns: repeat(4, 150px);
		row-gap: 2rem;
		column-gap: 2rem;
	}
</style>
