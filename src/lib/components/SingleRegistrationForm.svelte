<script lang="ts">
    export let selectedTicket;
    
    let firstName = '';
    let lastName = '';
    let contactNumber = '';
    let email = '';
    let agreeToTerms = false;
  
    // Email validation
    function isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Name validation (letters and spaces only)
    function isValidName(name: string): boolean {
      const nameRegex = /^[A-Za-z\s]+$/;
      return nameRegex.test(name);
    }
  
    // Phone number validation (numbers only, 11 digits)
    function isValidPhoneNumber(number: string): boolean {
      const phoneRegex = /^[0-9]{11}$/;
      return phoneRegex.test(number);
    }
  
    $: isFormValid = firstName && 
                     lastName && 
                     contactNumber && 
                     email && 
                     agreeToTerms && 
                     isValidEmail(email) &&
                     isValidName(firstName) &&
                     isValidName(lastName) &&
                     isValidPhoneNumber(contactNumber);
  </script>
  
  <div class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 md:p-6">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1" for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          bind:value={firstName}
          class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
          placeholder="Enter first name"
        />
        {#if firstName && !isValidName(firstName)}
          <p class="text-red-500 text-sm mt-1">Please enter a valid name (letters only)</p>
        {/if}
        
      </div>
  
      <div>
        <label class="block text-sm font-medium mb-1" for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          bind:value={lastName}
          class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
          placeholder="Enter last name"
        />
        {#if lastName && !isValidName(lastName)}
          <p class="text-red-500 text-sm mt-1">Please enter a valid name (letters only)</p>
        {/if}
        
      </div>
  
      <div>
        <label class="block text-sm font-medium mb-1" for="contactNumber">Contact Number</label>
        <input
          type="tel"
          id="contactNumber"
          bind:value={contactNumber}
          class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
          placeholder="Enter 11-digit number"
          maxlength="11"
        />
        {#if contactNumber && !isValidPhoneNumber(contactNumber)}
          <p class="text-red-500 text-sm mt-1">Please enter a valid 11-digit phone number</p>
        {/if}
        
      </div>
  
      <div>
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
          placeholder="Enter email address"
        />
        {#if email && !isValidEmail(email)}
          <p class="text-red-500 text-sm mt-1">Please enter a valid email address</p>
        {/if}
        
      </div>
  
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          bind:checked={agreeToTerms}
          class="w-4 h-4 rounded"
        />
        <label for="terms" class="text-sm">
          I agree to the Concert Waiver and Terms of Agreement
        </label>
      </div>
  
      <button 
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        Submit Registration
      </button>
    </div>
  </div>