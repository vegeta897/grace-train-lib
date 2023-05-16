<script lang="ts">
	export let fill = '#94f20d'
	export let rotate = 0
	export let translate = { x: 0, y: 0 }
	export let scale = 1
	export let transition = false

	// TODO: Maybe use svg's transform when transitions aren't needed,
	// because it might be more performant than a css transform
	/*
  transform="rotate({rotate},{translate.x},{translate.y}) translate({translate.x -
  50 * scale},{translate.y - 50 * scale}) scale({scale})"
  */
</script>

<path
	style:transform-origin="50px 50px"
	style:transform="translate({translate.x - 50}px,{translate.y - 50}px) rotate({rotate}deg)
	scale({scale})"
	d="M50,0l11.226,34.549l36.327,0l-29.389,21.353l11.225,34.549l-29.389,-21.353l-29.389,21.353l11.225,-34.549l-29.389,-21.353l36.327,0l11.226,-34.549Z"
	style:fill
	class:transition
/>

<style>
	.transition {
		/* Matches tailwind's transition-transform class */
		/* Maybe expose this as a class prop instead */
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
