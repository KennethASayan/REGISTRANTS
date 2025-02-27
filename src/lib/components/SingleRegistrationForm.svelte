<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Ticket } from '../tickets';
  
  export let selectedTicket: Ticket;
  
  const dispatch = createEventDispatcher();
  
  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };
  
  let errors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };
  
  function validateForm() {
    let isValid = true;
    
    // Reset errors
    errors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }
    
    return isValid;
  }
  
  function handleSubmit() {
    if (validateForm()) {
      // Process form submission
      dispatch('submit', { 
        ticket: selectedTicket,
        attendee: formData,
        quantity: 1
      });
      
      alert('Registration successful!');
      
      // Reset form
      formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
      };
    }
  }
</script>

<div class="bg-gray-800/50 rounded-lg p-6">
  <div class="mb-6">
    <h3 class="text-xl font-bold mb-2">Ticket Information</h3>
    <div class="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
      <div>
        <p class="font-semibold">{selectedTicket.name}</p>
        <p class="text-sm text-gray-300">Quantity: 1</p>
      </div>
      <p class="text-xl font-bold">₱ {selectedTicket.price.toLocaleString()}</p>
    </div>
  </div>

  <h3 class="text-xl font-bold mb-4">Attendee Information</h3>
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="firstName" class="block text-sm font-medium mb-1">First Name *</label>
        <input 
          type="text" 
          id="firstName" 
          bind:value={formData.firstName} 
          class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {#if errors.firstName}
          <p class="text-red-400 text-sm mt-1">{errors.firstName}</p>
        {/if}
      </div>
      
      <div>
        <label for="lastName" class="block text-sm font-medium mb-1">Last Name *</label>
        <input 
          type="text" 
          id="lastName" 
          bind:value={formData.lastName} 
          class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {#if errors.lastName}
          <p class="text-red-400 text-sm mt-1">{errors.lastName}</p>
        {/if}
      </div>
    </div>
    
    <div>
      <label for="email" class="block text-sm font-medium mb-1">Email *</label>
      <input 
        type="email" 
        id="email" 
        bind:value={formData.email} 
        class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {#if errors.email}
        <p class="text-red-400 text-sm mt-1">{errors.email}</p>
      {/if}
    </div>
    
    <div>
      <label for="phone" class="block text-sm font-medium mb-1">Phone Number *</label>
      <input 
        type="tel" 
        id="phone" 
        bind:value={formData.phone} 
        class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {#if errors.phone}
        <p class="text-red-400 text-sm mt-1">{errors.phone}</p>
      {/if}
    </div>
    
    <div>
      <label for="address" class="block text-sm font-medium mb-1">Address</label>
      <textarea 
        id="address" 
        bind:value={formData.address} 
        rows="3" 
        class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    
    <button 
      type="submit" 
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition-colors mt-4"
    >
      COMPLETE REGISTRATION
    </button>
  </form>
</div>