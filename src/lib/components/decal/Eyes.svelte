<script lang="ts" context="module">
	import { COLORS } from '$lib'
	import { defineListPicker, defineListSlider, defineScalar } from '../params'

	const EYE_RADIUS = 25
	const EYE_WIDTH = EYE_RADIUS * 2
	const PUPIL_RADIUS = 15
	const WHITE = '#fff7fa'
	const BLACK = '#170716'

	export const paramConfig = [
		defineListSlider(
			'color',
			'color',
			[
				BLACK,
				'#5f3621',
				'#9c520b',
				'#89880e',
				'#308d91',
				COLORS.BASE[14],
				'#913075',
				'#c21118',
			],
			true,
			COLORS.BASE[14]
		),
		defineScalar('height', 'height', 0.2),
		defineScalar('size', 'size', 0.5),
		defineScalar('gap', 'gap', 0.6),
		defineScalar('glance', 'glance', 0.8),
		defineScalar('angle'),
		defineScalar('googly'),
		defineListPicker('glint', 'glint', ['dot', 'bubbly', 'none'] as Glint[], 'dot'),
	]

	const getHeight = (height: number) => EYE_WIDTH * (1 + height * 0.7)
	const getGap = (gap: number) => -10 + gap * 30

	export const getBoundingBox = (params: Params) => {
		return { width: 100 + getGap(params.gap), height: getHeight(params.height) }
	}

	export const minScale = 1
	export const maxScale = 3

	function getPupilPosition({ angle, height, glance, size }: Params, pupilScale: number) {
		const pupilRadius = PUPIL_RADIUS * pupilScale
		const widthScale = EYE_RADIUS - pupilRadius
		const heightScale = getHeight(height) / 2 - pupilRadius
		const rad = (angle + 0.5) * Math.PI * 2
		return [Math.cos(rad) * widthScale * glance, Math.sin(rad) * heightScale * glance]
	}

	type Glint = 'none' | 'dot' | 'bubbly'

	type Params = {
		color: string
		height: number
		size: number
		gap: number
		glance: number
		angle: number
		googly: number
		glint: Glint
	}

	const bubblyEllipses: [number, number, number, number, number][] = [
		[-7, -7.5, 8.5, 11, 50],
		[10.5, -5.5, 6.5, 7.5, -30],
		[13, 6, 3.5, 3.5, 0],
		[-8, 9.5, 5.5, 7.5, -60],
	]
</script>

<script lang="ts">
	$$restProps
	export let params: Params
	$: ry = getHeight(params.height) / 2
	$: halfSpace = getGap(params.gap) / 2
	$: eyeXs = [-EYE_RADIUS - halfSpace, EYE_RADIUS + halfSpace]
	$: pupilScale = 0.2 + params.size * 0.8
	$: leftPupilXY = getPupilPosition(params, pupilScale)
	$: rightPupilXY =
		params.googly === 0
			? leftPupilXY
			: getPupilPosition(
					{ ...params, angle: params.angle + params.googly / 2 },
					pupilScale
				)
	$: pupilPositions = [leftPupilXY, rightPupilXY]
</script>

{#each ['left', 'right'] as eye, i}
	{@const [x, y] = pupilPositions[i]}
	<ellipse fill={WHITE} cx={eyeXs[i]} {ry} rx={EYE_RADIUS} />
	<clipPath id="{eye}EyeClip">
		<ellipse cx={eyeXs[i]} ry={ry * 1.02} rx={EYE_RADIUS * 1.02} />
	</clipPath>
	<g clip-path="url(#{eye}EyeClip)">
		<g transform="translate({eyeXs[i] + x} {y}) scale({pupilScale})">
			<ellipse fill={params.color} ry={PUPIL_RADIUS * 1.35} rx={PUPIL_RADIUS * 1.35} />
			<ellipse fill={BLACK} ry={PUPIL_RADIUS} rx={PUPIL_RADIUS} />
			{#if params.glint === 'dot'}
				<ellipse fill={WHITE} cx={-9} cy={-9} ry={5} rx={5} />
			{:else if params.glint === 'bubbly'}
				{#each bubblyEllipses as [cx, cy, rx, ry, rotate]}
					<ellipse
						fill={WHITE}
						{ry}
						{rx}
						transform="translate({cx} {cy}) rotate({rotate})"
					/>
				{/each}
			{/if}
		</g>
	</g>
{/each}
