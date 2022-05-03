<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog/Dialog.vue";
import Button from "primevue/button";
</script>
<script>
import courseService from "../../services/course.service";
import AddQuestion from "../dialogs/Admin/AddQuestion.vue";
import adminService from "../../services/admin.service";
import Swal from "sweetalert2";
export default {
  mounted() {
    this.getTestId();

    this.getTest();
  },
  components: {
    AddQuestion,
  },
  data() {
    return {
      test: [],
      testLoaded: true,
      some_action: false,
      test_id: 0,
    };
  },
  methods: {
    getTest() {
      this.testLoaded = true;
      courseService
        .getTest(this.currentRoute)
        .then((response) => {
          this.test = response.data;
          console.log(response.data);
          this.testLoaded = false;
          if (this.test.length) {
            // this.test_id = this.test[0].test_id;
            console.log(this.test_id);
          }
        })
        .catch((err) => {
          console.log(err);
          this.testLoaded = false;
        });
    },
    getTestId() {
      adminService
        .getTestId(this.currentRoute)
        .then((response) => {
          console.log(response);
          this.setTestId(response.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTestId(id) {
      this.test_id = id;
      console.log(this.test_id);
    },
    removeQuestion(id) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "¿Desea eliminar la pregunta?",
        showConfirmButton: "Si",
        showCancelButton: "Cancelar",
      })
        .then((response) => {
          if (response.isConfirmed) {
            this.some_action = true;
            adminService
              .removeQuestion(id)
              .then((response) => {
                this.some_action = false;
                Swal.fire({
                  icon: "success",
                  title: "Tarea Completada!",
                  showConfirmButton: "OK!",
                });

                this.getTest();
              })
              .catch((err) => {
                this.some_action = false;
                Swal.fire({
                  icon: "error",
                  title: "Ups!",
                  showConfirmButton: "OK!",
                  text: "Ha habido un error al eliminar la pregunta.",
                });
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    currentRoute() {
      return this.$route.params.course_id;
    },
  },
};
</script>
<template>
  <Loading v-if="some_action" />

  <AddQuestion
    id="addQuestionModal"
    @making_action="(d) => (some_action = d)"
    :reload="getTest"
    :test_id="test_id"
  />
  <div class="container-md">
    <div class="row">
      <div class="col-md-12">
        <h1>
          Test del curso

          <a
            :href="
              $router.resolve({
                name: 'course_detail',
                params: { id: currentRoute },
              }).href
            "
          >
            {{ currentRoute }}
          </a>
        </h1>
      </div>
    </div>
    <div class="row">
      <DataTable
        class="table"
        :value="test"
        :paginator="true"
        :rows="5"
        responsiveLayout="scroll"
        :loading="testLoaded"
        ref="dta"
      >
        <template #loading> Cargando preguntas... </template>
        <template #header>
          <div class="d-flex">
            <div style="text-align: left" class="mr-2">
              <Button
                icon="pi pi-external-link"
                label="Export CSV"
                @click="exportAdminsCSV($event)"
              />
            </div>

            <div style="text-align: left">
              <Button
                data-toggle="modal"
                data-target="#addQuestionModal"
                icon="pi pi-question"
                label="Agregar Pregunta"
                @click="setTestId(test_id)"
              />
            </div>
          </div>
        </template>
        <template #empty> Ninguna pregunta se ha registrado. </template>

        <Column field="question" header="Pregunta" :sortable="true"></Column>
        <Column
          field="correct_answer"
          header="Respuesta Correcta"
          :sortable="true"
        ></Column>
        <Column
          field="fake_answer_1"
          header="Incorrecta 1"
          :sortable="true"
        ></Column>
        <Column
          field="fake_answer_2"
          header="Incorrecta 2"
          :sortable="true"
        ></Column>
        <Column
          field="fake_answer_3"
          header="Incorrecta 3"
          :sortable="true"
        ></Column>
        <Column field="created" header="Registrado" :sortable="true"></Column>
        <Column header="Acciones" :sortable="true">
          <template #body="slotProps">
            <div class="text-center">
              <button
                class="btn btn-danger"
                @click="removeQuestion(slotProps.data.id)"
              >
                <i class="bi bi-eraser-fill"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
