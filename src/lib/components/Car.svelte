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
	{#if 'depotCar' in car}
		{@const { depotCar } = car}
		<Body
			name={depotCar.body}
			baseColor={depotCar.bodyColor}
			popColor={depotCar.bodyPopColor}
		>
			<svelte:fragment slot="decals">
				{#each depotCar.decals as decal}
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
				{#each depotCar.toppers as topper}
					<Topper
						{topLine}
						name={topper.name}
						params={topper.params}
						position={topper.position}
						offset={topper.offset}
						scale={topper.scale}
						rotate={topper.rotate}
					/>
				{/each}
			</svelte:fragment>
			<Wheels
				rimColor={depotCar.wheelColor || COLOR_NAMES.POP.POP}
				capColor={depotCar.bodyColor || COLOR_NAMES.BASE.BASE}
				fromCenter={depotCar.wheelFromCenter || 100}
				size={depotCar.wheelSize || 25}
				slot="wheels"
			/>
		</Body>
	{:else}
		<Body name="boxy" stripeColor={car.color}></Body>
	{/if}
</ContainerSvg>
