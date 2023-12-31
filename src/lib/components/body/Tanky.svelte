<script lang="ts" context="module">
	import type { TopperLine } from '../Topper.svelte'

	export const decalClipPath =
		'M16.577,200c-8.597,-11.4 -16.577,-33.157 -16.577,-74.652c0,-90.642 37.484,-87.849 37.503,-87.848l299.997,0c0.01,0 0.021,0 0.031,0c0,0 37.527,-2.726 37.527,87.5c-0,41.713 -7.98,63.564 -16.595,75l-341.886,0Z'
	export const topperLine: TopperLine = [
		[34, 38],
		[107, 38],
		[160, 0],
		[215, 0],
		[268, 38],
		[341, 38],
	]
</script>

<script lang="ts">
	export let baseColor: string
	export let popColor: string
	export let stripeColor: string
</script>

<rect x="162.5" y="12.5" width="50" height="25" style="fill:none;stroke:{popColor};" />
<rect
	x="37.5"
	y="212.5"
	width="300"
	height="25"
	style="fill:{popColor};stroke:{popColor};"
/>
<path
	d="M37.5,200c0,0 -25,0 -25,-75c0,-75 25,-75 25,-75l300,0c0,0 25,0 25,75c-0,75 -25,75 -25,75l-300,-0Z"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<slot name="decals" />
<path d="M12.5,212.5l350,0" style="fill:none;stroke:{baseColor};" />
<slot name="wheels" />
{#if stripeColor !== 'none'}
	<path
		d="M374.044,99.934l-373.024,0c-0,0 -1.02,9.223 -1.02,28.473c0,15.457 1.763,28.472 1.763,28.472l371.616,0c0,0 1.663,-13.268 1.663,-28.472c0,-17.099 -0.998,-28.473 -0.998,-28.473Z"
		style="fill:{stripeColor}"
	/>
{/if}
<slot name="toppers" />
