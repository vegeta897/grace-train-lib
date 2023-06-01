<script lang="ts" context="module">
	import BoxCar from './BoxCar.svelte'
	import TankerCar from './TankerCar.svelte'
	import ContainerSvg from './ContainerSVG.svelte'

	export type BodyName = keyof typeof COMPONENTS
	const COMPONENTS = {
		boxy: BoxCar,
		tanky: TankerCar,
	} as const
	export const DECAL_CLIP_PATHS = {
		boxy: 'M23.087,200l-22.961,-160.732c-0.513,-3.587 0.557,-7.221 2.931,-9.958c2.374,-2.738 5.819,-4.31 9.443,-4.31l350,0c3.624,-0 7.069,1.572 9.443,4.31c2.374,2.737 3.444,6.371 2.931,9.958l-22.961,160.732l-328.826,0Z',
		tanky:
			'M16.577,200c-8.597,-11.4 -16.577,-33.157 -16.577,-74.652c0,-90.642 37.484,-87.849 37.503,-87.848l299.997,0c0.01,0 0.021,0 0.031,0c0,0 37.527,-2.726 37.527,87.5c-0,41.713 -7.98,63.564 -16.595,75l-341.886,0Z',
	}
</script>

<script lang="ts">
	import { COLORS } from './colors.js'

	export let name: BodyName
	export let color: string | null = 'none'

	$: _color = color === 'none' ? 'none' : color ? `${color}cc` : COLORS.BASE
</script>

<ContainerSvg>
	<svelte:component this={COMPONENTS[name]} color={_color}>
		<g clip-path="url(#{name}-decal-clip)">
			<slot />
		</g>
	</svelte:component>
	<defs>
		<clipPath id="{name}-decal-clip">
			<path d={DECAL_CLIP_PATHS[name]} />
		</clipPath>
	</defs>
</ContainerSvg>
