import type { ComponentType, SvelteComponent } from 'svelte'
import * as Heart from './Heart.svelte'
import * as Star from './Star.svelte'
import * as Circle from './Circle.svelte'
import * as Flag from './Flag.svelte'
import { getDefaultParamsObject, type ParamDefinition } from './params'

export const DECAL_NAMES = ['star', 'heart', 'circle', 'flag'] as const
export type DecalName = (typeof DECAL_NAMES)[number]

function defineDecal(importObject: {
	default: ComponentType<SvelteComponent>
	paramConfig?: ParamDefinition[]
	noFill?: boolean
}) {
	return {
		component: importObject.default,
		paramConfig: importObject.paramConfig || [],
		noFill: importObject.noFill ?? false,
		getDefaultParamsObject: () => getDefaultParamsObject(importObject.paramConfig),
	}
}

export const decalDefs = {
	heart: defineDecal(Heart),
	star: defineDecal(Star),
	circle: defineDecal(Circle),
	flag: defineDecal(Flag),
} as const
