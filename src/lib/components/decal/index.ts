import type { ComponentType, SvelteComponent } from 'svelte'
import * as Heart from './Heart.svelte'
import * as Star from './Star.svelte'
import * as Circle from './Circle.svelte'
import * as Flag from './Flag.svelte'
import * as Stripes from './Stripes.svelte'
import * as Flower from './Flower.svelte'
import * as Box from './Box.svelte'
import * as Emote from './Emote.svelte'
import { getDefaultParamsObject, type ParamDefinition } from '../params'
import type { DecalName, ParamsObject } from '$lib/data'

function defineDecal(importObject: {
	default: ComponentType<SvelteComponent>
	paramConfig?: ParamDefinition[]
	noFill?: boolean
	getBoundingBox?: DecalBoundingBoxFn
	minScale?: number
	maxScale?: number
}) {
	return {
		component: importObject.default,
		paramConfig: importObject.paramConfig || [],
		getDefaultParamsObject: () => getDefaultParamsObject(importObject.paramConfig),
		getBoundingBox: importObject.getBoundingBox || (() => ({ width: 100, height: 100 })),
		noFill: importObject.noFill ?? false,
		minScale: importObject.minScale,
		maxScale: importObject.maxScale,
	}
}

export type DecalDef = ReturnType<typeof defineDecal>
export const decalDefs: Record<DecalName, DecalDef> = {
	heart: defineDecal(Heart),
	star: defineDecal(Star),
	circle: defineDecal(Circle),
	flag: defineDecal(Flag),
	stripes: defineDecal(Stripes),
	flower: defineDecal(Flower),
	box: defineDecal(Box),
	emote: defineDecal(Emote),
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
export type DecalBoundingBoxFn = (params: ParamsObject<any>) => BoundingBox
