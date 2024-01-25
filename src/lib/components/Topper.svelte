<script lang="ts" context="module">
	type Easing = 'sineInOut' | 'sineIn' | 'sineOut' | 'cubicIn' | 'cubicOut' | 'linear'
	export type TopLinePoints = [x: number, y: number, easing?: Easing][]
	export type TopLine = {
		points: TopLinePoints
		width: number
		startX: number
		endX: number
	}
	import { cubicIn, cubicOut, linear, sineIn, sineInOut, sineOut } from 'svelte/easing'
	import { topperDefs, type TopperDef } from './topper'
	import type { TopperName, ParamsObject } from '$lib/data'

	const easings: Record<Easing, (t: number) => number> = {
		sineInOut,
		sineIn,
		sineOut,
		cubicIn,
		cubicOut,
		linear,
	}

	// rational person who finishes things: you don't need to simulate physical hat placement
	// me:

	export function getYposition(x: number, points: TopLinePoints) {
		if (points.length === 1) return 0
		for (let i = 0; i < points.length - 1; i++) {
			const [pointX, pointY, easing = 'linear'] = points[i]
			if (pointX === x) return pointY
			const [nextPointX, nextPointY] = points[i + 1]
			if (x > pointX && x <= nextPointX) {
				const betweenPoints = easings[easing]((x - pointX) / (nextPointX - pointX)) // YES!
				const yDiff = nextPointY - pointY
				return pointY + yDiff * betweenPoints
			}
		}
		console.warn('Could not calculate topper y position')
		return points[points.length - 1][1] // Should never return here
	}

	export function getTopperBaseTransform(
		position: number,
		scale: number,
		topperDef: TopperDef,
		topLine: TopLine
	) {
		const leftX =
			topLine.startX + (topLine.width - topperDef.pivots.width * scale) * position
		const rightX = Math.min(topLine.endX, leftX + topperDef.pivots.width * scale)
		const originX = leftX + (topperDef.origin.x - topperDef.pivots.left.x) * scale
		const leftY = getYposition(leftX, topLine.points)
		const rightY = getYposition(rightX, topLine.points)
		const originY = (leftY + rightY) / 2
		const rotate = (Math.atan2(rightY - leftY, rightX - leftX) * 180) / Math.PI
		return { leftX, x: originX, y: originY, rotate }
	}
</script>

<script lang="ts">
	export let name: TopperName
	export let position = 0
	export let topLine: TopLine = { points: [[0, 0]], width: 0, startX: 0, endX: 0 }
	export let offset = 0
	export let scale = 1
	export let rotate = 0
	export let params: ParamsObject

	$: topperDef = topperDefs[name]
	$: transform = getTopperBaseTransform(position, scale, topperDef, topLine)
	$: angle = transform.rotate + rotate
	$: y = transform.y - offset

	// $: bounds = topperDef.getBoundingBox()
</script>

<g
	transform="rotate({angle},{transform.x},{y}) translate({transform.x -
		topperDef.origin.x * scale},{y - topperDef.origin.y * scale}) scale({scale})"
>
	<svelte:component this={topperDef.component} {params} />
	<!-- {#if bounds}
		<rect
			fill="none"
			stroke="#fff"
			stroke-width="0.5"
			width={bounds.width}
			height={bounds.height}
		/>
	{/if} -->
	<slot />
</g>
