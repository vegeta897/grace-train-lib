<script lang="ts">
	let className = ''
	export { className as class }
	export let viewBox = '-20 -80 415 380'
	export let width = '100%'
	export let svgElement: SVGElement | undefined = undefined
	export let position: 'relative' | 'absolute' | 'static' = 'static'
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	class={className}
	{width}
	bind:this={svgElement}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="25"
	style:overflow="visible"
	style:position
>
	<slot />
</svg>
