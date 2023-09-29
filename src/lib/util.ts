type PathCommand = string | [string, number[][]]

export function parsePathString(pathString: string): PathCommand[] {
	const coords = pathString
		.split(/M|L|C|Z/)
		.filter((e) => e) // Remove empty elements caused by beginning M and ending Z
		.map((c) => c.split(' ').map((n) => n.split(',').map((v) => +v)))
	const commands = pathString.replace(/[^MLCZ]/g, '').split('')
	return commands.map((c, i) => (coords[i] ? [c, coords[i]] : c))
}

export function stringifyPathCommands(commands: PathCommand[]): string {
	return commands
		.map((command) => {
			if (typeof command === 'string') return command
			return `${command[0]}${command[1].map((p) => p.join(',')).join(' ')}`
		})
		.join('')
}

export function lerpPath(
	path1: PathCommand[],
	path2: PathCommand[],
	amount: number
): PathCommand[] {
	return transformPath(
		path1,
		(cIndex, pIndex, vIndex, v) =>
			v + ((path2[cIndex][1] as number[][])[pIndex][vIndex] - v) * amount
	)
}

export function roundPathValues(path: PathCommand[]): PathCommand[] {
	return transformPath(path, (_c, _p, _v, v) => Math.round(v))
}

export function transformPath(
	path: PathCommand[],
	transformFn: (cIndex: number, pIndex: number, vIndex: number, v: number) => number
): PathCommand[] {
	return path.map((command, cIndex) => {
		if (typeof command === 'string') return command
		return [
			command[0],
			command[1].map((p, pIndex) =>
				p.map((v, vIndex) => transformFn(cIndex, pIndex, vIndex, v))
			),
		]
	})
}
