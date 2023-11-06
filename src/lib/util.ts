import { backOut, cubicOut } from 'svelte/easing'

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

export function noAnim(node: Element, { delay } = { delay: 0 }) {
	return {
		duration: 0,
		delay,
	}
}

export function popIn(node: Element, { delay, skip } = { delay: 0, skip: false }) {
	if (skip) return {}
	return {
		duration: 300,
		delay,
		easing: backOut,
		css: (t: number) => `opacity(${t}); transform: scale(${t})`,
	}
}

export function wipe(node: Element, { duration } = { duration: 1000 }) {
	return {
		duration,
		easing: cubicOut,
		// css: (t: number) => `clip-path: inset(0 ${(1 - t) * 100}px 0 0)`,
		css: (t: number) => `clip-path: path("M-20,0 h${t * 120} l20,100 h-${t * 120} Z")`,
	}
}
