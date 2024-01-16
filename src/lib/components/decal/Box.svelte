<script lang="ts" context="module">
	import { defineScalar, defineToggle } from '../params'

	export const paramConfig = [
		defineScalar('pinch'),
		defineScalar('round'),
		defineToggle('outline'),
		defineScalar('strokeWidth', 'thickness', 0.5),
	]

	const getHeight = (pinch: number) => 100 - pinch * 80
	const getStrokeWidth = (strokeWidth: number) => 10 + 20 * strokeWidth

	export const getBoundingBox = (params: Params) => {
		const strokeWidth = getStrokeWidth(params.strokeWidth)
		return {
			width: 100 + strokeWidth,
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
	$: height = getHeight(params.pinch)
	$: rx = (height / 2) * params.round
</script>

<rect
	x={-50}
	y={-height / 2}
	width={100}
	{height}
	{rx}
	stroke-width="{strokeWidthPx}px"
	stroke={fill}
	fill={params.outline ? 'none' : fill}
/>
