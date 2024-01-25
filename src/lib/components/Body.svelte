<script lang="ts" context="module">
	import { COLOR_NAMES } from '$lib'
	import type { BodyName } from '$lib/data'
	import Wheels from './Wheels.svelte'
	import { bodyDefs } from './body/index.js'
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
</script>

<svelte:component this={bodyDefs[name].component} {baseColor} {popColor} {stripeColor}>
	<slot name="wheels" slot="wheels">
		<Wheels />
	</slot>
	<svelte:fragment slot="decals">
		<g clip-path="url(#{name}-decal-clip)">
			<slot name="decals" />
		</g>
	</svelte:fragment>
	<slot name="toppers" slot="toppers" topLine={bodyDefs[name].topperLine} />
	<!-- <svelte:fragment slot="toppers">
		<slot name="toppers" topLine={bodyDefs[name].topperLine} />
		{#each bodyDefs[name].topperLine.points as [tpx, tpy]}
			<circle cx={tpx} cy={tpy} r="3" fill="none" stroke-width="2" stroke="red" />
		{/each}
	</svelte:fragment> -->
</svelte:component>
<defs>
	<clipPath id="{name}-decal-clip"> <path d={bodyDefs[name].decalClipPath} /> </clipPath>
</defs>
