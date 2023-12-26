<script lang="ts" context="module">
	import { COLORS } from '$lib'
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
	$: baseColor = props.baseColor || COLORS.BASE[3]
	$: popColor = props.popColor || COLORS.POP[1]
	$: stripeColor = props.stripeColor || 'none'
</script>

<svelte:component this={body[name].component} {baseColor} {popColor} {stripeColor}>
	<slot name="wheels" slot="wheels">
		<Wheels />
	</slot>
	<slot name="decals" slot="decals" />
	<!-- <slot name="toppers" slot="toppers" /> -->
	<svelte:fragment slot="toppers">
		<slot name="toppers" topLine={body[name].topperLine} />
		<!-- TODO: Remove? Use an actual topper to test with -->
		<!-- {#each body[name].topperLine as [tpx, tpy]}
			<circle cx={tpx} cy={tpy} r="3" fill="none" stroke-width="2" stroke="red" />
		{/each} -->
	</svelte:fragment>
</svelte:component>
