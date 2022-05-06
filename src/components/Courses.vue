<script setup>
import DataView from "primevue/dataview";
</script>
<template>
  <Loading v-if="some_action || loaded == false"> </Loading>
  <AddCourse @making_action="(d) => (some_action = d)" :reload="getData">
  </AddCourse>
  <Remove
    :redirect="redirect"
    @making_action="(d) => (some_action = d)"
    :reload="getData"
    :titleCourse="course_remove_name"
    :idCourse="course_remove_id"
  >
  </Remove>
  <CourseIn
    :course_id="course_in_id"
    @making_action="(d) => (some_action = d)"
    :email="currentUserEmail"
    :name="course_in_name"
  >
  </CourseIn>

  <div class="container-md">
    <div class="row mt-3">
      <div class="col-md-12">
        <header class="d-flex">
          <h1 class="mr-5"><i class="tamano bi bi-book"> </i> Cursos</h1>
          <button
            v-if="adminUser"
            id="x"
            class="btn btn-success tb"
            data-toggle="modal"
            data-target="#addCourseModal"
          >
            Añadir Curso
          </button>
        </header>
      </div>
    </div>
    <div class="row"></div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="alert alert-info" role="alert">
          <p class="text-center">
            Si te inscribiste en un curso y no aparece aquí. Dirigete hacía la
            sección
            <router-link to="/home"> HOME </router-link>.
          </p>
        </div>
      </div>
    </div>

    <div class="mt-5 mb-5" v-if="loaded && !courses.length">
      <h3 class="text-center">
        Actualmente no hay ningún curso al cuál puedas inscribirte.
      </h3>
    </div>
    <!-- <div v-if="!loaded">
      <div class="spinner-border" role="status"></div>
    </div> -->
  </div>

  <!-- Courses Carrousel -->
  <div class="container-md">
    <!-- <div v-if="adminUser && loaded">
      <div class="row">
        <div class="col-md-12">
          
        </div>
      </div>

    </div> -->

    <div class="mt-3"></div>
    <div>
      <div v-if="errors.length">
        <p>Error al cargar</p>
      </div>
    </div>

    <DataView
      v-if="courses.length"
      class="mt-1"
      :value="courses"
      paginatorPosition="both"
      :paginator="true"
      :rows="4"
      :totalRecords="courses.length"
    >
      <template #loading>Ningún curso disponible.</template>

      <template #list="slotProps">
        <div class="col-lg-6 text-center mt-2 container-card">
          <div class="card">
            <div class="card-body">
              <figure>
                <img :src="slotProps.data.cover" alt="" />
              </figure>
              <div class="card-title mt-4">
                <h3 class="title header expansion">
                  <a :href="'courses/detail/' + slotProps.data.id">{{
                    slotProps.data.name.toUpperCase()
                  }}</a>
                </h3>
              </div>
              <div class="card-text mt-2">
                <div v-html="slotProps.data.description"></div>
              </div>
            </div>
            <div class="card-footer">
              <button
                class="btn btn-info m-2"
                @click="courseIn(slotProps.data.id, slotProps.data.name)"
                data-toggle="modal"
                data-target="#courseInModal"
              >
                <i class="bi bi-plus-circle-fill"> </i>
              </button>

              <button
                v-if="adminUser"
                class="btn btn-danger m-2"
                data-toggle="modal"
                data-target="#removeCourseModal"
                @click="remove_course(slotProps.data.name, slotProps.data.id)"
              >
                {{ slotProps.data.name }}
                <i class="bi bi-eraser-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import AddCourse from "./dialogs/Course/AddCourse.vue";
import Remove from "./dialogs/Course/Remove.vue";
import CourseIn from "./dialogs/Course/CourseIn.vue";
import Loading from "./Utils/Loading.vue";
import userService from "../services/user.service";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    AddCourse,
    Remove,
    Carousel,
    Slide,
    Navigation,
  },

  data() {
    return {
      course_desc: "",
      courses: [],
      errors: [],
      loaded: false,
      course_remove_id: 0,
      course_remove_name: "",
      redirect: false,
      course_in_id: 0,
      course_in_name: "",
      some_action: false,
      courses_groups: [],
    };
  },
  methods: {
    getData() {
      this.loaded = false;
      userService
        .getCoursesWhereNotUser(this.currentUserEmail)
        .then((response) => {
          this.courses = response.data;
          let _courses = [];
          this.courses.forEach((element) => {
            if (element.enabled) {
              _courses.push(element);
            }
          });
          this.courses = _courses;

          let group = [];
          let c = 1;
          this.courses.forEach((element) => {
            group.push(element);
            if (c % 3 == 0) {
              this.courses_groups.push(group);
              group = [];
            }
            c++;
          });
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    remove_course(name, id) {
      this.course_remove_name = name;
      this.course_remove_id = id;
    },
    courseIn(course_id, course_name) {
      this.course_in_id = course_id;
      this.course_in_name = course_name;
    },
  },
  mounted() {
    this.getData();
    //this.getCoursesByUser();
  },

  computed: {
    adminUser() {
      try {
        return true ? this.$store.state.auth.user.role === "admin" : false;
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
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
.card {
  height: 600px;
}
.card img {
  height: 320px;
  width: 100%;
  border: 0.5px solid gray;
}
.card-body {
  height: 300px;
  overflow: scroll;
}

.card-text {
}

/*Cards*/
/* .container-card {
  width: 100%;
  height: 100%;

  display: flex;
  max-width: 400px;
  margin: auto;
}
.title-cards {
  width: 100%;
  max-width: 1080px;
  margin: auto;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  color: #7a7a7a;
}
.card {
  width: 100%;
  margin: 20px;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  transition: all 400ms ease-out;
  cursor: default;
}
.card:hover {
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  transform: translateY(-3%);
}
.card img {
  width: 100%;
  height: 210px;
}
.card .contenido-card {
  padding: 15px;
  text-align: center;
}
.card .contenido-card h3 {
  margin-bottom: 15px;
  color: #7a7a7a;
}
.card .contenido-card p {
  line-height: 1.8;
  color: #6a6a6a;
  font-size: 14px;
  margin-bottom: 5px;
}

.tb {
  margin-bottom: 10px;
}

.tamano {
  font-size: 30px;
}
*/
@media only screen and (max-width: 774px) {
  .img {
    width: 90%;
    height: 250px;
  }
}
</style>
