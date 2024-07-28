<!-- <script lang="ts">
  import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, TabContent, TabPane } from '@sveltestrap/sveltestrap';
  export let form;

  
  let open = false;
  let size: 'xl' | undefined;

  const toggleXl = () => {
    size = 'xl';
    open = !open;
  };

  const toggle = () => {
    size = undefined;
    open = !open;
  };
</script>

<div>
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
</div> -->
