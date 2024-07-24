<script>
    import logo from '$lib//favicon.png';
    import chain from '$lib//chain.jpg';
    import jar from '$lib//jar.jpg';
    import jar2 from '$lib//jar2.jpg';
 
    import cookies from 'js-cookie';
    import { onMount } from 'svelte';
  
    let token = '';
   
  
    // Retrieve the token on mount
    onMount(() => {
      token = cookies.get('token') || '';
      
    });
</script>
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</svelte:head>



<div class="bg-[#e1e8f0] flex flex-col justify-start items-center  h-[100vh]" >
    
    <div class="w-[70%] p-3 rounded-2xl h-[70vh] justify-between flex flex-row bg-slate-100 mt-12 " >
        <div class="w-[40%] p-4" >
            <h1 class="mt-12 font-bold text-2xl" >
                Secure Blockchain Donations
            </h1>
            <p>
                Transform your giving experience with our blockchain donation app. Ensure transparency, security, and impact with every contribution.
            </p>
           <section class="flex  flex-row  md:mt-24 gap-5" >
           {#if !token}
           <a href="/auth/login"
           class="cursor-pointer shadow-md shadow-black [border:none] py-[6px] px-[12px] text-white bg-slate-900 rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100"
           id="button"
         >Login</a>
         <a href="/auth/register"
         class="cursor-pointer shadow-md shadow-black py-[6px] px-[12px] text-slate-900 bg-white border-slate-900 border-[1px] rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100"
         id="button"
       >Sign up</a>
       <a href="/charity" class="" >Login as Charity</a>
         {/if}

         {#if token}
            <a href="/userprofile" class="cursor-pointer shadow-md shadow-black [border:none] py-[6px] px-[12px] text-white bg-slate-900 rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100">donate</a>
         {/if}


         

           </section>
        </div>
        <img src={jar} alt="" class='w-[50%] shadow-sm shadow-black rounded-2xl ' >
      
    </div>
</div>