import type { ComponentType, SvelteComponent } from 'svelte'
import * as Heart from './Heart.svelte'
import * as Star from './Star.svelte'
import * as Circle from './Circle.svelte'
import * as Flag from './Flag.svelte'
import * as Stripes from './Stripes.svelte'
import { getDefaultParamsObject, type ParamDefinition, type ParamsObject } from './params'

export const DECAL_NAMES = ['star', 'heart', 'circle', 'flag', 'stripes'] as const
export type DecalName = (typeof DECAL_NAMES)[number]

// TODO: Abstract params stuff to be used for body and topper as well

type DecalDef = {
	component: ComponentType<SvelteComponent>
	paramConfig: ParamDefinition[]
	noFill: boolean
	getDefaultParamsObject: () => ParamsObject
	getBoundingBox: BoundingBoxFn
}

function defineDecal(importObject: {
	default: ComponentType<SvelteComponent>
	paramConfig?: ParamDefinition[]
	noFill?: boolean
	getBoundingBox?: BoundingBoxFn
}): DecalDef {
	return {
		component: importObject.default,
		paramConfig: importObject.paramConfig || [],
		noFill: importObject.noFill ?? false,
		getDefaultParamsObject: () => getDefaultParamsObject(importObject.paramConfig),
		getBoundingBox: importObject.getBoundingBox || (() => ({ width: 100, height: 100 })),
	}
}

export const decalDefs: Record<DecalName, DecalDef> = {
	heart: defineDecal(Heart),
	star: defineDecal(Star),
	circle: defineDecal(Circle),
	flag: defineDecal(Flag),
	stripes: defineDecal(Stripes),
} as const

// Converts relative decal x,y to global
export function decalLocalToGlobal(
	{
		x: dx,
		y: dy,
		scale,
		rotate,
	}: {
		x: number
		y: number
		scale: number
		rotate: number
	},
	x: number,
	y: number
): { x: number; y: number } {
	const radians = rotate * (Math.PI / 180)
	const cos = Math.cos(radians)
	const sin = Math.sin(radians)
	const xDelta = (x - 50) * scale
	const yDelta = (y - 50) * scale
	return {
		x: dx + xDelta * cos - yDelta * sin,
		y: dy + xDelta * sin + yDelta * cos,
	}
}

type BoundingBox = {
	width: number
	height: number
}
export type BoundingBoxFn = (params: ParamsObject) => BoundingBox
