import axios from "axios";
var apiUrl = "http://84.252.140.218:5000/api";
if(process.env.NODE_ENV != "development") {
    apiUrl = "http://84.252.140.218:5000/api";
} else {
    apiUrl = "https://localhost:44312";
}

export default class ThesisAPIService {
    
    static async getAll(limit = 10, page = 1) {
        var response = await axios.get(`${apiUrl}/Departments`);
        return response;
    }
    
    static async getById(id) {
        var response = await axios.get(`${apiUrl}/Departments/${id}`);
        return response;
    }
    
    static async getCommentsByPostId(id) {
        var response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
}