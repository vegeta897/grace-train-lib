<script lang="ts" context="module">
	export const TOPPER_NAMES = ['party_hat'] as const
	export type TopperName = (typeof TOPPER_NAMES)[number]
	export type TopperLine = [x: number, y: number][]
	import { sineInOut } from 'svelte/easing'

	const SVG_DATA: Record<
		TopperName,
		{ svgNodes: string[]; origin: { x: number; y: number } }
	> = {
		party_hat: {
			svgNodes: [
				'<path d="M12.533,116.534c23.039,9.04 46.445,9.623 70.294,-0l-34.073,-104.001l-36.221,104.001Z" style="fill:{1};stroke:{1};"/>',
				'<path d="M2.426,107.449l6.577,-18.886c25.021,12.759 53.256,20.797 85.414,23.089l0.321,0.98c2.054,6.268 -1.103,13.056 -7.221,15.525c-1.98,0.799 -3.958,1.536 -5.933,2.212c-29.324,-3.326 -55.541,-11.217 -79.158,-22.92Z" stroke="none" style="fill:{2};"/>',
				'<path d="M15.35,70.34l6.575,-18.88c17.794,8.986 37.31,15.293 58.828,18.487l6.829,20.844c-26.65,-2.815 -50.587,-9.851 -72.232,-20.451Z" stroke="none" style="fill:{2};"/>',
				'<path d="M28.615,32.251l6.6,-18.949c9.768,5.267 20.125,9.523 31.13,12.667l7.275,22.207c-16.141,-3.35 -31.098,-8.735 -45.005,-15.925Z" stroke="none" style="fill:{2};"/>',
			],
			origin: { x: 48, y: 120 },
		},
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

	function getYposition(x: number, topLine: TopperLine) {
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
		return topLine[topLine.length - 1][1] // Should never return here
	}

	$: xSpan = topLine[topLine.length - 1][0] - topLine[0][0]
	$: x = topLine[0][0] + xSpan * Math.min(Math.max(position, 0), 1)
	$: y = getYposition(x, topLine) - offset

	// Will probably need this function in other components later
	function replaceColors(node: string, colors: string[]) {
		for (let i = 0; i < colors.length; i++) {
			node = node.replace(new RegExp(`\\{${i + 1}\\}`, 'g'), colors[i])
		}
		return node
	}

	$: data = SVG_DATA[name]
	$: svgNodes = data.svgNodes.map((n) => replaceColors(n, colors))
</script>

<g
	transform="rotate({rotate},{x},{y}) translate({x - data.origin.x * scale},{y -
		data.origin.y * scale}) scale({scale})"
>
	{#each svgNodes as svgNode}
		{@html svgNode}
	{/each}
</g>
