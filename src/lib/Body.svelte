<script lang="ts" context="module">
	import Wheels from './Wheels.svelte'
	import BoxCar from './BoxCar.svelte'
	import TankerCar from './TankerCar.svelte'
	import ContainerSvg from './ContainerSVG.svelte'
	import type { XyTuple } from './Topper.svelte'

	export const BODY_NAMES = ['boxy', 'tanky'] as const
	export type BodyName = (typeof BODY_NAMES)[number]
	const COMPONENTS = {
		boxy: BoxCar,
		tanky: TankerCar,
	} as const
	// TODO: Group this data by body
	export const DECAL_CLIP_PATHS = {
		boxy: 'M23.087,200l-22.961,-160.732c-0.513,-3.587 0.557,-7.221 2.931,-9.958c2.374,-2.738 5.819,-4.31 9.443,-4.31l350,0c3.624,-0 7.069,1.572 9.443,4.31c2.374,2.737 3.444,6.371 2.931,9.958l-22.961,160.732l-328.826,0Z',
		tanky:
			'M16.577,200c-8.597,-11.4 -16.577,-33.157 -16.577,-74.652c0,-90.642 37.484,-87.849 37.503,-87.848l299.997,0c0.01,0 0.021,0 0.031,0c0,0 37.527,-2.726 37.527,87.5c-0,41.713 -7.98,63.564 -16.595,75l-341.886,0Z',
	} as const
	const TOPPER_LINES: Record<BodyName, XyTuple[]> = {
		boxy: [
			[12, 25],
			[110, 25],
			[160, 0],
			[215, 0],
			[265, 25],
			[363, 25],
		],
		tanky: [
			[34, 38],
			[107, 38],
			[160, 0],
			[215, 0],
			[268, 38],
			[341, 38],
		],
	}
</script>

<script lang="ts">
	export let name: BodyName
	export let baseColor: string | undefined = undefined
	export let stripeColor: string | null = 'none'

	$: _stripeColor =
		stripeColor === 'none' ? 'none' : stripeColor ? `${stripeColor}cc` : undefined
</script>

<ContainerSvg>
	<svelte:component this={COMPONENTS[name]} {baseColor} stripeColor={_stripeColor}>
		<slot name="wheels" slot="wheels">
			<Wheels />
		</slot>
		<g clip-path="url(#{name}-decal-clip)" slot="decals">
			<slot name="decals" />
		</g>
		<!-- <slot name="toppers" slot="toppers" /> -->
		<svelte:fragment slot="toppers">
			<slot name="toppers" topLine={TOPPER_LINES[name]} />
			<!-- TODO: Remove? Use an actual topper to test with -->
			<!-- {#each TOPPER_LINES[name] as [tpx, tpy]}
				<circle cx={tpx} cy={tpy} r="3" fill="none" stroke-width="2" stroke="red" />
			{/each} -->
		</svelte:fragment>
	</svelte:component>
	<defs>
		<clipPath id="{name}-decal-clip">
			<path d={DECAL_CLIP_PATHS[name]} />
		</clipPath>
	</defs>
</ContainerSvg>
