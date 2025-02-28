<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Ticket } from '$lib/tickets';
  
  export let selectedTicket: Ticket;
  export let quantity: number;
  export let tickets: Ticket[] = [];
  
  const dispatch = createEventDispatcher();
  
  type Attendee = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    selectedTicket: Ticket | null;
  };
  
  // Filter only available tickets for the dropdown
  let availableTickets = tickets.filter(ticket => ticket.status === 'available');
  
  let attendees: Attendee[] = Array(quantity).fill(null).map(() => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedTicket: selectedTicket || availableTickets[0] || null
  }));
  
  let contactInfo = {
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  };
  
  let errors = {
    attendees: Array(quantity).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedTicket: ''
    })),
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  };
  
  function validateForm() {
    let isValid = true;
    
    // Reset errors
    errors = {
      attendees: Array(quantity).fill(null).map(() => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        selectedTicket: ''
      })),
      contactPerson: '',
      contactEmail: '',
      contactPhone: ''
    };
    
    // Validate contact info
    if (!contactInfo.contactPerson.trim()) {
      errors.contactPerson = 'Contact person is required';
      isValid = false;
    }
    
    if (!contactInfo.contactEmail.trim()) {
      errors.contactEmail = 'Contact email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(contactInfo.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!contactInfo.contactPhone.trim()) {
      errors.contactPhone = 'Contact phone is required';
      isValid = false;
    }
    
    // Validate each attendee
    attendees.forEach((attendee, index) => {
      if (!attendee.firstName.trim()) {
        errors.attendees[index].firstName = 'First name is required';
        isValid = false;
      }
      
      if (!attendee.lastName.trim()) {
        errors.attendees[index].lastName = 'Last name is required';
        isValid = false;
      }
      
      if (attendee.email && !/^\S+@\S+\.\S+$/.test(attendee.email)) {
        errors.attendees[index].email = 'Please enter a valid email';
        isValid = false;
      }
      
      if (!attendee.selectedTicket) {
        errors.attendees[index].selectedTicket = 'Please select a ticket';
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  function handleSubmit() {
    if (validateForm()) {
      // Process form submission
      dispatch('submit', { 
        ticket: selectedTicket,
        attendees,
        contactInfo,
        quantity
      });
      
      alert('Bulk registration successful!');
      
      // Reset form
      attendees = Array(quantity).fill(null).map(() => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        selectedTicket: availableTickets[0] || null
      }));
      
      contactInfo = {
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        address: ''
      };
    }
  }
  
  function addAttendee() {
    attendees = [...attendees, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedTicket: availableTickets[0] || null
    }];
    
    errors.attendees = [...errors.attendees, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      selectedTicket: ''
    }];
    
    quantity = attendees.length;
  }
  
  function removeAttendee(index: number) {
    if (attendees.length > 1) {
      attendees = attendees.filter((_, i) => i !== index);
      errors.attendees = errors.attendees.filter((_, i) => i !== index);
      quantity = attendees.length;
    }
  }

  // Function to format price
  function formatPrice(price: number): string {
    return `₱${price.toLocaleString()}`;
  }
  
  // Calculate total price based on all selected tickets
  $: totalPrice = attendees.reduce((sum, attendee) => {
    return sum + (attendee.selectedTicket ? attendee.selectedTicket.price : 0);
  }, 0);
  
  // Update attendees when quantity changes
  $: {
    if (attendees.length !== quantity) {
      if (attendees.length < quantity) {
        // Add more attendees
        const newAttendees = Array(quantity - attendees.length).fill(null).map(() => ({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          selectedTicket: selectedTicket || availableTickets[0] || null
        }));
        attendees = [...attendees, ...newAttendees];
        
        // Add corresponding error objects
        const newErrors = Array(quantity - errors.attendees.length).fill(null).map(() => ({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          selectedTicket: ''
        }));
        errors.attendees = [...errors.attendees, ...newErrors];
      } else {
        // Remove excess attendees
        attendees = attendees.slice(0, quantity);
        errors.attendees = errors.attendees.slice(0, quantity);
      }
    }
  }
</script>

<div class="bg-gray-800/50 rounded-lg p-6">
  <div class="mb-6">
    <h3 class="text-xl font-bold mb-2">Ticket Information</h3>
      <div class="flex justify-between items-center mb-4">
</div>
    
    <div class="mt-4 p-4 bg-gray-700/50 rounded-lg">
      <h4 class="font-semibold mb-2">Summary</h4>
      
      <div class="flex justify-between items-center">
        <p>Total Price:</p>
        <p class="text-xl font-bold">{formatPrice(totalPrice)}</p>
        
      </div>
      <div>
        <p class="text-sm text-gray-300">Quantity: {quantity}</p>
      </div>
    
    </div>
  </div>
    
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Personal Information</h3>
      <button 
        type="button"
        on:click={addAttendee}
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      >
        Add Row
      </button>
    </div>
    
    {#each attendees as attendee, index}
      <div class="bg-gray-700/30 rounded-lg p-4 mb-4">
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-semibold">Ticket {index + 1}</h4>
          {#if attendees.length > 1}
            <button 
              type="button"
              on:click={() => removeAttendee(index)}
              class="text-red-400 hover:text-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          {/if}
          
          
        </div>
        
        <div class="mb-4">
          <label for={`ticket-${index}`} class="block text-sm font-medium mb-1">Ticket Type *</label>
          <select 
            id={`ticket-${index}`} 
            bind:value={attendee.selectedTicket} 
            class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {#each availableTickets as ticket}
              <option value={ticket}>{ticket.name} - {formatPrice(ticket.price)}</option>
            {/each}
            
            
          </select>
          {#if errors.attendees[index]?.selectedTicket}
            <p class="text-red-400 text-sm mt-1">{errors.attendees[index].selectedTicket}</p>
          {/if}
          
          
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for={`firstName-${index}`} class="block text-sm font-medium mb-1">First Name *</label>
            <input 
              type="text" 
              id={`firstName-${index}`} 
              bind:value={attendee.firstName} 
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {#if errors.attendees[index]?.firstName}
              <p class="text-red-400 text-sm mt-1">{errors.attendees[index].firstName}</p>
            {/if}
            
            
          </div>
          
          <div>
            <label for={`lastName-${index}`} class="block text-sm font-medium mb-1">Last Name *</label>
            <input 
              type="text" 
              id={`lastName-${index}`} 
              bind:value={attendee.lastName} 
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {#if errors.attendees[index]?.lastName}
              <p class="text-red-400 text-sm mt-1">{errors.attendees[index].lastName}</p>
            {/if}
            
          
          </div>
          
          <div>
            <label for={`email-${index}`} class="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              id={`email-${index}`} 
              bind:value={attendee.email} 
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {#if errors.attendees[index]?.email}
              <p class="text-red-400 text-sm mt-1">{errors.attendees[index].email}</p>
            {/if}
            
            
          </div>
          
          <div>
            <label for={`phone-${index}`} class="block text-sm font-medium mb-1">Phone</label>
            <input 
              type="tel" 
              id={`phone-${index}`} 
              bind:value={attendee.phone} 
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {#if errors.attendees[index]?.phone}
              <p class="text-red-400 text-sm mt-1">{errors.attendees[index].phone}</p>
            {/if}
            
            
          </div>
        </div>
      </div>
    {/each}
    
    
  </div>
  
  <button 
    type="button" 
    on:click={handleSubmit}
    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition-colors mt-4"
  >
    COMPLETE REGISTRATION
  </button>
</div>