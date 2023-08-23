<script lang="ts">
	import { COLORS } from './colors.js'

	export let rimColor = COLORS.POP
	export let capColor = COLORS.BASE
	export let fromCenter = 100

	// Note! Default values are not reverted to if undefined is passed in after init
	$: rimColor = rimColor || COLORS.POP
	$: capColor = capColor || COLORS.BASE
	$: fromCenter = fromCenter || 100
</script>

<circle
	cx={187.5 - fromCenter}
	cy="262.5"
	r="25"
	style="fill:{capColor};stroke:{rimColor};"
/>
<circle
	cx={187.5 + fromCenter}
	cy="262.5"
	r="25"
	style="fill:{capColor};stroke:{rimColor};"
/>
