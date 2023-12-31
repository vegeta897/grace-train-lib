<script lang="ts">
	import Body from '$lib/components/Body.svelte'
	import Decal from '$lib/components/Decal.svelte'
	import Wheels from '$lib/components/Wheels.svelte'
	import WheelsChange from '$lib/components/WheelsChange.svelte'
	import Topper from '$lib/components/Topper.svelte'
	import { onMount } from 'svelte'
	import ContainerSvg from '$lib/components/ContainerSVG.svelte'
	import { COLORS, COLOR_NAMES, colorRun } from '$lib'
	import { decalDefs } from '$lib/components/decal'
	import DecalParams from './DecalParams.svelte'
	import { getDefaultParamsObject } from '$lib/components/decal/params'
	import { PRIDE_FLAGS } from '$lib/components/decal/Flag.svelte'

	const decalTransform = { x: 375 / 2, y: 120, scale: 1.5, rotate: 0 }

	const columnSizes = [
		500,
		//300,
		//150,
		//100
	]

	const changingRimColors = [undefined, COLOR_NAMES.POP.LIME]
	let changingRimColor = changingRimColors[0]

	let topperPosition = 0.8

	let heartParams = getDefaultParamsObject(decalDefs.heart.paramConfig)
	let starParams = getDefaultParamsObject(decalDefs.star.paramConfig)
	let circleParams = getDefaultParamsObject(decalDefs.circle.paramConfig)
	let flowerParams = getDefaultParamsObject(decalDefs.flower.paramConfig)
	let flag = 'rainbow'

	let arcTurn = 60
	let arcLength = 0

	$: stripeNodes = [
		[-90, arcLength],
		[0, 1, [0, 1, 2]],
		[],
		[arcTurn, arcLength],
		[],
		[arcTurn * -1, arcLength],
		[arcTurn, arcLength],
		[],
		[arcTurn * -1, arcLength],
		[],
		[0, 1, [0, 1, 2]],
		[],
	]

	let wheelSize = 25
	let baseColorIndex = 3
	let popColorIndex = 3
	$: baseColor = COLORS.BASE[baseColorIndex]
	$: popColor = COLORS.POP[popColorIndex]

	let changingDecalFill: string = COLOR_NAMES.POP.PIZZAZZ
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
	})
</script>

