<script lang="ts">
	let className = ''
	export { className as class }
</script>

<svg viewBox="0 0 375 300" class={className} width="100%">
	<slot />
</svg>

<style>
	svg {
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 25px;
	}
</style>
