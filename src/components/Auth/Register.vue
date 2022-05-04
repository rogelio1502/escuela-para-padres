<template>
  <div id="main-wrapper" class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10">
        <div class="card border-0">
          <div class="card-body p-0">
            <div class="row no-gutters">
              <div class="col-lg-6 border solid">
                <div class="p-5">
                  <div class="mb-5">
                    <h3 class="h4 font-weight-bold text-theme">Regístrate</h3>
                  </div>
                  <h6 class="h5 mb-0">Bienvenido!</h6>
                  <p class="text-muted mt-2 mb-5">
                    Regístrate con un correo electrónico y accede al contenido
                    gratuito.
                  </p>
                  <form @submit.prevent="handleRegister">
                    <div class="form-group">
                      <label for="email">Correo Electrónico</label>
                      <input
                        name="email"
                        type="email"
                        class="form-control"
                        v-model="email"
                      />
                    </div>
                    <div class="form-group mb-5">
                      <label for="password">Contraseña</label>
                      <input
                        name="password"
                        type="password"
                        class="form-control"
                        v-model="password"
                      />
                    </div>
                    <!-- <button type="submit" class="btn btn-theme">Registrarse</button> -->
                    <div class="form-group">
                      <button
                        class="btn btn-primary btn-block"
                        :disabled="loading"
                      >
                        <span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        Regístrate
                      </button>
                    </div>
                    <FormErrors :inputErrors="inputErrors"></FormErrors>
                  </form>

                  <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>

              <div class="col-lg-6 d-none d-lg-inline-block">
                <div class="account-block rounded-right">
                  <div class="overlay rounded-right"></div>
                  <div class="account-testimonial">
                    <h4 class="text-white mb-4">
                      Llegar juntos es el principio
                    </h4>
                    <p class="lead text-white">
                      "Tus sueños no tienen fecha de caducidad, respira hondo y
                      sigue."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <p class="text-muted text-center mt-3 mb-0">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="text-primary ml-1"
            >Ingresa</router-link
          >
        </p>

        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- Row -->
  </div>
</template>
<script>
import FormErrors from "../dialogs/FormErrors.vue";

export default {
  name: "Register",

  data() {
    return {
      successful: false,
      loading: false,
      message: "",
      inputErrors: [],
      email: "",
      password: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
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
    handleRegister() {
      if (this.validations()) {
        return;
      }
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store
        .dispatch("auth/register", {
          email: this.email,
          password: this.password,
        })
        .then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
            (this.email = ""), (this.password = "");
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
            if (this.message.includes("400")) {
              this.message = "Correo electrónico ya ha sido registrado.";
            }
            if (this.message.includes("500")) {
              this.message = "Error del servidor. Favor de intentar más tarde.";
            }
          }
        );
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
body {
  margin-top: 20px;
  background: #f6f9fc;
}

.container {
  margin-top: 20px;
  margin-bottom: 35px;
}
.account-block {
  padding: 0;
  background-image: url("https://i.imgur.com/As5tEjr.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: relative;
}
.account-block .overlay {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.account-block .account-testimonial {
  text-align: center;
  color: #fff;
  position: absolute;
  margin: 0 auto;
  padding: 0 1.75rem;
  bottom: 3rem;
  left: 0;
  right: 0;
}

.text-theme {
  color: #5369f8 !important;
}

.btn-theme {
  background-color: #5369f8;
  border-color: #5369f8;
  color: #fff;
}
</style>
