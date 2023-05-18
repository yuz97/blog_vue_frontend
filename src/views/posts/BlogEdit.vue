<template>
   <div class="container">
      <div class="row">
         <div class="col-md-6">
            <div class="alert alert-success" role="alert" v-if="message">
               {{ message }}
            </div>
            <div class="card">
               <div class="card-header">New Post</div>

               <form method="post" action="#" @submit.prevent="updatePost">
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
                           id="subject"
                           class="form-control"
                           @change="selectedSubject">
                           <!-- <option value="" disabled>Pilih Subject</option> -->
                           <option
                              v-for="subject in subjects"
                              :key="subject.id"
                              :value="subject.id"
                              :selected="subject.id == post.subject.id">
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
                           Update
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
            subject: [],
         },
         subjects: [],
         message: "",
         errors: [],
         selected: "",
      };
   },
   mounted() {
      document.title = "Edit Post";
      this.fetchPost();
      this.fetchSubjects();
   },
   methods: {
      request(key) {
         return this.$route.params[key];
      },

      async fetchPost() {
         let response = await axios.get(
            `api/posts/${this.request("subjectSlug")}/${this.request(
               "postSlug"
            )}`
         );
         this.post = response.data.data;
      },

      selectedSubject(e) {
         this.selected = e.target.value;
      },

      async fetchSubjects() {
         let response = await axios.get("api/posts/subjects");
         this.subjects = response.data;
      },

      async updatePost() {
         try {
            this.post["subject_id"] = this.selected || this.post.subject.id;
            let response = await axios.put(
               `api/posts/${this.request("postSlug")}/edit`,
               this.post
            );
            this.message = response.data.message;
         } catch (e) {
            this.errors = e.response.data.errors;
         }
      },
   },
};
</script>

<style></style>
