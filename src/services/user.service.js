import api from './api'
class UserService {
    addCourse(course_id,email) {
        let json_data = {
            "course_id" : course_id,
            "user_email" : email
        }
        return api.post("/user/course",json_data);
    }

    getCourses(email) {
        return api.get("/user/" + email + "/courses");
    }

    getCoursesWhereNotUser(email){
        return api.get("/user/course/not-in/" + email);
    }

    getAsViewedSection(email, section_id){
        let json_data = {
            "user_email" : email
        }
        return api.post("/user/course/section/" + section_id,json_data)
    }

    setAsViewedSection(email, section_id){
        let json_data = {
            "user_email" : email,
            "section_id" : section_id
        }
        return api.post("/user/course/section/",json_data)
    }

    getSectionsByUserByEmail(email, course_id){
        
        return api.get("/user/course/section/" + course_id + "/" + email)
    }

    resetPassword(email,new_password){
        let json_data = {
            "user_email" : email,
            "password" : new_password
        }
        return api.patch("/user/resetPassword",json_data)
    }

    getStatus(email,course_id){
        return api.get("/user/course/status/" + email + "/" + course_id )
    }

    setProgress(email,course_id){
        return api.patch("/user/course/set-progress/" + course_id + "/" + email,{"user_email" : email} )
    }



    
    



    // getUserBoard() {
    //     return axios.get(API_URL + 'user', {headers: authHeader()});
    // }
    // getModeratorBoard() {
    //     return axios.get(API_URL + 'mod', {headers: authHeader()});
    // }
    // getAdminBoard() {
    //     return axios.get(API_URL + 'admin', {headers: authHeader()});
    // }
}
export default new UserService();




