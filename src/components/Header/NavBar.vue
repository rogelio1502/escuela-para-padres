<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <a href="/">
      <img src="https://i.imgur.com/jDUatIo.png" height="25" width="30" />
    </a>
    <a href="/" class="navbar-brand" style="color: white"
      >Escuela Para Padres</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" style="color: white"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="navbar-nav mr-auto">
        <NavLink
          to="home"
          icon="bi bi-house-fill"
          title="Home"
          v-if="currentUser"
        ></NavLink>
        <!-- <NavLink
          to="users"
          icon="bi bi-people"
          title="Usuarios"
          v-if="currentUser && adminUser"
        ></NavLink> -->
        <NavLink
          to="courses"
          icon="bi bi-book"
          title="Cursos"
          v-if="currentUser"
        ></NavLink>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <NavLink
          to="register"
          icon="bi bi-person-plus"
          title="Registrate"
        ></NavLink>

        <NavLink
          to="login"
          icon="bi bi-box-arrow-in-right"
          title="Iniciar Sesión"
        ></NavLink>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto">
        <NavLink
          v-if="currentUser && adminUser"
          to="portal_admin"
          icon="bi bi-binoculars"
          title="Admin"
        ></NavLink>

        <NavLink
          to="perfil"
          icon="bi bi-person-circle"
          :title="currentUser.email"
        ></NavLink>

        <li class="nav-item" id="logout">
          <router-link
            class="nav-link"
            @click.prevent="logOut"
            to="/login"
            style="color: white"
          >
            <i class="bi bi-box-arrow-left"></i> Cerrar Sesión
          </router-link>
        </li>
      </div>
    </div>
  </nav>

  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    adminUser() {
      return true ? this.$store.state.auth.user.role === "admin" : false;
    },
    role() {
      return this.$store.state.auth.user.role;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.resolve({ name: "login" });
    },
  },
};
</script>

<style scoped>
#logout :hover {
  cursor: pointer;
}

/* .navbar{
  background-color: #98DDCA;
} */

.navbar {
  background: #183661;
}
</style>
