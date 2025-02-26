<script lang="ts">
    export let show = false;
    export let onClose: () => void;
  
    function handleBackdropClick(event: MouseEvent) {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }
  </script>
  
  {#if show}
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      on:click={handleBackdropClick}
    >
      <div class="bg-white dark:bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-black">Select Ticket Type</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            on:click={onClose}
          >
            ✕
          </button>
        </div>
        <slot />
      </div>
    </div>
  {/if}
  