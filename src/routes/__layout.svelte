<script>
import Navbar from '$lib/basics/Navbar.svelte';

	import '../app.css';
</script>

<Navbar/>
<div class="nav-push">
	<slot />
</div>
