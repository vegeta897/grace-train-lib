<script lang="ts" context="module">
	import { COLORS, COLOR_NAMES } from '$lib'
	import { defineListPicker, defineListSlider, defineScalar } from '../params'

	export const noFill = true

	const PETAL_TYPES = ['tear', 'pointed', 'ellipse'] as const
	type PetalType = (typeof PETAL_TYPES)[number]

	export const paramConfig = [
		defineListSlider(
			'petalColor',
			'petal color',
			[...COLORS.POP],
			true,
			COLOR_NAMES.POP.PIZZAZZ
		),
		defineListSlider(
			'centerColor',
			'center color',
			[...COLORS.POP],
			true,
			COLOR_NAMES.POP.CANARY
		),
		defineListSlider('petals', 'petals', [4, 5, 6, 7, 8, 9, 10], false, 6),
		defineScalar('petalBloom', 'bloom', 0.5),
		defineScalar('petalLength', 'stretch', 0.5),
		defineScalar('petalWidth', 'widen', 0.5),
		defineScalar('centerSize', 'center size', 0.5),
		defineListPicker('petalType', 'petal type', [...PETAL_TYPES], 'tear'),
	]

	export const petalTranslateY = (petalBloom: number) => (0.5 - petalBloom) * 20
	export const petalScaleY = (petalLength: number) => 0.75 + petalLength / 1.5

	const petalPaths: Record<PetalType, string> = {
		tear: 'M0,-5c-0,-0 -11.9,-19.7 -11.9,-28.1c0,-6.6 5.3,-11.9 11.9,-11.9c6.6,0 11.9,5.3 11.9,11.9c0,8.4 -11.9,28.1 -11.9,28.1Z',
		pointed:
			'M0,-45c-0,0 -8,22.4 -8,32c0,4.4 3.6,8 8,8c4.4,-0 8,-3.6 8,-8c-0,-9.6 -8,-32 -8,-32Z',
		ellipse:
			'M0,-45c2.76,-0 5,9 5,20c-0,11 -2.2,20 -5,20c-2.8,-0 -5,-9 -5,-20c-0,-11 2.2,-20 5,-20Z',
	}

	type Params = {
		petalColor: string
		centerColor: string
		petals: number
		petalBloom: number
		petalLength: number
		petalWidth: number
		centerSize: number
		petalType: PetalType
	}
	export const getBoundingBox = (params: Params) => {
		const petalSize = Math.abs(
			(40 + 10 - petalTranslateY(params.petalBloom)) * petalScaleY(params.petalLength)
		)
		return {
			width: petalSize * 2,
			height: petalSize * 2,
		}
	}
</script>

<script lang="ts">
	$$restProps
	export let params: Params

	$: petalColor = params.petalColor
	$: centercolor = params.centerColor
	$: petals = params.petals
	$: petalAngle = 360 / petals
	$: petalScaleX = 0.6 + params.petalWidth / 1.2
	$: centerRadius = 15 + (params.centerSize ?? 0.5) * 12
	$: translateY = petalTranslateY(params.petalBloom)
	$: petalPath = petalPaths[params.petalType]
</script>

{#each Array(petals) as _, i}
	<path
		d={petalPath}
		stroke-width="10"
		stroke={petalColor}
		transform="rotate({i * petalAngle}) scale({petalScaleX},{petalScaleY(
			params.petalLength
		)}) translate(0,{translateY})"
		fill={petalColor}
	/>
{/each}
<circle r={centerRadius} fill={centercolor} />
<path stroke="#fff8" stroke-width="0" fill="none" d="M-40,-40h80v80h-80v-80" />
