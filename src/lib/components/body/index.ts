import type { ComponentType, SvelteComponent } from 'svelte'
import type { TopLine, TopLinePoints } from '../Topper.svelte'
import * as Boxy from './Boxy.svelte'
import * as Tanky from './Tanky.svelte'
import * as Coachy from './Coachy.svelte'
import * as Hoppy from './Hoppy.svelte'
import * as Loggy from './Loggy.svelte'
import * as Chemy from './Chemy.svelte'
import type { BodyName } from '$lib/data'

type BodyComponent = ComponentType<
	SvelteComponent<
		{ baseColor: string; popColor: string; stripeColor?: string },
		{},
		{ decals: {}; toppers: {}; wheels: {} }
	>
>

function defineBody({
	topperLinePoints,
	...importObject
}: {
	default: BodyComponent
	decalClipPath: string
	topperLinePoints: TopLinePoints
}) {
	const startX = topperLinePoints[0][0]
	const endX = topperLinePoints[topperLinePoints.length - 1][0]
	return {
		component: importObject.default,
		decalClipPath: importObject.decalClipPath,
		topperLine: {
			points: topperLinePoints,
			startX,
			endX,
			width: endX - startX,
		} as TopLine,
	}
}

export const bodyDefs: Record<BodyName, ReturnType<typeof defineBody>> = {
	boxy: defineBody(Boxy),
	tanky: defineBody(Tanky),
	coachy: defineBody(Coachy),
	hoppy: defineBody(Hoppy),
	loggy: defineBody(Loggy),
	chemy: defineBody(Chemy),
}
