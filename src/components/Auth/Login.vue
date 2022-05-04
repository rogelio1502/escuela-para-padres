<template>
  <div class="wrapper">
    <div class="logo"><img src="https://i.imgur.com/Yu1LrTp.png" alt="" /></div>
    <div class="text-center mt-4 name">Escuela Para Padres</div>
    <form @submit.prevent="handleLogin">
      <div class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
          <span></span>
          <input type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="error-feedback"></div>
        <div class="form-field d-flex align-items-center">
          <span></span>
          <input type="password" placeholder="Contraseña" v-model="password" />
        </div>
        <div class="error-feedback"></div>
        <button class="btn mt-3" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span
          >Iniciar Sesión
        </button>
      </div>
      <FormErrors :inputErrors="inputErrors"></FormErrors>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger text-center" role="alert">
          {{ message }}
        </div>
      </div>
    </form>

    <div class="text-center fs-6">
      <a href="#" @click="resetPassword" id="forgot_password"
        >¿Olvidaste tu contraseña?</a
      >
      o
      <router-link id="join_us" to="/register"> Únete</router-link>
    </div>
  </div>
</template>
<script>
import FormErrors from "../dialogs/FormErrors.vue";
import Swal from "sweetalert2";
import authService from "../../services/auth.service";
export default {
  name: "Login",

  data() {
    return {
      loading: false,
      message: "",
      email: "",
      password: "",
      inputErrors: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  // created() {
  //   if (this.loggedIn) {
  //     this.$router.push("/profile");
  //   }
  // },
  methods: {
    async resetPassword() {
      // Swal.fire({
      //   title: "INFO",
      //   text: "¡En mantenimiento!, estamos trabajando en esta nueva funcionalidad por ahora, ¡intentalo más tarde.!",
      // });
      // return;
      await Swal.fire({
        title: "Ingresa tu correo para restaurar la contraseña",
        input: "email",
        inputLabel: "Correo electrónico",
        inputPlaceholder: "Tu correo",
      }).then((response) => {
        if (response.isConfirmed) {
          authService
            .reset_password_login(response.value)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "!Tu contraseña se ha restaurado!",
                text: "Dirigete a tu correo para más información.",
              });
            })
            .catch((err) => {
              switch (err.response.status) {
                case 400:
                  let _err = err.response.data.detail;
                  Swal.fire({
                    icon: "info",
                    title: "!Ups!",
                    text: _err,
                  });
                  break;

                default:
                  break;
              }
            });
        }
      });
    },
    validations() {
      this.inputErrors = [];
      if (this.email.length < 1) {
        this.inputErrors.push("Email es requerido.");
      }
      if (this.password.length < 1) {
        this.inputErrors.push("La contraseña es requerida.");
      }
      if (this.password.length < 7 && this.password.length > 1) {
        this.inputErrors.push("La contraseña es de al menos 7 caracteres.");
      }
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) ==
          false &&
        this.email.length > 1
      ) {
        this.inputErrors.push("Email inválido.");
      }
      if (this.inputErrors.length) {
        return true;
      }
      return false;
    },
    handleLogin() {
      if (this.validations()) {
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("auth/login", { email: this.email, password: this.password })
        .then(
          () => {
            this.$router.push("/home");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            if (this.message.includes("401")) {
              this.message = "Credenciales Inválidas.";
            }
            if (this.message.includes("400")) {
              this.message = "Usuario inhabilitado.";
            }
            if (this.message.includes("500")) {
              this.message = "Error del servidor. Favor de intentar más tarde.";
            }
          }
        );
    },
    print() {
      console.log("Hola mundo");
    },
  },
  watch: {
    email() {
      this.email = this.email.replace(" ", "");
    },
    password() {
      this.password = this.password.replace(" ", "");
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: #f6f9fc;
}

.wrapper {
  max-width: 400px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: white;
  box-shadow: 13px 13px 20px #979797;
}

.logo {
  width: 115px;
  margin: auto;
}

.logo img {
  width: 100%;
  height: 105px;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #555;
}

.wrapper .form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;

  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
}

.wrapper .form-field {
  padding-left: 10px;
  margin-bottom: 20px;

  border-radius: 20px;

  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
  color: #555;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #47aa6c;
  color: #fff;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
  letter-spacing: 1.3px;
}

.wrapper .btn:hover {
  background-color: #ffc300;
}

.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #5dcfe3;
}

.wrapper a:hover {
  color: #ffc300;
}

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}

#forgot_password,
#join_us {
  font-size: 1rem;
  color: blue;
}
</style>
