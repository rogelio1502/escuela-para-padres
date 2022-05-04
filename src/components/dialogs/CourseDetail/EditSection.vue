<template>
  <BaseModal
    id="editSectionModal"
    :title="title"
    :saveMethod="save"
    :wait_for_validation="cancel_save"
    :info="info"
    :form_modal="form_modal"
    :cancelMethod="cancel"
  >
    <div class="form-group">
      <label for="section_name"> Nombre de la sección </label>
      <input
        v-model="name"
        type="text"
        name="section_name"
        id="section_name_ipt"
        class="form-control"
        required
      />

      <label for="section_desc"> Descripción de la sección </label>
      <textarea
        v-model="desc"
        name="section_desc"
        id="section_desc_ipt"
        class="form-control"
        style="resize: none"
        required
      >
      </textarea>

      <label for="section_video"> Url del video </label>

      <input
        v-model="video"
        type="text"
        name="section_video"
        id="section_video_ipt"
        class="form-control"
        required
      />

      <br />
      <FormErrors :inputErrors="inputErrors"> </FormErrors>
    </div>
  </BaseModal>
</template>

<script>
import SectionService from "../../../services/section.service";
import Swal from "sweetalert2";
import $ from "jquery";

export default {
  emits: ["making_action"],
  props: {
    reload: Function,
    id: Number,
  },
  data() {
    return {
      title: "Editar sección",
      cancel_save: true,
      info: false,
      form_modal: true,
      section_position: 1,
      inputErrors: [],
      name: "",
      desc: "",
      video: "",
      shown: 0,
    };
  },
  mounted() {
    let self = this;
    $("#editSectionModal").on("shown.bs.modal", function (e) {
      self.shown++;
    });
  },
  methods: {
    getSection() {
      SectionService.get(this.id)
        .then((response) => {
          this.name = response.data.name;
          this.desc = response.data.summary;
          this.video = response.data.video_quick_url;
          this.$emit("making_action", false);
        })
        .catch((err) => {
          console.log(err);
          this.$emit("making_action", false);
        });
    },
    validations() {
      this.inputErrors = [];

      if (this.name.trim().length < 1) {
        this.inputErrors.push("Longitud del nombre ser mayor a 0");
      }
      if (this.desc.trim().length < 10) {
        this.inputErrors.push(
          "Longitud de la descripción debe ser minimo de 10"
        );
      }
      if (this.video.trim().length < 0) {
        this.inputErrors.push(
          "Longitud de la url  del video debe ser mayor a 0"
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
      this.$emit("making_action", true);
      $("#editSectionModal").modal("hide");

      SectionService.update(this.id, this.name, this.desc, this.video)
        .then((response) => {
          Swal.fire({
            title: "Tarea completada.",
            text: "Se ha actualizado de forma correcta la sección",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((response) => {
            console.log(response);
            this.reload();
          });
          this.$emit("making_action", false);
        })
        .catch((err) => {
          console.log(err);
          this.$emit("making_action", false);
        });
      this.inputErrors = [];
    },
    cancel() {
      this.name = "";
      this.desc = "";
      this.video = "";
    },
  },
  watch: {
    shown() {
      this.getSection();
    },
  },
};
</script>
