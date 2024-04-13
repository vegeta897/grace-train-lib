<script lang="ts" context="module">
	import { COLOR_NAMES } from '$lib'
	import type { BodyName } from '$lib/data'
	// import { getYposition } from '.'
	import Wheels from './Wheels.svelte'
	import { bodyDefs } from './body'
</script>

<script lang="ts">
	export let name: BodyName
	$: props = $$restProps
	interface $$Props {
		name: BodyName
		baseColor?: string
		popColor?: string
		stripeColor?: string
	}
	$: baseColor = props.baseColor || COLOR_NAMES.BASE.BASE
	$: popColor = props.popColor || COLOR_NAMES.POP.POP
	$: stripeColor = props.stripeColor || 'none'
	$: bodyDef = bodyDefs[name]
</script>

<svelte:component this={bodyDef.component} {baseColor} {popColor} {stripeColor}>
	<slot name="wheels" slot="wheels">
		<Wheels />
	</slot>
	<svelte:fragment slot="decals">
		<g clip-path="url(#{name}-decal-clip)">
			<slot name="decals" />
		</g>
	</svelte:fragment>
	<slot name="toppers" slot="toppers" topLine={bodyDef.topperLine} />
	<!-- <svelte:fragment slot="toppers">
		<slot name="toppers" topLine={bodyDef.topperLine} />
		{#each bodyDef.topperLine.points as [tpx, tpy]}
			<circle cx={tpx} cy={tpy} r="3" fill="none" stroke-width="2" stroke="#fff" />
		{/each}
		{#each Array(200) as _, i}
			{@const x = bodyDef.topperLine.startX + bodyDef.topperLine.width * (i / 200)}
			<circle cx={x} cy={getYposition(x, bodyDef.topperLine.points)} r="2" fill="#fff8" />
		{/each}
	</svelte:fragment> -->
</svelte:component>
<defs>
	<clipPath id="{name}-decal-clip"> <path d={bodyDef.decalClipPath} /> </clipPath>
</defs>
