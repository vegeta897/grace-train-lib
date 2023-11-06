<script lang="ts" context="module">
	import { defineStringList } from './params'
	import { onMount } from 'svelte'
	export const noFill = true
	export const PRIDE_FLAGS = ['rainbow', 'trans', 'bi', 'lesbian', 'pan'] as const
	export const paramConfig = [defineStringList('flag', [...PRIDE_FLAGS], 'rainbow')]
	const prideFlagData: Record<string, string> = {
		rainbow:
			'<rect y="69" width="100" height="11" fill="#9b34e9"/><rect y="20" width="100" height="11" fill="#fc444c"/><rect y="30" width="100" height="11" fill="#ffab16"/><rect y="40" width="100" height="11" fill="#fde01f"/><rect y="50" width="100" height="11" fill="#2dc736"/><rect y="60" width="100" height="10" fill="#3a5aed"/>',
		trans:
			'<rect y="20" width="100" height="60" fill="#5bcefa"/><rect y="32" width="100" height="36" fill="#fcaec9"/><rect y="44" width="100" height="12" fill="#fff7fa"/>',
		bi: '<rect y="20" width="100" height="25" fill="#e23890"/><rect y="55" width="100" height="25" fill="#0e4fd0"/><rect y="44" width="100" height="12" fill="#b44ead"/>',
		lesbian:
			'<rect y="20" width="100" height="13" fill="#ee572e"/><rect y="32" width="100" height="13" fill="#f9a46b"/><rect y="44" width="100" height="13" fill="#fef1f1"/><rect y="56" width="100" height="13" fill="#dd69ad"/><rect y="68" width="100" height="12" fill="#e11b91"/>',
		pan: '<rect y="20" width="100" height="21" fill="#f14699"/><rect y="59" width="100" height="21" fill="#5ab8eb"/><rect y="40" width="100" height="20" fill="#fce14d"/>',
	} satisfies Record<(typeof PRIDE_FLAGS)[number], string>
</script>

<script lang="ts">
	$$restProps // Captures "fill" prop so we don't get unknown prop warnings in console
	export let params: { flag: string }

	let prevFlag: string | null = null
	let wipeAnimationElem: SVGAnimateElement

	$: if (params.flag !== prevFlag) {
		if (wipeAnimationElem) {
			wipeAnimationElem?.beginElement()
		} else {
			prevFlag = params.flag
		}
	}

	onMount(() =>
		wipeAnimationElem.addEventListener('endEvent', () => (prevFlag = params.flag))
	)
</script>

<g>
	{#if prevFlag}
		<g clip-path="url(#flag-static)" transform="translate(0.2 0.2) scale(0.995)">
			{@html prideFlagData[prevFlag]}
		</g>
	{/if}
	<g clip-path="url(#flag)">
		{@html prideFlagData[params.flag]}
	</g>
	<clipPath id="flag-static">
		<rect width="100" y="20" height="60" rx="10" />
	</clipPath>
	<clipPath id="flag">
		<rect clip-path="url(#flag-wipe)" width="100" y="20" height="60" rx="10" />
	</clipPath>
	<clipPath id="flag-wipe">
		<rect width="120" y="20" x="-20" height="85" transform="rotate(-15)">
			<animate
				bind:this={wipeAnimationElem}
				attributeName="width"
				values="0;120"
				keySplines="0 0.6 0.6 1;"
				calcMode="spline"
				dur="400ms"
				restart="always"
			/>
		</rect>
	</clipPath>
</g>
