<template>
  <div class="background-false"></div>
</template>

<script>
import authService from "../services/auth.service";
import Swal from "sweetalert2";
export default {
  data() {
    return {};
  },
  mounted() {
    if (this.currentUserEmail) {
      this.$router.push("/home");
      return;
    }
    authService
      .activateCount(this.$route.params.email, this.$route.params.code)
      .then((response) => {
        if (response.data.message == "ok") {
          Swal.fire({
            title: "Felicidades!",
            text: "¡Tu cuenta ha sido activada correctamente!",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: true,
            showConfirmButton: "Iniciar Sesión",
          }).then((response) => {
            if (response.isConfirmed) {
              this.$router.push("/login");
            }
          });
        } else if (response.data.message == "before_ok") {
          this.$router.push("/login");
        }
      })
      .catch((err) => {
        console.log("error al activar", err);
        Swal.fire({
          title: "Ups!",
          text: "¡Hubo un error al activar la cuenta, intenta más tarde!",
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: true,
          showConfirmButton: "OK",
        }).then((response) => {
          if (response.isConfirmed) {
            this.$router.push("/login");
          }
        });
      });
  },
  computed: {
    currentUserEmail() {
      try {
        return this.$store.state.auth.user.email;
      } catch {
        return null;
      }
    },
  },
};
</script>

<style scoped>
.background-false {
  height: 35vh;
}
</style>
