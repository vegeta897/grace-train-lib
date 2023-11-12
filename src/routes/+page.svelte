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
	import { PRIDE_FLAGS } from '$lib/components/decal/Flag.svelte'
	import type { StripesParams } from '$lib/components'
	import { colorRun } from '$lib/colors'

	const decalTransform = { x: 375 / 2, y: 120, scale: 1.5, rotate: 0 }

	const columnSizes = [900, 300, 150, 100]

	const changingRimColors = [undefined, COLORS.POP[5]]
	let changingRimColor = changingRimColors[0]

	let topperPosition = 0.8

	let heartParams = getDefaultParamsObject(decalDefs.heart.paramConfig)
	let starParams = getDefaultParamsObject(decalDefs.star.paramConfig)
	let circleParams = getDefaultParamsObject(decalDefs.circle.paramConfig)
	let flag = 'rainbow'

	const stripesTransform = { x: 70, y: 150, rotate: 0, scale: 1 }
	const stripesParams: StripesParams = { thickness: 25 }
	let showStripes = true

	let changingDecalFill: string = COLORS.POP[0]
	// let changingDecalFillIndex = 0
	onMount(() => {
		// const changingDecalFillInterval = setInterval(() => {
		// 	changingDecalFillIndex = (changingDecalFillIndex + 1) % COLORS.POP.length
		// 	changingDecalFill = COLORS.POP[changingDecalFillIndex]
		// }, 1000)
		// return () => clearInterval(changingDecalFillInterval)
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
<div>
	{#each PRIDE_FLAGS as flagName}
		<button on:click={() => (flag = flagName)}>{flagName}</button>
	{/each}
</div>
<label
	>Draw stripes
	<input type="checkbox" bind:checked={showStripes} />
</label>
{#each columnSizes as size}
	<div class="showcase" style="--column-size: {size}px">
		<ContainerSvg>
			<Body name="boxy">
				<svelte:fragment slot="decals">
					{#if showStripes}
						<Decal
							name="stripes"
							params={{
								nodes: [
									{
										length: 2,
										colors: colorRun('POP', 1, 3) /*, noDraw: [0, 2]*/,
									},
									{ turnAngle: 90, length: 1, colors: colorRun('POP', 1, 3) },
									{ length: 2, noDraw: [0, 2], colors: colorRun('POP', 1, 3) },
									// { turnAngle: -90, length: 2 },
									{ turnAngle: 90, length: 1, colors: colorRun('POP', 1, 3) },
									// { turnAngle: 90, length: 2 },
									// { turnAngle: 90, length: 5 },
									{ turnAngle: -90, length: 2, colors: colorRun('POP', 2, 3) },
									{
										turnAngle: -90,
										length: 2,
										noDraw: [1],
										colors: colorRun('POP', 2, 3),
									},
									{ length: 2, colors: colorRun('POP', 3, 3) },
								],
								...stripesParams,
							}}
							{...decalTransform}
							{...stripesTransform}
						/>
					{/if}
					<!-- <Decal name="flag" params={{ flag }} {...decalTransform} rotate={0} /> -->
					<!-- {#each snapPoints as point}
						<circle cx={point.x} cy={point.y} r="1" />
					{/each} -->
				</svelte:fragment>
			</Body>
		</ContainerSvg>
		<ContainerSvg>
			<Body name="boxy" baseColor={COLORS.BASE[0]}>
				<svelte:fragment slot="decals">
					<Decal
						name="heart"
						params={heartParams}
						{...decalTransform}
						scale={1.9398}
						animateAppear
						delayAppear={100}
					/>
					<Decal
						name="star"
						params={starParams}
						{...decalTransform}
						x={60}
						y={200}
						fill={COLORS.POP[3]}
						rotate={30}
						scale={1.9398}
						animateAppear
						delayAppear={100}
					/>
					<Decal
						name="circle"
						params={circleParams}
						{...decalTransform}
						x={360}
						y={200}
						fill={COLORS.POP[6]}
						rotate={30}
						scale={1.9398}
						animateAppear
						delayAppear={100}
					/>
					<Decal
						name="star"
						params={starParams}
						{...decalTransform}
						x={360}
						y={50}
						fill={COLORS.POP[5]}
						rotate={30.005}
						scale={1.9398}
						animateAppear
						delayAppear={100}
					/>
				</svelte:fragment>
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
		<ContainerSvg>
			<Body name="tanky">
				<Decal
					name="circle"
					fill={changingDecalFill}
					transition={['fill', 'stroke']}
					params={circleParams}
					{...decalTransform}
					slot="decals"
					animateAppear
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
