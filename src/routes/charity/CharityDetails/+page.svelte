<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Button, Modal } from '@sveltestrap/sveltestrap';
  
  let open = false;
  const toggle = () => (open = !open);
  
  let toast = false;
  import Pic from "$lib/pic.jpeg";
  import { json } from "@sveltejs/kit";
  
  let financialInfo = '';
  let mission = '';
  let projects = '';
  let message = '';
  let paymail = '';
  
  export let form;
  console.log(form);
  
 
  async function addDetails(event) {
    event.preventDefault();
    console.log('csadc', financialInfo, mission, projects);
    
    try {
      const response = await fetch('/charity/CharityDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ financialInfo, paymail,mission, projects }),
      });
      const result = await response.json();
      console.log(result);
      
      if (result) {
        toast = true;
      }
      return json({ status: 'success', data: result });
      
    } catch (error) {
      console.error('Error:', error);
      message = 'An error occurred while submitting the details. Please try again.';
    }
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

<Card.Root>
  {#if toast}
    <div class="modal z-30">
      <div class="modal-content">
        <h3 class="text-2xl font-bold mb-4">Success!</h3>
        <p>Registration completed successfully.</p>
        <a href="/" class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={() => toast = false}>
          Next 
        </a>
      </div>
    </div>
  {/if}

  <Card.Header>
    <Card.Title>User Details</Card.Title>
    <Card.Description>Add details please to proceed</Card.Description>
  </Card.Header>

  <Card.Content class='flex flex-row justify-between'>
    <form class="flex flex-col w-[40%]" on:submit={addDetails}>
      <label for="projects">Projects</label>
      <input id="projects" required bind:value={projects} class="m-2 shadow-sm shadow-black rounded-sm border-[1px] border-black py-[4px] px-[4px]" type="text">

      <label for="mission">Mission</label>
      <input id="mission" required bind:value={mission} class="m-2 shadow-sm shadow-black rounded-sm border-[1px] border-black py-[4px] px-[4px]" type="text">

      <label for="financialInfo">Financial Info</label>
      <input id="financialInfo" required bind:value={financialInfo} class="m-2 shadow-sm shadow-black rounded-sm border-[1px] border-black py-[4px] px-[4px]" type="text">
      <label for="paymail">Paymail</label>
      <input id="paymail" required bind:value={paymail} class="m-2 shadow-sm shadow-black rounded-sm border-[1px] border-black py-[4px] px-[4px]" type="text">
   
      {#if form?.body.paymail}
        {form?.body.paymail}
        {/if}

      {#if message !== ''}
        <p>{message}</p>
      {/if}

      <button class='bg-slate-900 mt-1 text-white px-4 w-24 rounded-lg py-2' type="submit">Add</button>
    </form>

    <div>
      <Button class='underline' color="danger" on:click={toggle}>Don't have paymail?</Button>
      <Modal body header="Modal title" isOpen={open} {toggle}>
        <form method="POST" action="/charity/CharityDetails?/signup">
          <label for="signup-email">Email:</label>
          <input type="text" name="email" id="email" required />

          <label for="signup-password">Password:</label>
          <input type="text" name="password" id="password" required />
          <p>after sign up verifiy your email at your email address</p>
          <Button type='submit' color='success'>Sign up</Button>
        </form>
      </Modal>
    </div>

    <img src={Pic} class="w-[50%] h-96 relative bottom-6 rounded-lg shadow-black shadow-md" alt="">
  </Card.Content>
</Card.Root>
