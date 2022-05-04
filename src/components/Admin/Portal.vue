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
    this.getFathers();
    this.getAdmins();
  },
  data() {
    return {
      courses: [],
      coursesLoaded: true,
      testsLoaded: true,
      tests: [],
      users: [],
      admins: [],
      fathers_loaded: true,
      admins_loaded: true,
      showModal: false,
      enableClose: false,
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
    openModal() {
      this.showModal = true;
      this.enableClose = false;
    },
    getFathers() {
      this.fathers_loaded = true;
      adminService
        .getFathers()
        .then((response) => {
          this.users = response.data;
          // this._users = response.data
          this.fathers_loaded = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAdmins() {
      this.fathers_loaded = true;

      adminService
        .getAdmins()
        .then((response) => {
          this.admins = response.data;
          // this._admins = response.data
          this.admins_loaded = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exportFathersCSV() {
      this.$refs.dtf.exportCSV();
    },
    exportAdminsCSV() {
      this.$refs.dta.exportCSV();
    },
    setStatus(id) {
      Swal.fire({
        icon: "info",
        title: "INFO",
        text: "¿Desea cambiar el status del usuario?",
        showConfirmButton: "Si",
        showCancelButton: "Cancelar",
      }).then((response) => {
        if (response.isConfirmed) {
          console.log("Hola" + id);
          adminService
            .setStatus(id)
            .then((response) => {
              console.log(response);
              this.getFathers();
              this.getAdmins();
              Swal.fire({
                icon: "success",
                title: "Tarea completada",
                text: "Se ha completado de forma exitosa el cambio de status del usuario.",
                showConfirmButton: "OK",
              });
            })
            .catch((err) => {
              console.log(reponse);
              Swal.fire({
                icon: "error",
                title: "Ups!",
                text: "Ha habido un error al tratar de cambiar el status del usuario.",
                showConfirmButton: "OK",
              });
            });
        }
      });
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
<template>
  <Loading v-if="some_action" />
  <div class="container-md">
    <div class="row mt-3">
      <div class="col-md-12">
        <h1>Portal Admin</h1>
      </div>
    </div>

    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          ><h3>Cursos</h3></a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          <h3>Tests</h3>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="admins-tab"
          data-toggle="tab"
          href="#admins"
          role="tab"
          aria-controls="admins"
          aria-selected="true"
        >
          <h2>Admins</h2>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="fathers-tab"
          data-toggle="tab"
          href="#fathers"
          role="tab"
          aria-controls="fathers"
          aria-selected="false"
        >
          <h2>Padres</h2>
        </a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div class="row">
          <div class="col-md-12">
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

              <Column
                field="sections"
                header="Secciones"
                :sortable="true"
              ></Column>
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

              <Column
                field="created"
                header="Registrado"
                :sortable="true"
              ></Column>
              <Column
                field="updated"
                header="Ult. Actualización"
                :sortable="true"
              ></Column>
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
            </DataTable>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="row">
          <div class="col-md-12">
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
              <Column
                field="course_id"
                header="Curso"
                :sortable="true"
              ></Column>
              <Column
                field="created"
                header="Registrado"
                :sortable="true"
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade show active"
        id="admins"
        role="tabpanel"
        aria-labelledby="admins-tab"
      >
        <div class="row mt-3">
          <div class="col-md-12">
            <DataTable
              class="table"
              :value="admins"
              :paginator="true"
              :rows="10"
              responsiveLayout="scroll"
              :loading="admins_loaded"
              ref="dta"
            >
              <template #loading> Cargando datos... </template>
              <template #header>
                <div class="d-flex">
                  <div style="text-align: left">
                    <Button
                      class="btn btn-warning mr-2"
                      icon="pi pi-external-link"
                      label="Export CSV"
                      @click="exportAdminsCSV($event)"
                    />
                  </div>
                  <div style="text-align: left">
                    <Button
                      class="btn btn-warning mr-2"
                      data-toggle="modal"
                      label="Agregar"
                      data-target="#addAdminModal"
                    />
                  </div>
                </div>
              </template>
              <template #empty> Ningún Admin se ha registrado. </template>
              <Column field="id" header="Id" :sortable="true"></Column>
              <Column field="email" header="Email" :sortable="true"></Column>
              <Column
                field="added_by"
                header="Tipo de Registro"
                :sortable="true"
              >
                <template #body="slotProps">
                  <div v-if="slotProps.data.added_by" class="btn btn-success">
                    Añadido por el usuario con el ID
                    {{ slotProps.data.added_by }}
                  </div>
                  <div v-if="!slotProps.data.added_by" class="btn btn-info">
                    Propio
                  </div>
                </template>
              </Column>
              <Column field="enabled" header="Status" :sortable="true">
                <template #body="slotProps">
                  <div v-if="slotProps.data.enabled" class="btn btn-success">
                    Activo
                  </div>
                  <div v-if="!slotProps.data.enabled" class="btn btn-warning">
                    Desactivado
                  </div>
                </template></Column
              >
              <Column header="Acciones">
                <template #body="slotProps">
                  <div
                    v-if="
                      slotProps.data.enabled &&
                      slotProps.data.email !== currentUserEmail
                    "
                  >
                    <button
                      class="btn btn-warning"
                      @click="setStatus(slotProps.data.id)"
                    >
                      Deshabilitar
                    </button>
                  </div>
                  <div v-if="!slotProps.data.enabled">
                    <button
                      class="btn btn-info"
                      @click="setStatus(slotProps.data.id)"
                    >
                      Habilitar
                    </button>
                  </div>
                </template>
              </Column>

              <Column
                field="created"
                header="Registrado"
                :sortable="true"
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="fathers"
        role="tabpanel"
        aria-labelledby="fathers-tab"
      >
        <div class="row mt-3">
          <div class="col-md-12">
            <DataTable
              :value="users"
              :paginator="true"
              :rows="10"
              responsiveLayout="scroll"
              class="table"
              :loading="fathers_loaded"
              ref="dtf"
            >
              <template #loading> Cargando datos... </template>
              <template #header>
                <div class="d-flex">
                  <div style="text-align: left">
                    <Button
                      class="mr-2"
                      icon="pi pi-external-link"
                      label="Export CSV"
                      @click="exportFathersCSV($event)"
                    />
                  </div>
                  <div style="text-align: left">
                    <Button
                      class="btn btn-warning mr-2"
                      data-toggle="modal"
                      label="Agregar"
                      data-target="#addFatherModal"
                    />
                  </div>
                </div>
              </template>
              <template #empty> Ningún Padre se ha registrado. </template>
              <Column field="id" header="Id" :sortable="true"></Column>
              <Column field="email" header="Email" :sortable="true"></Column>
              <Column
                field="added_by"
                header="Tipo de Registro"
                :sortable="true"
              >
                <template #body="slotProps">
                  <div v-if="slotProps.data.added_by" class="btn btn-success">
                    Añadido por el usuario con el ID{{
                      slotProps.data.added_by
                    }}
                  </div>
                  <div v-if="!slotProps.data.added_by" class="btn btn-info">
                    Propio
                  </div>
                </template>
              </Column>
              <Column field="enabled" header="Status" :sortable="true">
                <template #body="slotProps">
                  <div v-if="slotProps.data.enabled" class="btn btn-success">
                    Activo
                  </div>
                  <div v-if="!slotProps.data.enabled" class="btn btn-warning">
                    Desactivado
                  </div>
                </template></Column
              >
              <Column header="Acciones">
                <template #body="slotProps">
                  <div v-if="slotProps.data.enabled">
                    <button
                      class="btn btn-warning"
                      @click="setStatus(slotProps.data.id)"
                    >
                      Deshabilitar
                    </button>
                  </div>
                  <div v-if="!slotProps.data.enabled">
                    <button
                      class="btn btn-info"
                      @click="setStatus(slotProps.data.id)"
                    >
                      Habilitar
                    </button>
                  </div>
                </template>
              </Column>

              <Column
                field="created"
                header="Registrado"
                :sortable="true"
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
