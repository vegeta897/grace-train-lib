import type { ComponentType, SvelteComponent } from 'svelte'
import * as Boxy from './Boxy.svelte'
import * as Tanky from './Tanky.svelte'
import * as Coachy from './Coachy.svelte'
import * as Hoppy from './Hoppy.svelte'
import type { TopperLine } from '../Topper.svelte'

type BodyComponent = ComponentType<
	SvelteComponent<
		{ baseColor: string; popColor: string; stripeColor: string },
		{},
		{ decals: {}; toppers: {}; wheels: {} }
	>
>

export const BODY_NAMES = ['boxy', 'tanky', 'coachy', 'hoppy'] as const
export type BodyName = (typeof BODY_NAMES)[number]

function defineBody(importObject: {
	default: BodyComponent
	decalClipPath: string
	topperLine: TopperLine
}) {
	return {
		component: importObject.default,
		decalClipPath: importObject.decalClipPath,
		topperLine: importObject.topperLine,
	}
}

export const body: Record<BodyName, ReturnType<typeof defineBody>> = {
	boxy: defineBody(Boxy),
	tanky: defineBody(Tanky),
	coachy: defineBody(Coachy),
	hoppy: defineBody(Hoppy),
}
