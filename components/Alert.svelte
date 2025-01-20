<script>
  import { alert } from '../stores.js';
  import { fade } from 'svelte/transition';
  import { $derived } from 'svelte';
  
  // Use $derived with store value
  $derived message = $alert;
</script>

{#if message}
  <div role="alert" 
       transition:fade 
       on:click={() => alert.set('')}>
    <p>{message}</p>
  </div>
{/if} 