<script lang="ts">
    import { activeRoute } from '$lib/stores';
    import { goto } from '$app/navigation';
  
    export const tabs = [
      { id: 'registrants', label: 'Registrants', path: '' },
      { id: 'posts', label: 'Posts', path: '/posts' },
      { id: 'form', label: 'Form', path: '/form' },
      { id: 'merchant', label: 'Merchant', path: '' },
      { id: 'emails', label: 'Emails', path: '/emails' },
      { id: 'staff', label: 'Staff', path: '/staff' }
    ];
  
    function navigateTo(route: string) {
      activeRoute.set(route);
      goto(`/${route}`);
    }
  </script>
  
  <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8 py-3 rounded-lg">
    <nav class="flex space-x-4 min-w-max">
      {#each tabs as tab}
        <button 
          class="px-4 sm:px-10 py-2 text-sm sm:text-base transition-all duration-300 ease-out
            {$activeRoute === tab.id 
              ? 'text-white bg-[#DF4D60] hover:bg-[#eb6d80] transform scale-105' 
              : 'text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300'} 
            shadow-sm rounded-lg"
          on:click={() => navigateTo(tab.id)}
        >
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>