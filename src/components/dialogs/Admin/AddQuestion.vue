<template>
  <BaseModal
    title="Añadir Pregunta"
    :saveMethod="save"
    :wait_for_validation="true"
    :form_modal="true"
    :cancelMethod="cancel"
  >
    <div class="form-group">
      <label for="email"> Pregunta </label>
      <input
        v-model="question"
        type="text"
        name="text"
        class="form-control"
        placeholder="Pregunta ..."
        required
      />

      <label for="correct_answer"> Respuesta Correcta </label>
      <input
        v-model="correct_answer"
        class="form-control"
        placeholder="Respuesta Correcta..."
        type="text"
        name="text"
        required
      />

      <label for="fake1"> Incorrecta 1 </label>
      <input
        v-model="fake1"
        class="form-control"
        type="text"
        name="fake1"
        placeholder="Respuesta Incorrecta 1"
        required
      />

      <label for="fake2"> Incorrecta 2 </label>
      <input
        v-model="fake2"
        class="form-control"
        type="text"
        name="fake2"
        placeholder="Respuesta Incorrecta 2"
        required
      />

      <label for="fake3"> Incorrecta 3 </label>
      <input
        v-model="fake3"
        class="form-control"
        type="text"
        name="fake3"
        placeholder="Respuesta Incorrecta 3"
        required
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
    test_id: Number,
  },
  data() {
    return {
      inputErrors: [],
      question: "",
      correct_answer: "",
      fake1: "",
      fake2: "",
      fake3: "",
    };
  },
  methods: {
    validations() {
      this.inputErrors = [];
      if (this.question.trim().length < 5) {
        this.inputErrors.push("La pregunta debe tener al menos 5 caracteres");
      }
      if (this.question.trim().length > 100) {
        this.inputErrors.push("La pregunta debe como máximo 100 caracteres");
      }
      if (this.correct_answer.trim().length < 1) {
        this.inputErrors.push(
          "La respuesta correcta debe tener al menos un caracter"
        );
      }
      if (this.correct_answer.trim().length > 50) {
        this.inputErrors.push(
          "La respuesta correcta debe tener máximo 50 caracteres."
        );
      }
      if (this.fake1.trim().length < 1) {
        this.inputErrors.push(
          "La respuesta incorrecta 1 debe tener al menos un caracter"
        );
      }
      if (this.fake1.trim().length > 50) {
        this.inputErrors.push(
          "La respuesta incorrecta 1 debe tener máximo 50 caracteres."
        );
      }
      if (this.fake2.trim().length > 50) {
        this.inputErrors.push(
          "La respuesta incorrecta 2 debe tener máximo 50 caracteres."
        );
      }
      if (this.fake2.trim().length > 50) {
        this.inputErrors.push(
          "La respuesta incorrecta 3 debe tener máximo 50 caracteres."
        );
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
      let json = {
        question: this.question,
        correct_answer: this.correct_answer,
        fake_answer_1: this.fake1,
        fake_answer_2: this.fake2,
        fake_answer_3: this.fake3,
      };
      adminService
        .addQuestion(json, this.test_id)
        .then((response) => {
          $("#addQuestionModal").modal("hide");
          console.log(response);
          this.$emit("making_action", false);
          this.reload();
          Swal.fire({
            icon: "success",
            title: "Tarea Completada!",
            text: "Se ha añadido de forma correcta la pregunta.",
            showConfirmButton: "OK",
          });
          this.clear();
        })
        .catch((err) => {
          console.log(err);
          this.$emit("making_action", false);
          Swal.fire({
            icon: "error",
            title: "Ups!",
            text: "Ha ocurrido un error al tratar de añadir la pregunta.",
            showConfirmButton: "OK",
          });
        });
    },
    cancel() {
      this.clear();
    },
    clear() {
      this.inputErrors = [];
      this.fake1 = "";
      this.fake2 = "";
      this.fake3 = "";
      this.correct_answer = "";
      this.question = "";
    },
  },
  watch: {
    fake1() {
      if (this.fake1 == " ") {
        this.fake1 = "";
      }
      this.fake1 = this.fake1.replace("  ", " ");
    },
    fake2() {
      if (this.fake2 == " ") {
        this.fake2 = "";
      }
      this.fake2 = this.fake2.replace("  ", " ");
    },
    fake3() {
      if (this.fake3 == " ") {
        this.fake3 = "";
      }
      this.fake3 = this.fake3.replace("  ", " ");
    },
    correct_answer() {
      if (this.correct_answer == " ") {
        this.correct_answer = "";
      }
      this.correct_answer = this.correct_answer.replace("  ", " ");
    },
    question() {
      if (this.question == " ") {
        this.question = "";
      }
      this.question = this.question.replace("  ", " ");
    },
  },
};
</script>
<style scoped></style>
