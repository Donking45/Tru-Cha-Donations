<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
  
    // Create a writable store for users
    let users = writable([]);
  
    onMount(async () => {
      try {
        const response = await fetch('/auth/users');
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const result = await response.json();
        console.log('Fetched result:', result);
  
        // If result.data is an object, convert it into an array
        if (result.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
          users.update(currentUsers => [...currentUsers, result.data]);
        } else {
          throw new Error('Fetched data is not an object');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error as needed
      }
    });
  </script>
  <style>
    p {
        display: inline;
        font-weight: 400;
    }
  </style>
  <div class="flex shadow-md shadow-black ml-auto border-l-[.5px] border-black h-screen w-[25%] flex-col justify-between border-e bg-white">
    <div class="  h-full ">
      <div class="px-6 gap-4 font-medium text-sm text-slate-950 flex flex-col items-start justify-between py-6  " >
       <h1 class="text-xl text-red-800" >User detail</h1>
        {#each $users as user}
          <h2>Name:{user.name}</h2>
          <span>Address: <p>{user.address}</p></span>
          <span>Phone Number: <p>{user.phoneNumber}</p></span>
          <span>Salary: <p>{user.salary}</p></span>
          <span>Employment: <p>{user.employment}</p></span>
          <span>Verification: <p>{user.emailVerified  }</p></span>
          <span>DOB: {user.dateOfBirth.substring(0,10)}</span>
        {/each}
      </div>
      <div class='flex flex-col gap-2'>
        <button class="mb-5 border-t">
          Logout
        </button>
        <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt="Profile Picture"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              class="size-10 rounded-full object-cover"
            />
  
            <div>
              <p class="text-xs">
                <strong class="block font-medium">
                    {#each $users as user}
          <h2 class="over-flow:hidden" >{user.email}</h2>
          
          
        {/each}
                </strong>
                
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  