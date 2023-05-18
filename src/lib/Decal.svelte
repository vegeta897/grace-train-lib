<script lang="ts" context="module">
	export type DecalName = keyof typeof PATH_DATA
	const PATH_DATA = {
		star: 'M50,0l11.226,34.549l36.327,0l-29.389,21.353l11.225,34.549l-29.389,-21.353l-29.389,21.353l11.225,-34.549l-29.389,-21.353l36.327,0l11.226,-34.549Z',
		heart:
			'M50,20c10.526,-20 31.579,-20 42.105,-10c10.527,10 10.527,30 0,50c-7.368,15 -26.316,30 -42.105,40c-15.79,-10 -34.737,-25 -42.105,-40c-10.527,-20 -10.527,-40 -0,-50c10.526,-10 31.579,-10 42.105,10Z',
		circle: 'M0,50a50,50 0 1,0 100,0a50,50 0 1,0 -100,0Z',
	} as const
</script>

<script lang="ts">
	export let name: keyof typeof PATH_DATA
	export let fill = '#94f20d'
	export let transform = {
		translate: { x: 0, y: 0 },
		scale: 1,
		rotate: 0,
	}
	export let transition = false

	// TODO: Maybe use svg's transform when transitions aren't needed,
	// because it might be more performant than a css transform
	/*
  transform="rotate({rotate},{translate.x},{translate.y}) translate({translate.x -
  50 * scale},{translate.y - 50 * scale}) scale({scale})"
  */
</script>

<path
	on:mouseover
	on:focus
	on:click
	on:keypress
	style:transform-origin="50px 50px"
	style:transform="translate({transform.translate.x - 50}px,{transform.translate.y -
		50}px) rotate({transform.rotate}deg) scale({transform.scale})"
	d={PATH_DATA[name]}
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
