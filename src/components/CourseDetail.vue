<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
</script>
<template>
  <Loading v-if="some_action"> </Loading>

  <div class="container-md mt-3">
    <CourseIn
      @making_action="(d) => (some_action = d)"
      :course_id="course_in_id"
      :email="currentUserEmail"
      :name="course_in_name"
    ></CourseIn>
    <Test
      id="testModal"
      :course_id="course_test_id"
      @making_action="(d) => (some_action = d)"
      :reload="getData"
    >
    </Test>

    <div>
      <!-- <div v-if="!loaded">
        <div class="spinner-border" role="status"></div>
      </div> -->
      <div class="row" v-if="!enabled && adminUser && loaded">
        <div class="col-md-12">
          <div class="alert alert-warning text-center" role="alert">
            <b>Este curso se encuentra deshabilitado para usuarios padre.</b>
          </div>
        </div>
      </div>
      <div v-if="errors.length">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="(course && loaded && enabled) || (adminUser && !enabled)">
        <EditCourse
          @making_action="(d) => (some_action = d)"
          :reload="$router.go"
          :course_id="course_update_id"
        >
        </EditCourse>
        <Remove
          @making_action="(d) => (some_action = d)"
          :redirect="redirect"
          :titleCourse="course_remove_name"
          :idCourse="course_remove_id"
        ></Remove>
        <AddSection
          @making_action="(d) => (some_action = d)"
          :course_id="course.id"
          :reload="getSections"
        ></AddSection>

        <div class="btn-group">
          <button
            class="btn btn-info m-2"
            :disabled="courses_in.includes(course.id)"
            v-show="!isIn && enabled"
            @click="courseIn(course.id, course.name)"
            data-toggle="modal"
            data-target="#courseInModal"
          >
            <i class="bi bi-plus-circle-fill"></i> Inscribirse
          </button>

          <button
            v-if="adminUser"
            class="btn btn-danger m-2"
            data-toggle="modal"
            data-target="#removeCourseModal"
            @click="remove_course(course.name, course.id)"
          >
            <i class="bi bi-eraser-fill"></i> Eliminar Curso
          </button>
          <button
            v-if="adminUser"
            class="btn btn-warning m-2"
            data-toggle="modal"
            data-target="#editCourseModal"
            @click="update(course.id)"
          >
            <i class="bi bi-eraser-fill"></i> Editar Curso
          </button>
        </div>

        <div class="card">
          <div class="card-body CEstilo">
            <div class="card-title d-flex">
              <h3 class="mr-2 text-center">{{ course.name }}</h3>

              <button
                class="btn btn-info"
                v-if="completed && status == 'ready for test'"
                @click="launchTest"
                data-toggle="modal"
                data-target="#testModal"
              >
                <i class="bi bi-check-circle-fill"></i>
                Tomar Test
              </button>
              <button
                class="btn btn-info"
                v-if="completed && status == 'done'"
                @click="getCertificate"
              >
                <i class="bi bi-check-circle-fill"></i>
                Obtener Certificado
              </button>
            </div>
            <div class="text-center">
              <img :src="course.cover" alt="" />
            </div>
            <div v-html="course.description" class="mt-2 mb-2 p-2"></div>
            <div class="card-title">
              <h3 style="display: inline">Secciones</h3>
            </div>
            <div class="btn-group">
              <button
                v-if="adminUser"
                class="btn btn-warning m-2"
                data-toggle="modal"
                data-target="#addSectionModal"
              >
                <i class="bi bi-eraser-fill"></i> Añadir Sección
              </button>

              <button
                v-if="adminUser && sections.length"
                class="btn btn-warning m-2"
                data-toggle="modal"
                data-target="#editSectionOrderModal"
              >
                <i class="bi bi-eraser-fill"></i> Editar Orden
              </button>
            </div>
            <div v-if="sections.length">
              <EditSectionOrder
                @reload_parent="(r) => (reload = r)"
                @making_action="(d) => (some_action = d)"
                :sections_list="sections"
                :course_id="course.id"
              >
              </EditSectionOrder>
              <EditSection
                @making_action="(d) => (some_action = d)"
                :reload="getSections"
                :id="section_id_for_update"
              ></EditSection>
              <RemoveSection
                @making_action="(d) => (some_action = d)"
                :name="section_name_for_remove"
                :id="section_id_for_remove"
                :reload="getSections"
              >
              </RemoveSection>

              <ol class="rounded-list" id="ol-list">
                <Accordion v-for="section in sections" :key="section.id">
                  <AccordionTab>
                    <template #header>
                      <span class="mr-5">{{ section.name }}</span>
                      <span v-if="section.viewed" title="Visto" class="mr-3">
                        <i
                          class="bi bi-check2-square text-success"
                          style="font-size: 18px"
                        ></i>
                      </span>
                      <span
                        v-if="!section.viewed && isIn"
                        title="No Visto"
                        class="mr-5"
                      >
                        <i class="bi bi-app"></i>
                      </span>
                    </template>
                    <div id="section_name_desc">
                      <a
                        class="btn btn-success"
                        :href="
                          $router.resolve({
                            name: 'course_section',
                            params: { id: section.id },
                          }).href
                        "
                        v-show="isIn"
                      >
                        <i class="bi bi-youtube"></i> Ir a la sección...
                      </a>

                      <br />
                      <br />
                      <div v-html="section.summary"></div>
                      <br />
                      <div class="d-flex">
                        <div title="Eliminar Sección">
                          <button
                            v-if="adminUser"
                            class="btn btn-danger bi-eraser-fill mr-2"
                            @click="remove_section(section.id, section.name)"
                            data-toggle="modal"
                            data-target="#removeSectionModal"
                          ></button>
                        </div>
                        <div title="Modificar Sección">
                          <button
                            v-if="adminUser"
                            class="btn btn-primary bi-eraser-fill mr-2"
                            @click="update_section(section.id)"
                            :id="section_id_for_update"
                            data-toggle="modal"
                            data-target="#editSectionModal"
                          ></button>
                        </div>
                      </div>
                    </div>
                  </AccordionTab>
                </Accordion>
              </ol>
            </div>
            <div v-else-if="sections.length == 0 && sectionsLoaded">
              <div class="col-md-12">
                <h4>No se han añadido secciones aún</h4>
              </div>
            </div>
          </div>
          <!-- <div v-if="!sectionsLoaded">
            <div class="spinner-border" role="status"></div>
          </div> -->
        </div>

        <hr />
        <!-- <div v-if="!loaded">
          <div class="spinner-border" role="status"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from "../services/course.service";
