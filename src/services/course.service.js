import api from "./api";
class CourseService {
  getAll() {
    return api.get("/course/");
  }
  getCourse(id) {
    return api.get("/course/" + id);
  }
  getCourseByUserByCourse(email, id) {
    return api.get("/user/" + email + "/course/" + id);
  }
  getSections(id) {
    return api.get("/course/" + id + "/sections");
  }
  remove(id) {
    return api.delete("/course/" + id);
  }

  getSection(section_id, email) {
    return api.get("/course/section/" + section_id + "/" + email);
  }

  getTest(course_id) {
    return api.get("/test/course/" + course_id);
  }

  setStatus(course_id) {
    return api.patch("/course/set-status/" + course_id);
  }

  setTestUser(user_email, test_id) {
    return api.post("/test/done/" + user_email + "/" + test_id);
  }

  generateCertificate(user_email, course_id) {
    let json = {
      user_email: user_email,
      course_id: course_id,
    };
    return api.post("/course/get-certificate", json);
  }

  removeCertificate(user_email) {
    return api.delete("/course/remove-certificate/" + user_email);
  }
}
export default new CourseService();
