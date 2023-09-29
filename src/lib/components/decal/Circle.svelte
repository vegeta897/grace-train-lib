<script lang="ts">
	export let pinch = 0.5
	export let hollow = 0
	$: rx = 50 - Math.max(0, pinch - 0.5) * 60
	$: ry = 50 - Math.max(0, 0.5 - pinch) * 60
	$: hrx = hollow * (rx - 10)
	$: hry = hollow * (ry - 10)
	$: hollowPath =
		hollow > 0
			? `M50,${50 - hry}A${hrx},${hry} 0 0,1 50,${50 + hry}A${hrx},${hry} 0 0,1 50,${
					50 - hry
			  }Z`
			: ''
</script>

<path
	d="M50,{50 - ry} A{rx},{ry} 0 0,1 50,{50 + ry}A{rx},{ry} 0 0,1 50,{50 -
		ry}Z{hollowPath}"
	fill-rule="evenodd"
	stroke="none"
/>
