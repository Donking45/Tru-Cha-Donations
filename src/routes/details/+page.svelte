<script>
      import * as Card from "$lib/components/ui/card";
    
let toast = false;
 import Pic from "$lib/pic.jpeg";
  import { json } from "@sveltejs/kit";
        let employment = ''
        let salary = ''
         let DOB = ''
         let address = ''
         let phoneNumber = '';
        let message = '';


      async function addDetails(event){
        event.preventDefault();
        console.log('csadc',employment,salary,DOB,address,phoneNumber)
        
        try {
          const data = await fetch('/details',{
            method: 'POST',
             headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ employment,salary, DOB, address,phoneNumber})
    },
)
        const result = await data.json();
        console.log(result);
        if(result){
          toast = true;
        }
        return json({status:'success',data:result});
      
        } catch (error) {
          console.log(error); 
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
        <a href="/" class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={() => showSuccessModal = false}>
          Next 
        </a>
      </div>
    </div>
    {/if}
    <Card.Header>
      <Card.Title>User Details</Card.Title>
      <Card.Description>Add details please to proceed</Card.Description>
    </Card.Header>
    <Card.Content class='flex flex-row justify-between' >
      <form class="flex flex-col w-[40%]" on:submit={addDetails} >
        <label for="">Phone number</label>
        <input bind:value={phoneNumber} class="m-2  shadow-sm shadow-black rounded-sm border-[1px] border-black py-[4px] px-[4px]" type="text">

        <label for="">Date of birth</label>
        <input bind:value={DOB} class="m-2 shadow-sm shadow-black rounded-sm  border-[1px] border-black py-[4px] px-[4px]"type="date">

        <label for="">Salary</label>
        <input bind:value={salary} class="m-2 shadow-sm shadow-black rounded-sm  border-[1px] border-black py-[4px] px-[4px]" type="text">

        <label for="">Employment Status</label>
        <input bind:value={employment} class="m-2 shadow-sm shadow-black rounded-sm  border-[1px] border-black py-[4px] px-[4px]" type="text">

        <label for="">address</label>
        <input bind:value={address} class="m-2 shadow-sm shadow-black rounded-sm  border-[1px] border-black py-[4px] px-[4px]" type="text">
        {#if message!== ''}
          <p>{message}</p>
        {/if}
        <button class='bg-slate-900 mt-1 text-white px-4 w-24 rounded-lg py-2' type="submit" >Add</button>
    </form>
    <img src={Pic} class=" w-[50%] h-96  relative bottom-6 rounded-lg shadow-black shadow-md" alt="">
    </Card.Content>
   
  </Card.Root>

