<script>
	export let staticPath;
	export let animatedPath;
	let customClass;
	export { customClass as class };
	export let forceAnimation = false;

	let isHovered = false;

	$: shouldAnimate = isHovered || forceAnimation;

	const handleMouseEnter = () => {
		isHovered = true;
	};

	const handleMouseLeave = () => {
		isHovered = false;
	};
</script>

<img
	class={customClass}
	src={shouldAnimate ? animatedPath : staticPath}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:click={() => console.log('test')}
	alt={undefined}
/>