<form>
	<DecalParams decalName="heart" bind:params={heartParams} />
	<DecalParams decalName="star" bind:params={starParams} />
	<DecalParams decalName="circle" bind:params={circleParams} />
	<DecalParams decalName="flower" bind:params={flowerParams} />
	<div>
		{#each PRIDE_FLAGS as flagName}
			<button on:click={() => (flag = flagName)}>{flagName}</button>
		{/each}
	</div>
	<label>
		Turn angle
		<input type="range" min={-90} max={90} step={15} bind:value={arcTurn} />
	</label>
	{arcTurn}
	<label>
		Turn length
		<input type="range" min={0} max={8} bind:value={arcLength} />
	</label>
	{arcLength}
	<div>
		<label>
			Wheel size
			<input type="range" min={22} max={32} bind:value={wheelSize} />
		</label>
		<label>
			Base color
			<input
				type="range"
				min={0}
				max={COLORS.BASE.length - 1}
				bind:value={baseColorIndex}
			/>
		</label>
		<label>
			Pop color
			<input
				type="range"
				min={0}
				max={COLORS.POP.length - 1}
				bind:value={popColorIndex}
			/>
		</label>
		<label>
			Topper position
			<input type="range" min="0" max="1" step="0.01" bind:value={topperPosition} />
		</label>
	</div>
</form>
{#each columnSizes as size}
	<div class="showcase" style="--column-size: {size}px">
		<ContainerSvg>
			<Body name="chemy" {baseColor} {popColor}>
				<svelte:fragment slot="decals">
					<Decal
						name="heart"
						params={heartParams}
						{...decalTransform}
						x={60}
						y={200}
						scale={1.9398}
						animateAppear
						delayAppear={100}
					/>
					<Decal
						name="flag"
						params={{ flag }}
						{...decalTransform}
						x={75}
						y={75}
						scale={1.1398}
						animateAppear
						delayAppear={100}
						rotate={-10}
					/>
					<Decal
						name="star"
						params={starParams}
						{...decalTransform}
						x={200}
						y={120}
						fill={COLOR_NAMES.POP.PUMPKIN}
						rotate={0}
						scale={1.5}
						animateAppear
						delayAppear={100}
					/>
					<Decal
						name="circle"
						params={circleParams}
						{...decalTransform}
						x={360}
						y={200}
						fill={COLOR_NAMES.POP.EMERALD}
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
						fill={COLOR_NAMES.POP.LIME}
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
				<Wheels size={wheelSize} slot="wheels" />
			</Body>
		</ContainerSvg>
		<ContainerSvg>
			<Body name="hoppy" {baseColor} {popColor}>
				<svelte:fragment slot="decals">
					<!-- logo -->
					<Decal
						name="stripes"
						params={{
							colors: colorRun('POP', 3, 3, 3),
							// mixColors: colorRun('POP', 1, 3),
							nodes: [
								[-90, 0],
								[0, 0],
								[0, 1, [1, 2]],
								[0, 0],
								[0, 1, [0, 1, 2]],
								[0, 0],
								[0, 2, [], true],
							],
							highlightNode: 0,
							highlightColor: '#58c7f3',
							showNodes: true,
						}}
						{...decalTransform}
						{...{ x: 70, y: 70, rotate: 0, scale: 1 }}
					/>
					<!-- bb test -->
					<Decal
						name="stripes"
						params={{
							colors: colorRun('POP', 3, 3, 5),
							// mixColors: colorRun('POP', 1, 3),
							nodes: [
								[-30, 0, [0, 1, 2]],
								[-30, 0, [1]],
								[-30, 0],
								[-30, 0],
								[-30, 0],
								[-30, 0],
								[-30, 0],
								[-30, 0],
								[-30, 0],
								[-30, 0],
								[-30, 0, [1]],
							],
						}}
						{...decalTransform}
						{...{ x: 150, y: 70, rotate: 0, scale: 0.5 }}
					/>
					<Decal
						name="stripes"
						params={{
							colors: colorRun('POP', 1, 3, 4),
							// mixColors: colorRun('POP', 1, 3),
							nodes: [
								[30, 1, [0, 1, 2]],
								[30, 1, [1]],
								[30, 1],
								[30, 1],
								[30, 1],
								[30, 1],
								[30, 1, [1]],
							],
						}}
						{...decalTransform}
						{...{ x: 235, y: 80, rotate: 0, scale: 0.5 }}
					/>
					<!-- spirals -->
					<Decal
						name="stripes"
						params={{
							colors: [COLOR_NAMES.POP.POP, COLOR_NAMES.POP.PUMPKIN],
							// mixColors: colorRun('POP', 1, 3),
							nodes: [
								[45, 0, [0, 1, 2]],
								[90, 0],
								[90, 0],
								[90, 1],
								[90, 1],
								[90, 2],
								[90, 2],
								[90, 3],
								[90, 3],
								[-30, 5],
							],
						}}
						{...decalTransform}
						{...{ x: 325, y: 75, rotate: 0, scale: 0.25 }}
					/>
					<!-- controllable -->
					<Decal
						name="stripes"
						params={{
							colors: colorRun('POP', 4, 3, 3),
							// mixColors: colorRun('POP', 1, 3),
							nodes: stripeNodes,
						}}
						{...decalTransform}
						{...{ x: 290, y: 160, rotate: 0, scale: 0.5 }}
					/>
					<!-- hot dog! -->
					<Decal
						name="stripes"
						params={{
							colors: [COLOR_NAMES.POP.PUMPKIN, COLOR_NAMES.POP.POP],
							nodes: [
								[0, 1, [0, 2]],
								[30, 10, []],
								[0, 1, [0, 2]],
							],
							startAngle: -90,
						}}
						{...decalTransform}
						{...{ x: 110, y: 150, rotate: 0, scale: 0.75 }}
					/>
					<!-- <Decal name="flag" params={{ flag }} {...decalTransform} rotate={0} /> -->
					<!-- {#each snapPoints as point}
						<circle cx={point.x} cy={point.y} r="1" />
					{/each} -->
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
				<Wheels slot="wheels" rimColor={COLOR_NAMES.POP.LIME} />
			</Body>
		</ContainerSvg>
		<ContainerSvg>
			<Body name="tanky">
				<Decal name="flower" params={flowerParams} {...decalTransform} slot="decals" />
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
		overflow-y: clip;
	}
</style>
