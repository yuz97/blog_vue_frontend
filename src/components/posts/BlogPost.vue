<template>
   <div class="row">
      <div class="col-md-6">
         <div class="card mb-3" v-for="post in posts.data" :key="post.id">
            <div
               class="card-header d-flex justify-content-between align-items-center">
               <div>{{ post.title }}</div>
               <template v-if="authCheck && user.id == post.user_id">
                  <router-link
                     :to="`/posts/${post.subject.slug}/${post.slug}/edit`"
                     >Edit</router-link
                  >
               </template>
            </div>
            <div class="card-body">
               {{ post.body }}
               <div class="mt-2">
                  <router-link :to="`/posts/${post.subject.slug}/${post.slug}`"
                     >Read more!</router-link
                  >
               </div>
               <div
                  class="my-2 d-flex justify-content-between align-items-center">
                  <div>{{ post.author }}</div>
                  <small class="text-muted">
                     {{ post.published }}
                  </small>
               </div>
            </div>
         </div>
         <div v-if="posts.hasMorePages">
            <button class="btn btn-primary" @click.prevent="loadMore">
               <template v-if="isLoading">Please wait...</template>
               <template v-else> Load more</template>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
   name: "BlogPost",
   props: ["endpoint"],
   data() {
      return {
         posts: [],
         perPage: 5,
         isLoading: true,
      };
   },
   computed: {
      ...mapGetters({
         authCheck: "auth/check",
         user: "auth/user",
      }),
   },
   mounted() {
      this.fetchPosts();
   },

   methods: {
      async fetchPosts() {
         let response = await axios.get(this.endpoint, {
            params: { perPage: this.perPage },
         });
         // this.posts = data.data;
         this.isLoading = false;
         this.posts = response.data;
      },

      loadMore() {
         this.isLoading = true;
         this.perPage += 5;
         this.fetchPosts();
      },
   },
};
</script>

<style></style>
