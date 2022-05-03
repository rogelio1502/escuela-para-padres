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
}
export default new AuthService();
