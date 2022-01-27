<script>
	import { currentNotification } from '$lib/stores/notification';
	import Navbar from '$lib/basics/Navbar.svelte';
	import ToastNotification from '$lib/components/ToastNotification.svelte';

	import '../app.css';
</script>

<Navbar />
<div class="nav-push">
	<slot />
</div>
<ToastNotification notification={$currentNotification} />
