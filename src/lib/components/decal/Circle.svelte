<script lang="ts">
	export let pinch = 0.5
	export let hollow = 0
	$: strokeWidthPx = 10 + 40 * (1 - hollow)
</script>

<ellipse
	cx="50"
	cy="50"
	rx={45 - (1 - hollow) * 20 - (pinch > 0.5 ? 40 * (pinch - 0.5) * 2 : 0)}
	ry={45 - (1 - hollow) * 20 - (pinch < 0.5 ? 40 * (0.5 - pinch) * 2 : 0)}
	stroke-width="{strokeWidthPx}px"
	fill={'none'}
/>
