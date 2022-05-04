import api from "./api";
import TokenService from "./token.service";
class AuthService {
  login({ email, password }) {
    return api
      .post("/auth/father/login", {
        email,
        password
      })
      .then((response) => {
        if (response.data.access_token) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  }
  logout() {
    TokenService.removeUser();
  }
  register({ username, email, password }) {
    return api.post("/auth/father/signup", {
      username,
      email,
      password
    });
  }
  activateCount(email, code){
        return api.post("/auth/activate/" + email + "/" + code)
    }
  reset_password_login(email){
      let json = {
        email : email
      }
      return api.post("/auth/reset/password", json)
  }
}
export default new AuthService();
