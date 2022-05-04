<script setup>
import courseService from "../services/course.service";
import YouTube from "vue3-youtube";
</script>

<template>
  <div v-if="!loaded">
    <div class="spinner-border" role="status"></div>
  </div>
  <div class="container-md">
    <div v-if="section && loaded" class="row mt-5">
      <div class="col-md-12">
        <div class="card" :class="{ viewed: isViewed }">
          <div class="card-title mt-2" v-if="section.name">
            <h1 class="text-center">{{ section.name.toUpperCase() }}</h1>
          </div>
          <YouTube
            :src="section.video_url"
            @state-change="onStateChange"
            ref="youtube"
            width="100%"
            height="500"
            fs="0"
          />
          <div class="card-body">
            <div class="card-text" v-if="section.summary">
              {{ section.summary.toUpperCase() }}
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between">
              <router-link
                :to="'/courses/detail/' + section.course_id"
                class="btn btn-primary"
              >
                Volver al curso
              </router-link>
              <span v-if="isViewed" title="Visto">
                Visto
                <i
                  class="bi bi-check2-square text-success"
                  style="font-size: 18px"
                ></i>
              </span>
              <span v-else title="No Visto">
                Pendiente <i class="bi bi-app"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="LogoNombre text-center">
          <img src="https://i.imgur.com/6cUAZb4.png" alt="Logo Fundacion" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import userService from "../services/user.service";
export default {
  data() {
    return {
      section: {},
      loaded: false,
      isViewed: false,
      done: false,
    };
  },
  mounted() {
    this.getSection();
  },
  methods: {
    onStateChange(e) {
      console.log(e.target.getCurrentTime(), "now");
      console.log(e.target.getDuration());

      if (
        e.target.getCurrentTime() >= e.target.getDuration() - 5 &&
        e.target.getDuration() !== 0
      ) {
        if (this.isViewed == false && this.done === false) {
          this.done = true;
          userService
            .setAsViewedSection(this.currentUserEmail, this.section.id)
            .then((response) => {
              Swal.fire({
                title: "Sección Completada.",
                //text:   "Has finalizado la sección",
                icon: "success",
                confirmButtonText: "Ok",
                allowOutsideClick: false,
              }).then((response) => {
                console.log(response);
                this.$router.push("/courses/detail/" + this.section.course_id);
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "Upsss!",
                text: "Hubo un error al marcar como finalizada la sección :(",
                icon: "error",
                confirmButtonText: "Ok",
                allowOutsideClick: false,
              }).then((response) => {
                console.log(response);
              });
            });
        }
      }
    },
    getSection() {
      courseService
        .getSection(this.currentRoute, this.currentUserEmail)
        .then((response) => {
          this.section = response.data[0];
        })
        .catch((err) => {
          switch (err.response.status) {
            case 404:
              if (err.response.data.detail !== undefined) {
                this.$router.push("/");
              }

              break;
            case 400:
              if (err.response.data.detail.includes("in this course")) {
                this.$router.push("/courses");
              }

              break;
            default:
              break;
          }
        });
    },
    isViewedMethod() {
      userService
        .getAsViewedSection(this.currentUserEmail, this.section.id)
        .then((response) => {
          if (response.data.message == "VIEWED") {
            this.isViewed = true;
            this.loaded = true;
            Swal.fire({
              icon: "success",
              title: "Previamente Ya has completado esta sección!",
              showConfirmButton: "OK",
            });
          } else {
            this.isViewed = false;
            this.loaded = true;
          }
          console.log(this.isViewed);
        })
        .catch((err) => {
          console.error("Error al cargar el status del video");
          this.loaded = true;
        });
    },
  },
  watch: {
    section() {
      this.isViewedMethod();
    },
  },
  computed: {
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
.LogoNombre {
  padding: 20px;
}

.viewed {
  border: 3px solid green;
}

.card-footer {
  background-color: #dae1e7;
}
</style>
