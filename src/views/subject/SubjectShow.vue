<template>
   <div class="container">
      <h4>{{ subject.title }}</h4>
      <hr />
      <blog-post
         :endpoint="`api/posts/subjects/${$route.params.subjectSlug}`" />
   </div>
</template>

<script>
import BlogPost from "@/components/posts/BlogPost.vue";
import axios from "axios";
export default {
   components: { BlogPost },
   data() {
      return {
         subject: [],
      };
   },
   mounted() {
      this.fetchSubject();
   },

   methods: {
      async fetchSubject() {
         let response = await axios.get(
            `api/posts/subjects/${this.$route.params.subjectSlug}`
         );
         // console.log(response);
         this.subject = response.data.subject;
      },
   },
};
</script>

<style></style>
