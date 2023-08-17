<script lang="ts">
	import Body from '$lib/Body.svelte'
	import Decal from '$lib/Decal.svelte'
	import Wheels from '$lib/Wheels.svelte'
	import WheelsChange from '$lib/WheelsChange.svelte'
	import Topper from '$lib/Topper.svelte'
	import { onMount } from 'svelte'
	import { COLORS } from '$lib/colors.js'

	const defaultTransform = { x: 375 / 2, y: 120, scale: 1.5, rotate: 0 }

	const sizes = ['300px', '150px', '50px']

	const changingRimColors = [COLORS.POP, '#94f20d']
	let changingRimColor = changingRimColors[0]

	let topperPosition = 0.15

	onMount(() => {
		// const changingRimInterval = setInterval(() => {
		// 	changingRimColor =
		// 		changingRimColors[
		// 			(changingRimColors.indexOf(changingRimColor) + 1) % changingRimColors.length
		// 		]
		// }, 2000)
		// return () => clearInterval(changingRimInterval)
		// const topperInterval = setInterval(() => {
		// 	topperPosition = (topperPosition + 0.005) % 1
		// }, 30)
		// return () => clearInterval(topperInterval)
	})
</script>

<svelte:head>
	<title>Grace Train Component Library</title>
</svelte:head>
{#each sizes as size}
	<div class="showcase" style="--column-size: {size}">
		<Body name="boxy">
			<Decal name="star" transform={defaultTransform} slot="decals" />
			<svelte:fragment slot="toppers" let:topLine>
				<Topper
					{topLine}
					position={topperPosition}
					colors={['#79f800', '#00adf8']}
					name="party_hat"
					scale={1}
					rotate={0}
				/>
			</svelte:fragment>
		</Body>
		<Body name="tanky">
			<Decal name="heart" transform={defaultTransform} slot="decals" />
			<svelte:fragment slot="toppers" let:topLine>
				<Topper
					{topLine}
					position={topperPosition}
					colors={['#00adf8', '#79f800']}
					name="party_hat"
					scale={1}
					rotate={0}
				/>
			</svelte:fragment>
			<Wheels slot="wheels" rimColor="#94f20d" />
		</Body>
		<Body name="tanky">
			<Decal name="heart" transform={defaultTransform} slot="decals" />
			<WheelsChange slot="wheels" rimColor={changingRimColor} />
		</Body>
		<Body name="boxy">
			<Decal name="circle" transform={defaultTransform} slot="decals" />
		</Body>
	</div>
{/each}

<style>
	:global(html) {
		background: #1d124a;
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
