<script lang="ts" context="module">
	import { COLORS } from '$lib'
	import { wrapNumber } from '$lib/util'
	import { decalLocalToGlobal } from '.'
	import { defineNumberList, defineStringList } from './params'
	export const noFill = true
	export const ARC_NAMES = ['0', '90', '180', '270'] as const
	type Piece = (typeof ARC_NAMES)[number]
	// export const ARC_DEFS: Record<Piece, { start: Endpoint; end: Endpoint }> = {
	// 	'0': { start: [25, 50, 270], end: [75, 50, 90] },
	// 	'90': { start: [25, 50, 180], end: [25, 25, 90] },
	// 	'180': { start: [25, 50, 180], end: [75, 50, 180] },
	// 	'270': { start: [25, 50, 180], end: [50, 75, 270] },
	// }
	function generateLines(
		piece: string,
		lineCount: number,
		scale: number,
		thickness: number
	) {
		const lines: Line[] = []
		lineCount = Math.min(lineCount, 2 + Math.floor((50 * scale - thickness) / thickness))
		thickness = thickness / scale
		for (let i = 0; i < lineCount; i++) {
			let inset = i * thickness
			let r = 50 - i * thickness
			lines.push({ x1: inset, y1: 50, x2: inset + r, y2: 50 - r, r })
			// lines.push({ x1: inset, y1: 50, x2: 100 - inset, y2: 50, r }) // 180
		}
		return lines
	}
	type Line = { x1: number; y1: number; x2: number; y2: number; r: number }
	function convertLinesToPaths(lines: Line[]) {
		return lines.map(
			({ x1, y1, x2, y2, r }) => `M${x1},${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`
		)
	}
	type ArcData = { x: number; y: number; scale: number; rotate: number } & ArcParams
	type Endpoint = { x: number; y: number; angle: number /*color: string*/ }
	export function getArcEndpoints(arc: ArcData) {
		const endpoints: Endpoint[] = []
		const lines = generateLines(arc.piece, arc.lines, arc.scale, arc.thickness)
		for (const { x1, y1, x2, y2 } of lines) {
			endpoints.push({
				...decalLocalToGlobal(arc, x1, y1),
				angle: wrapNumber(180 + arc.rotate, -180, 180),
			})
			endpoints.push({
				...decalLocalToGlobal(arc, x2, y2),
				angle: wrapNumber(90 + arc.rotate, -180, 180),
			})
		}
		return endpoints // Create metadata prop on Decal type in depot to store this
	}
	export function getBoundingBox() {
		// TODO: All decals should have this, set up a default 100x100 in /decals/index.ts
	}
	export type ArcParams = { piece: string; lines: number; thickness: number }
	export const paramConfig = [
		defineStringList('piece', ['0', '90', '180', '270'], '90'),
		defineNumberList('lines', [1, 2, 3, 4], 3),
		defineNumberList('thickness', [25, 50], 25),
	]
</script>

<script lang="ts">
	$$restProps
	export let scale: number
	export let params: ArcParams
	$: paths = convertLinesToPaths(
		generateLines(params.piece, params.lines, scale, params.thickness)
	)
	$: skippedLines = params.lines - paths.length
</script>

<!-- <path stroke="#fff5" fill="none" stroke-width="1" d="M50,0v100M0,50h100" />
<rect width="100" height="100" stroke="#fff2" fill="none" stroke-width="1" />
<rect x="25" y="25" width="50" height="50" stroke="#fff8" fill="none" stroke-width="1" /> -->
{#each paths as path, p}
	<path
		stroke-width={params.thickness / scale + 0.3}
		fill="none"
		stroke={COLORS.POP[p + 1 + skippedLines]}
		d={path}
	/>
{/each}
