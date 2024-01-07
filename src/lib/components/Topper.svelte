<script lang="ts" context="module">
	type Easing = 'sineInOut' | 'sineIn' | 'sineOut' | 'linear'
	export type TopperLine = [x: number, y: number, easing?: Easing][]
	import { sineInOut } from 'svelte/easing'
	import { topperDefs, type TopperName } from './topper'

	// Don't need these yet, but maybe later
	// const easings: Record<Easing, (t: number) => number> = {
	// 	sineInOut,
	// 	sineIn,
	// 	sineOut,
	// 	linear,
	// }

	export function getYposition(x: number, topLine: TopperLine) {
		for (let i = 0; i < topLine.length; i++) {
			const point = topLine[i]
			if (point[0] === x) return point[1]
			const nextPoint = topLine[i + 1]
			if (x > point[0] && x < nextPoint[0]) {
				const betweenPoints = sineInOut((x - point[0]) / (nextPoint[0] - point[0])) // YES!
				const yDiff = nextPoint[1] - point[1]
				return point[1] + yDiff * betweenPoints
			}
		}
		console.warn('Could not calculate topper y position')
		return topLine[topLine.length - 1][1] // Should never return here
	}
</script>

<script lang="ts">
	export let name: TopperName
	export let colors: string[]
	export let position: number
	export let topLine: TopperLine
	export let offset = 0
	export let scale = 1
	export let rotate = 0

	$: xSpan = topLine[topLine.length - 1][0] - topLine[0][0]
	$: x = topLine[0][0] + xSpan * position
	$: y = getYposition(x, topLine) - offset
	$: topperDef = topperDefs[name]

	// Will probably need this function in other components later
	// function replaceColors(node: string, colors: string[]) {
	// 	for (let i = 0; i < colors.length; i++) {
	// 		node = node.replace(new RegExp(`\\{${i + 1}\\}`, 'g'), colors[i])
	// 	}
	// 	return node
	// }
	$: bounds = topperDef.getBoundingBox()
</script>

<g
	transform="rotate({rotate},{x},{y}) translate({x - topperDef.origin.x * scale},{y -
		topperDef.origin.y * scale}) scale({scale})"
>
	<svelte:component this={topperDef.component} {colors} />
	{#if bounds}
		<rect
			fill="none"
			stroke="#fff"
			stroke-width="0.5"
			x={0}
			y={0}
			width={bounds.width}
			height={bounds.height}
		/>
	{/if}
</g>
