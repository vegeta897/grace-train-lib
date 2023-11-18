<script lang="ts" context="module">
	import { lerpPath, parsePathString, stringifyPathCommands } from '$lib/util'
	import { defineScalar, defineToggle } from './params'

	const pentagonPath = parsePathString(
		'M50,5L71,21L93,36L85,61L76,86L50,86L24,86L15,61L7,36L29,21L50,5Z'
	)
	const pinchPath = parsePathString(
		'M50,5L50,50L93,36L50,50L76,86L50,50L24,86L50,50L7,36L50,50L50,5Z'
	)
	export const paramConfig = [
		defineScalar('pinch', 0.52),
		defineToggle('outline'),
		defineScalar('strokeWidth'),
	]
	type Params = { pinch: number; outline: boolean; strokeWidth: number }
	export const getBoundingBox = (params: Params) => ({
		width: 100 + 10 * params.strokeWidth,
		height: 100 + 10 * params.strokeWidth,
	})
</script>

<script lang="ts">
	$$restProps
	export let fill: string
	export let params: Params
	$: strokeWidthPx = 10 + 10 * params.strokeWidth
	$: d = stringifyPathCommands(lerpPath(pentagonPath, pinchPath, params.pinch))
</script>

<path
	transform="translate(-50,-50)"
	{d}
	stroke-width="{strokeWidthPx}px"
	stroke={fill}
	fill={params.outline ? 'none' : fill}
/>
