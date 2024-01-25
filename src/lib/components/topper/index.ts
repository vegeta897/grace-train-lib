import type { ComponentType, SvelteComponent } from 'svelte'
import * as PartyHat from './PartyHat.svelte'
import type { ParamDefinition } from '..'
import { getDefaultParamsObject } from '../params'
import type { TopperName } from '$lib/data'

type TopperComponent = ComponentType<SvelteComponent>

function defineTopper({
	pivots,
	...importObject
}: {
	default: TopperComponent
	paramConfig?: ParamDefinition[]
	pivots: TopperPivots
	getBoundingBox: TopperBoundingBoxFn
}) {
	return {
		component: importObject.default,
		paramConfig: importObject.paramConfig || [],
		getDefaultParamsObject: () => getDefaultParamsObject(importObject.paramConfig),
		pivots: { width: pivots[1].x - pivots[0].x, left: pivots[0], right: pivots[1] },
		origin: {
			x: (pivots[0].x + pivots[1].x) / 2,
			y: (pivots[0].y + pivots[1].y) / 2,
		},
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
export type TopperPivots = [{ x: number; y: number }, { x: number; y: number }]
