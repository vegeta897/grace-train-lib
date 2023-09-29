<script lang="ts" context="module">
	export type DecalTransitionProperty = 'transform' | 'opacity' | 'fill'
</script>

<script lang="ts">
	import { COLORS } from '$lib'
	import { decal, type DecalName } from './decal'

	export let name: DecalName
	export let fill = COLORS.POP[5]
	export let transform = { x: 0, y: 0, scale: 1, rotate: 0 }
	export let transition:
		| DecalTransitionProperty
		| DecalTransitionProperty[]
		| 'all'
		| 'none' = 'none'
	export let params: (typeof decal)[typeof name]['params'] = []

	$: paramsObject = Object.fromEntries(params.map((p) => [p[0], p[1].value]))
	// Use svg transform prop when transition does not include transform
	$: transitionTransform = transition === 'transform' || transition.includes('transform')
	$: style = transitionTransform
		? `transform-origin: 50px 50px; transform: translate(${transform.x - 50}px,${
				transform.y - 50
		  }px) rotate(${transform.rotate}deg)
	scale(${transform.scale})`
		: null
	$: pathTransform = transitionTransform
		? null
		: `rotate(${transform.rotate},${transform.x},${transform.y}) translate(${
				transform.x - 50 * transform.scale
		  },${transform.y - 50 * transform.scale}) scale(${transform.scale})`
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
	<svelte:component this={decal[name].component} {...paramsObject}></svelte:component>
</g>

<style>
	.transition-metrics {
		/* Matches tailwind's transition-transform class */
		/* Maybe expose this as a class prop instead */
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
