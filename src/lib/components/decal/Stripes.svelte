<script lang="ts" context="module">
	import { wrapNumber } from '$lib/util'
	import { defineNumberList } from './params'

	const THICKNESS = 25
	const STRIPE_COUNT_DEFAULT = 3

	export const noFill = true
	export const minimumScale = 1 // TODO: Implement this for decal configs

	// https://stackoverflow.com/a/42424631/2612679
	function angleIsBetween(angle: number, from: number, to: number) {
		if (from < to) {
			if (to - from <= 180) return from < angle && angle < to
			else return to < angle || angle < from
		} else {
			if (from - to <= 180) return to < angle && angle < from
			else return from < angle || angle < to
		}
	}

	export const getBoundingBox = (params: Params) => {
		const stripeNodes = getStripeNodes(params.nodes, params.stripeCount)
		return getBoundingBoxFromStripeNodes(stripeNodes)
	}

	function getBoundingBoxFromStripeNodes(stripeNodes: StripeNode[][]) {
		let xBounds = [Infinity, -Infinity]
		let yBounds = [Infinity, -Infinity]
		function updateBounds(x: number, y: number) {
			if (x < xBounds[0]) xBounds[0] = x
			if (x > xBounds[1]) xBounds[1] = x
			if (y < yBounds[0]) yBounds[0] = y
			if (y > yBounds[1]) yBounds[1] = y
		}
		stripeNodes.forEach((stripe) => {
			for (const node of stripe) {
				const { x, y } = node
				updateBounds(x, y)
				if (node.type === 'A') {
					const { cx, cy, radius, sweepFrom, sweepTo } = node
					if (angleIsBetween(90, sweepFrom, sweepTo)) updateBounds(cx + radius, cy)
					if (angleIsBetween(0, sweepFrom, sweepTo)) updateBounds(cx, cy - radius)
					if (angleIsBetween(180, sweepFrom, sweepTo)) updateBounds(cx, cy + radius)
					if (angleIsBetween(270, sweepFrom, sweepTo)) updateBounds(cx - radius, cy)
				}
			}
		})
		const width = xBounds[1] - xBounds[0]
		const height = yBounds[1] - yBounds[0]
		return {
			x: xBounds[0] - THICKNESS / 2,
			y: yBounds[0] - THICKNESS / 2,
			ox: xBounds[0] + width / 2,
			oy: yBounds[0] + height / 2,
			width: Math.max(50, width + THICKNESS), // 50 is a good minimum size
			height: Math.max(50, height + THICKNESS),
		}
	}

	function getXYFromAngle(angle: number, radius = 1) {
		if (radius === 0) return [0, 0]
		const rad = ((angle + 180) * Math.PI) / 180
		return [Math.cos(rad) * radius, Math.sin(rad) * radius]
	}

	export type StripesNode = [turn?: number, length?: number, noDraw?: number[]]

	type StripeNode = { x: number; y: number } & (
		| { type: 'L' | 'M' }
		| {
				type: 'A'
				radius: number
				side: number
				cx: number
				cy: number
				sweepFrom: number
				sweepTo: number
		  }
	)
	function getStripeNodes(nodes: StripesNode[], stripeCount = STRIPE_COUNT_DEFAULT) {
		let angle = 0
		const stripes = Array.from({ length: stripeCount }, (_, s) => ({
			stripeNodes: [] as StripeNode[],
			draw: true,
			x: -s * THICKNESS,
			y: 0,
		}))
		if (!nodes[0]) return stripes.map((s) => s.stripeNodes)
		const outsideRadius = stripeCount - 1
		for (const node of nodes) {
			const turn = Math.max(-90, Math.min(90, node[0] || 0))
			const length = Math.min(20, node[1] || 0)
			const noDraw = node[2] || []
			stripes.forEach((stripe, s) => {
				if (noDraw.includes(s)) {
					stripe.draw = false
				} else if (!stripe.draw || stripe.stripeNodes.length === 0) {
					// Resume stripe
					stripe.stripeNodes.push({ type: 'M', x: stripe.x, y: stripe.y })
					stripe.draw = true
				}
			})
			if (turn === 0) {
				const [xOffset, yOffset] = getXYFromAngle(angle + 90, length * THICKNESS)
				stripes.forEach((stripe) => {
					stripe.x += xOffset
					stripe.y += yOffset
					if (stripe.draw)
						stripe.stripeNodes.push({ type: 'L', x: stripe.x, y: stripe.y })
				})
			} else {
				const side = Math.sign(turn) // Turning left or right
				const newAngle = wrapNumber(angle + turn, 0, 360)
				// Sweep angles are perpendicular to stripe direction
				const sweepFrom = wrapNumber(angle - 90 * side, 0, 360)
				const sweepTo = wrapNumber(newAngle - 90 * side, 0, 360)
				const insideStripe = side > 0 ? stripes[0] : stripes[stripes.length - 1]
				const [xOffset, yOffset] = getXYFromAngle(angle)
				const cx = insideStripe.x - xOffset * THICKNESS * length * side
				const cy = insideStripe.y - yOffset * THICKNESS * length * side
				const [xEndOffset, yEndOffset] = getXYFromAngle(newAngle)
				stripes.forEach((stripe, s) => {
					const radius = (length + (side < 0 ? outsideRadius - s : s)) * THICKNESS
					stripe.x = cx + radius * xEndOffset * side
					stripe.y = cy + radius * yEndOffset * side
					if (stripe.draw)
						stripe.stripeNodes.push({
							type: 'A',
							x: stripe.x,
							y: stripe.y,
							radius,
							side,
							cx,
							cy,
							sweepFrom,
							sweepTo,
						})
				})
				angle = newAngle
			}
		}
		return stripes.map((s) => s.stripeNodes)
	}

	export type StripesParams = { thickness: number }
	export const paramConfig = [defineNumberList('thickness', [25], 25)] // TODO: Don't need thickness

	function stripeNodesToPaths(stripeNodes: ReturnType<typeof getStripeNodes>): string[] {
		const paths = stripeNodes.map(() => '')
		stripeNodes.forEach((stripe, s) => {
			for (const node of stripe) {
				const x = Math.round(node.x * 100) / 100 // Should be enough precision
				const y = Math.round(node.y * 100) / 100
				switch (node.type) {
					case 'M':
					case 'L':
						paths[s] += `${node.type}${x} ${y}`
						break
					case 'A':
						const sweepFlag = node.side < 0 ? 0 : 1
						paths[s] += `A${node.radius} ${node.radius} 0 0 ${sweepFlag} ${x} ${y}`
						break
				}
			}
		})
		return paths
	}

	type Params = {
		nodes: StripesNode[]
		stripeCount?: number
		colors: string[]
		mixColors?: string[]
	}
</script>

<script lang="ts">
	$$restProps
	export let params: Params
	$: stripeNodes = getStripeNodes(params.nodes, params.stripeCount)
	$: stripePaths = stripeNodesToPaths(stripeNodes)
	$: boundingBox = getBoundingBoxFromStripeNodes(stripeNodes)

	// TODO: Compute all possible arc end positions (for a set length/angle range)
	// and allow user to drag endpoint around in the canvas
</script>

<g transform="translate({-boundingBox.ox},{-boundingBox.oy})">
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
</g>
{#if params.mixColors}
	{#each params.mixColors as toColor, m}
		{@const fromColor = params.colors[m]}
		<linearGradient x1="0" x2="1" y1="1" y2="0" id="stripe-grad-{m}">
			<stop offset="0%" stop-color={fromColor} />
			<stop offset="100%" stop-color={toColor} />
		</linearGradient>
	{/each}
{/if}
