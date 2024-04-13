<script lang="ts" context="module">
	import type { TopLinePoints } from '../Topper.svelte'

	export const decalClipPath =
		'M14.206,200c-4.63,-6.927 -4.207,-12.588 -4.206,-12.595l0,-124.754c0,-0.01 0,-0.02 0,-0.03c0,-0 -2.746,-37.621 85,-37.621c87.483,0 85.041,37.2 85,37.755l-0,24.796l15,0l0,-24.9c0,-0.01 0,-0.02 0,-0.03c0,-0 -2.746,-37.621 85,-37.621c87.483,-0 85.041,37.2 85,37.755l-0,124.652l-0,0.01c-0,0 0.422,5.658 -4.17,12.583l-161.624,0c-4.63,-6.927 -4.207,-12.588 -4.206,-12.595l0,-99.854l-15,0l-0,99.856l-0,0.01c-0,0 0.422,5.658 -4.17,12.583l-161.624,0Z'
	export const topperLinePoints: TopLinePoints = [
		[8, 65, 'cubicOut'],
		[63, 27, 'cubicOut'],
		[74, 0],
		[116, 0, 'cubicIn'],
		[127, 27, 'cubicIn'],
		[182, 65],
		[193, 65, 'cubicOut'],
		[248, 27, 'cubicOut'],
		[259, 0],
		[301, 0, 'cubicIn'],
		[312, 27, 'cubicIn'],
		[367, 65],
	]
</script>

<script lang="ts">
	$$restProps
	export let baseColor: string
	export let popColor: string
	// export let stripeColor: string
</script>

<rect
	x="37.5"
	y="212.5"
	width="300"
	height="25"
	style="fill:{popColor};stroke:{popColor};"
/>
<rect x="77.5" y="12.5" width="35" height="25" style="fill:none;stroke:{popColor};" />
<rect x="262.5" y="12.5" width="35" height="25" style="fill:none;stroke:{popColor};" />
<rect x="180" y="100" width="15" height="50" style="fill:{popColor};stroke:{popColor};" />
<path
	d="M167.5,187.407c-0,0 -0.02,25.093 -72.164,25.093c-72.841,0 -72.836,-25.093 -72.836,-25.093l0,-124.756c0,-0 0.06,-25.151 72.5,-25.151c72.721,-0 72.5,25.151 72.5,25.151l-0,124.756Z"
	style="fill:{baseColor};stroke:{baseColor};"
/>
<path
	d="M352.5,187.407c-0,0 -0.02,25.093 -72.164,25.093c-72.841,0 -72.836,-25.093 -72.836,-25.093l0,-124.756c0,-0 0.06,-25.151 72.5,-25.151c72.721,-0 72.5,25.151 72.5,25.151l-0,124.756Z"
	style="fill:{baseColor};stroke:{baseColor};"
/>

<slot name="decals" />
<path d="M12.5,212.5l350,0" style="fill:none;stroke:{baseColor};" />
<slot name="wheels" />
<slot name="toppers" />
