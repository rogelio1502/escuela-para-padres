<template>
  <BaseModal
    id="addCourseModal"
    :title="title"
    :saveMethod="save"
    :wait_for_validation="cancel_save"
    :info="info"
    :form_modal="form_modal"
    :cancelMethod="cancel"
    :prop_disabled="disabled"
  >
    <div class="form-group">
      <label for="course_name"> Nombre del Curso </label>
      <input
        v-model="course_name"
        type="text"
        name="course_name"
        id="course_name_ipt"
        class="form-control"
        required
      />
      <label for="course_desc"> Descripción </label>
      <textarea
        v-model="course_desc"
        name="course_desc"
        id="course_desc_ipt"
        class="form-control"
        style="resize: none"
        required
      >
      </textarea>

      <input
        style="display: none"
        name="course_cover"
        @change="handleFileUpload"
        type="file"
        ref="fileInput"
        accept="image/jpeg,image/png"
      />
      <br />

      <span>**Se recomienda una imagen 522x300 píxeles**</span>
      <br />
      <button
        class="btn btn-info"
        @click="$refs.fileInput.click()"
        type="button"
      >
        Imagen de Portada
      </button>
      {{ fileImg }}
      <br />
      <FormErrors :inputErrors="inputErrors"> </FormErrors>
    </div>
  </BaseModal>
</template>

<script>
import $ from "jquery";
import api from "../../../services/api";
import Swal from "sweetalert2";

export default {
  emits: ["making_action"],
  props: {
    reload: Function,
  },
  data() {
    return {
      title: "Añadir curso",
      cancel_save: true,
      info: false,
      form_modal: true,
      course_name: "",
      course_desc: "",
      inputErrors: [],
      disabled: false,
      file: null,
      fileImg: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      if (event.target.files !== undefined) {
        this.file = event.target.files[0];
        this.fileImg = this.file.name;
      }
    },
    validations() {
      this.inputErrors = [];
      if (this.course_name.trim().length < 1) {
        this.inputErrors.push(
          "Longitud de Nombre del curso debe ser mayor a 0"
        );
      }
      if (this.course_desc.trim().length < 10) {
        this.inputErrors.push(
          "Longitud de Descripción del curso debe ser mayor a 10"
        );
      }
      if (this.file === null) {
        this.inputErrors.push("La imagen de portada es requerida.");
      }
      if (this.inputErrors.length) {
        return false;
      }
      return true;
    },
    save() {
      let formOk = this.validations();
      if (formOk == false) {
        return;
      }
      $("#addCourseModal").modal("hide");
      this.$emit("making_action", true);

      let course_title = this.course_name;
      let course_desc = this.course_desc;

      const reader = new FileReader();
      reader.onloadend = (e) => {
        const result = e.target.result;
        let json_data = {
          name: course_title,
          description: course_desc,
          cover: result,
        };
        api
          .post("course/", json_data)
          .then((response) => {
            this.$emit("making_action", false);

            Swal.fire({
              title: "Tarea completada.",
              text: "Se ha añadido el curso",
              icon: "success",
              confirmButtonText: "Ok",
              allowOutsideClick: false,
            }).then((response) => {
              console.log(response);
              this.reload();
            });

            this.clear();
          })
          .catch((err) => {
            console.log(err);
            this.$emit("making_action", false);

            this.clear();
          });
      };
      reader.readAsDataURL(this.file);
    },
    cancel() {
      this.clear();
      this.inputErrors = [];
    },
    clear() {
      this.course_name = "";
      this.course_desc = "";
      this.file = null;
      this.fileImg = "";
    },
  },
};
</script>
