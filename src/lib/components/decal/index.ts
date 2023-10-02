import type { ComponentType, SvelteComponent } from 'svelte'
import * as Heart from './Heart.svelte'
import * as Star from './Star.svelte'
import * as Circle from './Circle.svelte'
import { getDefaultParamsObject, type ParamDefinition } from './params'

export const DECAL_NAMES = ['star', 'heart', 'circle'] as const
export type DecalName = (typeof DECAL_NAMES)[number]

function defineDecal(importObject: {
	default: ComponentType<SvelteComponent>
	paramConfig: ParamDefinition[]
}) {
	return {
		component: importObject.default,
		paramConfig: importObject.paramConfig,
		getDefaultParamsObject: () => getDefaultParamsObject(importObject.paramConfig),
	}
}

export const decalDefs = {
	heart: defineDecal(Heart),
	star: defineDecal(Star),
	circle: defineDecal(Circle),
} as const
