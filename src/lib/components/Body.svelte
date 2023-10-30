<script lang="ts" context="module">
	import Wheels from './Wheels.svelte'
	import type { BodyName } from './body/index.js'
	import { body } from './body/index.js'
</script>

<script lang="ts">
	export let name: BodyName
	export let baseColor: string | undefined = undefined
	export let popColor: string | undefined = undefined
	export let stripeColor: string | undefined = 'none'

	// TODO: Move wheels and toppers out of body?
	// At least, don't include ContainerSVG here
</script>

<svelte:component this={body[name].component} {baseColor} {popColor} {stripeColor}>
	<slot name="wheels" slot="wheels">
		<Wheels />
	</slot>
	<!-- Clip paths work on elements with strokes! -->
	<!-- The clip path itself ignores its own stroke, but we don't care! -->
	<g clip-path="url(#{name}-decal-clip)" slot="decals">
		<slot name="decals" />
	</g>
	<!-- <slot name="toppers" slot="toppers" /> -->
	<svelte:fragment slot="toppers">
		<slot name="toppers" topLine={body[name].topperLine} />
		<!-- TODO: Remove? Use an actual topper to test with -->
		<!-- {#each TOPPER_LINES[name] as [tpx, tpy]}
				<circle cx={tpx} cy={tpy} r="3" fill="none" stroke-width="2" stroke="red" />
			{/each} -->
	</svelte:fragment>
</svelte:component>
<defs>
	<clipPath id="{name}-decal-clip">
		<path d={body[name].decalClipPath} />
	</clipPath>
</defs>
