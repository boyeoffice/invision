<template>
 <header class="main-header">
   <router-link to="/" class="logo">
     <span class="logo-mini"><b>IVN</b></span>
     <span class="logo-lg"><b>INVISION</b></span>
   </router-link>
   <nav class="navbar navbar-static-top">
     <a v-on:click="handleSidebarToggle" href="javascript:void(0)" class="sidebar-toggle" data-toggle="offcanvas" role="button">
       <span class="sr-only">Toggle navigation</span>
     </a>
   </nav>
 </header>
</template>

<script>
  export default{
    data(){
      return{
        sidebarClick: true,
        showNav: false
      }
    },
    methods:{
      Signout(){
        this.$emit('sign-out')
      },
      handleSidebarToggle(){
        if(this.sidebarClick)
          this.sidebarClick = false
        document.body.classList.toggle('sidebar-collapse')
        this.sidebarClick = true
      }
    }
  }
</script>