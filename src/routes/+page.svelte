<script lang="ts">
	import Body from '$lib/components/Body.svelte'
	import Decal from '$lib/components/Decal.svelte'
	import Wheels from '$lib/components/Wheels.svelte'
	import WheelsChange from '$lib/components/WheelsChange.svelte'
	import Topper from '$lib/components/Topper.svelte'
	import { onMount } from 'svelte'
	import ContainerSvg from '$lib/components/ContainerSVG.svelte'
	import { COLORS } from '$lib'
	import { decalDefs } from '$lib/components/decal'
	import DecalParams from './DecalParams.svelte'
	import { getDefaultParamsObject } from '$lib/components/decal/params'

	const decalTransform = { x: 375 / 2, y: 120, scale: 1.5, rotate: 0 }

	const columnSizes = ['300px', '150px', '50px']

	const changingRimColors = [undefined, COLORS.POP[5]]
	let changingRimColor = changingRimColors[0]

	let topperPosition = 0.15

	let heartParams = getDefaultParamsObject(decalDefs.heart.paramConfig)
	let starParams = getDefaultParamsObject(decalDefs.star.paramConfig)
	let circleParams = getDefaultParamsObject(decalDefs.circle.paramConfig)

	let changingDecalFill: string = COLORS.POP[0]
	let changingDecalFillIndex = 0
	onMount(() => {
		const changingDecalFillInterval = setInterval(() => {
			changingDecalFillIndex = (changingDecalFillIndex + 1) % COLORS.POP.length
			changingDecalFill = COLORS.POP[changingDecalFillIndex]
		}, 1000)
		return () => clearInterval(changingDecalFillInterval)
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
<DecalParams decalName="heart" bind:params={heartParams} />
<DecalParams decalName="star" bind:params={starParams} />
<DecalParams decalName="circle" bind:params={circleParams} />
{#each columnSizes as size}
	<div class="showcase" style="--column-size: {size}">
		<ContainerSvg>
			<Body name="boxy">
				<Decal
					name="circle"
					fill={changingDecalFill}
					transition={['fill', 'stroke']}
					params={circleParams}
					{...decalTransform}
					slot="decals"
					animateAppear
				/>
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
		</ContainerSvg>
		<ContainerSvg>
			<Body name="tanky">
				<Decal
					name="heart"
					params={heartParams}
					{...decalTransform}
					slot="decals"
					animateAppear
					delayAppear={100}
				/>
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
				<Wheels slot="wheels" rimColor={COLORS.POP[5]} />
			</Body>
		</ContainerSvg>
		<ContainerSvg>
			<Body name="tanky">
				<Decal
					name="star"
					params={starParams}
					{...decalTransform}
					slot="decals"
					animateAppear
					delayAppear={200}
				/>
				<WheelsChange slot="wheels" rimColor={changingRimColor} />
			</Body>
		</ContainerSvg>
	</div>
{/each}

<style>
	:global(html) {
		background: #1d124a;
		color: #fff;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
