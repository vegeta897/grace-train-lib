<script lang="ts">
	import TrainCar from '../lib/TrainCar.svelte'
</script>

<svelte:head>
	<title>Grace Train Component Library</title>
</svelte:head>
<div class="showcase">
	<TrainCar />
</div>

<style>
	:global(html) {
		background: #29185e;
	}
	.showcase {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
</style>
