import axios from "axios";
var apiUrl = "http://84.252.140.218:5000/api";
if(process.env.NODE_ENV != "development") {
    console.log(process.env.NODE_ENV);
    apiUrl = "https://localhost:44312/api";
} else {
    apiUrl = "https://localhost:44312/api";
}

export default class ThesisAPIService {
    
    /*Test*/
    static async getCommentsByPostId(id) {
        var response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
    
    /*Departments*/

    static async getAll(limit = 10, page = 1) {
        var response = await axios.get(`${apiUrl}/Departments`);
        return response;
    }
    
    static async getById(id) {
        var response = await axios.get(`${apiUrl}/Departments/${id}`);
        return response;
    }

    static async postDepartment(model) {
        var response = await axios.post(`${apiUrl}/Departments/`, model);
        return response;
    }

    /*Projects*/

    static async getProjectsByDepartmentId(id) {
        var response = await axios.get(`${apiUrl}/Projects/${id}/projects`);
        return response;
    }

    /*Login*/
    static async loginWithCredentials({login, password}) {
        axios.post().then().catch();
    }
}