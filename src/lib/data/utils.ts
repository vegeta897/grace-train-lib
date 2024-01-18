import type { DBCar, DecalData, DepotCar, TopperData } from '.'

export const transformDecalFromDB = (
	decal: DBCar['decals'][number]
): DepotCar['decals'][number] => ({
	name: decal.name as DecalData['name'],
	x: decal.x,
	y: decal.y,
	rotate: decal.rotate,
	scale: decal.scale,
	fill: decal.fill as DecalData['fill'],
	params: decal.params as DecalData['params'],
})

export const transformTopperFromDB = (topper: DBCar['toppers'][number]): TopperData => ({
	name: topper.name as TopperData['name'],
	position: topper.position,
	offset: topper.offset,
	scale: topper.scale,
	rotate: topper.rotate,
	params: topper.params as TopperData['params'],
})

export function transformCarFromDBToDepotCarWithoutDecalsToppers(
	car: DBCar
): Omit<DepotCar, 'toppers' | 'decals'> {
	return {
		body: car.body as DepotCar['body'],
		bodyColor: car.bodyColor || (undefined as DepotCar['bodyColor']),
		bodyPopColor: car.bodyPopColor || (undefined as DepotCar['bodyPopColor']),
		wheelColor: car.wheelColor || (undefined as DepotCar['wheelColor']),
		wheelFromCenter: car.wheelFromCenter,
		wheelSize: car.wheelSize,
	}
}

export function transformCarFromDBToDepotCar(car: DBCar): DepotCar {
	return {
		...transformCarFromDBToDepotCarWithoutDecalsToppers(car),
		decals: car.decals.map(transformDecalFromDB),
		toppers: car.toppers.map(transformTopperFromDB),
	}
}
