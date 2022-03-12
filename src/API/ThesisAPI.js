import axios from "axios";
var apiUrl = "http://84.252.140.218:5000/api";
if(process.env.NODE_ENV !== "development") {
    apiUrl = "http://84.252.140.218:5000/api";
} else {
    apiUrl = "http://84.252.140.218:5000/api";
}

export default class ThesisAPIService {
    static bearerPropertyName = 'bearer'
    static async getAll(limit = 10, page = 1) {
        var response = await axios.get(`${apiUrl}/Departments`)
        return response;
    }
    
    static async getById(id) {
        var response = await axios.get(`${apiUrl}/Departments/${id}`)
        return response
    }
    
    static async getCommentsByPostId(id) {
        var response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response
    }

    static async postDepartment(model) {
        var response = await axios.post(`${apiUrl}/Departments/`, model)
        return response
    }

    static async loginWithCredentials({login, password}) {
        var response = await axios({
            method: 'post',
            url: `${apiUrl}/Auth/Login`,
            data: {
                userName: login,
                password: password
            }
        })
        
        switch(response.status) {
            case 200: 
                return { ok: true, bearer: response.data.accessToken, userName: response.data.userName }
            case 400:;
            case 500:
                return { ok: false, message: response.data.message }
        }
    }
}