<script lang="ts">
	import TrainCar from '../lib/TrainCar.svelte'
	import TankerCar from '../lib/TankerCar.svelte'
	import Decal from '$lib/Decal.svelte'
</script>

<svelte:head>
	<title>Grace Train Component Library</title>
</svelte:head>
<div class="showcase">
	<TrainCar>
		<Decal
			name="star"
			transform={{ translate: { x: 375 / 2, y: 120 }, scale: 1.8, rotate: 0 }}
		/>
	</TrainCar>
	<TankerCar>
		<Decal
			name="heart"
			transform={{ translate: { x: 375 / 2, y: 120 }, scale: 1.5, rotate: 0 }}
		/>
	</TankerCar>
</div>

<style>
	:global(html) {
		background: #29185e;
	}
	.showcase {
		display: grid;
		grid-template-columns: repeat(4, 150px);
		row-gap: 2rem;
		column-gap: 2rem;
	}
</style>
