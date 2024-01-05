import { mix, toHex } from 'color2k'

export const COLOR_NAMES = {
	POP: {
		PIZZAZZ: '#ff53d9',
		POP: '#ff538f',
		RUBY: '#ff6d53',
		PUMPKIN: '#ffaf22',
		CANARY: '#ffe431',
		LIME: '#bef80a',
		EMERALD: '#4dfd6d',
		AQUA: '#53ffc3',
		SKY: '#3efff2',
	},
	BASE: {
		HEAT: '#ae1e81',
		MAUVE: '#9e2aa0',
		VIOLET: '#723bda',
		BASE: '#605de9',
		PLAYDOUGH: '#376dd8',
		CYAN: '#2383b9',
	},
} as const

const corePopColors = [
	COLOR_NAMES.POP.PIZZAZZ,
	COLOR_NAMES.POP.POP,
	COLOR_NAMES.POP.RUBY,
	COLOR_NAMES.POP.PUMPKIN,
	COLOR_NAMES.POP.CANARY,
	COLOR_NAMES.POP.LIME,
	COLOR_NAMES.POP.EMERALD,
	COLOR_NAMES.POP.AQUA,
	COLOR_NAMES.POP.SKY,
]

const coreBaseColors = [
	COLOR_NAMES.BASE.HEAT,
	COLOR_NAMES.BASE.MAUVE,
	COLOR_NAMES.BASE.VIOLET,
	COLOR_NAMES.BASE.BASE,
	COLOR_NAMES.BASE.PLAYDOUGH,
	COLOR_NAMES.BASE.CYAN,
]

function buildGradient(colors: string[]) {
	const gradient: string[] = []
	for (let i = 0; i < colors.length; i++) {
		const thisColor = colors[i]
		if (i > 0) {
			const prevColor = colors[i - 1]
			gradient.push(toHex(mix(prevColor, thisColor, 1 / 3)))
			gradient.push(toHex(mix(prevColor, thisColor, 2 / 3)))
		}
		gradient.push(thisColor)
	}
	return gradient as Readonly<string[]>
}

const popColorGradient = buildGradient(corePopColors)
const baseColorGradient = buildGradient(coreBaseColors)

export const COLORS = {
	POP: popColorGradient,
	BASE: baseColorGradient,
} as const

export function colorRun(
	palette: 'POP' | 'BASE',
	start: number,
	length: number,
	interval = 1
) {
	return COLORS[palette]
		.slice(start, start + length * interval)
		.filter((_, i) => i % interval === 0)
}
