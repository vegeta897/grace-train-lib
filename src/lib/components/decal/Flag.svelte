<script lang="ts" context="module">
	import { defineStringList } from './params'
	import { noAnim, wipe } from '$lib/util'
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
</script>

<g>
	{#key params.flag}
		<g clip-path="url(#flag)">
			<g in:wipe={{ duration: 250 }} out:noAnim={{ delay: 250 }}>
				{@html prideFlagData[params.flag]}
			</g>
		</g>
	{/key}
	<clipPath id="flag">
		<rect width="100" y="20" height="60" rx="10" />
	</clipPath>
</g>