import userService from "../services/user.service";
import Remove from "./dialogs/Course/Remove.vue";
import AddSection from "./dialogs/CourseDetail/AddSection.vue";
import EditSectionOrder from "./dialogs/CourseDetail/EditSectionOrder.vue";
import EditSection from "./dialogs/CourseDetail/EditSection.vue";
import RemoveSection from "./dialogs/CourseDetail/RemoveSection.vue";
import CourseIn from "./dialogs/Course/CourseIn.vue";
import Loading from "./Utils/Loading.vue";
import EditCourse from "./dialogs/Course/EditCourse.vue";
import Test from "./Quiz/Test.vue";
import Swal from "sweetalert2";

export default {
  components: {
    EditSectionOrder,
    AddSection,
    EditSection,
    CourseIn,
    Remove,
    RemoveSection,
    EditCourse,
    Test,
  },
  data() {
    return {
      error: "",
      course: {},
      sections: [],
      errors: [],
      errorsSections: [],
      loaded: false,
      sectionsLoaded: false,
      course_remove_name: "",
      course_remove_id: 0,
      redirect: true,
      reload: 0,
      section_id_for_update: 0,
      section_id_for_remove: 0,
      section_name_for_remove: 0,
      courses_in: [],
      course_in_id: 0,
      course_in_name: "",
      some_action: false,
      course_update_id: 0,
      sections_viewed: [],
      request_viewed: 0,
      completed: false,
      //nuevos atributos
      isIn: false,
      course_test_id: 0,
      enabled: false,
      status: "",
    };
  },
  methods: {
    getData() {
      this.some_action = true;
      CourseService.getCourseByUserByCourse(
        this.currentUserEmail,
        this.currentRoute
      )
        .then((response) => {
          if (response.data[0] !== undefined) {
            this.course = response.data[0].Courses;
            this.enabled = this.course.enabled;
            console.log(this.enabled);

            this.some_action = false;

            this.isIn = true;
            if (this.enabled || this.adminUser) {
              this.some_action = true;

              this.getSections();
              this.loaded = true;
            }
          } else {
            CourseService.getCourse(this.currentRoute).then((response) => {
              console.log(response);
              this.course = response.data;
              this.enabled = this.course.enabled;
              console.log(this.enabled);
              this.isIn = false;
              if (this.enabled || this.adminUser) {
                this.some_action = true;

                this.getSections();
                this.loaded = true;
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);

          this.some_action = false;
        });
    },
    getSections() {
      this.sectionsLoaded = false;
      this.sections = [];
      if (this.isIn) {
        userService
          .getSectionsByUserByEmail(this.currentUserEmail, this.currentRoute)
          .then((response) => {
            this.sections = response.data;
            this.sectionsLoaded = true;
            this.some_action = false;
          });
      } else {
        CourseService.getSections(this.currentRoute).then((response) => {
          this.sections = response.data;
          this.sectionsLoaded = true;
          this.some_action = false;
        });
      }
    },
    remove_course(name, id) {
      this.course_remove_name = name;
      this.course_remove_id = id;
    },
    update(id) {
      this.course_update_id = id;
      this.some_action = true;
    },
    remove_section(id, name) {
      this.section_id_for_remove = id;
      this.section_name_for_remove = name;
    },

    update_section(id) {
      this.section_id_for_update = id;
      this.some_action = true;
    },

    courseIn(course_id, course_name) {
      this.course_in_id = course_id;
      this.course_in_name = course_name;
    },
    launchTest() {
      this.course_test_id = this.course.id;
    },
    getStatus() {
      return userService.getStatus(this.currentUserEmail, this.currentRoute);
    },
    getCertificate() {
      Swal.fire({
        title: "INFO",
        text: "¡En mantenimiento!, estamos trabajando en esta nueva funcionalidad por ahora, ¡intentalo más tarde!",
      });
    },
  },
  mounted() {
    this.getData();
  },
  watch: {
    enabled() {},
    isIn() {
      //console.log(this.isIn);
    },
    course() {
      this.course.name = this.course.name.toUpperCase();
    },
    request_viewed() {
      let _sections = this.sections;
      _sections.forEach((_e) => {
        this.sections_viewed.forEach((_v) => {
          if (_e.id === _v.section_id) {
            _e.viewed = true;
          }
        });
      });
      this.sections = _sections;
    },
    reload() {
      this.sections = [];
      this.getSections();
    },
    errors() {
      this.error = this.errors[0];
      console.log(this.error);
      if (this.error.includes("Row Not Found")) {
        this.error = "Course not found";
      }
      alert("Course Not Found");
    },
    sections() {
      if (this.sections.length) {
        let n_sections = this.sections.length;
        let n_sections_viewed = 0;
        this.sections.forEach((element) => {
          if (element.viewed) {
            n_sections_viewed++;
          }
        });

        if (n_sections_viewed === n_sections) {
          this.completed = true;
        }
      }
    },
    completed() {
      if (this.completed) {
        this.some_action = true;
        this.getStatus()
          .then((response) => {
            this.status = response.data.status;
            if (this.status == "inprogress") {
              this.some_action = true;

              userService
                .setProgress(this.currentUserEmail, this.currentRoute)
                .then((response) => {
                  this.some_action = false;

                  this.status = "ready for test";
                  Swal.fire({
                    icon: "success",
                    title: "¡Has terminado el contenido curso!",
                    text: "Ya puedes tomar el test para validar tus conocimientos",
                    showConfirmButton: "Ok",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (this.status == "ready for test") {
              this.some_action = false;

              Swal.fire({
                icon: "success",
                title: "¡Has terminado el contenido curso!",
                text: "Ya puedes tomar el test para validar tus conocimientos",
                showConfirmButton: "Ok",
              });
            } else if (this.status == "done") {
              this.some_action = false;

              Swal.fire({
                icon: "success",
                title: "¡Has finalizado el curso!",
                text: "Ya puedes descargar el certificado.",
                showConfirmButton: "Ok",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    adminUser() {
      try {
        return true ? this.$store.state.auth.user.role === "admin" : false;
      } catch {
        return false;
      }
    },
    currentRoute() {
      return this.$route.params.id;
    },
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

<style scoped>
img {
  height: auto;
  max-width: 85%;
}
ol {
  margin-block-start: 0px;
  padding-inline-start: 0px;
}
</style>
