<template>
  <BaseModal
    title="Cambiar Contraseña"
    :saveMethod="save"
    :wait_for_validation="true"
    :form_modal="true"
    :cancelMethod="cancel"
  >
    <div class="form-group">
      <label for="password"> Nueva Contraseña </label>
      <input
        v-model="password"
        class="form-control"
        type="password"
        name="password"
        required
        maxlength="20"
      />

      <label for="password2"> Confirmar Nueva Contraseña </label>
      <input
        v-model="password2"
        class="form-control"
        type="password"
        name="password2"
        required
        maxlength="20"
      />

      <br />

      <FormErrors :inputErrors="inputErrors"> </FormErrors>
    </div>
  </BaseModal>
</template>

<script>
import userService from "../../../services/user.service";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  emits: ["making_action"],
  props: {
    reload: Function,
  },
  data() {
    return {
      inputErrors: [],
      password2: "",
      password: "",
    };
  },
  methods: {
    validations() {
      this.inputErrors = [];
      if (this.password.length < 7) {
        this.inputErrors.push(
          "La longitud de la contraseña debe ser mayor igual a 7."
        );
      }
      if (this.password.length > 20) {
        this.inputErrors.push(
          "La longitud de la contraseña debe ser menor igual a 20."
        );
      }
      if (this.password2 !== this.password) {
        this.inputErrors.push("Las contaseñas no coinciden.");
      }
      if (this.inputErrors.length) {
        return true;
      }
    },
    save() {
      this.$emit("making_action", true);

      if (this.validations()) {
        this.$emit("making_action", false);
        return;
      }
      $("#resetPasswordModal").modal("hide");
      userService
        .resetPassword(this.currentUserEmail, this.password)
        .then((response) => {
          this.$emit("making_action", false);
          this.clear();
          Swal.fire({
            icon: "success",
            title: "¡Completado!",
            text: "Tu contraseña se ha reestablecido correctamente!",
            showConfirmButton: "OK",
          });
        })
        .catch((err) => {
          this.$emit("making_action", false);
          let errorMsg = "Error al intentar restablecer la contraseña!";
          if (err.response.status == 422) {
            errorMsg = err.response.data.detail[0].msg;
            if (errorMsg.includes("at most")) {
              errorMsg =
                "Longitud de contraseña no válida! (Máximo 20 caracteres)";
            }
            if (errorMsg.includes("at least")) {
              errorMsg =
                "Longitud de contraseña no válida! (Minimo 7 caracteres)";
            }
          }
          this.clear();
          Swal.fire({
            icon: "error",
            title: "¡Ups!",
            text: errorMsg,
            showConfirmButton: "OK",
          });
        });
    },
    cancel() {
      this.clear();
    },
    clear() {
      this.inputErrors = [];
      this.password2 = "";
      this.password = "";
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
};
</script>
<style scoped></style>
