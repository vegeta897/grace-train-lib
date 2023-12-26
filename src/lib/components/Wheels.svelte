<script lang="ts">
	import { COLOR_NAMES } from '$lib/colors.js'

	export let rimColor: string = COLOR_NAMES.POP.POP
	export let capColor: string = COLOR_NAMES.BASE.BASE
	export let fromCenter = 100
	export let size = 25

	// Note! Default values are not reverted to if undefined is passed in after init
	$: rimColor = rimColor || COLOR_NAMES.POP.POP
	$: capColor = capColor || COLOR_NAMES.BASE.BASE
	$: fromCenter = fromCenter || 100
	$: cy = 262.5 + (25 - size)
</script>

<circle
	cx={187.5 - fromCenter}
	{cy}
	r={size - 0.25}
	style="fill:{capColor};stroke:{rimColor};"
/>
<circle
	cx={187.5 + fromCenter}
	{cy}
	r={size - 0.25}
	style="fill:{capColor};stroke:{rimColor};"
/>
