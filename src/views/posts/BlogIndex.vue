<template>
   <div class="container">
      <h4>All Post</h4>
      <hr />
      <blog-post endpoint="api/posts" />
   </div>
</template>

<script>
import BlogPost from "@/components/posts/BlogPost.vue";
export default {
   components: { BlogPost },
};
</script>

<style></style>
