<template>
  <div class="container-md mb-5">
    <Loading v-if="some_action" />

    <ResetPassword
      id="resetPasswordModal"
      @making_action="(d) => (some_action = d)"
    >
    </ResetPassword>
    <div>
      <h1>Mi Perfil</h1>
    </div>

    <ul class="nav nav-tabs mb-5" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <a
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          >Datos Personales</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
          >Seguridad</a
        >
      </li>
    </ul>
    <div class="tab-content mb-5" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="row">
          <div class="col-md-10 mr-5 ml-5">
            <div>
              <p>
                <strong>¡Estos datos aparecerán en tus reconocimientos!</strong>
              </p>
            </div>
            <button class="btn btn-warning" @click="edit" title="Editar Datos">
              <i class="bi bi-pencil-square"></i>
            </button>
          </div>
          <div class="col-md-10 mb-5 mr-5 ml-5 mt-2">
            <div>
              <form @submit.prevent="setPersonalData">
                <label for="first_name">Nombre(s)</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  class="form-control"
                  :disabled="!edit_personal_data"
                  v-model="names"
                  maxlength="45"
                  required
                />
                <label for="last_name" cl>Apellido Paterno</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  class="form-control"
                  :disabled="!edit_personal_data"
                  v-model="last_name"
                  maxlength="30"
                  required
                />
                <label for="second_last_name">Apellido Materno</label>
                <input
                  type="text"
                  name="second_last_name"
                  id="second_last_name"
                  class="form-control"
                  :disabled="!edit_personal_data"
                  v-model="second_last_name"
                  maxlength="30"
                  required
                />
                <br />
                <button class="btn btn-success" :disabled="!edit_personal_data">
                  Enviar
                </button>
                <FormErrors :inputErrors="inputErrors" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="row mt-2">
          <div class="col-md-12">
            <ul style="list-style: none">
              <li>
                <button
                  class="btn btn-warning"
                  data-toggle="modal"
                  data-target="#resetPasswordModal"
                >
                  <i class="bi bi-key"></i> Cambiar Contraseña
                </button>
              </li>

              <!-- <li>
          <button class="btn btn-danger">Reportar Error</button>
        </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "../services/user.service";
import ResetPassword from "./dialogs/User/ResetPassword.vue";

import Swal from "sweetalert2";
export default {
  components: {
    ResetPassword,
  },
  mounted() {
    this.getPersonalData();
  },
  data() {
    return {
      some_action: false,
      edit_personal_data: false,
      names: "",
      last_name: "",
      second_last_name: "",
      inputErrors: [],
    };
  },
  methods: {
    edit() {
      this.edit_personal_data = !this.edit_personal_data;
    },
    validations() {
      this.inputErrors = [];
      if (this.names.length < 1 || this.names.length > 45) {
        this.inputErrors.push(
          "Longitud del apartado Nombre(s) es inválida. (mínimo 1, máximo 45)"
        );
      }
      if (this.last_name.length < 1 || this.last_name.length > 45) {
        this.inputErrors.push(
          "Longitud del apartado Apellido Paterno es inválida. (mínimo 1, máximo 30)"
        );
      }
      if (
        this.second_last_name.length < 1 ||
        this.second_last_name.length > 45
      ) {
        this.inputErrors.push(
          "Longitud del apartado Apellido Materno es inválida. (mínimo 1, máximo 30)"
        );
      }
      if (this.inputErrors.length) {
        return true;
      }
      return false;
    },
    getPersonalData() {
      this.some_action = true;
      userService
        .getPersonalData(this.currentUserEmail)
        .then((response) => {
          this.names = response.data.names == null ? "" : response.data.names;
          this.last_name =
            response.data.last_name == null ? "" : response.data.last_name;
          this.second_last_name =
            response.data.second_last_name == null
              ? ""
              : response.data.second_last_name;
          if (
            this.names == "" ||
            this.last_name == "" ||
            this.second_last_name == ""
          ) {
            Swal.fire({
              title: "¡ATENCIÓN!",
              text: "Tus datos personales están incompletos, favor de completarlos.",
              icon: "info",
            });
          }
          this.some_action = false;
        })
        .catch((err) => {});
    },
    setPersonalData() {
      this.some_action = true;

      if (this.validations()) {
        return;
      }

      userService
        .setPersonalData(
          this.currentUserEmail,
          this.names,
          this.last_name,
          this.second_last_name
        )
        .then((response) => {
          this.getPersonalData();
          this.edit_personal_data = false;
          Swal.fire({
            title: "¡Tarea Completada!",
            text: "Tus datos personales se han actualizado.",
            icon: "success",
          });
          this.some_action = false;
        })
        .catch((err) => {
          Swal.fire({
            title: "!Ups!",
            text: "Error al modificar tu información, intenta más tarde.",
            icon: "error",
          });
          this.some_action = false;
        });
    },
  },
  watch: {
    some_action() {},

    names() {
      if (this.names == " ") {
        this.names = "";
      }
      this.names = this.names.replace("  ", " ");
    },
    last_name() {
      if (this.last_name == " ") {
        this.last_name = "";
      }
      this.last_name = this.last_name.replace("  ", " ");
    },
    second_last_name() {
      if (this.second_last_name == " ") {
        this.second_last_name = "";
      }
      this.second_last_name = this.second_last_name.replace("  ", " ");
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
