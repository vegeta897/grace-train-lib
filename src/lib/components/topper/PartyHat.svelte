<script lang="ts" context="module">
	import { COLORS, COLOR_NAMES } from '$lib'
	import type { TopperPivots } from '.'
	import { defineListSlider } from '../params'

	export const pivots: TopperPivots = [
		{ x: 6, y: 120 },
		{ x: 90, y: 120 },
	]
	export const getBoundingBox = () => {
		return { width: 96, height: 136 }
	}
	export const paramConfig = [
		defineListSlider('color1', 'color 1', [...COLORS.POP], true, COLOR_NAMES.POP.LIME),
		defineListSlider('color2', 'color 2', [...COLORS.BASE], true, COLORS.BASE[14]),
	]
</script>

<script lang="ts">
	export let params: { color1: string; color2: string }
</script>

<path
	d="M12.533,116.534c23.039,9.04 46.445,9.623 70.294,-0l-34.073,-104.001l-36.221,104.001Z"
	style="fill:{params.color1};stroke:{params.color1};stroke-width:24"
/>
<path
	d="M2.426,107.449l6.577,-18.886c25.021,12.759 53.256,20.797 85.414,23.089l0.321,0.98c2.054,6.268 -1.103,13.056 -7.221,15.525c-1.98,0.799 -3.958,1.536 -5.933,2.212c-29.324,-3.326 -55.541,-11.217 -79.158,-22.92Z"
	stroke="none"
	style="fill:{params.color2};"
/>
<path
	d="M15.35,70.34l6.575,-18.88c17.794,8.986 37.31,15.293 58.828,18.487l6.829,20.844c-26.65,-2.815 -50.587,-9.851 -72.232,-20.451Z"
	stroke="none"
	style="fill:{params.color2};"
/>
<path
	d="M28.615,32.251l6.6,-18.949c9.768,5.267 20.125,9.523 31.13,12.667l7.275,22.207c-16.141,-3.35 -31.098,-8.735 -45.005,-15.925Z"
	stroke="none"
	style="fill:{params.color2};"
/>
