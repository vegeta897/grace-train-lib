export type GraceEventBaseData = {
	combo: number
	score: number
}

export type HypeEventBaseData = {
	level: number
	total: number
	progress: number
	goal: number
	graces: number
}

export type GraceTrainData = {
	grace: GraceEventBaseData & { colors: string[]; frog?: boolean }
}
export type GraceTrainAddData = { grace: GraceEventBaseData & { color: string } }
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

export type OverlayOptions = {
	position: 'top' | 'bottom'
}

export type TrainWSMessage =
	| {
			type: 'init'
			data: { version: number; train: TrainStartData | false } & OverlayOptions
	  }
	| { type: 'train-start'; data: TrainStartData }
	| { type: 'train-add'; data: TrainAddData }
	| { type: 'train-end'; data: TrainEndData }
	| { type: 'overlay'; data: OverlayOptions }
