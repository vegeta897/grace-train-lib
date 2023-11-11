import { backOut, cubicOut } from 'svelte/easing'

export function wrapNumber(val: number, min: number, max: number) {
	const range = max - min
	return min + ((((val - min) % range) + range) % range)
}

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

export function flagWipe(
	node: Element,
	{ duration, direction }: { duration?: number; direction?: 'down' | 'right' } = {}
) {
	return {
		duration: duration ?? 250,
		easing: cubicOut,
		css: (t: number) =>
			(direction || 'down') === 'right'
				? // 0,0 is top left of flag
				  `clip-path: path("M-10,0 h${t * 110} l10,60 h-${t * 110} Z")`
				: `clip-path: path("M0,0 v${t * 70} l100,-10 v-${t * 70} Z")`,
	}
}

// export function stickOn(node: Element, { duration } = { duration: 500 }) {
// 	const copy = node.cloneNode(true) as Element
// 	node.insertAdjacentElement('afterend', copy)
// 	copy.style.filter = 'hue-rotate(30deg)'
// 	copy.animate(
// 		{
// 			clipPath: ['path("M100,0 h-200 L100,200 Z")', 'path("M100,0 h0 L100,0 Z")'],
// 			transform: [
// 				'scaleX(-1) rotate(90deg) translate(100px,-100px)',
// 				'scaleX(-1) rotate(90deg) translate(-100px,100px)',
// 			],
// 		},
// 		{ duration, fill: 'both', easing: 'cubic-bezier(0.33, 1, 0.68, 1)' }
// 	)
// 	return {
// 		duration,
// 		easing: cubicOut,
// 		css: (t: number) => `clip-path: path("M0,100 h${t * 200} L0,${100 - t * 200} Z")`,
// 	}
// }
