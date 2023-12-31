<script lang="ts" context="module">
	import { COLOR_NAMES } from '$lib'
	import Wheels from './Wheels.svelte'
	import type { BodyName } from './body/index.js'
	import { body } from './body/index.js'
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

<svelte:component this={body[name].component} {baseColor} {popColor} {stripeColor}>
	<slot name="wheels" slot="wheels">
		<Wheels />
	</slot>
	<svelte:fragment slot="decals">
		<g clip-path="url(#{name}-decal-clip)">
			<slot name="decals" />
		</g>
	</svelte:fragment>
	<slot name="toppers" slot="toppers" topLine={body[name].topperLine} />
	<!-- <svelte:fragment slot="toppers">
		<slot name="toppers" topLine={body[name].topperLine} />
		TODO: Remove? Use an actual topper to test with
		{#each body[name].topperLine as [tpx, tpy]}
			<circle cx={tpx} cy={tpy} r="3" fill="none" stroke-width="2" stroke="red" />
		{/each}
	</svelte:fragment> -->
</svelte:component>
<defs>
	<clipPath id="{name}-decal-clip"> <path d={body[name].decalClipPath} /> </clipPath>
</defs>
