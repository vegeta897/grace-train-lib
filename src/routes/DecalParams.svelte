<script lang="ts">
	import type { DecalParam } from '$lib/components/decal'

	export let title: string
	export let params: DecalParam[]
</script>

<div style="margin-bottom: 1rem;">
	<h2>{title}</h2>
	{#each params as [prop, param]}
		<label for={prop}>{prop}</label>
		{#if param.type === 'scalar'}
			<input
				name={prop}
				type="range"
				min="0"
				max="1"
				step="0.01"
				bind:value={param.value}
			/>
		{:else if param.type === 'toggle'}
			<input name={prop} type="checkbox" bind:checked={param.value} />
		{/if}
	{/each}
</div>

<style>
	h2 {
		margin: 0;
	}
</style>
