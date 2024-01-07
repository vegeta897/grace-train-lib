import type { ComponentType, SvelteComponent } from 'svelte'
import * as PartyHat from './PartyHat.svelte'

export const TOPPER_NAMES = ['party_hat'] as const
export type TopperName = (typeof TOPPER_NAMES)[number]

type TopperComponent = ComponentType<SvelteComponent<{ colors: string[] }>>

function defineTopper(importObject: {
	default: TopperComponent
	origin: { x: number; y: number }
	getBoundingBox: TopperBoundingBoxFn
}) {
	return {
		component: importObject.default,
		origin: importObject.origin,
		getBoundingBox: importObject.getBoundingBox,
	}
}

export const topperDefs: Record<TopperName, ReturnType<typeof defineTopper>> = {
	party_hat: defineTopper(PartyHat),
}

type BoundingBox = {
	width: number
	height: number
}
export type TopperBoundingBoxFn = () => BoundingBox
