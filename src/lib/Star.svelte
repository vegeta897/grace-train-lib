<script lang="ts">
	export let fill = '#94f20d'
	export let rotate = 0
	export let translate = { x: 0, y: 0 }
	export let scale = 1
</script>

<path
	transform="rotate({rotate},{translate.x},{translate.y}) translate({translate.x -
		50 * scale},{translate.y - 50 * scale}) scale({scale})"
	d="M50,0l11.226,34.549l36.327,0l-29.389,21.353l11.225,34.549l-29.389,-21.353l-29.389,21.353l11.225,-34.549l-29.389,-21.353l36.327,0l11.226,-34.549Z"
	style:fill
/>
