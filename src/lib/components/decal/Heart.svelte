<script lang="ts" context="module">
	import { lerpPath, parsePathString, stringifyPathCommands } from '$lib/util'
	import { defineScalar, defineToggle } from './params'

	const defaultPath = parsePathString(
		'M50,28C58,12 75,12 84,19C92,27 92,41 84,56C78,67 63,78 50,85C37,78 22,67 16,56C8,41 8,27 16,19C25,12 42,12 50,28Z'
	)
	const taperPath = parsePathString(
		'M50,28C58,12 75,12 84,19C90,25 90,36 84,47C77,58 59,68 50,85C41,68 23,58 16,47C10,36 10,25 16,19C24,11 42,12 50,28Z'
	)

	export const paramConfig = [
		defineScalar('dip', 0.34),
		defineScalar('taper'),
		defineToggle('outline'),
		defineScalar('strokeWidth'),
	]
</script>

<script lang="ts">
	export let params: { dip: number; taper: number; outline: boolean; strokeWidth: number }
	$: strokeWidthPx = 10 + 10 * params.strokeWidth
	$: d = stringifyPathCommands(
		(() => {
			const path = lerpPath(defaultPath, taperPath, params.taper)
			const dipY = 17 + 32 * params.dip
			;(path[0][1] as number[][])[0][1] = dipY
			;(path[6][1] as number[][])[2][1] = dipY
			return path
		})()
	)
</script>

<path {d} stroke-width="{strokeWidthPx}px" fill={params.outline ? 'none' : undefined} />
