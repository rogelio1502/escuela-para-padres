<script setup>
import ResetPassword from "./dialogs/User/ResetPassword.vue";
</script>
<template>
  <div class="container">
    <Loading v-if="some_action" />

    <ResetPassword
      id="resetPasswordModal"
      @making_action="(d) => (some_action = d)"
    >
    </ResetPassword>
    <div>
      <h1>Perfil</h1>
    </div>
    <div>
      <ul>
        <li>
          <button
            class="btn btn-warning"
            data-toggle="modal"
            data-target="#resetPasswordModal"
          >
            Cambiar Contraseña
          </button>
        </li>

        <!-- <li>
          <button class="btn btn-danger">Reportar Error</button>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ResetPassword,
  },
  data() {
    return {
      some_action: false,
    };
  },
  watch: {
    some_action() {},
  },
};
</script>
