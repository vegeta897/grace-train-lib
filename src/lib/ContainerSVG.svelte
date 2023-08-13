<script lang="ts">
	let className = ''
	export { className as class }
	export let viewBox = '0 0 375 300'
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
	class={className}
	width="100%"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="25"
	style:overflow="visible"
>
	<slot />
</svg>
