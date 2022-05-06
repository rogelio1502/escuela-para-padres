<template>
  <BaseModal
    id="editCourseModal"
    :title="title"
    :saveMethod="save"
    :wait_for_validation="cancel_save"
    :info="info"
    :form_modal="form_modal"
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
      <!-- <textarea
        v-model="course_desc"
        name="course_desc"
        id="course_desc_ipt"
        class="form-control"
        style="resize: none"
        required
      >
      </textarea> -->
      <Editor :editorToolbar="customToolbar" v-model="course_desc" />

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

  <!-- <Ok id="okAdded" :okMethod="reload">
        Curso Actualizado Correctamente
    </Ok> -->
</template>

<script>
import $ from "jquery";
import api from "../../../services/api";
import CourseService from "../../../services/course.service";
import Swal from "sweetalert2";

export default {
  emits: ["making_action"],
  props: {
    reload: Function,
    course_id: Number,
  },
  data() {
    return {
      customToolbar: [["bold", "italic", "underline"], [], []],
      title: "Editar curso",
      cancel_save: true,
      info: false,
      form_modal: true,
      inputErrors: [],
      disabled: false,
      file: null,
      fileImg: "",
      course_name: "",
      course_desc: "",
      shown: 0,
    };
  },
  mounted() {
    let self = this;
    $("#editCourseModal").on("shown.bs.modal", function (e) {
      self.shown++;
    });
  },
  methods: {
    getCourse() {
      CourseService.getCourse(this.course_id)
        .then((response) => {
          this.course_name = response.data.name;
          this.course_desc = response.data.description;
          this.$emit("making_action", false);
          //$("#editCourseModal").modal("show");
        })
        .catch((err) => {
          //console.log(err);
          this.$emit("making_action", false);
        });
    },
    handleFileUpload(event) {
      if (event.target.files !== undefined) {
        this.file = event.target.files[0];
        this.fileImg = this.file.name;
      }
    },
    validations() {
      this.inputErrors = [];

      if (this.course_name.length < 1) {
        this.inputErrors.push(
          "Longitud de Nombre del curso debe ser mayor a 0"
        );
      }
      if (this.course_name.length > 45) {
        this.inputErrors.push(
          "Longitud de Nombre del curso debe ser menor a 45"
        );
      }
      if (this.course_desc.length < 10) {
        this.inputErrors.push(
          "Longitud de Descripción del curso debe ser mayor a 10"
        );
      }
      if (this.course_desc.length > 255) {
        this.inputErrors.push(
          "Longitud de Descripción del curso debe ser menor a 255"
        );
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
      $("#editCourseModal").modal("hide");
      this.$emit("making_action", true);

      if (this.file !== null) {
        const reader = new FileReader();
        reader.onloadend = (e) => {
          const result = e.target.result;
          //console.log(result);
          let json_data = {
            name: this.course_name,
            description: this.course_desc,
            cover: result,
          };
          api
            .patch("course/" + this.course_id, json_data)
            .then((response) => {
              this.$emit("making_action", false);

              //$('#okAdded').modal("show");
              Swal.fire({
                title: "Tarea completada.",
                text: "Se ha editado de forma correcta el curso",
                icon: "success",
                confirmButtonText: "Ok",
                allowOutsideClick: false,
              }).then((response) => {
                //console.log(response);
                this.reload();
              });
            })
            .catch((err) => {
              //console.log(err);
              this.$emit("making_action", false);
            });
        };
        reader.readAsDataURL(this.file);
      } else {
        let json_data = {
          name: this.course_name,
          description: this.course_desc,
        };
        api
          .patch("course/" + this.course_id, json_data)
          .then((response) => {
            this.$emit("making_action", false);

            Swal.fire({
              title: "Tarea completada.",
              text: "Se ha editado de forma correcta el curso",
              icon: "success",
              confirmButtonText: "Ok",
              allowOutsideClick: false,
            }).then((response) => {
              //console.log(response);
              this.reload();
            });
          })
          .catch((err) => {
            //console.log(err);
            this.$emit("making_action", false);
          });
      }
    },
    clear() {
      this.course_name = "";
      this.course_desc = "";
      this.file = null;
      this.fileImg = "";
    },
  },
  watch: {
    shown() {
      this.getCourse();
    },
    course_name() {
      if (this.course_name == " ") {
        this.course_name = "";
      }
      this.course_name = this.course_name.replace("  ", " ");
    },
    course_desc() {
      if (this.course_desc == " ") {
        this.course_desc = "";
      }
      this.course_desc = this.course_desc.replace("  ", " ");
    },
  },
};
</script>
