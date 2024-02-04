<script lang="ts" context="module">
	import type { TopLinePoints } from '../Topper.svelte'

	export const decalClipPath =
		'M10.295,200.194c-6.222,-4.549 -10.267,-11.903 -10.267,-20.194c0,-8.017 3.782,-15.158 9.658,-19.734c-4.579,-4.533 -7.417,-10.82 -7.417,-17.766c-0,-8.497 4.248,-16.01 10.734,-20.528c-4.127,-4.459 -6.65,-10.423 -6.65,-16.972c-0,-10.17 6.086,-18.93 14.811,-22.833c-2.992,-4.121 -4.757,-9.19 -4.757,-14.667c-0,-13.798 11.202,-25 25,-25l292.186,0c13.798,0 25,11.202 25,25c0,5.477 -1.765,10.546 -4.757,14.667c8.725,3.903 14.811,12.663 14.811,22.833c0,6.549 -2.523,12.513 -6.65,16.972c6.486,4.518 10.734,12.031 10.734,20.528c0,6.946 -2.838,13.233 -7.417,17.766c5.876,4.576 9.658,11.717 9.658,19.734c-0,8.291 -4.045,15.645 -10.267,20.194c-0.716,-0.127 -1.453,-0.194 -2.205,-0.194l-350,0c-0.752,0 -1.489,0.067 -2.205,0.194Z'
	export const topperLinePoints: TopLinePoints = [
		[16, 65, 'cubicOut'],
		[38, 42],
		[337, 42, 'cubicIn'],
		[359, 65],
	]
</script>

<script lang="ts">
	$$restProps
	export let baseColor: string
	export let popColor: string
	// export let stripeColor: string
</script>

<rect
	x="37.5"
	y="212.5"
	width="300"
	height="25"
	style="fill:{popColor};stroke:{popColor};"
/>
<path d="M25.028,180l324.944,0" style="fill:none;stroke:{baseColor};stroke-width:50px;" />
<path
	d="M27.269,142.5l320.462,0"
	style="fill:none;stroke:{baseColor};stroke-width:50px;"
/>
<path d="M31.353,105l312.294,0" style="fill:none;stroke:{baseColor};stroke-width:50px;" />
<path
	d="M41.407,67.5l292.186,0"
	style="fill:none;stroke:{baseColor};stroke-width:50px;"
/>
<slot name="decals" />
<path d="M37.514,62.5l0,150" style="fill:none;stroke:{popColor};" />
<path d="M137.5,62.5l0,150" style="fill:none;stroke:{popColor};" />
<path d="M237.5,62.5l0,150" style="fill:none;stroke:{popColor};" />
<path d="M337.5,62.5l0,150" style="fill:none;stroke:{popColor};" />
<path d="M12.5,212.5l350,0" style="fill:none;stroke:{baseColor};" />
<slot name="wheels" />
<slot name="toppers" />
