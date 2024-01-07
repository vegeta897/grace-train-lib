<script lang="ts" context="module">
	import type { TopperLine } from '../Topper.svelte'

	export const decalClipPath =
		'M91.405,200l-65.33,-118.291c-1.037,-1.817 -1.056,-4.442 -1.061,-6.683l0,-0.026l0,-37.5c0,-6.904 5.597,-12.5 12.5,-12.5l299.972,0c6.903,-0 12.5,5.596 12.5,12.5l-0,37.5l-0,0.026c-0.005,2.241 0.35,3.972 -0.687,5.789l-65.704,119.185l-192.19,0Z'
	export const topperLine: TopperLine = [
		[37, 25],
		[110, 25],
		[160, 0],
		[215, 0],
		[265, 25],
		[338, 25],
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
<path d="M37.514,75v137.5" style="fill:none;stroke:{popColor};" />
<path d="M337.5,75v137.5" style="fill:none;stroke:{popColor};" />
<rect
	x="37.514"
	y="37.5"
	width="299.971"
	height="37.5"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<path
	d="M112.454,212.5l-74.94,-137.5l299.972,0l-74.94,137.5l-150.092,0Z"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<slot name="decals" />
<path d="M12.5,212.5h350" style="fill:none;stroke:{baseColor};" />
<slot name="wheels" />
<slot name="toppers" />
