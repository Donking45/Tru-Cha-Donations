<script  >
// @ts-nocheck

    


import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Offcanvas
  } from '@sveltestrap/sveltestrap';

  let isOpen = false;
  
const toggle = () => {
  isOpen = !isOpen;
};




export let data;
  

const {info} = data;
import { writable } from 'svelte/store';

const Data = writable([]);
Data.set(info);
</script>


<ButtonGroup>
  <Button color="dark" on:click={toggleXl}>Create wallet</Button>
</ButtonGroup>


<Modal isOpen={open} toggle={toggle} size={size}>
  <ModalHeader toggle={toggle}>Neucron Wallet</ModalHeader>
  <ModalBody>
      
        <h2 class="text-content">Sign up</h2>
        <form method="POST" action="/userprofile/wallet?/signup">
          <label for="signup-email">Email:</label>
          <input type="text" name="email" id="email" required />

          <label for="signup-password">Password:</label>
          <input type="text" name="password" id="password" required />
          
          <Button type='submit' color='success'>Sign up</Button>
        </form>
  </ModalBody>
  <ModalFooter></ModalFooter>
</Modal>
</div>



<h1>Donations</h1>
  <div  class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4" >
   {#each $Data as donor}

  <Card body theme='dark' inverse>
    <CardHeader>
      <CardTitle>Txid: {donor.id}</CardTitle>
    </CardHeader>
    <CardBody>
      <h5>amount : {donor.amount}</h5>
      <a href="https://whatsonchain.com/tx/{donor.id}">click here to see</a>
      <Button href=''>upload proof</Button>

    </CardBody>
  </Card> 
  {/each} 
  </div>