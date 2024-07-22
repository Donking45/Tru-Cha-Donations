<script>
    import logo from '$lib//favicon.png';
    import chain from '$lib//chain.jpg';
    import jar from '$lib//jar.jpg';
    import jar2 from '$lib//jar2.jpg';
 

</script>



<div class="bg-[#e1e8f0] flex flex-col justify-start items-center  h-[100vh]" >
    <div class="flex font-semibold flex-row justify-between  w-full" >
        <section class="m-3" >
            trueCharity
        </section>
        <section>
            <span>
                <button class='m-3' >
                    contact us
                </button>
                <button class="mr-10" >
                    about us
                </button>
            </span>
        </section>
    </div>
    <div class="w-[70%] p-3 rounded-2xl h-[70vh] justify-between flex flex-row bg-slate-100 mt-12 " >
        <div class="w-[40%] p-4" >
            <h1 class="mt-12 font-bold text-2xl" >
                Secure Blockchain Donations
            </h1>
            <p>
                Transform your giving experience with our blockchain donation app. Ensure transparency, security, and impact with every contribution.
            </p>
           <section class="flex  flex-row  md:mt-24 gap-5" >
            <a href="/auth/login"
            class="cursor-pointer shadow-md shadow-black [border:none] py-[6px] px-[12px] text-white bg-slate-900 rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100"
            id="button"
          >Login</a>
          <a href="/auth/register"
            class="cursor-pointer shadow-md shadow-black py-[6px] px-[12px] text-slate-900 bg-white border-slate-900 border-[1px] rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100"
            id="button"
          >Sign up</a>
           </section>
        </div>
        <img src={jar} alt="" class='w-[50%] shadow-sm shadow-black rounded-2xl ' >
      
    </div>
</div>