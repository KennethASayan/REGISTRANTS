<script lang="ts">
    export let selectedTicket;
    export let quantity: number;
  
    type Attendee = {
      firstName: string;
      lastName: string;
      contactNumber: string;
      email: string;
    };
  
    let attendees: Attendee[] = Array(quantity).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: ''
    }));
  
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
  
    $: isFormValid = attendees.every(attendee => 
      attendee.firstName && 
      isValidName(attendee.firstName) &&
      attendee.lastName && 
      isValidName(attendee.lastName) &&
      attendee.contactNumber && 
      isValidPhoneNumber(attendee.contactNumber) &&
      attendee.email &&
      isValidEmail(attendee.email)
    ) && agreeToTerms;
  </script>
  
  <div class="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 md:p-6">
    <div class="space-y-8">
      {#each attendees as attendee, index}
        <div class="p-4 bg-gray-800/50 rounded-lg">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  bind:value={attendee.firstName}
                  class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
                  placeholder="Enter first name"
                />
                {#if attendee.firstName && !isValidName(attendee.firstName)}
                  <p class="text-red-500 text-sm mt-1">Please enter a valid name (letters only)</p>
                {/if}
                
              </div>
  
              <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  bind:value={attendee.lastName}
                  class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
                  placeholder="Enter last name"
                />
                {#if attendee.lastName && !isValidName(attendee.lastName)}
                  <p class="text-red-500 text-sm mt-1">Please enter a valid name (letters only)</p>
                {/if}
                
              </div>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Contact Number</label>
                <input
                  type="tel"
                  bind:value={attendee.contactNumber}
                  class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
                  placeholder="Enter 11-digit number"
                  maxlength="11"
                />
                {#if attendee.contactNumber && !isValidPhoneNumber(attendee.contactNumber)}
                  <p class="text-red-500 text-sm mt-1">Please enter a valid 11-digit phone number</p>
                {/if}
                
              </div>
  
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  bind:value={attendee.email}
                  class="w-full px-3 py-2 bg-gray-800 rounded-lg text-white"
                  placeholder="Enter email address"
                />
                {#if attendee.email && !isValidEmail(attendee.email)}
                  <p class="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                {/if}
                
              </div>
            </div>
          </div>
        </div>
      {/each}
      
  
      <div class="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          id="terms"
          bind:checked={agreeToTerms}
          class="w-4 h-4 rounded"
        />
        <label for="terms" class="text-sm">
          I agree to the Concert Waiver and Terms of Agreement for all attendees
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