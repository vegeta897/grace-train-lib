<script lang="ts" context="module">
	import { defineScalar, defineToggle } from './params'

	export const paramConfig = [
		defineScalar('pinch', 'pinch', 0.5),
		defineScalar('round', 'round'),
		defineToggle('outline'),
		defineScalar('strokeWidth', 'thickness'),
	]

	const getWidth = (pinch: number) => 100 - Math.max(0, pinch - 0.5) * 150
	const getHeight = (pinch: number) => 100 - Math.max(0, 0.5 - pinch) * 150
	const getStrokeWidth = (strokeWidth: number) => 10 + 20 * strokeWidth

	export const getBoundingBox = (params: Params) => {
		const strokeWidth = getStrokeWidth(params.strokeWidth)
		return {
			width: getWidth(params.pinch) + strokeWidth,
			height: getHeight(params.pinch) + strokeWidth,
		}
	}

	type Params = {
		pinch: number
		round: number
		outline: boolean
		strokeWidth: number
	}
</script>

<script lang="ts">
	$$restProps
	export let fill: string
	export let params: Params
	$: strokeWidthPx = getStrokeWidth(params.strokeWidth)
	$: width = getWidth(params.pinch)
	$: height = getHeight(params.pinch)
	$: rx = (Math.max(width, height) / 2) * params.round
</script>

<rect
	x={-width / 2}
	y={-height / 2}
	{width}
	{height}
	{rx}
	stroke-width="{strokeWidthPx}px"
	stroke={fill}
	fill={params.outline ? 'none' : fill}
/>
