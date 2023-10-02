export type ParamDefinition = {
	name: string
} & ({ type: 'scalar'; defaultValue: number } | { type: 'toggle'; defaultValue: boolean })
export type ParamsObject = Record<string, any>

export function defineScalar(name: string, defaultValue = 0): ParamDefinition {
	return {
		type: 'scalar',
		name,
		defaultValue,
	}
}

export function defineToggle(name: string, defaultValue = false): ParamDefinition {
	return {
		type: 'toggle',
		name,
		defaultValue,
	}
}

export function updateParamsObject<P extends ParamDefinition>(
	def: P,
	value: P['defaultValue'],
	paramsObject: ParamsObject
) {
	paramsObject[def.name] = value
}

export function getDefaultParamsObject(paramDefs: ParamDefinition[]): ParamsObject {
	return Object.fromEntries(paramDefs.map((d) => [d.name, d.defaultValue]))
}
