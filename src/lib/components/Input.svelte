<script lang="ts">
	export let name: string;
	export let type: string = 'text';
	export let value

    const handleInput = (event) => {
        value = event.target.value;
    }
</script>

<div class="relative h-10 input-component mb-5" class:empty="{!value}">
	<input
		id={name}
		type={type}
		{name}
		class="h-full w-full border-gray-300 px-2 transition-all border-blue rounded-sm"
		on:input={handleInput}
	/>
	<label for={name} class="absolute left-2 transition-all bg-white px-1"> {name} </label>
</div>

<style>
	label {
		top: 0%;
		transform: translateY(-50%);
		font-size: 11px;
		color: rgba(37, 99, 235, 1);
	}
	.empty input:not(:focus) + label {
		top: 50%;
		transform: translateY(-50%);
		font-size: 14px;
	}
	input:not(:focus) + label {
		color: rgba(70, 70, 70, 1);
	}
	input {
		border-width: 1px;
	}
	input:focus {
		outline: none;
		border-color: rgba(37, 99, 235, 1);
	}
</style>
