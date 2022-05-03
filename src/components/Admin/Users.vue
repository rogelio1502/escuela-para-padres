<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog/Dialog.vue";
import Button from "primevue/button";
</script>

<template>
  <div class="container-md">
    <Loading v-if="some_action" />
    <AddAdmin
      id="addAdminModal"
      @making_action="(d) => (some_action = d)"
      :reload="getAdmins"
    />
    <AddFather
      id="addFatherModal"
      @making_action="(d) => (some_action = d)"
      :reload="getFathers"
    />
    <div class="mt-3">
      <h1><i class="tamano bi bi-people"></i> Usuarios</h1>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h2 class="mt-5">Admins</h2>
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
          <Column field="added_by" header="Tipo de Registro" :sortable="true">
            <template #body="slotProps">
              <div v-if="slotProps.data.added_by" class="btn btn-success">
                Añadido por el usuario con el ID {{ slotProps.data.added_by }}
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

          <Column field="created" header="Registrado" :sortable="true"></Column>
        </DataTable>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <div class="col-md-12">
        <h2>Padres</h2>

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
          <Column field="added_by" header="Tipo de Registro" :sortable="true">
            <template #body="slotProps">
              <div v-if="slotProps.data.added_by" class="btn btn-success">
                Añadido por el usuario con el ID{{ slotProps.data.added_by }}
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

          <Column field="created" header="Registrado" :sortable="true"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import adminService from "../../services/admin.service";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      users: [],
      admins: [],
      fathers_loaded: true,
      admins_loaded: true,
      showModal: false,
      enableClose: false,
      some_action: false,
    };
  },
  mounted() {
    this.getFathers();
    this.getAdmins();
  },
  methods: {
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

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 38px;
  font-weight: normal;
  line-height: 32px;
}

.tamano {
  font-size: 30px;
}
</style>
