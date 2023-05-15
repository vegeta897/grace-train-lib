<script lang="ts">
	import { COLORS } from './colors.js'

	export let color: string | null = 'none'

	$: _color = color && color !== 'none' ? `${color}cc` : COLORS.BASE
</script>

<svg viewBox="0 0 375 300" width="100%">
	<circle cx="87.5" cy="262.5" r="25" style="fill:{COLORS.BASE};stroke:{COLORS.POP};" />
	<circle cx="287.5" cy="262.5" r="25" style="fill:{COLORS.BASE};stroke:{COLORS.POP};" />
	<rect
		x="162.5"
		y="12.5"
		width="50"
		height="25"
		style="fill:none;stroke:{COLORS.POP};"
	/>
	<rect
		x="37.5"
		y="212.5"
		width="300"
		height="25"
		style="fill:{COLORS.POP};stroke:{COLORS.POP};"
	/>
	<path
		d="M37.5,212.5l-25,-175l350,0l-25,175l-300,0Z"
		style="fill:{COLORS.BASE};stroke:{COLORS.BASE};"
	/>
	<g clip-path="url(#body-decals)">
		<slot />
	</g>
	<path d="M12.5,212.5l350,0" style="fill:none;stroke:{COLORS.BASE};" />
	{#if color !== 'none'}
		<path
			d="M366.143,99.934l-357.286,0l8.144,56.945l340.998,0l8.144,-56.945Z"
			style="fill:{_color}"
		/>
	{/if}
	<defs>
		<clipPath id="body-decals">
			<path d="M37.5,212.5l-25,-175l350,0l-25,175l-300,0Z" />
		</clipPath>
	</defs>
</svg>

<style>
	svg {
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 25px;
	}
</style>
