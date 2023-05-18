<script lang="ts" context="module">
	import BoxCar from './BoxCar.svelte'
	import TankerCar from './TankerCar.svelte'

	export type BodyName = keyof typeof COMPONENTS
	const COMPONENTS = {
		boxy: BoxCar,
		tanky: TankerCar,
	} as const
</script>

<script lang="ts">
	import { COLORS } from './colors.js'

	export let name: BodyName
	export let color: string | null = 'none'

	$: _color = color === 'none' ? 'none' : color ? `${color}cc` : COLORS.BASE
</script>

<svg viewBox="0 0 375 300" width="100%">
	<svelte:component this={COMPONENTS[name]} color={_color}>
		<slot />
	</svelte:component>
</svg>

<style>
	svg {
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 25px;
	}
</style>
