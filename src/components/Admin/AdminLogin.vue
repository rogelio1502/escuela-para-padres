<template>
  <div class="wrapper">
    <div class="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-file-lock"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z"
        />
        <path
          d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
        />
      </svg>
    </div>

    <div class="text-center mt-4 mb-4 name">Administrador</div>
    <Form @submit="handleLogin" :validation-schema="schema">
      <div class="form-group">
        <Field
          name="email"
          type="email"
          class="form-control"
          placeholder="Correo"
        />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <Field
          name="password"
          type="password"
          class="form-control"
          placeholder="Contraseña"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>Entrar</span>
        </button>
      </div>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().email().required("Email es requerido."),
      password: yup.string().required("Password es requerida."),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/adminlogin", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message &&
              error.response.data.detail) ||
            error.message ||
            error.toString();
          console.log(this.message, "1");
          if (this.message.includes("401")) {
            this.message = "Credenciales Inválidas.";
          }
          if (this.message.includes("Inhabilitado")) {
            this.message = "Usuario inhabilitado.";
          }
          if (this.message.includes("500")) {
            this.message = "Error del servidor. Favor de intentar más tarde.";
          }
        }
      );
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
  max-width: 350px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: white;
  box-shadow: 13px 13px 20px #979797;
}

.logo svg {
  width: 120px;
  height: 100px;
  margin: auto;
}

.logo svg {
  width: 100%;
  height: 105px;
  color: #4682b4;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #555;
}

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}
</style>
