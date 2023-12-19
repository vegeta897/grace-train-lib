export type ParamDefinition = {
	name: string
	displayName: string
} & (
	| { type: 'scalar'; defaultValue: number }
	| { type: 'toggle'; defaultValue: boolean }
	// List is "any" type so svelte type checker doesn't complain
	| {
			type: 'stringList'
			list: any[]
			slider: boolean
			color: boolean
			defaultValue: string
	  }
	| { type: 'numberList'; list: any[]; slider: boolean; defaultValue: number }
)
export type ParamsObject<T extends Record<string, any> = Record<string, any>> = T

export function defineScalar(
	name: string,
	displayName = name,
	defaultValue = 0
): ParamDefinition {
	return {
		type: 'scalar',
		name,
		displayName,
		defaultValue,
	}
}

export function defineToggle(
	name: string,
	displayName = name,
	defaultValue = false
): ParamDefinition {
	return {
		type: 'toggle',
		name,
		displayName,
		defaultValue,
	}
}

export function defineNumberList<T extends number[]>(
	name: string,
	displayName = name,
	list: T,
	slider: boolean,
	defaultValue: T[number]
): ParamDefinition {
	return {
		type: 'numberList',
		name,
		displayName,
		list,
		slider,
		defaultValue,
	}
}

export function defineStringList<T extends string[]>(
	name: string,
	displayName = name,
	list: T,
	slider: boolean,
	color: boolean,
	defaultValue: T[number]
): ParamDefinition {
	return {
		type: 'stringList',
		name,
		displayName,
		list,
		slider,
		color,
		defaultValue,
	}
}

// export function updateParamsObject<P extends ParamDefinition>(
// 	def: P,
// 	value: P['defaultValue'],
// 	paramsObject: ParamsObject
// ) {
// 	paramsObject[def.name] = value
// }

export function getDefaultParamsObject(paramDefs: ParamDefinition[] = []): ParamsObject {
	return Object.fromEntries(
		paramDefs.map((d) => [
			d.name,
			Array.isArray(d.defaultValue) ? [...d.defaultValue] : d.defaultValue,
		])
	)
}
