import type { ComponentType, SvelteComponent } from 'svelte'
import Boxy from './Boxy.svelte'
import Tanky from './Tanky.svelte'
import Coachy from './Coachy.svelte'
import type { XyTuple } from '../Topper.svelte'

type BodyComponent = ComponentType<
	SvelteComponent<{
		baseColor?: string
		popColor?: string
		stripeColor?: string
	}>
>

export const BODY_NAMES = ['boxy', 'tanky', 'coachy'] as const
export type BodyName = (typeof BODY_NAMES)[number]

export const body: Record<BodyName, { component: BodyComponent; topperLine: XyTuple[] }> =
	{
		boxy: {
			component: Boxy,
			topperLine: [
				[12, 25],
				[110, 25],
				[160, 0],
				[215, 0],
				[265, 25],
				[363, 25],
			],
		},
		tanky: {
			component: Tanky,
			topperLine: [
				[34, 38],
				[107, 38],
				[160, 0],
				[215, 0],
				[268, 38],
				[341, 38],
			],
		},
		coachy: {
			component: Coachy,
			topperLine: [
				[35, 25],
				[110, 25],
				[160, 0],
				[215, 0],
				[265, 25],
				[340, 25],
			],
		},
	}
