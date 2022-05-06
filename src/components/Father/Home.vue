<script setup>
import userService from "../../services/user.service";
import CourseCard from "./CourseCard.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
</script>

<template>
  <div class="container-md mt-3">
    <div>
      <h1><i class="tamano bi bi-house-fill"></i> Home</h1>
    </div>

    <div class="Mis_Cursos text-center mb-5">
      <h2>Mis Cursos</h2>
    </div>

    <Accordion :multiple="true">
      <AccordionTab>
        <template #header>
          <h5>Cursos En Progreso</h5>
        </template>
        <div class="row">
          <div v-show="!loaded">
            <div class="spinner-border" role="status"></div>
          </div>
          <div
            class="col-md-12"
            v-if="in_progress_courses.length == 0 && loaded"
          >
            No has empezado ningún curso
          </div>
          <CourseCard v-else :courses="in_progress_courses"></CourseCard>
        </div>
      </AccordionTab>

      <AccordionTab>
        <template #header>
          <h5>Cursos Listos Para Tomar Test</h5>
        </template>
        <div class="row">
          <div v-show="!loaded">
            <div class="spinner-border" role="status"></div>
          </div>
          <div
            class="col-md-12"
            v-if="ready_for_test_courses.length == 0 && loaded"
          >
            No cuentas con ningún curso lista para tomar el test
          </div>
          <CourseCard v-else :courses="ready_for_test_courses"></CourseCard>
        </div>
      </AccordionTab>

      <AccordionTab
        ><template #header>
          <h5>Cursos Finalizados</h5>
        </template>
        <div class="row">
          <div v-show="!loaded">
            <div class="spinner-border" role="status"></div>
          </div>
          <div class="col-md-12" v-if="done_courses.length == 0 && loaded">
            No has finalizado ningún curso
          </div>
          <CourseCard v-else :courses="done_courses"></CourseCard>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script>
export default {
  components: { CourseCard },
  data() {
    return {
      courses: [],
      in_progress_courses: [],
      done_courses: [],
      ready_for_test_courses: [],
      loaded: false,
    };
  },
  mounted() {
    this.getCoursesByUser();
  },
  methods: {
    getCoursesByUser() {
      userService
        .getCourses(this.currentUserEmail)
        .then((response) => {
          this.courses = response.data;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
  },
  computed: {
    adminSudo() {
      try {
        return true
          ? this.$store.state.auth.user.role === "admin" ||
              this.$store.state.auth.user.role === "su"
          : false;
      } catch {
        return false;
      }
    },
    sudo() {
      try {
        return true ? this.$store.state.auth.user.role === "su" : false;
      } catch {
        return false;
      }
    },
    currentUserEmail() {
      try {
        return this.$store.state.auth.user.email;
      } catch {
        return null;
      }
    },
  },
  watch: {
    courses() {
      this.loaded = true;
      this.courses.forEach((course) => {
        if (course.status == "inprogress") {
          this.in_progress_courses.push(course);
        } else if (course.status == "ready for test") {
          this.ready_for_test_courses.push(course);
        } else if (course.status == "done") {
          this.done_courses.push(course);
        }
      });
    },
  },
};
</script>

<style scoped>
.tamano {
  font-size: 30px;
}
.No_Curso {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
  text-align: center;
  padding-top: 10px;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 38px;
  font-weight: normal;
  line-height: 32px;
}

.Mis_Cursos {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: normal;
  line-height: 32px;
}
</style>
