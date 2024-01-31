<script lang="ts">
	import { COLOR_NAMES } from '$lib'

	export let popColor: string | undefined = undefined
	export let baseColor: string | undefined = undefined
	export let flipColors: boolean = false
	export let fromCenter: number | undefined = undefined
	export let size: number | undefined = undefined

	// Note! Default values are not reverted to if undefined is passed in after init
	$: _popColor = popColor ?? COLOR_NAMES.POP.POP
	$: _baseColor = baseColor ?? COLOR_NAMES.BASE.BASE
	$: rimColor = flipColors ? _baseColor : _popColor
	$: centerColor = flipColors ? _popColor : _baseColor
	$: _fromCenter = fromCenter ?? 100
	$: _size = size ?? 25
	$: cy = 262.5 + (25 - _size)
</script>

<circle
	cx={187.5 - _fromCenter}
	{cy}
	r={_size - 0.25}
	style="fill:{centerColor};stroke:{rimColor};"
/>
<circle
	cx={187.5 + _fromCenter}
	{cy}
	r={_size - 0.25}
	style="fill:{centerColor};stroke:{rimColor};"
/>
