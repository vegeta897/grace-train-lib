<script lang="ts" context="module">
	import type { TopLinePoints } from '../Topper.svelte'

	export const decalClipPath =
		'M25,80c-6.904,0 -12.5,-5.596 -12.5,-12.5l0,-30c0,-6.904 5.596,-12.5 12.5,-12.5l325,0c6.904,-0 12.5,5.596 12.5,12.5l0,30c0,6.904 -5.596,12.5 -12.5,12.5l0,120l-325,0l0,-120Zm300,0l-75,0l-0,64.978l75,-0l-0,-64.978Zm-100,0l-75,0l-0,64.978l75,-0l-0,-64.978Zm-100,0l-75,0l-0,64.978l75,-0l-0,-64.978Z'
	export const topperLinePoints: TopLinePoints = [
		[10, 50, 'cubicOut'],
		[25, 25],
		[145, 25, 'sineInOut'],
		[160, 0],
		[215, 0, 'sineInOut'],
		[230, 25],
		[350, 25, 'cubicIn'],
		[365, 50],
	]
</script>

<script lang="ts">
	export let baseColor: string
	export let popColor: string
	// export let stripeColor: string
</script>

<rect x="162.5" y="12.5" width="50" height="25" style="fill:none;stroke:{popColor};" />
<rect
	x="37.5"
	y="212.5"
	width="300"
	height="25"
	style="fill:{popColor};stroke:{popColor};"
/>
<path d="M37.5,67.5l0,90" style="fill:none;stroke:{baseColor};" />
<path d="M137.5,67.5l0,90" style="fill:none;stroke:{baseColor};" />
<path d="M237.5,67.5l0,90" style="fill:none;stroke:{baseColor};" />
<path d="M337.5,67.5l0,90" style="fill:none;stroke:{baseColor};" />
<rect
	x="25"
	y="37.5"
	width="325"
	height="30"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<rect
	x="37.5"
	y="157.5"
	width="300"
	height="55"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<slot name="decals" />
<path d="M12.5,212.5l350,0" style="fill:none;stroke:{baseColor};" />
<slot name="wheels" />
<slot name="toppers" />
