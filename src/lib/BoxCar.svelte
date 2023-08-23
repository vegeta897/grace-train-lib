<script lang="ts">
	import { COLORS } from './colors.js'

	export let baseColor: string = COLORS.BASE
	export let popColor: string = COLORS.POP
	export let stripeColor: string = 'none'

	$: baseColor = baseColor || COLORS.BASE
	$: popColor = popColor || COLORS.POP
</script>

<rect
	x="162.5"
	y="12.5"
	width="50"
	height="25"
	class="color-transition"
	style="fill:none;stroke:{popColor};"
/>
<rect
	x="37.5"
	y="212.5"
	width="300"
	height="25"
	class="color-transition"
	style="fill:{popColor};stroke:{popColor};"
/>
<slot name="wheels" />
<path
	d="M37.5,212.5l-25,-175l350,0l-25,175l-300,0Z"
	class="color-transition"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<slot name="decals" />
<path
	d="M12.5,212.5l350,0"
	class="color-transition"
	style="fill:none;stroke:{baseColor};"
/>
{#if stripeColor !== 'none'}
	<path
		d="M366.143,99.934l-357.286,0l8.144,56.945l340.998,0l8.144,-56.945Z"
		style="fill:{stripeColor}"
	/>
{/if}
<slot name="toppers" />

<style>
	.color-transition {
		transition-property: fill stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
