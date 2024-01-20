<script lang="ts" context="module">
	export type DecalTransitionProperty = 'transform' | 'opacity' | 'fill' | 'stroke'
</script>

<script lang="ts">
	import { COLOR_NAMES } from '$lib'
	import type { DecalName, ParamsObject } from '$lib/data'
	import { popIn } from '$lib/util'
	import { decalDefs } from './decal'

	export let name: DecalName
	export let fill: string = COLOR_NAMES.POP.LIME
	export let x = 0
	export let y = 0
	export let scale = 1
	export let rotate = 0
	export let transition:
		| DecalTransitionProperty
		| DecalTransitionProperty[]
		| 'all'
		| 'none' = 'none'
	export let params: ParamsObject
	export let noAnimation = false

	export let animateAppear = false
	export let delayAppear = 0

	// Use svg transform prop when transition does not include transform
	// TODO: Move css transform and animation stuff into a wrapper component
	// Or just make a Depot version of this component
	$: transitionTransform = transition === 'transform' || transition.includes('transform')
	$: style = transitionTransform
		? `transform: translate(${x}px,${y}px) rotate(${rotate}deg)
	scale(${scale})`
		: null
	$: pathTransform = transitionTransform
		? null
		: `rotate(${rotate},${x},${y}) translate(${x},${y}) scale(${scale})`

	// $: bounds = decalDefs[name].getBoundingBox(params)
</script>

<g
	{style}
	transform={pathTransform}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="25"
	style:transition-property={Array.isArray(transition)
		? transition.join(',')
		: transition}
	class:transition-metrics={transition !== 'none'}
>
	<g in:popIn|global={{ delay: delayAppear, skip: !animateAppear }}>
		<svelte:component
			this={decalDefs[name].component}
			{fill}
			{scale}
			{params}
			{noAnimation}
		/>
	</g>
	<!-- {#if bounds}
		<rect
			fill="none"
			stroke="#fff"
			stroke-width="1"
			x={-bounds.width / 2}
			y={-bounds.height / 2}
			width={bounds.width}
			height={bounds.height}
		/>
	{/if} -->
</g>

<style>
	.transition-metrics {
		/* Matches tailwind's transition-transform class */
		/* Maybe expose this as a class prop instead */
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
