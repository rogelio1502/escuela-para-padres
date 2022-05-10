<template>
  <div
    class="radioborde col-md-6 pb-2"
    v-for="course in courses"
    :key="course.id"
  >
    <div class="">
      <div class="bg-card">
        <div class="m-2">
          <a
            id="vinculo"
            :href="
              $router.resolve({
                name: 'course_detail',
                params: { id: course.Courses.id },
              }).href
            "
            v-if="course.Courses.enabled || adminSudo"
          >
            Ir al curso
          </a>
          <br />
          <span v-if="course.Courses.enabled == false"
            ><b>inhabilitado</b></span
          >
          <br />
          <span><b>Título: </b> {{ course.Courses.name }} </span> <br />
          <span v-if="course.status == 'done'"><b>Estado: </b> Terminado </span>
          <span v-if="course.status == 'inprogress'"
            ><b>Estado: </b> En Curso...
          </span>
          <span v-if="course.status == 'ready for test'"
            ><b>Estado: </b> Listo Para Tomar el test
          </span>

          <br />

          <br />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array,
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
  },
};
</script>

<style>
p {
  font-size: 12px;
  font-style: italic, bold;
}

#vinculo {
  text-decoration: none;
  color: black;
}

#vinculo:before {
  content: "";
}

#vinculo:hover:before {
  content: "ᐅ ";
}

#vinculo:hover {
  text-decoration: underline;
  color: rgba(35, 35, 243, 0.527);
}

.radioborde {
  border-radius: 4px;
}

.bg-card {
  margin-left: 20px;
  background-color: #f5f1f1;
  border-radius: 4px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.bg-card:hover {
  transform: scale(1.02);
  background-size: cover;
  box-shadow: #1c4b82 0px -20px 25px -28px inset,
    #1c4b82 0px 9px 25px -18px inset;
  transition: all 0.9s;
  -webkit-transition: all 0.9s;
}

.bg-card:not(:hover) {
  transition: all 0.9s;
  -webkit-transition: all 0.9s;
}
</style>
