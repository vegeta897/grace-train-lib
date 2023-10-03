<script lang="ts" context="module">
	export type DecalTransitionProperty = 'transform' | 'opacity' | 'fill'
</script>

<script lang="ts">
	import { COLORS } from '$lib'
	import { popIn } from '$lib/util'
	import type { DecalName } from './decal'
	import { decalDefs } from './decal'
	import type { ParamsObject } from './decal/params'

	export let name: DecalName
	export let fill: string = COLORS.POP[5]
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

	export let animateAppear = false
	export let delayAppear = 0

	// Use svg transform prop when transition does not include transform
	$: transitionTransform = transition === 'transform' || transition.includes('transform')
	$: style = transitionTransform
		? `transform-origin: 50px 50px; transform: translate(${x - 50}px,${
				y - 50
		  }px) rotate(${rotate}deg)
	scale(${scale})`
		: null
	$: pathTransform = transitionTransform
		? null
		: `rotate(${rotate},${x},${y}) translate(${x - 50 * scale},${
				y - 50 * scale
		  }) scale(${scale})`
</script>

<g
	{style}
	transform={pathTransform}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="25"
	stroke={fill}
	{fill}
	style:transition-property={Array.isArray(transition)
		? transition.join(',')
		: transition}
	class:transition-metrics={transition !== 'none'}
>
	<g
		in:popIn|local={{ delay: delayAppear, skip: !animateAppear }}
		style:transform-origin="50px 50px"
	>
		<svelte:component this={decalDefs[name].component} {params}></svelte:component>
	</g>
</g>

<style>
	.transition-metrics {
		/* Matches tailwind's transition-transform class */
		/* Maybe expose this as a class prop instead */
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
