import api from './api';
class SectionService {

    getAll() {
        return api.get("/section");
    }
    add(course_id, section_name,desc,video){
        let json_data = {
            course_id : course_id,
            name : section_name,
            video_quick_url : video,
            summary : desc
        }
        return api.post("/section",json_data);
    }
    get(id){
        return api.get("/section/" + id);
    }

    updatePosition(json_data){
        return api.put("/section/positions",json_data);
    }
    remove(id){
        return api.delete("/section/" + id);
    }
    update(id,new_name,desc,video){
        let json_data = {
            id : id,
            name : new_name,
            video_quick_url : video,
            summary : desc
        }
        return api.put("/section/" + id, json_data);
    }
}
export default new SectionService();
