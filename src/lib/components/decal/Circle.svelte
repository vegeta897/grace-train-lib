<script lang="ts" context="module">
	import { defineScalar } from './params'

	export const paramConfig = [defineScalar('pinch', 0.5), defineScalar('hollow')]
</script>

<script lang="ts">
	$$restProps
	export let fill: string
	export let params: { pinch: number; hollow: number }
	$: rx = 50 - Math.max(0, params.pinch - 0.5) * 60
	$: ry = 50 - Math.max(0, 0.5 - params.pinch) * 60
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
