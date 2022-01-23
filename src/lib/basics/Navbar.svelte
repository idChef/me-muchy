<script lang="ts">
  let navbarHeight: number;

</script>


{@html `<style>body{--navbar-height: ${navbarHeight}px}</style>`}

<nav class="bg-gray-100 shadow-md" bind:clientHeight={navbarHeight}>
    <div class="flex justify-between items-center bg-white py-2 lg:px-40 md:px-20 px-10">
      <div class="">
        <a href="/"><img class="h-8 cursor-pointer" src="/slim-logo.svg" alt="" /></a>
      </div>
      <ul class="lg:flex hidden items-center space-x-10">
        <a href="/auth/register">
          <li class="text-lg font-semibold hover:text-red-500 transition duration-200 cursor-pointer">Konto</li>
        </a>
      </ul>
      <div class="lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </div>
  </nav>