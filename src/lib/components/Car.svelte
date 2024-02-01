<script lang="ts">
	import type { GraceTrainCar } from '$lib/data'
	import { ContainerSvg, Body, Decal, Topper, Wheels } from '.'

	export let car: GraceTrainCar
	export let width = '100%'
	export let svgElement: SVGElement | undefined = undefined
	export let viewBox = '0 0 375 300'
	export let noAnimation = false
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
						{noAnimation}
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
				popColor={depotCar.wheelPopColor}
				baseColor={depotCar.wheelBaseColor}
				flipColors={depotCar.wheelFlipColors}
				fromCenter={depotCar.wheelFromCenter}
				size={depotCar.wheelSize}
				slot="wheels"
			/>
		</Body>
	{:else}
		<Body name="boxy" stripeColor={car.color}></Body>
	{/if}
	<slot />
</ContainerSvg>
