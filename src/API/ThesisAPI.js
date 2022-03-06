import axios from "axios";

export default class ThesisAPIService {
    static async getAll(limit = 10, page = 1) {
        var response = await axios.get('https://localhost:44312/api/Departments');
        return response;
    }
    
    static async getById(id) {
        var response = await axios.get('https://localhost:44312/api/Departments/' + id);
        return response;
    }
    
    static async getCommentsByPostId(id) {
        var response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }

    static async postDepartment(model) {
        var response = await axios.post(`https://localhost:44312/api/Departments/`, model);
        return response;
    }
}