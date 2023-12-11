<script lang="ts">
	import type { ParamsObject } from '$lib/components'
	import { decalDefs, type DecalName } from '$lib/components/decal'

	export let decalName: DecalName
	export let params: ParamsObject

	$: paramList = decalDefs[decalName].paramConfig
</script>

<div style="margin-bottom: 1rem; display: flex; flex-wrap: wrap; column-gap: 0.5rem;">
	<h2 style:width="100%">{decalName} params</h2>
	{#each paramList as param}
		<div>
			<label for={param.name}>{param.name}</label>
			<code>{params[param.name]}</code>
			<br />
			{#if param.type === 'scalar'}
				<input
					name={param.name}
					type="range"
					min="0"
					max="1"
					step="0.01"
					bind:value={params[param.name]}
				/>
			{:else if param.type === 'toggle'}
				<input name={param.name} type="checkbox" bind:checked={params[param.name]} />
			{:else if param.slider}
				{@const list = param.list}
				<input
					id={param.name}
					type="range"
					min={0}
					max={list.length - 1}
					step="1"
					value={list.indexOf(params[param.name])}
					on:input={(e) => (params[param.name] = list[e.currentTarget.valueAsNumber])}
					class="range"
				/>
			{/if}
		</div>
	{/each}
</div>

<style>
	h2 {
		margin: 0;
	}
</style>
