<script lang="ts" context="module">
	export type DecalTransitionProperty = 'transform' | 'opacity' | 'fill' | 'stroke'
</script>

<script lang="ts">
	import { COLORS } from '$lib'
	import { popIn } from '$lib/util'
	import type { DecalName } from './decal'
	import { decalDefs } from './decal'
	import { getBoundingBox } from './decal/Stripes.svelte'
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
	// TODO: Move css transform and animation stuff into a wrapper component
	// Or just make a Depot version of this component
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

	$: bounds = params.nodes && getBoundingBox(params.nodes)
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
	<g
		in:popIn|global={{ delay: delayAppear, skip: !animateAppear }}
		style:transform-origin="50px 50px"
	>
		<svelte:component this={decalDefs[name].component} {fill} {scale} {params}
		></svelte:component>
	</g>
	{#if bounds}
		<rect
			fill="none"
			stroke="#fff"
			stroke-width="1"
			x={bounds.x}
			y={bounds.y}
			width={bounds.width}
			height={bounds.height}
		/>
	{/if}
</g>

<style>
	.transition-metrics {
		/* Matches tailwind's transition-transform class */
		/* Maybe expose this as a class prop instead */
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
