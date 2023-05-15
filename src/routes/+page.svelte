<script lang="ts">
	import TrainCar from '../lib/TrainCar.svelte'
	import TankerCar from '../lib/TankerCar.svelte'
	import Star from '$lib/Star.svelte'
</script>

<svelte:head>
	<title>Grace Train Component Library</title>
</svelte:head>
<div class="showcase">
	<TrainCar>
		<Star translate={{ x: 375 / 2, y: 120 }} scale={2} rotate={0} />
	</TrainCar>
	<TankerCar />
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
