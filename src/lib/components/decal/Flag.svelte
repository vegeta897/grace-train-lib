<script lang="ts" context="module">
	import { defineStringList } from './params'
	import { noAnim, flagWipe } from '$lib/util'
	export const noFill = true
	export const PRIDE_FLAGS = [
		'rainbow',
		'progress',
		'trans',
		'bi',
		'lesbian',
		'pan',
	] as const
	export const paramConfig = [defineStringList('flag', [...PRIDE_FLAGS], 'rainbow')]
	const prideFlagData: Record<string, string> = {
		rainbow:
			'<rect y="69" width="100" height="11" fill="#9b34e9"/><rect y="20" width="100" height="11" fill="#fc444c"/><rect y="30" width="100" height="11" fill="#ffab16"/><rect y="40" width="100" height="11" fill="#fde01f"/><rect y="50" width="100" height="11" fill="#2dc736"/><rect y="60" width="100" height="10" fill="#3a5aed"/>',
		progress:
			'<rect y="69" width="100" height="11" fill="#9b34e9"/><rect y="20" width="100" height="11" fill="#fc444c"/><rect x="0" y="30" width="100" height="11" fill="#ffab16"/><rect x="0" y="40" width="100" height="11" fill="#fde01f"/><rect x="0" y="50" width="100" height="11" fill="#2dc736"/><rect x="0" y="60" width="100" height="10" fill="#3a5aed"/><path d="M0,20l30,30l-30,30l0,-7.56l22.44,-22.44l-22.44,-22.44l0,-7.56Z" fill="#5bcefa"/><path d="M7.56,20l30.002,30l-30.002,30l-7.56,0l30,-30l-30,-30l7.56,0Z" fill="#613915"/><path d="M15.12,20l30,30l-30,30l-7.56,0l30,-30l-30,-30l7.56,0Z"/><path d="M0,35.12l14.88,14.88l-14.88,14.88l0,-29.76Z" fill="#fff7fa"/><path d="M0,27.56l22.44,22.44l-22.44,22.44l0,-7.56l14.88,-14.88l-14.88,-14.88l0,-7.56Z" fill="#fdaec9"/>',
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
</script>

<g>
	<g clip-path="url(#rounded-flag)">
		{#key params.flag}
			<g in:flagWipe={{ duration: 450 }} out:noAnim={{ delay: 450 }}>
				{@html prideFlagData[params.flag]}
			</g>
		{/key}
	</g>
	<clipPath id="rounded-flag">
		<rect width="100" y="20" height="60" rx="10" />
	</clipPath>
</g>
