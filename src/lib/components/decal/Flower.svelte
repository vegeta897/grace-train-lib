<script lang="ts" context="module">
	export const noFill = true

	export const paramConfig = [
		defineStringList('petalColor', [...COLORS.POP], true, COLORS.POP[0]),
		defineStringList('centerColor', [...COLORS.POP], true, COLORS.POP[4]),
		defineNumberList('petals', [4, 5, 6, 7, 8, 9, 10], true, 6),
		defineScalar('petalBloom', 0.5),
		defineScalar('petalLength', 0.5),
		defineScalar('petalWidth', 0.5),
		defineScalar('centerSize', 0.5),
	]

	export const petalTranslateY = (scalar: number) => (0.5 - scalar) * 20
	export const petalScaleY = (scalar: number) => 0.75 + scalar / 1.5

	type Params = {
		petalColor: string
		centerColor: string
		petals: number
		petalBloom: number
		petalLength: number
		petalWidth: number
		centerSize: number
	}
	export const getBoundingBox = (params: Params) => {
		const petalSize =
			(40 + 10 - petalTranslateY(params.petalBloom)) * petalScaleY(params.petalLength)
		return {
			width: petalSize * 2,
			height: petalSize * 2,
		}
	}
</script>

<script lang="ts">
	import { COLORS } from '$lib'
	import { defineNumberList, defineScalar, defineStringList } from './params'

	$$restProps
	export let params: Params

	$: petalColor = params.petalColor
	$: centercolor = params.centerColor
	$: petals = params.petals
	$: petalAngle = 360 / petals
	$: petalScaleX = 0.6 + params.petalWidth / 1.2
	$: centerRadius = 15 + (params.centerSize ?? 0.5) * 12
</script>

{#each Array(petals) as _, i}
	<path
		d="M0,-5c-0,-0 -11.9,-19.7 -11.9,-28.1c0,-6.6 5.3,-11.9 11.9,-11.9c6.6,0 11.9,5.3 11.9,11.9c0,8.4 -11.9,28.1 -11.9,28.1Z"
		stroke-width="10"
		stroke={petalColor}
		fill={petalColor}
		transform="rotate({i * petalAngle}) scale({petalScaleX},{petalScaleY(
			params.petalLength
		)}) translate(0,{petalTranslateY(params.petalBloom)})"
	/>
{/each}
<circle r={centerRadius} fill={centercolor} />
<path stroke="#fff8" stroke-width="0" fill="none" d="M-40,-40h80v80h-80v-80" />
