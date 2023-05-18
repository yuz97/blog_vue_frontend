import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
   {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
   },
   {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
   },
   {
      path: "/posts",
      name: "posts.index",
      component: () => import("@/views/posts/BlogIndex.vue"),
   },

   {
      path: "/posts/create",
      name: "posts.create",
      component: () => import("@/views/posts/BlogPost.vue"),
      //melindungi halaman saat tidak login
      meta: {
         auth: "true",
      },
   },
   {
      path: "/posts/:subjectSlug/:postSlug/edit",
      name: "posts.edit",
      component: () => import("@/views/posts/BlogEdit.vue"),
      meta: {
         auth: "true",
      },
   },
   {
      path: "/posts/subjects/:subjectSlug",
      name: "posts/subjects/show",
      component: () => import("@/views/subject/SubjectShow.vue"),
   },

   {
      path: "/posts/:subjectSlug/:postSlug",
      name: "posts.show",
      component: () => import("@/views/posts/BlogShow.vue"),
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   linkActiveClass: "active",
   routes,
});

router.beforeEach((to, from, next) => {
   if (to.meta.auth && !store.getters["auth/check"]) {
      next({ name: "login" });
   } else {
      next();
   }

   //jika sudah login lanjut ke home jika belum redirect ke halaman login
   if (to.name == "login" && store.getters["auth/check"]) {
      next({ name: "home" });
   } else {
      next();
   }
});

export default router;
