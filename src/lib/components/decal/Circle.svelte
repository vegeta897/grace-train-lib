<script lang="ts" context="module">
	import { defineScalar } from './params'

	const getRx = (pinch: number) => 50 - Math.max(0, pinch - 0.5) * 60
	const getRy = (pinch: number) => 50 - Math.max(0, 0.5 - pinch) * 60

	export const paramConfig = [defineScalar('pinch', 'pinch', 0.5), defineScalar('hollow')]

	type Params = { pinch: number; hollow: number }
	export const getBoundingBox = (params: Params) => ({
		width: getRx(params.pinch) * 2,
		height: getRy(params.pinch) * 2,
	})
</script>

<script lang="ts">
	$$restProps
	export let fill: string
	export let params: Params
	$: rx = getRx(params.pinch)
	$: ry = getRy(params.pinch)
	$: hrx = params.hollow * (rx - 10)
	$: hry = params.hollow * (ry - 10)
	$: hollowPath =
		params.hollow > 0
			? `M0,${-hry}A${hrx},${hry} 0 0,1 0,${hry}A${hrx},${hry} 0 0,1 0,${-hry}Z`
			: ''
</script>

<path
	d="M0,{-ry} A{rx},{ry} 0 0,1 0,{ry}A{rx},{ry} 0 0,1 0,{-ry}Z{hollowPath}"
	fill-rule="evenodd"
	{fill}
	stroke="none"
/>
