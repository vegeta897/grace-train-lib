<script lang="ts">
	import { COLOR_NAMES } from '$lib'
	import type { GraceTrainCar } from '$lib/trains'
	import { ContainerSvg, Body, Decal, Topper, Wheels } from '.'

	export let car: GraceTrainCar
	export let width = '100%'
	export let svgElement: SVGElement | undefined = undefined
	export let viewBox = '0 0 375 300'
</script>

<ContainerSvg {width} {viewBox} bind:svgElement>
	{#if typeof car === 'string'}
		<Body name="boxy" stripeColor={car}></Body>
	{:else}
		<Body name={car.body} baseColor={car.bodyColor} popColor={car.bodyPopColor}>
			<svelte:fragment slot="decals">
				{#each car.decals as decal, d}
					<Decal
						name={decal.name}
						fill={decal.fill}
						x={decal.x}
						y={decal.y}
						scale={decal.scale}
						rotate={decal.rotate}
						params={decal.params}
					/>
				{/each}
			</svelte:fragment>
			<svelte:fragment slot="toppers" let:topLine>
				{#each car.toppers as topper}
					<Topper
						{topLine}
						name={topper.name}
						colors={topper.colors}
						position={topper.position}
						offset={topper.offset}
						scale={topper.scale}
						rotate={topper.rotate}
					/>
				{/each}
			</svelte:fragment>
			<Wheels
				rimColor={car.wheelColor || COLOR_NAMES.POP.POP}
				capColor={car.bodyColor || COLOR_NAMES.BASE.BASE}
				fromCenter={car.wheelFromCenter || 100}
				size={car.wheelSize || 25}
				slot="wheels"
			/>
		</Body>
	{/if}
</ContainerSvg>
