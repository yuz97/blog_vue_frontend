<template>
   <div class="container">
      <div class="row">
         <div class="col-md-6">
            <div class="alert alert-success" role="alert" v-if="message">
               {{ message }}
            </div>
            <div class="card">
               <div class="card-header">New Post</div>

               <form method="post" action="#" @submit.prevent="createPost">
                  <div class="card-body">
                     <div class="form-group">
                        <label for="title">title</label>
                        <input
                           id="title"
                           type="text"
                           class="form-control"
                           v-model="post.title" />
                        <div class="text-danger" v-if="errors.title">
                           {{ errors.title[0] }}
                        </div>
                     </div>

                     <div class="form-group">
                        <label for="subject">subject</label>
                        <select
                           v-model="post.subject_id"
                           id="subject"
                           class="form-control">
                           <option value="" disabled>Pilih Subject</option>
                           <option
                              v-for="subject in subjects"
                              :key="subject.id"
                              :value="subject.id">
                              {{ subject.title }}
                           </option>
                        </select>
                        <div class="text-danger" v-if="errors.subject_id">
                           {{ errors.subject_id[0] }}
                        </div>
                     </div>

                     <div class="form-group">
                        <label for="body">body</label>
                        <textarea
                           id="body"
                           v-model="post.body"
                           rows="5"
                           placeholder="write your story here...."
                           class="form-control"></textarea>
                        <div class="text-danger" v-if="errors.body">
                           {{ errors.body[0] }}
                        </div>
                     </div>
                     <div class="pb-3">
                        <button class="btn btn-primary" type="submit">
                           Create
                        </button>
                     </div>
                  </div>
               </form>
            </div>
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
            title: "",
            body: "",
            subject_id: "",
         },
         subjects: [],
         message: "",
         errors: [],
      };
   },
   mounted() {
      document.title = "Create Post";
      this.fetchSubject();
   },
   methods: {
      async createPost() {
         try {
            let response = await axios.post("api/posts/create", this.post);
            this.message = response.data.message;
            this.errors = [];
            this.post.title = "";
            this.post.body = "";
            this.post.subject_id = "";
         } catch (e) {
            this.errors = e.response.data.errors;
         }
      },

      async fetchSubject() {
         let response = await axios.get("api/posts/subjects");
         this.subjects = response.data;
      },
   },
};
</script>

<style></style>
