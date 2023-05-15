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
		<Star translate={{ x: 150, y: 50 }} scale={1.7} />
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
