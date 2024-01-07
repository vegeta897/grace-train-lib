<script lang="ts" context="module">
	import { defineListPicker } from './params'
	import { noAnim, flagWipe } from '$lib/util'
	export const noFill = true
	export const PRIDE_FLAGS = [
		'rainbow',
		'progress',
		'trans',
		'lesbian',
		'gay',
		'bi',
		'pan',
		'asexual',
		'nonbinary',
		'genderfluid',
		'genderqueer',
		'intersex',
	] as const
	export const paramConfig = [
		defineListPicker('flag', 'flag', [...PRIDE_FLAGS], [100, 60], 'rainbow'),
	]
	const prideFlagData: Record<string, string> = {
		rainbow:
			'<rect y="69" width="100" height="11" fill="#9b34e9"/><rect y="20" width="100" height="11" fill="#fc444c"/><rect y="30" width="100" height="11" fill="#ffab16"/><rect y="40" width="100" height="11" fill="#fde01f"/><rect y="50" width="100" height="11" fill="#2dc736"/><rect y="60" width="100" height="10" fill="#3a5aed"/>',
		progress:
			'<rect y="69" width="100" height="11" fill="#9b34e9"/><rect y="20" width="100" height="11" fill="#fc444c"/><rect x="0" y="30" width="100" height="11" fill="#ffab16"/><rect x="0" y="40" width="100" height="11" fill="#fde01f"/><rect x="0" y="50" width="100" height="11" fill="#2dc736"/><rect x="0" y="60" width="100" height="10" fill="#3a5aed"/><path d="M0,20l30,30l-30,30l0,-7.56l22.44,-22.44l-22.44,-22.44l0,-7.56Z" fill="#5bcefa"/><path d="M7.56,20l30.002,30l-30.002,30l-7.56,0l30,-30l-30,-30l7.56,0Z" fill="#613915"/><path d="M15.12,20l30,30l-30,30l-7.56,0l30,-30l-30,-30l7.56,0Z"/><path d="M0,35.12l14.88,14.88l-14.88,14.88l0,-29.76Z" fill="#fff7fa"/><path d="M0,27.56l22.44,22.44l-22.44,22.44l0,-7.56l14.88,-14.88l-14.88,-14.88l0,-7.56Z" fill="#fdaec9"/>',
		trans:
			'<rect y="20" width="100" height="60" fill="#5bcefa"/><rect y="32" width="100" height="36" fill="#fcaec9"/><rect y="44" width="100" height="12" fill="#fff7fa"/>',
		lesbian:
			'<rect y="20" width="100" height="13" fill="#ee572e"/><rect y="32" width="100" height="13" fill="#f9a46b"/><rect y="44" width="100" height="13" fill="#fef1f1"/><rect y="56" width="100" height="13" fill="#dd69ad"/><rect y="68" width="100" height="12" fill="#e11b91"/>',
		gay: '<rect y="20" width="100" height="13" fill="#00a07e"/><rect y="32" width="100" height="13" fill="#91eec0"/><rect y="44" width="100" height="13" fill="#f9fffe"/><rect y="56" width="100" height="13" fill="#74b2f3"/><rect y="68" width="100" height="12" fill="#4f15af"/>',
		bi: '<rect y="20" width="100" height="25" fill="#e23890"/><rect y="55" width="100" height="25" fill="#3a5aed"/><rect y="44" width="100" height="12" fill="#bf29b5"/>',
		pan: '<rect y="20" width="100" height="21" fill="#f14699"/><rect y="59" width="100" height="21" fill="#5ab8eb"/><rect y="40" width="100" height="20" fill="#fce14d"/>',
		asexual:
			'<rect y="20" width="100" height="16" fill="#170716"/><rect y="35" width="100" height="16" fill="#ae9fae"/><rect y="50" width="100" height="16" fill="#fff4fe"/><rect y="65" width="100" height="15" fill="#b002b0"/>',
		nonbinary:
			'<rect y="20" width="100" height="16" fill="#ffe431"/><rect y="35" width="100" height="16" fill="#fff4fe"/><rect y="50" width="100" height="16" fill="#b002b0"/><rect y="65" width="100" height="15" fill="#170716"/>',
		genderfluid:
			'<rect y="20" width="100" height="13" fill="#ff7caa"/><rect y="32" width="100" height="13" fill="#fdf3f9"/><rect y="44" width="100" height="13" fill="#b002b0"/><rect y="56" width="100" height="13" fill="#0a0318"/><rect y="68" width="100" height="12" fill="#3a5aed"/>',
		genderqueer:
			'<rect y="20" width="100" height="21" fill="#b961f8"/><rect y="59" width="100" height="21" fill="#4ca10f"/><rect y="40" width="100" height="20" fill="#f5f9fc"/>',
		intersex:
			'<rect y="20" width="100" height="60" fill="#ffe431"/><circle cx="50" cy="50" r="14.7" fill="none" stroke="#a33bda" stroke-width="5px"/>',
	} satisfies Record<(typeof PRIDE_FLAGS)[number], string>

	export const getBoundingBox = () => ({
		width: 100,
		height: 60,
	})
</script>

<script lang="ts">
	$$restProps // Captures "fill" prop so we don't get unknown prop warnings in console
	export let params: { flag: string }
</script>

<g transform="translate(-50,-50)">
	<g clip-path="url(#rounded-flag)">
		{#key params.flag}
			<g in:flagWipe={{ duration: 450 }} out:noAnim={{ delay: 450 }}>
				{@html prideFlagData[params.flag]}
			</g>
		{/key}
	</g>
	<clipPath id="rounded-flag">
		<rect width="100" y="20" height="60" rx="12.5" />
	</clipPath>
</g>
