import api from "./api";
class AdminService {
  getFathers() {
    return api.get("/user/fathers");
  }
  getAdmins() {
    return api.get("/user/admins");
  }

  register(email, password, by) {
    return api.post("/auth/admin/signup?added_by=" + by, {
      email: email,
      password: password,
    });
  }

  registerFather(email, password, by) {
    return api.post("/auth/father/signup?added_by=" + by, {
      email: email,
      password: password,
    });
  }

  setStatus(user_id) {
    return api.patch("/user/set-status-user/" + user_id);
  }

  setStatusAdmin(user_id) {
    return api.patch("/user/set-status-admin/" + user_id);
  }

  getCoursesIngo() {
    return api.get("/course/all-info");
  }

  getTests() {
    return api.get("/test/get-all");
  }

  addQuestion(json, test_id) {
    return api.post("/test/course/" + test_id, json);
  }

  addTest(course_id) {
    return api.post("/test/" + course_id);
  }

  getTestId(course_id) {
    return api.get("/test/course/" + course_id + "?get_id=1");
  }

  removeQuestion(question_id) {
    return api.delete("/test/" + question_id);
  }
}
export default new AdminService();
