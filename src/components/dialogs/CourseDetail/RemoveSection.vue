<template>
  <BaseModal
    id="removeSectionModal"
    :title="title"
    :saveMethod="save"
    :cancel_save="cancel_save"
    :info="info"
  >
    <div>
      <p>
        ¿Desea eliminar la sección
        <strong
          ><i>{{ name }}</i></strong
        >?
      </p>
    </div>
  </BaseModal>
</template>

<script>
import sectionService from "../../../services/section.service";
import CourseService from "../../../services/course.service";
import Swal from "sweetalert2";

export default {
  emits: ["making_action"],
  props: {
    reload: Function,
    id: Number,
    name: String,
  },
  data() {
    return {
      title: "¡Precaución!",
      cancel_save: true,
      info: true,
      sections: this.sections_list,
    };
  },
  methods: {
    save() {
      this.$emit("making_action", true);
      let id_section = this.id;
      sectionService
        .remove(id_section)
        .then((response) => {
          this.$emit("making_action", false);
          Swal.fire({
            title: "Tarea completada.",
            text: "Se ha eliminado la sección de forma correcta.",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((response) => {
            //console.log(response);
            this.$emit("making_action", true);
            this.reload();
            this.$emit("making_action", false);
          });
        })
        .catch((err) => {
          //console.log(err);
          this.$emit("making_action", false);
        });
    },
  },
};
</script>
