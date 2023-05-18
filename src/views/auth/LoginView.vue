<template>
   <div class="container">
      <div class="row d-flex justify-content-center">
         <div class="col-md-6">
            <div class="card">
               <div class="card-header">Login</div>
               <div class="card-body">
                  <form action="" method="post" @submit.prevent="storeLogin">
                     <div class="form-group">
                        <label for="email">Email</label>
                        <input
                           type="text"
                           class="form-control"
                           v-model="form.email"
                           id="email" />
                     </div>
                     <div class="form-group">
                        <label for="password">Password</label>
                        <input
                           type="password"
                           class="form-control"
                           v-model="form.password"
                           id="password" />
                     </div>
                     <button class="btn btn-primary">submit</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
   data() {
      return {
         form: {
            email: "",
            password: "",
         },
      };
   },
   methods: {
      ...mapActions({
         login: "auth/loginCheck",
      }),
      async storeLogin() {
         await this.login(this.form);
         this.$router.replace({ name: "home" });
      },
   },
   mounted() {
      document.title = "Login";
   },
};
</script>

<style></style>
