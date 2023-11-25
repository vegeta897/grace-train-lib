<script lang="ts" context="module">
	import { lerpPath, parsePathString, stringifyPathCommands } from '$lib/util'
	import { defineScalar, defineToggle } from './params'

	const pentagonPath = parsePathString(
		'M50,5L71,21L93,36L85,61L76,86L50,86L24,86L15,61L7,36L29,21L50,5Z'
	)
	const pinchPath = parsePathString(
		'M50,5L50,50L93,36L50,50L76,86L50,50L24,86L50,50L7,36L50,50L50,5Z'
	)

	// TODO: Use this code in a sparkle decal or something
	// function drawStar(points: number, innerRadius: number) {
	// 	let d = 'M50,5'
	// 	for (let i = 1; i < points * 2; i++) {
	// 		const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2 // Start at top
	// 		const radius = 45 - innerRadius * (i % 2)
	// 		const x = 50 + Math.cos(angle) * radius
	// 		const y = 50 + Math.sin(angle) * radius
	// 		d += `L${x} ${y}`
	// 	}
	// 	return d + 'Z'
	// }

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
