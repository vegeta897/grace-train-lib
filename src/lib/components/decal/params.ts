export type ParamDefinition = {
	name: string
	displayName: string
} & (
	| { type: 'scalar'; defaultValue: number }
	| { type: 'toggle'; defaultValue: boolean }
	// List is "any" type so svelte type checker doesn't complain
	| {
			type: 'listSlider'
			list: any[]
			color: boolean
			defaultValue: any
	  }
	| {
			type: 'listPicker'
			list: any[]
			defaultValue: any
	  }
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

export function defineListSlider<T extends any[]>(
	name: string,
	displayName = name,
	list: T,
	color: boolean,
	defaultValue: T[number]
): ParamDefinition {
	return {
		type: 'listSlider',
		name,
		displayName,
		list,
		color,
		defaultValue,
	}
}

export function defineListPicker<T extends any[]>(
	name: string,
	displayName = name,
	list: T,
	defaultValue: T[number]
): ParamDefinition {
	return {
		type: 'listPicker',
		name,
		displayName,
		list,
		defaultValue,
	}
}

export function getDefaultParamsObject(paramDefs: ParamDefinition[] = []): ParamsObject {
	return Object.fromEntries(
		paramDefs.map((d) => [
			d.name,
			Array.isArray(d.defaultValue) ? [...d.defaultValue] : d.defaultValue,
		])
	)
}
