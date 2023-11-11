<script lang="ts" context="module">
	import { COLORS } from '$lib'
	import { wrapNumber } from '$lib/util'
	import { defineNumberList } from './params'

	// TODO: Rename to Stripes

	const THICKNESS = 25
	export const noFill = true
	export function getBoundingBox() {
		// TODO: All decals should have this, set up a default 100x100 in /decals/index.ts
	}
	export type ArcParams = { thickness: number }
	export const paramConfig = [defineNumberList('thickness', [25, 50], 25)]

	function angleToXY(angle: number) {
		return {
			x: angle === 90 ? 1 : angle === 270 ? -1 : 0,
			y: angle === 0 ? -1 : angle === 180 ? 1 : 0,
		}
	}
	type Node = { turnAngle?: number; length: number; noDraw?: number[] }
	function nodesToPaths(nodes: Node[]): { d: string; stroke: string }[] {
		const firstNode = nodes[0]
		if (!firstNode) return []
		const paths = [0, 0, 0].map((_, i) => ({
			stroke: COLORS.POP[1 + i],
			d: `M${50 + (i - 1) * THICKNESS} 50`,
			draw: true,
		}))
		let lastAngle = 0
		let lastX = 0
		let lastY = 0
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i]
			const length = node.length
			const turnAngle = node.turnAngle || 0
			const noDraw = node.noDraw || []
			const toAngle = wrapNumber(lastAngle + turnAngle, 0, 360)
			const startXY = angleToXY(lastAngle)
			const endXY = angleToXY(toAngle)
			paths.forEach((path, p) => {
				if (noDraw.includes(p)) {
					path.draw = false
				} else if (!path.draw) {
					path.d += `M${50 + (lastX - (p - 1) * startXY.y) * THICKNESS} ${
						50 + (lastY + (p - 1) * startXY.x) * THICKNESS
					}`
					path.draw = true
				}
			})
			lastX += startXY.x * length
			lastY += startXY.y * length
			if (turnAngle === 0) {
				let line = ` l${startXY.x * length * THICKNESS} ${startXY.y * length * THICKNESS}`
				paths.forEach((path) => {
					if (path.draw) path.d += line
				})
			} else {
				const turn = turnAngle < 0 ? -1 : 1
				const sweepFlag = turn < 0 ? 0 : 1
				paths.forEach((path, p) => {
					if (!path.draw) return
					const stripeLength = length - (p - 1) * turn
					const radius = stripeLength * THICKNESS
					const xDelta = (startXY.x + endXY.x) * THICKNESS * stripeLength
					const yDelta = (startXY.y + endXY.y) * THICKNESS * stripeLength
					const arc = ` a${radius} ${radius} 0 0 ${sweepFlag} ${xDelta} ${yDelta}`
					path.d += arc
				})
				lastAngle = toAngle
				lastX += endXY.x * length
				lastY += endXY.y * length
			}
		}
		return paths
	}
</script>

<script lang="ts">
	$$restProps
	export let params: {
		nodes: Node[]
	}
	$: paths = nodesToPaths(params.nodes)
	// $: paths = convertLinesToPaths(
	// 	generateLines(params.piece, params.lines, scale, params.thickness)
	// )
	// $: skippedLines = params.lines - paths.length
</script>

<!-- <path stroke="#fff5" fill="none" stroke-width="1" d="M50,0v100M0,50h100" />
<rect width="100" height="100" stroke="#fff2" fill="none" stroke-width="1" />
<rect x="25" y="25" width="50" height="50" stroke="#fff8" fill="none" stroke-width="1" /> -->
{#each paths as { d, stroke }, p}
	<path stroke-width={THICKNESS + 0.3} fill="none" {d} stroke="url(#test{p})" />
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
