<template>
  <BaseModal
    id="courseInModal"
    :title="title"
    :info="info"
    :cancel_save="cancel_save"
    :saveMethod="save"
  >
    <div>
      ¿Desea Inscribirse al curso <b>{{ name }}</b
      >?
    </div>
  </BaseModal>
</template>

<script>
import userService from "../../../services/user.service";
import Swal from "sweetalert2";
export default {
  emits: ["making_action"],
  props: {
    course_id: Number,
    email: String,
    name: String,
  },
  data() {
    return {
      title: "INFO",
      info: true,
      cancel_save: true,
    };
  },
  methods: {
    save() {
      this.$emit("making_action", true);
      userService
        .addCourse(this.course_id, this.email)
        .then((response) => {
          this.$emit("making_action", false);
          Swal.fire({
            title: "Felicidades.",
            text: "Te has inscrito con éxito al curso",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((response) => {
            //console.log(response);
            this.toCourseDetail();
          });
        })
        .catch((err) => {
          this.$emit("making_action", false);

          //console.log(err);
        });
    },

    toCourseDetail() {
      if (this.$route.name === "course_detail") {
        this.$router.go();
      } else {
        this.$router.push("/courses/detail/" + this.course_id);
      }
    },
  },
};
</script>
