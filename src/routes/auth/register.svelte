<script lang="ts">
	let username: string;
	let email: string;
	let password: string;
	let error: string | undefined;

	const handleSubmit = (event) => {
		event.preventDefault();

		error = undefined;

		if (!username) {
			error = 'Nie zdefiniowano nazwy uzytkownika!';
			return;
		}

		if (!email) {
			error = 'Wprowadz adres email!';
			return;
		}

		if (!password) {
			error = 'Hasło jest wymagane dla rejestracji!';
			return; 
		}

        console.log('TODO: Wysyłanie rejestracji');
	};
</script>

<svelte:head>
	<title>Rejestracja</title>
</svelte:head>

<div class="text-left p-0 font-sans">
	<h1 class=" text-gray-800 text-3xl font-medium">Memy na wyciągnięcie ręki</h1>
	<h3 class="p-1 text-gray-700">Dołącz do najbardziej memiarskiej społeczności.</h3>
	{#if error}<span class="text-red-500">{error}</span>{/if}
</div>
<form on:submit={handleSubmit} class="p-0">
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
			type="text"
			class="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
			placeholder="Nazwa uzytkownika"
			bind:value={username}
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
		<span
			>Tworząc konto zgadzasz się na nasz
			<a class="" href="/s/terms" target="_blank" data-test="Link">
				<span class="underline ">Regulamin</span>
			</a>
			i
			<a class="" href="/s/privacy" target="_blank" data-test="Link">
				<span class="underline">Politykę Prywatności</span>.
			</a>
		</span>
	</div>

	<div class="mt-10">
		<input
			type="submit"
			value="Zarejestruj się"
			class="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
		/>
	</div>
</form>
<a class="" href="/auth/login" data-test="Link"
	><span class="block  p-5 text-center text-gray-800  text-xs ">Posiadasz juz konto?</span></a
>
