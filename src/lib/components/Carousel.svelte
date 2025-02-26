<script lang="ts">
    import { onMount } from 'svelte';
  
    export let slides: {
      image: string;
      title: string;
      description: string;
    }[] = [];
  
    let currentIndex = 0;
    let autoplayInterval: number;
  
    onMount(() => {
      startAutoplay();
      return () => stopAutoplay();
    });
  
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        next();
      }, 2000);
    }
  
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
  
    function next() {
      currentIndex = (currentIndex + 1) % slides.length;
    }
  
    function prev() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
  
    function goToSlide(index: number) {
      currentIndex = index;
    }
  </script>
  
  <div 
    class="relative w-full overflow-hidden rounded-xl p-4"
    on:mouseenter={stopAutoplay}
    on:mouseleave={startAutoplay}
  >
    {#each slides as slide, i}
      <div
        class="transition-opacity duration-500 flex flex-row gap-8 items-center"
        style="opacity: {i === currentIndex ? '1' : '0'}; display: {i === currentIndex ? 'flex' : 'none'}"
      >
        <div class="w-1/2">
          <img
            src={slide.image}
            alt={slide.title}
            class="w-full h-[300px] object-cover rounded-lg"
          />
        </div>
        <div class="w-1/2 text-left">
          <h3 class="text-2xl font-bold mb-4">{slide.title}</h3>
          <p class="text-lg">{slide.description}</p>
        </div>
      </div>
    {/each}
    
  
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      on:click={prev}
    >
      ←
    </button>
    <button
      class="absolute right-[0.1px] top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      on:click={next}
    >
      →
    </button>
  
    <div class="absolute bottom-[0.5px] left-1/2 -translate-x-1/2 flex gap-2">
      {#each slides as _, i}
        <button
          class="w-3 h-3 rounded-full {i === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}"
          on:click={() => goToSlide(i)}
        />
      {/each}
      
    </div>
  </div>