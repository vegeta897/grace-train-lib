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
	d="M37.5,212.5l-25,-175l350,0l-25,175l-300,0Z"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<!-- Clip paths work on elements with strokes! -->
<!-- The clip path itself ignores its own stroke, but we don't care! -->
<g clip-path="url(#boxy-decal-clip)">
	<slot name="decals" />
</g>
<path d="M12.5,212.5l350,0" style="fill:none;stroke:{baseColor};" />
<slot name="wheels" />
{#if stripeColor !== 'none'}
	<path
		d="M366.143,99.934l-357.286,0l8.144,56.945l340.998,0l8.144,-56.945Z"
		style="fill:{stripeColor}"
	/>
{/if}
<slot name="toppers" />
<defs>
	<clipPath id="boxy-decal-clip">
		<path
			d="M23.087,200l-22.961,-160.732c-0.513,-3.587 0.557,-7.221 2.931,-9.958c2.374,-2.738 5.819,-4.31 9.443,-4.31l350,0c3.624,-0 7.069,1.572 9.443,4.31c2.374,2.737 3.444,6.371 2.931,9.958l-22.961,160.732l-328.826,0Z"
		/>
	</clipPath>
</defs>
