<script lang="ts">
	import Wheels from './Wheels.svelte'
	import { COLORS } from './colors.js'

	export let color: string = 'none'
</script>

<rect x="162.5" y="12.5" width="50" height="25" style="fill:none;stroke:{COLORS.POP};" />
<rect
	x="37.5"
	y="212.5"
	width="300"
	height="25"
	style="fill:{COLORS.POP};stroke:{COLORS.POP};"
/>
<Wheels />
<path
	d="M37.5,212.5l-25,-175l350,0l-25,175l-300,0Z"
	style="fill:{COLORS.BASE};stroke:{COLORS.BASE};"
/>
<slot />
<path d="M12.5,212.5l350,0" style="fill:none;stroke:{COLORS.BASE};" />
{#if color !== 'none'}
	<path
		d="M366.143,99.934l-357.286,0l8.144,56.945l340.998,0l8.144,-56.945Z"
		style="fill:{color}"
	/>
{/if}
