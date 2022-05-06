import axios from "axios";
import axiosInstance from "./api";
import authService from "./auth.service";
import TokenService from "./token.service";
import Swal from "sweetalert2";
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalaccess_token();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      //console.log(err.response);
      //console.log(originalConfig);
      if (
        (originalConfig.url !== "/auth/admin/login" && err.response) ||
        (originalConfig.url !== "/auth/father/login" && err.response)
      ) {
        if (err.response.status === 403 && !originalConfig._retry) {
          //console.log("Hola");
          originalConfig._retry = true;
          try {
            const rs = axios.post(
              "https://u8d8rt.deta.dev/auth/refreshtoken",
              {},
              {
                headers: {
                  Authorization:
                    "Bearer " + TokenService.getLocalrefresh_token(),
                },
              }
            );
            const { access_token } = (await rs).data;
            store.dispatch("auth/refreshtoken", access_token);
            TokenService.updateLocalaccess_token(access_token);
            return axiosInstance(originalConfig);
          } catch (_error) {
            if (_error.response.data.detail) {
              authService.logout();
              Swal.fire({
                title: "Tu sesión ha caducado...",
                text: "Parece que tu sesión ha caducado, por seguridad, logueate de nuevo.",
                icon: "warning",
                confirmButtonText: "Ok",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              }).then((response) => {
                location.reload();
              });
            }
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;
