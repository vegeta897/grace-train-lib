import type { ComponentType, SvelteComponent } from 'svelte'
import * as PartyHat from './PartyHat.svelte'
import type { ParamDefinition } from '..'
import { getDefaultParamsObject } from '../params'

export const TOPPER_NAMES = ['party_hat'] as const
export type TopperName = (typeof TOPPER_NAMES)[number]

type TopperComponent = ComponentType<SvelteComponent>

function defineTopper(importObject: {
	default: TopperComponent
	paramConfig?: ParamDefinition[]
	origin: { x: number; y: number }
	getBoundingBox: TopperBoundingBoxFn
}) {
	return {
		component: importObject.default,
		paramConfig: importObject.paramConfig || [],
		getDefaultParamsObject: () => getDefaultParamsObject(importObject.paramConfig),
		origin: importObject.origin,
		getBoundingBox: importObject.getBoundingBox,
	}
}

export type TopperDef = ReturnType<typeof defineTopper>
export const topperDefs: Record<TopperName, TopperDef> = {
	party_hat: defineTopper(PartyHat),
}

type BoundingBox = {
	width: number
	height: number
}
export type TopperBoundingBoxFn = () => BoundingBox
