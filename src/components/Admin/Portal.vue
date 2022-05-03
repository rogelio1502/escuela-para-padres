<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog/Dialog.vue";
import Button from "primevue/button";
</script>
<script>
import adminService from "../../services/admin.service";
import courseService from "../../services/course.service";
import Swal from "sweetalert2";
export default {
  mounted() {
    this.getCourses();
    this.getTests();
  },
  data() {
    return {
      courses: [],
      coursesLoaded: true,
      testsLoaded: true,
      tests: [],
      some_action: false,
    };
  },
  methods: {
    enableCourse(course_id) {
      Swal.fire({
        icon: "info",
        title: "INFO",
        text: "¿Desea cambiar el status de este curso?",
        showCancelButton: "Cancelar",
        showConfirmButton: "Confirmar",
      }).then((response) => {
        console.log(response);
        if (response.isConfirmed) {
          this.coursesLoaded = true;
          courseService
            .setStatus(course_id)
            .then((response) => {
              console.log(response);
              this.getCourses();
            })
            .catch((err) => {
              console.log(err);
              this.coursesLoaded = false;
            });
        }
      });
    },
    getCourses() {
      this.coursesLoaded = true;
      adminService
        .getCoursesIngo()
        .then((response) => {
          this.courses = response.data;
          this.coursesLoaded = false;
        })
        .catch((err) => {
          console.log(err);
          this.coursesLoaded = false;
        });
    },
    getTests() {
      this.testsLoaded = true;
      adminService
        .getTests()
        .then((response) => {
          this.tests = response.data;
          this.testsLoaded = false;
        })
        .catch((err) => {
          console.log(err);
          this.testsLoaded = false;
        });
    },
    addTest(id) {
      Swal.fire({
        title: "INFO",
        text: "¿Desea agregar un test a este curso?",
        confirmButtonText: "Si",
        showCancelButton: "Cancelar",
      }).then((response) => {
        if (response.isConfirmed) {
          this.some_action = true;
          adminService
            .addTest(id)
            .then((response) => {
              this.some_action = false;
              console.log(response);
              this.$router.push("/admin/course/test/" + id);
            })
            .catch((err) => {
              console.log(err);
              this.some_action = false;
              Swal.fire({
                title: "Ups!",
                text: "Ha habido un error al crear el test",
                confirmButtonText: "Ok",
              }).then((respose) => {
                location.reload();
              });
            });
        }
      });
    },
  },
};
</script>
<template>
  <Loading v-if="some_action" />
  <div class="container-md">
    <h1>Portal Admin</h1>
    <div class="row">
      <div class="col-md-12">
        <h3>Cursos</h3>
        <DataTable
          class="table"
          :value="courses"
          :paginator="true"
          :rows="5"
          responsiveLayout="scroll"
          :loading="coursesLoaded"
          ref="dta"
        >
          <template #loading> Cargando datos... </template>
          <template #header>
            <div style="text-align: left">
              <Button
                icon="pi pi-external-link"
                label="Export CSV"
                @click="exportAdminsCSV($event)"
              />
            </div>
          </template>
          <template #empty> Ningún curso se ha registrado. </template>
          <Column field="id" header="Id" :sortable="true"></Column>
          <Column header="Título" :sortable="true">
            <template #body="slotProps">
              <a
                :href="
                  $router.resolve({
                    name: 'course_detail',
                    params: { id: slotProps.data.id },
                  }).href
                "
              >
                {{ slotProps.data.name }}
              </a>
            </template>
          </Column>

          <Column field="sections" header="Secciones" :sortable="true"></Column>
          <Column
            field="users"
            header="Usuarios Registrados"
            :sortable="true"
          ></Column>
          <Column header="Tiene Test" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.has_test }}
              <button
                class="btn btn-success"
                v-if="slotProps.data.has_test == 'no'"
                title="Añadir Test"
                @click="addTest(slotProps.data.id)"
              >
                <i class="bi bi-file-earmark-plus-fill"></i>
              </button>
              <span v-else class="text-center"
                ><i class="bi bi-check-circle-fill"></i
              ></span>
            </template>
            ></Column
          >
          <Column header="Acciones" :sortable="true">
            <template #body="slotProps">
              <button
                class="btn btn-success"
                v-if="!slotProps.data.enabled"
                @click="enableCourse(slotProps.data.id)"
              >
                Habilitar
              </button>
              <button
                class="btn btn-danger"
                v-if="slotProps.data.enabled"
                @click="enableCourse(slotProps.data.id)"
              >
                Deshabilitar
              </button>
            </template>
          </Column>
          <Column field="created" header="Registrado" :sortable="true"></Column>
          <Column
            field="updated"
            header="Ult. Actualización"
            :sortable="true"
          ></Column>
        </DataTable>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h3>Tests</h3>
        <DataTable
          class="table"
          :value="tests"
          :paginator="true"
          :rows="5"
          responsiveLayout="scroll"
          :loading="testsLoaded"
          ref="dta"
        >
          <template #loading> Cargando datos... </template>
          <template #header>
            <div style="text-align: left">
              <Button
                icon="pi pi-external-link"
                label="Export CSV"
                @click="exportAdminsCSV($event)"
              />
            </div>
          </template>
          <template #empty> Ningún test se ha registrado. </template>
          <Column field="id" header="Id" :sortable="true">
            <template #body="slotProps">
              <a
                :href="
                  $router.resolve({
                    name: 'course_test',
                    params: { course_id: slotProps.data.course_id },
                  }).href
                "
              >
                {{ slotProps.data.id }}
              </a>
            </template>
          </Column>
          <Column field="course_id" header="Curso" :sortable="true"></Column>
          <Column field="created" header="Registrado" :sortable="true"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
