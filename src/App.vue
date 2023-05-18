<template>
   <div>
      <navigation-component />
      <div class="py-4">
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent.vue";
export default {
   components: { NavigationComponent },
};
</script>
