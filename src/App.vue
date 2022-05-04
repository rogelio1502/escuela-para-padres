<script setup>
import NavBar from "./components/Header/NavBar.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <div class="messenger-icon">
    <a
      href="https://www.messenger.com/t/17849101049710876"
      target="_blank"
      title="Enviar Mensaje"
      ><i class="bi bi-messenger"></i
    ></a>
  </div>
  <NavBar></NavBar>
  <Footer></Footer>
</template>

<script>
import EventBus from "./common/EventBus";
export default {
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove("logout");
  },
};
</script>

<style>
.messenger-icon {
  position: fixed;
  z-index: 100;
  bottom: 0px;
  right: 0px;
}
.messenger-icon a {
  font-size: 50px;
}
.messenger-icon a :hover {
  font-size: 75px;
  transition: 1s;
}
</style>
