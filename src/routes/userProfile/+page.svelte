<script lang="ts">
	import { writable } from 'svelte/store';
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
  import { onMount } from 'svelte';

  let charities = writable([]);
  let users = writable([]);
  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
  };

  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      });

      const result = await response.json();

      if (response.status !== 200) {
        alert('Logout error: ' + result.message);
      } else {
        alert('Logout successful');
        users.set([]); // Clear the users store
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout error');
    }
  };

  const getCharity = async () => {
    const data = await fetch('/charity/getcharity');
    if (!data.ok) {
      alert('Error');
    }
    const response = await data.json();
    charities.set(response);
  };

  const fetchUserData = async () => {
    const response = await fetch('/auth/users');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const result = await response.json();
    if (result.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
      users.set([result.data]);
    }
  };
  
 
  onMount(async () => {
    await getCharity();
    try {
      await fetchUserData();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
</script>

<Button class='relative left-[88%]' color="dark" on:click={toggle}>Show User Details</Button>
<div>
  <h1>Charities</h1>
  <div  class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4" >
  {#each $charities as charity}

  <Card body theme='dark' inverse>
    <CardHeader>
      <CardTitle>{charity.name}</CardTitle>
    </CardHeader>
    <CardBody>
      <Button href='/charity/{charity.id}'>Show Details</Button>
    </CardBody>
  </Card>
  {/each}
  </div>
</div>

<Offcanvas theme='dark' placement='end' header="User Details" {isOpen} {toggle}>
<div>
    {#each $users as user}
    <div>
      <h2>Name: {user.name}</h2>
      <span>Address: <p>{user.address}</p></span>
      <span>Phone Number: <p>{user.phoneNumber}</p></span>
      <span>Salary: <p>{user.salary}</p></span>
      <span>Employment: <p>{user.employment}</p></span>
      <span>Verification: <p>{user.emailVerified}</p></span>
      <span class="block" >DOB: {user.dateOfBirth.substring(0, 10)}</span>
     
      <strong class="block mt-7 font-medium">

        {#each $users as user}
          <h2 class="over-flow:hidden">{user.email}</h2>
        {/each}
      </strong>
      <Button color='success' on:click={logout} class="mt-2 block border-t">
        Logout
      </Button>

    </div>
    {/each}
  </div>
</Offcanvas>
  