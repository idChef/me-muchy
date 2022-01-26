<script>
	import { currentUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	let email;
	let password;

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await fetch(`https://memuchyapi.azurewebsites.net/User/Login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});

			if (res.ok) {
				const user = await res.json();
				currentUser.set(user);

				goto('/');
			}
		} catch (error) {
			console.error(error);
		}
	};
</script>

<svelte:head>
	<title>Logowanie</title>
</svelte:head>

<div class="text-left p-0 font-sans">
	<h1 class=" text-gray-800 text-3xl font-medium">Zaloguj się do swojego konta</h1>
	<h3 class="p-1 text-gray-700">Pogchamp, ze posiadasz juz u nas konto!</h3>
</div>
<form class="p-0">
	<div class="mt-5">
		<!-- <label for="email" class="sc-bqyKva ePvcBv">Email</label> -->
		<input
			type="text"
			class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
			placeholder="Email"
			bind:value={email}
		/>
	</div>
	<div class="mt-5">
		<input
			type="password"
			class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent  "
			placeholder="Hasło"
			bind:value={password}
		/>
	</div>

	<div class="mt-6 block p-5 md:font-sans text-xs text-gray-800">
		<input type="checkbox" class="inline-block border-0  " />
		<span>Zapamiętaj moje hasło</span>
	</div>

	<div class="mt-10">
		<input
			type="submit"
			value="Zaloguj się"
			class="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
			on:click={handleSubmit}
		/>
	</div>
</form>
<a class="" href="/auth/register" data-test="Link"
	><span class="block  p-5 text-center text-gray-800  text-xs "
		>Oszukałem was - nie posiadam konta :(</span
	></a
>
