<script lang="ts">
  import { onMount } from 'svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import SingleRegistrationForm from '$lib/components/SingleRegistrationForm.svelte';
  import BulkRegistrationForm from '$lib/components/BulkRegistrationForm.svelte';
  import { tickets } from '$lib/tickets';

  const carouselSlides = [
    {
      image: 'https://picsum.photos/800/400?random=1',
      title: 'Welcome to the Event',
      description: 'Get ready for an amazing experience!'
    },
    {
      image: 'https://picsum.photos/800/400?random=2',
      title: 'VIP Experience',
      description: 'Exclusive access and premium amenities'
    },
    {
      image: 'https://picsum.photos/800/400?random=3',
      title: 'Limited Time Offer',
      description: 'Book your tickets now for special early bird prices'
    }
  ];

  let selectedTicket = null;
  let quantity = 1;
  let countdowns = {};
  let dateRestrictions = {};
  let showQuantitySection = false;
  let showRegistrationForm = false;
  let currentStep = 'select-ticket'; // 'select-ticket', 'single-registration', 'bulk-registration'

  function updateCountdowns() {
    tickets.forEach(ticket => {
      if (ticket.status === 'countdown') {
        const [hours, minutes, seconds] = ticket.countdownTime.split(':').map(Number);
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
        if (totalSeconds > 0) {
          totalSeconds--;
          const h = Math.floor(totalSeconds / 3600);
          const m = Math.floor((totalSeconds % 3600) / 60);
          const s = totalSeconds % 60;
          ticket.countdownTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        countdowns[ticket.id] = ticket.countdownTime;
      } else if (ticket.status === 'date_restricted') {
        const now = new Date();
        const fromDate = new Date(ticket.availableFrom);
        const toDate = new Date(ticket.availableTo);
        
        if (now < fromDate) {
          dateRestrictions[ticket.id] = `ONLY AVAILABLE BETWEEN ${ticket.availableFrom} and ${ticket.availableTo}`;
        } else if (now > toDate) {
          dateRestrictions[ticket.id] = 'No longer available';
        } else {
          dateRestrictions[ticket.id] = `ONLY AVAILABLE BETWEEN ${ticket.availableTo}`;
        }
      }
    });
    tickets = tickets; // Trigger reactivity
  }

  onMount(() => {
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  });

  function getTicketStyle(ticket: Ticket): string {
    let style = 'relative overflow-hidden rounded-lg transition-all duration-300 ';
    
    if (ticket.status === 'available' && selectedTicket?.id === ticket.id) {
      style += 'bg-blue-100 border-blue-500 border-2 ';
    } else {
      switch (ticket.status) {
        case 'available':
          style += `bg-white text-black `;
          break;
        case 'sold_out':
          style += 'bg-gray-800 text-white/50 ';
          break;
        case 'countdown':
          style += 'bg-gray-800 text-white/50 ';
          break;
        case 'date_restricted':
          style += 'bg-gray-800 text-white/50 ';
          break;
      }
    }
    
    return style;
  }

  function formatPrice(price: number): string {
    return `₱ ${price.toLocaleString()}`;
  }

  function getTicketStatus(ticket: Ticket): string {
    switch (ticket.status) {
      case 'sold_out':
        return 'SOLD OUT';
      case 'available':
        return `${ticket.remainingCount} left`;
      case 'countdown':
        return `AVAILABLE IN ${countdowns[ticket.id] || ticket.countdownTime}`;
      case 'date_restricted':
        return dateRestrictions[ticket.id] || `ONLY AVAILABLE BETWEEN ${ticket.availableFrom} and ${ticket.availableTo}`;
      default:
        return '';
    }
  }

  function handleTicketSelect(ticket: Ticket) {
    if (ticket.status === 'available') {
      if (selectedTicket?.id === ticket.id) {
        // Unselect the ticket if it's already selected
        selectedTicket = null;
        showQuantitySection = false;
        currentStep = 'select-ticket';
      } else {
        // Select the new ticket
        selectedTicket = ticket;
        showQuantitySection = true;
        quantity = 1; // Reset quantity when selecting a new ticket
        currentStep = 'select-ticket';
      }
    }
  }

  function handleNext() {
    currentStep = quantity === 1 ? 'single-registration' : 'bulk-registration';
  }

  function handleBack() {
    currentStep = 'select-ticket';
    showQuantitySection = true;
  }
</script>

<main class="min-h-screen bg-gradient-to-b from-[#102127] to-[#3B788D] text-white p-4">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center">REGISTER INSTRUCTION</h1>

    <div class="w-full bg-[#1f1f1f] rounded-lg p-4 md:p-6 relative mb-8">
      <Carousel slides={carouselSlides} />
    </div>

    <h2 class="text-2xl md:text-3xl font-bold text-center mb-6">REGISTER NOW</h2>
    <div class="bg-[#1f1f1f] w-full max-w-[90%] md:max-w-[80%] rounded-lg p-4 md:p-10 mx-auto">
      <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center">
        {#if currentStep === 'select-ticket'}
          Select Tickets
        {:else if currentStep === 'single-registration'}
          Single Registration Form
        {:else if currentStep === 'bulk-registration'}
          Bulk Registration Form
        {/if}
      </h3>
    
      {#if currentStep === 'select-ticket'}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-20 gap-3 mb-6">
          {#each tickets as ticket}
            <div class="{getTicketStyle(ticket)}">
              <button
                class="w-full h-full p-4 text-left flex flex-col relative"
                on:click={() => handleTicketSelect(ticket)}
                disabled={ticket.status !== 'available'}
              >
                <div class="flex justify-between items-start mb-2">
                  <span class="text-base sm:text-lg font-bold">{ticket.name}</span>
                  {#if ticket.status === 'available' && selectedTicket?.id === ticket.id}
                    <span class="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  {/if}
                </div>
                <div class="text-lg sm:text-2xl font-bold mb-2">{formatPrice(ticket.price)}</div>
                <div class="text-sm mt-auto {
                  ticket.status === 'sold_out' ? 'text-red-400' : 
                  ticket.status === 'countdown' ? 'text-blue-400' : 
                  ticket.status === 'date_restricted' ? 'text-yellow-400' : 
                  'text-green-600'
                }">
                  {getTicketStatus(ticket)}
                </div>
              </button>
              {#if ticket.status !== 'available'}
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <span class="text-white font-bold text-lg text-center px-4">
                    {getTicketStatus(ticket)}
                  </span>
                </div>
              {/if}
            </div>
          {/each}
        </div>

        {#if selectedTicket?.status === 'available' && showQuantitySection}
          <div class="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <span class="text-base sm:text-lg font-semibold">Quantity</span>
                <div class="flex items-center gap-3 bg-gray-800 rounded-lg">
                  <button 
                    class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-700 rounded-l-lg transition-colors"
                    on:click={() => quantity = Math.max(1, quantity - 1)}
                  >
                    <span class="text-lg sm:text-xl">-</span>
                  </button>
                  <span class="w-10 sm:w-12 text-center text-lg sm:text-xl">{quantity}</span>
                  <button 
                    class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-700 rounded-r-lg transition-colors"
                    on:click={() => quantity = Math.min(selectedTicket.remainingCount || 10, quantity + 1)}
                  >
                    <span class="text-lg sm:text-xl">+</span>
                  </button>
                </div>
              </div>
            </div>
      
            <div class="flex justify-between items-center py-4 border-t border-gray-700">
              <span class="text-base sm:text-lg">Total</span>
              <span class="text-lg sm:text-2xl font-bold">{formatPrice(selectedTicket.price * quantity)}</span>
            </div>
      
            <button 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg font-bold text-lg transition-colors mt-6"
              on:click={handleNext}
            >
              NEXT
            </button>
          </div>
        {/if}
      {:else}
        <div class="mb-6">
          <button 
            class="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            on:click={handleBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Back to Ticket Selection
          </button>
          
          {#if currentStep === 'single-registration'}
            <SingleRegistrationForm {selectedTicket} />
          {:else if currentStep === 'bulk-registration'}
            <BulkRegistrationForm {selectedTicket} {quantity} />
          {/if}
        </div>
      {/if}
    </div>
  </div>
</main>