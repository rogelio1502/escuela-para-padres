<template>
  <BaseModal
    id="removeCourseModal"
    :title="title"
    :saveMethod="save"
    :cancel_save="cancel_save"
    :info="info"
  >
    <div>
      <p>
        ¿Desea eliminar el curso
        <strong
          ><i>{{ titleCourse }}</i></strong
        >?
      </p>
    </div>
  </BaseModal>

  <!-- <Ok id="okRemoved" :okMethod="toCourses" v-if="redirect" :cancelMethod="toCourses">
        Curso Eliminado Correctamente
    </Ok> -->

  <!-- <Ok id="okRemoved" :okMethod="reload" v-if="redirect === false" :cancelMethod="reload">
        Curso Eliminado Correctamente
    </Ok> -->
</template>

<script>
import CourseService from "../../../services/course.service";
import Swal from "sweetalert2";

export default {
  emits: ["making_action"],
  mounted() {
    //console.log("Fallo");
  },
  props: {
    reload: Function,
    idCourse: Number,
    titleCourse: String,
    redirect: Boolean,
  },
  data() {
    return {
      title: "¡Precaución!",
      cancel_save: true,
      info: true,
    };
  },
  methods: {
    save() {
      let idCourse = this.idCourse;
      this.$emit("making_action", true);

      CourseService.remove(idCourse)
        .then((response) => {
          this.$emit("making_action", false);
          Swal.fire({
            title: "Tarea completada.",
            text: "Se ha eliminado de forma correcta el curso",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((response) => {
            //console.log(response);
            if (this.redirect) {
              this.toCourses();
            } else {
              this.reload();
            }
          });
        })
        .catch((err) => {
          this.$emit("making_action", false);
          //console.log(err);
        });
    },
    toCourses() {
      this.$router.push("/courses");
    },
  },
};
</script>
