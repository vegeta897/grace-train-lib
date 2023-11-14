<script lang="ts" context="module">
	import { wrapNumber } from '$lib/util'
	import { defineNumberList } from './params'

	const THICKNESS = 25
	const ORIGIN_X = 50
	const ORIGIN_Y = 50

	export const noFill = true
	export const minimumScale = 1 // TODO: Implement this for decal configs

	const degToRad = (degrees: number) => (degrees * Math.PI) / 180
	const getUnitCircleX = (angle: number) => Math.cos(degToRad(angle + 180))
	const getUnitCircleY = (angle: number) => Math.sin(degToRad(angle + 180))

	export function getBoundingBox(nodes: StripesNode[], stripeCount = 3) {
		// TODO: All decals should have this, set up a default 100x100 in /decals/index.ts
		const routedNodes = routeStripeNodes(nodes, stripeCount)
		let xBounds = [ORIGIN_X, ORIGIN_X]
		let yBounds = [ORIGIN_Y, ORIGIN_Y]
		for (const { x, y } of routedNodes.nodes) {
			if (x < xBounds[0]) xBounds[0] = x
			if (x > xBounds[1]) xBounds[1] = x
			if (y < yBounds[0]) yBounds[0] = y
			if (y > yBounds[1]) yBounds[1] = y
		}
		return {
			x: xBounds[0],
			y: yBounds[0],
			width: xBounds[1] - xBounds[0],
			height: yBounds[1] - yBounds[0],
		}
	}

	function getStripeXYOffset(angle: number, stripe: number) {
		if (stripe === 0) return [0, 0]
		return [
			getUnitCircleX(angle) * stripe * THICKNESS,
			getUnitCircleY(angle) * stripe * THICKNESS,
		]
	}

	export type StripesNode = [turn?: number, length?: number, noDraw?: number[]]

	function routeStripeNodes(nodes: StripesNode[], stripeCount = 3) {
		// TODO: Route each stripe in this function
		// Need it for bounding box, and no use for just the origin stripe route

		const outsideRadius = stripeCount - 1
		const firstNode = nodes[0]
		if (!firstNode) return { stripeCount, nodes: [] }
		let angle = 0
		let x = ORIGIN_X
		let y = ORIGIN_Y
		return {
			stripeCount,
			nodes: nodes.map((node) => {
				const turn = node[0] || 0
				const length = node[1] || 0
				const noDraw = node[2] || []
				const side = Math.sign(turn) // Turning left or right
				if (turn === 0) {
					x += getUnitCircleX(angle + 90) * length * THICKNESS
					y += getUnitCircleY(angle + 90) * length * THICKNESS
				} else {
					const toAngle = wrapNumber(angle + turn, 0, 360)
					// Skip calculations for turns that don't change the x,y
					if (turn < 0 || length > 0) {
						const deltaX = (getUnitCircleX(toAngle) - getUnitCircleX(angle)) * side
						const deltaY = (getUnitCircleY(toAngle) - getUnitCircleY(angle)) * side
						const outsideLength = side < 0 ? outsideRadius : 0
						x += (length + outsideLength) * deltaX * THICKNESS
						y += (length + outsideLength) * deltaY * THICKNESS
					}
					angle = toAngle
				}
				return { x, y, angle, side, turn, length, noDraw }
			}),
		}
	}

	export type StripesParams = { thickness: number }
	export const paramConfig = [defineNumberList('thickness', [25], 25)] // TODO: Don't need thickness

	function routedNodesToPaths(route: ReturnType<typeof routeStripeNodes>): string[] {
		const outsideRadius = route.stripeCount - 1
		const firstNode = route.nodes[0]
		if (!firstNode) return []
		const stripes: { pathData: string; draw: boolean }[] = Array.from(
			{ length: route.stripeCount },
			(_, s) => ({
				pathData: `M${ORIGIN_X - s * THICKNESS} ${ORIGIN_Y}`,
				draw: true,
			})
		)
		let prevNode = firstNode
		for (const node of route.nodes) {
			const { x, y, angle, side, turn, length, noDraw } = node
			stripes.forEach((stripe, s) => {
				if (noDraw.includes(s)) {
					stripe.draw = false
				} else if (!stripe.draw) {
					// Resume stripe
					const [xOffset, yOffset] = getStripeXYOffset(prevNode.angle, s)
					stripe.pathData += ` M${prevNode.x + xOffset} ${prevNode.y + yOffset}`
					stripe.draw = true
				}
			})
			const [unitXOffset, unitYOffset] = getStripeXYOffset(angle, 1)
			if (turn === 0) {
				stripes.forEach((stripe, s) => {
					if (!stripe.draw) return
					stripe.pathData += ` L${x + unitXOffset * s} ${y + unitYOffset * s}`
				})
			} else {
				const sweepFlag = side < 0 ? 0 : 1
				const largeArcFlag = Math.abs(turn) > 180 ? 1 : 0 // TODO: Don't allow >180deg
				stripes.forEach((stripe, s) => {
					if (!stripe.draw) return
					const radius = (length + (side < 0 ? outsideRadius - s : s)) * THICKNESS
					let arcToX = x + unitXOffset * s
					let arcToY = y + unitYOffset * s
					const arc = ` A${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${arcToX} ${arcToY}`
					stripe.pathData += arc
				})
			}
			prevNode = node
		}
		return stripes.map((stripe) => stripe.pathData)
	}
</script>

<script lang="ts">
	$$restProps
	export let params: { nodes: StripesNode[]; colors: string[]; mixColors?: string[] }
	$: stripePaths = routedNodesToPaths(routeStripeNodes(params.nodes, 3))

	// TODO: Don't use getBBox or export bounding box
	// We don't need this stuff running outside of the stripes editor in the depot
	// Make a module function that takes the nodes argument and outputs the bounding box

	// TODO: Compute all possible arc end positions (for a set length/angle range)
	// and allow user to drag endpoint around in the canvas
</script>

{#each stripePaths as pathData, s}
	{@const colorIndex = s % params.colors.length}
	<path
		stroke-width={THICKNESS + 0.3}
		fill="none"
		d={pathData}
		stroke={params.mixColors
			? `url(#stripe-grad-${colorIndex})`
			: params.colors[colorIndex]}
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
