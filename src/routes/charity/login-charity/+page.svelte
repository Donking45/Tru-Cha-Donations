<script>
    import { onMount } from 'svelte';
    export let form;
    export let data;
  
    let email = '';
    let password = '';
    let errorMessage = '';
    let showSuccessModal = false;
  
    async function handleSubmit(event) {
      event.preventDefault();
      try {
        const response = await fetch('/charity/login-charity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          errorMessage = result.message;
          return;
        }
  
        // Show success modal
        showSuccessModal = true;
        console.log('Login successful:', result);
      } catch (error) {
        console.error('Error:', error);
        errorMessage = 'Something went wrong. Please try again.';
      }
    }
  
    function closeModal() {
      showSuccessModal = false;
    }
  </script>
  
  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      text-align: center;
    }
  </style>
  
  <div class="bg-slate-100 flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-slate-400 p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-slate-900 text-center">Login</h2>
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <label for="email" class="block text-slate-900 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-slate-900 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" required>
        </div>
        {#if errorMessage}
          <p class="text-red-500 text-xs italic mb-4">{errorMessage}</p>
        {/if}
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  
  {#if showSuccessModal}
    <div class="modal" on:click={closeModal}>
      <div class="modal-content" on:click|stopPropagation>
        <h3 class="text-2xl font-bold mb-4">Success!</h3>
        <p>You have successfully logged in.</p>
        <a href="/charity/charityprofile" class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={closeModal}>
          next
        </a>
      </div>
    </div>
  {/if}
  