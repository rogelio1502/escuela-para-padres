<script setup>
import NavBar from './components/Header/NavBar.vue'
import Footer from './components/Footer/Footer.vue'
</script>

<template>

  <NavBar></NavBar> 
   <Footer></Footer>

</template>

<script>
import EventBus from "./common/EventBus";
export default {
  
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
};
</script>

<style scoped>

</style>