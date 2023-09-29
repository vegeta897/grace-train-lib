<script lang="ts" context="module">
	import { lerpPath, parsePathString, stringifyPathCommands } from '$lib/util'

	const pentagonPath = parsePathString(
		'M50,5L71,21L93,36L85,61L76,86L50,86L24,86L15,61L7,36L29,21L50,5Z'
	)
	const pinchPath = parsePathString(
		'M50,5L50,50L93,36L50,50L76,86L50,50L24,86L50,50L7,36L50,50L50,5Z'
	)
</script>

<script lang="ts">
	export let pinch = 0.52
	export let outline = false
	export let strokeWidth = 0
	$: strokeWidthPx = 10 + 10 * strokeWidth
	$: d = stringifyPathCommands(lerpPath(pentagonPath, pinchPath, pinch))
</script>

<path {d} stroke-width="{strokeWidthPx}px" fill={outline ? 'none' : undefined} />
