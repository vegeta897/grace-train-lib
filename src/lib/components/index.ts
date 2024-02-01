export { default as Body } from './Body.svelte'
export { bodyDefs } from './body'
export { default as Decal, type DecalTransitionProperty } from './Decal.svelte'
// TODO: Move defs to depot
export { decalDefs, type DecalDef } from './decal'
export { topperDefs, type TopperDef } from './topper'
export { type ParamDefinition } from './params.js'
export { default as ContainerSvg } from './ContainerSVG.svelte'
export { default as Wheels } from './Wheels.svelte'
export { default as Car } from './Car.svelte'
export { default as Engine } from './Engine.svelte'
export { default as Topper, getYposition, getTopperBaseTransform } from './Topper.svelte'
export { PRIDE_FLAGS } from './decal/Flag.svelte'
export { EMOTES } from './decal/Emote.svelte'
export {
	type StripesParams,
	type StripesNode,
	getStripesMetrics,
} from './decal/Stripes.svelte'
