<script lang="ts">
	import { COLOR_NAMES } from '$lib/colors'
	import { ContainerSvg } from '.'

	// TODO: Animate piston attached to big wheel

	export let width = '100%'
	export let facing: 'right' | 'left' = 'right'
	export let animate = false
	export let animateDuration = 1000
	export let svgElement: SVGElement | undefined = undefined
</script>

<ContainerSvg viewBox="0 0 450 325" {width} bind:svgElement>
	<g
		style:transform="scaleX({facing === 'right' ? -1 : 1})"
		style:transform-origin="center"
	>
		<path d="M299.518,112.5l100.211,0" style="fill:none;stroke:{COLOR_NAMES.POP.POP};" />
		<path
			d="M436.933,12.5l-175,0l25,0l-0,125l125,0l-0,-125"
			style="fill:none;stroke:{COLOR_NAMES.BASE.BASE};"
		/>
		<path
			d="M61.933,115.5c-31.865,20.125 -31.776,91.006 -0,110"
			style="fill:none;stroke:{COLOR_NAMES.POP.POP};"
		/>
		<path
			d="M62.5,237.5l-50,50l50,0l49.433,-50l-49.433,0Z"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.BASE.BASE};"
		/>
		<path
			d="M111.933,287.5l-0,-25l300,-25l-0,25l-200,0l-0,25l-100,0Z"
			style="fill:{COLOR_NAMES.POP.POP};stroke:{COLOR_NAMES.POP.POP};"
		/>
		<rect
			x="61.933"
			y="112.5"
			width="225"
			height="125"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.BASE.BASE};"
		/>
		<path
			d="M126.21,112.5l16.83,-58.505l0,-41.495l-49.774,0l0,41.495l16.83,58.505l16.114,0Z"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.BASE.BASE};"
		/>
		<path
			d="M286.933,137.5l-0,100l125,0l-0,-100l-125,0Zm125,100l25,0"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.BASE.BASE};"
		/>
		<path d="M249.451,100.323l0,62.177" style="fill:none;stroke:{COLOR_NAMES.POP.POP};" />
		<path d="M199.4,100.3l-0,62.18" style="fill:none;stroke:{COLOR_NAMES.POP.POP};" />
		<path d="M93.27,12.5l49.77,0" style="fill:none;stroke:{COLOR_NAMES.POP.POP};" />
		<circle
			cx="336.933"
			cy="262.5"
			r="50"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.POP.POP};"
		/>
		<path
			d="M186.933,287.51l100,-25.01"
			stroke-linecap="butt"
			style="fill:none;stroke:#ff538f;"
		>
			{#if animate}
				<animate
					attributeName="d"
					values="M186.933,287.51l100,-25;M187.565,287.511l106.066,0;M207.456,287.508l104.476,18.294;M233.855,287.5l103.078,25;M257.455,287.511l104.477,18.29;M274.167,287.509l106.066,0;M283.857,287.509l103.076,-25;M286.701,287.519l93.532,-50.019;M280.797,287.519l81.136,-68.316;M261.933,287.5l75,-75;M234.719,287.495l77.209,-68.295;M203.498,287.517l90.133,-50.017;M186.933,287.51l100,-25"
					dur="{animateDuration}ms"
					repeatCount="indefinite"
				/>
			{/if}
		</path>
		<circle
			cx="186.933"
			cy="287.5"
			r="25"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.POP.POP};"
		/>
		<path d="M186.933,287.51h0Z" style="fill:none;stroke:{COLOR_NAMES.BASE.BASE};">
			{#if animate}
				<animate
					attributeName="d"
					values="M186.933,287.51h0Z;M186.933,287.51h0.632;M186.933,287.51h20.523;M186.933,287.51h47.036;M186.932,287.51h70.523;M186.932,287.51h87.235;M186.933,287.51h96.925;M186.933,287.51h99.769;M186.932,287.51h93.865;M186.933,287.51h75;M186.933,287.51h47.784;M186.933,287.51h16.565;M186.933,287.51h0"
					dur="{animateDuration}ms"
					repeatCount="indefinite"
				/>
			{/if}
		</path>
		<circle
			cx="111.933"
			cy="287.5"
			r="25"
			style="fill:{COLOR_NAMES.BASE.BASE};stroke:{COLOR_NAMES.POP.POP};"
		/>
		<slot />
	</g>
</ContainerSvg>
