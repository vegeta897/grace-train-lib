<script lang="ts">
	import { COLORS } from '$lib/colors.js'

	export let baseColor: string = COLORS.BASE[3]
	export let popColor: string = COLORS.POP[1]
	export let stripeColor: string = 'none'

	$: baseColor = baseColor || COLORS.BASE[3]
	$: popColor = popColor || COLORS.POP[1]
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
