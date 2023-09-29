import type { ComponentType, SvelteComponent } from 'svelte'
import Heart from './Heart.svelte'
import Star from './Star.svelte'
import Circle from './Circle.svelte'

export const DECAL_NAMES = ['star', 'heart', 'circle'] as const
export type DecalName = (typeof DECAL_NAMES)[number]

export type DecalParam = [
	name: string,
	{ type: 'scalar'; value: number } | { type: 'toggle'; value: boolean },
]

export const decal: Record<
	DecalName,
	{ component: ComponentType<SvelteComponent>; params: DecalParam[] }
> = {
	heart: {
		component: Heart,
		params: [
			['dip', { type: 'scalar', value: 0.34 }],
			['taper', { type: 'scalar', value: 0 }],
			['strokeWidth', { type: 'scalar', value: 0 }],
			['outline', { type: 'toggle', value: false }],
		],
	},
	star: {
		component: Star,
		params: [
			['pinch', { type: 'scalar', value: 0.52 }],
			['strokeWidth', { type: 'scalar', value: 0 }],
			['outline', { type: 'toggle', value: false }],
		],
	},
	circle: {
		component: Circle,
		params: [
			['pinch', { type: 'scalar', value: 0.5 }],
			['hollow', { type: 'scalar', value: 0 }],
		],
	},
}
