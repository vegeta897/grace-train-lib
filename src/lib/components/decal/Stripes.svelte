<script lang="ts" context="module">
	import { wrapNumber } from '$lib/util'
	import { defineNumberList } from './params'

	const THICKNESS = 25
	const ORIGIN_X = 50
	const ORIGIN_Y = 50

	export const noFill = true
	export const minimumScale = 1 // TODO: Implement this
	export function getBoundingBox() {
		// TODO: All decals should have this, set up a default 100x100 in /decals/index.ts
	}
	export type StripesParams = { thickness: number }
	export const paramConfig = [defineNumberList('thickness', [25], 25)] // TODO: Don't need thickness

	const degToRad = (degrees: number) => (degrees * Math.PI) / 180
	const getUnitCircleX = (angle: number) => Math.cos(degToRad(angle + 180))
	const getUnitCircleY = (angle: number) => Math.sin(degToRad(angle + 180))

	type Node = { turn?: number; length?: number; noDraw?: number[] }
	// type Path = { d: string; stroke: string }
	// type Gradient = { from: string; to: string; x: number; y: number; id: string }
	function nodesToStripePaths(nodes: Node[]): string[] {
		const firstNode = nodes[0]
		if (!firstNode) return []
		const stripes: { pathData: string; draw: boolean }[] = [0, 0, 0].map((_, s) => ({
			pathData: `M${ORIGIN_X + (s - 1) * THICKNESS} ${ORIGIN_Y}`,
			draw: true,
		}))
		let lastAngle = 0
		let lastX = 0
		let lastY = 0
		for (let n = 0; n < nodes.length; n++) {
			const node = nodes[n]
			const length = node.length || 1
			const turn = node.turn || 0
			const noDraw = node.noDraw || []
			const toAngle = wrapNumber(lastAngle + turn, 0, 360)
			const startX = getUnitCircleX(lastAngle)
			const startY = getUnitCircleY(lastAngle)
			stripes.forEach((stripe, s) => {
				if (noDraw.includes(s)) {
					stripe.draw = false
				} else if (!stripe.draw) {
					// Start or resume stripe with a new path
					;(stripe.pathData += ` M${ORIGIN_X + (lastX - (s - 1) * startX) * THICKNESS} ${
						ORIGIN_Y + (lastY - (s - 1) * startY) * THICKNESS
					}`),
						(stripe.draw = true)
				}
			})
			if (turn === 0) {
				let xUnits = getUnitCircleX(lastAngle + 90) * length
				let yUnits = getUnitCircleY(lastAngle + 90) * length
				lastX += xUnits
				lastY += yUnits
				let lineToX = xUnits * THICKNESS
				let lineToY = yUnits * THICKNESS
				if (lineToX === 0) lineToX = 0.0001 // Prevent zero-area bounding box
				if (lineToY === 0) lineToY = 0.0001
				let line = ` l${lineToX} ${lineToY}`
				stripes.forEach((stripe) => {
					if (stripe.draw) stripe.pathData += line
				})
			} else {
				const side = Math.sign(turn) // Turning left or right
				const sweepFlag = side < 0 ? 0 : 1
				const largeArcFlag = Math.abs(turn) > 180 ? 1 : 0
				const deltaX = getUnitCircleX(toAngle) - startX
				const deltaY = getUnitCircleY(toAngle) - startY
				lastX += length * side * deltaX
				lastY += length * side * deltaY
				stripes.forEach((stripe, s) => {
					if (!stripe.draw) return
					const radius = (length - (s - 1) * side) * THICKNESS * side
					let arcToX = deltaX * radius
					let arcToY = deltaY * radius
					if (arcToX === 0) arcToX = 0.0001 // Prevent zero-area bounding box
					if (arcToY === 0) arcToY = 0.0001
					const arc = ` a${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${arcToX} ${arcToY}`
					stripe.pathData += arc
				})
				lastAngle = toAngle
			}
		}
		return stripes.map((stripe) => stripe.pathData)
	}
</script>

<script lang="ts">
	$$restProps
	export let params: { nodes: Node[]; colors: string[]; mixColors?: string[] }
	$: stripePaths = nodesToStripePaths(params.nodes)
</script>

{#each stripePaths as pathData, s}
	<path
		stroke-width={THICKNESS + 0.3}
		fill="none"
		d={pathData}
		stroke={params.mixColors ? `url(#stripe-grad-${s})` : params.colors[s]}
	/>
{/each}
{#if params.mixColors}
	{#each params.mixColors as toColor, m}
		{@const fromColor = params.colors[m]}
		<linearGradient x1="0" x2="1" y1="1" y2="0" id="stripe-grad-{m}">
			<stop offset="0%" stop-color={fromColor} />
			<stop offset="100%" stop-color={toColor} />
		</linearGradient>
	{/each}
{/if}
