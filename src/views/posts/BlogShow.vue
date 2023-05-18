<template>
   <div class="container">
      <div class="row">
         <div class="col-md-8">
            <h4>{{ post.title }}</h4>
            <div class="text-secondary">
               <router-link :to="`/posts/subjects/${post.subject.slug}`">
                  {{ post.subject.title }}</router-link
               >
               &middot; {{ post.published }} by {{ post.author }}
            </div>

            <hr />
            <div class="mt-2">{{ post.body }}</div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";

export default {
   data() {
      return {
         post: {
            subject: [],
         },
      };
   },
   mounted() {
      this.fetchPosts();
   },
   methods: {
      request(key) {
         return this.$route.params[key];
      },

      async fetchPosts() {
         let res = await axios.get(
            `api/posts/${this.request("subjectSlug")}/${this.request(
               "postSlug"
            )}`
         );
         this.post = res.data.data;
      },
   },
};
</script>

<style></style>
