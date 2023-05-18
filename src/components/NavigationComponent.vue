<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
         >Blog</router-link
      >
      <button
         class="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav mr-auto">
            <li class="nav-item">
               <router-link exact class="nav-link" :to="{ name: 'home' }"
                  >Home <span class="sr-only">(current)</span></router-link
               >
            </li>
            <li class="nav-item">
               <router-link class="nav-link" :to="{ name: 'posts.index' }"
                  >Posts</router-link
               >
            </li>
         </ul>
         <template v-if="!authCheck">
            <ul class="navbar-nav">
               <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'login' }"
                     >Login</router-link
                  >
               </li>
               <li class="nav-item dropdown">
                  <a
                     class="nav-link dropdown-toggle"
                     href="#"
                     role="button"
                     data-toggle="dropdown"
                     aria-expanded="false">
                     Dropdown
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                     <a class="dropdown-item" href="#">Action</a>
                     <a class="dropdown-item" href="#">Another action</a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="#">Something else here</a>
                  </div>
               </li>
            </ul>
         </template>
         <template v-else>
            <ul class="navbar-nav">
               <li class="nav-item dropdown">
                  <router-link
                     class="nav-link dropdown-toggle"
                     to=""
                     role="button"
                     data-toggle="dropdown"
                     aria-expanded="false">
                     {{ user.name }}
                  </router-link>
                  <div class="dropdown-menu dropdown-menu-right">
                     <router-link
                        class="dropdown-item"
                        :to="{ name: 'posts.create' }"
                        >Create Post</router-link
                     >

                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="#" to="" @click="logout"
                        >Logout</a
                     >
                  </div>
               </li>
            </ul>
         </template>
      </div>
   </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
   name: "NavigationComponent",
   computed: {
      ...mapGetters({
         authCheck: "auth/check",
         user: "auth/user",
      }),
   },

   methods: {
      ...mapActions({
         signOutAction: "auth/signOut",
      }),
      async logout() {
         await this.signOutAction();
         this.$router.replace("/login");
      },
   },
};
</script>

<style></style>
