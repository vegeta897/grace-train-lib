<script lang="ts">
	import Body from '../lib/Body.svelte'
	import Decal from '$lib/Decal.svelte'

	const defaultTransform = { translate: { x: 375 / 2, y: 120 }, scale: 1.5, rotate: 0 }

	const sizes = ['250px', '100px', '50px']
</script>

<svelte:head>
	<title>Grace Train Component Library</title>
</svelte:head>
{#each sizes as size}
	<div class="showcase" style="--column-size: {size}">
		<Body name="boxy">
			<Decal name="star" transform={defaultTransform} />
		</Body>
		<Body name="tanky">
			<Decal name="heart" transform={defaultTransform} />
		</Body>
		<Body name="boxy">
			<Decal name="circle" transform={defaultTransform} />
		</Body>
	</div>
{/each}

<style>
	:global(html) {
		background: #29185e;
		padding: 1rem;
	}
	.showcase {
		display: grid;
		grid-template-columns: repeat(4, var(--column-size));
		row-gap: 2rem;
		column-gap: 2rem;
		margin-bottom: 1rem;
	}
</style>
