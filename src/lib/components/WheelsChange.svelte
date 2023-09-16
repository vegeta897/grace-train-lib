<script lang="ts">
	import { onMount } from 'svelte'
	import { COLORS } from '$lib/colors.js'
	import Wheels from './Wheels.svelte'

	export let rimColor = COLORS.POP
	export let capColor = COLORS.BASE
	export let fromCenter = 100

	let prevRimColor: string
	let leftWheelRim: SVGCircleElement
	let rightWheelRim: SVGCircleElement

	$: onRimColorChange(rimColor)

	onMount(() => (prevRimColor = rimColor))

	const rimCircumference = 2 * Math.PI * 25

	const rimAnimationOptions: [Keyframe[], KeyframeAnimationOptions] = [
		[{ strokeDashoffset: rimCircumference }, { strokeDashoffset: 0 }],
		{ duration: 400, easing: 'ease-out' },
	]

	function onRimColorChange(color: string) {
		const rimAnimation = leftWheelRim?.animate(...rimAnimationOptions)
		rightWheelRim?.animate(...rimAnimationOptions)
		if (rimAnimation) rimAnimation.onfinish = () => (prevRimColor = color)
	}
</script>

<Wheels rimColor={prevRimColor} {capColor} {fromCenter} />
<circle
	bind:this={leftWheelRim}
	cx={187.5 - fromCenter}
	cy="262.5"
	r="25"
	transform="rotate(-90 {187.5 - fromCenter} 262.5)"
	style="stroke-dasharray:{rimCircumference};fill:none;stroke:{rimColor};"
/>
<circle
	bind:this={rightWheelRim}
	cx={187.5 + fromCenter}
	cy="262.5"
	r="25"
	transform="rotate(-90 {187.5 + fromCenter} 262.5)"
	style="stroke-dasharray:{rimCircumference};fill:none;stroke:{rimColor};"
/>
