<script lang="ts" context="module">
	import { COLORS } from '$lib'
	import { wrapNumber } from '$lib/util'
	import { draw } from 'svelte/transition'
	import { defineNumberList } from './params'
	import { linear } from 'svelte/easing'

	const THICKNESS = 25
	export const noFill = true
	export function getBoundingBox() {
		// TODO: All decals should have this, set up a default 100x100 in /decals/index.ts
	}
	export type StripesParams = { thickness: number }
	export const paramConfig = [defineNumberList('thickness', [25, 50], 25)]

	function angleToXY(angle: number) {
		return {
			x: angle === 90 ? 1 : angle === 270 ? -1 : 0,
			y: angle === 0 ? -1 : angle === 180 ? 1 : 0,
		}
	}
	type Node = { turnAngle?: number; length: number; colors: string[]; noDraw?: number[] }
	type Path = { d: string; stroke: string }
	function nodesToStripePaths(nodes: Node[]): Path[][] {
		const firstNode = nodes[0]
		if (!firstNode) return []
		const stripes: { paths: Path[]; draw: boolean }[] = [0, 0, 0].map((_, s) => ({
			paths: [],
			draw: true,
		}))
		let lastAngle = 0
		let lastX = 0
		let lastY = 0
		for (let n = 0; n < nodes.length; n++) {
			const node = nodes[n]
			const length = node.length
			const turnAngle = node.turnAngle || 0
			const colors = node.colors
			const noDraw = node.noDraw || []
			const toAngle = wrapNumber(lastAngle + turnAngle, 0, 360)
			const startXY = angleToXY(lastAngle)
			const endXY = angleToXY(toAngle)
			stripes.forEach((stripe, s) => {
				if (noDraw.includes(s)) {
					stripe.draw = false
				} else if (n === 0 || !stripe.draw || colors[s] !== nodes[n - 1].colors[s]) {
					// Start or resume stripe with a new path
					stripe.paths.push({
						stroke: colors[s],
						d: `M${50 + (lastX - (s - 1) * startXY.y) * THICKNESS} ${
							50 + (lastY + (s - 1) * startXY.x) * THICKNESS
						}`,
					})
					stripe.draw = true
				}
			})
			lastX += startXY.x * length
			lastY += startXY.y * length
			if (turnAngle === 0) {
				let x = startXY.x * length * THICKNESS
				let y = startXY.y * length * THICKNESS
				if (x === 0) x = 0.0001 // Prevent zero-area bounding box
				if (y === 0) y = 0.0001
				let line = ` l${x} ${y}`
				stripes.forEach((stripe) => {
					if (stripe.draw) stripe.paths[stripe.paths.length - 1].d += line
				})
			} else {
				const turn = turnAngle < 0 ? -1 : 1
				const sweepFlag = turn < 0 ? 0 : 1
				stripes.forEach((stripe, s) => {
					if (!stripe.draw) return
					const stripeLength = length - (s - 1) * turn
					const radius = stripeLength * THICKNESS
					let xDelta = (startXY.x + endXY.x) * THICKNESS * stripeLength
					let yDelta = (startXY.y + endXY.y) * THICKNESS * stripeLength
					if (xDelta === 0) xDelta = 0.0001 // Prevent zero-area bounding box
					if (yDelta === 0) yDelta = 0.0001
					const arc = ` a${radius} ${radius} 0 0 ${sweepFlag} ${xDelta} ${yDelta}`
					stripe.paths[stripe.paths.length - 1].d += arc
				})
				lastAngle = toAngle
				lastX += endXY.x * length
				lastY += endXY.y * length
			}
		}
		return stripes.map((stripe) => stripe.paths)
	}
</script>

<script lang="ts">
	$$restProps
	export let params: { nodes: Node[] }
	$: stripePaths = nodesToStripePaths(params.nodes)
</script>

{#each stripePaths as stripe, s}
	{#each stripe as { d, stroke }, p}
		<path
			transition:draw|global={{ speed: 0.3, delay: p * 800, easing: linear }}
			stroke-width={THICKNESS + 0.3}
			fill="none"
			{d}
			{stroke}
		/>
	{/each}
{/each}
<linearGradient id="test0" x1="0" x2="1" y1="1" y2="0">
	<stop offset="0%" stop-color={COLORS.POP[1]} />
	<stop offset="100%" stop-color={COLORS.POP[3]} />
</linearGradient>

<linearGradient id="test1" x1="0" x2="1" y1="1" y2="0">
	<stop offset="0%" stop-color={COLORS.POP[3]} />
	<stop offset="100%" stop-color={COLORS.POP[5]} />
</linearGradient>

<linearGradient id="test2" x1="0" x2="1" y1="1" y2="0">
	<stop offset="0%" stop-color={COLORS.POP[0]} />
	<stop offset="100%" stop-color={COLORS.POP[2]} />
</linearGradient>
