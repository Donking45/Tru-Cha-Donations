<script lang="ts" >
  import cookies from 'js-cookie';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  
  let token = '';
  let data123 = '';

  // Retrieve the token on mount
  onMount(() => {
      data123 = cookies.get('token') || '';
      console.log(data123); // Ensure token is always a string
  });
</script>

<style>
  .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: bold;
      background-color: #e1e8f0;
  }

  .links {
      display: flex;
      align-items: center;
  }

  .links a,
  .links button {
      margin-right: 1rem;
  }
</style>

<div class="header">
  <section class="m-3">
      <a href="/">TrueCharity</a>
  </section>

  <section class="links">
      <span>
          {#if data123}
              <a href="/userprofile">Donate</a>
          {/if}
          <button class='m-3'>Contact Us</button>
          <button class="mr-10">About Us</button>
      </span>
     
  </section>

 
</div>
