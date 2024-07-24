<script lang="ts">
    import { TabContent, TabPane } from '@sveltestrap/sveltestrap';
    import RegisterComp from '../charity/register-charity/+page.svelte';
    import Login from '../charity/login-charity/+page.svelte';
  </script>
  
  <TabContent>
    <TabPane tabId="alpha" tab="Login" active>
      <h2 class="text-content">Login</h2>
      
      <Login/>
    </TabPane>
    <TabPane tabId="bravo" tab="register">
        <h2 class="text-content">Register</h2>
        
        <RegisterComp/>
    </TabPane>
    
  </TabContent>