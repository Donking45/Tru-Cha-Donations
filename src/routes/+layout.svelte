<script>
       import '../app.css';

       import { Styles } from '@sveltestrap/sveltestrap';
       import Nav from '../lib/components/nav.svelte';
</script>
<style>
       @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
     </style>

     
     <Styles />

<Nav/>
<slot></slot>