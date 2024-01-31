export type GraceEventBaseData = { combo: number; score: number }

export type HypeEventBaseData = {
	level: number
	total: number
	progress: number
	goal: number
	graces: number
}

// Maybe create (de)serializer functions?
// Probably not worth computing to save a little non-user-facing bandwidth
export type DepotCar = {
	body: BodyName
	bodyColor?: string
	bodyPopColor?: string
	wheelBaseColor?: string
	wheelPopColor?: string
	wheelFlipColors?: boolean
	wheelFromCenter?: number
	wheelSize?: number
	decals: DecalData[]
	toppers: TopperData[]
}
export const BODY_NAMES = ['boxy', 'tanky', 'coachy', 'hoppy', 'loggy', 'chemy'] as const
export type BodyName = (typeof BODY_NAMES)[number]
export const DECAL_NAMES = [
	'star',
	'heart',
	'circle',
	'flag',
	'stripes',
	'flower',
	'box',
	'emote',
] as const
export type ParamsObject<T extends Record<string, any> = Record<string, any>> = T
export type DecalName = (typeof DECAL_NAMES)[number]
export type DecalData = {
	name: DecalName
	fill: string
	x: number
	y: number
	scale: number
	rotate: number
	params: ParamsObject
}
export const TOPPER_NAMES = ['party_hat'] as const
export type TopperName = (typeof TOPPER_NAMES)[number]
export type TopperData = {
	name: TopperName
	position: number
	offset: number
	scale: number
	rotate: number
	params: ParamsObject
}

export type GraceTrainCar = { depotCar: DepotCar } | { color: string }
export type Grace = { userId: string } & GraceTrainCar
export type GraceTrainData = {
	grace: GraceEventBaseData & { graces: Grace[]; frog?: boolean }
}
export type GraceTrainAddData = { grace: GraceEventBaseData & { grace: Grace } }
export type GraceTrainEndData = { grace: GraceEventBaseData & { username: string } }
export type HypeTrainData = {
	hype: HypeEventBaseData & { contributions: HypeProgress[] }
}
export type HypeProgress = {
	type: 'bits' | 'subs'
	amount: number
	color: string | null
}
export type HypeTrainAddData = {
	hype: HypeEventBaseData & { contribution?: HypeProgress }
}
export type HypeTrainEndData = { hype: Omit<HypeEventBaseData, 'progress' | 'goal'> }

type ID = { id: number }
export type TrainStartData = ID & (GraceTrainData | HypeTrainData)
export type TrainAddData = ID & (GraceTrainAddData | HypeTrainAddData)
export type TrainEndData = ID & (GraceTrainEndData | HypeTrainEndData)

export type OverlayOptions = { position: 'top' | 'bottom' }

export type HideUser = { userId: string }

export type TrainWSMessage =
	| {
			type: 'init'
			data: { version: number; train: TrainStartData | false } & OverlayOptions
	  }
	| { type: 'train-start'; data: TrainStartData }
	| { type: 'train-add'; data: TrainAddData }
	| { type: 'train-end'; data: TrainEndData }
	| { type: 'overlay'; data: OverlayOptions }
	| { type: 'hide-user'; data: HideUser }

type DepotTrainBaseRequest = {
	trainId: number
	score: number
}

export type DepotTrainStartRequest = DepotTrainBaseRequest & {
	graces: { userId: string; color: string }[]
}

export type DepotTrainAddRequest = DepotTrainBaseRequest & {
	index: number
	grace: { userId: string; color: string }
}

export type DepotTrainEndRequest = DepotTrainBaseRequest
