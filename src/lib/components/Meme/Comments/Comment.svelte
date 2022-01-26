<script>
    export let username = 'maxiking'
    export let comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
</script>

<div class="flex flex-col mx-4 pt-3 first:pt-0">
    <span class="font-bold pb-1">{username}</span>
    <span class="text-sm">{comment}</span>
    <div class="flex items-center select-none">
        <img src="/icons/ArrowUp.svg" class="w-4 h-4  grayscale object-fill hover:cursor-pointer"/>
        <span class="px-1">0</span>
        <img src="/icons/ArrowDown.svg" class="w-4 h-4  grayscale object-fill hover:cursor-pointer"/>
    </div>
</div>