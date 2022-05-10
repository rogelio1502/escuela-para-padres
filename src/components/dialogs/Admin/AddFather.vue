<template>
  <BaseModal
    title="Añadir Padre"
    :saveMethod="save"
    :wait_for_validation="true"
    :form_modal="true"
    :cancelMethod="cancel"
  >
    <div class="form-group">
      <label for="email"> Email </label>
      <input
        v-model="email"
        type="email"
        name="email"
        class="form-control"
        placeholder="Email"
        required
      />

      <label for="password"> Password </label>
      <input
        v-model="password"
        class="form-control"
        type="password"
        name="password"
        placeholder="Password"
        required
        maxlength="20"
      />

      <label for="password2"> Confirmación </label>
      <input
        v-model="password2"
        class="form-control"
        type="password"
        name="password2"
        placeholder="Confirmar Password"
        required
        maxlength="20"
      />

      <br />

      <FormErrors :inputErrors="inputErrors"> </FormErrors>
    </div>
  </BaseModal>
</template>

<script>
import Swal from "sweetalert2";
import adminService from "../../../services/admin.service";
import $ from "jquery";
export default {
  emits: ["making_action"],
  props: {
    reload: Function,
  },
  data() {
    return {
      inputErrors: [],
      email: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    validations() {
      this.inputErrors = [];
      if (this.email.trim().length < 6) {
        this.inputErrors.push("La longitud minima de un correo es de 6.");
      }
      if (this.email.trim().length > 100) {
        this.inputErrors.push(
          "La longitud máxima aceptada para un correo es de 100."
        );
      }
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) ==
        false
      ) {
        this.inputErrors.push("Email inválido.");
      }

      if (this.password.trim().length < 7) {
        this.inputErrors.push(
          "La longitud de la contraseña debe ser mayor a 7."
        );
      }
      if (this.password.trim().length > 40) {
        this.inputErrors.push(
          "La longitud de la contraseña debe ser menor a 40."
        );
      }
      if (this.password != this.password2) {
        this.inputErrors.push("Las contraseñas no coinciden.");
      }
      if (this.inputErrors.length) {
        this.$emit("making_action", false);

        return true;
      }
    },
    save() {
      this.$emit("making_action", true);
      if (this.validations()) {
        return;
      }
      adminService
        .registerFather(this.email, this.password, this.currentUserEmail)
        .then((response) => {
          this.$emit("making_action", false);

          Swal.fire({
            icon: "success",
            allowOutsideClick: false,
            title: "Tarea Completada!",
            text: "Has registrado correctamente al usuario padre.",
          }).then((response) => {
            $("#addFatherModal").modal("hide");
            this.reload();
            this.clear();
          });
        })
        .catch((err) => {
          let errorMsg = "Ha habido un error al registrar al usuario padre.";
          if (err.response.data.detail) {
            //console.log("Error");
            if (err.response.status == 400 || err.response.status == 404) {
              errorMsg = err.response.data.detail;
              if (errorMsg == "Duplicate Entry") {
                errorMsg = "Ya existe un usuario con este email.";
              }
            } else if (err.response.status == 422) {
              errorMsg = err.response.data.detail[0].msg;
            }
          }
          this.$emit("making_action", false);

          Swal.fire({
            icon: "error",
            allowOutsideClick: false,
            title: "Ups!",
            text: errorMsg,
          });
        });
    },
    cancel() {
      this.clear();
    },
    clear() {
      this.inputErrors = [];
      this.email = "";
      this.password = "";
      this.password2 = "";
    },
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
  watch: {
    email() {
      this.email = this.email.replace(" ", "");
    },
    password() {
      this.password = this.password.replace(" ", "");
    },
    password2() {
      this.password2 = this.password2.replace(" ", "");
    },
  },
};
</script>
<style scoped></style>
