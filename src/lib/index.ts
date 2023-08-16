export {
	default as Body,
	BODY_NAMES,
	type BodyName,
	DECAL_CLIP_PATHS,
} from './Body.svelte'
export {
	default as Decal,
	DECAL_NAMES,
	type DecalName,
	type DecalTransitionProperty,
} from './Decal.svelte'
export { COLORS } from './colors.js'
export { default as ContainerSvg } from './ContainerSVG.svelte'
export { default as Wheels } from './Wheels.svelte'
export { default as WheelsChange } from './WheelsChange.svelte'
export {
	default as Topper,
	TOPPER_NAMES,
	type TopperName,
	type TopperPosition,
} from './Topper.svelte'

// Maybe export these as properties of objects
// Like an object for bodies, an object for decals, etc
