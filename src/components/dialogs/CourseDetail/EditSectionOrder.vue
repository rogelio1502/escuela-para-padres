<template>
  <BaseModal
    :title="title"
    :info="info"
    :ok="ok"
    id="editSectionOrderModal"
    :cancel_save="cancel_save"
    :refresh="refresh"
    :cleanMethod="refreshMethod"
    :saveMethod="save"
  >
    <div class="row drag">
      <div class="col-md-12">
        <draggable
          v-model="sections"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="diseno m-2" role="button">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import CourseService from "../../../services/course.service";
import SectionService from "../../../services/section.service";
import draggable from "vuedraggable";
import Swal from "sweetalert2";

export default {
  emits: ["reload_parent", "making_action"],
  components: {
    draggable,
  },
  props: {
    sections_list: Array,
    course_id: Number,
  },
  data() {
    return {
      title: "Personalizar",
      info: true,
      ok: false,
      cancel_save: true,
      sections: this.sections_list,
      refresh: true,
      drag: false,
    };
  },
  methods: {
    getSections() {
      CourseService.getSections(this.course_id)
        .then((response) => {
          this.sections = response.data;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    refreshMethod() {
      this.$emit("making_action", true);
      this.sections = this.getSections();
      this.$emit("making_action", false);
    },
    updatePosition(json_data) {
      this.$emit("making_action", true);

      SectionService.updatePosition(json_data)
        .then((response) => {
          this.$emit("reload_parent", Math.random());
          this.$emit("making_action", false);
          Swal.fire({
            title: "Tarea completada.",
            text: "Se ha actualizaron las posiciones de forma correcta.",
            icon: "success",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
          }).then((response) => {
            this.refreshMethod();
          });
        })
        .catch((err) => {
          //console.log(err);
          if (err.message === "Network Error") {
            this.errorsSections = [err];
          } else {
            this.errorsSections = [];
          }
          this.errorsSections.push(err.response.data.detail);
          this.$emit("making_action", false);
        });
    },
    save() {
      let position = 1;
      let _data_to_update = [];
      this.sections.forEach((element) => {
        _data_to_update.push({
          id: element.id,
          order: position++,
        });
      });
      this.updatePosition(_data_to_update);
    },
  },
  watch: {
    sections_list() {
      this.sections = this.sections_list;
    },
  },
};
</script>

<style scoped>
.diseno {
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  border-radius: 5em;
  border: gray 1px solid;
  padding: m-2;
  text-align: center;
}

.diseno::before {
  content: "";
}

.diseno:hover:before {
  content: "ᐅ ";
  position: absolute;
  animation: linear infinite alternate;
  animation-name: run;
  animation-duration: 1s;
}

@keyframes run {
  0% {
    left: 0%;
    transform: translateX(37%);
  }
  100% {
    left: 3%;
    transform: translateX(-40%);
  }
}

.diseno:hover {
  border: rgb(255, 166, 0) 1.5px solid;
  box-shadow: 4px 4px 4px #b1b1b1;
}
</style>
